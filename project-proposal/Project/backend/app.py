from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
import uuid
import random
from datetime import datetime, timedelta
from dotenv import load_dotenv
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from sentry_sdk.integrations.sqlalchemy import SqlalchemyIntegration
import boto3
from botocore.exceptions import ClientError
from PIL import Image
import io

load_dotenv()

# Initialize Sentry for error tracking
sentry_sdk.init(
    dsn=os.getenv('SENTRY_DSN', ''),  # Add your Sentry DSN to .env
    integrations=[
        FlaskIntegration(auto_enabling_integrations=False),
        SqlalchemyIntegration(),
    ],
    traces_sample_rate=0.1,
    environment=os.getenv('ENVIRONMENT', 'development')
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER')
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# AWS S3 Configuration
app.config['AWS_ACCESS_KEY_ID'] = os.getenv('AWS_ACCESS_KEY_ID')
app.config['AWS_SECRET_ACCESS_KEY'] = os.getenv('AWS_SECRET_ACCESS_KEY')
app.config['AWS_REGION'] = os.getenv('AWS_REGION', 'us-east-1')
app.config['S3_BUCKET_NAME'] = os.getenv('S3_BUCKET_NAME')

# Initialize S3 client
s3_client = boto3.client(
    's3',
    aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY'],
    region_name=app.config['AWS_REGION']
) if app.config['AWS_ACCESS_KEY_ID'] else None

db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app)

# JWT Error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    return jsonify({'message': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    return jsonify({'message': 'Invalid token'}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    return jsonify({'message': 'Authorization token is required'}), 401

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    phone_verified = db.Column(db.Boolean, default=False)
    email_verified = db.Column(db.Boolean, default=False)
    zalo_id = db.Column(db.String(50))
    address = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Rating statistics
    @property
    def average_rating(self):
        ratings = Rating.query.filter_by(rated_user_id=self.id).all()
        if not ratings:
            return 0
        return round(sum(r.rating for r in ratings) / len(ratings), 1)
    
    @property
    def total_ratings(self):
        return Rating.query.filter_by(rated_user_id=self.id).count()

class VerificationCode(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    code = db.Column(db.String(6), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'phone' or 'email'
    expires_at = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user1_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user2_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user1 = db.relationship('User', foreign_keys=[user1_id])
    user2 = db.relationship('User', foreign_keys=[user2_id])
    item = db.relationship('Item', foreign_keys=[item_id])

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'), nullable=False)
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    message_type = db.Column(db.String(20), default='text')  # 'text', 'image', 'voice', 'location'
    content = db.Column(db.Text)
    file_url = db.Column(db.String(255))  # For images/voice files
    location_lat = db.Column(db.Float)  # For location sharing
    location_lng = db.Column(db.Float)
    location_name = db.Column(db.String(255))
    reply_to_id = db.Column(db.Integer, db.ForeignKey('message.id'))  # For replies
    is_edited = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    is_read = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    edited_at = db.Column(db.DateTime)
    
    conversation = db.relationship('Conversation', backref='messages')
    sender = db.relationship('User')
    reply_to = db.relationship('Message', remote_side=[id])

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    appointment_time = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(255), nullable=False)
    location_lat = db.Column(db.Float)
    location_lng = db.Column(db.Float)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'confirmed', 'cancelled', 'completed'
    notes = db.Column(db.Text)
    reminder_sent = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    item = db.relationship('Item')
    requester = db.relationship('User', foreign_keys=[requester_id])
    owner = db.relationship('User', foreign_keys=[owner_id])

class Rating(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rater_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    rated_user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)  # 1-5 stars
    comment = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    rater = db.relationship('User', foreign_keys=[rater_id])
    rated_user = db.relationship('User', foreign_keys=[rated_user_id])
    item = db.relationship('Item')

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    category = db.Column(db.String(20), nullable=False)  # 'car', 'motorbike'
    transaction_type = db.Column(db.String(20), nullable=False)  # 'lend', 'give_away', 'exchange'
    price_per_hour = db.Column(db.Float)  # For lend items
    quantity = db.Column(db.Integer, default=1)
    available_quantity = db.Column(db.Integer, default=1)
    status = db.Column(db.String(20), default='available')  # 'available', 'unavailable', 'completed'
    image_filename = db.Column(db.String(255))  # Main image (local fallback)
    image_url = db.Column(db.String(500))  # S3 URL
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('items', lazy=True))

class ItemImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    filename = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    item = db.relationship('Item', backref=db.backref('additional_images', lazy=True))

class TransactionRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('item.id'), nullable=False)
    requester_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # 'pending', 'accepted', 'rejected'
    hours = db.Column(db.Integer)  # For lend requests
    quantity_requested = db.Column(db.Integer, default=1)  # How many items requested
    exchange_item_id = db.Column(db.Integer, db.ForeignKey('item.id'))  # For exchange requests
    message = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    item = db.relationship('Item', foreign_keys=[item_id], backref='requests')
    requester = db.relationship('User', foreign_keys=[requester_id])
    owner = db.relationship('User', foreign_keys=[owner_id])
    exchange_item = db.relationship('Item', foreign_keys=[exchange_item_id])

# Helper functions
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in {'png', 'jpg', 'jpeg', 'gif'}

def upload_to_s3(file, filename):
    """Upload file to S3 and return URL"""
    if not s3_client or not app.config['S3_BUCKET_NAME']:
        # Fallback to local storage
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return f'/api/uploads/{filename}'
    
    try:
        # Optimize image before upload
        image = Image.open(file)
        
        # Resize if too large (max 1200px width)
        if image.width > 1200:
            ratio = 1200 / image.width
            new_height = int(image.height * ratio)
            image = image.resize((1200, new_height), Image.Resampling.LANCZOS)
        
        # Convert to RGB if necessary
        if image.mode in ('RGBA', 'P'):
            image = image.convert('RGB')
        
        # Save optimized image to bytes
        img_buffer = io.BytesIO()
        image.save(img_buffer, format='JPEG', quality=85, optimize=True)
        img_buffer.seek(0)
        
        # Upload to S3
        s3_client.upload_fileobj(
            img_buffer,
            app.config['S3_BUCKET_NAME'],
            filename,
            ExtraArgs={
                'ContentType': 'image/jpeg',
                'CacheControl': 'max-age=31536000'  # 1 year cache
            }
        )
        
        # Return S3 URL
        return f"https://{app.config['S3_BUCKET_NAME']}.s3.{app.config['AWS_REGION']}.amazonaws.com/{filename}"
        
    except Exception as e:
        print(f"S3 upload failed: {e}")
        # Fallback to local storage
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        file.seek(0)  # Reset file pointer
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return f'/api/uploads/{filename}'

