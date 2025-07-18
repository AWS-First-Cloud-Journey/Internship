# Worklog - Ngày 15/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 15/05/2025  
- **Thứ**: Thứ Năm  
- **Tuần thực tập**: Tuần thứ 1/12  
- **Thời gian làm việc**: 8:00 - 17:00  
- **Mood**: 🤓 Hào hứng khi hiểu sâu hơn về quản lý truy cập và CLI

---

## 🎯 Mục tiêu ngày hôm nay
- [x] Tìm hiểu sâu về AWS IAM: User, Role, Group, Policy  
- [x] Quản lý truy cập S3 qua IAM Policies  
- [x] Sử dụng AWS CLI để thao tác với IAM và S3  
- [x] Hiểu và ứng dụng nguyên tắc Least Privilege

---

## 💼 Công việc đã thực hiện

### 1. IAM Deep Dive ⏱️ 2.5 giờ
- **Mô tả**: Đọc tài liệu và thực hành tạo IAM User, Group, và Role  
- **Thao tác**:  
  - Tạo IAM Group `devops-team` gán quyền `AmazonEC2FullAccess`  
  - Tạo User `binh-devops` và gán vào group  
  - Tạo Role cho EC2 truy cập S3 với quyền `AmazonS3ReadOnlyAccess`  
- **Kết quả**: Có thể login bằng user riêng và thao tác đúng quyền  
- **Tools**: AWS IAM Console, JSON Policy Editor, IAM Policy Simulator

### 2. AWS CLI: IAM & S3 ⏱️ 2 giờ
- **Mô tả**: Cấu hình AWS CLI và sử dụng để quản lý user, bucket  
- **Thao tác**:  
  ```bash
  aws configure
  aws iam list-users
  aws s3 mb s3://binh-devops-demo-bucket
  aws s3 cp sample.txt s3://binh-devops-demo-bucket/
  ```
- **Kết quả**: Làm quen với dòng lệnh, thao tác chính xác, quản lý S3 hiệu quả  
- **Tools**: Terminal, AWS CLI v2

### 3. Kiểm soát quyền truy cập S3 ⏱️ 2 giờ
- **Mô tả**: Phân quyền chi tiết thông qua S3 Bucket Policy và IAM Policy  
- **Thao tác**:  
  - Cấu hình bucket policy cho phép user cụ thể đọc file  
  - Gỡ bỏ quyền truy cập và test kết quả  
- **Kết quả**: Nắm rõ cách deny/allow truy cập tài nguyên S3  
- **Tools**: AWS S3 Console, Policy Generator

---

## 📚 Kiến thức học được

### 🔧 Technical Skills
- Tạo IAM User/Group/Role theo thực tế DevOps  
- Quản lý truy cập AWS bằng policy dạng JSON  
- Sử dụng AWS CLI thao tác tài nguyên

### 💡 Concepts & Theory
- Nguyên tắc Least Privilege  
- Sự khác biệt giữa Identity-based vs Resource-based policy  
- IAM Policy Evaluation Logic (Explicit deny luôn thắng)

### 🤝 Soft Skills
- Kiên nhẫn debug CLI + policy  
- Ghi chép quá trình test vào nhật ký học tập  
- Chủ động tìm hiểu AWS Docs & Forums khi gặp lỗi

---

## 🚧 Khó khăn & Giải pháp

### Vấn đề: CLI upload file lên S3 bị Access Denied
- **Nguyên nhân**: Thiếu quyền `s3:PutObject` trong IAM Policy  
- **Cách xử lý**: Thêm quyền `s3:PutObject` cho user  
- **Kết quả**: Upload thành công sau khi cập nhật policy  
- **Bài học**: Luôn kiểm tra policy với simulator trước khi test thật

---

## 💭 Reflection & Insights

### What went well?
- Hiểu được cách hoạt động nội bộ của IAM  
- Có thể thao tác bằng CLI tự tin hơn  
- Tự giải quyết lỗi access thông qua AWS Docs  

### What could be improved?
- Nên viết script CLI thay vì gõ từng dòng  
- Cần luyện tập thêm với policy JSON  
- Bổ sung thói quen sử dụng MFA cho IAM User

### Key Insights
- IAM là cốt lõi trong mọi hoạt động bảo mật và phân quyền DevOps  
- CLI giúp tiết kiệm rất nhiều thời gian khi thao tác hàng loạt  
- Chính sách phân quyền càng cụ thể càng dễ kiểm soát và bảo mật

---

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: Làm quen với CloudWatch Logs và Monitoring  
- [ ] **Medium**: Thực hành tạo Launch Template và Auto Scaling Group  
- [ ] **Low**: Viết Bash Script để tự động hóa backup S3 định kỳ

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 16/05/2025*
