Worklog - Ngày 26/06/2025
📅 Thông tin cơ bản
Ngày: 26/06/2025

Thứ: Thứ Năm

Tuần thực tập: Tuần thứ 7/10

Thời gian làm việc: 8:30 - 17:30

Mood: ✈️ Migration day! The full stack on K8s.

🎯 Mục tiêu ngày hôm nay
[x] Triển khai ứng dụng ReactJS frontend lên EKS.

[x] Sử dụng ConfigMaps và Secrets để quản lý cấu hình.

[x] Cập nhật Ingress để định tuyến traffic cho cả frontend và backend.

[x] Đảm bảo ứng dụng e-commerce hoạt động hoàn chỉnh trên EKS.

💼 Công việc đã thực hiện
1. Configuration Management with ConfigMaps & Secrets ⏱️ 3 giờ
Mô tả: Tạo Secret để lưu chuỗi kết nối MongoDB. Tạo ConfigMap để lưu các URL của API backend cho frontend.

Kết quả: Tách rời hoàn toàn cấu hình ra khỏi container image, tăng tính linh hoạt và bảo mật.

Tools/Tech: Kubernetes ConfigMaps, Kubernetes Secrets.

2. Deploying Frontend and Updating Backend ⏱️ 5 giờ
Mô tả:

Viết reactjs-deployment.yaml và reactjs-service.yaml.

Cập nhật nodejs-deployment.yaml, mount Secret vào container dưới dạng biến môi trường.

Cập nhật reactjs-deployment.yaml, mount ConfigMap vào container.

kubectl apply tất cả các file.

Kết quả: Toàn bộ các thành phần của trang bán hàng (frontend, backend) đang chạy trên EKS.

3. Finalizing Ingress Routing ⏱️ 1.5 giờ
Mô tả: Chỉnh sửa file ingress.yaml. Thêm rule mặc định (path: /*) để trỏ đến reactjs-service, trong khi rule /api/* vẫn trỏ đến nodejs-service.

Kết quả: ALB định tuyến traffic chính xác: người dùng truy cập vào trang chủ sẽ thấy giao diện React, và các cuộc gọi API từ React sẽ được gửi đúng đến backend NodeJS.

Tools/Tech: Kubernetes Ingress.

📚 Kiến thức học được
🔧 Technical Skills
Kubernetes: ConfigMaps, Secrets, Advanced Ingress routing.

💡 Concepts & Theory
New Concepts: 12-Factor App (Principle III: Config).

🚧 Khó khăn và giải pháp
Vấn đề 1: Kết nối từ NodeJS pod đến MongoDB Atlas bị từ chối.

Solution: Lỗi bảo mật kinh điển. Địa chỉ IP của các EKS Worker Node mới đã thay đổi. Cần cập nhật lại IP Access List trên MongoDB Atlas để cho phép các IP mới này truy cập.

💭 Reflection & Insights
Key Insights: Việc di chuyển một ứng dụng giữa các orchestrator như ECS và EKS cho thấy tầm quan trọng của việc đóng gói ứng dụng bằng container. Bản thân container không thay đổi, chỉ có "cách dàn nhạc" (orchestration) là thay đổi.

📋 Kế hoạch ngày mai
High: Viết một bài so sánh chi tiết: ECS vs. EKS.

Medium: Tổng kết tuần và viết báo cáo.