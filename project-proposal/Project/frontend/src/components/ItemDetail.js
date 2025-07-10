import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import RequestModal from './RequestModal';
import ImageViewer from './ImageViewer';
import AppointmentModal from './AppointmentModal';

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const fetchItem = useCallback(async () => {
    try {
      const response = await axios.get(`/api/items/${id}`);
      setItem(response.data);
    } catch (error) {
      setError('Item not found');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'lend': return '#3498db';
      case 'give_away': return '#2ecc71';
      case 'exchange': return '#f39c12';
      default: return '#95a5a6';
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      animation: 'fadeInUp 0.8s ease-out'
    }}>
      <Link to="/" style={{ color: '#3498db', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>
        ← Back to Items
      </Link>
      
      <div style={{ 
        background: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(20px)',
        borderRadius: '24px', 
        boxShadow: '0 20px 60px rgba(0,0,0,0.1)', 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}>
        {item.image_url && (
          <img
            src={item.image_url}
            alt={item.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover', cursor: 'pointer' }}
            onClick={() => {
              setCurrentImageIndex(0);
              setShowImageViewer(true);
            }}
          />
        )}
        
        {item.additional_images && item.additional_images.length > 0 && (
          <div style={{ padding: '1rem', backgroundColor: '#f8f9fa' }}>
            <h4 style={{ marginBottom: '1rem' }}>More Images:</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
              {item.additional_images.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`${item.name} ${index + 1}`}
                  style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={() => {
                    setCurrentImageIndex(index + 1);
                    setShowImageViewer(true);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{item.name}</h1>
            <span style={{
              backgroundColor: getTransactionTypeColor(item.transaction_type),
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              textTransform: 'capitalize'
            }}>
              {item.transaction_type.replace('_', ' ')}
            </span>
          </div>
          
          <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.6' }}>
            {item.description}
          </p>
          
          {item.transaction_type === 'lend' && item.price_per_hour && (
            <p style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>
              ${item.price_per_hour}/hour
            </p>
          )}
          
          <p style={{ color: '#666', fontSize: '1rem', marginBottom: '2rem' }}>
            {item.transaction_type === 'lend' ? (
              item.available_quantity === 0 ? (
                <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>All {item.category}s got lent</span>
              ) : (
                `Available: ${item.available_quantity}/${item.quantity}`
              )
            ) : (
              `Quantity: ${item.quantity}`
            )}
          </p>
          
          {user && user.username === item.username ? (
            <Link to={`/edit-item/${item.id}`} style={{
              backgroundColor: '#f39c12',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '1rem',
              marginBottom: '2rem',
              display: 'inline-block'
            }}>
              Edit Item
            </Link>
          ) : user && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <button
                onClick={() => setShowRequestModal(true)}
                style={{
                  backgroundColor: '#3498db',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Request {item.transaction_type === 'lend' ? 'to Borrow' : 
                        item.transaction_type === 'give_away' ? 'Item' : 'to Exchange'}
              </button>
              <button
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token');
                    const response = await axios.post('/api/conversations', {
                      user_id: item.user_id,
                      item_id: item.id
                    }, {
                      headers: { 'Authorization': `Bearer ${token}` }
                    });
                    window.location.href = '/messages';
                  } catch (error) {
                    console.error('Error creating conversation:', error);
                  }
                }}
                style={{
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                💬 Message Owner
              </button>
              <button
                onClick={async () => {
                  const appointmentTime = prompt('Enter appointment date and time (YYYY-MM-DD HH:MM):');
                  const location = prompt('Enter meeting location:');
                  const notes = prompt('Additional notes (optional):') || '';
                  
                  if (appointmentTime && location) {
                    try {
                      const token = localStorage.getItem('token');
                      await axios.post('/api/appointments', {
                        item_id: item.id,
                        owner_id: item.user_id,
                        appointment_time: appointmentTime,
                        location: location,
                        notes: notes
                      }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                      });
                      alert('Appointment created! Check your messages to see the conversation.');
                    } catch (error) {
                      console.error('Error creating appointment:', error);
                      alert('Failed to create appointment');
                    }
                  }
                }}
                style={{
                  backgroundColor: '#f39c12',
                  color: 'white',
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                📅 Quick Appointment
              </button>
            </div>
          )}
          
          <div style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Contact Information</h3>
            <div style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '6px' }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Posted by:</strong> 
                <Link 
                  to={`/user/${item.user_id}`}
                  style={{
                    color: '#3498db',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    marginLeft: '0.5rem'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  {item.username}
                </Link>
              </p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> {item.contact.email}</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Phone:</strong> {item.contact.phone}</p>
              {item.contact.zalo_id && (
                <p style={{ marginBottom: '0.5rem' }}><strong>Zalo ID:</strong> {item.contact.zalo_id}</p>
              )}
              <p style={{ marginBottom: '0.5rem' }}><strong>Address:</strong> {item.address}</p>
              <p style={{ color: '#666', fontSize: '0.9rem', marginTop: '1rem' }}>
                Posted on {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {showRequestModal && (
        <RequestModal
          item={item}
          onClose={() => setShowRequestModal(false)}
          onSuccess={() => alert('Request sent successfully!')}
        />
      )}
      
      {showAppointmentModal && (
        <AppointmentModal
          item={item}
          onClose={() => setShowAppointmentModal(false)}
          onSuccess={() => alert('Appointment booked successfully! The owner will be notified.')}
        />
      )}
      
      {showImageViewer && (
        <ImageViewer
          images={[item.image_url, ...(item.additional_images || [])]}
          currentIndex={currentImageIndex}
          onClose={() => setShowImageViewer(false)}
          isOwner={user && user.username === item.username}
          onDeleteImage={async (imageIndex) => {
            if (imageIndex === 0) {
              alert('Cannot delete main image');
              return;
            }
            try {
              const token = localStorage.getItem('token');
              await axios.delete(`/api/items/${item.id}/images/${imageIndex - 1}`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              fetchItem(); // Refresh item data
              alert('Image deleted successfully!');
            } catch (error) {
              alert('Error deleting image');
            }
          }}
        />
      )}
    </div>
  );
};

export default ItemDetail;