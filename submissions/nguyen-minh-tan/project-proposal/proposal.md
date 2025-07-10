# 🚀 Đề xuất Dự án: Xây dựng Chatbot AI Thông minh với Kiến trúc Serverless trên AWS

**Tên dự án:** "AthenaBot" - Chatbot Hỗ trợ Khách hàng Thông minh
**Ngày:** 08/07/2025
**Người soạn thảo:** Nguyễn Minh Tân
---

## 1. 📋 Tóm tắt cho Ban Lãnh đạo (Executive Summary)

Bản đề xuất này trình bày kế hoạch phát triển và triển khai **"AthenaBot"**, một chatbot AI thế hệ mới, nhằm giải quyết vấn đề quá tải và thiếu hiệu quả trong hoạt động hỗ trợ khách hàng. Tận dụng sức mạnh của Trí tuệ Nhân tạo Tạo sinh (Generative AI) qua dịch vụ **Amazon Bedrock** và xây dựng trên nền tảng **Serverless** của AWS, chúng tôi sẽ tạo ra một giải pháp cung cấp câu trả lời tức thì, chính xác 24/7.

- **Vấn đề cốt lõi:** Đội ngũ hỗ trợ đang xử lý một khối lượng lớn các câu hỏi lặp đi lặp lại (70-80%), dẫn đến thời gian chờ của khách hàng kéo dài, giảm chỉ số hài lòng (CSAT) và tăng chi phí vận hành.
- **Giải pháp đề xuất:** Một kiến trúc serverless gồm **Amazon S3** (frontend), **API Gateway**, **AWS Lambda** (logic), và **Amazon Bedrock** (bộ não AI).
- **Lợi ích kinh doanh:**
    - **Giảm chi phí:** Giảm **25-30%** khối lượng công việc cho nhân viên hỗ trợ cấp 1.
    - **Tăng hài lòng khách hàng:** Hỗ trợ tức thì, giảm thời gian chờ.
    - **Khả năng mở rộng:** Tự động đáp ứng mọi lưu lượng truy cập.
- **Đầu tư và Thời gian:** Chi phí vận hành dự kiến dưới **$10/tháng**. Dự án hoàn thành trong **6 tuần**.
- **Chỉ số thành công:** Giảm số lượng ticket, cải thiện thời gian phản hồi, tăng điểm CSAT.

---

## 2. 🎯 Phân tích Vấn đề (Problem Statement)

### Tình hình hiện tại (Current Situation)
Đội ngũ hỗ trợ khách hàng đang xử lý trung bình **5,000 yêu cầu/tháng**. Phân tích cho thấy khoảng **75%** là các câu hỏi lặp đi lặp lại (Tier-1) như chính sách đổi trả, theo dõi đơn hàng, phương thức thanh toán.

### Thách thức chính (Key Challenges & Pain Points)
- **Thời gian chờ đợi cao:** Khách hàng chờ 15-20 phút trong giờ cao điểm.
- **Giảm hiệu suất nhân viên:** Nhân viên tốn thời gian cho các tác vụ lặp lại.
- **Chi phí vận hành cao:** Tốn kém để duy trì đội ngũ hỗ trợ lớn cho các yêu cầu Tier-1.
- **Trải nghiệm không nhất quán:** Chất lượng câu trả lời phụ thuộc vào nhân viên.
- **Hỗ trợ giới hạn:** Bỏ lỡ cơ hội tương tác với khách hàng ngoài giờ hành chính.

### Các bên liên quan bị ảnh hưởng (Stakeholder Impact)
- **Khách hàng:** Thất vọng vì chờ đợi lâu.
- **Nhân viên hỗ trợ:** Quá tải, nhàm chán, giảm động lực.
- **Ban Quản lý:** Áp lực về chi phí và nguy cơ mất khách hàng.

### Hậu quả kinh doanh nếu không hành động (Business Consequences)
Chi phí vận hành sẽ tiếp tục tăng. Sự hài lòng của khách hàng sẽ giảm, dẫn đến tỷ lệ rời bỏ (churn rate) cao hơn và ảnh hưởng tiêu cực đến danh tiếng thương hiệu.

---

## 3. 🏗️ Kiến trúc Giải pháp (Solution Architecture)
  Kiến trúc của dự án hoàn toàn không máy chủ (serverless), đảm bảo khả năng mở rộng linh hoạt, hiệu suất cao và tối ưu chi phí.

                               +------------------------------------------------------------------+
                               |                            AWS CLOUD                             |
                               |                                                                  |
                               |                                        +-----------------+       |
                               |          invoke Titan model            |                 |       |
                               |        +-----------------------------> | Bedrock (Titan) |       |
                               |        |                               |                 |       |
