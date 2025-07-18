# 📊 TUẦN 4 - TỔNG KẾT (02/06/2025 - 06/06/2025)

## 🎯 TỔNG QUAN TUẦN 4

## Mục tiêu đã đặt ra

- [x] Triển khai lớp phòng thủ ứng dụng với **AWS WAF và AWS Shield**.
- [x] Thiết lập hệ thống giám sát và phát hiện mối đe dọa chủ động với **Amazon GuardDuty**.
- [x] Có được cái nhìn tổng quan về tình trạng an ninh qua **AWS Security Hub**.
- [x] Tự động hóa việc giám sát tuân thủ bằng **AWS Config (Compliance as Code)**.
- [x] Xây dựng và kiểm thử kế hoạch phục hồi sau thảm họa (**Disaster Recovery**).
- [x] Nắm vững mô hình quản trị đa tài khoản với **AWS Organizations và Service Control Policies (SCPs)**.

## Kết quả đạt được

- ✅ **100% mục tiêu hoàn thành**.
- ✅ **Thiết lập thành công một hệ thống phòng thủ đa lớp** cho ứng dụng, từ ngoài vào trong.
- ✅ **Tự động hóa hoàn toàn việc giám sát an ninh và tuân thủ**, giảm thiểu rủi ro do con người.
- ✅ **Xây dựng được một kế hoạch DR khả thi** và đã được kiểm thử, đảm bảo tính liên tục của kinh doanh.
- ✅ Nắm vững các khái niệm và công cụ để quản trị AWS ở quy mô doanh nghiệp.

---

## 📚 KIẾN THỨC ĐÃ HỌC

### 🔧 Security & Governance Services Mastered

1. **AWS WAF (Web Application Firewall)**
    - Triển khai Web ACLs để bảo vệ ứng dụng ở Layer 7.
    - Sử dụng các bộ quy tắc quản lý (Managed Rule Sets) của AWS để chống lại các mối đe dọa phổ biến trong OWASP Top 10.
    - Tích hợp WAF với CloudFront để bảo vệ tại lớp biên.
    - Phân tích log của WAF để điều tra các request bị chặn và xử lý false positives.

2. **AWS Shield**
    - Hiểu rõ sự khác biệt giữa Shield Standard (bảo vệ DDoS Layer 3/4 miễn phí, tự động) và Shield Advanced (bảo vệ nâng cao, có hỗ trợ từ chuyên gia và cost protection).

3. **Amazon GuardDuty**
    - Kích hoạt dịch vụ phát hiện mối đe dọa thông minh.
    - Phân tích các nguồn dữ liệu mà GuardDuty sử dụng:
        - VPC Flow Logs
        - DNS Logs
        - CloudTrail
    - Nhận diện và phân loại các Findings theo mức độ nghiêm trọng:
        - High
        - Medium
        - Low

4. **AWS Security Hub**
    - Kích hoạt và sử dụng như một trung tâm an ninh (single pane of glass).
    - Tổng hợp các phát hiện từ:
        - GuardDuty
        - IAM Access Analyzer
        - AWS Config
    - Đánh giá và cải thiện điểm tuân thủ (security score) dựa trên các tiêu chuẩn như:
        - AWS Foundational Security Best Practices

5. **AWS Config**
    - Triển khai dịch vụ để ghi lại lịch sử thay đổi cấu hình của tài nguyên AWS.
    - Sử dụng AWS Config Rules để tự động kiểm tra sự tuân thủ, ví dụ:
        - S3 bucket có public không
        - Volume EBS có được mã hóa không
    - Hiểu khái niệm "Compliance as Code".

6. **Disaster Recovery (DR) Concepts**
    - Phân biệt các chiến lược DR:
        - Backup & Restore
        - Pilot Light
        - Warm Standby
        - Multi-site
    - Nắm vững các chỉ số quan trọng:
        - RTO (Recovery Time Objective)
        - RPO (Recovery Point Objective)
    - Thực hành sao chép và khôi phục RDS snapshot qua các region khác nhau.

7. **AWS Organizations**
    - Tạo và quản lý một cấu trúc đa tài khoản.
    - Sử dụng Organizational Units (OUs) để nhóm các tài khoản theo chức năng.
    - Triển khai Service Control Policies (SCPs) để đặt ra các "lan can" bảo vệ (guardrails) cho các tài khoản thành viên.

### 💡 Advanced Concepts Learned

#### Defense in Depth

- Hiểu rõ triết lý xây dựng nhiều lớp phòng thủ. Tuần này đã triển khai:
    - Lớp biên:
        - WAF
        - Shield
    - Lớp hạ tầng:
        - GuardDuty
        - Security Groups
    - Lớp tuân thủ:
        - AWS Config

#### Proactive Security vs. Reactive Security

- Phân biệt giữa việc chủ động phát hiện mối đe dọa (GuardDuty) và việc phản ứng sau khi sự cố xảy ra.
- Tầm quan trọng của việc tự động hóa giám sát để giảm thời gian phát hiện.

#### Governance at Scale

- Cách các doanh nghiệp lớn sử dụng AWS Organizations và SCPs để quản lý hàng trăm, hàng nghìn tài khoản một cách nhất quán và an toàn.
- Phân biệt giữa:
    - IAM policy (cấp quyền)
    - SCP (giới hạn quyền tối đa)

### 🛠️ Technical Skills Enhanced

- **Security Analysis**: Đọc và phân tích các báo cáo, cảnh báo từ:
    - WAF
    - GuardDuty
    - Security Hub
- **Policy Implementation**: Viết và áp dụng các chính sách bảo mật:
    - WAF rules
    - SCPs
    - Config rules
- **Incident Response Planning**: Lập kế hoạch và thực hành các bước cơ bản trong một kịch bản DR.
- **Risk Assessment**: Đánh giá các rủi ro bảo mật và tuân thủ của một hệ thống cloud.

---

**📝 Prepared by:** Tran Nguyen Daenel  
**📅 Date:** 06/06/2025  
**🔄 Next Review:** 13/06/2025  
**📊 Week:** 4/12 of Internship Program  
**🎯 Progress:** Achieved DevOps Engineer foundation
