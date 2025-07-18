# Worklog - Ngày 18/06/2025

## 📅 Thông tin cơ bản 
- **Ngày:** 18/06/2025  
- **Thứ:** Thứ Tư  
- **Tuần thực tập:** Tuần thứ 6/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** 📈 Building the ultimate control panel.



## 🎯 Mục tiêu ngày hôm nay
- [x] Tạo một CloudWatch Dashboard toàn diện cho ứng dụng.
- [x] Kết hợp nhiều loại widget:
  - Metrics
  - Logs Insights
  - X-Ray Traces
- [x] Tìm hiểu về AWS Systems Manager (SSM) Automation.
- [x] Viết một "Runbook" tự động hóa đơn giản.

## 💼 Công việc đã thực hiện
### 1. Unified Observability Dashboard ⏱️ *4.5 giờ* 
  - **Mô tả:**  
    - Tạo một dashboard mới trên CloudWatch tên là "E-commerce-App-Health".
    - Thêm các widget:
      - **Metrics:** CPU/Memory của ECS, Latency của ALB, Cache hit rate của ElastiCache.
      - **Logs:** Một widget hiển thị các log lỗi gần nhất từ Logs Insights.
      - **Traces:** Một widget hiển thị X-Ray Service Map.
    - **Kết quả:**  
      - Một "single pane of glass" cho phép theo dõi toàn bộ sức khỏe của ứng dụng từ một nơi duy nhất.
    - **Tools/Tech:** Amazon CloudWatch Dashboards.
    - **Links:** [Link to the new dashboard]

### 2. Introduction to SSM Automation ⏱️ 3.5 giờ  
  - **Mô tả:**  
    - Tìm hiểu cách SSM Automation cho phép tạo các quy trình vận hành tự động (Runbooks).
    - Khám phá các runbook có sẵn do AWS cung cấp.
    - Viết một Automation Document bằng YAML đơn giản để restart một ECS service.
  - **Kết quả:**  
    - Nắm được cách tự động hóa các tác vụ vận hành lặp đi lặp lại.
  - **Tools/Tech:** AWS Systems Manager (SSM) Automation.
  - **Links:** [Authoring Automation runbooks](https://docs.aws.amazon.com/systems-manager/latest/userguide/automation-authoring-runbooks.html)

## 📚 Kiến thức học được

### 🔧 Technical Skills
  - AWS Services: CloudWatch Dashboards (advanced), AWS Systems Manager Automation.
  - DevOps: Runbook Automation, AIOps (khái niệm).

### 💡Concepts & Theory
  - New Concepts: Single Pane of Glass, Automated Remediation.

## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:** SSM Automation Document Syntax  
  - **Mô tả:**  
    - Cú pháp YAML và các action có sẵn của SSM khá phức tạp và khó để bắt đầu từ đầu.
  - **Solution:**  
    - Bắt đầu bằng cách sao chép và tùy chỉnh một runbook có sẵn của AWS (ví dụ: AWS-RestartEC2Instance) để làm quen.
    - Đọc kỹ tài liệu về các action step (aws:executeAwsApi, aws:branch).
  - **Lesson:**  
    - Tận dụng các tài nguyên có sẵn của AWS là cách học nhanh nhất.

## 💭 Reflection & Insights

- **Key Insights:**  
  - Một dashboard tốt không chỉ hiển thị dữ liệu, nó kể một câu chuyện về sức khỏe của hệ thống.
  - Tự động hóa runbook là bước tiếp theo để chuyển từ phản ứng thủ công sang phản ứng tự động.

## 📋 Kế hoạch ngày mai

- **High:**  
  - Tìm hiểu và thực hành các nguyên tắc của Chaos Engineering.
- **Medium:**  
  - Thực hiện một thí nghiệm chaos đơn giản.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 19/06/2025_