def delete_from_s3(filename):
    """Delete file from S3"""
    if not s3_client or not app.config['S3_BUCKET_NAME']:
        # Delete from local storage
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        return
    
    try:
        s3_client.delete_object(
            Bucket=app.config['S3_BUCKET_NAME'],
            Key=filename
        )
    except Exception as e:
        print(f"S3 delete failed: {e}")

def send_email_aws(to_email, subject, body):
    """Send email using AWS SES"""
    if not app.config['AWS_ACCESS_KEY_ID']:
        print(f"AWS SES not configured. Email: {subject} to {to_email}")
        return False
    
    try:
        ses_client = boto3.client(
            'ses',
            aws_access_key_id=app.config['AWS_ACCESS_KEY_ID'],
            aws_secret_access_key=app.config['AWS_SECRET_ACCESS_KEY'],
            region_name=os.getenv('AWS_SES_REGION', 'us-east-1')
        )
        
        response = ses_client.send_email(
            Source=os.getenv('FROM_EMAIL', 'noreply@yourdomain.com'),
            Destination={'ToAddresses': [to_email]},
            Message={
                'Subject': {'Data': subject},
                'Body': {'Text': {'Data': body}}
            }
        )
        return True
    except Exception as e:
        print(f"AWS SES failed: {e}")
        return False



# Routes
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'Email already exists'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400
    
    user = User(
        username=data['username'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        phone=data['phone'],
        zalo_id=data.get('zalo_id', ''),
        address=data['address']
    )
    
    db.session.add(user)
    db.session.commit()
    
    # Auto-login after registration
    access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(days=1))
    return jsonify({
        'message': 'User created successfully',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }), 201

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and check_password_hash(user.password_hash, data['password']):
        access_token = create_access_token(identity=str(user.id), expires_delta=timedelta(days=1))
        return jsonify({
            'access_token': access_token,
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })
    
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/api/send-email-verification', methods=['POST'])
@jwt_required()
def send_email_verification():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    
    # Generate email verification code
    code = str(random.randint(100000, 999999))
    verification = VerificationCode(
        user_id=user_id,
        code=code,
        type='email',
        expires_at=datetime.utcnow() + timedelta(seconds=60)
    )
    db.session.add(verification)
    db.session.commit()
    
    # Send email using AWS SES
    body = f"Your email verification code is: {code}\n\nThis code will expire in 60 seconds."
    email_sent = send_email_aws(user.email, "Email Verification Code", body)
    
    if not email_sent:
        print(f"Email failed. Code for {user.email}: {code}")
    
    return jsonify({
        'message': 'Verification code sent to email',
        'verification_code': code  # Remove in production
    }), 200

@app.route('/api/verify-email', methods=['POST'])
@jwt_required()
def verify_email():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    code = data.get('code')
    
    verification = VerificationCode.query.filter_by(
        user_id=user_id,
        code=code,
        type='email'
    ).first()
    
    if not verification:
        return jsonify({'message': 'Invalid verification code'}), 400
    
    if verification.expires_at < datetime.utcnow():
        return jsonify({'message': 'Verification code expired'}), 400
    
    # Mark email as verified
    user = User.query.get(user_id)
    user.email_verified = True
    
    # Delete used verification code
    db.session.delete(verification)
    db.session.commit()
    
    return jsonify({'message': 'Email verified successfully'}), 200

@app.route('/api/items', methods=['GET'])
def get_items():
    # Get query parameters
    search = request.args.get('search', '')
    category = request.args.get('category', '')
    transaction_type = request.args.get('transaction_type', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 30))
    
    # Base query - only available items
    query = Item.query.join(User).filter(
        db.or_(
            db.and_(Item.transaction_type == 'lend', Item.available_quantity > 0),
            db.and_(Item.transaction_type.in_(['give_away', 'exchange']), Item.status == 'available')
        )
    )
    
    # Apply search filters
    if search:
        search_filter = db.or_(
            Item.name.ilike(f'%{search}%'),
            Item.description.ilike(f'%{search}%'),
            User.username.ilike(f'%{search}%')
        )
        query = query.filter(search_filter)
    
    if category:
        query = query.filter(Item.category == category)
    
    if transaction_type:
        query = query.filter(Item.transaction_type == transaction_type)
    
    # Get paginated results
    items = query.order_by(Item.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'items': [{
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'category': item.category,
            'transaction_type': item.transaction_type,
            'quantity': item.quantity,
            'available_quantity': item.available_quantity,
            'status': item.status,
            'image_url': f'/api/uploads/{item.image_filename}' if item.image_filename else None,
            'additional_images': [f'/api/uploads/{img.filename}' for img in item.additional_images],
            'username': item.user.username,
            'address': item.user.address,
            'price_per_hour': item.price_per_hour,
            'created_at': item.created_at.isoformat()
        } for item in items.items],
        'pagination': {
            'page': items.page,
            'pages': items.pages,
            'per_page': items.per_page,
            'total': items.total,
            'has_next': items.has_next,
            'has_prev': items.has_prev
        }
    })

@app.route('/api/items/<int:item_id>', methods=['GET'])
def get_item(item_id):
    item = Item.query.join(User).filter(Item.id == item_id).first_or_404()
    return jsonify({
        'id': item.id,
        'name': item.name,
        'description': item.description,
        'category': item.category,
        'transaction_type': item.transaction_type,
        'quantity': item.quantity,
        'available_quantity': item.available_quantity,
        'status': item.status,
        'image_url': f'/api/uploads/{item.image_filename}' if item.image_filename else None,
        'additional_images': [f'/api/uploads/{img.filename}' for img in item.additional_images],
        'username': item.user.username,
        'user_id': item.user.id,
        'address': item.user.address,
        'price_per_hour': item.price_per_hour,
        'contact': {
            'email': item.user.email,
            'phone': item.user.phone,
            'zalo_id': item.user.zalo_id
        },
        'created_at': item.created_at.isoformat()
    })

