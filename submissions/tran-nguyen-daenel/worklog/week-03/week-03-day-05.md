# Worklog - Ngày 30/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 30/05/2025  
- **Thứ:** Thứ Sáu  
- **Tuần thực tập:** Tuần thứ 3/12  
- **Thời

## 🎯 Mục tiêu ngày hôm nay
- [x] Hiểu và triển khai thử nghiệm VPC Peering.
- [x] Nắm vững lý thuyết về Transit Gateway.
- [x] Cấu hình EBS Data Lifecycle Manager để tự động hóa backup.
- [x] Hoàn thành báo cáo tổng kết tuần 3.

## 💼 Công việc đã thực hiện
### 1. Advanced Networking Lab ⏱️ 8:30-11:30
- **Mô tả**:
  - Tạo thêm một VPC thứ hai bằng CDK.
  - Thiết lập một kết nối VPC Peering giữa hai VPC.
  - Cập nhật Route Tables ở cả hai VPC để cho phép traffic đi qua lại.
  - Chạy một EC2 instance ở mỗi VPC và `ping` thành công lẫn nhau bằng private IP.
  - Đọc tài liệu về Transit Gateway để hiểu khi nào nên dùng nó thay cho Peering.
- **Kết quả**:
  - Hiểu rõ cách kết nối các mạng riêng biệt trên AWS.
  - Nắm được bài toán mà Transit Gateway giải quyết (tránh full-mesh peering).
- **Tools/Tech**:
  - AWS VPC
  - AWS CDK

### 2. Automating Backups ⏱️ 13:00-14:30
- **Mô tả**:
  - Truy cập EBS Data Lifecycle Manager.
  - Tạo một policy để tự động snapshot tất cả các volume EBS có tag `Backup: Daily` vào lúc 2 giờ sáng mỗi ngày.
  - Cấu hình retention rule để giữ lại 7 bản snapshot gần nhất.
- **Kết quả**:
  - Một chiến lược backup tự động, nhất quán đã được thiết lập, giảm rủi ro mất dữ liệu và công sức vận hành.
- **Tools/Tech**:
  - Amazon EBS Data Lifecycle Manager

### 3. Documentation and Weekly Review ⏱️ 14:30-16:30
- **Mô tả**:
  - Tổng hợp tất cả kiến thức, kỹ năng và thách thức trong tuần.
  - Viết báo cáo tổng kết tuần 3 chi tiết.
  - Dọn dẹp các tài nguyên đã tạo bằng `cdk destroy`.
- **Kết quả**:
  - Báo cáo tuần hoàn chỉnh.
  - Clean AWS account để tối ưu chi phí.
- **Tools/Tech**:
  - Notion
  - VS Code
  - Markdown

## 📚 Kiến thức học được
- **Technical Skills**:
  - VPC Peering
  - EBS Data Lifecycle Manager
  - Transit Gateway (theory)
- **Concepts & Theory**:
  - Network topology
  - Backup and Recovery strategy
- **Soft Skills**:
  - Viết báo cáo kỹ thuật
  - Quản lý tài nguyên
  - Tổng hợp kiến thức

## 🚧 Khó khăn và giải pháp
- **Vấn đề**:
  - Sau khi thiết lập Peering, 2 instance vẫn không `ping` được nhau.
- **Giải pháp**:
  - Kiểm tra kỹ lại từng bước.
  - Phát hiện ra đã quên cập nhật Security Group của các instance để cho phép ICMP traffic (giao thức của `ping`) từ dải CIDR của VPC đối diện.

## 💭 Reflection & Insights
- **Key Insight**:
  - Một kiến trúc tốt không chỉ là về hiệu năng và tự động hóa, mà còn phải dễ dàng cho việc vận hành và bảo trì.
  - Các dịch vụ như Data Lifecycle Manager giúp giải quyết bài toán vận hành một cách hiệu quả.

## 📋 Kế hoạch cho tuần tới
- **High**:
  - Bắt đầu tìm hiểu sâu về **An ninh và Bảo mật (Security)** trên AWS.
- **Medium**:
  - Lên kế hoạch tích hợp **AWS WAF** vào CloudFront.
- **Low**:
  - Nghiên cứu về **Disaster Recovery**.
---
*Worklog created by: Tran Nguyen Daenel*  
*Next review: 02/06/2025*