# Worklog - Ngày 12/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 12/06/2025  
- **Thứ:** Thứ Năm  
- **Tuần thực tập:** Tuần thứ 5/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** ⚡️ Making things fast!



## 🎯 Mục tiêu ngày hôm nay

- [x] Triển khai một ElastiCache for Redis cluster.
- [x] Cấu hình Security Group để cho phép ECS service kết nối tới ElastiCache.
- [x] Cập nhật code NodeJS để áp dụng chiến lược caching Cache-Aside.
- [x] Đo lường lại hiệu năng của các API đã được cache.



## 💼 Công việc đã thực hiện

### 1. Deploying ElastiCache ⏱️ 3 giờ

- **Mô tả:**
  - Tạo một Subnet Group cho ElastiCache trong các private subnets.
  - Tạo một Redis cluster (single-node cho môi trường dev).
  - Cấu hình Security Group của ElastiCache để cho phép inbound traffic trên port 6379 từ Security Group của ECS service.
- **Kết quả:**
  - ElastiCache cluster sẵn sàng hoạt động.
- **Tools/Tech:** Amazon ElastiCache, AWS VPC.

### 2. Implementing Cache-Aside Logic ⏱️ 5 giờ

- **Mô tả:**
  - Thêm thư viện Redis client vào `package.json` của NodeJS.
  - Chỉnh sửa logic của các API (`/api/products`):
    - Khi có request, trước tiên kiểm tra trong Redis.
    - Nếu có dữ liệu (cache hit), trả về ngay lập tức.
    - Nếu không có (cache miss), query MongoDB, lưu kết quả vào Redis với TTL là 5 phút, sau đó trả về cho người dùng.
- **Kết quả:**
  - Chạy lại benchmark, độ trễ của API `/api/products` giảm từ ~200ms xuống còn ~20ms sau lần gọi đầu tiên.
  - Tải đọc trên MongoDB giảm mạnh.
- **Tools/Tech:** NodeJS (redis client), Redis.



## 📚 Kiến thức học được

### 🔧 Technical Skills

- AWS Services: Amazon ElastiCache for Redis.
- Programming: Tích hợp Redis vào ứng dụng NodeJS.
- Architecture: Caching patterns (Cache-Aside).

### 💡 Concepts & Theory

- New Concepts: In-memory caching, Cache Invalidation, Cache Hit/Miss Ratio.



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:** Cache Invalidation. Nếu thông tin sản phẩm (giá, tên) thay đổi trong MongoDB, người dùng vẫn sẽ thấy dữ liệu cũ trong cache cho đến khi TTL hết hạn.
  - **Solution:** Đối với tuần này, chấp nhận TTL là một giải pháp đủ tốt. Ghi nhận rằng để giải quyết triệt để, cần triển khai một cơ chế event-driven (ví dụ: dùng MongoDB Change Streams để trigger một Lambda xóa cache) trong tương lai.
  - **Lesson:** Caching là một công cụ hai lưỡi, nó tăng tốc hệ thống nhưng phải đánh đổi bằng sự phức tạp trong việc quản lý tính nhất quán dữ liệu.



## 💭 Reflection & Insights

- **What went well today?**  
  Việc tích hợp cache diễn ra suôn sẻ và mang lại kết quả cải thiện hiệu năng rõ rệt.

- **Key Insights:**  
  Caching là một trong những kỹ thuật hiệu quả nhất để cải thiện hiệu năng đọc và giảm tải cho hệ thống backend.



## 📋 Kế hoạch ngày mai

- **High:** Tối ưu hóa Database bằng Indexing.
- **Medium:** Tổng kết tuần và viết báo cáo.


## 📊 Self Assessment

- **Productivity:** 9/10
- **Learning:** 9/10
- **Overall Satisfaction:** 9/10


## 📎 Attachments & Links

- [ElastiCache Documentation](https://aws.amazon.com/vi/caching/best-practices/)



## 🎯 Week Progress

- **Day 4/5 completed** - Đã giải quyết được phần lớn vấn đề hiệu năng.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 13/06/2025_