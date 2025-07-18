# Worklog - Ngày 17/06/2025

## 📅 Thông tin cơ bản
- **Ngày:** 17/06/2025  
- **Thứ:** Thứ Ba  
- **Tuần thực tập:** Tuần thứ 6/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** 🗺️ Vẽ bản đồ hành trình của một request.



## 🎯 Mục tiêu ngày hôm nay
- [x] Hiểu vai trò của **Distributed Tracing** trong việc gỡ lỗi microservices.
- [x] Tích hợp **AWS X-Ray SDK** vào ứng dụng NodeJS.
- [x] Bật **X-Ray tracing** cho ECS Service.
- [x] Phân tích **Service Map** và **Trace Details** trong console X-Ray.



## 💼 Công việc đã thực hiện

### 1. Code Instrumentation with X-Ray SDK ⏱️ *5 giờ*  
  - **Mô tả:**  
    - Chỉnh sửa code của ứng dụng NodeJS.  
    - Thêm `aws-xray-sdk` middleware vào Express.js framework để tự động capture các request đến.  
    - Sử dụng SDK để "wrap" các cuộc gọi đến AWS services (như S3, DynamoDB) và các cuộc gọi HTTP đi.
  - **Kết quả:**  
    - Ứng dụng giờ đây có khả năng tạo ra và gửi các "segment" trace data đến dịch vụ X-Ray.
  - **Tools/Tech:**  
    - AWS X-Ray SDK for Node.js  
    - Express.js
  - **Links:**  
    - [Code commit with X-Ray integration](https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html)

### 2. Enabling and Analyzing Traces ⏱️ *3.5 giờ*  
  - **Mô tả:**  
    - Cập nhật Task Definition của ECS, thêm vào một container "sidecar" là X-Ray daemon.  
    - Bật tùy chọn "X-Ray tracing" trong ECS Service.  
    - Deploy phiên bản mới. Thực hiện một vài request API qua nhiều service.  
    - Vào console X-Ray và xem Service Map được tự động tạo ra.  
    - Click vào một trace để xem chi tiết từng segment và subsegment.
  - **Kết quả:**  
    - Có khả năng theo dõi một request đơn lẻ từ ALB, qua service A, đến service B và quay về.  
    - Xác định chính xác thời gian xử lý ở từng chặng.
  - **Tools/Tech:**  
    - AWS X-Ray  
    - Amazon ECS
  - **Links:**  
    - [Screenshot of X-Ray Service Map](https://docs.aws.amazon.com/xray/latest/devguide/xray-console-servicemap.html)


## 📚 Kiến thức học được

#### 🔧 Technical Skills
- **AWS Services:** AWS X-Ray
- **Programming:** Code Instrumentation, Middleware usage
- **DevOps:** Distributed Tracing, Application Performance Monitoring (APM)

#### 💡 Concepts & Theory
- **New Concepts:** Traces, Segments, Subsegments, Service Map, Trace ID



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1: Code Instrumentation Complexity**
  - **Mô tả:**  
   - Việc phải thay đổi code ứng dụng là một thách thức, không chỉ là cấu hình hạ tầng.
  - **Solution:**  
   - Bắt đầu bằng việc chỉ wrap các HTTP request đến và đi.  
   - Sau đó, đi sâu vào việc wrap các cuộc gọi SDK cụ thể để có trace chi tiết hơn.  
   - Việc này cần sự phối hợp chặt chẽ giữa Dev và Ops.
  - **Lesson:**  
   - Observability thực thụ đòi hỏi sự tích hợp sâu vào ứng dụng.



## 💭 Reflection & Insights

- **What went well today?**
  - Nhìn thấy Service Map hiện ra lần đầu tiên là một khoảnh khắc "aha" cực kỳ giá trị.
  - Việc tìm ra bottleneck bằng trace data trực quan hơn rất nhiều so với việc đọc log.

- **Key Insights**
  - Distributed tracing là công cụ tối thượng để trả lời câu hỏi "tại sao" trong thế giới microservices.  
  - Nó biến một "hộp đen" thành một "hộp kính".



## 📋 Kế hoạch ngày mai

- **High:**  
  - Xây dựng một CloudWatch Dashboard thống nhất, kết hợp cả Metrics, Logs, và Traces.
- **Medium:**  
  - Tìm hiểu về AWS Systems Manager (SSM) Automation.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 18/06/2025_