@app.route('/api/items', methods=['POST'])
@jwt_required()
def create_item():
    try:
        user_id = int(get_jwt_identity())
        print(f"User ID: {user_id}")
        
        name = request.form.get('name')
        description = request.form.get('description', '')
        transaction_type = request.form.get('transaction_type')
        price_per_hour = request.form.get('price_per_hour')
        
        # Convert price to float if provided
        if price_per_hour:
            try:
                price_per_hour = float(price_per_hour)
            except ValueError:
                price_per_hour = None
        
        category = request.form.get('category')
        quantity = request.form.get('quantity', 1)
        
        print(f"Form data - Name: {name}, Description: {description}, Category: {category}, Type: {transaction_type}, Quantity: {quantity}")
        
        if not name or not category or not transaction_type:
            print("Missing required fields")
            return jsonify({'message': 'Name, category and transaction type are required'}), 422
        
        # Convert quantity to int
        try:
            quantity = int(quantity)
        except ValueError:
            quantity = 1
        
        # Ensure uploads directory exists
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
        
        image_url = None
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.jpg'  # Always save as JPG
                image_url = upload_to_s3(file, filename)
                image_filename = filename if not image_url.startswith('http') else None
            else:
                image_filename = None
        else:
            image_filename = None
        
        item = Item(
            name=name,
            description=description,
            category=category,
            transaction_type=transaction_type,
            price_per_hour=price_per_hour,
            quantity=quantity,
            available_quantity=quantity,
            image_filename=image_filename,
            image_url=image_url,
            user_id=user_id
        )
        
        db.session.add(item)
        db.session.commit()
        
        # Handle additional images
        additional_images = request.files.getlist('additional_images')
        for img_file in additional_images[:10]:  # Max 10 additional images
            if img_file and img_file.filename and allowed_file(img_file.filename):
                filename = str(uuid.uuid4()) + '.' + img_file.filename.rsplit('.', 1)[1].lower()
                img_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                
                item_image = ItemImage(
                    item_id=item.id,
                    filename=filename
                )
                db.session.add(item_image)
        
        db.session.commit()
        
        return jsonify({'message': 'Item created successfully', 'item_id': item.id}), 201
    
    except Exception as e:
        print(f"Error creating item: {str(e)}")
        return jsonify({'message': f'Error creating item: {str(e)}'}), 422

@app.route('/api/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/api/items/<int:item_id>/request', methods=['POST'])
@jwt_required()
def create_request(item_id):
    try:
        requester_id = int(get_jwt_identity())
        data = request.get_json()
        
        item = Item.query.get_or_404(item_id)
        
        # Can't request your own item
        if item.user_id == requester_id:
            return jsonify({'message': 'Cannot request your own item'}), 400
        
        # Validate quantity for lend items
        if item.transaction_type == 'lend':
            requested_qty = data.get('quantity_requested', 1)
            if requested_qty > item.available_quantity:
                return jsonify({'message': f'Only {item.available_quantity} items available'}), 400
        
        transaction_request = TransactionRequest(
            item_id=item_id,
            requester_id=requester_id,
            owner_id=item.user_id,
            hours=data.get('hours'),
            quantity_requested=data.get('quantity_requested', 1),
            exchange_item_id=data.get('exchange_item_id'),
            message=data.get('message', '')
        )
        
        db.session.add(transaction_request)
        db.session.commit()
        
        return jsonify({'message': 'Request sent successfully'}), 201
    
    except Exception as e:
        return jsonify({'message': f'Error: {str(e)}'}), 400

@app.route('/api/requests', methods=['GET'])
@jwt_required()
def get_user_requests():
    user_id = int(get_jwt_identity())
    
    # Get all requests for items I own - with proper joins
    received_requests = db.session.query(TransactionRequest).join(
        Item, TransactionRequest.item_id == Item.id
    ).join(
        User, TransactionRequest.requester_id == User.id
    ).filter(
        Item.user_id == user_id
    ).order_by(TransactionRequest.created_at.desc()).all()
    
    # Get requests I made - with proper joins
    sent_requests = db.session.query(TransactionRequest).join(
        Item, TransactionRequest.item_id == Item.id
    ).join(
        User, TransactionRequest.owner_id == User.id
    ).filter(
        TransactionRequest.requester_id == user_id
    ).order_by(TransactionRequest.created_at.desc()).all()
    
    def format_request(req):
        # Manually fetch related data to avoid relationship issues
        item = Item.query.get(req.item_id)
        requester = User.query.get(req.requester_id)
        owner = User.query.get(req.owner_id)
        exchange_item = Item.query.get(req.exchange_item_id) if req.exchange_item_id else None
        
        return {
            'id': req.id,
            'item_name': item.name if item else 'Unknown',
            'item_id': req.item_id,
            'transaction_type': item.transaction_type if item else 'unknown',
            'requester_name': requester.username if requester else 'Unknown',
            'owner_name': owner.username if owner else 'Unknown',
            'status': req.status,
            'hours': req.hours,
            'quantity_requested': req.quantity_requested,
            'exchange_item_name': exchange_item.name if exchange_item else None,
            'message': req.message,
            'created_at': req.created_at.isoformat()
        }
    
    return jsonify({
        'received': [format_request(req) for req in received_requests],
        'sent': [format_request(req) for req in sent_requests]
    })

