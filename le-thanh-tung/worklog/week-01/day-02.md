# Worklog - Ngày 16/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 16/05/2025
- **Thứ**: Thứ Sáu
- **Tuần thực tập**: Tuần thứ 1/8
- **Thời gian làm việc**: 8:00 - 11:00
- **Mood**: 😔 Tệ (overload thông tin)

## 🎯 Mục tiêu ngày hôm nay
- [x] Kích hoạt MFA cho tài khoản AWS root
- [x] Tạo nhóm Admin và người dùng Admin với IAM
- [x] Chuẩn bị môi trường thực hành (cài lại Windows và Linux)

## 💼 Công việc đã thực hiện

### 1. Cấu hình MFA cho tài khoản root ⏱️ 1 tiếng
- **Mô tả**: Cấu hình xác thực đa yếu tố (MFA) để tăng cường bảo mật cho tài khoản root AWS.
- **Kết quả**: Kích hoạt MFA thành công, hiểu rõ cơ chế bảo mật qua app Google Authenticator.
- **Tools/Tech**: AWS IAM, MFA Apps (Google Authenticator)
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [Kênh YouTube](https://www.youtube.com/@AWSStudyGroup)

### 2. Tạo Admin Group và Admin User ⏱️ 1 tiếng
- **Mô tả**: Thực hiện tạo nhóm IAM Admin với quyền FullAccess và tạo user mới để thao tác thay cho root.
- **Kết quả**: Hoàn tất tạo user và kiểm tra login thành công với quyền quản trị.
- **Tools/Tech**: AWS IAM
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)

### 3. Cài lại Windows và Linux phục vụ lab ⏱️ 4 tiếng
- **Mô tả**: Cài đặt lại hệ điều hành Windows và Ubuntu trên máy ảo phục vụ thực hành CLI và server-side trong các bài lab sau.
- **Kết quả**: Hoàn tất cài đặt, cấu hình kết nối mạng, update hệ thống.
- **Tools/Tech**: VirtualBox / VMware, Windows ISO, Ubuntu ISO
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: IAM (Users, Groups, MFA), Account Security
- **Programming**: Không áp dụng hôm nay
- **DevOps**: Quản lý quyền và cấu hình bảo mật cơ bản cho hệ thống cloud
- **Architecture**: Phân quyền trong mô hình quản lý AWS

### 💡 Concepts & Theory
- **New Concepts**: MFA đa thiết bị, IAM best practices
- **Best Practices**: Không sử dụng root account thường xuyên, phân tách quyền theo nguyên tắc least privilege
- **Industry Knowledge**: Security là yếu tố đầu tiên khi làm việc với môi trường production

### 🤝 Soft Skills
- **Communication**: Tự đọc tài liệu và theo dõi video hướng dẫn
- **Problem Solving**: Tìm giải pháp cho lỗi khi cài MFA và IAM user
- **Time Management**: Phân bổ thời gian chưa hiệu quả do cài OS tốn thời gian
- **Learning**: Tăng khả năng tự học thông qua thực hành và xử lý lỗi hệ thống

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Lỗi MFA khi vô tình tạo ra 2 MFA trên cùng 1 thiết bị
- **Mô tả**: Vô tình tạo 2 lần mã MFA
- **Impact**: khiến việc xác nhận qua 2 mã gặp phiền phức
- **Root Cause**: Não để trên mây nên không để ý
- **Solution**: Xóa 1 mã MFA, nhưng không biết cách xóa trên ứng dụng, chỉ xóa được trên tài khoản
- **Result**: Xóa thành công trên web, nhưng trên thiết bị thất bại
- **Lesson**: Cần thực hiện bước quét mã MFA song song khi cần dùng nhiều thiết bị

### Vấn đề 2: Lỗi khi tạo Admin User
- **Mô tả**: Không thể đăng nhập bằng tài khoản Admin mới tạo
- **Impact**: Sử dụng tài khoản root thay thế, tăng rủi ro bảo mật.
- **Root Cause**: Không gán đúng policy hoặc gán sai permission boundary
- **Solution**: Xem lại policy gán cho group và chỉnh sửa
- **Result**: Đăng nhập thành công với user Admin, quyền đầy đủ
- **Lesson**: Luôn kiểm tra lại policy và trust relationship kỹ khi gán quyền

### Vấn đề 3: Tốn thời gian cài lại hệ điều hành
- **Mô tả**: Mất hơn 2 tiếng do lỗi boot ISO và thiếu driver
- **Impact**: Mất cả ngày chỉ để ngồi cài Windows
- **Root Cause**: Cài windows dạng Windows To Go, nhiều lỗi phát sinh trong lúc cài.
- **Solution**: Chịu khó ngồi cài đi cài lại
- **Result**: Hoàn tất cài đặt nhưng tốn quá nhiều thời gian
- **Lesson**: Đừng cài Windows To Go

## 💭 Reflection & Insights

### What went well today?
- Hoàn tất thiết lập môi trường an toàn (MFA, IAM)
- Làm quen với quá trình phân quyền thực tế
- Cài đặt thành công hệ điều hành cho các bước học sau

### What could be improved?
- Quản lý thời gian hiệu quả hơn, tránh để task phụ như cài OS chiếm ưu tiên
- Ghi chú kỹ hơn về các bước IAM và lỗi gặp phải

### Key Insights
- MFA nên được thiết lập ngay từ đầu và dùng trên nhiều thiết bị khi cần
- Không dùng root account để thao tác lâu dài là nguyên tắc cơ bản khi làm việc với AWS

### Questions & Curiosities
- Có thể tạo user có quyền tự đăng ký dịch vụ mà không cho phép thay đổi billing không?
- Có thể sao lưu cấu hình IAM để dùng lại không?

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
- **Score**: 5/10
- **Reason**: Một số task chính hoàn tất, nhưng mất quá nhiều thời gian cho phần cài đặt không cần thiết
- **Improvement**: Lên kế hoạch chi tiết hơn, ưu tiên đúng task học

### Learning
- **Score**: 5/10
- **New Knowledge**: MFA, IAM Groups, Admin policy
- **Application**: Đã thiết lập và thực hành trên tài khoản cá nhân

### Collaboration
- **Score**: 5/10
- **Interactions**: Làm việc cá nhân, chưa phối hợp với mentor/team
- **Contributions**: Ghi chú lại quy trình và chia sẻ file cài đặt OS

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: Hoàn tất thiết lập bảo mật và phân quyền tài khoản AWS
- **Areas for Growth**: Quản lý thời gian, ưu tiên task và xử lý kỹ thuật

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
Xác định rõ mục tiêu chính để không bị loãng thông tin và quá tải kiến thức.

**🎯 Week Progress:**
Đã hoàn thành bước thiết lập bảo mật và môi trường học, sẵn sàng cho bước thực hành đầu tiên.

---
*Worklog created by: lê Thanh Tùng*  
*Next review: 17/05/2025*
