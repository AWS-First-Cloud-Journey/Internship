# Worklog - Ngày 27/06/2025

## 📅 Thông tin cơ bản
- **Ngày**: 27/06/2025
- **Thứ**: Thứ Sáu
- **Tuần thực tập**: Tuần thứ 7/8  
- **Thời gian làm việc**: 8:00 - 17:00  
- **Mood**: 😊 Hào hứng (được tiếp cận kiến thức SageMaker chuyên sâu)

## 🎯 Mục tiêu ngày hôm nay
- [x] Tham gia sự kiện **Amazon SageMaker Deep Dive 2025**
- [x] Nắm kỹ kiến thức kiến trúc – bảo mật – deployment trong SageMaker
- [x] Hiểu rõ các mô hình Deep Learning và ứng dụng thực tiễn

## 💼 Công việc đã thực hiện

### 1. Tham dự event SageMaker Deep Dive ⏱️ 5 tiếng
- **Mô tả**:
  - Tham dự toàn bộ chương trình từ lúc bắt đầu đến kết thúc.
  - Nghe diễn giả AWS chia sẻ về kiến trúc SageMaker, từ training, debugging đến governance.
  - Theo dõi demo trực tiếp (qua video/lab) về cách sử dụng Amazon SageMaker deep dive 2025
- **Kết quả**:
  - Hiểu được cách deploy mô hình ML lớn bằng SageMaker.
  - Nắm được quy trình build/train tự động, tích hợp CI/CD cho ML, debug và giám sát training jobs.
- **Tools/Tech**: SageMaker Debugger, SageMaker Model Monitor, SageMaker Studio, SageMaker Pipelines  
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: SageMaker Studio, Debugger, Model Monitor, Pipelines
- **Programming**: *(không áp dụng hôm nay)*
- **DevOps**: Áp dụng CI/CD trong ML workflow
- **Architecture**: Kiến trúc ML production – từ dữ liệu, training, deployment đến observability

### 💡 Concepts & Theory
- **New Concepts**:
  - Real-time model debugging
  - Continuous training & monitoring pipeline
  - MLOps best practices với SageMaker
- **Best Practices**:
  - Sử dụng Debugger ngay từ đầu để catch lỗi sớm
  - Thiết lập Model Monitor & Alert khi drift xảy ra
  - Dùng Pipelines để tự động hóa end-to-end ML workflows
- **Industry Knowledge**:
  - MLOps là xu hướng tất yếu với ML production scale
  - SageMaker hỗ trợ tích hợp nhiều thành phần: governance, compliance và scale

### 🤝 Soft Skills
- **Communication**: Giao lưu với các chuyên gia AWS, học hỏi từ case-study thực tế
- **Problem Solving**: Nhìn thấy cách debug và thiết kế fallbacks cho ML pipeline
- **Time Management**: Theo dõi sát roadmap sự kiện để không bỏ sót phần quan trọng
- **Learning**: Ghi chép các công cụ/lưu ý để áp dụng vào dự án NLP

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Nội dung kỹ thuật sâu, cần kiến thức nền
- **Mô tả**: Một số nội dung như Debugger tensor flow hoặc CI/CD pipelines trình bày quá nhanh
- **Impact**: Khó ghi chép và hiểu hết trong thời gian trực tiếp
- **Root Cause**: Thiếu background MLOps & Tensor Debugging
- **Solution**: Ghi lại tên công cụ và từ khóa, sau đó tự nghiên cứu lại sau event
- **Result**: Có danh sách tài liệu để học tiếp
- **Lesson**: Khi tham gia event chuyên sâu, cần chuẩn bị trước kiến thức nền hoặc sẵn sàng follow-up sau

## 💭 Reflection & Insights

### What went well today?
- Nắm được blueprint kiến trúc MLOps với SageMaker
- Có các cụm công cụ hữu ích để ứng dụng vào dự án NLP
- Được cập nhật nhanh về công nghệ và kỹ thuật mới

### What could be improved?
- Cần luyện debug tensor & training job từ bây giờ
- Nên follow livestream lặp lại hoặc lab cụ thể ghi lại chi tiết hơn

### Key Insights
- Debug-before-ship: dùng Debugger để phát hiện lỗi sớm
- Giám sát drift: bất kỳ mô hình production nào cũng cần monitoring liên tục
- SageMaker hỗ trợ full-stack ML lifecycle – từ A đến Z

### Questions & Curiosities
- Làm sao tích hợp SageMaker Pipelines vào CI/CD (GitHub Actions, CodePipeline)?
- Có cách nào dùng Model Monitor để tự động tái-training khi drift?
- Debug tensor bằng custom rule hay mặc định là đủ?

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: Xem lại video/lab SageMaker Debugger & Model Monitor
- [ ] **Medium**: Thử lab Debugger trên model nhỏ (ví dụ CNN đơn giản)
- [ ] **Low**: Nghiên cứu thêm về CI/CD cho SageMaker Pipelines

### Learning Goals
- [ ] Debug training jobs với SageMaker Debugger & rules
- [ ] Thiết lập pipeline deploy + monitoring cho model nhỏ
- [ ] Tìm hiểu cách tích hợp SageMaker và GitHub Actions

### Meetings & Deadlines
- [ ] *(chưa xác định)*

## 📊 Self Assessment

### Productivity
- **Score**: 7/10  
- **Reason**: Chủ động thu thập kiến thức chuyên sâu, chuẩn bị kỹ cho project

### Learning
- **Score**: 7/10  
- **New Knowledge**: SageMaker MLOps, Debugger, Pipelines  
- **Application**: Có thể áp dụng vào giai đoạn inference monitoring cho dự án

### Collaboration
- **Score**: 6/10  
- **Interactions**: Giao lưu với speaker & tham gia Q/A  
- **Contributions**: Ghi chép nhiều và đặt câu hỏi thực tế về dự án

### Overall Satisfaction
- **Score**: 7/10  
- **Highlights**: Được cập nhật blueprint MLOps hiện đại nhất  
- **Areas for Growth**: Cần theo lại lab chi tiết để hiểu sâu các bước

## 📎 Attachments & Links

### Code & Projects  
- [ ] *(không có)*

### Learning Resources  
- [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)  
- [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### Screenshots & Demos  
- [ ] *(không có)*

---

**📝 Notes for tomorrow:**  
- Xem lại phần Debugger video, chuẩn bị lab debug tensor

**🎯 Week Progress:**  
Hoàn thành event nhà cung cấp MLOps – chuẩn bị đủ nền tảng để áp dụng cho workshop Rekognition và inference pipeline trong dự án

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 28/06/2025*
