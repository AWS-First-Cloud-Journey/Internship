# Worklog - Ngày 19/06/2025

## 📅 Thông tin cơ bản
- **Ngày**: 19/06/2025
- **Thứ**: Thứ Năm
- **Tuần thực tập**: Tuần thứ 6/8
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 😔 Tệ (stress do khối lượng công việc và cấu hình phức tạp)

## 🎯 Mục tiêu ngày hôm nay
- [x] Liên kết các Virtual Private Cloud (VPC) với làm lại VPC Peering
- [x] Tự động bật/tắt máy chủ và gửi thông báo qua Slack với AWS Lambda
- [x] Khởi đầu nghiên cứu workshop

## 💼 Công việc đã thực hiện

### 1. Làm lại VPC Peering & liên kết VPC ⏱️ ~3 tiếng 
- **Mô tả**:
  - Thực hiện lại toàn bộ quy trình thiết lập VPC Peering sau khi gặp lỗi ở lần trước.
  - Tạo lại hạ tầng với CloudFormation Template, EC2, Security Group, Network ACL, DNS...
  - Kiểm tra kết nối cross-peer và dọn dẹp sau khi hoàn thành.
- **Kết quả**:
  - VPC Peering hoạt động ổn định, kết nối giữa các VPC kiểm tra thành công.
- **Tools/Tech**: VPC, VPC Peering, EC2, CloudFormation, Network ACL, Route Table, DNS
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Tự động hóa bật/tắt EC2 và gửi thông báo qua Slack với AWS Lambda ⏱️ ~3 tiếng
- **Mô tả**:
  - Thiết lập workflow tự động tắt/mở EC2 instance theo Tag và gửi thông báo qua Slack.
  - Thực hiện cấu hình webhook, tạo Lambda role, viết Lambda function stop/start instance.
- **Kết quả**:
  - Các function Lambda hoạt động đúng logic, Slack nhận được thông báo đúng hành động thực hiện.
- **Tools/Tech**: Lambda, IAM Role, EC2, Slack Webhook, Python
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 3. Bắt đầu nghiên cứu nội dung workshop ⏱️ *(đang tiếp diễn)*
- **Mô tả**:
  - Xem qua outline, yêu cầu và các thành phần kỹ thuật chính cần triển khai trong workshop.
- **Kết quả**:
  - Đã có định hướng sơ bộ, chưa triển khai cụ thể.
- **Tools/Tech**: *(chưa rõ)*

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: VPC Peering, EC2, Lambda, CloudFormation, IAM, Slack Integration
- **Programming**: Python (Lambda function stop/start EC2)
- **DevOps**: Tự động hóa hạ tầng và alert workflow bằng event-driven Lambda
- **Architecture**: Mô hình kết nối liên VPC và automation task scheduling

### 💡 Concepts & Theory
- **New Concepts**:
  - Slack Integration với AWS Lambda
  - Tự động hóa quản lý tài nguyên dựa trên Tag
- **Best Practices**:
  - Gán Tag cụ thể để quản lý lifecycle instance
  - Kiểm tra kết nối Peering bằng DNS resolution
- **Industry Knowledge**:
  - Slack thường được tích hợp để cảnh báo trạng thái hệ thống trong môi trường CI/CD
  - Tự động hóa quản lý EC2 giúp tiết kiệm chi phí ở môi trường thử nghiệm

### 🤝 Soft Skills
- **Communication**: *(không có hoạt động team đáng kể hôm nay)*
- **Problem Solving**: Xử lý lại toàn bộ VPC Peering sau lỗi cũ, triển khai lại từ đầu
- **Time Management**: Ưu tiên phần automation sau khi hoàn tất kết nối mạng
- **Learning**: Tiếp cận Lambda automation kết hợp với Slack lần đầu

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Stress khi làm lại toàn bộ cấu hình VPC
- **Mô tả**: Việc phải làm lại VPC Peering từ đầu gây căng thẳng do trước đó đã từng lỗi và chưa rõ nguyên nhân.
- **Impact**: Ảnh hưởng đến tâm lý, khiến việc tiếp cận phần automation Lambda chậm lại.
- **Root Cause**: Lỗi kết nối trước đó chưa được debug rõ ràng, dẫn đến phải thiết lập lại toàn bộ hạ tầng.
- **Solution**: Bắt đầu lại từng bước, kiểm tra kỹ từng rule trước khi kết nối.
- **Result**: VPC Peering hoạt động đúng.
- **Lesson**: Cần snapshot hoặc lưu lại template khi cấu hình mạng phức tạp, tránh phải làm lại từ đầu.

## 💭 Reflection & Insights

### What went well today?
- VPC Peering được thiết lập lại thành công.
- Tự động hóa quản lý EC2 qua Lambda kết hợp Slack – học được công cụ thực tế trong quản lý cloud.

### What could be improved?
- Quy trình debug VPC lỗi trước đó chưa rõ ràng, mất thời gian làm lại.
- Chưa tối ưu được thời gian chuẩn bị cho phần nghiên cứu workshop.

### Key Insights
- Việc dùng tag để điều khiển EC2 instance là một cách đơn giản nhưng hiệu quả để quản lý tài nguyên.
- Lambda kết hợp với Slack giúp theo dõi hoạt động hệ thống một cách real-time, phù hợp cả cho monitoring và incident alert.

### Questions & Curiosities
- Có cách nào debug chi tiết hơn khi kết nối VPC Peering bị lỗi DNS?
- Nếu muốn tắt EC2 theo lịch cố định (không dùng tag), nên kết hợp với dịch vụ nào?

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: *(chưa xác định)*
- [ ] **Medium**: *(chưa xác định)*
- [ ] **Low**: *(chưa xác định)*

### Learning Goals
- [ ] *(chưa xác định)*
- [ ] *(chưa xác định)*
- [ ] *(chưa xác định)*

### Meetings & Deadlines
- [ ] *(chưa xác định)*

## 📊 Self Assessment

### Productivity
- **Score**: 6/10
- **Reason**: Làm lại phần mạng tốn thời gian, nhưng kết quả đã ổn
- **Improvement**: Nên chuẩn bị trước nhiều hơn khi cấu hình mạng

### Learning
- **Score**: 6/10
- **New Knowledge**: Slack Integration, Lambda automation, Tag-based instance control
- **Application**: Có thể dùng Slack để thông báo kết quả inference trong dự án NLP

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân, chưa hỏi mentor
- **Contributions**: Tự hoàn thành nhiều nội dung kỹ thuật độc lập

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: VPC Peering & Lambda automation thành công
- **Areas for Growth**: Quản lý stress và debug hệ thống phức tạp

## 📎 Attachments & Links

### Code & Projects
- [ ] *(không có)*

### Learning Resources
- [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)
- [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### Screenshots & Demos
- [ ] *(không có)*

---

**📝 Notes for tomorrow:**
- Xem lại các cách lên lịch Lambda function để tắt EC2 theo giờ

**🎯 Week Progress:**
Hoàn thành các nội dung automation và network – chuẩn bị chuyển sang giai đoạn workshop

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 20/06/2025*
