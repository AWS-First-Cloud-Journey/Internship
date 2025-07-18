Worklog - Ngày 10/09/2025
📅 Thông tin cơ bản
Ngày: 10/09/2025

Thứ: Thứ Tư

Tuần thực tập: Tuần thứ 9/10

Thời gian làm việc: 9:00 - 17:00

Mood: 🛡️ Thinking like an attacker.

🎯 Mục tiêu ngày hôm nay
[x] Hiểu về các loại kiểm thử bảo mật ứng dụng (SAST, DAST, IAST).

[x] Cài đặt và sử dụng công cụ DAST mã nguồn mở OWASP ZAP.

[x] Chạy một bài quét tự động (automated scan) trên trang web.

[x] Phân tích và đánh giá các lỗ hổng được tìm thấy.

💼 Công việc đã thực hiện
1. Application Security Testing Concepts ⏱️ 2.5 giờ
Mô tả: Đọc và tìm hiểu về các phương pháp kiểm thử bảo mật. Tập trung vào DAST (Dynamic Application Security Testing) - phương pháp kiểm thử ứng dụng khi nó đang chạy.

Kết quả: Hiểu được vị trí và mục đích của DAST trong quy trình DevSecOps.

2. Running a DAST Scan with OWASP ZAP ⏱️ 5 giờ
Mô tả:

Cài đặt OWASP ZAP.

Cấu hình ZAP để "tấn công" URL của trang web đang chạy trên môi trường staging.

Chạy chế độ "Automated Scan". ZAP sẽ tự động "crawl" trang web để tìm các trang và API, sau đó thực hiện các bài tấn công mẫu.

Xem báo cáo được ZAP tạo ra.

Kết quả:

ZAP phát hiện một vài lỗ hổng ở mức độ thấp và trung bình, ví dụ: thiếu các security header như Content-Security-Policy, X-Frame-Options.

Tools/Tech: OWASP ZAP.

Links: [ZAP Scan Report]

📚 Kiến thức học được
🔧 Technical Skills
DevSecOps: Dynamic Application Security Testing (DAST).

Security Tools: OWASP ZAP.

💡 Concepts & Theory
New Concepts: SAST, DAST, IAST, Common web vulnerabilities.

🚧 Khó khăn và giải pháp
Vấn đề 1: Kết quả quét có nhiều cảnh báo "False Positive".

Mô tả: ZAP báo cáo một vài vấn đề không thực sự là lỗ hổng trong bối cảnh của ứng dụng.

Solution: Học cách tạo một "Context" trong ZAP, định nghĩa các scope và loại trừ các URL không cần quét. Đọc kỹ mô tả của từng cảnh báo để hiểu rõ rủi ro thay vì tin tưởng mù quáng vào công cụ.

Lesson: Các công cụ quét tự động rất hữu ích, nhưng chúng không thể thay thế hoàn toàn sự phán đoán của con người.

💭 Reflection & Insights
Key Insights: Security testing không chỉ là việc của đội bảo mật. Việc tích hợp các công cụ quét tự động vào quy trình cho phép các kỹ sư DevOps có thể phát hiện và khắc phục các vấn đề bảo mật cơ bản từ sớm.

📋 Kế hoạch ngày mai
High: Tìm hiểu về Chaos Engineering nâng cao với AWS Fault Injection Simulator (FIS).

Medium: Thiết kế và chạy một thí nghiệm chaos tự động.