@app.route('/api/requests/<int:request_id>/respond', methods=['POST'])
@jwt_required()
def respond_to_request(request_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    transaction_request = TransactionRequest.query.get_or_404(request_id)
    
    # Only owner can respond
    if transaction_request.owner_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    if data['status'] == 'accepted':
        item = Item.query.get(transaction_request.item_id)
        
        if item.transaction_type == 'lend':
            # Check if enough quantity available
            if item.available_quantity < transaction_request.quantity_requested:
                return jsonify({'message': 'Not enough quantity available'}), 400
            
            # Decrease available quantity for lend
            item.available_quantity -= transaction_request.quantity_requested
        
        elif item.transaction_type in ['give_away', 'exchange']:
            # Mark as completed for give away or exchange
            item.status = 'completed'
            
            # If exchange, also mark the exchange item as completed
            if transaction_request.exchange_item_id:
                exchange_item = Item.query.get(transaction_request.exchange_item_id)
                if exchange_item:
                    exchange_item.status = 'completed'
    
    transaction_request.status = data['status']  # 'accepted' or 'rejected'
    db.session.commit()
    
    return jsonify({'message': f'Request {data["status"]}'})

@app.route('/api/requests/count', methods=['GET'])
@jwt_required()
def get_request_count():
    user_id = int(get_jwt_identity())
    
    # Count pending requests for items I own
    pending_received = db.session.query(TransactionRequest).join(
        Item, TransactionRequest.item_id == Item.id
    ).filter(
        Item.user_id == user_id,
        TransactionRequest.status == 'pending'
    ).count()
    
    return jsonify({'pending_received': pending_received})

@app.route('/api/messages/count', methods=['GET'])
@jwt_required()
def get_unread_message_count():
    user_id = int(get_jwt_identity())
    
    # Count unread messages in conversations where user is participant
    unread_count = db.session.query(Message).join(
        Conversation, Message.conversation_id == Conversation.id
    ).filter(
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id),
        Message.sender_id != user_id,  # Not sent by current user
        Message.is_read == False,
        Message.is_deleted == False
    ).count()
    
    return jsonify({'unread_count': unread_count})

@app.route('/api/appointments/reminders', methods=['GET'])
@jwt_required()
def get_appointment_reminders():
    # Get appointments in next 30 minutes that haven't been reminded
    now = datetime.utcnow()
    reminder_time = now + timedelta(minutes=30)
    
    appointments = Appointment.query.filter(
        Appointment.appointment_time.between(now, reminder_time),
        Appointment.status == 'confirmed',
        Appointment.reminder_sent == False
    ).all()
    
    reminders = []
    for apt in appointments:
        reminders.append({
            'id': apt.id,
            'item_name': apt.item.name,
            'appointment_time': apt.appointment_time.isoformat(),
            'location': apt.location,
            'requester_id': apt.requester_id,
            'owner_id': apt.owner_id
        })
        
        # Mark as reminded
        apt.reminder_sent = True
    
    db.session.commit()
    
    return jsonify(reminders)

@app.route('/api/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email not found'}), 404
    
    # Generate reset code
    code = str(random.randint(100000, 999999))
    verification = VerificationCode(
        user_id=user.id,
        code=code,
        type='password_reset',
        expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.session.add(verification)
    db.session.commit()
    
    # Send email using AWS SES
    body = f"Your password reset code is: {code}\n\nThis code will expire in 10 minutes."
    email_sent = send_email_aws(user.email, "Password Reset Code", body)
    
    if email_sent:
        return jsonify({'message': 'Reset code sent to your email'}), 200
    else:
        return jsonify({'message': 'Failed to send email', 'code': code}), 500

@app.route('/api/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    email = data.get('email')
    code = data.get('code')
    new_password = data.get('new_password')
    
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'Email not found'}), 404
    
    verification = VerificationCode.query.filter_by(
        user_id=user.id,
        code=code,
        type='password_reset'
    ).first()
    
    if not verification:
        return jsonify({'message': 'Invalid reset code'}), 400
    
    if verification.expires_at < datetime.utcnow():
        return jsonify({'message': 'Reset code expired'}), 400
    
    # Update password and verify email
    user.password_hash = generate_password_hash(new_password)
    user.email_verified = True  # Verify email when resetting password
    
    # Delete used verification code
    db.session.delete(verification)
    db.session.commit()
    
    return jsonify({'message': 'Password reset successfully'}), 200

@app.route('/api/conversations/<int:conversation_id>/appointments', methods=['GET'])
@jwt_required()
def get_conversation_appointments(conversation_id):
    user_id = int(get_jwt_identity())
    
    # Verify user is part of conversation
    conversation = Conversation.query.filter(
        Conversation.id == conversation_id,
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    ).first_or_404()
    
    # Get other user in conversation
    other_user_id = conversation.user2_id if conversation.user1_id == user_id else conversation.user1_id
    
    # Get appointments between these two users
    appointments = Appointment.query.filter(
        db.or_(
            db.and_(Appointment.requester_id == user_id, Appointment.owner_id == other_user_id),
            db.and_(Appointment.requester_id == other_user_id, Appointment.owner_id == user_id)
        )
    ).order_by(Appointment.appointment_time.desc()).all()
    
    result = []
    for apt in appointments:
        result.append({
            'id': apt.id,
            'appointment_time': apt.appointment_time.isoformat(),
            'location': apt.location,
            'status': apt.status,
            'notes': apt.notes,
            'is_owner': apt.owner_id == user_id
        })
    
    return jsonify(result)

