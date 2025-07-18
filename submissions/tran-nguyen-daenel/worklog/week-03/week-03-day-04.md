# Worklog - Ngày 29/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 29/05/2025  
- **Thứ:** Thứ Năm  
- **Tuần thực tập:** Tuần thứ 3/12  
- **Thời gian làm việc:** 8:30 - 18:00  
- **Mood:** 💻 Deep in the code zone.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Tái cấu trúc project CDK thành nhiều Stacks (VpcStack, DatabaseStack, EcsStack)
- [x] Viết code CDK để định nghĩa ECS Fargate Service, Application Load Balancer, và RDS Instance
- [x] Triển khai một hàm Lambda@Edge bằng CDK và gắn vào CloudFront
- [x] Deploy thành công toàn bộ kiến trúc bằng một lệnh `cdk deploy --all`

---

## 💼 Công việc đã thực hiện
### 1. Refactoring to Multiple Stacks ⏱️ 8:30-11:00

- **Mô tả:**
  - Tạo các file stack riêng biệt  
  - Truyền VPC object từ VpcStack sang EcsStack thông qua props
- **Kết quả:**
  - Code được tổ chức tốt hơn, dễ quản lý và tái sử dụng  
  - Hiểu cách chia sẻ tài nguyên giữa các stack

---

### 2. Building the Application Stack ⏱️ 11:00-12:30, 13:30-16:00

- **Mô tả:**
  - Sử dụng các L2/L3 constructs như  
    - `ecs.Cluster`  
    - `ecs_patterns.ApplicationLoadBalancedFargateService`  
    để tạo cụm ECS một cách nhanh chóng  
  - Định nghĩa RDS DatabaseInstance và cấu hình Security Group để cho phép ECS service truy cập
- **Kết quả:**
  - Code CDK hoàn chỉnh cho toàn bộ ứng dụng
- **Tools/Tech:**
  - AWS CDK  
    - `aws-ecs`  
    - `aws-rds`  
    - `aws-ec2`

---

### 3. Deploying Lambda@Edge with CDK ⏱️ 16:00-17:30

- **Mô tả:**
  - Sử dụng construct  
    - `experimental.EdgeFunction`  
    để tạo một Lambda@Edge  
  - Lưu ý rằng stack chứa EdgeFunction phải được deploy ở  
    - `us-east-1`
  - Gắn function này vào  
    - `defaultBehavior`  
    của CloudFront Distribution đã tạo
- **Kết quả:**
  - Deploy thành công một function tại biên, được quản lý 100% bằng code
- **Tools/Tech:**
  - AWS CDK  
    - `@aws-cdk/aws-cloudfront-experimental`

---

## 📚 Kiến thức học được

- **Technical Skills:**
  - Advanced CDK patterns (multiple stacks, props)
  - Deploying stateful resources (RDS)
  - Deploying Lambda@Edge with CDK
- **Concepts & Theory:**
  - Cross-stack references
  - High-level vs Low-level constructs
- **Soft Skills:**
  - Tái cấu trúc code (refactoring)
  - Quản lý các thành phần phụ thuộc phức tạp

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**
  - Debugging Lambda@Edge được deploy bằng CDK rất khó.
  - Các thay đổi mất nhiều thời gian để lan truyền.
- **Giải pháp:**
  - Tập trung vào việc test logic của hàm Lambda một cách độc lập trên local trước.
  - Sử dụng `console.log` và kiểm tra CloudWatch logs ở region gần nhất (hoặc `us-east-1`) để debug.

---

## 💭 Reflection & Insights

- **Key Insight:**
  - Construct  
    - `ecs_patterns.ApplicationLoadBalancedFargateService`  
    là một ví dụ tuyệt vời về sức mạnh của CDK.
  - Nó tạo ra hàng chục tài nguyên  
    - VPC  
    - Cluster  
    - Task Def  
    - Service  
    - ALB  
    - Listeners  
    - Target Groups  
    chỉ với vài dòng code, một công việc có thể mất hàng trăm dòng YAML.

---

## 📋 Kế hoạch ngày mai

- **High:**
  - Tìm hiểu và thực hành về các chủ đề mạng nâng cao:  
    - **VPC Peering**
- **Medium:**
  - Tự động hóa việc sao lưu EBS với  
    - **Data Lifecycle Manager**
- **Low:**
  - Tổng kết tuần và viết báo cáo

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 30/05/2025*
