# Worklog - Ngày 23/06/2025

## 📅 Thông tin cơ bản
- **Ngày**: 23/06/2025
- **Thứ**: Thứ Hai
- **Tuần thực tập**: Tuần thứ 7/8
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 😟 Lo lắng (do lỗi EC2 ảnh hưởng tới tiến độ lab và workshop)

## 🎯 Mục tiêu ngày hôm nay
- [x] Làm lại bài lab EC2
- [x] Thử nghiệm lại việc triển khai ứng dụng Node.js trên cả Windows và Linux
- [x] Giới hạn tài nguyên với IAM

## 💼 Công việc đã thực hiện

### 1. Thực hành lại bài lab EC2 ⏱️ ~6 tiếng 
- **Mô tả**:
  - Thực hiện lại toàn bộ quá trình tạo EC2 instance, triển khai ứng dụng và giới hạn quyền sử dụng tài nguyên.
  - Bao gồm khởi tạo instance Windows, Linux, triển khai app Node.js, và cấu hình IAM.
- **Kết quả**:
  - Các bước lý thuyết được hiểu và ghi nhớ, tuy nhiên gặp lỗi nghiêm trọng khi tạo EC2.
  - Không thể tiếp tục bài lab do không kết nối được instance.
- **Tools/Tech**: EC2, IAM, Node.js, Amazon Linux, Windows Server
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: EC2, IAM
- **Programming**: Node.js (triển khai app)
- **DevOps**: *(chưa thực hành được do lỗi EC2)*
- **Architecture**: Mô hình triển khai ứng dụng trên EC2 Windows/Linux

### 💡 Concepts & Theory
- **New Concepts**:
  - Giới hạn tài nguyên thông qua IAM policy
- **Best Practices**:
  - Cấu hình đúng Security Group và Key Pair khi khởi tạo EC2
- **Industry Knowledge**:
  - Việc kiểm soát tài nguyên và quyền truy cập là cốt lõi trong vận hành cloud an toàn

### 🤝 Soft Skills
- **Communication**: *(chưa có hoạt động team đáng kể hôm nay)*
- **Problem Solving**: Cố gắng khắc phục lỗi EC2 nhiều lần
- **Time Management**: Dành phần lớn thời gian xử lý lỗi kỹ thuật
- **Learning**: Vẫn nắm được lý thuyết, chưa thực hành được đầy đủ

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: EC2 không thể kết nối được
- **Mô tả**: Gặp lỗi khi tạo EC2, không thể SSH hoặc ping tới instance, cả trên Windows và Linux.
- **Impact**: Không thể triển khai app, ảnh hưởng trực tiếp đến toàn bộ bài lab và workshop.
- **Root Cause**: Không xác định được nguyên nhân chính xác.
- **Solution**: Đã thử xóa và tạo lại nhiều lần nhưng không thành công.
- **Result**: Bài lab chưa hoàn thành được, cần xử lý gấp.
- **Lesson**: Cần debug từng bước: kiểm tra Key Pair, Security Group, Route Table, NACL, hoặc nhờ mentor support.

## 💭 Reflection & Insights

### What went well today?
- Nắm vững quy trình triển khai EC2 và cài ứng dụng Node.js ở cả 2 hệ điều hành.
- Biết cách giới hạn quyền truy cập tài nguyên với IAM.

### What could be improved?
- Cần có checklist khi tạo EC2 để tránh lỗi lặp lại.
- Nên nhờ hỗ trợ sớm thay vì thử lại nhiều lần không rõ hướng.

### Key Insights
- Việc không kết nối được EC2 có thể do nhiều nguyên nhân: Security Group, Route, NACL, hoặc Key Pair.
- EC2 là dịch vụ cơ bản nhưng nếu bị lỗi ở bước này sẽ kéo theo toàn bộ phần sau bị trì hoãn.

### Questions & Curiosities
- Có thể dùng CloudFormation để debug lỗi kết nối EC2 không?
- Cách cấu hình Security Group mặc định sao cho luôn có thể kết nối từ máy local?

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
- **Reason**: Không hoàn thành bài lab do lỗi EC2 nghiêm trọng
- **Improvement**: Cần nhờ mentor hỗ trợ sớm để debug nhanh hơn

### Learning
- **Score**: 4/10
- **New Knowledge**: Các bước triển khai Node.js, cấu hình EC2 cơ bản
- **Application**: Nếu khắc phục lỗi, có thể áp dụng được cho backend inference của dự án NLP

### Collaboration
- **Score**: 3/10
- **Interactions**: Làm việc cá nhân, chưa tương tác với mentor hoặc team
- **Contributions**: Tự mày mò sửa lỗi, chưa đạt được kết quả mong muốn

### Overall Satisfaction
- **Score**: 3/10
- **Highlights**: Hiểu được lý thuyết cấu hình EC2 & triển khai app
- **Areas for Growth**: Debug hệ thống tốt hơn, biết cách xử lý lỗi nhanh chóng

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
- Ưu tiên khắc phục lỗi EC2 để tiếp tục bài lab và workshop

**🎯 Week Progress:**
Ngày đầu tuần 7 bị chậm tiến độ do lỗi EC2 – cần xử lý gấp để bắt kịp kế hoạch

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 24/06/2025*
