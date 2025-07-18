# Worklog - Ngày 16/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 16/06/2025  
- **Thứ:** Thứ Hai  
- **Tuần thực tập:** Tuần thứ 6/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** 🔭 Bắt đầu hành trình thấu hiểu hệ thống.



## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu rõ 3 trụ cột của Observability: Metrics, Logs, và Traces.
- [x] Kích hoạt và khai thác CloudWatch Container Insights để có metrics chi tiết.
- [x] Viết các truy vấn nâng cao với CloudWatch Logs Insights.
- [x] Xây dựng nền tảng cho một dashboard giám sát toàn diện.



## 💼 Công việc đã thực hiện

## 1. Advanced Metrics with Container Insights ⏱️ *4 giờ*
  - **Mô tả:**  
    - Kích hoạt Container Insights cho ECS Cluster đã có.
    - Khám phá các dashboard tự động được tạo ra.
    - Phân tích các chỉ số hiệu năng (CPU, Memory, Network) ở cấp độ Cluster, Service, và Task.
  - **Kết quả:**  
    - Có một cái nhìn sâu sắc và chi tiết về việc sử dụng tài nguyên của từng microservice.
    - Dễ dàng xác định các task đang tiêu thụ nhiều tài nguyên nhất.
  - **Tools/Tech:**  
    - Amazon CloudWatch Container Insights
    - Amazon ECS
  - **Links:**  
    - [Container Insights Dashboard Screenshots](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)

## 2. Deep Dive into Log Analysis ⏱️ *4 giờ*
  - **Mô tả:**  
    - Sử dụng CloudWatch Logs Insights.
    - Viết và lưu lại các câu lệnh truy vấn phức tạp để:
     - Đếm số lượng lỗi HTTP 5xx trong một khoảng thời gian.
     - Tìm các request có độ trễ cao nhất.
     - Phân tích và thống kê các user agent truy cập.
  - **Kết quả:**  
    - Nắm vững ngôn ngữ truy vấn của Logs Insights.
    - Có khả năng trích xuất thông tin giá trị từ hàng triệu dòng log một cách nhanh chóng.
  - **Tools/Tech:**  
    - CloudWatch Logs Insights
  - **Links:**  
    - [Saved Log Insights Queries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_Insights-Saving-Queries.html)


## 📚 Kiến thức học được

### 🔧 Technical Skills

- **AWS Services:**  
  - CloudWatch Container Insights  
  - CloudWatch Logs Insights
- **DevOps:**  
  - Advanced Monitoring  
  - Log Analysis

### 💡 Concepts & Theory

- **New Concepts:**  
  - The Three Pillars of Observability  
  - Structured Logging

### 🤝 Soft Skills

- **Data Analysis:**  
  - Phân tích metrics và logs để tìm ra các pattern.



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1: Logs Insights Query Syntax**
  - **Mô tả:**  
   - Cú pháp của ngôn ngữ truy vấn ban đầu khá lạ và khó nhớ.
  - **Solution:**  
   - Bắt đầu với các câu lệnh mẫu có sẵn trong console.
   - Thực hành viết các truy vấn từ đơn giản (filter, display) đến phức tạp (stats, parse) và lưu lại để tái sử dụng.
  - **Lesson:**  
   - Việc thực hành thường xuyên là cách tốt nhất để làm chủ một ngôn ngữ truy vấn mới.



## 💭 Reflection & Insights

- **What went well today?**
  - Container Insights cung cấp một lượng thông tin khổng lồ gần như ngay lập tức.
  - Logs Insights cực kỳ mạnh mẽ cho việc gỡ lỗi và phân tích.

- **Key Insights**
  - Metrics và Logs là hai trụ cột đầu tiên và quan trọng nhất của Observability.
  - Việc làm chủ chúng giúp chuyển từ trạng thái "mù mờ" sang "hiểu rõ" hệ thống.


## 📋 Kế hoạch ngày mai

- **High:**  
  - Triển khai trụ cột thứ ba của Observability: Distributed Tracing với AWS X-Ray.
- **Medium:**  
  - Tích hợp X-Ray SDK vào ứng dụng NodeJS.



## 📊 Self Assessment

- **Productivity:** 8/10
- **Learning:** 9/10
- **Overall Satisfaction:** 9/10



## 📎 Attachments & Links

- [CloudWatch Container Insights Documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 17/06/2025_