+-----------+                  | +----------------+      +---------+   | +-----------------+       |
|           | -- HTTPS req --> |                |      |         | --+                         |
| Frontend  |                  |   API Gateway  |--invoke->| Lambda  |                             |
| S3/Amplify| <-- response --  |                |      |         | --+                         |
+-----------+                  | +----------------+      +---------+   | +-----------------+       |
      ^                        |        ^                       |       |                 |       |
      |                        |        |                       |       |    IAM Role     |       |
      | interact               |        | direct call           +------>|                 |       |
      |                        |        |                       assume role +-----------------+       |
+------+------+                |        |                                                                  |
|             |                |        +------------------------------------------------------------------+
|    User     |----------------+
|             |
+-------------+

### Lựa chọn dịch vụ AWS (AWS Services Selection)
- **Amazon S3 / AWS Amplify Hosting:** Host frontend tĩnh với chi phí thấp, an toàn.
- **Amazon API Gateway:** Quản lý traffic, xác thực, và là cổng vào serverless.
- **AWS Lambda:** Xử lý logic nghiệp vụ mà không cần quản lý máy chủ, tự động co giãn.
- **Amazon Bedrock:** Truy cập các mô hình AI mạnh mẽ mà không cần tự xây dựng hay quản lý.
- **AWS IAM:** Quản lý quyền truy cập an toàn theo nguyên tắc đặc quyền tối thiểu.
- **Amazon CloudWatch:** Giám sát, ghi log và gỡ lỗi tự động.

### Kiến trúc bảo mật (Security Architecture)
- **Mã hóa:** Toàn bộ dữ liệu được mã hóa khi truyền (HTTPS) và khi lưu trữ (at-rest).
- **Quản lý truy cập:** Quyền truy cập được quản lý chặt chẽ bằng **IAM Roles** để đảm bảo các thành phần chỉ có quyền hạn cần thiết.

### Khả năng mở rộng (Scalability Design)
- Toàn bộ kiến trúc đều dựa trên các dịch vụ Serverless của AWS, có khả năng tự động co giãn từ 0 đến hàng triệu yêu cầu mà không cần can thiệp thủ công.

---

## 4. 🔧 Kế hoạch Triển khai Kỹ thuật (Technical Implementation)

### Các giai đoạn triển khai (Implementation Phases)
- **Giai đoạn 1: Nền tảng & Backend (Tuần 1-2):** Thiết lập AWS, IAM Roles, và phát triển hàm Lambda (Python) tích hợp với Bedrock.
- **Giai đoạn 2: API & Frontend (Tuần 3-4):** Cấu hình API Gateway và xây dựng giao diện người dùng (HTML, CSS, JS).
- **Giai đoạn 3: Tích hợp & Thử nghiệm (Tuần 5):** Deploy frontend, thực hiện end-to-end testing và UAT.
- **Giai đoạn 4: Triển khai & Tối ưu (Tuần 6):** Ra mắt chính thức, giám sát và cải tiến.

### Phương pháp phát triển (Development Approach)
Sử dụng phương pháp **Agile**, tập trung vào việc tạo ra sản phẩm khả dụng tối thiểu (MVP) và cải tiến dần.

### Chiến lược thử nghiệm (Testing Strategy)
- **Unit Testing:** Kiểm tra từng hàm trong Lambda.
- **Integration Testing:** Đảm bảo luồng từ Frontend -> API Gateway -> Lambda -> Bedrock hoạt động trơn tru.
- **User Acceptance Testing (UAT):** Lấy phản hồi từ các bên liên quan.

---

## 5. 🗓️ Thời gian và Cột mốc (Timeline & Milestones)

| Tuần | Hoạt động chính | Cột mốc (Milestone) |
| :--- | :--- | :--- |
| **1** | Lập kế hoạch, phân tích, thiết lập môi trường AWS, IAM. | Môi trường AWS sẵn sàng, IAM Role được tạo. |
| **2** | Phát triển và unit test hàm Lambda. | Hàm Lambda có thể gọi Bedrock thành công. |
| **3** | Xây dựng API Gateway, bắt đầu phát triển Frontend. | API endpoint hoạt động, có thể gọi từ Postman. |
| **4** | Hoàn thiện Frontend và tích hợp với API. | Giao diện Chatbot hoàn chỉnh, gửi/nhận tin nhắn. |
| **5** | Thử nghiệm tích hợp, UAT, sửa lỗi. | Hệ thống hoạt động ổn định, sẵn sàng triển khai. |
| **6** | Triển khai chính thức, giám sát và bàn giao. | Chatbot "Go-live" trên trang web công ty. |

