# 📈 Weekly Summary - Tuần 1

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 1
- **Thời gian làm việc**: 9:00 - 17:00, từ 12/05 đến 16/05
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😐  
- **Điểm nổi bật**: 
    - Làm quen với việc cấu hình VPC và các tài nguyên liên quan
    - Bắt đầu làm quen và viết document với markdown syntax và Hugo server
    - Deploy một trang web đơn giản với EC2 sử dụng Nginx 
    - Tìm hiểu và setup thành công VPC Peering
---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Thành thạo hơn trong việc cấu hình VPC và các tài nguyên liên quan theo yêu cầu
- [x] Mục tiêu 2: Tìm hiểu các cách kết nối giữa 2 hoặc nhiều VPC - cấu hình VPC Peering
- [x] Mục tiêu 3: Thành thạo markdown syntax

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 12/05 | Hoàn thành lý thuyết của Week 2: Networking, Tạo các từng thành phần của 1 VPC | Nắm được cơ bản các về VPC và các tính năng như VPC Peering, Transit gateway, triển khai thành công 1 static web với EC2 | 8 | VPC,EC2 |
| Thứ 3 - 13/05 | Tải các công cụ hỗ trợ viết workshop và xem các workshop mẫu | Định hình được các công cụ cần thiết và cấu trúc cơ bản của 1 workshop | 8 | Hugo, markdown |
| Thứ 4 - 14/05 | Làm quen với markdown, xây dựng workshop mẫu | Sử dụng đa dạng markdown syntax, build workshop mẫu bằng Hugo | 8 | Hugo, markdown |
| Thứ 5 - 15/05 | Xây dựng ứng dụng web đơn giản triển khai trên EC2 | Triển khai thành công 1 trang web tĩnh trên EC2 | 8 | EC2, VPC |
| Thứ 6 - 16/05 | Tìm hiểu các cách kết nối giữa 2 hoặc nhiều VPC - cấu hình VPC Peering | Cấu hình thành công và kết nối giữa các VPC | 8 | VPC Peering, Transit Gateway |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: VPC, EC2, VPC Peering, Transitgateway
- **Programming**: Hugo, Markdown
- **DevOps**: N/A
- **Architecture**: Kiến trúc đơn giản triển khai 1 static web

### 💡 Concepts & Theory
- **New Concepts**: AWS Direct Connect, VPC Peering, Transit Gateway, Load Balancer
- **Best Practices**: Kết hợp triển khai ứng dụng đơn giản
- **Industry Knowledge**: Kết hợp VPC Peering trong môi trường multi VPC

### 🤝 Soft Skills
- **Communication**: Trao đổi với teams và mentor
- **Problem Solving**: Troubeshooting
- **Time Management**: Sắp xếp thời gian phù hợp cho các mục tiêu
- **Learning**: Tự tìm hiểu document từ FCJ và AWS docs

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề 1: Gặp khó khăn với NAT gateway kết nối với Internet Gateway
- **Mô tả**: NAT Gateway nằm trong public subnet, các EC2 trong private subnet không thể kết nối ra ngoài Internet thông qua NAT gateway
- **Solution**: Điều chỉnh lại Route table trong public subnets để đảm bảo routing giữa NAT và Internet Gateway
- **Result**: EC2 trong private subnet có thể kết nối ra ngoài Internet
- **Lesson**: Cách thức hoạt động và vai trò của các Gateway

### Vấn đề 2: Không thể ping giữa 2 EC2
- **Mô tả**: Gặp lỗi khi sử dụng lệnh ping giữa 2 EC2 trong 2 VPC với nhau
- **Solution**: Cấu hình lại Route Table
- **Result**: Kết nối thành công giữa 2 EC2
- **Lesson**: Các kết nối Peering cần có 1 route trong Route Table đến Peering Connection

---

## 💭 Reflection & Insights

### ✅ What went well
- Đạt được mục tiêu đề ra
- Hoàn thành các Lab trong Week 2
- Troubleshoot được các lỗi gặp phải về kết nối trong và ngoài VPC

### 🔄 What could be improved
- Cần cải thiện giao tiếp và tương tác với teams và mentor

### ✨ Key Insights
- Kiến trúc nhiều VPC trong môi trường thực tế cho các môi trường khác nhau
- Cấu trúc cơ bản của 1 workshop hỗ trợ người mới 

---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 9 | Hoàn thành tất cả mục tiêu đề ra đúng hạn |
| **Learning** | 8 | Học được dịch vụ mới của AWS và các kiến trúc phổ biến |
| **Collaboration** | 7 | Chủ yếu làm việc tại nhà |
| **Satisfaction** | 9 | Xử lý được các lỗi kết nối và cải thiện các kỹ năng tạo và cấu hình VPC |

---

*Weekly summary created by: Vũ Quang Huy*  