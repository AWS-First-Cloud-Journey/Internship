# 📈 Weekly Summary - Tuần 6

## 📅 Thông tin tổng quan
- **Tuần thực tập**: Tuần 6
- **Thời gian làm việc**: 9:00 - 17:00, từ 16/06 đến 20/06
- **Tổng số ngày làm việc**: 5 ngày
- **Mood trong tuần**: 😊
- **Điểm nổi bật**: [Một vài điểm nổi bật trong tuần: hoàn thành task lớn, deploy thành công, học kiến thức mới,...]

---

## 🎯 Mục tiêu tuần
- [ ] Mục tiêu 1: [Cụ thể, đo lường được]
- [ ] Mục tiêu 2: [Cụ thể, đo lường được]
- [ ] Mục tiêu 3: [Cụ thể, đo lường được]

---

## 💼 Công việc đã thực hiện

| Ngày | Công việc chính | Kết quả | Thời gian | Tools/Tech |
|------|------------------|---------|-----------|------------|
| Thứ 2 - 16/06 | Tìm hiểu các dịch vụ bảo mật trên AWS, Quản lý truy cập vào dịch vụ EC2 Resource Tag với AWS IAM | Nắm được kiến trúc, chức năng và use-case cơ bản của từng dịch vụ, Tạo thành công policy IAM dùng `Condition` kiểm tra tag key/value, phân quyền chính xác | 8 | IAM Policies, EC2 Tags, AWS CLI |
| Thứ 3 - 17/06 |  hạn chế quyền người dùng với IAM permission boundary, Cấp quyền cho ứng dụng truy cập dịch vụ AWS thông qua IAM role | Tạo thành công boundary policy, gán cho user, thử nghiệm hiệu ứng kết hợp giữa permission boundary và inline policy | 8 | IAM, Permission Boundary |
| Thứ 4 - 18/06 | Thực hành giới hạn IAM role bằng điều kiện,Làm quen với AWS Security Hub | Cấu hình thành công IAM group và phân quyền cho các user, tiến hành assume role | 8 | IAM role, assume role, IAM group |
| Thứ 5 - 19/06 | Quản lý tài nguyên bằng tag và resource group, triển khai IAM Group theo vai trò thực tế | Tạo thành công resource groups theo tag, Thiết lập IAM group và attach policy theo nguyên tắc "least privilege", kiểm thử quyền thành công | 8 | EC2, S3, Lambda, RDS  |
| Thứ 6 - 20/06 | Cấu hình IAM Group, Tạo các tài nguyên để kiểm tra quyền truy cập | Các nhóm được cấu hình đúng, xác minh policy áp dụng chuẩn xác | 8 | IAM Group, IAM Policy  |

---

## 📚 Kiến thức học được trong tuần

### 🔧 Technical Skills
- **AWS Services**: IAM, EC2, Organizations, KMS, Cognito, IAM (Boundary, Roles), Security Hub, GuardDuty, Inspector
- **DevOps**: Gán IAM Role cho EC2 để thực hiện thao tác tự động 
- **Architecture**: 
- **Security Practice**: 
  - Quản lý truy cập dựa trên tag, principle of least privilege
  - Principle of Least Privilege, Scoped permissions  
  - Conditional access control, threat visibility

### 💡 Concepts & Theory
- **New Concepts**: 
  - IAM Permission Boundary: xác định quyền tối đa user có thể có  
  - Trust policy để cho phép EC2 assume IAM role
  -  Security Hub: tiêu chuẩn CIS AWS Foundations, mức độ severity 
- **Best Practices**: 
  - Sử dụng tag để kiểm soát resource access theo team/project
  - Kết nối nhiều dịch vụ vào Security Hub để tránh bỏ sót cảnh báo
  - Đăng nhập và kiểm thử là cách xác minh cấu hình chính xác nhất
- **Industry Knowledge**: Quy trình assume role được áp dùng để quản lý các user trong môi trường multi user


### 🤝 Soft Skills
- **Communication**: Tóm tắt nội dung chính
- **Problem Solving**: Debugging
- **Time Management**: Lên kế hoạch cho tuần mới
- **Learning**: Research skills, tự lên kịch bản phù hợp với yêu cầu về phân môi tường trong điều kiện multi user

---

## 🚧 Khó khăn & Giải pháp nổi bật

### Vấn đề: EC2 không thể assume IAM role
- **Mô tả**: Ứng dụng không thể truy cập được S3 mặc dù đã gán role   
- **Solution**: Kiểm tra lại trust relationship và attach đúng policy vào role  
- **Result**: EC2 assume role thành công, ứng dụng truy cập được tài nguyên  
- **Lesson**: Trust policy là điều kiện cần để EC2 có thể assume đúng role
---

## 💭 Reflection & Insights

### ✅ What went well
- Hiểu rõ hơn cách hoạt động của IAM policy theo resource tag  
- Nắm tổng quan được các dịch vụ bảo mật cốt lõi của AWS
- Hiểu rõ hơn cơ chế IAM nâng cao: permission boundary và assume role  

### 🔄 What could be improved
- Nên tạo sẵn template policy để reuse sau này  
- Có thể áp dụng tag-based access để quản lý tốt hơn khi mở rộng

### ✨ Key Insights
- IAM không chỉ kiểm soát theo user mà còn linh hoạt với metadata như tags  
- Permission boundary rất hữu ích để kiểm soát người dùng tự tạo role hoặc policy
- Việc cấp quyền cho EC2 qua IAM role là cách tiếp cận an toàn và chuẩn nhất
- Việc tổ chức IAM theo nhóm giúp quản lý người dùng đơn giản, hiệu quả hơn 
---

## 📊 Weekly Self Assessment

| Tiêu chí | Điểm | Lý do |
|----------|------|-------|
| **Productivity** | 8 | Hoàn thành các Lab của Week 5 |
| **Learning** | 9 | Tìm hiểu các dịch vụ và cơ chế của IAM: group, user, role |
| **Collaboration** | 6 | Cần tìm hiểu từ mentor cấu kinh nghiệm cấu hình IAM |
| **Satisfaction** | 9 | Cấu hình IAM từ căn bản đến nâng cao, kiểm thử việc cấp quyền |

---

*Weekly summary created by: Vũ Quang Huy*  