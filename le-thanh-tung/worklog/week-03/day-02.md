# Worklog - Ngày 27/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 27/05/2025
- **Thứ**: Thứ Ba
- **Tuần thực tập**: Tuần thứ 3/8
- **Thời gian làm việc**: 8:00 - 11:00
- **Mood**: 😔 Chán nản (vì gặp khó và không biết phải hỏi như thế nào)

## 🎯 Mục tiêu ngày hôm nay
- [x] Quản lý truy cập vào dịch vụ EC2 thông qua Resource Tag với AWS IAM

## 💼 Công việc đã thực hiện

### 1. Tạo IAM User ⏱️ 1 tiếng
- **Mô tả**:
  - Tạo một IAM user mới để kiểm thử chính sách kiểm soát truy cập dựa trên Resource Tag.
- **Kết quả**:
  - User được tạo thành công, sẵn sàng cho thử nghiệm.
- **Tools/Tech**: AWS IAM
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Tạo IAM Policy và IAM Role ⏱️ 1 tiếng
- **Mô tả**:
  - Viết IAM Policy giới hạn quyền truy cập EC2 theo thẻ tag.
  - Tạo IAM Role và gán policy.
- **Kết quả**:
  - Hoàn thành policy và gắn role cho IAM user.
- **Tools/Tech**: AWS IAM Policy, IAM Role
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 3. Kiểm tra chính sách truy cập EC2 ⏱️ 1 tiếng
- **Mô tả**:
  - Chuyển IAM User sang Role và kiểm tra hành vi chính sách theo vùng (region) và tag.
  - Thực hiện các thao tác EC2 như tạo, chỉnh sửa tag, và truy cập từ nhiều vùng khác nhau.
- **Kết quả**:
  - Một số bước đã thử nghiệm thành công.
  - Một số bước bị vướng, chưa hoàn thành.
- **Tools/Tech**: AWS EC2, IAM, Resource Tagging
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: IAM User, IAM Policy, IAM Role, EC2
- **Programming**: 
- **DevOps**: 
- **Architecture**: Policy-based access control theo Resource Tag

### 💡 Concepts & Theory
- **New Concepts**: IAM Policy theo điều kiện thẻ tài nguyên (Tag-based conditions)
- **Best Practices**: Phân quyền chi tiết theo tag giúp tăng tính bảo mật và dễ quản lý
- **Industry Knowledge**: Gắn tag tài nguyên là bước quan trọng trong việc kiểm soát truy cập linh hoạt

### 🤝 Soft Skills
- **Communication**: 
- **Problem Solving**: Gặp khó nhưng chưa xác định được cách đặt vấn đề
- **Time Management**: Hoàn thành phần đầu, phần sau cần thêm thời gian
- **Learning**: Biết cách sử dụng tag để kiểm soát truy cập – một khái niệm quan trọng trong IAM nâng cao

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Không hoàn thành các bước kiểm tra IAM Policy nâng cao
- **Mô tả**:
  - Các bước kiểm tra IAM Policy qua tag gặp lỗi hoặc không rõ hành vi.
  - Cụ thể gồm:
    - Truy cập EC2 console ở Tokyo và North Virginia.
    - Tạo EC2 instance không có và có tag đúng điều kiện.
    - Chỉnh sửa Resource Tag trên EC2 Instance.
- **Impact**: Dừng lại ở phần kiểm thử, ảnh hưởng đến việc hiểu rõ policy
- **Root Cause**: Cảm thấy khó hiểu, không biết phải hỏi như thế nào để giải quyết
- **Solution**: Tìm cách để hỏi, tự tìm cách giải quyết trên mạng
- **Result**: Vẫn chưa giải quyết vấn đề
- **Lesson**: Khi gặp vấn đề khó, cần tạm dừng, ghi log lại và tìm cách hỏi mentor hoặc tra tài liệu chính xác

## 💭 Reflection & Insights

### What went well today?
- [x] Hiểu được cách tạo user, policy, role trong IAM
- [x] Áp dụng được các điều kiện tag vào chính sách truy cập cơ bản

### What could be improved?
- [ ] Chưa hiểu rõ logic kiểm tra chính sách IAM nâng cao
- [ ] Cần cải thiện kỹ năng đặt câu hỏi để tìm hướng giải quyết nhanh hơn

### Key Insights
- [ ] Phân quyền dựa trên tag là kỹ thuật rất mạnh nhưng cần hiểu kỹ logic IAM
- [ ] Kiểm tra chính sách cần diễn ra ở nhiều region khác nhau để đảm bảo tính chính xác

### Questions & Curiosities
- [ ] Làm sao để debug chính sách IAM nếu không thấy log cụ thể?
- [ ] Có cách nào mô phỏng/trace chính sách như `IAM Policy Simulator` không?

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
- [ ] Không có lịch họp hoặc deadline hôm nay

## 📊 Self Assessment

### Productivity
- **Score**: 5/10
- **Reason**: Làm được phần chuẩn bị và cấu hình IAM, kiểm thử còn dang dở
- **Improvement**: Cần chia nhỏ bước kiểm thử để dễ xác định vấn đề

### Learning
- **Score**: 6/10
- **New Knowledge**: IAM policy theo tag – một phần quan trọng trong quản lý truy cập nâng cao
- **Application**: Áp dụng được một phần nhưng cần làm rõ thêm hành vi IAM khi có điều kiện tag

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân, chưa trao đổi với mentor vì chưa biết hỏi gì
- **Contributions**: Ghi lại quá trình thử nghiệm để sau này tổng hợp lại

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: Làm chủ được phần tạo policy và role
- **Areas for Growth**: Kỹ năng kiểm thử IAM nâng cao, cách đọc và debug chính sách

## 📎 Attachments & Links

### Code & Projects
- [ ] *(chưa có)*

### Learning Resources
- [Tài liệu học AWS (Study Group)](http://f000001.awsstudygroup.com/vi/)
- [Kênh YouTube AWS Study Group](https://www.youtube.com/@AWSStudyGroup)

### Screenshots & Demos
- [ ] *(chưa có)*

---

**📝 Notes for tomorrow:**
- Nên tham khảo kỹ `IAM Condition Tag` trong AWS Docs
- Chuẩn bị tinh thần đặt câu hỏi cụ thể cho mentor khi bị kẹt

**🎯 Week Progress:**
Đã thực hành backup và IAM nâng cao – khoảng 60–70% tiến độ tuần, cần hoàn tất phần kiểm thử còn thiếu.

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 28/05/2025*
