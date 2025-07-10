# **Dự án: ATHENABOT**
### **Giải pháp Chatbot AI Serverless với Amazon Bedrock**
Người soạn thảo: Nguyễn Minh Tân

## **1. Tóm tắt cho Ban Lãnh đạo (Executive Summary)**
### **1.1. Sứ mệnh Dự án**
Sứ mệnh của dự án "AthenaBot" là cách mạng hóa trải nghiệm hỗ trợ khách hàng của chúng ta bằng cách triển khai một giải pháp Trí tuệ Nhân tạo (AI) thông minh, tức thì và luôn sẵn sàng. Chúng tôi mong muốn chuyển đổi bộ phận hỗ trợ từ một trung tâm chi phí (cost center) thành một động lực thúc đẩy sự hài lòng và lòng trung thành của khách hàng.
### **1.2. Bối cảnh và Thách thức**
Trong bối cảnh thị trường cạnh tranh khốc liệt, trải nghiệm khách hàng đã trở thành yếu tố khác biệt hóa then chốt. Tuy nhiên, mô hình hỗ trợ hiện tại của chúng ta đang đối mặt với những thách thức nghiêm trọng. Phân tích cho thấy **75% trong số ~5,000 yêu cầu hàng tháng là các câu hỏi lặp lại ở cấp độ 1 (Tier-1)**. Tình trạng này không chỉ gây quá tải và giảm động lực cho nhân viên mà còn trực tiếp kéo dài thời gian chờ đợi của khách hàng, làm xói mòn chỉ số hài lòng (CSAT) và gia tăng chi phí vận hành một cách không cần thiết.
### **1.3. Giải pháp Đề xuất: "AthenaBot"**
Chúng tôi đề xuất triển khai **"AthenaBot"** – một chatbot AI thế hệ mới, được xây dựng hoàn toàn trên kiến trúc **Serverless** của AWS và khai thác sức mạnh của Trí tuệ Nhân tạo Tạo sinh (Generative AI) qua dịch vụ **Amazon Bedrock**. Giải pháp này sẽ cung cấp khả năng hỗ trợ khách hàng tức thì, chính xác và tự nhiên 24/7, giải quyết triệt để các vấn đề hiện tại.
### **1.4. Lợi ích Kinh doanh và Hoàn vốn (ROI)**
AthenaBot không chỉ là một cải tiến công nghệ, mà còn là một khoản đầu tư chiến lược mang lại lợi ích kinh doanh rõ rệt:

- **Giảm chi phí Vận hành:** Tự động hóa các yêu cầu cấp 1, dự kiến tiết kiệm hơn **200 giờ làm việc** của nhân viên mỗi tháng, tương đương giảm 25-30% khối lượng công việc cho nhân viên hỗ trợ.
- **Tăng Doanh thu:** Cải thiện sự hài lòng và cung cấp hỗ trợ tức thì giúp tăng tỷ lệ giữ chân khách hàng (retention rate), trực tiếp tác động tích cực đến doanh thu.
- **Tối ưu hóa Nguồn lực:** Giải phóng nhân viên khỏi các công việc đơn điệu, cho phép họ tập trung vào các vấn đề phức tạp, có giá trị cao hơn, từ đó nâng cao kỹ năng và sự gắn bó.
- **Hoàn vốn (ROI):** Với chi phí vận hành cực thấp (dưới $10/tháng), ROI của dự án gần như là tức thì và sẽ dương ngay trong tháng đầu tiên đi vào hoạt động.
### **1.5. Tổng quan Đầu tư và Thời gian**
- **Thời gian triển khai:** Dự án được thiết kế để hoàn thành nhanh chóng trong **6 tuần**.
- **Chi phí vận hành AWS:** Ước tính **dưới $10 mỗi tháng**, tận dụng tối đa Bậc miễn phí của AWS.
- **Nguồn lực:** Dự án sẽ được thực hiện bởi Nguyễn Minh Tân, không yêu cầu thêm nhân sự.
## **2. Phân tích Vấn đề (Problem Statement)**
### **2.1. Phân tích Tình hình Hiện tại và Quy trình làm việc**
Quy trình hỗ trợ hiện tại bắt đầu khi khách hàng gửi yêu cầu qua email hoặc live chat. Một nhân viên hỗ trợ (agent) sẽ tiếp nhận, phân loại, và trả lời. Đối với các câu hỏi đơn giản, quy trình này tỏ ra kém hiệu quả và tốn thời gian.

