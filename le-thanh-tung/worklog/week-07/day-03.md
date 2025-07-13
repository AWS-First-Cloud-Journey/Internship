# Worklog - Ngày 25/06/2025

## 📅 Thông tin cơ bản
- **Ngày**: 25/06/2025
- **Thứ**: Thứ tư
- **Tuần thực tập**: Tuần thứ 7/8
- **Thời gian làm việc**: 8:00 - 14:00
- **Mood**: 😔 Chán nản (nhưng đỡ lo hơn ban đầu vì đã kết nối được EC2)

## 🎯 Mục tiêu ngày hôm nay
- [x] Giải quyết triệt để vấn đề EC2 không kết nối được
- [x] Bắt đầu làm workshop về Amazon Rekognition

## 💼 Công việc đã thực hiện

### 1. Khắc phục lỗi EC2 và tạo lại thành công ⏱️ ~3 tiếng
- **Mô tả**: 
  - Tiến hành tạo lại EC2 instance từ đầu với nhiều thử nghiệm
  - Áp dụng lại toàn bộ lý thuyết về cấu hình Security Group, VPC, Route Table
- **Kết quả**: 
  - Kết nối thành công vào EC2 sau nhiều lần thử
  - Tuy nhiên, không xác định rõ nguyên nhân lỗi ban đầu là gì
- **Tools/Tech**: EC2, SSH, VPC, IAM
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Nghiên cứu Amazon Rekognition và bắt đầu workshop ⏱️ ~4 tiếng
- **Mô tả**:
  - Tìm hiểu cơ bản về dịch vụ Amazon Rekognition và các API hỗ trợ nhận diện đối tượng
  - Lên ý tưởng và phác thảo kế hoạch triển khai workshop:
    + Đầu vào là hình ảnh có nhiều xe ô tô
    + Yêu cầu: đếm số lượng xe, phân biệt màu sắc từng xe
    + Bước đầu xác định hướng sử dụng Rekognition kết hợp với BoundingBox và xử lý ảnh
- **Kết quả**:
  - Đã hiểu tổng quan về Rekognition và biết cách sử dụng DetectLabels
  - Có bản kế hoạch sơ bộ cho workshop
- **Tools/Tech**: Amazon Rekognition, S3, EC2 (dev environment), Python
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: EC2, Amazon Rekognition
- **Programming**: Python (dự kiến dùng cho Rekognition)
- **DevOps**: *(chưa áp dụng)*
- **Architecture**: Ý tưởng pipeline nhận diện hình ảnh qua Rekognition

### 💡 Concepts & Theory
- **New Concepts**:
  - Cách hoạt động của Rekognition với DetectLabels
  - Khả năng sử dụng BoundingBox để tách đối tượng
- **Best Practices**:
  - Luôn kiểm tra đầy đủ cấu hình mạng trước khi launch EC2
- **Industry Knowledge**:
  - Nhận diện hình ảnh đang là xu hướng AI phổ biến trong e-commerce, logistics, security

### 🤝 Soft Skills
- **Communication**: *(làm việc cá nhân)*
- **Problem Solving**: Gỡ được lỗi EC2 dù chưa rõ nguyên nhân
- **Time Management**: Chưa tối ưu do mất nhiều thời gian debug
- **Learning**: Chủ động nghiên cứu Rekognition dù chưa có chỉ định cụ thể

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Không xác định được nguyên nhân lỗi EC2
- **Mô tả**: Dù đã tạo lại thành công, nhưng không rõ lý do lỗi trước đó là gì
- **Impact**: Rủi ro cao nếu sau này lỗi lặp lại, không có cách xử lý nhanh
- **Root Cause**: Không xác định được
- **Solution**: Làm đi làm lại nhiều lần cho đến khi kết nối thành công
- **Result**: Kết nối được, nhưng thiếu tính ổn định
- **Lesson**: Cần ghi lại cấu hình chi tiết mỗi lần tạo EC2 để đối chiếu và debug sau này

## 💭 Reflection & Insights

### What went well today?
- Cuối cùng cũng kết nối lại được EC2
- Bắt đầu triển khai workshop, có định hướng rõ ràng

### What could be improved?
- Cần chủ động log lại các bước tạo EC2 để so sánh khi gặp lỗi
- Phân bổ thời gian hợp lý hơn, tránh mất cả buổi sáng chỉ để debug

### Key Insights
- Không phải lỗi nào cũng có thể tìm ra ngay – có khi phải chấp nhận “unknown”
- Amazon Rekognition mạnh mẽ nhưng cần kết hợp xử lý ảnh thủ công nếu muốn phân loại chi tiết

### Questions & Curiosities
- Có thể lưu lại cấu hình EC2 dưới dạng template để tái sử dụng?
- Làm sao để cải thiện độ chính xác khi nhận diện màu sắc của xe trong ảnh?

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
- **Reason**: Kết nối lại được EC2, khởi động workshop thành công
- **Improvement**: Cần tìm cách lưu lại cấu hình và thiết lập để tránh lỗi lặp

### Learning
- **Score**: 6/10
- **New Knowledge**: Tổng quan về Amazon Rekognition, cách sử dụng DetectLabels
- **Application**: Dự kiến áp dụng để đếm xe trong ảnh ở workshop

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc độc lập
- **Contributions**: Bắt đầu đóng góp ý tưởng vào nội dung workshop

### Overall Satisfaction
- **Score**: 6/10
- **Highlights**: Khắc phục được vấn đề EC2
- **Areas for Growth**: Quản lý thời gian và chuẩn hóa quy trình tạo EC2

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
- Tiếp tục triển khai pipeline Rekognition
- Bắt đầu xử lý ảnh và tách BoundingBox để nhận diện từng xe

**🎯 Week Progress:**
Đã giải quyết được lỗi lớn EC2, bước đầu tiến vào workshop – tuần 7 có thể quay lại tiến độ bình thường

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 26/06/2025*
