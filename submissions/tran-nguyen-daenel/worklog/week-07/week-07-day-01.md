# Worklog - Ngày 23/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 23/06/2025  
- **Thứ:** Thứ Hai  
- **Tuần thực tập:** Tuần thứ 7/12  
- **Thời gian làm việc:** 8:30 - 18:00  
- **Mood:** ☸️ Bắt đầu một hành trình mới đầy thử thách với Kubernetes.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu các khái niệm cốt lõi của Kubernetes:
  - Cluster
  - Node
  - Pod
  - Deployment
  - Service
- [x] Cài đặt các công cụ cần thiết:
  - kubectl
  - eksctl
- [x] Sử dụng eksctl để tạo một Amazon EKS (Elastic Kubernetes Service) cluster.
- [x] Kết nối thành công tới cluster bằng kubectl.

---

## 💼 Công việc đã thực hiện

### 1. Kubernetes Core Concepts ⏱️ *3.5 giờ*
   - **Mô tả:**
     - Hoàn thành module "Introduction to Kubernetes" trên Kubernetes.io.
     - Vẽ sơ đồ kiến trúc thể hiện mối quan hệ giữa các thành phần Control Plane và Worker Nodes.
     - Phân biệt rõ sự khác nhau giữa Pod (đơn vị nhỏ nhất) và Deployment (cách quản lý Pods).
   - **Kết quả:**
     - Nắm vững các thuật ngữ và kiến trúc cơ bản của Kubernetes.
   - **Tools/Tech:** Kubernetes Documentation, Draw.io.

### 2. EKS Cluster Creation with eksctl** ⏱️ *4.5 giờ*
   - **Mô tả:**
     - Cài đặt kubectl (để giao tiếp với cluster) và eksctl (công cụ CLI cấp cao để tạo và quản lý cluster EKS).
     - Viết một file config YAML đơn giản cho eksctl, định nghĩa tên cluster, region, và loại instance cho các node.
     - Chạy lệnh `eksctl create cluster -f cluster.yaml`.
     - Sau khi cluster được tạo (mất khoảng 15-20 phút), eksctl tự động cập nhật file `~/.kube/config`.
     - Chạy lệnh `kubectl get nodes` để xác nhận kết nối thành công.
   - **Kết quả:**
     - Một EKS cluster hoàn chỉnh đang chạy trên AWS.
     - Có thể tương tác với cluster từ máy local.
   - **Tools/Tech:** Amazon EKS, eksctl, kubectl.
   - **Links:**
     - [cluster.yaml configuration file]

---

## 📚 Kiến thức học được

- **Technical Skills:** Kubernetes concepts (Pod, Deployment, Service), Amazon EKS, eksctl, kubectl.
- **Concepts & Theory:** Container Orchestration, Control Plane vs. Data Plane, Declarative Configuration.
- **Soft Skills:** Kiên nhẫn (chờ cluster tạo), Quản lý công cụ CLI.

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:** Lệnh `eksctl create cluster` thất bại với lỗi liên quan đến IAM.
- **Giải pháp:**
  - Đọc kỹ log lỗi.
  - Nhận ra user IAM đang sử dụng để chạy eksctl chưa có đủ quyền hạn để tạo các tài nguyên cần thiết (như VPC, IAM Roles, EC2 instances).
  - Gắn các policy cần thiết (ví dụ: AdministratorAccess trong môi trường dev) và chạy lại thành công.

---

## 💭 Reflection & Insights

- **Key Insight:** eksctl là một công cụ cực kỳ mạnh mẽ, nó trừu tượng hóa hàng trăm bước cấu hình phức tạp trên CloudFormation để tạo ra một EKS cluster chỉ bằng một câu lệnh. Hiểu được những gì nó làm "phía sau" là rất quan trọng.

---

## 📋 Kế hoạch ngày mai

- **High:** Triển khai ứng dụng container đầu tiên lên EKS bằng Kubernetes Deployments.
- **Medium:** Viết file manifest YAML đầu tiên.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 25/06/2025*