- **Luồng xử lý một yêu cầu cấp 1 (Tier-1):**
  - Khách hàng chờ trong hàng đợi (Queue).
  - Agent tiếp nhận ticket.
  - Agent đọc và xác định vấn đề.
  - Agent tìm kiếm câu trả lời trong tài liệu nội bộ.
  - Agent soạn và gửi câu trả lời.
  - Agent đóng ticket.

Toàn bộ quy trình này mất trung bình 10-15 phút cho một vấn đề mà lẽ ra có thể được giải quyết trong vài giây.
### **2.2. Các "Nỗi đau" (Pain Points) và Tác động Định lượng**

|**Nỗi đau**|**Phân tích chi tiết và Tác động**|
| :- | :- |
|**Thời gian chờ đợi cao**|Khách hàng phải chờ trung bình 15-20 phút trong giờ cao điểm. Tỷ lệ khách hàng từ bỏ cuộc trò chuyện trước khi được kết nối là 18%. Điều này trực tiếp làm giảm CSAT và tăng nguy cơ mất khách hàng vào tay đối thủ.|
|**Nhân viên quá tải**|Một agent phải xử lý trung bình 50-60 ticket mỗi ngày, trong đó phần lớn là các câu hỏi nhàm chán. Điều này dẫn đến tình trạng "burnout", với tỷ lệ nghỉ việc của bộ phận hỗ trợ cao hơn 30% so với các bộ phận khác.|
|**Chi phí vận hành cao**|Chi phí để xử lý một ticket cấp 1 ước tính là $3.5. Với ~3,750 ticket như vậy mỗi tháng, chúng ta đang chi hơn $13,000/tháng cho các công việc có thể tự động hóa hoàn toàn.|
|**Hỗ trợ giới hạn**|Dịch vụ chỉ hoạt động 8 giờ/ngày, 5 ngày/tuần. Chúng ta đang bỏ lỡ toàn bộ các tương tác với khách hàng ở các múi giờ khác hoặc những người cần hỗ trợ vào cuối tuần.|
### **2.3. Phân tích các Bên liên quan (Stakeholder Analysis)**

|**Bên liên quan**|**Mối quan tâm chính**|**Giải pháp của AthenaBot**|
| :- | :- | :- |
|**Khách hàng**|Cần câu trả lời nhanh, chính xác, 24/7.|Cung cấp hỗ trợ tức thì, mọi lúc, mọi nơi.|
|**Nhân viên Hỗ trợ**|Giảm tải công việc lặp lại, có cơ hội làm việc với các case phức tạp hơn.|Tự động hóa các câu hỏi cấp 1, đóng vai trò là trợ lý ảo.|
|**Trưởng phòng Hỗ trợ**|Cải thiện chỉ số CSAT, tối ưu hiệu suất đội ngũ, giảm chi phí.|Cung cấp công cụ để đạt được tất cả các mục tiêu trên.|
|**Ban Lãnh đạo**|Tăng ROI, nâng cao hình ảnh thương hiệu, tạo lợi thế cạnh tranh.|Là một dự án đầu tư thấp, lợi nhuận cao, mang tính chiến lược.|
### **2.4. Cơ hội Thị trường**
Theo một nghiên cứu của Gartner, 70% khách hàng hiện nay sử dụng các kênh tự phục vụ (self-service) trong quá trình mua hàng. Việc triển khai chatbot AI không chỉ giúp chúng ta bắt kịp xu hướng này mà còn vượt lên trên các đối thủ còn đang sử dụng các hệ thống live chat truyền thống. Đây là cơ hội để khẳng định vị thế là một thương hiệu hiện đại, luôn đặt khách hàng làm trung tâm.
## **3. Kiến trúc Giải pháp (Solution Architecture)**
### **3.1. Sơ đồ Kiến trúc Tổng thể**
Giải pháp được thiết kế hoàn toàn trên nền tảng Serverless để đảm bảo hiệu suất, khả năng mở rộng và tối ưu chi phí.

