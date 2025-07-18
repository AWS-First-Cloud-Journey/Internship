# Worklog - Ngày 03/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 03/06/2025  
- **Thứ:** Thứ Ba  
- **Tuần thực tập:** Tuần thứ 4/12  
- **Thời gian làm việc:** 9:00 - 17:30  
- **Mood:** 🕵️‍♂️ Investigating potential threats.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu cách Amazon GuardDuty sử dụng Machine Learning để phát hiện mối đe dọa.
- [x] Kích hoạt GuardDuty và phân tích các loại data source (VPC Flow Logs, DNS Logs, CloudTrail).
- [x] Tìm hiểu về các loại Findings và mức độ nghiêm trọng của chúng.
- [x] Bật AWS Security Hub và xem cách nó tổng hợp các cảnh báo.

---

## 💼 Công việc đã thực hiện

### 1. Enabling and Exploring GuardDuty ⏱️ 9:00-12:00

**Mô tả:**
- Kích hoạt GuardDuty chỉ với một cú click.
- Tìm hiểu về các danh mục findings  
    - Ví dụ:  
        - Recon  
        - Backdoor  
        - CryptoCurrency
- Sử dụng tính năng "Generate sample findings"  
    - Xem các loại cảnh báo trông như thế nào.

**Kết quả:**
- GuardDuty đã được kích hoạt và đang phân tích các hoạt động trong tài khoản.
- Hiểu được các thông tin chi tiết trong một finding  
    - Tài nguyên bị ảnh hưởng  
    - Actor  
    - Action

**Tools/Tech:**  
- Amazon GuardDuty

---

### 2. Centralizing Security with Security Hub ⏱️ 13:30-16:00

**Mô tả:**
- Kích hoạt AWS Security Hub.
- Tìm hiểu cách Security Hub tự động tổng hợp các phát hiện  
    - GuardDuty  
    - IAM Access Analyzer  
    - Các dịch vụ khác
- Khám phá các tiêu chuẩn bảo mật (Security Standards)  
    - AWS Foundational Security Best Practices  
    - Xem điểm tuân thủ (security score)

**Kết quả:**
- Có một dashboard duy nhất để xem toàn bộ tình trạng an ninh.
- Nhận thấy một vài cấu hình chưa tuân thủ  
    - Ví dụ: root account chưa có MFA (trong trường hợp mẫu)

**Tools/Tech:**  
- AWS Security Hub

---

## 📚 Kiến thức học được

- **Technical Skills:**  
    - Amazon GuardDuty  
    - AWS Security Hub  
    - Phân tích security findings
- **Concepts & Theory:**  
    - Intelligent Threat Detection  
    - Security Posture Management  
    - Compliance Standards
- **Soft Skills:**  
    - Phân tích và điều tra (Forensics)  
    - Đánh giá mức độ ưu tiên của cảnh báo

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    - Có quá nhiều findings với mức độ "Low" và "Medium", gây ra "alert fatigue".
- **Giải pháp:**  
    - Học cách sử dụng bộ lọc (filters) trong GuardDuty và Security Hub.  
    - Tạo các filter để tập trung vào các findings có mức độ "High" hoặc các findings liên quan đến các tài nguyên quan trọng (production).  
    - Thiết lập quy trình chỉ điều tra các cảnh báo có độ ưu tiên cao trước.

---

## 💭 Reflection & Insights

**Key Insight:**  
- Các công cụ bảo mật truyền thống thường dựa trên chữ ký (signature-based),  
- GuardDuty thể hiện sức mạnh của cloud bằng cách phân tích hàng tỷ sự kiện để tìm ra các hành vi bất thường mà con người không thể phát hiện.

---

## 📋 Kế hoạch ngày mai

- **High:**  
    - Tìm hiểu về Compliance as Code với AWS Config.
- **Medium:**  
    - Triển khai một vài Config Rule để tự động kiểm tra sự tuân thủ.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 04/06/2025*