# Worklog - Ngày 04/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 04/06/2025  
- **Thứ:** Thứ Tư  
- **Tuần thực tập:** Tuần thứ 4/12  
- **Thời gian làm việc:** 9:00 - 17:00  
- **Mood:** 📜 Writing the rulebook for infrastructure.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu vai trò của AWS Config trong việc kiểm toán và giám sát tuân thủ.
- [x] Bật AWS Config và tìm hiểu về Configuration Recorder và Delivery Channel.
- [x] Triển khai các quy tắc quản lý (Managed Rules) của AWS Config.
- [x] Tìm hiểu về Conformance Packs.

---

## 💼 Công việc đã thực hiện

### 1. Setting up AWS Config ⏱️ 9:00-11:00

**Mô tả:**  
- Kích hoạt AWS Config  
- Cấu hình để ghi lại tất cả các thay đổi cấu hình của tài nguyên trong region  
- Cấu hình một S3 bucket để lưu trữ lịch sử cấu hình  

**Kết quả:**  
- AWS Config bắt đầu theo dõi và ghi lại mọi thay đổi  
- Có thể xem timeline cấu hình của một EC2 instance bất kỳ  

**Tools/Tech:**  
- AWS Config  
- S3  

---

### 2. Deploying Config Rules ⏱️ 11:00-12:30, 13:30-16:00

**Mô tả:**  
- Deploy 3 Managed Rules:  
    - `s3-bucket-public-read-prohibited`: Kiểm tra bucket S3 có cho phép đọc công khai không  
    - `encrypted-volumes`: Kiểm tra các volume EBS có được mã hóa không  
    - `ec2-instance-no-public-ip`: Kiểm tra EC2 instance có IP công cộng không  

**Kết quả:**  
- Dashboard của AWS Config hiển thị các tài nguyên tuân thủ và không tuân thủ cho từng rule  
- Nhận diện được một volume EBS chưa được mã hóa  

**Tools/Tech:**  
- AWS Config Rules  

---

### 3. Exploring Conformance Packs ⏱️ 16:00-17:00

**Mô tả:**  
- Tìm hiểu Conformance Packs là một bộ sưu tập các Config Rule và hành động khắc phục  
- Giúp triển khai một framework tuân thủ (ví dụ: Well-Architected) một cách nhanh chóng  

**Kết quả:**  
- Hiểu cách để mở rộng quy mô giám sát tuân thủ cho toàn bộ tổ chức  

**Tools/Tech:**  
- AWS Config Conformance Packs  

---

## 📚 Kiến thức học được

- **Technical Skills:**  
    - AWS Config  
    - AWS Config Rules  
    - Configuration History  
    - Compliance Monitoring  
- **Concepts & Theory:**  
    - Compliance as Code  
    - Configuration Drift  
    - Auditing  
- **Soft Skills:**  
    - Tư duy dựa trên quy tắc (Rule-based thinking)  
    - Tự động hóa kiểm toán  

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    - Sau khi một rule báo tài nguyên không tuân thủ, không rõ phải làm gì tiếp theo  
- **Giải pháp:**  
    - Tìm hiểu về "Remediation Actions"  
    - AWS Config có thể được cấu hình để tự động chạy một SSM Automation document để khắc phục tài nguyên không tuân thủ (ví dụ: tự động bật mã hóa cho volume EBS)  
    - Đây là bước tiếp theo để tự động hóa hoàn toàn  

---

## 💭 Reflection & Insights

**Key Insight:**  
- Nếu IaC (như CDK) là cách để định nghĩa trạng thái mong muốn của hạ tầng  
- Thì AWS Config là cách để đảm bảo hạ tầng luôn ở trong trạng thái mong muốn đó  

---

## 📋 Kế hoạch ngày mai

- **High:**  
    - Tìm hiểu về các chiến lược Disaster Recovery (DR)  
- **Medium:**  
    - Thực hành lab Backup & Restore cho RDS qua các region  

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 04/06/2025*