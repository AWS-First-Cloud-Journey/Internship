# 📈 Weekly Su05ary - Tuần 2

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 2
- **Thời gian làm việc**: 9:00 - 17:00, từ 19/05 đến 23/05
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😐
- **Điểm nổi bật**: 
  - Triển khai và kết hợp giữa các dịch vụ quản lý containter và container registry trên AWS ( ECS và ECR)
  - Vẽ được kiến trúc dự kiến của workshop 

---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Vẽ kiến trúc tổng quan của workshop
- [x] Mục tiêu 2: Chạy ứng dụng với ECS task
- [x] Mục tiêu 3: Lưu trữ image với ECR

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 19/05 | Tìm hiểu và phân tích ECS và ECR | Hiểu được cách thức hoạt động của ECS và ECR và mô hình kết hợp hai dịch vụ | 8 | ECS, ECR |
| Thứ 3 - 20/05 | Tạo các IAM role để chạy ECS task và so sánh các launch type của ECS | Tạo thành công các IAM role cho task run, so sánh run type EC2 - Fargate | 8 | IAM, ECS, ECR |
| Thứ 4 - 21/05 | Tạo ECR repo để lưu image và chạy ECS task | Kết nối thành công ECR và ECS task run | 8 | AWS CLI, ECR, ECS |
| Thứ 5 - 22/05 | Chạy ECS cluster trên multi AZ kết hợp với Application Load Balancer | Kết nối tới các task run thông qua DNS của ALB | 8 | ALB, ECS |
| Thứ 6 - 23/05 | Soạn TOC của workshop | Hoàn thành sườn chính của workshop | 8 | AWS Docs |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: ECR, ECS, IAM, AWS CLI
- **Programming**: N/A
- **DevOps**: Deploy multi-AZ architecture, Load Balancing container task
- **Architecture**: Serverless container, Multi-AZ 

### 💡 Concepts & Theory
- **New Concepts**: Task Execution Role, Trust Policy, Registry Authentication
- **Best Practices**:
  - Chia nhỏ từng bước để người học không bị quá tải
  - ECS + ALB là combo phổ biến để triển khai microservices quy mô vừa
  - Dùng nhiều AZ để tăng độ sẵn sàng
- **Industry Knowledge**: Fargate phù hợp với các workload ngắn hạn hoặc không ổn định; EC2 tiết kiệm hơn cho workload dài hạn, ổn định

### 🤝 Soft Skills
- **Co05unication**: Chủ yếu làm việc độc lập
- **Problem Solving**: Troubeshoot các lỗi về IAM
- **Time Management**: N/A
- **Learning**: Tự học docs, làm theo tutorial

---

## 🚧 Khó khăn & Giải pháp nổi bật

- **Mô tả**: Các ECS task không thể pull image từ ECR
- **Solution**: Cấu hình Route đến NAT và Internet Gateway
- **Result**: Các task đã pull được image từ ECR
- **Lesson**: Cấu hình để các tài nguyên trong VPC có thể giao tiếp với các dịch vụ nằm bên ngoài VPC 

---

## 💭 Reflection & Insights

### ✅ What went well
- Hoàn thành kiến trúc dự kiến của workshop
- Kết hợp ECR-ECS và ECS-ALB

### 🔄 What could be improved
- Cải thiện kỹ năng vẽ sơ đồ hệ thống

### ✨ Key Insights
- ECS Fargate kết hợp ALB giúp phân phối tải tự động và tăng độ sẵn sàng
- Kiến trúc đa AZ là tiêu chuẩn thực tế của các hệ thống chịu tải cao
- IAM role là phần cốt lõi khi làm việc với ECS
- Việc soạn TOC giúp xác định rõ phạm vi và logic triển khai
---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 8 | Đã bắt tay vào soạn workshop cá nhân |
| **Learning** | 9 | Các mô hình triển khai thực tế: ECR-ECS và ECS-Fragte kết hợp ALB |
| **Collaboration** | 6 | Chủ yếu làm việc độc lập  |
| **Satisfaction** | 9 | Làm quen với mô hình kết hợp dịch vụ  |

---

*Weekly su05ary created by: Vũ Quang Huy*  