graph LR
    subgraph "User Interaction"
        direction LR
        User([fa:fa-user User])
    end

    subgraph "Frontend (Optional)"
        direction TB
        S3["fa:fa-archive S3 Static Site"]
        Amplify["fa:fa-cloud-upload-alt Amplify Hosting"]
    end

    subgraph "AWS Cloud"
        direction LR
        APIGW[("fa:fa-network-wired API Gateway")]
        Lambda["fa:fa-microchip Lambda Function"]
        Bedrock["fa:fa-brain Bedrock (Titan)"]
        IAM["fa:fa-key IAM Role"]

        APIGW -- "invoke (IAM auth)" --> Lambda
        Lambda -- "invoke Titan model" --> Bedrock
        Lambda -. "assume role" .-> IAM
        Lambda -- response --> APIGW
    end

    User -- "interact" --> S3
    User -- "interact" --> Amplify
    S3 -- "HTTPS request" --> APIGW
    Amplify -- "HTTPS request" --> APIGW
    APIGW -- response --> S3
    APIGW -- response --> Amplify

    User -- "direct API call" --> APIGW



### **3.2. Phân rã và Lý giải các Dịch vụ**
- **Frontend - Amazon S3 / AWS Amplify:**
  - **Vai trò:** Lưu trữ và phân phối các tệp tĩnh (HTML, CSS, JavaScript) của giao diện chatbot đến người dùng cuối.
  - **Lý do chọn:** Cung cấp độ bền dữ liệu lên tới 99.999999999%, khả năng mở rộng toàn cầu thông qua tích hợp với CloudFront, và chi phí cực thấp. AWS Amplify đơn giản hóa hơn nữa quy trình CI/CD cho frontend.
- **API Layer - Amazon API Gateway:**
  - **Vai trò:** Đóng vai trò là một cổng vào an toàn, đáng tin cậy. Nó tiếp nhận các yêu cầu HTTPS từ frontend, xác thực chúng và chuyển tiếp đến backend.
  - **Lý do chọn:** Hoàn toàn được quản lý, tự động co giãn. Cung cấp các tính năng quan trọng như throttling (điều tiết lưu lượng), caching, và cấu hình CORS. Tốt hơn Application Load Balancer cho các ứng dụng serverless vì nó tích hợp trực tiếp với Lambda.
- **Compute Layer - AWS Lambda:**
  - **Vai trò:** Là "bộ não" xử lý logic của ứng dụng. Mã nguồn Python trong Lambda sẽ nhận yêu cầu, xây dựng prompt, gọi đến Amazon Bedrock, xử lý phản hồi và trả kết quả.
  - **Lý do chọn:** Đây là cốt lõi của kiến trúc serverless. Chúng ta chỉ trả tiền cho mỗi mili giây thực thi, không tốn chi phí khi không có yêu cầu. Tự động co giãn từ 0 đến hàng ngàn yêu cầu đồng thời. Tối ưu hơn EC2 vì không cần quản lý HĐH, patching hay scaling.
- **AI Layer - Amazon Bedrock:**
  - **Vai trò:** Cung cấp quyền truy cập vào các Mô hình Nền tảng (Foundation Models) hàng đầu thông qua một API duy nhất.
  - **Lý do chọn:** Loại bỏ hoàn toàn sự phức tạp của việc xây dựng, huấn luyện và triển khai các mô hình AI. Cho phép dễ dàng thử nghiệm và chuyển đổi giữa các model (ví dụ: Amazon Titan, Anthropic Claude) để tìm ra lựa chọn tối ưu nhất về chi phí và hiệu suất.
