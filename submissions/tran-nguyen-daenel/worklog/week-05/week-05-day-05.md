# Worklog - Ngày 13/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 13/06/2025  
- **Thứ:** Thứ Sáu  
- **Tuần thực tập:** Tuần thứ 5/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** ✅ Feeling accomplished.



## 🎯 Mục tiêu ngày hôm nay

- [x] Tạo các index cần thiết cho MongoDB dựa trên phân tích từ Thứ Tư.
- [x] Xác nhận hiệu năng của các câu lệnh truy vấn đã được cải thiện.
- [x] Review lại toàn bộ các hành động tối ưu hóa trong tuần.
- [x] Hoàn thành báo cáo tổng kết tuần 5.



## 💼 Công việc đã thực hiện

### 1. Database Indexing ⏱️ 3 giờ

- **Mô tả:**
  - Dựa trên kết quả phân tích, sử dụng MongoDB Atlas UI hoặc mongosh để tạo các index còn thiếu.
  - Ví dụ: tạo một compound index trên trường `category` và `price` để tối ưu cho việc lọc sản phẩm.
- **Kết quả:**
  - Thời gian thực thi của các câu lệnh query chậm giảm đáng kể, ngay cả khi không có cache (cache miss).
- **Tools/Tech:** MongoDB, Database Indexing.

### 2. Final Review and Documentation ⏱️ 4 giờ

- **Mô tả:**
  - Chạy lại toàn bộ bài test hiệu năng và ghi lại các kết quả cải thiện.
  - Viết báo cáo tổng kết chi tiết cho Tuần 5, ghi lại các quyết định, thách thức và kết quả.
  - Dọn dẹp các tài nguyên đã tạo (ElastiCache cluster).
- **Kết quả:**
  - Báo cáo tuần hoàn chỉnh.
  - Một hệ thống được tối ưu hóa cả về chi phí lẫn hiệu năng.
- **Tools/Tech:** Notion, Markdown.


## 📚 Kiến thức học được

### 🔧 Technical Skills

- Database: MongoDB Indexing, Query Plan Analysis.
- DevOps: Performance validation, Technical writing.

### 💡 Concepts & Theory

- New Concepts: Holistic system optimization.



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:** Việc chọn đúng index không phải lúc nào cũng rõ ràng. Một index sai có thể làm chậm các thao tác ghi.
  - **Solution:** Nghiên cứu về "query plan" của MongoDB để hiểu cách database thực thi một câu lệnh truy vấn với và không có index. Luôn kiểm tra tác động của một index mới lên cả hiệu năng đọc và ghi.
  - **Lesson:** Hiểu cách database hoạt động "bên trong" là rất quan trọng để tối ưu hóa hiệu quả.



## 💭 Reflection & Insights

- **What went well today?**  
  Hoàn thành mục tiêu cuối cùng của tuần là tối ưu hóa DB, mang lại cảm giác hoàn thành trọn vẹn.
- **Key Insights:**  
  Tối ưu hóa là một công việc đa chiều. Đôi khi quick win đến từ caching, đôi khi nó đến từ việc sửa một câu lệnh query ở tầng sâu nhất. Một kỹ sư DevOps giỏi cần có cái nhìn toàn cảnh để biết nên tác động vào đâu.


## 📋 Kế hoạch ngày mai

- **High:** Bắt đầu tìm hiểu về Observability nâng cao với Distributed Tracing (Tuần 6).
- **Medium:** Triển khai AWS X-Ray.



## 📊 Self Assessment

- **Productivity:** 9/10
- **Learning:** 8/10
- **Overall Satisfaction:** 10/10



## 📎 Attachments & Links

- [MongoDB Indexing Strategies](https://www.mongodb.com/docs/manual/indexes/)


## 📝 Notes for tomorrow

- Chuẩn bị cho tuần 6, tập trung vào Observability.


## 🎯 Week Progress

- **Day 5/5 completed** - Tuần tối ưu hóa thành công tốt đẹp!

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 16/06/2025_