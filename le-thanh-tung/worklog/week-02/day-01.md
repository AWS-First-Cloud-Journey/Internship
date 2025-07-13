# Worklog - Ngày 20/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 20/05/2025
- **Thứ**: Thứ Ba
- **Tuần thực tập**: Tuần thứ 2/8
- **Thời gian làm việc**: 8:00 - 17:00
- **Mood**: 😐 Tập trung cao độ 

## 🎯 Mục tiêu ngày hôm nay
- [x] Hiểu cách tạo và quản lý ngân sách trên AWS bằng AWS Budgets
- [x] Nắm được khái niệm, cấu hình cơ bản và thao tác thực hành với Amazon EC2
- [x] Tạo, cấu hình và kết nối thành công EC2 Instance (Windows và Linux)

## 💼 Công việc đã thực hiện

### 1. Quản lý chi phí với AWS Budgets ⏱️ 2 tiếng
- **Mô tả**: Tìm hiểu cách tạo ngân sách chi phí trên AWS, thiết lập Cost Budget và kiểm tra tính năng cảnh báo.
- **Kết quả**: 
  - Tạo thành công Cost Budget.
  - Hiểu cách theo dõi chi phí qua báo cáo Budget dashboard.
- **Tools/Tech**: AWS Budgets, AWS Cost Explorer
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [Kênh YouTube](https://www.youtube.com/@AWSStudyGroup)

### 2. Tìm hiểu và thực hành Amazon EC2 ⏱️ 3 tiếng
- **Mô tả**:
  - Tìm hiểu tổng quan EC2 và các thành phần liên quan: AMI, Instance Type, EBS, Key Pair.
  - Tạo VPC, Security Group cho cả Windows và Linux instance.
  - Tạo thành công instance EC2 và kết nối qua SSH (Linux), RDP (Windows).
  - Thử thay đổi loại instance (t2.micro → t3.medium) và tạo snapshot backup.
- **Kết quả**:
  - Hoàn tất khởi tạo, kết nối và thực hiện các thao tác quản trị cơ bản trên EC2.
- **Tools/Tech**: Amazon EC2, VPC, Security Group, Key Pair, Snapshot
- **Links**: [Tài liệu học tập](http://f000001.awsstudygroup.com/vi/), [Kênh YouTube](https://www.youtube.com/@AWSStudyGroup)

## 📚 Kiến thức học được

### 🔧 Technical Skills
- **AWS Services**: AWS Budgets, EC2, VPC, Security Group, Snapshot
- **Programming**: Không áp dụng hôm nay
- **DevOps**: Quản lý tài nguyên cloud và giám sát chi phí sử dụng
- **Architecture**: Thiết lập VPC và quy hoạch mạng cho các EC2 instance

### 💡 Concepts & Theory
- **New Concepts**: Cost Budget, Usage Budget, Reserved Instance Budget, Snapshot, Instance Type
- **Best Practices**: Luôn cấu hình cảnh báo ngân sách để tránh phát sinh chi phí ngoài ý muốn
- **Industry Knowledge**: EC2 là dịch vụ core cho hạ tầng cloud, cần hiểu kỹ để vận hành app production

### 🤝 Soft Skills
- **Communication**: Ghi chép và hệ thống lại kiến thức trong khi thực hành
- **Problem Solving**: Tìm hướng giải quyết khi gặp lỗi khôi phục key EC2
- **Time Management**: Ưu tiên làm song song lý thuyết và thực hành để tối ưu thời gian
- **Learning**: Tự học qua tài liệu video, troubleshooting qua console AWS

## 🚧 Khó khăn và giải pháp

### Vấn đề 1: Lỗi khi tạo Usage/RI Budget
- **Mô tả**: Không thể tạo Usage Budget hoặc RI Budget vì hệ thống báo lỗi liên quan đến lịch sử Budget History
- **Impact**: Không thể kiểm tra giới hạn sử dụng tài nguyên theo kế hoạch
- **Root Cause**: Tài khoản mới chưa đủ dữ liệu lịch sử để tạo loại ngân sách này
- **Solution**: Ghi chú lại lỗi, chuyển sang tạo Cost Budget thay thế
- **Result**: Tạo được Cost Budget, theo dõi được chi phí sử dụng thực tế
- **Lesson**: Nên bắt đầu với loại ngân sách đơn giản nhất là Cost Budget trên tài khoản mới

### Vấn đề 2: Lỗi khi tạo EC2 Instance Windows và khôi phục Key Pair
- **Mô tả**: Không tìm thấy parameter nào trong Systems Manager Parameter Store khi thực hiện khôi phục key pair EC2-Windows
- **Impact**: Không thể login vào instance đã tạo nếu không có key hợp lệ
- **Root Cause**: AWS Systems Manager chưa được cấu hình đúng hoặc instance chưa bật Systems Manager Agent
- **Solution**: Tạo lại instance, đảm bảo chọn đúng AMI hỗ trợ SSM, bật quyền SSM trên role
- **Result**: Kết nối được lại instance Windows bằng key mới
- **Lesson**: Cần kiểm tra kỹ cấu hình Systems Manager và role IAM khi làm việc với key EC2

## 💭 Reflection & Insights

### What went well today?
- Tạo thành công Budget để giám sát chi phí
- Triển khai đầy đủ một EC2 stack (VPC → Security Group → Instance → Kết nối)
- Thực hành được các thao tác quan trọng như thay đổi cấu hình và tạo snapshot

### What could be improved?
- Tìm hiểu kỹ hơn về điều kiện tạo Usage/RI Budget để tránh mất thời gian
- Chuẩn bị kỹ hơn trước khi thao tác với Parameter Store và khôi phục key EC2

### Key Insights
- AWS Budget giúp kiểm soát chi phí cực kỳ hiệu quả nếu thiết lập từ đầu
- EC2 rất linh hoạt nhưng yêu cầu hiểu sâu về quyền truy cập, bảo mật, AMI, v.v.

### Questions & Curiosities
- Khi nào thì nên dùng Reserved Instance thay vì On-Demand cho EC2?
- Có thể tự động gửi báo cáo Budget hàng tuần qua email không?

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
- **Reason**: Làm được nhiều task quan trọng, nhưng gặp lỗi kỹ thuật tốn nhiều thời gian xử lý
- **Improvement**: Cần nghiên cứu kỹ các lỗi phổ biến trước khi thao tác

### Learning
- **Score**: 5/10
- **New Knowledge**: AWS Budget, EC2 snapshot, cấu hình mạng cho instance
- **Application**: Áp dụng thành công để cấu hình, kết nối và giám sát EC2 instance

### Collaboration
- **Score**: 5/10
- **Interactions**: Tự nghiên cứu, chưa phối hợp nhóm
- **Contributions**: Ghi chú chi tiết quy trình EC2 và Budget để chia sẻ sau

### Overall Satisfaction
- **Score**: 5/10
- **Highlights**: Hiểu và thực hành được nhiều chức năng quan trọng của EC2 và AWS Budgets
- **Areas for Growth**: Troubleshooting EC2, hiểu rõ hơn về các loại ngân sách AWS

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
Cần dành thêm thời gian tìm hiểu SSM và khôi phục EC2 key an toàn.

**🎯 Week Progress:**
Bắt đầu thực hành thực tế với EC2, làm chủ chi phí với AWS Budget.

---
*Worklog created by: Lê Thanh Tùng*  
*Next review: 21/05/2025*