- **Security Layer - AWS IAM (Identity and Access Management):**
  - **Vai trò:** Quản lý quyền truy cập một cách chi tiết. Chúng tôi sẽ tạo một IAM Role riêng cho hàm Lambda, tuân thủ nguyên tắc đặc quyền tối thiểu (principle of least privilege).
  - **Lý do chọn:** Cung cấp cơ chế bảo mật nền tảng và bắt buộc của AWS, đảm bảo Lambda chỉ có thể thực hiện những hành động đã được cho phép một cách tường minh.
### **3.3. Luồng Dữ liệu và Bảo mật**
1. **Request (Mã hóa TLS 1.2/1.3):** Người dùng gửi tin nhắn. Frontend tạo một yêu cầu HTTPS POST đến API Gateway.
1. **Authentication:** API Gateway xác thực yêu cầu (có thể sử dụng IAM hoặc các phương thức khác như Cognito).
1. **Invocation:** API Gateway kích hoạt hàm Lambda một cách đồng bộ.
1. **Authorization:** Lambda đảm nhận (assume) IAM Role đã được định cấu hình.
1. **AI Processing:** Lambda gửi yêu cầu đến API endpoint của Bedrock. Mọi giao tiếp trong mạng nội bộ của AWS đều được mã hóa.
1. **Response (Mã hóa TLS 1.2/1.3):** Luồng dữ liệu đi ngược lại và trả kết quả về cho người dùng.

Dữ liệu được mã hóa cả khi đang truyền (in-transit) và khi lưu trữ (at-rest) trên S3.
## **4. Kế hoạch Triển khai Kỹ thuật (Technical Implementation)**
### **4.1. Lộ trình Triển khai Chi tiết**
- **Giai đoạn 1: Nền tảng & Backend (Tuần 1-2)**
  - **Deliverables:** Môi trường AWS, IAM Role, hàm Lambda phiên bản đầu tiên, kịch bản unit test.
  - **Công cụ:** AWS Management Console, AWS CLI, Python, pytest.
- **Giai đoạn 2: API & Frontend (Tuần 3-4)**
  - **Deliverables:** API Gateway endpoint hoạt động, giao diện chat (HTML/CSS/JS), kịch bản tích hợp API.
  - **Công cụ:** Postman, Visual Studio Code.
- **Giai đoạn 3: Tích hợp & Thử nghiệm (Tuần 5)**
  - **Deliverables:** Hệ thống hoàn chỉnh được triển khai trên môi trường staging, báo cáo kết quả test, danh sách các lỗi đã sửa.
  - **Công cụ:** Selenium/Cypress (cho E2E testing).
- **Giai đoạn 4: Ra mắt & Tối ưu (Tuần 6)**
  - **Deliverables:** Hệ thống trên môi trường production, tài liệu hướng dẫn, kế hoạch giám sát.
  - **Công cụ:** Amazon CloudWatch Dashboards.
### **4.2. Phương pháp Phát triển và CI/CD**
Chúng tôi sẽ áp dụng phương pháp Agile/Scrum với các sprint kéo dài 1 tuần. Việc triển khai sẽ được tự động hóa bằng cách sử dụng **AWS SAM (Serverless Application Model)** hoặc **Terraform** để quản lý hạ tầng dưới dạng mã (Infrastructure as Code - IaC). Một quy trình CI/CD đơn giản sử dụng **GitHub Actions** sẽ được thiết lập để tự động triển khai các thay đổi lên môi trường staging và production.
### **4.3. Chiến lược Kiểm thử Toàn diện**
- **Unit Testing:** Sử dụng pytest và moto để kiểm tra logic của hàm Lambda một cách độc lập mà không cần gọi đến các dịch vụ AWS thực.
- **Integration Testing:** Sử dụng Postman hoặc các kịch bản tự động để kiểm tra luồng từ API Gateway đến Lambda.
- **End-to-End (E2E) Testing:** Sử dụng Selenium hoặc Cypress để giả lập hành vi của người dùng trên giao diện web, đảm bảo toàn bộ hệ thống hoạt động chính xác.
- **Performance Testing:** (Tùy chọn) Sử dụng các công cụ như Artillery.io để kiểm tra khả năng chịu tải của API Gateway và Lambda.
## **5. Thời gian và Cột mốc (Timeline & Milestones)**
### **5.1. Sơ đồ Gantt Chi tiết**





