# Worklog - Ngày 20/05/2025
## 📅 Thông tin cơ bản

- **Ngày:** 20/05/2025  
- **Thứ:** Thứ Ba  
- **Tuần thực tập:** Tuần thứ 2/12  
- **Thời gian làm việc:** 8:30 - 17:30  
- **Mood:** 🚀 Excited to automate!

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Nắm vững khái niệm và các thành phần của AWS CodePipeline.
- [x] Xây dựng một pipeline 2 giai đoạn: Source (CodeCommit) và Build (CodeBuild).
- [x] Cấu hình pipeline để tự động trigger khi có commit mới.
- [x] Hiểu về vai trò của Artifact Store trong S3.

---

## 💼 Công việc đã thực hiện

1. **Learning AWS CodePipeline Concepts** ⏱️ *8:30-10:00*  
  - **Mô tả:** Đọc tài liệu, xem video giới thiệu về CodePipeline, tìm hiểu về các khái niệm: Pipeline, Stage, Action, Artifact.  
  - **Kết quả:** Vẽ được sơ đồ luồng đi của một pipeline đơn giản.  
  - **Tools/Tech:** AWS Documentation, Draw.io.

2. **Building the First Pipeline** ⏱️ *10:00-12:00, 13:00-15:00*  
  - **Mô tả:** Sử dụng Wizard để tạo pipeline. Kết nối đến repo CodeCommit đã tạo hôm qua. Chọn Build Project đã tạo. Cấu hình S3 bucket để lưu trữ build artifacts.  
  - **Kết quả:** Tạo thành công pipeline `my-first-pipeline`. Pipeline tự động chạy và hoàn thành sau khi tạo.  
  - **Tools/Tech:** AWS CodePipeline, S3.

3. **Testing Automation Trigger** ⏱️ *15:00-16:30*  
  - **Mô tả:** Thực hiện một thay đổi nhỏ trong code (sửa text trong file "Hello World"), sau đó git push lên CodeCommit.  
  - **Kết quả:** Quan sát pipeline tự động được kích hoạt, giai đoạn Source và Build chuyển sang trạng thái "In progress" và sau đó "Succeeded".  
  - **Tools/Tech:** Git, AWS CodePipeline Console.

---

## 📚 Kiến thức học được

- **Kỹ năng kỹ thuật:**  
  - Thành thạo sử dụng AWS CodePipeline để tự động hóa quy trình CI/CD.  
  - Quản lý artifact với S3, hiểu vai trò của Artifact Store.  
  - Thiết lập và điều chỉnh IAM Roles phù hợp cho CodePipeline.

- **Kiến thức lý thuyết:**  
  - Hiểu rõ khái niệm Continuous Delivery (CD) và Pipeline as Code.  
  - Nắm được cơ chế tự động hóa dựa trên sự kiện (event-driven automation).

- **Kỹ năng mềm:**  
  - Rèn luyện tư duy hệ thống (system thinking) khi thiết kế pipeline.  
  - Kiên nhẫn và tỉ mỉ khi debug các vấn đề liên quan đến IAM policy.

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:** Pipeline bị lỗi ở giai đoạn Build với thông báo "Access Denied".
- **Giải pháp:** Kiểm tra Service Role của CodePipeline, phát hiện ra nó chưa có đủ quyền (`codebuild:StartBuild`). Cập nhật lại IAM policy cho Role và chạy lại pipeline thành công.

---

## 💭 Reflection & Insights

- **Key Insight:** CodePipeline là "nhạc trưởng" điều phối các dịch vụ khác. Sức mạnh thực sự nằm ở việc tích hợp, không phải ở từng dịch vụ riêng lẻ.
- **What went well:** Việc tự động hóa thành công mang lại cảm giác rất thỏa mãn và cho thấy rõ sức mạnh của DevOps.

---

## 📋 Kế hoạch ngày mai

- **High:** Bắt đầu với Containerization: học Docker cơ bản, viết Dockerfile.
- **Medium:** Đẩy Docker image đầu tiên lên Amazon ECR.
---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 21/05/2025*