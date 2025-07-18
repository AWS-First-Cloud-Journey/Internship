# Worklog - Ngày 11/06/2025

## 📅 **Thông tin cơ bản**  
- **Ngày:** 11/06/2025  
- **Thứ:** Thứ Tư  
- **Tuần thực tập:** Tuần thứ 5/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** 🔍 Hunting for bottlenecks.



## 🎯 Mục tiêu ngày hôm nay
- [x] Sử dụng CloudWatch metrics để phân tích độ trễ của ALB và hiệu năng của ECS.
- [x] Sử dụng công cụ của MongoDB (ví dụ: Atlas Performance Advisor) để xác định các câu lệnh truy vấn chậm.
- [x] Xác định các API endpoint được gọi nhiều nhất và tốn nhiều thời gian nhất.
- [x] Lên kế hoạch tối ưu hóa bằng caching.

---

## 💼 Công việc đã thực hiện

### 1. Application Performance Analysis ⏱️ 4 giờ  
  - Xem xét metric `TargetResponseTime` của ALB và log truy cập.  
  - Xem xét metrics `CPUUtilization` và `MemoryUtilization` của ECS Service.  
  - Tổng hợp dữ liệu và xác định các API như:  
    - `/api/products`  
    - `/api/categories`  
    là những ứng viên hàng đầu cho việc tối ưu hóa.  
  - **Kết quả:**  
    - Một danh sách các điểm nghẽn tiềm năng và dữ liệu chứng minh.  
  - **Tools/Tech:**  
    - Amazon CloudWatch Metrics  
    - ALB Access Logs

### 2. Database Query Analysis ⏱️ 4 giờ  
  - Đăng nhập vào MongoDB Atlas và sử dụng công cụ Performance Advisor.  
  - Phân tích các query đang chạy, tìm ra các query đang thực hiện:  
    - "Collection Scan" thay vì sử dụng index.  
  - **Kết quả:**  
    - Xác định được một vài query quan trọng thiếu index, gây ra độ trễ cao khi lượng dữ liệu tăng lên.  
  - **Tools/Tech:**  
    - MongoDB Atlas Performance Advisor  
    - Database Profiling



## 📚 Kiến thức học được

🔧 **Technical Skills**  
  - AWS Services:  
   - CloudWatch Metrics  
   - CloudWatch Logs Insights  
  - Database:  
   - MongoDB query profiling  
   - Indexing concepts  
  - DevOps:  
   - Performance analysis  
   - Bottleneck identification

💡 **Concepts & Theory**  
  - New Concepts:  
   - Performance Metrics (Latency, Throughput)  
   - Database Indexing vs. Collection Scan



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:**  
  - Khó liên kết một request chậm trên ALB với một câu lệnh query chậm cụ thể trong database.  
  - **Solution:**  
   - Đây là lúc nhận ra sự cần thiết của Distributed Tracing.  
   - Ghi nhận đây là một điểm cần cải thiện trong tương lai (Tuần 6).  
   - Tạm thời khắc phục bằng cách thêm các log chi tiết vào code NodeJS để ghi lại thời gian bắt đầu và kết thúc của một truy vấn database.  
  - **Lesson:**  
   - Observability không chỉ là metrics và logs, mà còn cần cả traces để có cái nhìn toàn cảnh.



## 💭 Reflection & Insights

- **What went well today?**  
  - Xác định chính xác các điểm nghẽn bằng dữ liệu thực tế.
- **What could be improved?**  
  - Cần có công cụ tốt hơn để tracing.
- **Key Insights:**  
  - Không thể tối ưu hóa những gì bạn không thể đo lường.  
  - Phân tích có hệ thống là cách duy nhất để tìm ra vấn đề hiệu năng thực sự.

## 📋 Kế hoạch ngày mai

- **High:**  
  - Triển khai Amazon ElastiCache for Redis để tạo một lớp caching.
- **Medium:**  
  - Tích hợp caching vào ứng dụng NodeJS.

---

## 📊 Self Assessment

- **Productivity:** 8/10
- **Learning:** 9/10
- **Overall Satisfaction:** 8/10


## 📎 Attachments & Links

- [RDS Performance Insights (Tương tự cho việc tìm hiểu)](https://aws.amazon.com/vi/rds/performance-insights/)



## 📝 Notes for tomorrow

- Chuẩn bị code để kết nối với Redis.



## 🎯 Week Progress

- Day 3/5 completed  
  - Đã xác định được nguyên nhân gốc rễ của việc chậm.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 12/06/2025_