# 📈 Weekly Summary - Tuần 7

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 7
- **Thời gian làm việc**: 8:00 - 17:00, từ 23/06 đến 27/06
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😊
- **Điểm nổi bật**: 
  - Triển khai thành công các custom Pipeline: CodeBuild, CodeDeploy, CodeCommit
  - Tạo trigger tới Github repo
  - Tự động hóa quy trình build và push image

---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Cấu hình custom Pipeline nhiều kịch bản
- [x] Mục tiêu 2: Tìm hiểu AWS CodePipeline và các thành phần liên quan 
---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 23/06 | Tìm hiểu các dịch vụ CI/CD trên AWS, Kết nối CodePipeline với GitHub, Triển khai CI/CD Pipeline hoàn chỉnh  | Đẩy code mới lên GitHub → pipeline build image mới → đẩy lên ECR → ECS tự động cập nhật và chạy task mới | 8 | CodePipeline, CodeBuild, ECR, ECS Fargate, IAM Roles, Docker |
| Thứ 3 - 24/06 | Triển khai ứng dụng trên local và EC2 build và push image lên DockerHub và ECR | Build thành công image và run ứng dụng | 8 |  ECR, RDS, EC2 |
| Thứ 4 - 25/06 | Kết hợp CodeBuild, Code Deploy vào CodePipeline | Hoàn thiện quy trình tự động hóa build và deploy | 8 | EC2, CodePipline, CodeBuild, CodeDeploy, IAM |
| Thứ 5 - 26/06 | Xây dựng pipeline build ứng dụng lên EC2 và lưu trữ mã nguồn ở S3 | Kết hợp thành công và chạy ứng dụng trên EC2 | 8 | S3, EC2, IAM, CodeDeploy, CodePipeline |
| Thứ 6 - 27/06 | Cấu hình IAM, tích hợp CodePipeline vào workshop cũ để build image và deploy lên ECS | Tự động hóa được quy trình Build và push image | 8 | CodePipeline, CodeBuild, ECR, IAM |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: CodePipeline, CodeBuild, ECR, ECS (Fargate), IAM, RDS, EC2
- **Programming**: NodeJS, dockerfile, YAML
- **DevOps**: 
  - Quy trình build ứng dụng và quản lý image với Container Registry
  - CI/CD pipeline với AWS service
- **Architecture**: 
  - Kết nối ECR → ECS → cập nhật task definition  
- **CI/CD Practice**: GitHub-triggered deployment, automated container image build  

### 💡 Concepts & Theory
- **New Concepts**: 
  - Buildspec.yml: chỉ định các bước trong quá trình build  
  - ECS task definition revision update tự động từ CodePipeline
  - AppSpec.yml và lifecycle hooks trong CodeDeploy  
  - Pipeline không bắt buộc phải dùng GitHub – có thể dùng S3 làm source 
- **Best Practices**: 
  - Sử dụng IAM Role rõ ràng cho từng service
  - Tách riêng các giai đoạn để dễ debug
- **Industry Knowledge**: 
  - Container hóa ứng 
  - Tự động hóa quá trình xây dựng ứng dụng

### 🤝 Soft Skills
- **Communication**: Writing
- **Problem Solving**: debugging, troubeshooting
- **Time Management**: sắp xếp thời gian cho cho quy trình build và deploy
- **Learning**: Research skills, self-learning

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề 1: Build không push được image lên ECR
- **Mô tả**: CodeBuild không có quyền push image  
- **Solution**: Cập nhật IAM role của CodeBuild để thêm quyền `ecr:PutImage`, `ecr:BatchCheckLayerAvailability`, `ecr:CompleteLayerUpload`,...  
- **Result**: Push thành công sau khi gán đủ quyền  
- **Lesson**: IAM cho CodeBuild cần kỹ lưỡng, nên test riêng từng bước

### Vấn đề: CodeDeploy báo lỗi "ApplicationStop failed"
- **Mô tả**: Script `ApplicationStop` không tồn tại dẫn đến lỗi fail deploy  
- **Solution**: Sửa lại `appspec.yml` loại bỏ hook không dùng hoặc thêm file script rỗng  
- **Result**: Deploy thành công sau khi cập nhật  
- **Lesson**: AppSpec.yml cần chính xác, chỉ định đúng các script thật sự sử dụng

---

## 💭 Reflection & Insights

### ✅ What went well
- Hiểu rõ cách kết nối giữa các thành phần CodePipeline
- Xây dựng thành công pipeline với các tài nguyên lưu trữ khác nhau

### 🔄 What could be improved
- Nên tách riêng các môi trường (dev/staging/prod) trong tương lai 

### ✨ Key Insights
 - CI/CD với ECS có thể triển khai gọn trong CodePipeline với cấu hình phù hợp
- Xu hướng tự động hóa xây dựng ứng dụng với pipeline
- S3/GitHub đều có thể làm source, nhưng GitHub tiện hơn khi CI/CD

---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 8 | Đa dạng hóa build custom pipeline |
| **Learning** | 9 | Tìm hiểu sâu về các dịch vụ CI/CD của AWS |
| **Collaboration** | 8 | Tham khảo thêm từ mentor và team về các dịch vụ và mô hình kết hợp với CodePipeline |
| **Satisfaction** | 9 | Học hỏi thêm được nhiều kiến thức và use case của CodePipeline |

---

*Weekly summary created by: Vũ Quang Huy*  