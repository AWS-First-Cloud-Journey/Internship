# Worklog - Ngày 26/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 26/05/2025  
- **Thứ:** Thứ Hai  
- **Tuần thực tập:** Tuần thứ 3/12  
- **Thời gian làm việc:** 8:30 - 17:30  
- **Mood:** 🤔 Focused và sẵn sàng tối ưu hóa.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu các chiến lược caching (Caching Patterns) và chọn chiến lược phù hợp.
- [x] Triển khai một ElastiCache for Redis cluster trong VPC.
- [x] Tích hợp ElastiCache vào ứng dụng Node.js/Python để giảm tải cho database.
- [x] Đo lường hiệu năng trước và sau khi áp dụng caching.

---

## 💼 Công việc đã thực hiện

### 1. Learning Caching Strategies ⏱️ 8:30-10:30

- **Mô tả:**  
  - Nghiên cứu về các caching pattern: Cache-Aside, Read-Through, Write-Through.  
  - So sánh ưu nhược điểm của Redis và Memcached.  
  - Quyết định sử dụng Redis và chiến lược Cache-Aside cho dự án.
- **Kết quả:**  
  - Nắm vững lý thuyết về caching.  
  - Tạo một sơ đồ kiến trúc mới có thêm lớp caching.
- **Tools/Tech:** AWS Documentation, Draw.io, Notion.

---

### 2. Deploying ElastiCache Cluster ⏱️ 10:30-12:00

- **Mô tả:**  
  - Tạo một Subnet Group riêng cho ElastiCache.  
  - Tạo một Security Group cho phép traffic từ EC2 instance trên port 6379.  
  - Deploy một ElastiCache for Redis cluster (single-node cho mục đích dev).
- **Kết quả:**  
  - ElastiCache cluster ở trạng thái `available`.  
  - Ghi lại endpoint của cluster để sử dụng trong ứng dụng.
- **Tools/Tech:** AWS Console (ElastiCache, VPC).

---

### 3. Application Integration & Benchmarking ⏱️ 13:30-17:00

- **Mô tả:**  
  - Chỉnh sửa code ứng dụng: trước khi query database, kiểm tra xem dữ liệu có trong Redis không. Nếu không, query database rồi lưu kết quả vào Redis với TTL là 5 phút.  
  - Sử dụng tool `ab` (Apache Benchmark) để đo thời gian phản hồi trước và sau khi có cache.
- **Kết quả:**  
  - Thời gian phản hồi trung bình giảm từ 250ms xuống còn 50ms sau vài request đầu tiên.  
  - Tải trên CPU của RDS instance giảm rõ rệt.
- **Tools/Tech:** VS Code, Node.js (redis client), Apache Benchmark, CloudWatch.

---

## 📚 Kiến thức học được
- **Technical Skills:**  
  - Amazon ElastiCache  
  - Redis  
  - Security Group configuration  
  - Application-level caching logic  
- **Concepts & Theory:**  
  - Cache-aside pattern  
  - Cache Invalidation  
  - Time-To-Live (TTL)  
  - Performance benchmarking  
- **Soft Skills:**  
  - Phân tích vấn đề (performance bottleneck)  
  - Đo lường và ra quyết định dựa trên dữ liệu

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
  - Ứng dụng không thể kết nối tới ElastiCache endpoint, báo lỗi timeout.
- **Giải pháp:**  
  - Debug và phát hiện Security Group của ElastiCache chưa cho phép Inbound rule từ Security Group của EC2 instances.  
  - Cập nhật lại rule và kết nối thành công.

---

## 💭 Reflection & Insights

- **Key Insight:**  
  - Caching là một trong những cách hiệu quả nhất để cải thiện hiệu năng một cách đột phá.  
  - Một thay đổi nhỏ có thể giảm tải cho toàn bộ hệ thống backend.

---

## 📋 Kế hoạch ngày mai

- **High:**  
  - Tìm hiểu và triển khai **Amazon CloudFront** để giảm độ trễ cho người dùng toàn cầu.
- **Medium:**  
  - Cấu hình CloudFront để cache cả nội dung tĩnh (S3) và động (ALB).

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 27/05/2025*
