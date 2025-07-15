# 📈 Weekly Summary - Tuần 8 

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 8
- **Thời gian làm việc**: 9:00 - 17:00, từ 30/06 đến 04/07
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😊
- **Điểm nổi bật**: 
  - Tìm hiểu tổng quan về EKS
  - Tìm hiểu về các case study thực tế và các doanh nghiệp đang triển khai
  - Triển khai ứng dụng với eksctl, kubectl

---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Tìm hiểu tổng quan về EKS, Kubernetes
- [x] Mục tiêu 2: Tham khảo các case study thực tế của các doanh nghiệp trong nhiều lĩnh vực
- [x] Mục tiêu 3: Triển khai ứng dụng với EKS

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 30/06 | Đọc tài liệu chính thức AWS EKS,Control Plane, Node Group, Pod, Cluster Networking,Vẽ sơ đồ kiến trúc tổng quan EKS | Hiểu được khái niệm EKS, các thành phần chính và cách hoạt động tổng thể | 8 | Amazon EKS, EC2, VPC, IAM |
| Thứ 3 - 01/07 | Tìm hiểu các use case của các khách hàng AWS về việc triển khai hạ tầng với EKS và phân tích các case study | Phân tích các vấn đề các doanh nghiệp gặp phải và cách ứng dụng của EKS vào hạ tầng của họ | 8 | EKS, CodePipeline, RDS, S3, SageMaker, API Gateway, Elasticache |
| Thứ 4 - 02/07 | Tìm hiểu về các case study của các khách hàng của AWS trong lĩnh vực tài chính, giáo dục, công nghệ | Phân tích các bài toán gặp phải của các doanh nghiệp trong mỗi lĩnh vực,ứng dụng EKS trong các lĩnh vực khác nhau | 8 | EKS, Fargate, CodePipeline, CloudWatch, S3, SageMaker |
| Thứ 5 - 03/07 | Cài đặt eksctl, kubectl, tạo và kiểm tra một cụm EKS thử nghiệm | Tạo thành công cụm EKS với thời gian ~15 phút, Cluster đã có thể được kết nối từ kubectl | 8 | EKS, IAM, EC2 |
| Thứ 6 - 04/07 | Triển khai ứng dụng mẫu trên cụm EKS: giám sát và hỗ trợ autoscaling | Truy cập được ứng dụng thông qua hostname, HPA hoạt động và scale pod khi CPU vượt ngưỡng  | 8 | Amazon EKS, ALB Ingress Controller |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: Amazon EKS, EC2, VPC, IAM, RDS, S3, SageMaker, API Gateway, Elasticache
- **Programming**: [Ngôn ngữ, thư viện, framework]
- **DevOps**: 
  - Kubernetes architecture
  - CI/CD pipelines trên AWS, IaC với Terraform
  - eksctl, kubectl, AWS CLI
- **Architecture**: 
  - Hiểu kiến trúc phân tán của hệ thống container orchestration (K8s)
  - Triển khai EKS trong môi trường doanh nghiệp thực tế, multi-region setup

### 💡 Concepts & Theory
- **New Concepts**: 
  - Kubernetes Control Plane, Managed Node Group vs Self-managed
  - Kết hợp ML service (SageMaker) trong pipeline
  - Ingress Controller cho EKS (ALB vs NGINX)
  - Autoscaling pod bằng CPU Utilization
- **Best Practices**: 
  - Sử dụng Managed Node Group để đơn giản hoá vận hành
  - Quản lý microservices với GitOps/CI/CD
- **Industry Knowledge**: 
  - EKS phù hợp với doanh nghiệp đã dùng AWS, cần mở rộng microservices
  - Doanh nghiệp ưu tiên tự động hoá, mở rộng linh hoạt, tăng tính sẵn sàng

### 🤝 Soft Skills
- **Communication**: 
  - Ghi chú rõ ràng trong khi đọc
  - Tổng hợp insight ngắn gọn, dễ hiểu
- **Problem Solving**: 
  - Chia nhỏ từng thành phần để hiểu dễ hơn
  - Phân tích các vấn đề thực tế của doanh nghiệp
- **Time Management**: Chia thời gian cho đọc lý thuyết và vẽ sơ đồ hợp lý
- **Learning**: 
  - Tra cứu thêm khi chưa hiểu rõ CNI plugin
  - Rút ra mẫu kiến trúc phù hợp để học hỏi
  - Học qua tài liệu và thử nghiệm thực tế

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề 1: Các case study có nhiều dịch vụ và tools, khó nắm bắt hết
- **Mô tả**: Mỗi case dùng nhiều thành phần khác nhau như AI, security, analytics
- **Solution**: Chỉ tập trung vào EKS và các dịch vụ AWS liên quan trực tiếp
- **Result**: Rút gọn được thông tin và dễ tổng hợp insight
- **Lesson**: Học cách lọc thông tin đúng trọng tâm khi nghiên cứu tài liệu doanh nghiệp

---

## 💭 Reflection & Insights

### ✅ What went well
- Tìm hiểu được nhiều kiến trúc thực tế
- Biết cách liên kết giữa EKS và các dịch vụ AWS khác
- Hiểu được cách EKS được ứng dụng khác nhau theo từng lĩnh vực

### 🔄 What could be improved
- Cần kết hợp thêm thực hành CLI hoặc demo
- Nên sơ đồ hoá kiến trúc mỗi case study để dễ nhớ
- Nên tìm thêm 1-2 case để mở rộng góc nhìn đa dạng hơn

### ✨ Key Insights
- EKS giúp đơn giản hoá việc chạy Kubernetes nhưng vẫn yêu cầu hiểu rõ K8s core
- Việc hiểu networking là nền tảng cho bảo mật và scaling
- Doanh nghiệp chuyển đổi hạ tầng để tăng tốc độ triển khai và tối ưu chi phí
- Các công ty đều kết hợp EKS với các dịch vụ CI/CD và monitoring để tạo thành hệ thống hoàn chỉnh
- Triển khai ứng dụng trên EKS đòi hỏi sự phối hợp của nhiều thành phần Kubernetes
---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 9 | Kết hợp giữa việc triển khai thử nghiệm và tham khảo các case study thực tế |
| **Learning** | 8 | Các case study thực tế sử dụng EKS |
| **Collaboration** | 7 | Cần giao tiếp để học hỏi thêm kinh nghiệm từ teams và mentor |
| **Satisfaction** | 9 | Tìm hiểu thêm nhiều về các vấn đề và hiệu quả khi áp dụng EKS để cải thiện hiệu suất và tối ưu chi phí |

---

*Weekly summary created by: Vũ Quang Huy*  