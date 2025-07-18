# Worklog - Ngày 02/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 02/06/2025  
- **Thứ:** Thứ Hai  
- **Tuần thực tập:** Tuần thứ 4/12  
- **Thời gian làm việc:** 8:30 - 17:30  
- **Mood:** 🛡️ Sẵn sàng xây dựng các lớp phòng thủ.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu rõ về các cuộc tấn công web phổ biến (OWASP Top 10).
- [x] Triển khai AWS WAF và áp dụng bộ quy tắc quản lý (Managed Rule Sets).
- [x] Gắn WAF Web ACL vào CloudFront Distribution đã tạo ở Tuần 3.
- [x] Tìm hiểu về AWS Shield Standard và Advanced.

---

## 💼 Công việc đã thực hiện

### 1. Web Security Fundamentals & AWS WAF Intro ⏱️ 8:30-10:30

**Mô tả:**
- Nghiên cứu về SQL Injection, Cross-Site Scripting (XSS).
- Tìm hiểu cách AWS WAF hoạt động ở Layer 7 để lọc traffic HTTP/HTTPS.

**Kết quả:**
- Nắm được các mối đe dọa chính cho ứng dụng web.
- Hiểu cách WAF có thể giúp giảm thiểu các rủi ro này.

**Tools/Tech:**
- OWASP Top 10 Documentation
- AWS WAF Docs

---

### 2. Deploying a WAF Web ACL ⏱️ 10:30-12:00, 13:00-15:30

**Mô tả:**
- Tạo một Web ACL mới trong AWS WAF.
- Thêm bộ quy tắc được quản lý của AWS:
    - `AWSManagedRulesCommonRuleSet`
- Cấu hình action mặc định là:
    - Allow
- Action cho bộ quy tắc:
    - Block
- Gắn Web ACL này vào CloudFront Distribution.

**Kết quả:**
- CloudFront distribution giờ đây đã được bảo vệ bởi WAF.
- Thử truy cập với một chuỗi query đáng ngờ (ví dụ:
    - `/?q=<script>alert(1)</script>`
    ) và nhận được lỗi 403 Forbidden.

**Tools/Tech:**
- AWS WAF
- AWS CloudFront

**Links:**
- [Screenshot: WAF blocking a malicious request]

---

### 3. Understanding DDoS Protection ⏱️ 15:30-17:00

**Mô tả:**
- Đọc về các loại tấn công DDoS:
    - Layer 3/4
    - Layer 7
- Tìm hiểu các tính năng của AWS Shield Standard:
    - Được bật mặc định và miễn phí
- Các lợi ích của Shield Advanced:
    - Hỗ trợ 24/7 từ DDoS Response Team
    - Báo cáo chi tiết
    - Cost protection

**Kết quả:**
- Hiểu rằng mọi khách hàng AWS đều được bảo vệ ở mức độ cơ bản.
- Biết khi nào cần cân nhắc nâng cấp lên Shield Advanced.

**Tools/Tech:**
- AWS Shield Documentation

---

## 📚 Kiến thức học được

- **Technical Skills:**
    - AWS WAF (Web ACLs, Managed Rules)
    - AWS Shield
    - Tích hợp WAF & CloudFront
- **Concepts & Theory:**
    - Defense in Depth
    - OWASP Top 10
    - DDoS Mitigation
- **Soft Skills:**
    - Tư duy về rủi ro (Risk-based thinking)
    - Đánh giá các lớp bảo mật

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**
    - Sau khi áp dụng WAF, một số chức năng hợp lệ của ứng dụng bị chặn (false positive).
- **Giải pháp:**
    - Phân tích log của WAF để xác định rule nào đã trigger.
    - Tạo một rule tùy chỉnh với action Allow cho các request hợp lệ đó và đặt độ ưu tiên (priority) cao hơn bộ quy tắc chung.

---

## 💭 Reflection & Insights

**Key Insight:**
- Bảo mật không phải là một sản phẩm, mà là một quá trình.
- AWS WAF với Managed Rules là một cách cực kỳ hiệu quả để có được lớp bảo vệ mạnh mẽ ngay lập tức mà không cần trở thành chuyên gia bảo mật.

---

## 📋 Kế hoạch ngày mai

- **High:**
    - Tìm hiểu về phát hiện mối đe dọa chủ động với Amazon GuardDuty.
- **Medium:**
    - Khám phá AWS Security Hub để có cái nhìn tổng quan về tình trạng an ninh.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 03/06/2025*