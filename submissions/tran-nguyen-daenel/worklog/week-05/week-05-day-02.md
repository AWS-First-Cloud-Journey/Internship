# Worklog - Ngày 10/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 10/06/2025  
- **Thứ:** Thứ Ba  
- **Tuần thực tập:** Tuần thứ 5/10  
- **Thời gian làm việc:** 8:30 - 17:00  
- **Mood:** 💸 Slashing the compute bill!



## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu rõ cơ chế hoạt động và rủi ro của Fargate Spot.
- [x] Cập nhật ECS Service để sử dụng chiến lược kết hợp giữa Fargate On-Demand và Fargate Spot.
- [x] Triển khai thay đổi và xác nhận các task đang chạy trên Spot.
- [x] Theo dõi chi phí và độ ổn định sau khi triển khai.



## 💼 Công việc đã thực hiện

### 1. Fargate Spot Strategy ⏱️ 3 giờ

**Mô tả:**
- Đọc tài liệu về Fargate Spot và các cảnh báo ngắt quãng (interruption warnings).
- Lên kế hoạch chiến lược:
  - Duy trì 1 task chạy trên Fargate On-Demand để đảm bảo tính sẵn sàng tối thiểu.
  - Phần còn lại (ví dụ: 2-3 tasks) sẽ chạy trên Spot.

**Kết quả:**
- Một chiến lược rõ ràng để cân bằng giữa chi phí và độ tin cậy.

**Tools/Tech:** AWS Fargate Documentation.



### 2. Implementing Fargate Spot ⏱️ 5 giờ

**Mô tả:**
- Cập nhật ECS Service (sử dụng IaC hoặc Console).
- Thay đổi Capacity Provider Strategy:
  - Định nghĩa `base=1` (On-Demand).
  - Định nghĩa `weight=3` (Spot).
- Deploy lại service.
- Sử dụng AWS CLI hoặc Console để kiểm tra các task mới được tạo ra, xác nhận `capacityProviderName` của chúng là `FARGATE_SPOT`.

**Kết quả:**
- Ứng dụng vẫn hoạt động bình thường nhưng với chi phí compute thấp hơn đáng kể.

**Tools/Tech:** Amazon ECS, AWS Fargate Spot, AWS CLI.

**Links:** [Screenshot: ECS Service with Spot tasks]



## 📚 Kiến thức học được

### 🔧 Technical Skills

- **AWS Services:** AWS Fargate Spot, ECS Capacity Provider Strategy.
- **Architecture:** Thiết kế ứng dụng stateless, chịu lỗi.

### 💡 Concepts & Theory

- **New Concepts:** Spot Instances, Interruption Handling, Cost-Performance Trade-offs.
- **Best Practices:** Sử dụng Spot cho các workload phù hợp.

### 🤝 Soft Skills

- **Risk Assessment:** Đánh giá rủi ro và lợi ích của việc sử dụng Spot.



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:** Lo lắng về việc các Spot task bị ngắt đột ngột sẽ ảnh hưởng đến người dùng.
  - **Solution:** Đảm bảo ứng dụng NodeJS là stateless. Cấu hình ECS Service và ALB health check một cách chính xác để khi một task Spot bị ngắt, ALB sẽ ngay lập tức ngừng gửi traffic đến nó và ECS sẽ nhanh chóng khởi tạo một task mới thay thế.
  - **Lesson:** Thiết kế ứng dụng theo hướng stateless ngay từ đầu mang lại lợi ích rất lớn về chi phí và khả năng mở rộng.



## 💭 Reflection & Insights

- **What went well today?**  
  Triển khai Fargate Spot thành công, thấy ngay hiệu quả về chi phí.

- **What could be improved?**  
  Cần có một dashboard giám sát chuyên dụng để theo dõi số lượng task On-Demand vs Spot.

- **Key Insights:**  
  Fargate Spot là một công cụ cực kỳ mạnh mẽ để tối ưu chi phí cho các ứng dụng phù hợp.

- **Questions & Curiosities:**  
  Làm thế nào để nhận được thông báo khi một task Spot sắp bị ngắt?  
  _(Câu trả lời: qua EventBridge)._



## 📋 Kế hoạch ngày mai

- **High:** Phân tích hiệu năng ứng dụng để tìm điểm nghẽn cổ chai.
- **Medium:** Tìm hiểu về Amazon ElastiCache for Redis.



## 📊 Self Assessment

- **Productivity:** 9/10
- **Learning:** 8/10
- **Overall Satisfaction:** 9/10



## 📎 Attachments & Links

- [Fargate Spot Deep Dive](https://aws.amazon.com/vi/blogs/compute/deep-dive-into-fargate-spot-to-run-your-ecs-tasks-for-up-to-70-less/)



## 📝 Notes for tomorrow

- Chuẩn bị các công cụ benchmark để đo lường hiệu năng.



## 🎯 Week Progress

- **Day 2/5 completed** - Đã áp dụng thành công biện pháp tối ưu chi phí lớn nhất.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 11/06/2025_