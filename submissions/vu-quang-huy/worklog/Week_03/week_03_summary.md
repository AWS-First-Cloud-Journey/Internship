# 📈 Weekly Summary - Tuần 3

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 3
- **Thời gian làm việc**: 9:00 - 17:00, từ 26/06 đến 30/05
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😊 
- **Điểm nổi bật**: 
  - Hoàn thành cơ bản phần nội dung của workshop
  - Bắt đầu triển khai viết các phần của workshop
  - Tìm hiểu và cấu hình Route53 và Cloud Front

---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Triển khai thử workshop và liệt kê các thành phần cần triển khai
- [x] Mục tiêu 2: Tìm hiểu về mô hình Route53-CloudFront-ALB

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 26/05 | Chuẩn bị nội dung workshop (phần lý thuyết, phân tích các tùy chọn triển khai ECS), so sánh giữa 2 launch type của ECS | Hoàn thành tài liệu tóm tắt cho từng dịch vụ để đưa vào phần mở đầu của workshop | 8 | ECS |
| Thứ 3 - 27/05 | Chuẩn bị nội dung workshop (phần Networking trên AWS với EC2 và ALB), cấu hình EC2, target group và ALB | Có thể truy cập các EC2 thông qua DNS của ALB | 8 | EC2, ALB |
| Thứ 4 - 28/05 | Lab 10: Thiết lập Hybrid DNS với Route 53 Resolver | Hiểu tổng quan và chi tiết từng tính năng của Route 53, triển khai thành công:Inbound Endpoint. Outbound Endpoint và Forwarding Rules  | 8 | Route53 |
| Thứ 5 - 29/05 | Tìm hiểu mô hình Route53-CloudFront-ALB | Phân tích vai trò của từng thành phần và ưu nhược điểm | 8 | Route53, CloudFront, ALB |
| Thứ 6 - 30/05 | Viết introduction của workshop | Hoàn thành sơ đồ kiến trúc và phần introduction | 8 | Draw.io |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: Fargate, ECS, EC2, ALB, Route53 và CloudFront
- **Programming**: N/A
- **DevOps**: 
  - Cách triển khai container trên nền tảng cloud, hiểu rõ cluster compute model
  - Network troubleshooting, DNS diagnostics (nslookup)
  - Workshop documentation, sơ đồ kiến trúc
- **Architecture**: CDN + ALB integration, DNS routing

### 💡 Concepts & Theory
- **New Concepts**: 
  - Fargate là "serverless" cho container
  - Target group với EC2 instance type
- **Best Practices**: 
  - Thiết kế sơ đồ workshop trước khi viết nội dung
  - Luôn kiểm tra Security Group và NACL khi DNS không hoạt động
- **Industry Knowledge**: 
  - ALB là một trong các bước quan trọng để mở rộng ECS sau này
  - CloudFront còn được dùng để bảo vệ backend bằng cách giới hạn truy cập theo signed URL/headers

### 🤝 Soft Skills
- **Communication**: Giao tiếp với team xin feedback về kiến trúc hệ thống
- **Problem Solving**: Giải quyết các vấn đề liên quan đến DNS
- **Time Management**: Phân bổ thời gian giữa việc triển khai workshop và tìm hiểu dịch vụ mới
- **Learning**: Đọc docs của AWS, làm theo lab hand-on

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề: Dịch song ngữ mất thời gian, dễ lặp ý
- **Solution**: Viết trước tiếng Việt rồi dịch sang tiếng Anh bằng ngữ cảnh
- **Result**: Tăng tốc độ viết ở phần sau
- **Lesson**: Nên chuẩn bị glossary song ngữ để viết nhanh hơn

---

## 💭 Reflection & Insights

### ✅ What went well
- Hoàn thành kiến trúc hệ thống
- Hiểu được sơ đồ kết hợp Route53-CloudFront-ALB
- Hiểu rõ vai trò và ứng dụng thực tế của Route 53 trong môi trường hybrid

### 🔄 What could be improved
- Chưa thử cấu hình thực tế Route53-CloudFront-ALB
- Cải thiện khả năng dịch và tốc độ dịch

### ✨ Key Insights
- Route 53 + CloudFront + ALB là kiến trúc mạnh mẽ, hiệu quả, bảo mật cao
- Hạn chế truy cập bằng CloudFront

---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 8 | Hoàn thành triển khai thử và bắt đầu viết workshop |
| **Learning** | 8 | Học được các dịch vụ mới và mô hình kết hợp Route 53 + CloudFront + ALB |
| **Collaboration** | 6 | Cần cải thiện giao tiếp |
| **Satisfaction** | 8 | Tìm hiểu các mô hình kết hợp mạnh mẽ |

---

*Weekly summary created by: Vũ Quang Huy*  