# Worklog - Ngày 05/06/2025

## 📅 Thông tin cơ bản

- **Ngày:** 05/06/2025  
- **Thứ:** Thứ Năm  
- **Tuần thực tập:** Tuần thứ 4/12  
- **Thời gian làm việc:** 8:30 - 17:30  
- **Mood:** ⛈️ Preparing for a rainy day.

---

## 🎯 Mục tiêu ngày hôm nay

- [x] Hiểu các khái niệm RTO (Recovery Time Objective) và RPO (Recovery Point Objective).
- [x] Tìm hiểu 4 chiến lược DR chính trên AWS (Backup & Restore, Pilot Light, Warm Standby, Multi-site).
- [x] Thực hành sao chép RDS snapshot qua một region khác.
- [x] Khôi phục database từ snapshot ở region DR.

---

## 💼 Công việc đã thực hiện

### 1. Disaster Recovery Theory ⏱️ 8:30-10:30

**Mô tả:**
- Đọc Whitepaper của AWS về DR.
- Tìm hiểu chi tiết về từng chiến lược,  
    so sánh chi phí và độ phức tạp.
- Xác định RTO/RPO phù hợp  
    cho các loại ứng dụng khác nhau.

**Kết quả:**
- Nắm vững lý thuyết về việc xây dựng  
    kiến trúc có khả năng phục hồi.

**Tools/Tech:**  
    - AWS Well-Architected Framework.

---

### 2. Cross-Region RDS Snapshot Lab ⏱️ 10:30-12:30, 13:30-16:30

**Mô tả:**
- Vào RDS console,  
    tạo một snapshot thủ công cho database instance.
- Chọn snapshot và thực hiện hành động "Copy snapshot".  
    Chọn một region khác làm đích.
- Sau khi copy xong, chuyển sang region DR.
- Tìm snapshot và thực hiện "Restore snapshot"  
    để tạo ra một database instance mới.

**Kết quả:**
- Database đã được khôi phục thành công  
    ở một region hoàn toàn khác.
- Chứng minh được tính khả thi  
    của chiến lược Backup & Restore.

**Tools/Tech:**  
    - Amazon RDS.

---

## 📚 Kiến thức học được

- **Technical Skills:**  
    - Cross-region snapshot copy/restore  
    - RTO/RPO analysis
- **Concepts & Theory:**  
    - Disaster Recovery  
    - High Availability (vs DR)  
    - Data Sovereignty
- **Soft Skills:**  
    - Lập kế hoạch cho rủi ro  
    - Tư duy chiến lược

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề:**  
    Việc khôi phục database chỉ là một phần.  
    Toàn bộ ứng dụng (ECS, ALB, code)  
    cũng cần được triển khai ở region DR.  
    Làm thủ công rất tốn thời gian.
- **Giải pháp:**  
    Đây chính là lúc IaC (code CDK đã viết)  
    phát huy sức mạnh.  
    Có thể chạy lại `cdk deploy` ở region mới  
    để tạo lại toàn bộ hạ tầng ứng dụng một cách nhanh chóng.  
    Chỉ cần thay đổi endpoint của database trong cấu hình.

---

## 💭 Reflection & Insights

**Key Insight:**  
Một kế hoạch Disaster Recovery chưa được kiểm thử  
thì không phải là kế hoạch, mà chỉ là một hy vọng.  
Việc thực hành restore là cực kỳ quan trọng.

---

## 📋 Kế hoạch ngày mai

- **High:**  
    Tìm hiểu về kiến trúc đa tài khoản với AWS Organizations.
- **Medium:**  
    Thử nghiệm Service Control Policies (SCPs).
- **Low:**  
    Tổng kết tuần và viết báo cáo.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 05/06/2025*