@app.route('/api/conversations/<int:conversation_id>/appointments', methods=['POST'])
@jwt_required()
def create_conversation_appointment(conversation_id):
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    # Verify user is part of conversation
    conversation = Conversation.query.filter(
        Conversation.id == conversation_id,
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    ).first_or_404()
    
    # Get other user in conversation
    other_user_id = conversation.user2_id if conversation.user1_id == user_id else conversation.user1_id
    
    appointment = Appointment(
        item_id=conversation.item_id,
        requester_id=user_id,
        owner_id=other_user_id,
        appointment_time=datetime.fromisoformat(data['appointment_time']),
        location=data['location'],
        notes=data.get('notes', '')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    # Send system message about appointment creation
    system_message = Message(
        conversation_id=conversation_id,
        sender_id=user_id,
        message_type='system',
        content=f"📅 {User.query.get(user_id).username} scheduled an appointment for {datetime.fromisoformat(data['appointment_time']).strftime('%B %d, %Y at %I:%M %p')}"
    )
    
    db.session.add(system_message)
    conversation.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({'appointment_id': appointment.id}), 201

@app.route('/api/appointments', methods=['POST'])
@jwt_required()
def create_appointment():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    appointment = Appointment(
        item_id=data['item_id'],
        requester_id=user_id,
        owner_id=data['owner_id'],
        appointment_time=datetime.fromisoformat(data['appointment_time'].replace('Z', '+00:00')),
        location=data['location'],
        location_lat=data.get('location_lat'),
        location_lng=data.get('location_lng'),
        notes=data.get('notes', '')
    )
    
    db.session.add(appointment)
    db.session.commit()
    
    # Auto-create conversation if it doesn't exist
    existing_conversation = Conversation.query.filter(
        db.or_(
            db.and_(Conversation.user1_id == user_id, Conversation.user2_id == data['owner_id']),
            db.and_(Conversation.user1_id == data['owner_id'], Conversation.user2_id == user_id)
        ),
        Conversation.item_id == data['item_id']
    ).first()
    
    if not existing_conversation:
        conversation = Conversation(
            user1_id=user_id,
            user2_id=data['owner_id'],
            item_id=data['item_id']
        )
        db.session.add(conversation)
        db.session.commit()
    else:
        conversation = existing_conversation
    
    # Send system message about appointment creation
    system_message = Message(
        conversation_id=conversation.id,
        sender_id=user_id,
        message_type='system',
        content=f"📅 {User.query.get(user_id).username} scheduled an appointment for {appointment.appointment_time.strftime('%B %d, %Y at %I:%M %p')}"
    )
    
    db.session.add(system_message)
    conversation.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({'appointment_id': appointment.id}), 201

@app.route('/api/my-items', methods=['GET'])
@jwt_required()
def get_my_items():
    user_id = int(get_jwt_identity())
    
    # Get query parameters
    search = request.args.get('search', '')
    category = request.args.get('category', '')
    transaction_type = request.args.get('transaction_type', '')
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 30))
    
    # Base query
    query = Item.query.filter_by(user_id=user_id)
    
    # Apply search filters
    if search:
        search_filter = db.or_(
            Item.name.ilike(f'%{search}%'),
            Item.description.ilike(f'%{search}%')
        )
        query = query.filter(search_filter)
    
    if category:
        query = query.filter(Item.category == category)
    
    if transaction_type:
        query = query.filter(Item.transaction_type == transaction_type)
    
    # Get paginated results
    items = query.order_by(Item.created_at.desc()).paginate(
        page=page, per_page=per_page, error_out=False
    )
    
    return jsonify({
        'items': [{
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'category': item.category,
            'transaction_type': item.transaction_type,
            'quantity': item.quantity,
            'available_quantity': item.available_quantity,
            'status': item.status,
            'image_url': f'/api/uploads/{item.image_filename}' if item.image_filename else None,
            'additional_images': [f'/api/uploads/{img.filename}' for img in item.additional_images],
            'price_per_hour': item.price_per_hour,
            'created_at': item.created_at.isoformat()
        } for item in items.items],
        'pagination': {
            'page': items.page,
            'pages': items.pages,
            'per_page': items.per_page,
            'total': items.total,
            'has_next': items.has_next,
            'has_prev': items.has_prev
        }
    })

@app.route('/api/items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_item(item_id):
    try:
        user_id = int(get_jwt_identity())
        item = Item.query.get_or_404(item_id)
        
        # Only owner can edit
        if item.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        name = request.form.get('name')
        description = request.form.get('description', '')
        transaction_type = request.form.get('transaction_type')
        price_per_hour = request.form.get('price_per_hour')
        
        if not name or not transaction_type:
            return jsonify({'message': 'Name and transaction type are required'}), 422
        
        # Convert price to float if provided
        if price_per_hour:
            try:
                price_per_hour = float(price_per_hour)
            except ValueError:
                price_per_hour = None
        
        # Handle new image upload
        if 'image' in request.files:
            file = request.files['image']
            if file and file.filename and allowed_file(file.filename):
                # Delete old image if exists
                if item.image_filename:
                    old_path = os.path.join(app.config['UPLOAD_FOLDER'], item.image_filename)
                    if os.path.exists(old_path):
                        os.remove(old_path)
                
                # Save new image
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                item.image_filename = filename
        
        # Update item fields
        item.name = name
        item.description = description
        item.transaction_type = transaction_type
        item.price_per_hour = price_per_hour
        
        db.session.commit()
        
        return jsonify({'message': 'Item updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error updating item: {str(e)}'}), 422

@app.route('/api/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'phone': user.phone,
        'phone_verified': user.phone_verified,
        'email_verified': user.email_verified,
        'zalo_id': user.zalo_id,
        'address': user.address,
        'created_at': user.created_at.isoformat()
    })

