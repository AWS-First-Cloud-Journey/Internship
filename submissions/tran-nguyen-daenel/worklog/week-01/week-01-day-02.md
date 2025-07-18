# Worklog - Ngày 13/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 13/05/2025  
- **Thứ**: Thứ Ba  
- **Tuần thực tập**: Tuần thứ 1/12  
- **Thời gian làm việc**: 8:00 - 17:00  
- **Mood**: 💪 Quyết tâm nắm vững quản lý quyền truy cập và CLI

---

## 🎯 Mục tiêu ngày hôm nay
- [x] Làm quen với AWS IAM: Users, Groups, Roles, Policies  
- [x] Thiết lập MFA và security best practices  
- [x] Cài đặt AWS CLI và thực hành các lệnh cơ bản  
- [x] Khởi tạo EC2 instance đầu tiên

---

## 💼 Công việc đã thực hiện

### 1. IAM Fundamentals + MFA Setup ⏱️ 2.5 giờ
- **Mô tả**: Tìm hiểu vai trò của IAM trong quản trị người dùng & quyền truy cập  
- **Thực hành**:  
  - Tạo IAM User với quyền lập trình (Programmatic access)  
  - Tạo IAM Group với policy `PowerUserAccess`  
  - Kích hoạt MFA bằng ứng dụng Google Authenticator  
- **Kết quả**: IAM được thiết lập an toàn, chuẩn DevOps best practice  
- **Tools**: AWS Console, IAM, MFA App  
- **Links**: IAM policy JSON snippets

---

### 2. AWS CLI Setup + Basic Commands ⏱️ 2 giờ
- **Mô tả**: Cài đặt AWS CLI v2, cấu hình credential và region  
- **Thực hành**:  
  - `aws configure`, `aws iam list-users`, `aws s3 ls`  
  - Kiểm tra quyền truy cập và thử gán policy từ CLI  
- **Kết quả**: Có thể thao tác cơ bản với CLI thay vì chỉ dùng Console  
- **Tools**: Terminal, AWS CLI, IAM Policies

---

### 3. EC2 Launch & SSH Access ⏱️ 2.5 giờ
- **Mô tả**: Khởi tạo EC2 instance (Amazon Linux 2), cấu hình Security Group  
- **Thực hành**:  
  - Chọn AMI, tạo key pair `.pem`  
  - Mở cổng 22 (SSH) trong Security Group  
  - SSH vào EC2 và cài đặt Apache  
- **Kết quả**: Truy cập server thành công và triển khai web tĩnh đơn giản  
- **Tools**: EC2, SSH, Apache  
- **Links**: EC2 instance screenshot

---

## 📚 Kiến thức học được

### 🔧 Technical Skills
- IAM: Tạo và gán chính sách cho User, Group  
- MFA: Thiết lập bảo mật đa lớp  
- CLI: Cấu hình & sử dụng CLI căn bản  
- EC2: Khởi tạo, SSH truy cập và cấu hình web server

### 💡 Concepts & Theory
- Principle of Least Privilege  
- MFA vs Access Keys  
- Security Group vs NACL  
- Region & AZ trong thiết kế hạ tầng

### 🤝 Soft Skills
- Kỹ năng tìm kiếm lỗi SSH và debugging port  
- Cải thiện khả năng đọc AWS Docs và hiểu JSON Policy  
- Lên kế hoạch triển khai từ CLI thay vì giao diện đồ họa

---

## 🚧 Khó khăn và giải pháp

### Vấn đề: SSH Timeout khi truy cập EC2
- **Nguyên nhân**: Chưa mở cổng 22 trong Security Group  
- **Giải pháp**: Chỉnh sửa rule trong Security Group và xác minh IP  
- **Kết quả**: Truy cập EC2 thành công  
- **Bài học**: Luôn kiểm tra Inbound Rules khi gặp lỗi kết nối

---

## 💭 Reflection & Insights

### What went well?
- Làm chủ được CLI và IAM cơ bản  
- Cảm nhận rõ tính thực tiễn khi thao tác trên EC2 thật  
- Hiểu được mối quan hệ giữa security và deployment

### What could be improved?
- Cần luyện thêm viết IAM policies tùy chỉnh  
- Tạo checklist trước khi launch EC2 để tránh lỗi lặp lại  
- Ghi chú kỹ hơn để chuẩn bị cho bài viết blog cuối tuần

### Key Takeaways
- DevOps không chỉ là kỹ thuật mà còn là mindset tự động hóa & tối ưu  
- Quản lý quyền truy cập là phần cốt lõi đầu tiên trong mọi dự án AWS  
- AWS CLI giúp tăng tốc workflow rất nhiều nếu nắm vững

---

## 📋 Kế hoạch ngày mai (14/05/2025)

### Priority Tasks
- [ ] **High**: Tìm hiểu về S3 – tạo bucket và phân quyền  
- [ ] **Medium**: Viết script tự động upload file từ CLI  
- [ ] **Low**: Khám phá thêm về các service VPC, SG, ACL

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 14/05/2025*
