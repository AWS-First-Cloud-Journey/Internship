# Worklog - Ngày 14/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 14/05/2025  
- **Thứ**: Thứ Tư  
- **Tuần thực tập**: Tuần thứ 1/12  
- **Thời gian làm việc**: 8:00 - 17:00  
- **Mood**: 🔍 Tập trung cao độ, hứng thú với thực hành CLI và EC2

---

## 🎯 Mục tiêu ngày hôm nay
- [x] Làm quen với AWS CLI, cấu hình và sử dụng lệnh cơ bản  
- [x] Khởi tạo EC2 instance đầu tiên  
- [x] SSH vào EC2 và thực hành thao tác Linux cơ bản  
- [x] Cài đặt NGINX trên EC2 Ubuntu  

---

## 💼 Công việc đã thực hiện

### 1. AWS CLI Installation & Configuration ⏱️ 2 giờ
- **Mô tả**: Tải và cài AWS CLI trên máy tính cá nhân, cấu hình với IAM User access  
- **Câu lệnh sử dụng**: `aws configure`, `aws s3 ls`, `aws ec2 describe-instances`  
- **Kết quả**: CLI hoạt động ổn định, kết nối được với AWS thông qua Access Key  
- **Tools**: AWS CLI v2, Terminal, IAM credentials  

### 2. Launching EC2 Instance ⏱️ 2.5 giờ
- **Mô tả**: Tạo EC2 Ubuntu Server 22.04 t2.micro (Free Tier), gán Security Group và tạo key pair SSH  
- **Cài đặt**: Chọn VPC mặc định, cấu hình inbound rules (port 22, 80)  
- **Kết quả**: Instance hoạt động thành công, trạng thái "running"  
- **Tools**: AWS EC2 Console, SSH Key Pair, IAM Role  

### 3. SSH Access & Linux Practice ⏱️ 2 giờ
- **Mô tả**: Dùng terminal để SSH vào EC2, chạy các lệnh Linux cơ bản  
- **Thao tác**: `ls`, `cd`, `touch`, `nano`, `apt update`, `ufw`, user permissions  
- **Kết quả**: Làm chủ thao tác trong môi trường remote server Ubuntu  
- **Tools**: Terminal, EC2 SSH, Bash shell

### 4. Web Server Setup (NGINX) ⏱️ 1 giờ
- **Mô tả**: Cài đặt NGINX để host static site cơ bản  
- **Lệnh thực hiện**: `sudo apt install nginx`, mở port 80  
- **Kết quả**: Truy cập thành công trang welcome của NGINX từ IP public  
- **Tools**: EC2, NGINX, Linux

---

## 📚 Kiến thức học được

### 🔧 Technical Skills
- Cấu hình và sử dụng AWS CLI  
- Tạo và quản lý EC2 instance (AMI, key pair, SG)  
- SSH vào server Ubuntu, thao tác trên Linux  
- Cài đặt web server NGINX thủ công

### 💡 Concepts & Theory
- SSH Key-based Authentication  
- Inbound/Outbound Rules trong Security Group  
- Phân biệt Public IP và Private IP  
- Linux Package Management: `apt`, `systemctl`

### 🤝 Soft Skills
- Làm việc độc lập với terminal CLI  
- Rèn luyện thao tác command-line và troubleshooting  
- Quản lý tài nguyên AWS theo hướng DevOps

---

## 🚧 Khó khăn & Giải pháp

### Vấn đề: Không truy cập được EC2 từ terminal
- **Nguyên nhân**: Thiếu rule mở port 22 trong Security Group  
- **Cách xử lý**: Truy cập lại EC2 > Network > Security Group > Edit inbound rules  
- **Kết quả**: SSH hoạt động ổn định sau khi thêm rule đúng  
- **Bài học**: Cần kiểm tra cấu hình firewall (SG, UFW) nếu có lỗi kết nối

---

## 💭 Reflection & Insights

### What went well?
- Sử dụng AWS CLI mượt mà, nắm chắc lệnh cơ bản  
- Tự tin launch và SSH vào EC2 lần đầu  
- Cài đặt NGINX thành công ngay lần đầu, cảm giác “deploy được server” rất đã 😎

### What could be improved?
- Nên ghi chú lại tất cả các lệnh CLI và Linux  
- Thử thêm trường hợp tạo EC2 bằng CLI thay vì Console  
- Cần luyện thêm về quản lý người dùng Linux và phân quyền

### Key Insights
- CLI là công cụ cực kỳ quan trọng trong DevOps – thao tác nhanh và chính xác hơn Console  
- Kiến thức về Networking cơ bản là bắt buộc (VPC, IP, SG)  
- DevOps không chỉ là dùng tool, mà còn là hiểu rõ cách hoạt động bên dưới

---

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: Tìm hiểu sâu về IAM Roles và Policies nâng cao  
- [ ] **Medium**: Tạo S3 bucket và thử upload file bằng CLI  
- [ ] **Low**: Thực hành thêm cấu hình NGINX cho static content

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 15/05/2025*