---

## 6. 💰 Ước tính Ngân sách (Budget Estimation)

### Chi phí hạ tầng (Infrastructure Costs)
- **AWS Lambda, API Gateway, S3:** Nằm trong bậc miễn phí với quy mô ban đầu. *Chi phí dự kiến: ~$0.1/tháng*.
- **Amazon Bedrock (Claude 3 Haiku):**
  - Giả sử: 2,000 cuộc hội thoại/tháng, 2,000 token/cuộc.
  - Chi phí: `(4,000,000 / 1000) * $0.0015 = $6/tháng`.
> **TỔNG CHI PHÍ AWS HÀNG THÁNG ƯỚC TÍNH: < $10**

### Chi phí phát triển (Development Costs)
*N/A (Thực hiện trong khuôn khổ workshop tốt nghiệp).*

### Phân tích Hoàn vốn (ROI Analysis)
- **Thời gian tiết kiệm:** Chatbot xử lý 1,250 yêu cầu/tháng (25% tổng số) sẽ tiết kiệm ≈ **208 giờ làm việc/tháng**.
- **Hoàn vốn:** Với chi phí vận hành cực thấp, ROI gần như tức thì, giải phóng nguồn lực con người cho các công việc có giá trị cao hơn.

---

## 7. ⚠️ Đánh giá Rủi ro (Risk Assessment)

| Rủi ro | Mức độ | Khả năng | Chiến lược giảm thiểu (Mitigation Strategy) |
| :--- | :--- | :--- | :--- |
| **Kỹ thuật:** AI trả lời không chính xác (ảo giác) | Cao | Trung bình | Prompt engineering kỹ lưỡng, cung cấp ngữ cảnh rõ ràng, có cơ chế chuyển cho người thật. |
| **Kỹ thuật:** Tăng độ trễ do Lambda cold start | Trung bình | Thấp | Sử dụng Provisioned Concurrency nếu cần thiết sau khi đo lường thực tế. |
| **Kinh doanh:** Người dùng không chấp nhận chatbot | Trung bình | Thấp | Thiết kế UX thân thiện, quảng bá tính năng, đảm bảo chatbot thực sự hữu ích. |
| **Vận hành:** Chi phí Bedrock vượt dự kiến | Thấp | Thấp | Thiết lập AWS Budgets để cảnh báo khi chi phí vượt ngưỡng. Chọn model tiết kiệm. |

---

## 8. 📈 Kết quả mong đợi (Expected Outcomes)

### Các chỉ số thành công (Success Metrics)
- **Kinh doanh:**
  - Giảm **25%** số lượng ticket hỗ trợ Tier-1 trong 6 tháng.
  - Tăng chỉ số CSAT lên **15%**.
  - Thời gian phản hồi trung bình cho câu hỏi phổ biến < 10 giây.
- **Kỹ thuật:**
  - Uptime hệ thống > 99.9%.
  - Độ trễ end-to-end < 2 giây.
  - Tỷ lệ xử lý thành công của chatbot > 95%.

### Lợi ích kinh doanh (Business Benefits)
- **Ngắn hạn (0-6 tháng):** Giảm tải tức thì cho đội ngũ hỗ trợ, cải thiện trải nghiệm khách hàng với hỗ trợ 24/7.
- **Trung hạn (6-18 tháng):** Tăng tỷ lệ giữ chân khách hàng, thu thập dữ liệu để cải thiện sản phẩm.
- **Dài hạn (18+ tháng):** Khẳng định vị thế tiên phong về công nghệ, sử dụng chatbot làm kênh bán hàng và marketing tự động.

### Cải thiện Trải nghiệm Người dùng (User Experience Improvements)
- Khách hàng nhận được câu trả lời ngay lập tức.
- Giao diện thân thiện, dễ sử dụng, hỗ trợ đa nền tảng.

### Năng lực chiến lược đạt được (Strategic Capabilities Gained)
- Xây dựng năng lực nội bộ về phát triển ứng dụng AI và Serverless.
- Tạo ra nền tảng công nghệ linh hoạt để mở rộng cho các dự án AI trong tương lai.