# Worklog - Ngày 06/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 06/06/2025  
- **Thứ:** Thứ Sáu  
- **Tuần thực tập:** Tuần thứ 4/12  
- **Thời gian làm việc:** 9:00 - 17:00  
- **Mood:** 🏛️ Building the enterprise structure.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu lợi ích của việc sử dụng nhiều tài khoản AWS.
- [x] Tìm hiểu về các thành phần của AWS Organizations: Organization, OU, Account.
- [x] Tạo một Organization và mời một tài khoản khác tham gia.
- [x] Áp dụng một Service Control Policy (SCP) để đặt ra các giới hạn.

---

## 💼 Công việc đã thực hiện

### 1. Multi-Account Strategy with AWS Organizations ⏱️ 9:00-12:00

**Mô tả:**
- Đọc về Best Practices cho AWS Organizations,  
    ví dụ: Landing Zone.
- Tạo một Organization từ tài khoản chính.
- Tạo một Organizational Unit (OU)  
    tên là "Sandbox".
- Tạo một tài khoản thành viên mới  
    và đặt nó vào OU "Sandbox".

**Kết quả:**
- Có một cấu trúc Organization cơ bản.
- Hiểu cách quản lý tập trung billing  
    và policy.

**Tools/Tech:**  
AWS Organizations.

---

### 2. Service Control Policies (SCPs) Lab ⏱️ 13:00-15:00

**Mô tả:**
- Kích hoạt SCPs trong Organization.
- Tạo một policy mới với nội dung  
    Deny quyền truy cập vào các dịch vụ  
    không được sử dụng (ví dụ: Amazon SageMaker).
- Gắn policy này vào OU "Sandbox".
- Đăng nhập vào tài khoản thành viên  
    và xác nhận không thể truy cập SageMaker.

**Kết quả:**
- Triển khai thành công một "guardrail"  
    ở cấp độ tổ chức.

**Tools/Tech:**  
AWS Organizations (SCPs).

---

### 3. Documentation and Weekly Review ⏱️ 15:00-17:00

**Mô tả:**
- Tổng hợp kiến thức tuần 4.
- Viết báo cáo tổng kết chi tiết.
- Dọn dẹp các tài nguyên đã tạo.

**Kết quả:**
- Báo cáo tuần hoàn chỉnh.

**Tools/Tech:**  
Notion, VS Code, Markdown.

---

## 📚 Kiến thức học được

- **Technical Skills:**  
    AWS Organizations, Organizational Units (OUs),  
    Service Control Policies (SCPs).
- **Concepts & Theory:**  
    Multi-account strategy, Centralized governance,  
    Landing Zone.
- **Soft Skills:**  
    Quản trị doanh nghiệp (Governance),  
    Lập chính sách.

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    SCP là một Deny list, không phải Allow list.  
    Rất dễ tự khóa mình ra khỏi các quyền cần thiết  
    nếu viết policy không cẩn thận.
- **Giải pháp:**  
    Luôn để policy FullAWSAccess mặc định  
    được gắn ở root. Khi tạo SCP mới,  
    bắt đầu với các Deny statement rất cụ thể  
    và kiểm tra cẩn thận ảnh hưởng của nó  
    trước khi áp dụng cho các OU quan trọng.

---

## 💭 Reflection & Insights

**Key Insight:**  
AWS Organizations và SCPs là công cụ tối thượng  
cho quản trị ở quy mô lớn, cho phép các doanh nghiệp  
vừa trao quyền tự do cho các đội dev,  
vừa đảm bảo họ hoạt động trong một khuôn khổ  
an toàn và tuân thủ.

---

## 📋 Kế hoạch cho tuần tới

- **High:**  
    Bắt đầu tìm hiểu về Serverless với Lambda,  
    API Gateway, DynamoDB.
- **Medium:**  
    Xây dựng một API RESTful hoàn toàn không có máy chủ.
- **Low:**  
    So sánh kiến trúc Serverless và kiến trúc  
    dựa trên Container (ECS).

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 10/06/2025*