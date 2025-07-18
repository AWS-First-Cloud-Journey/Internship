# Worklog - Ngày 09/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 09/06/2025  
- **Thứ:** Thứ Hai  
- **Tuần thực tập:** Tuần thứ 5/10  
- **Thời gian làm việc:** 8:00 - 17:00  
- **Mood:** 💰 Bắt đầu tuần mới với tư duy về tài chính (FinOps).



## 🎯 Mục tiêu ngày hôm nay

- [x] Phân tích chi tiết chi phí của hệ thống hiện tại bằng AWS Cost Explorer.
- [x] Xác định các dịch vụ đang chiếm tỷ trọng chi phí cao nhất.
- [x] Thiết lập AWS Budgets để theo dõi và nhận cảnh báo khi chi phí vượt ngưỡng.
- [x] Lên kế hoạch cho các hành động tối ưu hóa chi phí.



## 💼 Công việc đã thực hiện

### 1. Cost Analysis with Cost Explorer ⏱️ 4 giờ

- **Mô tả:**
  - Sử dụng AWS Cost Explorer để xem báo cáo chi phí của tháng trước.
  - Lọc chi phí theo từng dịch vụ (Service), theo region, và theo các tag đã gắn.
  - Tạo một báo cáo tùy chỉnh để theo dõi chi phí của riêng dự án này.
- **Kết quả:**
  - Xác định được ECS/Fargate và NAT Gateway là hai nguồn chi phí lớn nhất.
  - Hiểu rõ cơ cấu chi tiêu và có dữ liệu để đưa ra quyết định.
- **Tools/Tech:** AWS Cost Explorer, Cost Allocation Tags.
- **Links:** [Screenshot: Cost Explorer Report]



### 2. Setting Up Financial Governance ⏱️ 3.5 giờ

- **Mô tả:**
  - Truy cập AWS Budgets.
  - Tạo một budget hàng tháng cho toàn bộ tài khoản với ngưỡng là $50.
  - Cấu hình Budget Action để tự động gửi email cảnh báo đến nhóm khi chi phí thực tế đạt 80% và chi phí dự báo đạt 100% ngân sách.
- **Kết quả:**
  - Một hệ thống quản trị chi phí chủ động đã được thiết lập.
  - Giảm thiểu rủi ro chi tiêu vượt ngoài tầm kiểm soát.
- **Tools/Tech:** AWS Budgets, Amazon SNS.
- **Links:** [Budget configuration details]



## 📚 Kiến thức học được

### 🔧 Technical Skills

- **AWS Services:** AWS Cost Explorer, AWS Budgets, Cost Allocation Tags.
- **Networking:** Hiểu rõ chi phí của NAT Gateway và Data Transfer.
- **DevOps:** FinOps (Financial Operations), Cloud Cost Management.

### 💡 Concepts & Theory

- **New Concepts:** Cost Allocation, Budgeting and Forecasting.
- **Best Practices:** Tagging strategies for cost management.
- **Industry Knowledge:** Tầm quan trọng của FinOps trong DevOps.

### 🤝 Soft Skills

- **Data Analysis:** Phân tích dữ liệu chi phí và tìm ra insight.
- **Planning:** Lập kế hoạch tối ưu hóa dựa trên dữ liệu.



## 🚧 Khó khăn và giải pháp

- **Vấn đề 1:** Dữ liệu Cost Explorer có độ trễ
  - **Mô tả:** Dữ liệu trên Cost Explorer không cập nhật theo thời gian thực, khó để thấy tác động của một thay đổi ngay lập tức.
  - **Impact:** Phải chờ đến ngày hôm sau để xác nhận hiệu quả của việc tối ưu.
  - **Root Cause:** AWS cần thời gian để xử lý hàng tỷ bản ghi thanh toán.
  - **Solution:** Chấp nhận đặc tính này của dịch vụ. Tập trung vào việc phân tích xu hướng (trends) theo ngày/tuần thay vì theo giờ.
  - **Result:** Có một kỳ vọng thực tế hơn về công cụ.
  - **Lesson:** Quản lý chi phí là một quá trình liên tục, không phải là một hành động tức thời.



## 💭 Reflection & Insights

- **What went well today?**
  - Nắm vững cách sử dụng Cost Explorer.
  - Thiết lập thành công hệ thống cảnh báo ngân sách.
  - Xác định rõ mục tiêu cần tối ưu hóa.

- **What could be improved?**
  - Cần xây dựng một chiến lược tagging nhất quán hơn cho tất cả các tài nguyên.

- **Key Insights**
  - Tối ưu hóa chi phí cũng là một kỹ năng kỹ thuật quan trọng. Việc hiểu rõ mình đang tiêu tiền vào đâu là bước đầu tiên và quan trọng nhất để xây dựng một hệ thống bền vững về mặt tài chính.

- **Questions & Curiosities**
  - Có cách nào để giảm chi phí Data Transfer của NAT Gateway không? (Câu trả lời: Gateway Endpoints).
  - AWS tính toán chi phí Fargate dựa trên những yếu tố nào?



## 📋 Kế hoạch ngày mai

- **High:** Áp dụng chiến lược tối ưu chi phí cho Fargate bằng Fargate Spot.
- **Medium:** Đo lường tác động lên độ ổn định của hệ thống.



## 📊 Self Assessment

- **Productivity:** 8/10
- **Learning:** 9/10
- **Collaboration:** N/A
- **Overall Satisfaction:** 8/10


## 📎 Attachments & Links

- [AWS Cost Explorer Documentation](https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html)
- [AWS Budgets Guide](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)



## 📝 Notes for tomorrow

- Nghiên cứu kỹ về Fargate Spot interruption handling.



## 🎯 Week Progress

- Day 1/5 completed - Đã có cái nhìn toàn cảnh về chi phí, sẵn sàng tối ưu.

---

_Worklog created by: Tran Nguyen Daenel_  
_Next review: 10/06/2025_