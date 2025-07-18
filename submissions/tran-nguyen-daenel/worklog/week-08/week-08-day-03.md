Worklog - Ngày 03/09/2025
📅 Thông tin cơ bản
Ngày: 03/09/2025

Thứ: Thứ Tư

Tuần thực tập: Tuần thứ 8/10

Thời gian làm việc: 8:00 - 17:30

Mood: 📦 Packaging applications with Helm.

🎯 Mục tiêu ngày hôm nay
[x] Hiểu tại sao cần đến Helm và vai trò của nó như một trình quản lý package.

[x] Nắm vững cấu trúc của một Helm chart (Chart.yaml, values.yaml, templates/).

[x] Sử dụng helm create để tạo một chart mẫu.

[x] Chuyển đổi các file manifest của ứng dụng NodeJS thành một Helm chart có thể tái sử dụng.

💼 Công việc đã thực hiện
1. Helm Fundamentals ⏱️ 3 giờ
Mô tả: Đọc tài liệu của Helm. Tìm hiểu các khái niệm: Chart, Release, Repository. Hiểu cách Helm sử dụng values.yaml và các template để tạo ra các file manifest cuối cùng.

Kết quả: Nắm vững lý thuyết và cú pháp cơ bản của Go templating trong Helm.

2. Charting the NodeJS Application ⏱️ 5 giờ
Mô tả:

Chạy helm create nodejs-chart.

Xóa các file template mặc định và di chuyển các file nodejs-deployment.yaml và nodejs-service.yaml vào thư mục templates/.

"Parameterize" các file này: thay thế các giá trị tĩnh (như số replicas, tên image, tag) bằng các biến từ values.yaml (ví dụ: {{ .Values.replicaCount }}, {{ .Values.image.repository }}:{{ .Values.image.tag }}).

Sử dụng lệnh helm template . để kiểm tra các file manifest được sinh ra có đúng không.

Kết quả:

Một Helm chart hoàn chỉnh cho ứng dụng NodeJS, có thể dễ dàng cài đặt và tùy chỉnh cho các môi trường khác nhau.

Tools/Tech: Helm, Go template language.

Links: [Link to the Helm chart on GitHub]

📚 Kiến thức học được
🔧 Technical Skills
DevOps Tools: Helm.

Programming: Go templating.

💡 Concepts & Theory
New Concepts: Kubernetes Package Management, Chart Templating, Releases.

🚧 Khó khăn và giải pháp
Vấn đề 1: Cú pháp Go template ban đầu rất khó hiểu và dễ lỗi.

Mô tả: Các lỗi như thiếu dấu cách trong {{- ... -}} hoặc gọi sai tên biến gây ra lỗi khi chạy helm template.

Solution: Bắt đầu bằng việc thay thế từng biến một. Sử dụng helm lint và helm template --debug thường xuyên để kiểm tra lỗi cú pháp và xem kết quả được sinh ra.

Lesson: Templating đòi hỏi sự tỉ mỉ, nhưng sức mạnh mà nó mang lại (khả năng tái sử dụng và tùy biến) là rất lớn.

💭 Reflection & Insights
Key Insights: Nếu các file manifest YAML là các "linh kiện" riêng lẻ, thì Helm chart giống như một "bộ kit lắp ráp" hoàn chỉnh, đi kèm hướng dẫn sử dụng (values.yaml). Nó giúp việc quản lý các ứng dụng phức tạp trở nên đơn giản và có tổ chức hơn rất nhiều.

📋 Kế hoạch ngày mai
High: Tích hợp Helm chart vào ArgoCD.

Medium: Cập nhật CI pipeline để làm việc với GitOps và Helm.