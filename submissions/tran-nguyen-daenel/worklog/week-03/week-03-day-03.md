# Worklog - Ngày 28/05/2025

## 📅 Thông tin cơ bản

- **Ngày:** 28/05/2025  
- **Thứ:** Thứ Tư  
- **Tuần thực tập:** Tuần thứ 3/12  
- **Thời gian làm việc:** 8:00 - 18:00  
- **Mood:** 🤯 Paradigm shift! From YAML to real code.

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu triết lý và lợi ích của AWS CDK so với CloudFormation.
- [x] Cài đặt môi trường phát triển CDK (Node.js, TypeScript, AWS CDK Toolkit).
- [x] Khởi tạo một project CDK mới và tìm hiểu cấu trúc thư mục.
- [x] Viết lại hạ tầng mạng VPC bằng CDK.

## 💼 Công việc đã thực hiện

### 1. CDK Fundamentals and Setup ⏱️ 8:00-11:00

- **Mô tả:**
  - Đọc CDK Workshop
  - Tìm hiểu về Constructs (L1, L2, L3) và App/Stack
  - Cài đặt các công cụ cần thiết trên Cloud9 IDE
  - Chạy `cdk bootstrap` để chuẩn bị môi trường AWS
- **Kết quả:**
  - Hiểu rõ cách CDK giúp định nghĩa hạ tầng bằng các ngôn ngữ lập trình quen thuộc
  - Môi trường phát triển sẵn sàng

### 2. Creating the First CDK Project ⏱️ 11:00-12:00, 13:00-17:30

- **Mô tả:**
  - Chạy `cdk init app --language typescript`
  - Phân tích các file được tạo ra:
    - `bin/`
    - `lib/`
    - `package.json`
    - `cdk.json`
  - Trong file `lib/my-project-stack.ts`:
    - Import module `aws-ec2`
    - Sử dụng L2 construct `new ec2.Vpc(...)` để định nghĩa một VPC
  - Chạy các lệnh:
    - `cdk synth` để xem template CloudFormation được tạo ra
    - `cdk diff` để so sánh
    - `cdk deploy` để triển khai
- **Kết quả:**
  - Một VPC hoàn chỉnh với:
    - public/private subnets
    - Internet Gateway
    - NAT Gateway
  - Được tạo ra chỉ với vài dòng code TypeScript
  - Hoàn toàn choáng ngợp trước sức mạnh và sự tinh gọn của CDK
- **Tools/Tech:**
  - AWS CDK
  - TypeScript
  - Node.js
  - AWS CloudFormation

## 📚 Kiến thức học được

- **Technical Skills:**
  - AWS CDK Toolkit
  - TypeScript syntax
  - CDK Constructs
  - `cdk` CLI commands
- **Concepts & Theory:**
  - Programmatic IaC
  - Abstraction in IaC
  - CDK Stacks
- **Soft Skills:**
  - Thích nghi với mô hình mới
  - Tư duy lập trình hướng đối tượng cho hạ tầng

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**
  - Lần đầu chạy `cdk deploy`, gặp lỗi về version của CDK Toolkit và construct libraries
- **Giải pháp:**
  - Lỗi cho thấy sự không tương thích phiên bản
  - Chạy `npm update` để cập nhật tất cả các gói `@aws-cdk/*` trong `package.json` lên cùng một phiên bản mới nhất
  - Sau đó `cdk deploy` thành công

## 💭 Reflection & Insights

- **Key Insight:**
  - CDK là tương lai của IaC trên AWS
  - Nó cho phép áp dụng toàn bộ sức mạnh của kỹ thuật phần mềm (hàm, lớp, module, testing) vào việc quản lý hạ tầng, điều mà YAML/JSON không thể làm được

## 📋 Kế hoạch ngày mai

- **High:**
  - Viết lại toàn bộ stack ứng dụng (ECS, ALB, RDS) bằng CDK
- **Medium:**
  - Tìm hiểu cách tạo nhiều Stack và truyền tham chiếu giữa chúng
- **Low:**
  - Triển khai một hàm Lambda@Edge bằng CDK

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 29/05/2025*
