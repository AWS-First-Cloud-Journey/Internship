Worklog - Ngày 04/09/2025
📅 Thông tin cơ bản
Ngày: 04/09/2025

Thứ: Thứ Năm

Tuần thực tập: Tuần thứ 8/10

Thời gian làm việc: 8:30 - 17:30

Mood: 🤝 Integrating CI with GitOps.

🎯 Mục tiêu ngày hôm nay
[x] Cấu hình ArgoCD để triển khai ứng dụng từ một Helm chart.

[x] Thiết kế lại luồng CI/CD để tích hợp với GitOps.

[x] Cập nhật pipeline CI (CodeBuild) để chỉ build image và cập nhật Helm chart.

[x] Kiểm thử toàn bộ luồng end-to-end.

💼 Công việc đã thực hiện
1. Deploying Helm Chart with ArgoCD ⏱️ 3.5 giờ
Mô tả:

Push Helm chart đã tạo hôm qua lên repository ecommerce-k8s-config.

Cập nhật Application trong ArgoCD. Thay vì trỏ đến một thư mục chứa các file YAML, giờ đây trỏ đến thư mục chứa Helm chart.

ArgoCD tự động nhận diện đây là một Helm chart và hiển thị các tham số từ values.yaml trên giao diện.

Kết quả: ArgoCD render Helm chart và triển khai ứng dụng thành công.

2. Redesigning the CI/CD Flow ⏱️ 4.5 giờ
Mô tả:

Luồng mới:

Developer push code ứng dụng lên repo e-commerce-app.

CI Pipeline (CodeBuild) được kích hoạt: build Docker image, đẩy lên ECR với một tag mới (ví dụ: commit hash).

Bước quan trọng: Pipeline sẽ clone repo ecommerce-k8s-config, cập nhật giá trị image.tag trong file values.yaml của Helm chart, sau đó commit và push thay đổi này.

ArgoCD phát hiện thay đổi trong repo config và tự động đồng bộ, kéo image mới về triển khai.

Kết quả: Một luồng CI/CD tách biệt rõ ràng: CI lo việc build artifact, CD (GitOps) lo việc triển khai.

Tools/Tech: AWS CodePipeline, AWS CodeBuild, Git, ArgoCD.

📚 Kiến thức học được
🔧 Technical Skills
DevOps: GitOps workflow, CI/CD integration patterns.

💡 Concepts & Theory
New Concepts: Separation of Concerns (CI vs. CD), Image Updater pattern.

🚧 Khó khăn và giải pháp
Vấn đề 1: CodeBuild không có quyền push lên repository Git config.

Solution: Tạo một cặp khóa SSH mới. Gán private key vào AWS Secrets Manager. Cấu hình buildspec.yml để lấy key từ Secrets Manager, sau đó sử dụng nó để xác thực với Git khi push.

Lesson: Quản lý credentials cho các hệ thống tự động là một bài toán bảo mật quan trọng.

💭 Reflection & Insights
Key Insights: Việc tách biệt CI và CD (GitOps) mang lại sự an toàn và khả năng kiểm soát vượt trội. Team Dev có thể tập trung vào việc build và test image, trong khi trạng thái của production được quản lý một cách minh bạch và có thể kiểm toán trong Git.

📋 Kế hoạch ngày mai
High: Hoàn thiện Helm chart cho cả ứng dụng ReactJS.

Medium: Viết báo cáo tổng kết tuần.