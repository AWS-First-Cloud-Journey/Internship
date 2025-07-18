# Worklog - Ngày 16/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 16/05/2025
- **Thứ**: Thứ Sáu
- **Tuần thực tập**: Tuần thứ 1/12
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 🔧 Tập trung và hào hứng với kỹ năng CLI & IAM

---

## 🎯 Mục tiêu ngày hôm nay
- [x] Làm việc với AWS CLI để quản lý tài nguyên
- [x] Tìm hiểu và triển khai IAM User, Group và Policy
- [x] Thử nghiệm phân quyền S3 qua CLI

---

## 💼 Công việc đã thực hiện

### 1. Cài đặt và cấu hình AWS CLI ⏱️ 1 giờ
- **Mô tả**: Cài đặt AWS CLI v2 trên Ubuntu và cấu hình với Access Key
- **Kết quả**: CLI hoạt động, có thể thực hiện lệnh `aws s3 ls` thành công
- **Tech/Tools**: AWS CLI, Ubuntu Terminal
- **Links**: Screenshot terminal + AWS Docs

### 2. IAM Users, Groups & Policies ⏱️ 3 giờ
- **Mô tả**: Tạo user/group và gán policies thông qua CLI
- **Kết quả**: Tạo được nhóm "DevOpsTeam", user "daenel_devops", gán quyền truy cập S3 read-only
- **Tech/Tools**: `aws iam` commands, JSON policies
- **Links**: IAM Policy JSON, CLI command history

### 3. Thử nghiệm truy cập S3 thông qua user mới ⏱️ 2 giờ
- **Mô tả**: Dùng AWS CLI đăng nhập bằng IAM user và test lệnh với S3
- **Kết quả**: Đọc bucket thành công nhưng bị từ chối ghi, đúng với policy
- **Tech/Tools**: CLI profile, IAM permission boundaries
- **Links**: Policy result screenshot, `aws s3 cp` logs

---

## 📚 Kiến thức học được

### 🔧 Technical Skills
- Cài đặt và sử dụng AWS CLI thành thạo
- Tạo và phân quyền IAM user bằng CLI
- Sử dụng JSON để viết IAM Policy
- Quản lý CLI profiles đa người dùng

### 💡 Concepts & Theory
- IAM Best Practices: Least Privilege, MFA, access keys rotation
- AWS CLI cấu trúc lệnh: `aws <service> <command> --parameters`
- Phân biệt Managed Policy vs Inline Policy

### 🤝 Soft Skills
- Đọc hiểu JSON và command line output
- Ghi chú kỹ log CLI cho debug
- Kiên nhẫn xử lý lỗi `AccessDenied`

---

## 🚧 Khó khăn và giải pháp

### Vấn đề: Gán policy sai format JSON
- **Impact**: Lỗi `MalformedPolicyDocument`
- **Nguyên nhân**: Thiếu dấu `,` giữa các statements
- **Giải pháp**: Kiểm tra lại policy bằng [IAM Policy Simulator](https://policysim.aws.amazon.com/)
- **Bài học**: Luôn validate JSON trước khi attach policy

---

## 💭 Reflection & Insights

### What went well today?
- Hiểu được cách hoạt động và cấu trúc IAM
- Tạo user và group bằng CLI dễ dàng sau khi quen
- Biết sử dụng profile CLI cho nhiều người dùng

### What could be improved?
- Cần nhớ rõ syntax CLI, tránh mất thời gian tra cứu lại
- Sử dụng IAM Policy Simulator từ đầu để tiết kiệm thời gian
- Nên học thêm về STS và temporary credentials

### Key Insights
- CLI là công cụ mạnh, cần thành thạo trong DevOps
- IAM là thành phần cốt lõi của bảo mật AWS
- Có thể automation được việc tạo user & phân quyền bằng script

---

## 📋 Kế hoạch tuần sau

### DevOps Week 2 Goals (Dự kiến)
- [ ] Làm việc với AWS EC2 và key pairs
- [ ] Tự động hóa việc launch EC2 qua CLI
- [ ] Làm quen với CloudWatch logs
- [ ] Khởi động lộ trình học Terraform

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: Tuần 2 - Bắt đầu từ 20/05/2025*
