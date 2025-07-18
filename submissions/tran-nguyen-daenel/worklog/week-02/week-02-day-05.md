# Worklog - Ngày 23/05/2025
## 📅 Thông tin cơ bản

- **Ngày:** 23/05/2025  
- **Thứ:** Thứ Sáu  
- **Tuần thực tập:** Tuần thứ 2/12  
- **Thời gian làm việc:** 8:30 - 17:00  
- **Mood:** ✅ Accomplished!

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Thêm giai đoạn "Deploy" vào CodePipeline để tự động cập nhật ECS Service.
- [x] Kích hoạt và phân tích VPC Flow Logs bằng Amazon Athena.
- [x] Cấu hình CloudWatch Alarms cho ECS Service.
- [x] Hoàn thành báo cáo tổng kết tuần 2.

---

## 💼 Công việc đã thực hiện

1. **Integrating ECS Deploy into CodePipeline** ⏱️ *8:30-11:30*  
  - **Mô tả:**  
    - Chỉnh sửa CodePipeline.  
    - Thêm một action "Deploy" mới sử dụng provider "Amazon ECS".  
    - Cấu hình action này để cập nhật service đã được tạo bởi CloudFormation, sử dụng image mới từ giai đoạn Build.  
  - **Kết quả:**  
    - Pipeline CI/CD hoàn chỉnh từ Source → Build → Deploy.  
    - Mỗi khi push code, ứng dụng trên ECS sẽ được cập nhật tự động.  
  - **Tools/Tech:**  
    - AWS CodePipeline  
    - AWS ECS

2. **Network Monitoring** ⏱️ *13:00-15:00*  
  - **Mô tả:**  
    - Kích hoạt VPC Flow Logs và đẩy log về S3.  
    - Sử dụng Amazon Athena để thực hiện các truy vấn SQL cơ bản trên log, ví dụ: tìm các traffic bị REJECT.  
  - **Kết quả:**  
    - Có khả năng giám sát và phân tích traffic mạng ở cấp độ VPC.  
  - **Tools/Tech:**  
    - VPC Flow Logs  
    - Amazon Athena  
    - S3

3. **Documentation and Review** ⏱️ *15:00-17:00*  
  - **Mô tả:**  
    - Viết báo cáo tổng kết tuần 2.  
    - Ghi lại tất cả kiến thức đã học, các thách thức và thành tựu.  
    - Review lại toàn bộ công việc trong tuần.  
  - **Kết quả:**  
    - Báo cáo tổng kết tuần 2 hoàn chỉnh.  
  - **Tools/Tech:**  
    - Markdown  
    - VS Code

---

## 📚 Kiến thức học được

- **Technical Skills:**  
  - Tích hợp CodePipeline & ECS  
  - VPC Flow Logs  
  - Amazon Athena
- **Concepts & Theory:**  
  - End-to-end CI/CD Pipeline  
  - Network Forensics  
  - Observability
- **Soft Skills:**  
  - Viết báo cáo kỹ thuật  
  - Tổng hợp và phản ánh (Reflection)

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
  - Action Deploy trong CodePipeline không tìm thấy file `imagedefinitions.json`.
- **Giải pháp:**  
  - Kiểm tra lại `buildspec.yml`.  
  - Nhận ra đã quên thêm câu lệnh để tạo file này trong giai đoạn post_build và định nghĩa nó là một artifact.  
  - Bổ sung và pipeline chạy thành công.

---

## 💭 Reflection & Insights

**Key Insight:**  
- Một pipeline CI/CD hoàn chỉnh là tài sản cực kỳ giá trị, nó giúp tăng tốc độ phát triển và giảm thiểu rủi ro do con người gây ra một cách đáng kể.  
- Tuần này đã xây dựng được một tài sản như vậy.

---

## 📋 Kế hoạch cho tuần tới

- **High:**  
  - Tìm hiểu về Caching với Amazon ElastiCache.
- **Medium:**  
  - Tìm hiểu về CDN với Amazon CloudFront.
- **Low:**  
  - Bắt đầu một project nâng cao kết hợp các dịch vụ đã học.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 26/05/2025*