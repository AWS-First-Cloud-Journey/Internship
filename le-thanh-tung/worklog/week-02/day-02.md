# Worklog - Ngày 21/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 21/05/2025
- **Thứ**: Thứ Tư
- **Tuần thực tập**: Tuần thứ 2/8
- **Thời gian làm việc**: 8:00 - 11:00
- **Mood**: .........

## 🎯 Mục tiêu ngày hôm nay
- [x] Tìm hiểu tổng quan và thực hành với Amazon S3 bucket
- [x] Cấu hình S3 để lưu trữ và host website tĩnh
- [x] Tăng tốc website S3 qua Amazon CloudFront

## 💼 Công việc đã thực hiện

### 1. Làm việc với Amazon S3 ⏱️ 2 tiếng
- **Mô tả**: Tìm hiểu về S3 bucket, cấu hình quyền truy cập và triển khai website tĩnh.
- **Kết quả**:
  - Tạo thành công S3 bucket
  - Tải dữ liệu tĩnh (HTML/CSS) lên bucket
  - Cấu hình block public access, public object, bật static website hosting
  - Kiểm tra hiển thị website từ URL S3
- **Tools/Tech**: Amazon S3, IAM Policy
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [YouTube Study Group](https://www.youtube.com/@AWSStudyGroup)

### 2. Tăng tốc website bằng Amazon CloudFront ⏱️ 1 tiếng
- **Mô tả**:
  - Cấu hình CloudFront để phân phối nội dung tĩnh từ S3 bucket
  - Kết nối CloudFront với bucket chứa website
  - Kiểm tra caching, propagation và truy cập qua domain CloudFront
- **Kết quả**:
  - Cấu hình thành công distribution
  - Truy cập website qua CloudFront với tốc độ tốt hơn
- **Tools/Tech**: Amazon CloudFront, S3, Permissions
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: Amazon S3, CloudFront
- **Programming**: Không áp dụng hôm nay
- **DevOps**: Cấu hình truy cập công cộng, phân phối nội dung qua CDN
- **Architecture**: Web hosting trên S3 + CDN tăng tốc với CloudFront

### 💡 Concepts & Theory
- **New Concepts**: Static website hosting, Block Public Access, Public Object Permissions, CloudFront Origin & Distribution
- **Best Practices**: Không cấp quyền public toàn bucket, chỉ public object cần thiết
- **Industry Knowledge**: Kết hợp S3 và CloudFront là mô hình phổ biến cho website tĩnh, tối ưu chi phí

### 🤝 Soft Skills
- **Communication**: Trình bày lại luồng hoạt động từ S3 đến CloudFront qua sơ đồ
- **Problem Solving**: Xử lý lỗi quyền truy cập khi triển khai public website
- **Time Management**: Phân chia tốt giữa phần lý thuyết và thực hành
- **Learning**: Đã quen với cách xử lý phân quyền chi tiết trên AWS

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Chưa hoàn thành một số thao tác nâng cao với S3
- **Mô tả**: Chưa kịp thực hiện các thao tác như Bucket Versioning, di chuyển object, sao chép giữa region, dọn tài nguyên
- **Impact**: Mém tí là tốn tiền vì không dọn tài nguyên ( đã kịp thời dọn), chưa hiểu hết bài lab.
- **Root Cause**: Quên vì thiếu ngủ nên giảm tri nhớ
- **Solution**: Cố gắng ngủ đủ giấc 
- **Result**: Kịp thời dọn sạch các tài nguyên bài lab cũ còn để lại
- **Lesson**: Cần chia thời gian đều cho sinh hoạt hằng ngày

## 💭 Reflection & Insights

### What went well today?
- Tạo và cấu hình được static website trên S3
- Kết nối thành công với CloudFront và kiểm thử phân phối nội dung
- Hiểu được tầm quan trọng của permission và CDN trong kiến trúc web

### What could be improved?
- Chưa hoàn thành đầy đủ lab S3 nâng cao
- Cần quản lý thời gian tốt hơn để không quên

### Key Insights
- Cấu hình public cho S3 cần cực kỳ cẩn thận để tránh rò rỉ dữ liệu
- CloudFront giúp tăng tốc truy cập và che giấu endpoint S3 hiệu quả

### Questions & Curiosities

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: *(Chưa xác định)*
- [ ] **Medium**: *(Chưa xác định)*
- [ ] **Low**: *(Chưa xác định)*

### Learning Goals
- [ ] *(Chưa xác định)*
- [ ] *(Chưa xác định)*
- [ ] *(Chưa xác định)*

### Meetings & Deadlines
- [ ] Không có lịch họp hoặc deadline hôm nay

## 📊 Self Assessment

### Productivity
- **Score**: 6/10
- **Reason**: Hoàn thành phần lớn task quan trọng, nhưng còn thiếu thực hành nâng cao
- **Improvement**: Cần chia thời gian hợp lý để hoàn tất cả bài lab

### Learning
- **Score**: 6/10
- **New Knowledge**: S3 permissions, CloudFront integration
- **Application**: Host website tĩnh và tăng tốc truy cập thành công

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân, chưa trao đổi nhóm
- **Contributions**: Ghi chú cấu hình, lỗi và chia sẻ lại cho bạn cùng học

### Overall Satisfaction
- **Score**: 6/10
- **Highlights**: Tạo được website tĩnh và tối ưu bằng CDN
- **Areas for Growth**: Thực hành đầy đủ hơn, nhất là về versioning, move/copy object

## 📎 Attachments & Links

### Code & Projects
- [ ] Chưa có repo code ngày hôm nay

### Learning Resources
- [Tài liệu học AWS (Study Group)](http://f000001.awsstudygroup.com/vi/)
- [Kênh YouTube AWS Study Group](https://www.youtube.com/@AWSStudyGroup)

### Screenshots & Demos
- [ ] Chưa có ảnh minh họa ngày hôm nay

---

**📝 Notes for tomorrow:**
Bổ sung thực hành Bucket Versioning, Object Move/Copy và cleanup S3.

**🎯 Week Progress:**
Hoàn thành lab cơ bản với S3 + CloudFront, tiến độ 60% mục tiêu tuần 2.

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 22/05/2025*
