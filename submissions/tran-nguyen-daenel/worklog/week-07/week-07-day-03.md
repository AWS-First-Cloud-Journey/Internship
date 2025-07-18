Worklog - Ngày 25/06/2025
📅 Thông tin cơ bản
Ngày: 25/06/2025

Thứ: Thứ Tư

Tuần thực tập: Tuần thứ 7/12

Thời gian làm việc: 8:30 - 18:00

Mood: 🌉 Building bridges to the outside world.

🎯 Mục tiêu ngày hôm nay
[x] Hiểu vai trò của Kubernetes Service trong việc tạo một endpoint ổn định cho Pods.

[x] Triển khai AWS Load Balancer Controller vào EKS cluster.

[x] Sử dụng một Ingress resource để tự động tạo một Application Load Balancer.

[x] Truy cập ứng dụng thành công từ internet.

💼 Công việc đã thực hiện
1. Internal Communication with Services ⏱️ 2.5 giờ
Mô tả:

Viết một file my-app-service.yaml với kind: Service và type: ClusterIP.

Sử dụng selector để trỏ Service đến các Pods có label app: my-app đã tạo hôm qua.

Kết quả:

Service được tạo ra với một địa chỉ IP nội bộ ổn định và một tên DNS (my-app-service.default.svc.cluster.local).

Các Pods khác trong cluster giờ đây có thể giao tiếp với các Pods Nginx qua tên DNS này.

Tools/Tech: Kubernetes Services.

2. AWS Load Balancer Controller Setup ⏱️ 5.5 giờ
Mô tả:

Đây là bước phức tạp nhất. Thực hiện theo hướng dẫn của AWS:

Tạo một IAM OIDC provider cho cluster.

Tạo một IAM Role với các quyền cần thiết và thiết lập Trust Relationship cho Service Account của controller (gọi là IRSA - IAM Roles for Service Accounts).

Cài đặt controller vào cluster bằng Helm hoặc manifest YAML.

Kết quả:

AWS Load Balancer Controller pod đang chạy thành công trong kube-system namespace.

Tools/Tech: AWS Load Balancer Controller, IAM OIDC Provider, IRSA, Helm.

Links:

[AWS Load Balancer Controller installation guide]

3. Exposing Traffic with Ingress ⏱️ 2 giờ (sau khi controller chạy)
Mô tả:

Viết file my-app-ingress.yaml với kind: Ingress.

Định nghĩa các rule để trỏ traffic từ /* đến my-app-service trên port 80.

Thêm các annotation cần thiết cho AWS Load Balancer Controller (kubernetes.io/ingress.class: alb).

kubectl apply -f my-app-ingress.yaml.

Kết quả:

Một Application Load Balancer được tự động tạo ra trên AWS.

Truy cập vào DNS name của ALB và thấy trang chào của Nginx.

Tools/Tech: Kubernetes Ingress.

📚 Kiến thức học được
Technical Skills: Kubernetes Services, Kubernetes Ingress, AWS Load Balancer Controller, IRSA.

Concepts & Theory: Service Discovery in K8s, Ingress Controller, North-South traffic.

Soft Skills: Thực hiện các quy trình kỹ thuật phức tạp theo tài liệu.

🚧 Khó khăn và giải pháp
Vấn đề: Sau khi tạo Ingress, ALB được tạo ra nhưng Target Group không có target nào và báo lỗi.

Giải pháp: Gỡ lỗi bằng cách kubectl describe ingress <ingress-name> và kubectl logs <aws-load-balancer-controller-pod>. Phát hiện ra Security Group của Worker Node chưa cho phép traffic từ Security Group của ALB. Cần phải tag các tài nguyên mạng (VPC, Subnets) một cách chính xác để controller có thể tự động cấu hình Security Group.

💭 Reflection & Insights
Key Insight: Trong Kubernetes, có một sự tách biệt rõ ràng: Service lo việc giao tiếp nội bộ, còn Ingress (được hiện thực hóa bởi một controller) lo việc giao tiếp bên ngoài. AWS Load Balancer Controller là "cầu nối" mạnh mẽ giữa thế giới Kubernetes và các dịch vụ native của AWS.

📋 Kế hoạch ngày mai
High: Bắt đầu di chuyển ứng dụng microservices từ ECS sang EKS.

Medium: Tìm hiểu về ConfigMaps và Secrets trong Kubernetes.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 26/06/2025*
