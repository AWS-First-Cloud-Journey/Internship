# Worklog - Ngày 24/06/2025

## 📅 Thông tin cơ bản
- **Ngày**: 24/06/2025
- **Thứ**: Thứ Ba
- **Tuần thực tập**: Tuần thứ 7/8
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 😟 Lo lắng (vì chưa xử lý được lỗi EC2 ảnh hưởng toàn bộ tiến độ lab)

## 🎯 Mục tiêu ngày hôm nay
- [x] Cố gắng khắc phục lỗi EC2 sớm nhất có thể để tiếp tục lab và workshop

## 💼 Công việc đã thực hiện

### 1. Debug lỗi EC2 không thể kết nối ⏱️ ~6 tiếng
- **Mô tả**:
  - Tiếp tục kiểm tra các thành phần có khả năng gây lỗi khi không kết nối được EC2:
    + Kiểm tra lại Security Group (Inbound/Outbound)
    + Xem lại Key Pair
    + Kiểm tra Route Table, Network ACL
    + Thử tạo lại EC2 với cấu hình đơn giản nhất
  - Thử dùng nhiều loại AMI và region khác nhau để loại trừ lỗi do hệ thống
- **Kết quả**:
  - Vẫn chưa khắc phục được vấn đề, nhưng đã loại trừ được một số nguyên nhân không liên quan
- **Tools/Tech**: EC2, Key Pair, Security Group, Route Table, CLI
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: EC2, VPC, IAM (liên quan đến SSH key và policy)
- **Programming**: *(không sử dụng)*
- **DevOps**: Debug networking ở mức cơ bản
- **Architecture**: Kết nối SSH vào EC2 từ mạng public

### 💡 Concepts & Theory
- **New Concepts**:
  - Cấu hình NACL và Route Table ảnh hưởng đến khả năng kết nối từ bên ngoài
- **Best Practices**:
  - Luôn kiểm tra kỹ Security Group và Public IP sau khi khởi tạo EC2
- **Industry Knowledge**:
  - Mỗi AMI, region có thể có cấu hình mặc định khác nhau cần lưu ý khi troubleshooting

### 🤝 Soft Skills
- **Communication**: *(chưa có trao đổi với mentor)*
- **Problem Solving**: Kiên nhẫn thử nhiều cách và loại trừ nguyên nhân
- **Time Management**: Dành cả ngày để tập trung debug
- **Learning**: Quan sát cách hệ thống phản hồi khi thay đổi cấu hình

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Không thể kết nối được vào EC2 instance
- **Mô tả**: Tiếp tục không thể SSH hoặc ping vào EC2 Windows/Linux
- **Impact**: Không thể triển khai bài lab và workshop đúng tiến độ
- **Root Cause**: Chưa xác định rõ nguyên nhân – có thể do SG, NACL, Route, hoặc network cấu hình sai
- **Solution**: Thử nhiều cách khác nhau, bao gồm tạo mới hoàn toàn hạ tầng, thử region khác
- **Result**: Vẫn chưa thành công, cần hỗ trợ thêm
- **Lesson**: Khi lỗi phức tạp kéo dài, nên xin hỗ trợ sớm để tiết kiệm thời gian

## 💭 Reflection & Insights

### What went well today?
- Không bỏ cuộc, tiếp tục kiên trì tìm hướng xử lý
- Học được thêm về cách debug network và EC2 layer cơ bản

### What could be improved?
- Cố gắng tìm cách khăc phục
- Cần lưu lại từng bước để dễ kiểm tra log hoặc nhờ người khác review

### Key Insights
- EC2 là dịch vụ quan trọng, nếu không nắm được phần network thì sẽ ảnh hưởng rất lớn
- Không phải lỗi nào cũng fix được ngay – cần học cách nhờ trợ giúp hiệu quả

### Questions & Curiosities
- Có thể sử dụng Session Manager để kết nối EC2 nếu SSH không hoạt động?
- Có thể bật CloudWatch hoặc VPC Flow Logs để xem lưu lượng mạng bị chặn ở đâu?

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
- **Score**: 4/10
- **Reason**: Dành cả ngày để debug nhưng chưa khắc phục được vấn đề
- **Improvement**: Cần chủ động xin hỗ trợ kỹ thuật sớm

### Learning
- **Score**: 4/10
- **New Knowledge**: Cách kiểm tra network rule, phân tích lỗi SSH
- **Application**: Có thể áp dụng lại khi tạo EC2 ở các bài lab khác

### Collaboration
- **Score**: 3/10
- **Interactions**: Chưa trao đổi với mentor hoặc bạn cùng học
- **Contributions**: Tự học là chính

### Overall Satisfaction
- **Score**: 4/10
- **Highlights**: Kiên trì xử lý vấn đề
- **Areas for Growth**: Giao tiếp, tìm kiếm hỗ trợ từ team

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
- Cố gắng khắc phục nhanh nhất có thể

**🎯 Week Progress:**
Đã sang ngày thứ hai của tuần 7 nhưng vẫn chưa xử lý xong lỗi EC2 – cần đẩy nhanh tiến độ

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 25/06/2025*
