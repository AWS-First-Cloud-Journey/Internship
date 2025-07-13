# Worklog - Ngày 26/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 26/05/2025
- **Thứ**: Thứ Hai
- **Tuần thực tập**: Tuần thứ 3/8
- **Thời gian làm việc**: 8:00 - 11:00
- **Mood**: 😔 Chán nản

## 🎯 Mục tiêu ngày hôm nay
- [x] Triển khai kế hoạch sao lưu hệ thống với AWS Backup

## 💼 Công việc đã thực hiện

### 1. Chuẩn bị hạ tầng sao lưu ⏱️ 1 tiếng
- **Mô tả**:
  - Tạo S3 bucket phục vụ cho mục tiêu lưu trữ.
  - Triển khai các thành phần hạ tầng cần thiết để kết nối với AWS Backup.
- **Kết quả**:
  - Tạo thành công S3 Bucket và thiết lập hạ tầng nền.
- **Tools/Tech**: AWS S3
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Cấu hình Backup Plan ⏱️ 1 tiếng
- **Mô tả**:
  - Tạo backup plan cho các tài nguyên AWS.
  - Thiết lập lịch chạy và retention policy.
- **Kết quả**:
  - Backup plan hoạt động theo cấu hình mong muốn.
- **Tools/Tech**: AWS Backup
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 3. Thiết lập thông báo & kiểm thử ⏱️ 1 tiếng
- **Mô tả**:
  - Thiết lập cảnh báo thông qua SNS hoặc các hình thức khác.
  - Thực hiện backup thử nghiệm và theo dõi trạng thái hoạt động.
- **Kết quả**:
  - Hệ thống gửi cảnh báo hoạt động đúng.
  - Backup thử nghiệm thành công.
- **Tools/Tech**: AWS SNS, AWS Backup
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: AWS Backup, S3, SNS
- **Programming**:
- **DevOps**: 
- **Architecture**: Backup Plan, Retention, Notification Workflow

### 💡 Concepts & Theory
- **New Concepts**: AWS Backup lifecycle, Automated backup plan
- **Best Practices**: Cấu hình cảnh báo sớm và retention policy phù hợp
- **Industry Knowledge**: Sao lưu là yếu tố quan trọng trong bảo mật và tuân thủ dữ liệu

### 🤝 Soft Skills
- **Communication**: 
- **Problem Solving**: 
- **Time Management**: 
- **Learning**: 

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: không còn đủ mood để tiếp tục
- **Mô tả**: Qua 1 thời gian học và vẫn không hiểu được nhiều thứ
- **Impact**: Gây cảm giác mất động lực học 
- **Root Cause**: Vấn đề giao tiếp, vấn đề đọc hiểu tài liệu
- **Solution**: Cố gắng đọc hiểu, cố gắng hỏi mọi người
- **Result**: Đang cố gắng, nên vẫn chưa cải thiện được gì
- **Lesson**: Không biết thì phải hỏi

## 💭 Reflection & Insights

### What went well today?
- [x] Thực hiện đúng và đủ quy trình backup trên AWS
- [x] Không gặp lỗi lớn, thao tác suôn sẻ
- [x] Hiểu được cấu trúc một backup plan chuẩn

### What could be improved?
- [ ] Cần tối ưu hơn về thời gian làm việc
- [ ] Nên thử nghiệm thêm nhiều kịch bản failure để đánh giá độ tin cậy của backup

### Key Insights
- [ ] Việc thiết lập backup không khó nhưng cần nắm rõ khái niệm plan, rule và resource assignment
- [ ] Sao lưu phải đi cùng với cảnh báo, kiểm thử và dọn dẹp tài nguyên sau backup

### Questions & Curiosities
- [ ] Có thể gắn tag các backup plan để tracking chi phí theo team không?
- [ ] Backup có tự động delete sau thời gian retention không?

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
- **Reason**: Làm được các bước cơ bản nhưng thời lượng làm việc ngắn
- **Improvement**: Cần lên kế hoạch kỹ hơn cho buổi làm việc để tối đa hiệu suất

### Learning
- **Score**: 6/10
- **New Knowledge**: Cấu trúc backup plan, thiết lập cảnh báo, kiểm thử hoạt động backup
- **Application**: Có thể áp dụng cấu hình tương tự trong các dự án nhỏ hoặc production thử nghiệm

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân, chưa cần hỗ trợ từ mentor
- **Contributions**: Ghi lại các bước làm để chia sẻ về sau

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: Hoàn thành bài lab backup một cách suôn sẻ
- **Areas for Growth**: Cần thử thêm với backup trên RDS, DynamoDB hoặc file system

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
*(chưa xác định)*

**🎯 Week Progress:**
Bắt đầu tuần 3 với chủ đề backup hệ thống – đã nắm được quy trình và các bước triển khai cơ bản.

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 27/05/2025*