@app.route('/api/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        user_id = int(get_jwt_identity())
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        # Check if email is being changed
        new_email = data.get('email')
        if new_email and new_email != user.email:
            # Check if email already exists
            if User.query.filter_by(email=new_email).first():
                return jsonify({'message': 'Email already exists'}), 400
            user.email = new_email
            user.email_verified = False  # Reset verification status
        
        # Update password if provided
        new_password = data.get('password')
        if new_password:
            user.password_hash = generate_password_hash(new_password)
        
        # Update other fields
        user.username = data.get('username', user.username)
        user.phone = data.get('phone', user.phone)
        user.zalo_id = data.get('zalo_id', user.zalo_id)
        user.address = data.get('address', user.address)
        
        db.session.commit()
        
        return jsonify({'message': 'Profile updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error updating profile: {str(e)}'}), 422

@app.route('/api/change-password', methods=['POST'])
@jwt_required()
def change_password():
    user_id = int(get_jwt_identity())
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    
    # Verify old password
    if not check_password_hash(user.password_hash, old_password):
        return jsonify({'message': 'Current password is incorrect'}), 400
    
    # Update password
    user.password_hash = generate_password_hash(new_password)
    db.session.commit()
    
    return jsonify({'message': 'Password changed successfully'}), 200

@app.route('/api/users/<int:user_id>', methods=['GET'])
def get_public_profile(user_id):
    user = User.query.get_or_404(user_id)
    
    # Get user's items
    items = Item.query.filter_by(user_id=user_id).filter(
        db.or_(
            db.and_(Item.transaction_type == 'lend', Item.available_quantity > 0),
            db.and_(Item.transaction_type.in_(['give_away', 'exchange']), Item.status == 'available')
        )
    ).order_by(Item.created_at.desc()).all()
    
    return jsonify({
        'id': user.id,
        'username': user.username,
        'phone': user.phone,
        'phone_verified': user.phone_verified,
        'email_verified': user.email_verified,
        'zalo_id': user.zalo_id,
        'address': user.address,
        'average_rating': user.average_rating,
        'total_ratings': user.total_ratings,
        'created_at': user.created_at.isoformat(),
        'items': [{
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'category': item.category,
            'transaction_type': item.transaction_type,
            'quantity': item.quantity,
            'available_quantity': item.available_quantity,
            'status': item.status,
            'image_url': f'/api/uploads/{item.image_filename}' if item.image_filename else None,
            'price_per_hour': item.price_per_hour,
            'created_at': item.created_at.isoformat()
        } for item in items]
    })

@app.route('/api/items/<int:item_id>/repost', methods=['POST'])
@jwt_required()
def repost_item(item_id):
    try:
        user_id = int(get_jwt_identity())
        item = Item.query.get_or_404(item_id)
        
        # Only owner can repost
        if item.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        data = request.get_json()
        new_quantity = data.get('quantity', item.quantity)
        
        # Convert to int
        try:
            new_quantity = int(new_quantity)
        except ValueError:
            return jsonify({'message': 'Invalid quantity'}), 400
        
        # Update item quantities
        item.quantity = new_quantity
        item.available_quantity = new_quantity
        item.status = 'available'
        
        db.session.commit()
        
        return jsonify({'message': 'Item reposted successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error reposting item: {str(e)}'}), 422

@app.route('/api/requests/<int:request_id>', methods=['PUT'])
@jwt_required()
def edit_request(request_id):
    try:
        user_id = int(get_jwt_identity())
        transaction_request = TransactionRequest.query.get_or_404(request_id)
        
        # Only requester can edit
        if transaction_request.requester_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Only pending requests can be edited
        if transaction_request.status != 'pending':
            return jsonify({'message': 'Cannot edit non-pending request'}), 400
        
        data = request.get_json()
        
        # Update request fields
        transaction_request.hours = data.get('hours', transaction_request.hours)
        transaction_request.quantity_requested = data.get('quantity_requested', transaction_request.quantity_requested)
        transaction_request.exchange_item_id = data.get('exchange_item_id', transaction_request.exchange_item_id)
        transaction_request.message = data.get('message', transaction_request.message)
        
        db.session.commit()
        
        return jsonify({'message': 'Request updated successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error updating request: {str(e)}'}), 422

@app.route('/api/requests/<int:request_id>', methods=['DELETE'])
@jwt_required()
def cancel_request(request_id):
    try:
        user_id = int(get_jwt_identity())
        transaction_request = TransactionRequest.query.get_or_404(request_id)
        
        # Only requester can cancel
        if transaction_request.requester_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Only pending requests can be cancelled
        if transaction_request.status != 'pending':
            return jsonify({'message': 'Cannot cancel non-pending request'}), 400
        
        db.session.delete(transaction_request)
        db.session.commit()
        
        return jsonify({'message': 'Request cancelled successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error cancelling request: {str(e)}'}), 422

# Messaging Endpoints
@app.route('/api/conversations', methods=['GET'])
@jwt_required()
def get_conversations():
    user_id = int(get_jwt_identity())
    search = request.args.get('search', '')
    
    query = Conversation.query.filter(
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    )
    
    # Apply search filter for usernames
    if search:
        query = query.join(
            User, db.or_(
                db.and_(Conversation.user1_id == User.id, User.id != user_id),
                db.and_(Conversation.user2_id == User.id, User.id != user_id)
            )
        ).filter(User.username.ilike(f'%{search}%'))
    
    conversations = query.order_by(Conversation.updated_at.desc()).all()
    
    result = []
    for conv in conversations:
        other_user = conv.user2 if conv.user1_id == user_id else conv.user1
        last_message = Message.query.filter_by(conversation_id=conv.id).order_by(Message.created_at.desc()).first()
        
        # Count unread messages in this conversation
        unread_count = Message.query.filter(
            Message.conversation_id == conv.id,
            Message.sender_id != user_id,
            Message.is_read == False,
            Message.is_deleted == False
        ).count()
        
        result.append({
            'id': conv.id,
            'other_user': {
                'id': other_user.id,
                'username': other_user.username
            },
            'item': {
                'id': conv.item.id,
                'name': conv.item.name
            } if conv.item else None,
            'last_message': {
                'content': last_message.content if last_message and not last_message.is_deleted else 'Deleted message',
                'created_at': last_message.created_at.isoformat() if last_message else conv.created_at.isoformat(),
                'sender_id': last_message.sender_id if last_message else None
            } if last_message else None,
            'unread_count': unread_count,
            'updated_at': conv.updated_at.isoformat()
        })
    
    return jsonify(result)

@app.route('/api/conversations', methods=['POST'])
@jwt_required()
def create_conversation():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    other_user_id = data.get('user_id')
    item_id = data.get('item_id')
    
    # Check if conversation already exists
    existing = Conversation.query.filter(
        db.or_(
            db.and_(Conversation.user1_id == user_id, Conversation.user2_id == other_user_id),
            db.and_(Conversation.user1_id == other_user_id, Conversation.user2_id == user_id)
        ),
        Conversation.item_id == item_id
    ).first()
    
    if existing:
        return jsonify({'conversation_id': existing.id})
    
    conversation = Conversation(
        user1_id=user_id,
        user2_id=other_user_id,
        item_id=item_id
    )
    
    db.session.add(conversation)
    db.session.commit()
    
    return jsonify({'conversation_id': conversation.id}), 201

@app.route('/api/conversations/<int:conversation_id>/messages', methods=['GET'])
@jwt_required()
def get_messages(conversation_id):
    user_id = int(get_jwt_identity())
    
    # Verify user is part of conversation
    conversation = Conversation.query.filter(
        Conversation.id == conversation_id,
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    ).first_or_404()
    
    messages = Message.query.filter_by(conversation_id=conversation_id).order_by(Message.created_at.asc()).all()
    
    result = []
    for msg in messages:
        reply_to = None
        if msg.reply_to_id:
            reply_msg = Message.query.get(msg.reply_to_id)
            if reply_msg:
                reply_to = {
                    'id': reply_msg.id,
                    'content': reply_msg.content if not reply_msg.is_deleted else 'Deleted message',
                    'sender_username': reply_msg.sender.username
                }
        
        result.append({
            'id': msg.id,
            'sender_id': msg.sender_id,
            'sender_username': msg.sender.username,
            'message_type': msg.message_type,
            'content': msg.content if not msg.is_deleted else 'Deleted message',
            'file_url': msg.file_url,
            'location': {
                'lat': msg.location_lat,
                'lng': msg.location_lng,
                'name': msg.location_name
            } if msg.location_lat and msg.location_lng else None,
            'reply_to': reply_to,
            'is_edited': msg.is_edited,
            'is_deleted': msg.is_deleted,
            'created_at': msg.created_at.isoformat(),
            'edited_at': msg.edited_at.isoformat() if msg.edited_at else None
        })
    
    return jsonify(result)

@app.route('/api/conversations/<int:conversation_id>/mark-read', methods=['POST'])
@jwt_required()
def mark_messages_read(conversation_id):
    user_id = int(get_jwt_identity())
    
    # Verify user is part of conversation
    conversation = Conversation.query.filter(
        Conversation.id == conversation_id,
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    ).first_or_404()
    
    # Mark all unread messages in this conversation as read
    Message.query.filter(
        Message.conversation_id == conversation_id,
        Message.sender_id != user_id,  # Not sent by current user
        Message.is_read == False
    ).update({'is_read': True})
    
    db.session.commit()
    
    return jsonify({'message': 'Messages marked as read'})

@app.route('/api/conversations/<int:conversation_id>/messages', methods=['POST'])
@jwt_required()
def send_message(conversation_id):
    user_id = int(get_jwt_identity())
    
    # Verify user is part of conversation
    conversation = Conversation.query.filter(
        Conversation.id == conversation_id,
        db.or_(Conversation.user1_id == user_id, Conversation.user2_id == user_id)
    ).first_or_404()
    
    if request.content_type and 'multipart/form-data' in request.content_type:
        # Handle file upload (image/voice)
        message_type = request.form.get('message_type', 'text')
        content = request.form.get('content', '')
        reply_to_id = request.form.get('reply_to_id')
        
        file_url = None
        if 'file' in request.files:
            file = request.files['file']
            if file and file.filename:
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                file_url = filename
    else:
        # Handle JSON data
        data = request.get_json()
        message_type = data.get('message_type', 'text')
        content = data.get('content', '')
        reply_to_id = data.get('reply_to_id')
        file_url = None
        
        # Handle location data
        location_lat = data.get('location_lat')
        location_lng = data.get('location_lng')
        location_name = data.get('location_name')
    
    message = Message(
        conversation_id=conversation_id,
        sender_id=user_id,
        message_type=message_type,
        content=content,
        file_url=file_url,
        location_lat=location_lat if 'location_lat' in locals() else None,
        location_lng=location_lng if 'location_lng' in locals() else None,
        location_name=location_name if 'location_name' in locals() else None,
        reply_to_id=int(reply_to_id) if reply_to_id else None
    )
    
    db.session.add(message)
    
    # Update conversation timestamp
    conversation.updated_at = datetime.utcnow()
    db.session.commit()
    
    return jsonify({'message_id': message.id}), 201

@app.route('/api/messages/<int:message_id>', methods=['PUT'])
@jwt_required()
def edit_message(message_id):
    user_id = int(get_jwt_identity())
    message = Message.query.get_or_404(message_id)
    
    # Only sender can edit
    if message.sender_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.get_json()
    message.content = data.get('content', message.content)
    message.is_edited = True
    message.edited_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Message updated'})

@app.route('/api/messages/<int:message_id>', methods=['DELETE'])
@jwt_required()
def delete_message(message_id):
    user_id = int(get_jwt_identity())
    message = Message.query.get_or_404(message_id)
    
    # Only sender can delete
    if message.sender_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    message.is_deleted = True
    message.content = None  # Clear content for privacy
    
    db.session.commit()
    
    return jsonify({'message': 'Message deleted'})

@app.route('/api/items/<int:item_id>/images/<int:image_index>', methods=['DELETE'])
@jwt_required()
def delete_item_image(item_id, image_index):
    try:
        user_id = int(get_jwt_identity())
        item = Item.query.get_or_404(item_id)
        
        # Only owner can delete images
        if item.user_id != user_id:
            return jsonify({'message': 'Unauthorized'}), 403
        
        # Get additional images
        additional_images = ItemImage.query.filter_by(item_id=item_id).order_by(ItemImage.created_at).all()
        
        if image_index < 0 or image_index >= len(additional_images):
            return jsonify({'message': 'Image not found'}), 404
        
        # Delete the image file and database record
        image_to_delete = additional_images[image_index]
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], image_to_delete.filename)
        if os.path.exists(file_path):
            os.remove(file_path)
        
        db.session.delete(image_to_delete)
        db.session.commit()
        
        return jsonify({'message': 'Image deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Error deleting image: {str(e)}'}), 422

