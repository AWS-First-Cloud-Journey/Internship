# Worklog - Ngày 27/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 27/05/2025  
- **Thứ:** Thứ Ba  
- **Tuần thực tập:** Tuần thứ 3/12  
- **Thời gian làm việc:** 8:30 - 17:30  
- **Mood:** 🌍 Thinking globally!

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu kiến trúc và lợi ích của Mạng phân phối nội dung (CDN)
- [x] Tạo một CloudFront Distribution với hai Origin: S3 và Application Load Balancer
- [x] Cấu hình Cache Behaviors để xử lý các loại nội dung khác nhau
- [x] Tìm hiểu về Lambda@Edge và CloudFront Functions

---

## 💼 Công việc đã thực hiện

### 1. CloudFront Fundamentals ⏱️ 8:30-10:00

- **Mô tả:**
  - Đọc về kiến trúc CDN của AWS:
    - Regions
    - Edge Locations
    - Regional Edge Caches
  - Tìm hiểu các thành phần của một Distribution:
    - Origin
    - Behavior
    - Caching Policy

- **Kết quả:**
  - Hiểu rõ cách CloudFront giúp:
    - Giảm độ trễ
    - Tăng tính sẵn sàng

- **Tools/Tech:**
  - AWS Documentation

---

### 2. Creating a CloudFront Distribution ⏱️ 10:00-12:00, 13:00-15:00

- **Mô tả:**
  - Tạo Distribution mới
  - Cấu hình Origin mặc định:
    - Application Load Balancer
  - Thêm một Origin nữa:
    - S3 bucket chứa các file tĩnh (CSS, JS, images)
  - Tạo 2 Behavior:
    - `/static/*` trỏ về S3
    - `Default (*)` trỏ về ALB

- **Kết quả:**
  - Distribution được deploy thành công sau ~15 phút
  - Truy cập website qua domain của CloudFront:
    - Nội dung được tải nhanh hơn đáng kể

- **Tools/Tech:**
  - AWS Console (CloudFront)

---

### 3. Exploring Edge Logic ⏱️ 15:00-17:00

- **Mô tả:**
  - So sánh:
    - Lambda@Edge
    - CloudFront Functions
  - Viết một hàm CloudFront Function đơn giản:
    - Thêm HTTP header `X-Custom-Header: MyTest` vào tất cả các request

- **Kết quả:**
  - Nắm được khi nào nên dùng loại nào
  - Deploy thành công function và kiểm tra header trong trình duyệt

- **Tools/Tech:**
  - AWS Console (CloudFront Functions)

---

## 📚 Kiến thức học được

- **Technical Skills:**
  - Amazon CloudFront
  - CloudFront Functions
  - Cache Behaviors
  - Origin configuration
- **Concepts & Theory:**
  - CDN
  - Edge Computing
  - Time to First Byte (TTFB)
  - Cache Hit/Miss/Error
- **Soft Skills:**
  - Tư duy kiến trúc toàn cầu
  - Cấu hình các quy tắc phức tạp

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**
  - Nội dung động từ ALB không được cập nhật ngay cả khi dữ liệu backend đã thay đổi
- **Giải pháp:**
  - Phát hiện ra `Cache Policy` mặc định cho ALB đang cache trong một thời gian dài
  - Tạo một `Cache Policy` mới với:
    - `Min TTL`, `Max TTL` và `Default TTL` đều bằng 0 để không cache nội dung động
    - Chỉ forward header
  - Áp dụng policy này cho Behavior mặc định

---

## 💭 Reflection & Insights

- **Key Insight:**
  - CloudFront không chỉ dành cho nội dung tĩnh
  - Nó cực kỳ mạnh mẽ cho việc tăng tốc và bảo vệ cả ứng dụng động bằng cách đóng vai trò như một "mặt tiền" toàn cầu

---

## 📋 Kế hoạch ngày mai

- **High:**
  - Bắt đầu hành trình **Infrastructure as Code (IaC) nâng cao với AWS CDK**
- **Medium:**
  - Cài đặt môi trường và tạo project CDK đầu tiên bằng TypeScript
- **Low:**
  - Viết lại VPC đã tạo ở Tuần 1 bằng CDK

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 28/05/2025*
