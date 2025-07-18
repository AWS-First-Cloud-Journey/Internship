# Worklog - Ngày 22/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 22/05/2025  
- **Thứ:** Thứ Năm  
- **Tuần thực tập:** Tuần thứ 2/12  
- **Thời gian làm việc:** 8:00 - 18:00  
- **Mood:** 🤯 So much YAML! But powerful.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu khái niệm Infrastructure as Code (IaC) và lợi ích của CloudFormation.
- [x] Viết một template CloudFormation bằng YAML để tạo ECS Cluster.
- [x] Mở rộng template để định nghĩa ECS Task Definition và Service chạy trên Fargate.
- [x] Deploy thành công stack CloudFormation.

---

## 💼 Công việc đã thực hiện

### 1. Introduction to IaC and CloudFormation ⏱️ 8:00-10:00

- **Mô tả:**  
    - Đọc về IaC.  
    - Tìm hiểu các thành phần của một template CloudFormation:  
        - Parameters  
        - Resources  
        - Outputs
- **Kết quả:**  
    - Nắm vững lợi ích của IaC:  
        - Tính nhất quán  
        - Khả năng lặp lại  
        - Quản lý phiên bản
- **Tools/Tech:**  
    - AWS Documentation

---

### 2. Writing the CloudFormation Template ⏱️ 10:00-12:00, 13:00-16:00

- **Mô tả:**  
    - Viết file `ecs-infra.yml`.  
    - Bắt đầu với việc tạo ECS Cluster.  
    - Thêm các resource cho Task Definition (trỏ tới image trên ECR).  
    - Thêm ECS Service (để chạy và duy trì số lượng task).
- **Kết quả:**  
    - Một file template YAML hoàn chỉnh định nghĩa toàn bộ hạ tầng cần thiết.
- **Tools/Tech:**  
    - VS Code (với CloudFormation Linter)  
    - AWS Documentation

---

### 3. Deploying the Stack ⏱️ 16:00-17:30

- **Mô tả:**  
    - Sử dụng AWS Console để deploy stack từ file template đã tạo.  
    - Theo dõi quá trình tạo resource.  
    - Debug lỗi nếu có.
- **Kết quả:**  
    - Stack được tạo thành công.  
    - ECS Service đang chạy với 1 task mong muốn.
- **Tools/Tech:**  
    - AWS CloudFormation
- **Links:**  
    - [Screenshot: CloudFormation Stack Events]

---

## 📚 Kiến thức học được

- **Technical Skills:**  
    - AWS CloudFormation (YAML)  
    - AWS ECS (Cluster, Task Definition, Service)  
    - Fargate
- **Concepts & Theory:**  
    - Infrastructure as Code (IaC)  
    - Declarative vs Imperative  
    - Stack
- **Soft Skills:**  
    - Kiên trì debug lỗi cú pháp YAML  
    - Tư duy kiến trúc

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    - CloudFormation stack rollback liên tục do lỗi ở resource ECS Service, thông báo "Unable to assume role".
- **Giải pháp:**  
    - Mất gần 1 giờ để debug.  
    - Phát hiện ra `ExecutionRoleArn` trong Task Definition chưa có policy để pull image từ ECR.  
    - Cập nhật lại role và deploy lại thành công.

---

## 💭 Reflection & Insights

- **Key Insight:**  
    - IaC là một sự thay đổi tư duy.  
    - Hạ tầng không còn là thứ được "click" thủ công mà là code, có thể được review, kiểm tra và quản lý như phần mềm.

---

## 📋 Kế hoạch ngày mai

- **High:**  
    - Tích hợp giai đoạn Deploy to ECS vào CodePipeline.
- **Medium:**  
    - Tìm hiểu về VPC Flow Logs và phân tích bằng Athena.
- **Low:**  
    - Tổng kết và viết báo cáo tuần.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 22/05/2025*