|**ID**|**Nhiệm vụ**|**Tuần 1**|**Tuần 2**|**Tuần 3**|**Tuần 4**|**Tuần 5**|**Tuần 6**|
| :- | :- | :- | :- | :- | :- | :- | :- |
|**1**|**Giai đoạn 1: Backend**|||||||
|1\.1|Thiết lập AWS, IAM|██||||||
|1\.2|Phát triển Lambda v1|████|████|||||
|**2**|**Giai đoạn 2: API & Frontend**|||||||
|2\.1|Cấu hình API Gateway|||██||||
|2\.2|Phát triển Giao diện|||████|████|||
|**3**|**Giai đoạn 3: Thử nghiệm**|||||||
|3\.1|Tích hợp & Sửa lỗi|||||████||
|3\.2|User Acceptance Test||||||██|
|**4**|**Giai đoạn 4: Ra mắt**|||||||
|4\.1|Triển khai Production|||||||
|4\.2|Giám sát & Bàn giao|||||||
### **5.2. Các Phụ thuộc và Đường găng (Critical Path)**
- Việc phát triển Frontend (2.2) phụ thuộc vào việc hoàn thành API Gateway (2.1).
- Việc tích hợp (3.1) phụ thuộc vào việc hoàn thành cả Backend (1.2) và Frontend (2.2).
- **Đường găng của dự án** là chuỗi các nhiệm vụ: 1.1 -> 1.2 -> 2.1 -> 2.2 -> 3.1 -> 4.1. Bất kỳ sự chậm trễ nào trên đường găng này sẽ ảnh hưởng đến toàn bộ tiến độ dự án.
## **6. Ước tính Ngân sách (Budget Estimation)**
### **6.1. Phân tích Chi phí Hạ tầng AWS Chi tiết**
Phân tích dưới đây dựa trên ước tính 2,000 cuộc hội thoại mỗi tháng.

|**Dịch vụ**|**Bậc miễn phí**|**Mức sử dụng ước tính**|**Chi phí ước tính**|
| :- | :- | :- | :- |
|**AWS Lambda**|1 triệu yêu cầu/tháng|2,000 yêu cầu|**$0**|
|**API Gateway**|1 triệu yêu cầu/tháng|2,000 yêu cầu|**$0**|
|**Amazon S3**|5 GB lưu trữ|< 1 GB|**~$0.10**|
|**Amazon Bedrock**|Không có|4 triệu tokens|**~$6.00**|
|**CloudWatch**|1 triệu yêu cầu API|< 100,000 yêu cầu|**$0**|
|**TỔNG CỘNG**|||**< $10 / tháng**|
### **6.2. Phân tích Hoàn vốn (ROI) Chi tiết**
- **Chi phí hàng tháng (Cost):** ~$10
- **Lợi ích hàng tháng (Benefit):**
  - Tiết kiệm chi phí nhân sự: ~208 giờ/tháng. Giả sử lương trung bình của agent là $15/giờ, lợi ích là **$3,120**.
  - Giảm chi phí tuyển dụng do giảm tỷ lệ nghỉ việc.
  - Tăng doanh thu từ việc cải thiện tỷ lệ giữ chân khách hàng (khó định lượng nhưng có giá trị cao).
- **ROI (hàng tháng) = (Lợi ích - Chi phí) / Chi phí = ($3120 - $10) / $10 ≈ 31,100%**

Con số ROI cực kỳ cao cho thấy đây là một khoản đầu tư hiệu quả vượt trội.
### **6.3. Chiến lược Tối ưu Chi phí**
- Sử dụng các model tiết kiệm nhất trên Bedrock (như Claude 3 Haiku) cho các tác vụ thông thường.
- Cấu hình Lambda với kiến trúc ARM (Graviton2) để có hiệu suất giá tốt hơn.
- Sử dụng Lambda SnapStart để giảm thiểu cold start mà không cần dùng Provisioned Concurrency tốn kém.
## **7. Đánh giá Rủi ro (Risk Assessment)**
### **7.1. Ma trận Rủi ro Chi tiết**

