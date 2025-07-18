# Worklog - Ngày 21/05/2025
## 📅 Thông tin cơ bản

- **Ngày:** 21/05/2025  
- **Thứ:** Thứ Tư  
- **Tuần thực tập:** Tuần thứ 2/12  
- **Thời gian làm việc:** 8:30 - 18:00  
- **Mood:** 🐳 Learning something completely new!

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu các khái niệm cơ bản của Docker: Image, Container, Dockerfile.
- [x] Viết một Dockerfile để container hóa ứng dụng "Hello World".
- [x] Build Docker image thành công trên máy local.
- [x] Tạo một repository trên Amazon ECR và đẩy image lên đó.

---

## 💼 Công việc đã thực hiện

### 1. Docker Fundamentals ⏱️ 8:30-11:30

- **Mô tả:**  
    Hoàn thành tutorial "Docker for Beginners".  
    Thực hành các lệnh cơ bản:  
    - `docker run`  
    - `docker ps`  
    - `docker images`  
    - `docker build`  
- **Kết quả:**  
    Hiểu rõ sự khác biệt giữa image và container.  
    Có thể chạy các container có sẵn từ Docker Hub.  
- **Tools/Tech:**  
    Docker Desktop, Ubuntu Terminal.

---

### 2. Writing a Dockerfile ⏱️ 13:00-15:00

- **Mô tả:**  
    Tạo file Dockerfile cho ứng dụng Node.js đơn giản.  
    Sử dụng multi-stage build để tối ưu kích thước image.
- **Kết quả:**  
    Có một Dockerfile hoàn chỉnh, build thành công image `my-hello-world-app:v1` trên local.
- **Tools/Tech:**  
    VS Code, Docker.

---

### 3. Working with Amazon ECR ⏱️ 15:00-17:30
- **Mô tả:**  
    Tạo một private repository trên ECR.  
    Sử dụng AWS CLI để lấy lệnh login.  
    Thực hiện `docker tag` image đã build với định dạng URI của ECR.  
    Đẩy image lên ECR bằng lệnh `docker push`.
- **Kết quả:**  
    Image `my-hello-world-app:v1` đã được lưu trữ an toàn trên ECR.
- **Tools/Tech:**  
    Amazon ECR, AWS CLI, Docker.
- **Links:**  
    [ECR Repository URI]

---

## 📚 Kiến thức học được

- **Kỹ năng kỹ thuật:**  
    - Docker (Dockerfile, build, run, push)  
    - Amazon ECR  
    - AWS CLI ECR login  
- **Kiến thức & Lý thuyết:**  
    - Containerization  
    - Image Layers  
    - Container Registry  
    - Immutability  
- **Kỹ năng mềm:**  
    - Tự học công nghệ mới  
    - Giải quyết vấn đề (troubleshooting Docker build errors)

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    Lệnh `docker push` tới ECR thất bại.

- **Giải pháp:**  
    Đọc kỹ log lỗi và hướng dẫn trên ECR console.  
    Nhận ra đã quên tag image với đúng định dạng URI của ECR.  
    Thực hiện lại lệnh `docker tag` và `push` thành công.

---

## 💭 Reflection & Insights
- **Key Insight:**  
    Container giải quyết triệt để vấn đề "It works on my machine".  
    Nó đóng gói ứng dụng và tất cả dependencies, đảm bảo tính nhất quán trên mọi môi trường.

---

## 📋 Kế hoạch ngày mai

- **High:** Học về Infrastructure as Code (IaC) với AWS CloudFormation.
- **Medium:** Viết template CloudFormation để tạo hạ tầng cho ECS (Fargate).

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 21/05/2025*