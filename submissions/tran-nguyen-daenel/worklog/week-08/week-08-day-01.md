Worklog - Ngày 01/09/2025
📅 Thông tin cơ bản
Ngày: 01/09/2025

Thứ: Thứ Hai

Tuần thực tập: Tuần thứ 8/10

Thời gian làm việc: 8:00 - 17:30

Mood: 🐙 Bắt đầu khám phá GitOps và ArgoCD.

🎯 Mục tiêu ngày hôm nay
[x] Hiểu rõ triết lý của GitOps (Git là nguồn chân lý duy nhất).

[x] So sánh mô hình "Push" (CI-driven) và "Pull" (GitOps).

[x] Cài đặt công cụ GitOps ArgoCD lên EKS cluster.

[x] Truy cập và làm quen với giao diện người dùng của ArgoCD.

💼 Công việc đã thực hiện
1. GitOps Philosophy Deep Dive ⏱️ 3 giờ
Mô tả:

Đọc tài liệu và các bài viết về nguyên tắc của GitOps.

Hiểu rõ 4 nguyên tắc chính: Declarative, Versioned and Immutable, Pulled Automatically, and Continuously Reconciled.

Vẽ sơ đồ so sánh luồng CI/CD truyền thống và luồng GitOps.

Kết quả:

Nắm vững lý do tại sao GitOps đang trở thành chuẩn mực cho việc triển khai trên Kubernetes.

Tools/Tech: GitOps Principles, ArgoCD/FluxCD documentation.

Links: [GitOps vs CI/CD comparison diagram]

2. Installing ArgoCD on EKS ⏱️ 4.5 giờ
Mô tả:

Tạo một namespace argocd trên EKS.

Sử dụng manifest YAML chính thức từ trang chủ ArgoCD để cài đặt tất cả các component của nó vào cluster.

Sử dụng kubectl port-forward để truy cập vào ArgoCD API server từ máy local.

Lấy mật khẩu admin ban đầu từ Kubernetes Secret và đăng nhập thành công vào giao diện web của ArgoCD.

Kết quả:

ArgoCD đã được cài đặt và đang chạy ổn định trên cluster.

Có thể truy cập và thao tác trên giao diện người dùng.

Tools/Tech: Kubernetes, kubectl, ArgoCD.

Links: [ArgoCD installation manifest]

📚 Kiến thức học được
🔧 Technical Skills
DevOps Tools: ArgoCD.

Kubernetes: Namespaces, Custom Resource Definitions (CRDs).

Architecture: GitOps architecture.

💡 Concepts & Theory
New Concepts: GitOps, Pull-based vs. Push-based deployments, Reconciliation loop.

Best Practices: Sử dụng một công cụ chuyên dụng để quản lý trạng thái của cluster.

🚧 Khó khăn và giải pháp
Vấn đề 1: Khó truy cập giao diện ArgoCD từ bên ngoài.

Mô tả: kubectl port-forward không phải là giải pháp bền vững cho việc truy cập thường xuyên.

Solution: Tạo một Kubernetes Service type: LoadBalancer hoặc một Ingress resource để expose ArgoCD server ra ngoài thông qua một Application Load Balancer, giống như cách đã làm cho ứng dụng ở Tuần 7.

Result: Có một URL ổn định để truy cập ArgoCD UI.

Lesson: Mọi thứ chạy trên Kubernetes, kể cả các công cụ vận hành, đều có thể được quản lý bằng chính các đối tượng của Kubernetes.

💭 Reflection & Insights
What went well today?: Việc cài đặt ArgoCD khá suôn sẻ theo tài liệu.

Key Insights: GitOps là một sự thay đổi lớn về tư duy: thay vì "ra lệnh" cho cluster phải làm gì, chúng ta chỉ cần cập nhật "bản thiết kế" trong Git, và cluster sẽ tự động "xây dựng" theo.

📋 Kế hoạch ngày mai
High: Tạo một repository Git riêng cho các file manifest (Config Repo).

Medium: Tạo một Application đầu tiên trên ArgoCD để đồng bộ hóa với Config Repo.

📊 Self Assessment
Productivity: 8/10

Learning: 9/10

Overall Satisfaction: 9/10