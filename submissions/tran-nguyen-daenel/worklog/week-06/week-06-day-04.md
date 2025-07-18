# Worklog - Ngày 19/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 19/06/2025  
- **Thứ:** Thứ Năm  
- **Tuần thực tập:** Tuần thứ 6/10  
- **Thời gian làm việc:** 9:00 - 17:00  
- **Mood:** 💥 Breaking things on purpose to build confidence.



## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu nguyên tắc của Chaos Engineering.
- [x] Thiết kế một thí nghiệm chaos đơn giản với giả thuyết rõ ràng.
- [x] Thực hiện thí nghiệm và quan sát khả năng tự phục hồi của hệ thống.
- [x] Ghi lại kết quả và bài học kinh nghiệm.



## 💼 Công việc đã thực hiện

### 1. Principles of Chaos Engineering ⏱️ 2.5 giờ

- **Mô tả:**
  - Đọc về Chaos Engineering và cách nó được áp dụng tại Netflix.
  - Hiểu về việc "chủ động đưa sự hỗn loạn vào hệ thống để xây dựng sự tự tin vào khả năng phục hồi của nó".
  - Các bước của một thí nghiệm:
    - Steady State
    - Hypothesis
    - Experiment
    - Verification
    - Learning
- **Kết quả:**  
  - Nắm vững triết lý và các bước để thực hiện một thí nghiệm chaos an toàn.



### 2. Simple Chaos Experiment: Task Failure ⏱️ 5 giờ

- **Mô tả:**
  - **Giả thuyết (Hypothesis):**  
    "Nếu một trong ba task của backend service bị dừng đột ngột, hệ thống sẽ tự động khởi tạo task mới trong vòng 2 phút, và người dùng sẽ chỉ gặp một số lượng lỗi không đáng kể (<1%) trong khoảng thời gian đó."
  - **Thí nghiệm (Experiment):**  
    Sử dụng AWS CLI để stop một task ECS đang chạy.
  - **Quan sát (Verification):**  
    - Theo dõi dashboard đã tạo hôm qua.
    - Chú ý đến số lượng task, health status của Target Group, và tỷ lệ lỗi 5xx trên ALB.
- **Kết quả:**  
  - Giả thuyết được xác nhận.
  - ALB nhanh chóng phát hiện task unhealthy, ECS scheduler khởi tạo task mới.
  - Tỷ lệ lỗi rất thấp.
- **Tools/Tech:**  
  - Amazon ECS
  - ALB
  - CloudWatch Dashboards
  - AWS CLI
- **Links:**  
  - [Chaos Experiment Report](https://aws.amazon.com/vi/blogs/compute/chaos-experiments-using-aws-step-functions-and-aws-fault-injection-simulator/)



## 📚 Kiến thức học được

### 🔧 Technical Skills

- DevOps: Chaos Engineering.
- AWS Services: AWS Fault Injection Simulator (FIS) (conceptual).

### 💡 Concepts & Theory

- New Concepts:
  - System Resilience
  - Fault Injection
  - Blast Radius
  - Game Days



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1: The "Fear Factor"**
  - **Mô tả:**  
    Cảm giác lo sợ và ngần ngại khi cố tình thực hiện một hành động có thể gây lỗi cho hệ thống.
  - **Solution:**  
    - Bắt đầu với môi trường staging.
    - Định nghĩa rõ ràng "blast radius" (phạm vi ảnh hưởng).
    - Thông báo cho tất cả các bên liên quan và có một kế hoạch "stop" thí nghiệm ngay lập tức nếu cần.
  - **Lesson:**  
    Chaos Engineering là một bộ môn khoa học, không phải là hành động phá hoại ngẫu nhiên. Nó xây dựng sự tự tin.



## 💭 Reflection & Insights

- **Key Insights:**  
  Chỉ khi bạn dám phá vỡ hệ thống của mình, bạn mới thực sự hiểu nó và tin tưởng vào nó. Chaos Engineering chuyển đổi tư duy từ "hy vọng không có lỗi" sang "chấp nhận lỗi sẽ xảy ra và chuẩn bị cho nó".



## 📋 Kế hoạch ngày mai

- **High:** Review lại toàn bộ kiến thức tuần 6.
- **Medium:** Viết báo cáo tổng kết tuần.
- **Low:** Lên kế hoạch cho Tuần 7: Kubernetes.
---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 20/06/2025_