# Appointment Endpoints

@app.route('/api/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    user_id = int(get_jwt_identity())
    
    appointments = Appointment.query.filter(
        db.or_(Appointment.requester_id == user_id, Appointment.owner_id == user_id)
    ).order_by(Appointment.appointment_time.desc()).all()
    
    result = []
    for apt in appointments:
        result.append({
            'id': apt.id,
            'item': {
                'id': apt.item.id,
                'name': apt.item.name,
                'image_url': f'/api/uploads/{apt.item.image_filename}' if apt.item.image_filename else None
            },
            'requester': {
                'id': apt.requester.id,
                'username': apt.requester.username
            },
            'owner': {
                'id': apt.owner.id,
                'username': apt.owner.username
            },
            'appointment_time': apt.appointment_time.isoformat(),
            'location': apt.location,
            'location_coords': {
                'lat': apt.location_lat,
                'lng': apt.location_lng
            } if apt.location_lat and apt.location_lng else None,
            'status': apt.status,
            'notes': apt.notes,
            'is_owner': apt.owner_id == user_id,
            'created_at': apt.created_at.isoformat()
        })
    
    return jsonify(result)

@app.route('/api/appointments/<int:appointment_id>/status', methods=['PUT'])
@jwt_required()
def update_appointment_status(appointment_id):
    user_id = int(get_jwt_identity())
    appointment = Appointment.query.get_or_404(appointment_id)
    
    # Only owner can confirm/cancel
    if appointment.owner_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = request.get_json()
    old_status = appointment.status
    appointment.status = data['status']
    
    # Find conversation between these users
    conversation = Conversation.query.filter(
        db.or_(
            db.and_(Conversation.user1_id == appointment.requester_id, Conversation.user2_id == appointment.owner_id),
            db.and_(Conversation.user1_id == appointment.owner_id, Conversation.user2_id == appointment.requester_id)
        )
    ).first()
    
    if conversation:
        # Send system message about status change
        user = User.query.get(user_id)
        system_message = Message(
            conversation_id=conversation.id,
            sender_id=user_id,
            message_type='system',
            content=f"📅 {user.username} {data['status']} the appointment on {appointment.appointment_time.strftime('%B %d, %Y at %I:%M %p')}"
        )
        
        db.session.add(system_message)
        conversation.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': f'Appointment {data["status"]}'})

@app.route('/api/appointments/<int:appointment_id>', methods=['PUT'])
@jwt_required()
def update_appointment(appointment_id):
    user_id = int(get_jwt_identity())
    appointment = Appointment.query.get_or_404(appointment_id)
    data = request.get_json()
    
    # Only participants can edit
    if appointment.requester_id != user_id and appointment.owner_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Update appointment
    if 'appointment_time' in data:
        appointment.appointment_time = datetime.fromisoformat(data['appointment_time'])
    if 'location' in data:
        appointment.location = data['location']
    if 'notes' in data:
        appointment.notes = data['notes']
    
    # Find conversation and send system message
    conversation = Conversation.query.filter(
        db.or_(
            db.and_(Conversation.user1_id == appointment.requester_id, Conversation.user2_id == appointment.owner_id),
            db.and_(Conversation.user1_id == appointment.owner_id, Conversation.user2_id == appointment.requester_id)
        )
    ).first()
    
    if conversation:
        user = User.query.get(user_id)
        system_message = Message(
            conversation_id=conversation.id,
            sender_id=user_id,
            message_type='system',
            content=f"📅 {user.username} updated the appointment on {appointment.appointment_time.strftime('%B %d, %Y at %I:%M %p')}"
        )
        
        db.session.add(system_message)
        conversation.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Appointment updated'})

@app.route('/api/appointments/<int:appointment_id>', methods=['DELETE'])
@jwt_required()
def delete_appointment(appointment_id):
    user_id = int(get_jwt_identity())
    appointment = Appointment.query.get_or_404(appointment_id)
    
    # Only participants can delete
    if appointment.requester_id != user_id and appointment.owner_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Find conversation and send system message
    conversation = Conversation.query.filter(
        db.or_(
            db.and_(Conversation.user1_id == appointment.requester_id, Conversation.user2_id == appointment.owner_id),
            db.and_(Conversation.user1_id == appointment.owner_id, Conversation.user2_id == appointment.requester_id)
        )
    ).first()
    
    if conversation:
        user = User.query.get(user_id)
        system_message = Message(
            conversation_id=conversation.id,
            sender_id=user_id,
            message_type='system',
            content=f"📅 {user.username} cancelled the appointment on {appointment.appointment_time.strftime('%B %d, %Y at %I:%M %p')}"
        )
        
        db.session.add(system_message)
        conversation.updated_at = datetime.utcnow()
    
    db.session.delete(appointment)
    db.session.commit()
    
    return jsonify({'message': 'Appointment deleted'})

# Rating Endpoints
@app.route('/api/ratings', methods=['POST'])
@jwt_required()
def create_rating():
    user_id = int(get_jwt_identity())
    data = request.get_json()
    
    # Check if user already rated this user for this item
    existing_rating = Rating.query.filter_by(
        rater_id=user_id,
        rated_user_id=data['rated_user_id'],
        item_id=data['item_id']
    ).first()
    
    if existing_rating:
        return jsonify({'message': 'You have already rated this user for this item'}), 400
    
    # Can't rate yourself
    if user_id == data['rated_user_id']:
        return jsonify({'message': 'Cannot rate yourself'}), 400
    
    rating = Rating(
        rater_id=user_id,
        rated_user_id=data['rated_user_id'],
        item_id=data['item_id'],
        rating=data['rating'],
        comment=data.get('comment', '')
    )
    
    db.session.add(rating)
    db.session.commit()
    
    return jsonify({'message': 'Rating submitted successfully'}), 201

@app.route('/api/users/<int:user_id>/ratings', methods=['GET'])
def get_user_ratings(user_id):
    ratings = Rating.query.filter_by(rated_user_id=user_id).order_by(Rating.created_at.desc()).all()
    
    result = []
    for rating in ratings:
        result.append({
            'id': rating.id,
            'rating': rating.rating,
            'comment': rating.comment,
            'rater_username': rating.rater.username,
            'item_name': rating.item.name,
            'created_at': rating.created_at.isoformat()
        })
    
    return jsonify(result)

@app.route('/api/items/<int:item_id>/can-rate', methods=['GET'])
@jwt_required()
def can_rate_item(item_id):
    user_id = int(get_jwt_identity())
    item = Item.query.get_or_404(item_id)
    
    # Check if user has completed transaction for this item
    completed_request = TransactionRequest.query.filter_by(
        item_id=item_id,
        requester_id=user_id,
        status='accepted'
    ).first()
    
    # Check if already rated
    existing_rating = Rating.query.filter_by(
        rater_id=user_id,
        rated_user_id=item.user_id,
        item_id=item_id
    ).first()
    
    can_rate = completed_request and not existing_rating and user_id != item.user_id
    
    return jsonify({
        'can_rate': can_rate,
        'reason': 'Already rated' if existing_rating else 'No completed transaction' if not completed_request else 'Can rate'
    })

if __name__ == '__main__':
    with app.app_context():
        # Drop and recreate tables to add new models
        db.drop_all()
        db.create_all()
        print("Database recreated with messaging and appointment models")
    app.run(debug=True)