|**Rủi ro**|**Mức độ**|**Khả năng**|**Phân tích và Giải pháp Giảm thiểu**|
| :- | :- | :- | :- |
|**Kỹ thuật:** AI trả lời không chính xác (Hallucination)|Cao|Trung bình|**Giảm thiểu:** Sử dụng kỹ thuật Prompt Engineering (cung cấp ngữ cảnh rõ ràng, hướng dẫn model trả lời). **Dự phòng:** Nếu AI không chắc chắn, cung cấp một nút để khách hàng dễ dàng kết nối với người thật.|
|**Kỹ thuật:** Tăng độ trễ do Lambda cold start|Trung bình|Thấp|**Giảm thiểu:** Tối ưu hóa code, sử dụng Lambda SnapStart. **Dự phòng:** Nếu độ trễ vẫn ảnh hưởng trải nghiệm, cấu hình một lượng nhỏ Provisioned Concurrency trong giờ cao điểm.|
|**Vận hành:** Chi phí Bedrock vượt dự kiến|Thấp|Thấp|**Giảm thiểu:** Thiết lập AWS Budgets để gửi cảnh báo khi chi phí đạt 50%, 80%, 100% ngân sách. **Dự phòng:** Tạm thời giới hạn số lượng yêu cầu API nếu cần.|
|**Kinh doanh:** Người dùng không chấp nhận chatbot|Trung bình|Thấp|**Giảm thiểu:** Thiết kế giao diện (UX) thân thiện, đơn giản. Quảng bá tính năng và lợi ích cho khách hàng. Đảm bảo chatbot thực sự hữu ích ngay từ đầu.|
|**Bảo mật:** Lỗ hổng trong mã nguồn hoặc cấu hình|Cao|Thấp|**Giảm thiểu:** Tuân thủ nguyên tắc đặc quyền tối thiểu. Sử dụng các công cụ quét mã nguồn (SAST) và quét hạ tầng (IaC scanning). Thường xuyên review cấu hình IAM.|
## **8. Kết quả Mong đợi (Expected Outcomes)**
### **8.1. Các chỉ số Thành công và Phương pháp Đo lường**

|**Chỉ số**|**Mục tiêu**|**Phương pháp Đo lường**|
| :- | :- | :- |
|**Tỷ lệ Tự động hóa**|Xử lý tự động 25% tổng số ticket|Dashboard trên CloudWatch/QuickSight, phân tích log từ hệ thống hỗ trợ.|
|**Điểm CSAT**|Tăng từ 3.5/5 lên 4.0/5|Khảo sát ngắn gọn sau mỗi cuộc trò chuyện với chatbot.|
|**Thời gian Phản hồi TB**|< 2 giây|Amazon CloudWatch Metrics cho API Gateway và Lambda.|
|**Tỷ lệ Uptime**|> 99.9%|Amazon CloudWatch Synthetics để liên tục kiểm tra endpoint.|
### **8.2. Giá trị Chiến lược và Lợi thế Cạnh tranh**
"AthenaBot" không chỉ là một dự án công nghệ đơn lẻ. Nó đặt nền móng cho một chiến lược lớn hơn về tự động hóa và ứng dụng AI trong toàn bộ hoạt động của công ty.

- **Ngắn hạn (0-6 tháng):** Đạt được các mục tiêu về chi phí và hiệu suất đã đề ra. Tạo ra một câu chuyện thành công (success story) để thúc đẩy văn hóa đổi mới.
- **Trung hạn (6-18 tháng):** Mở rộng khả năng của chatbot để xử lý các tác vụ phức tạp hơn (ví dụ: tích hợp với hệ thống CRM để tra cứu đơn hàng). Phân tích dữ liệu từ các cuộc trò chuyện để tìm ra các vấn đề phổ biến của sản phẩm.
- **Dài hạn (18+ tháng):** Xây dựng một nền tảng AI toàn diện. Mở rộng sang các kênh khác như Voicebot. Sử dụng AI để dự đoán các vấn đề của khách hàng trước khi chúng xảy ra. Đây chính là lợi thế cạnh tranh bền vững trong kỷ nguyên số.
