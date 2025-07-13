# Worklog - Ngày 30/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 30/05/2025
- **Thứ**: Thứ Sáu
- **Tuần thực tập**: Tuần thứ 3/8
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 😐 Tập trung

## 🎯 Mục tiêu ngày hôm nay
- [x] Xây dựng môi trường VPC hoàn chỉnh từ đầu
- [x] Triển khai các thành phần mạng cơ bản của AWS
- [x] Thiết lập cấu trúc mạng an toàn và có khả năng mở rộng

## 💼 Công việc đã thực hiện

### 1. Chuẩn bị mạng VPC cơ bản ⏱️ ~1.5 tiếng
- **Mô tả**:
  - Thiết lập hạ tầng cơ bản bao gồm VPC, Subnet, Internet Gateway, Route Table và Security Group.
- **Kết quả**:
  - Tạo thành công cấu trúc mạng cơ bản sẵn sàng cho các thành phần tiếp theo.
- **Tools/Tech**: VPC, Subnet, Internet Gateway, Route Table, Security Group

### 2. Tạo máy chủ EC2 & kiểm tra kết nối ⏱️ ~2 tiếng
- **Mô tả**:
  - Triển khai EC2 instance, kiểm tra kết nối và tạo NAT Gateway để phục vụ subnet private.
  - Sử dụng Reachability Analyzer để kiểm tra khả năng kết nối mạng.
  - Thử nghiệm EC2 Instance Connect Endpoint (optional).
- **Kết quả**:
  - Tạo được EC2 Instance.
  - NAT Gateway hoạt động, kiểm tra Reachability Analyzer ổn.
  - Tuy nhiên gặp lỗi ở phần Connect Endpoint (xem mục Challenges).
- **Tools/Tech**: EC2, NAT Gateway, Reachability Analyzer, Instance Connect Endpoint

### 3. Cấu hình Site-to-Site VPN ⏱️ ~2.5 tiếng
- **Mô tả**:
  - Thực hành thiết lập Site-to-Site VPN đầy đủ với các thành phần như Virtual Private Gateway, Customer Gateway, VPN Connection.
  - Tiến hành các bước tùy chọn với Transit Gateway để xây dựng mô hình VPN mở rộng.
- **Kết quả**:
  - Cấu hình được các phần chính của Site-to-Site VPN.
  - Đã thử tạo kết nối từ cả phía AWS lẫn phía Customer.
- **Tools/Tech**: VPN, Virtual Private Gateway, Customer Gateway, Transit Gateway

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: VPC, EC2, NAT Gateway, Route Table, VPN, Transit Gateway
- **Programming**: *(chưa có thông tin)*
- **DevOps**: *(chưa có thông tin)*
- **Architecture**: Thiết kế mạng phân tầng, bảo mật và mở rộng

### 💡 Concepts & Theory
- **New Concepts**: VPN Tunnel Redundancy, Transit Gateway Routing
- **Best Practices**: Cấu hình NAT cho subnet private, sử dụng Reachability Analyzer để debug kết nối
- **Industry Knowledge**: Cấu trúc VPC chuẩn hóa cho enterprise sử dụng mô hình phân tách lớp mạng

### 🤝 Soft Skills
- **Communication**: *(chưa có thông tin)*
- **Problem Solving**: Kiên nhẫn thử nghiệm nhiều cấu hình VPN, chẩn đoán lỗi Connect Endpoint
- **Time Management**: Phân bổ thời gian hợp lý cho từng phần lớn
- **Learning**: Tự học cấu hình VPN từ nhiều tài liệu khác nhau

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Lỗi kết nối EC2 bằng Remote-SSH từ VS Code
- **Mô tả**: Không thể sử dụng VS Code để SSH vào EC2 qua plugin Remote-SSH.
- **Impact**: Làm chậm quá trình test và cấu hình máy chủ EC2.
- **Root Cause**: Có thể do cấu hình port hoặc vấn đề network của local.
- **Solution**: Thử kết nối qua SSH CLI thay vì VS Code.
- **Result**: CLI hoạt động, VS Code vẫn lỗi.
- **Lesson**: Không nên phụ thuộc hoàn toàn vào IDE khi cấu hình hệ thống từ xa.

### Vấn đề 2: Không thể kết nối EC2 qua Instance Connect Endpoint
- **Mô tả**: Đã tạo Endpoint nhưng không thể kết nối đến EC2 Instance qua đường dẫn nội bộ.
- **Impact**: Mất thời gian test và thử nhiều hướng cấu hình.
- **Root Cause**: Không rõ nguyên nhân – đã thử tạo lại bằng nhiều cách nhưng không thành công.
- **Solution**: Tạm bỏ qua bước optional, tiếp tục phần VPN.
- **Result**: Chưa giải quyết được.
- **Lesson**: Cần nghiên cứu kỹ hơn về yêu cầu phụ thuộc của Connect Endpoint (IAM, Route, Network ACL...)

## 💭 Reflection & Insights

### What went well today?
- Hoàn thiện được nhiều phần trong cùng một ngày
- Triển khai cấu trúc mạng từ đầu đến khi có thể kết nối qua VPN

### What could be improved?
- Vẫn gặp vấn đề với công cụ hỗ trợ như VS Code và Connect Endpoint
- Chưa hiểu hết nguyên nhân một số lỗi nâng cao

### Key Insights
- Cấu hình mạng phức tạp cần kiểm tra từ nhiều tầng: IAM, ACL, SG, Routing
- Có thể áp dụng thực tế cho kiến trúc multi-site hoặc hybrid cloud
- Việc xây dựng VPC bằng tay giúp hiểu sâu logic hơn CloudFormation

### Questions & Curiosities
- Làm sao để kiểm tra traffic khi sử dụng VPN với Transit Gateway?
- Có cách nào debug sâu hơn cho Instance Connect Endpoint?

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
- **Reason**: Làm nhiều nội dung, nhưng mất thời gian xử lý lỗi
- **Improvement**: Cần dự phòng công cụ thay thế khi có lỗi IDE

### Learning
- **Score**: 7/10
- **New Knowledge**: VPN cấu hình đầy đủ, Connect Endpoint, NAT Gateway, Reachability Analyzer
- **Application**: Có thể áp dụng cho thiết kế hybrid cloud và môi trường multi-tier VPC

### Collaboration
- **Score**: 6/10
- **Interactions**: Chủ yếu làm việc cá nhân
- **Contributions**: Chuẩn bị tài liệu để hỏi mentor về VPN và Connect Endpoint

### Overall Satisfaction
- **Score**: 6/10
- **Highlights**: Làm được từ khâu tạo mạng đến cấu hình VPN
- **Areas for Growth**: Cần kỹ năng debug tốt hơn cho kết nối EC2 nâng cao

## 📎 Attachments & Links

### Code & Projects
- [ ] *(chưa có)*

### Learning Resources
- [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)
- [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### Screenshots & Demos
- [ ] *(chưa có)*

---

**📝 Notes for tomorrow:**
- Cân nhắc xem lại phần Connect Endpoint để hỏi mentor

**🎯 Week Progress:**
Đã đi gần hết nội dung tuần 3 – phần VPN là điểm nhấn kỹ thuật tuần này

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 31/05/2025*
