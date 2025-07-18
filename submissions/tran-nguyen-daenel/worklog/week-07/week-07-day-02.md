Worklog - Ngày 24/06/2025
📅 Thông tin cơ bản
Ngày: 24/06/2025

Thứ: Thứ Ba

Tuần thực tập: Tuần thứ 7/10

Thời gian làm việc: 8:00 - 17:30

Mood: 📝 Focusing on the art of YAML.

🎯 Mục tiêu ngày hôm nay
[x] Hiểu cấu trúc của một file manifest Kubernetes (YAML).

[x] Viết một Deployment manifest để chạy ứng dụng NodeJS backend.

[x] Sử dụng kubectl apply để triển khai ứng dụng.

[x] Sử dụng các lệnh kubectl cơ bản để kiểm tra và gỡ lỗi Pods.

💼 Công việc đã thực hiện
1. Understanding Kubernetes Manifests ⏱️ 2.5 giờ
Mô tả: Tìm hiểu các trường bắt buộc trong một file manifest: apiVersion, kind, metadata, spec. Đọc tài liệu về đối tượng Deployment và cách nó quản lý ReplicaSet và Pod.

Kết quả: Nắm vững cú pháp YAML và cấu trúc của các đối tượng Kubernetes phổ biến.

2. Creating a Deployment for NodeJS Backend ⏱️ 5.5 giờ
Mô tả:

Tạo một file nodejs-deployment.yaml.

Định nghĩa một Deployment với replicas: 2.

Trong spec.template, định nghĩa một Pod chứa container NodeJS, trỏ đến image đã tạo ở tuần 1 trên ECR.

Sử dụng lệnh kubectl apply -f nodejs-deployment.yaml.

Sử dụng kubectl get deployments, kubectl get pods -o wide, và kubectl describe pod <pod-name> để kiểm tra trạng thái.

Sử dụng kubectl logs -f <pod-name> để xem log của ứng dụng.

Kết quả:

Deployment được tạo thành công.

2 Pods của NodeJS backend đang chạy trên cluster EKS.

Tools/Tech: Kubernetes Deployments, Kubernetes Pods, YAML, kubectl.

Links: [nodejs-deployment.yaml on GitHub]

📚 Kiến thức học được
🔧 Technical Skills
Kubernetes: Manifest authoring (YAML), kubectl apply, get, describe, logs.

DevOps: Declarative configuration.

💡 Concepts & Theory
New Concepts: Desired State vs. Current State, ReplicaSets, Rolling Updates.

🚧 Khó khăn và giải pháp
Vấn đề 1: Pods đi vào trạng thái ImagePullBackOff.

Mô tả: kubectl describe pod cho thấy lỗi không thể kéo image từ ECR do không có quyền.

Solution: Worker nodes của EKS cần có quyền truy cập ECR. Gắn IAM policy AmazonEC2ContainerRegistryReadOnly vào IAM Role của các worker node. Sau đó xóa các pod lỗi để Deployment controller tự động tạo lại các pod mới, lần này kéo image thành công.

Lesson: Trong EKS, các worker node (EC2 instances) là đối tượng thực hiện việc kéo image, do đó chúng cần có IAM permission phù hợp.

💭 Reflection & Insights
Key Insights: Mô hình khai báo của Kubernetes rất mạnh mẽ. Bạn chỉ cần "khai báo" trạng thái mong muốn (tôi muốn 2 Pods NodeJS chạy), và Kubernetes sẽ tự động làm mọi cách để đạt được và duy trì trạng thái đó.

📋 Kế hoạch ngày mai
High: Tìm hiểu cách expose ứng dụng ra bên ngoài với Kubernetes Services và Ingress.

Medium: Cài đặt AWS Load Balancer Controller cho EKS.