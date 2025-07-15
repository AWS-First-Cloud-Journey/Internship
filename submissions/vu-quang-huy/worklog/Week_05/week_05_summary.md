# 📈 Weekly Summary - Tuần 5

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 5
- **Thời gian làm việc**: 9:00 - 17:00, từ 09/06 đến 13/06
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😊
- **Điểm nổi bật**: 
  - Cấu hình thực tế với các dịch vụ lưu trữ thông qua các hand-on Lab
  - Triển khai ứng dụng đơn giản kết hợp S3 và EC2

---

## 🎯 Mục tiêu tuần
- [x] Mục tiêu 1: Tìm hiểu tổng quan về các dịch vụ lưu trữ phổ biến trên AWS
- [x] Mục tiêu 2: Hoàn thành các Lab: 13,14,24,15,57

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 09/06 | Tìm hiểu tổng quan về các dịch vụ lưu trữ phổ biến trên AWS, làm Lab 13 - AWS Backup  | Hiểu rõ cách sử dụng, chi phí, và tình huống phù hợp cho từng dịch vụ, Tạo thành công backup vault, kế hoạch backup và test restore  | 8 | AWS S3, Glacier, Snowball |
| Thứ 3 - 10/06 | Thực hành import/export máy ảo lên AWS, thực hành Storage Gateway | import thành công file OVA lên EC2 thông qua S3 bucket; export VM image về local, Cài đặt Storage Gateway appliance, tạo file share kết nối với S3, xác minh truy cập  | 8 | Storage Gateway, EC2, S3, File Gateway, VMware Workstation |
| Thứ 4 - 11/06 | triển khai Amazon FSx for Windows File Server | Thiết lập thành công FSx, gắn vào hệ thống domain  | 3 | Amazon FSx, Active Directory |
| Thứ 5 - 12/06 | Lưu trữ và triển khai static web với S3 | Website tĩnh được truy cập thành công qua URL S3 endpoint, cấu hình chính xác permission và static hosting | 8 | Amazon S3 |
| Thứ 6 - 13/06 | Triển khai ứng dụng web đơn giản với source code lưu trữ trên S3 | EC2 kết nối S3 thành công, tải mã nguồn, cài đặt web server (Apache), triển khai web | 8 | Amazon EC2, S3 CLI, IAM Role, Apache |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: S3, Glacier, Snowball, AWS Backup, VM Import/Export, AWS Storage Gateway, Amazon FSx for Windows File Server
- **Programming**: HTML/JS/CSS
- **DevOps**: 
  - AWS Management Console, CloudShell
  - AWS CLI, IAM role cấu hình quyền truy cập
  - Kết nối và mount file system trong môi trường Windows  
- **Architecture**: 
  - Data lifecycle management, Cold/Archival storage patterns
  - Hybrid storage architecture, DR strategy với Storage Gateway

### 💡 Concepts & Theory
- **New Concepts**: 
  -  Storage classes trong S3: Standard, Intelligent-Tiering, Glacier Instant, Glacier Deep Archive
  - AWS Backup Plan và Lifecycle
  - Tích hợp AD và phân quyền truy cập theo domain user
  - S3 static website endpoint
- **Best Practices**: 
  - Thiết lập chính sách backup định kỳ
  - Sử dụng Glacier cho dữ liệu lưu trữ dài hạn, ít truy cập
  - Dùng security group để hạn chế truy cập không mong muốn
  - Luôn dùng chính sách cụ thể thay vì mở bucket toàn quyền
- **Industry Knowledge**: Doanh nghiệp lớn sử dụng Snowball để di chuyển dữ liệu khi băng thông mạng bị giới hạn

### 🤝 Soft Skills
- **Communication**: Chủ động trao đổi hơn với mentor
- **Problem Solving**: Giải quyết các vấn đề về IAM
- **Time Management**: Phân bổ thời gian hợp lý giữa lý thuyết và thực hành
- **Learning**: Tự tra cứu tài liệu khi gặp lỗi

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề 1: Hiểu nhầm giữa Glacier và Glacier Deep Archive
- **Mô tả**: Ban đầu nhầm lẫn giữa thời gian restore và chi phí của hai loại Glacier
- **Solution**: Quay lại đọc lại tài liệu chính thức
- **Result**: Hiểu rõ hơn về lựa chọn lưu trữ chi phí thấp
- **Lesson**: Khi gặp thuật ngữ gần giống, cần đối chiếu thông tin chi tiết kỹ hơn

### Vấn đề 2: Không thể join FSx vào domain
- **Mô tả**: FSx không join được vào AWS Managed AD  
- **Solution**: Kiểm tra lại subnet, bảo đảm kết nối đến AD domain controller, sửa lại route table  
- **Result**: Join domain thành công sau khi sửa cấu hình mạng  
- **Lesson**: Việc thiết lập mạng nội bộ chính xác rất quan trọng với các dịch vụ phụ thuộc AD

### Vấn đề 3: Không truy cập được trang web sau khi cấu hình
- **Mô tả**: Truy cập vào URL trả về lỗi Access Denied  
- **Solution**: Kiểm tra lại cấu hình "Block all public access" và bổ sung bucket policy cho phép public read  
- **Result**: Website hoạt động bình thường sau khi sửa  
- **Lesson**: Hosting tĩnh yêu cầu đúng cả hai phần: bật hosting + policy cho phép

---

## 💭 Reflection & Insights

### ✅ What went well
- Hiểu sâu hơn về ứng dụng lưu trữ kết hợp
- Hiểu rõ hơn về dịch vụ lưu trữ phù hợp với doanh nghiệp đang dùng hệ sinh thái Microsoft 

### 🔄 What could be improved
- Thử tự viết thêm file HTML/CSS thay vì chỉ upload có sẵn

### ✨ Key Insights
- Storage Gateway là công cụ quan trọng khi doanh nghiệp chuyển dần sang cloud

---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 8 | Hoàn thành các lab đúng thời hạn |
| **Learning** | 8 | Tìm hiểu đa dạng các dịch vụ lưu trữ |
| **Collaboration** | 7 | Cần giao tiếp để tìm hiểu các dịch vụ AWS ở lĩnh vực không phải thế mạnh |
| **Satisfaction** | 9 | Cấu hình trực tiếp trên AWS |

---

*Weekly summary created by: Vũ Quang Huy*  