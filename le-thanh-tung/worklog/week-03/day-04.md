# Worklog - Ngày 29/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 29/05/2025
- **Thứ**: Thứ Năm
- **Tuần thực tập**: Tuần thứ 3/8
- **Thời gian làm việc**: 8:00 - 11:00
- **Mood**: 😔 Chán nản

## 🎯 Mục tiêu ngày hôm nay
- [x] Thiết lập VPC Peering giữa 2 VPC

## 💼 Công việc đã thực hiện

### 1. Tạo hạ tầng bằng CloudFormation ⏱️ 1 tiếng
- **Mô tả**:
  - Sử dụng CloudFormation Template để tạo các thành phần mạng ban đầu.
  - Bao gồm VPC, Subnet, Route Table và các tài nguyên liên quan.
- **Kết quả**:
  - Template hoạt động, khởi tạo được 2 VPC phục vụ cho việc thiết lập peering.
- **Tools/Tech**: AWS CloudFormation, VPC
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Cấu hình EC2 và Network ACL ⏱️ 1 tiếng
- **Mô tả**:
  - Tạo Security Group phù hợp cho việc giao tiếp giữa các EC2 thuộc 2 VPC khác nhau.
  - Tạo 2 EC2 instance (mỗi VPC 1 instance) để kiểm tra kết nối.
  - Cập nhật Network ACL để mở truy cập ICMP và các cổng cần thiết.
- **Kết quả**:
  - EC2 instance được tạo và khởi chạy thành công.
  - Network ACL đã được cập nhật đúng cấu hình cơ bản.
- **Tools/Tech**: EC2, Security Group, Network ACL

### 3. Thiết lập VPC Peering & Cross-DNS ⏱️ 1 tiếng
- **Mô tả**:
  - Tạo kết nối VPC Peering giữa 2 VPC.
  - Cập nhật Route Table để cho phép routing giữa các subnet.
  - Bật tùy chọn DNS resolution cho phép phân giải tên giữa các VPC.
- **Kết quả**:
  - Kết nối Peering được thiết lập và trạng thái `Active`.
  - Cross-Peer DNS đã được kích hoạt.
- **Tools/Tech**: AWS VPC Peering, Route Table, DNS

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: VPC, EC2, Security Group, Route Table, CloudFormation, Network ACL, VPC Peering
- **Programming**: *(chưa có thông tin)*
- **DevOps**: *(chưa có thông tin)*
- **Architecture**: Peering Architecture giữa 2 VPC riêng biệt

### 💡 Concepts & Theory
- **New Concepts**: DNS Resolution across VPC Peering
- **Best Practices**: Mở ICMP + cấu hình Route Table + DNS là 3 yếu tố quan trọng để ping EC2 qua VPC Peering
- **Industry Knowledge**: VPC Peering là giải pháp mở rộng mạng riêng không cần VPN hoặc Transit Gateway

### 🤝 Soft Skills
- **Communication**: *(chưa có thông tin)*
- **Problem Solving**: Cố gắng khắc phục lỗi phức tạp, thử lại toàn bộ quy trình
- **Time Management**: Làm việc theo checklist các bước
- **Learning**: Chủ động tra cứu cấu hình DNS và ACL khi gặp lỗi

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Không thể ping EC2 giữa các VPC
- **Mô tả**: Khi kiểm tra ping từ EC2 của My VPC đến EC2 của HG VPC bằng Public DNS, không có phản hồi.
- **Impact**: Không xác minh được kết nối giữa 2 VPC, ảnh hưởng đến việc kiểm tra cấu hình thành công.
- **Root Cause**: Không xác định được nguyên nhân. Đã thử xóa toàn bộ VPC và làm lại nhưng lỗi vẫn xảy ra.
- **Solution**: Thử kiểm tra lại từng bước theo hướng dẫn, bao gồm ACL, Route Table, DNS, SG. Thử xóa toàn bộ VPC và khởi tạo lại bằng CloudFormation.
- **Result**: Vẫn không ping được EC2 từ VPC này sang VPC kia bằng DNS sau khi làm lại.
- **Lesson**: Trong các bài lab thực hành phức tạp, cần ghi lại log chi tiết từng bước và có checklist kiểm tra từng yếu tố một.

## 💭 Reflection & Insights

### What went well today?
- [x] Nắm được quy trình tạo peering từ đầu đến cuối
- [x] Tạo được VPC, EC2 và kết nối giữa chúng theo lý thuyết

### What could be improved?
- [ ] Cần hiểu sâu hơn về từng yếu tố ảnh hưởng đến kết nối: DNS, Route Table, ACL
- [ ] Nên tách nhỏ từng phần kiểm tra để dễ xác định lỗi

### Key Insights
- [ ] DNS resolution cần được bật ở cả hai phía để sử dụng DNS trong peering
- [ ] Chỉ cấu hình SG thôi là chưa đủ, ACL cũng cần mở ICMP rõ ràng
- [ ] CloudFormation giúp lặp lại nhanh, nhưng nếu logic sai thì lỗi vẫn tồn tại

### Questions & Curiosities
- [ ] Tại sao DNS vẫn không phân giải được dù đã bật Cross-DNS?
- [ ] Có cách nào trace packet trong AWS để xác định chặn ở đâu?

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
- **Score**: 5/10
- **Reason**: Làm được hết các bước, nhưng vẫn lỗi chưa khắc phục được
- **Improvement**: Cần ghi lại thông tin chi tiết để debug logic chính xác hơn

### Learning
- **Score**: 6/10
- **New Knowledge**: VPC Peering & Cross-VPC DNS, Route Table, ACL
- **Application**: Có thể dùng để kết nối VPC giữa các môi trường dev/test/prod

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân
- **Contributions**: Chuẩn bị ghi chú để hỏi mentor nếu vẫn không giải quyết được lỗi

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: Làm chủ được quy trình thiết lập peering và cấu hình hạ tầng
- **Areas for Growth**: Cần cải thiện kỹ năng debug và kiểm tra mạng liên VPC

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


**🎯 Week Progress:**


---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 30/05/2025*
