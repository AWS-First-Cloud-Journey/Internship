Worklog - Ngày 02/09/2025
📅 Thông tin cơ bản
Ngày: 02/09/2025

Thứ: Thứ Ba

Tuần thực tập: Tuần thứ 8/10

Thời gian làm việc: 8:30 - 17:30

Mood: 🔄 Syncing Git with Kubernetes.

🎯 Mục tiêu ngày hôm nay
[x] Tạo một Git repository mới dành riêng cho việc lưu trữ các file manifest Kubernetes.

[x] Kết nối ArgoCD với Git repository này một cách an toàn.

[x] Tạo một đối tượng Application trong ArgoCD để triển khai ứng dụng NodeJS.

[x] Quan sát ArgoCD tự động đồng bộ và triển khai ứng dụng.

💼 Công việc đã thực hiện
1. Creating the Config Repository ⏱️ 2.5 giờ
Mô tả:

Tạo một repository mới trên GitHub/CodeCommit tên là ecommerce-k8s-config.

Push các file manifest đã viết ở Tuần 7 (ví dụ: nodejs-deployment.yaml, nodejs-service.yaml) vào repository này.

Kết quả:

Có một "nguồn chân lý duy nhất" cho trạng thái mong muốn của ứng dụng.

Tools/Tech: Git, GitHub/CodeCommit.

2. Creating the First ArgoCD Application ⏱️ 5.5 giờ
Mô tả:

Đăng ký repository Git với ArgoCD. Nếu là repo private, cấu hình deploy key (SSH) để ArgoCD có quyền đọc.

Sử dụng giao diện của ArgoCD (hoặc viết manifest YAML cho kind: Application) để tạo một ứng dụng mới.

Cấu hình các thông số: tên ứng dụng, project, source repository, path đến các file manifest, và destination cluster.

Bật chế độ "auto-sync" và "auto-prune".

Kết quả:

ArgoCD phát hiện các manifest trong Git, so sánh với trạng thái hiện tại của cluster (chưa có gì) và tự động thực hiện kubectl apply.

Các Pods NodeJS xuất hiện trên cluster. Giao diện ArgoCD hiển thị trạng thái Healthy và Synced.

Tools/Tech: ArgoCD.

Links: [ArgoCD Application manifest YAML]

📚 Kiến thức học được
🔧 Technical Skills
ArgoCD: Application management, Repository connection, Sync strategies.

Git: Deploy keys, Best practices for config repos.

💡 Concepts & Theory
New Concepts: Application Controller pattern, Desired vs. Live state visualization.

🚧 Khó khăn và giải pháp
Vấn đề 1: ArgoCD báo lỗi không thể kết nối tới Git repository.

Mô tả: Lỗi "authentication failed" khi ArgoCD cố gắng clone repo private.

Solution: Tạo một cặp khóa SSH mới. Public key được thêm vào "Deploy keys" trên GitHub, còn private key được tạo thành một Kubernetes Secret và đăng ký với ArgoCD.

Lesson: Việc quản lý truy cập an toàn giữa các công cụ là một phần quan trọng của DevOps.

💭 Reflection & Insights
Key Insights: Nhìn ArgoCD tự động triển khai ứng dụng sau khi nó phát hiện thay đổi trong Git là một trải nghiệm rất "ma thuật". Nó cho thấy sức mạnh của việc tự động hóa dựa trên trạng thái khai báo.

📋 Kế hoạch ngày mai
High: Tìm hiểu về Helm - trình quản lý package cho Kubernetes.

Medium: "Chart hóa" ứng dụng NodeJS backend.