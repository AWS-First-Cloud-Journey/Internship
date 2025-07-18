# 🚀 AWS Services Overview - FCJ Internship Reference

[![AWS](https://img.shields.io/badge/AWS-Services-orange)](https://aws.amazon.com/)
[![Reference](https://img.shields.io/badge/Type-Reference-blue)](https://github.com/AWS-First-Cloud-Journey/Internship)

## 🎯 Mục đích

Tài liệu này cung cấp overview về các AWS services quan trọng nhất cho FCJ Internship Program, giúp thực tập sinh:

- **📚 Quick Reference**: Tra cứu nhanh thông tin services
- **🎯 Project Planning**: Chọn services phù hợp cho project proposal
- **💡 Learning Path**: Ưu tiên học các services quan trọng
- **🔗 Deep Dive**: Links đến documentation chi tiết

---

## 🏗️ Core Infrastructure Services

### 💻 Compute Services

#### Amazon EC2 (Elastic Compute Cloud)
- **Mục đích**: Virtual servers in the cloud
- **Use Cases**: Web applications, batch processing, gaming servers
- **Key Features**: 
  - Multiple instance types (General Purpose, Compute Optimized, Memory Optimized)
  - Auto Scaling capabilities
  - Spot Instances for cost optimization
- **Pricing**: Pay-per-hour or per-second
- **Best For**: Traditional applications, lift-and-shift migrations
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

#### AWS Lambda
- **Mục đích**: Serverless compute service
- **Use Cases**: Event-driven applications, microservices, data processing
- **Key Features**:
  - No server management
  - Automatic scaling
  - Pay-per-request pricing
- **Pricing**: Pay per invocation and duration
- **Best For**: Event-driven architectures, serverless applications
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

#### Amazon ECS (Elastic Container Service)
- **Mục đích**: Container orchestration service
- **Use Cases**: Microservices, batch processing, web applications
- **Key Features**:
  - Docker container support
  - Integration with other AWS services
  - Fargate for serverless containers
- **Best For**: Containerized applications
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

#### Amazon EKS (Elastic Kubernetes Service)
- **Mục đích**: Managed Kubernetes service
- **Use Cases**: Complex containerized applications, multi-cloud deployments
- **Key Features**:
  - Fully managed Kubernetes control plane
  - Integration with AWS services
  - High availability
- **Best For**: Kubernetes-native applications
- **Learning Priority**: ⭐⭐⭐ (Advanced)

### 💾 Storage Services

#### Amazon S3 (Simple Storage Service)
- **Mục đích**: Object storage service
- **Use Cases**: Static websites, data backup, content distribution
- **Key Features**:
  - 99.999999999% (11 9's) durability
  - Multiple storage classes
  - Lifecycle management
- **Storage Classes**:
  - Standard: Frequently accessed data
  - IA (Infrequent Access): Less frequently accessed
  - Glacier: Long-term archival
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

#### Amazon EBS (Elastic Block Store)
- **Mục đích**: Block storage for EC2 instances
- **Use Cases**: Database storage, file systems, boot volumes
- **Key Features**:
  - High IOPS performance
  - Snapshot capabilities
  - Encryption support
- **Volume Types**:
  - gp3: General Purpose SSD
  - io2: Provisioned IOPS SSD
  - st1: Throughput Optimized HDD
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

#### Amazon EFS (Elastic File System)
- **Mục đích**: Managed NFS file system
- **Use Cases**: Shared storage, content repositories, data analytics
- **Key Features**:
  - Scalable performance
  - POSIX-compliant
  - Multi-AZ access
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### 🗄️ Database Services

#### Amazon RDS (Relational Database Service)
- **Mục đích**: Managed relational databases
- **Supported Engines**: MySQL, PostgreSQL, MariaDB, Oracle, SQL Server, Aurora
- **Key Features**:
  - Automated backups
  - Multi-AZ deployments
  - Read replicas
- **Use Cases**: Web applications, e-commerce, CRM systems
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

#### Amazon DynamoDB
- **Mục đích**: Managed NoSQL database
- **Use Cases**: Mobile apps, gaming, IoT, real-time applications
- **Key Features**:
  - Single-digit millisecond latency
  - Automatic scaling
  - Global tables
- **Best For**: High-performance applications with predictable workloads
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

#### Amazon ElastiCache
- **Mục đích**: In-memory caching service
- **Engines**: Redis, Memcached
- **Use Cases**: Session storage, real-time analytics, caching
- **Key Features**:
  - Microsecond latency
  - High throughput
  - Automatic failover
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

---

## 🌐 Networking & Content Delivery

### Amazon VPC (Virtual Private Cloud)
- **Mục đích**: Isolated cloud resources
- **Key Components**:
  - Subnets (Public/Private)
  - Internet Gateway
  - NAT Gateway
  - Route Tables
  - Security Groups
  - NACLs
- **Use Cases**: Secure application hosting, hybrid cloud
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

### Amazon CloudFront
- **Mục đích**: Content Delivery Network (CDN)
- **Use Cases**: Static content delivery, video streaming, API acceleration
- **Key Features**:
  - Global edge locations
  - DDoS protection
  - SSL/TLS termination
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

### Application Load Balancer (ALB)
- **Mục đích**: Layer 7 load balancing
- **Use Cases**: Web applications, microservices, containers
- **Key Features**:
  - Path-based routing
  - Host-based routing
  - WebSocket support
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

### Amazon Route 53
- **Mục đích**: DNS web service
- **Use Cases**: Domain registration, DNS routing, health checking
- **Key Features**:
  - Multiple routing policies
  - Health checks
  - Domain registration
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

---

## 🔐 Security & Identity Services

### AWS IAM (Identity and Access Management)
- **Mục đích**: Access control and identity management
- **Key Components**:
  - Users, Groups, Roles
  - Policies (Managed/Inline)
  - Multi-Factor Authentication
- **Best Practices**:
  - Principle of least privilege
  - Use roles for applications
  - Enable MFA
- **Learning Priority**: ⭐⭐⭐⭐⭐ (Essential)

### AWS Secrets Manager
- **Mục đích**: Secure secrets storage and rotation
- **Use Cases**: Database credentials, API keys, certificates
- **Key Features**:
  - Automatic rotation
  - Fine-grained access control
  - Integration with RDS
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### AWS KMS (Key Management Service)
- **Mục đích**: Encryption key management
- **Use Cases**: Data encryption, compliance requirements
- **Key Features**:
  - Customer managed keys
  - Automatic key rotation
  - CloudTrail integration
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### AWS WAF (Web Application Firewall)
- **Mục đích**: Web application protection
- **Use Cases**: SQL injection protection, XSS prevention, rate limiting
- **Key Features**:
  - Managed rules
  - Custom rules
  - Real-time metrics
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

---

## 🔗 Integration & API Services

### Amazon API Gateway
- **Mục đích**: API management service
- **Use Cases**: REST APIs, WebSocket APIs, serverless backends
- **Key Features**:
  - Request/response transformation
  - Authentication and authorization
  - Rate limiting and throttling
- **Integration**: Lambda, EC2, HTTP endpoints
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

### Amazon SQS (Simple Queue Service)
- **Mục đích**: Message queuing service
- **Use Cases**: Decoupling applications, batch processing
- **Queue Types**:
  - Standard: At-least-once delivery
  - FIFO: Exactly-once processing
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### Amazon SNS (Simple Notification Service)
- **Mục đích**: Pub/sub messaging service
- **Use Cases**: Application notifications, mobile push notifications
- **Key Features**:
  - Multiple delivery protocols
  - Message filtering
  - Dead letter queues
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### Amazon EventBridge
- **Mục đích**: Event bus service
- **Use Cases**: Event-driven architectures, application integration
- **Key Features**:
  - Custom event buses
  - Schema registry
  - Event replay
- **Learning Priority**: ⭐⭐ (Advanced)

---

## 📊 Analytics & Big Data

### Amazon Kinesis
- **Mục đích**: Real-time data streaming
- **Services**:
  - Kinesis Data Streams: Real-time data ingestion
  - Kinesis Data Firehose: Data delivery to destinations
  - Kinesis Analytics: Real-time analytics
- **Use Cases**: Log analysis, real-time dashboards, IoT data processing
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### Amazon Redshift
- **Mục đích**: Data warehouse service
- **Use Cases**: Business intelligence, data analytics, reporting
- **Key Features**:
  - Columnar storage
  - Massively parallel processing
  - Integration with BI tools
- **Learning Priority**: ⭐⭐ (Advanced)

### AWS Glue
- **Mục đích**: ETL service
- **Use Cases**: Data preparation, data cataloging, serverless ETL
- **Key Features**:
  - Data catalog
  - Automatic schema discovery
  - Serverless execution
- **Learning Priority**: ⭐⭐ (Advanced)

---

## 🤖 Machine Learning & AI

### Amazon SageMaker
- **Mục đích**: Machine learning platform
- **Use Cases**: Model training, deployment, management
- **Key Features**:
  - Jupyter notebooks
  - Built-in algorithms
  - Model endpoints
- **Learning Priority**: ⭐⭐ (Advanced)

### Amazon Rekognition
- **Mục đích**: Image and video analysis
- **Use Cases**: Content moderation, facial recognition, object detection
- **Key Features**:
  - Pre-trained models
  - Custom labels
  - Real-time analysis
- **Learning Priority**: ⭐⭐ (Advanced)

### Amazon Comprehend
- **Mục đích**: Natural language processing
- **Use Cases**: Sentiment analysis, entity extraction, language detection
- **Key Features**:
  - Pre-built models
  - Custom classification
  - Real-time analysis
- **Learning Priority**: ⭐⭐ (Advanced)

---

## 📈 Monitoring & Management

### Amazon CloudWatch
- **Mục đích**: Monitoring and observability
- **Key Features**:
  - Metrics collection
  - Log aggregation
  - Alarms and notifications
  - Dashboards
- **Use Cases**: Performance monitoring, troubleshooting, capacity planning
- **Learning Priority**: ⭐⭐⭐⭐ (Important)

### AWS CloudTrail
- **Mục đích**: API logging and auditing
- **Use Cases**: Compliance, security analysis, troubleshooting
- **Key Features**:
  - API call logging
  - Event history
  - Integration with CloudWatch
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### AWS Config
- **Mục đích**: Resource configuration tracking
- **Use Cases**: Compliance monitoring, change management
- **Key Features**:
  - Configuration snapshots
  - Compliance rules
  - Change notifications
- **Learning Priority**: ⭐⭐ (Advanced)

### AWS Systems Manager
- **Mục đích**: Operational management
- **Use Cases**: Patch management, configuration management, automation
- **Key Features**:
  - Parameter Store
  - Session Manager
  - Patch Manager
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

---

## 🚀 DevOps & Deployment

### AWS CodeCommit
- **Mục đích**: Git repository hosting
- **Use Cases**: Source code management, version control
- **Key Features**:
  - Private Git repositories
  - Integration with AWS services
  - High availability
- **Learning Priority**: ⭐⭐ (Intermediate)

### AWS CodeBuild
- **Mục đích**: Build service
- **Use Cases**: Continuous integration, automated testing
- **Key Features**:
  - Managed build environment
  - Custom build environments
  - Integration with CI/CD pipelines
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### AWS CodeDeploy
- **Mục đích**: Application deployment
- **Use Cases**: Automated deployments, blue/green deployments
- **Key Features**:
  - Rolling deployments
  - Automatic rollback
  - Integration with EC2, Lambda, ECS
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

### AWS CodePipeline
- **Mục đích**: CI/CD pipeline service
- **Use Cases**: Automated release pipelines, continuous delivery
- **Key Features**:
  - Visual pipeline builder
  - Integration with third-party tools
  - Parallel execution
- **Learning Priority**: ⭐⭐⭐ (Intermediate)

---

## 🎯 Service Selection Guide for Projects

### 🏢 Enterprise Applications
**Recommended Stack**:
- **Compute**: EC2 + Auto Scaling Groups
- **Database**: RDS (Multi-AZ)
- **Storage**: S3 + EBS
- **Networking**: VPC + ALB + CloudFront
- **Security**: IAM + WAF + Secrets Manager
- **Monitoring**: CloudWatch + CloudTrail

### 🚀 Serverless Applications
**Recommended Stack**:
- **Compute**: Lambda
- **Database**: DynamoDB
- **Storage**: S3
- **API**: API Gateway
- **Integration**: SQS + SNS
- **Monitoring**: CloudWatch + X-Ray

### 📱 Mobile/Web Applications
**Recommended Stack**:
- **Frontend**: S3 + CloudFront
- **Backend**: Lambda + API Gateway
- **Database**: DynamoDB + RDS
- **Authentication**: Cognito
- **Storage**: S3
- **Push Notifications**: SNS

### 📊 Data Analytics Applications
**Recommended Stack**:
- **Data Ingestion**: Kinesis
- **Data Storage**: S3 + Redshift
- **Data Processing**: Glue + EMR
- **Analytics**: QuickSight
- **ML**: SageMaker

### 🎮 Gaming Applications
**Recommended Stack**:
- **Compute**: EC2 + ECS
- **Database**: DynamoDB + ElastiCache
- **Real-time**: API Gateway WebSocket
- **Storage**: S3
- **CDN**: CloudFront
- **Analytics**: Kinesis

---

## 📚 Learning Resources

### Official Documentation
- [AWS Documentation](https://docs.aws.amazon.com/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)

### Training & Certification
- [AWS Training and Certification](https://aws.amazon.com/training/)
- [AWS Cloud Practitioner Essentials](https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/)
- [AWS Solutions Architect Learning Path](https://aws.amazon.com/training/learning-paths/architect/)

### Hands-on Learning
- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Workshops](https://workshops.aws/)
- [AWS Samples on GitHub](https://github.com/aws-samples)

### Community Resources
- [AWS Community Builders](https://aws.amazon.com/developer/community/community-builders/)
- [AWS User Groups](https://aws.amazon.com/developer/community/usergroups/)
- [r/aws Subreddit](https://reddit.com/r/aws)

---

## 🎯 Priority Learning Path

### Week 1-2: Foundation
1. **IAM** - Security fundamentals
2. **EC2** - Compute basics
3. **S3** - Storage fundamentals
4. **VPC** - Networking basics

### Week 3-4: Core Services
1. **RDS** - Database management
2. **Lambda** - Serverless computing
3. **API Gateway** - API management
4. **CloudWatch** - Monitoring

### Week 5-6: Advanced Services
1. **DynamoDB** - NoSQL database
2. **SQS/SNS** - Messaging services
3. **CloudFront** - Content delivery
4. **ECS/EKS** - Container services

### Week 7-8: Specialization
1. **Machine Learning** - SageMaker, Rekognition
2. **Analytics** - Kinesis, Redshift
3. **DevOps** - CodePipeline, CodeBuild
4. **Advanced Security** - WAF, KMS

---

**🎯 Pro Tip**: Focus on understanding the "why" behind each service, not just the "what". This will help you make better architectural decisions in your project proposals!

---

*Tài liệu này sẽ được cập nhật thường xuyên với các services mới và best practices. Bookmark để reference trong suốt quá trình thực tập!*
