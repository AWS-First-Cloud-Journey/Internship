Worklog - Ngày 09/09/2025
📅 Thông tin cơ bản
Ngày: 09/09/2025

Thứ: Thứ Ba

Tuần thực tập: Tuần thứ 9/10

Thời gian làm việc: 8:30 - 17:30

Mood: 📈 Tuning and Scaling.

🎯 Mục tiêu ngày hôm nay
[x] Phân tích kết quả load test hôm qua và tìm ra điểm nghẽn.

[x] Cài đặt Kubernetes Metrics Server vào EKS cluster.

[x] Cấu hình Horizontal Pod Autoscaler (HPA) cho deployment của NodeJS.

[x] Chạy lại load test và quan sát hệ thống tự động co giãn.

💼 Công việc đã thực hiện
1. Load Test Analysis ⏱️ 2.5 giờ
Mô tả:

So sánh kết quả của k6 với các dashboard trên CloudWatch và Grafana.

Nhận thấy khi số VUs tăng cao, CPU Utilization của các Pods NodeJS tăng vọt lên gần 100%, gây ra độ trễ lớn.

Kết quả:

Xác định được điểm nghẽn chính là do số lượng Pods backend không đủ để xử lý tải.

2. Implementing Horizontal Pod Autoscaler (HPA) ⏱️ 5.5 giờ
Mô tả:

Cài đặt Metrics Server, thành phần cần thiết để HPA có thể lấy dữ liệu metrics từ Pods.

Viết một file manifest hpa.yaml.

Cấu hình HPA để theo dõi CPUUtilization của các Pods trong NodeJS deployment, với mục tiêu là 80%.

Thiết lập minReplicas: 2 và maxReplicas: 10.

Chạy lại bài load test với số lượng VUs lớn hơn.

Kết quả:

Khi CPU trung bình vượt 80%, HPA tự động tăng số lượng replicas của Deployment.

Quan sát thấy các Pods mới được tạo ra bằng kubectl get pods -w.

Hệ thống có thể xử lý được lượng tải cao hơn nhiều mà vẫn giữ được độ trễ ổn định.

Tools/Tech: Kubernetes Horizontal Pod Autoscaler (HPA), Kubernetes Metrics Server.

Links: [hpa.yaml on GitHub]

📚 Kiến thức học được
🔧 Technical Skills
Kubernetes: Horizontal Pod Autoscaler, Metrics Server.

DevOps: Performance Tuning, Autoscaling.

💡 Concepts & Theory
New Concepts: Autoscaling, Resource metrics.

🚧 Khó khăn và giải pháp
Vấn đề 1: HPA không hoạt động sau khi deploy.

Mô tả: kubectl describe hpa cho thấy lỗi không thể lấy được metrics.

Solution: Gỡ lỗi và nhận ra đã quên định nghĩa resources.requests (CPU, memory) trong file deployment.yaml. HPA cần biết "request" của một pod là bao nhiêu để tính toán được tỷ lệ phần trăm utilization.

Lesson: Autoscaling chỉ hoạt động hiệu quả khi bạn đã định nghĩa rõ ràng về nhu cầu tài nguyên của ứng dụng.

💭 Reflection & Insights
Key Insights: Autoscaling là một trong những sức mạnh lớn nhất của cloud và Kubernetes. Nó giúp hệ thống vừa tiết kiệm chi phí khi tải thấp, vừa đảm bảo hiệu năng khi tải cao một cách hoàn toàn tự động.

📋 Kế hoạch ngày mai
High: Tìm hiểu về Security Testing (DAST).

Medium: Chạy một công cụ quét bảo mật tự động.