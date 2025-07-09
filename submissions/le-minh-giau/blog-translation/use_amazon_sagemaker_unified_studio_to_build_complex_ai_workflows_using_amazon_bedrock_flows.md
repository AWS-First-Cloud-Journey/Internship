# Ứng dụng Amazon SageMaker Unified Studio để thiết kế quy trình AI phức tạp với Amazon Bedrock Flows

> **📖 Bài gốc**: [Use Amazon SageMaker Unified Studio to build complex AI workflows using Amazon Bedrock Flows](https://aws.amazon.com/vi/blogs/machine-learning/use-amazon-sagemaker-unified-studio-to-build-complex-ai-workflows-using-amazon-bedrock-flows/)  
> **👤 Tác giả**: Sumeet Tripathi và Vishal Naik   
> **📅 Ngày đăng**: 01/07/2025   
> **🌐 Nguồn**: AWS Machine Learning Blog    
> **👨‍💻 Dịch giả**: Lê Minh Giàu - Thực tập sinh FCJ      
> **📅 Ngày dịch**: 09/07/2025      
> **⏱️ Thời gian đọc**: 15 phút  

---

## 📋 Tóm tắt

Bài viết này sẽ hướng dẫn bạn cách tận dụng Amazon SageMaker Unified Studio để xây dựng một ứng dụng hỗ trợ đại lý dựa trên AI tạo sinh cho một tổ chức tài chính giả lập, FinAssist Corp. Giải pháp sử dụng [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html) để điều phối một quy trình phức tạp gồm truy vấn cơ sở tri thức, phân loại bằng prompt, định tuyến có điều kiện và tạo phản hồi thông qua agent. Nội dung tập trung vào việc tích hợp các tính năng như Knowledge Bases, Agents và Flows của Amazon Bedrock trong một môi trường phát triển hợp nhất, giúp bạn phát triển và triển khai ứng dụng AI nâng cao mà không cần phải viết quá nhiều mã.

**🎯 Đối tượng**: Lập trình viên AI/ML, kỹ sư dữ liệu, kiến trúc sư giải pháp.       
**📊 Mức độ**: Trung cấp (200)   
**🏷️ Từ khóa**: Amazon Bedrock, Amazon SageMaker Unified Studio, Hướng dẫn kỹ thuật  

---

## 📚 Mục lục

- [Tổng quan giải pháp](#tổng-quan-giải-pháp)
- [Điều kiện cần thiết](#điều-kiện-cần-thiết)
- [Chuẩn bị dữ liệu](#chuẩn-bị-dữ-liệu)
- [Tạo dự án](#tạo-dự-án)
- [Tạo prompt](#tạo-prompt)
- [Tạo chat agent](#tạo-chat-agent)
- [Tạo flow](#tạo-flow)
- [Thêm knowledge base vào flow app](#thêm-knowledge-base-vào-flow-app)
- [Thêm prompt vào flow app](#thêm-prompt-vào-flow-app)
- [Thêm điều kiện vào flow app](#thêm-điều-kiện-vào-flow-app)
- [Thêm chat agent vào flow app](#thêm-chat-agent-vào-flow-app)
- [Kiểm thử flow app](#kiểm-thử-flow-app)
- [Dọn dẹp](#dọn-dẹp)
- [Kết luận](#kết-luận)

---

Nhiều tổ chức gặp khó khăn trong việc quản lý dữ liệu, sử dụng nhiều công cụ AI/ML và vận hành các quy trình trên nhiều môi trường khác nhau, dẫn đến giảm hiệu quả và khó kiểm soát. Một môi trường phát triển hợp nhất sẽ gom tất cả các bước xử lý dữ liệu, phát triển mô hình và triển khai AI vào một nền tảng duy nhất, giúp tối ưu hóa quy trình, tăng sự phối hợp và rút ngắn thời gian từ ý tưởng đến sản phẩm AI.

Amazon SageMaker thế hệ mới đóng vai trò trung tâm cho dữ liệu, phân tích và AI. SageMaker tích hợp các khả năng AI/ML và phân tích của AWS, mang lại trải nghiệm đồng nhất cho phân tích và AI với quyền truy cập dữ liệu tập trung. Amazon SageMaker Unified Studio là môi trường phát triển duy nhất, nơi bạn có thể tìm kiếm, truy cập và xử lý dữ liệu, sử dụng các dịch vụ phân tích và AI/ML của AWS cho phân tích SQL, xử lý dữ liệu, phát triển mô hình và xây dựng ứng dụng AI tạo sinh.

Với SageMaker Unified Studio, bạn có thể phát triển ứng dụng AI tạo sinh hiệu quả trong môi trường an toàn, tin cậy nhờ Amazon Bedrock. Bạn được lựa chọn các mô hình nền tảng (FM) hiệu suất cao cùng các công cụ nâng cao như [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html), [Amazon Bedrock Guardrails](https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html), [Amazon Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html) và [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html). Việc điều chỉnh, triển khai ứng dụng AI tạo sinh và chia sẻ qua danh mục tích hợp trở nên nhanh chóng.

Bài viết này sẽ minh họa cách sử dụng SageMaker Unified Studio để xây dựng quy trình AI phức tạp với [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html).

### TỔNG QUAN GIẢI PHÁP

Giả sử FinAssist Corp, một tổ chức tài chính lớn, muốn phát triển ứng dụng hỗ trợ đại lý dựa trên AI tạo sinh. Giải pháp này cung cấp các chức năng chính:

*   **Hệ thống tham chiếu khiếu nại** – AI giúp truy cập nhanh dữ liệu khiếu nại lịch sử, hỗ trợ đại diện CSKH xử lý các yêu cầu theo dõi, kiểm toán và đào tạo nhân viên mới.
*   **Cơ sở tri thức thông minh** – Kho dữ liệu về các khiếu nại đã giải quyết, giúp truy xuất nhanh chi tiết, hành động xử lý và tóm tắt kết quả liên quan.
*   **Quản lý quy trình làm việc tối ưu** – Đảm bảo giao tiếp với khách hàng nhất quán nhờ truy cập thông tin tiêu chuẩn hóa, hỗ trợ kiểm tra tuân thủ và cải tiến quy trình.
*   **Khả năng truy vấn linh hoạt** – Giao diện đơn giản hỗ trợ nhiều tình huống truy vấn, từ câu hỏi khách hàng về giải pháp trước đây đến đánh giá nội bộ về quy trình xử lý.

Hãy cùng khám phá cách SageMaker Unified Studio và [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html), kết hợp với [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html) và [Amazon Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html), giải quyết các thách thức này bằng hệ thống tham chiếu khiếu nại AI. Sơ đồ dưới đây minh họa kiến trúc giải pháp.

![Solution Architecture](./images/1_Soultion_Architecture_image-1.png)

Các thành phần chính của giải pháp gồm:

*   **SageMaker Unified Studio** – Môi trường phát triển
*   **Flow app** – Điều phối quy trình, bao gồm:
    *   Truy vấn cơ sở tri thức
    *   Phân loại bằng prompt
    *   Định tuyến có điều kiện
    *   Tạo phản hồi qua Agent

Quy trình xử lý truy vấn người dùng gồm các bước:

1.  Người dùng gửi câu hỏi liên quan khiếu nại.
2.  Knowledge Base trả về thông tin khiếu nại liên quan.
3.  Prompt xác định truy vấn có liên quan đến thời gian giải quyết không.
4.  Dựa trên kết quả phân loại, ứng dụng sẽ:
    a. Định tuyến đến AI Agent để có phản hồi cụ thể.
    b. Trả về thông tin khiếu nại chung.
5.  Ứng dụng gửi phản hồi phù hợp cho người dùng.

### ĐIỀU KIỆN CẦN THIẾT

Để thực hiện ví dụ này, bạn cần:

*   [Quyền truy cập SageMaker Unified Studio](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/getting-started-access-the-portal.html) (URL do quản trị viên cung cấp). Có thể xác thực bằng:
    *   Tài khoản [AWS IAM](https://aws.amazon.com/iam/)
    *   Đăng nhập một lần (SSO) với [AWS IAM Identity Center](https://aws.amazon.com/iam/identity-center/).
*   Tài khoản IAM hoặc IAM Identity Center cần có quyền cho:
    *   SageMaker Unified Studio.
    *   Amazon Bedrock (bao gồm [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html), [Amazon Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html), Amazon Bedrock Prompt Management, [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)).
    *   Tham khảo [ví dụ chính sách dựa trên danh tính](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/security_iam_id-based-policy-examples.html).
*   [Quyền truy cập các FMs của Amazon Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) (đảm bảo đã bật cho tài khoản), ví dụ: Claude 3 Haiku của Anthropic (cho Agent).
*   [Cấu hình quyền truy cập](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/amazon-bedrock.html) vào các mô hình không máy chủ Amazon Bedrock cho dự án SageMaker Unified Studio.
*   [Amazon Titan Embedding](https://aws.amazon.com/bedrock/titan/) (cho Knowledge Base).
*   Dữ liệu khiếu nại mẫu ở định dạng CSV để tạo Knowledge Base.

### CHUẨN BỊ DỮ LIỆU

Một bộ dữ liệu mẫu đã được chuẩn bị để sử dụng với [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html). Bộ dữ liệu này chứa thông tin về các khiếu nại và cách giải quyết. Ví dụ:

```csv
complaint_id,product,sub_product,issue,sub_issue,complaint_summary,action_taken,next_steps,financial_institution,state,submitted_via,resolution_type,timely_response
FIN-2024-001,04/26/24,"Mortgage","Conventional mortgage","Payment issue","Escrow dispute","Customer disputes mortgage payment increase after recent escrow analysis","Reviewed escrow analysis, explained property tax increase impact, provided detailed payment breakdown","1. Send written explanation of escrow analysis 2. Schedule annual escrow review 3. Provide payment assistance options","Financial Institution-1","TX","Web","Closed with explanation","Yes"
FIN-2024-002,04/26/24,"Money transfer","Wire transfer","Processing delay","International transfer","Wire transfer of $10,000 delayed, customer concerned about international payment deadline","Located wire transfer in system, expedited processing, waived wire fee","1. Confirm receipt with receiving bank 2. Update customer on delivery 3. Document process improvement needs","Financial Institution-2","FL","Phone","Closed with monetary relief","No"
```

### TẠO DỰ ÁN

Trong SageMaker Unified Studio, bạn có thể tạo dự án để cộng tác cho từng trường hợp kinh doanh. Dự án cho phép quản lý tài sản dữ liệu, phân tích, tổ chức quy trình, phát triển mô hình ML, xây dựng ứng dụng Generative AI, v.v.

Các bước tạo dự án:

1.  Truy cập SageMaker Unified Studio qua URL quản trị viên cung cấp.
2.  Chọn **Create project**.
3.  Nhập tên và mô tả dự án.
4.  Ở **Project profile**, chọn **Generative AI application development**.
5.  Nhấn **Continue**.
6.  Hoàn tất cấu hình và chọn **Create project**.

![Create Project](./images/2_Create_Project_image-2.png)

### TẠO PROMPT

Tạo một prompt tái sử dụng để truyền hướng dẫn cho các FMs, sẽ dùng trong flow app. Tham khảo thêm tại Tái sử dụng và chia sẻ Amazon Bedrock prompts.

1.  Trong SageMaker Unified Studio, menu **Build**, chọn **Prompt** dưới **Machine Learning & Generative AI**.
2.  Đặt tên cho prompt.
3.  Chọn FM phù hợp (ví dụ: Claude 3 Haiku).
4.  Ở **Prompt message**, nhập nội dung sau (đã dịch sang tiếng Việt):
    ```
    Bạn là một bộ phân loại phân tích khiếu nại. Bạn sẽ nhận được dữ liệu khiếu nại từ một cơ sở tri thức. Phân tích {{input}} và trả lời bằng một chữ cái duy nhất:
    T: Nếu đầu vào chứa thông tin về thời gian giải quyết khiếu nại, thời gian phản hồi hoặc tiến trình xử lý (cho dù kịp thời hay bị trì hoãn)
    F: Đối với tất cả các loại thông tin khiếu nại khác
    Chỉ trả về 'T' hoặc 'F' dựa trên việc phản hồi của cơ sở tri thức có phải về thời gian giải quyết hay không. Không thêm bất kỳ văn bản hoặc giải thích bổ sung nào - chỉ trả lời bằng một chữ cái duy nhất 'T' hoặc 'F'.
    ```
5.  Nhấn **Save**.
6.  Chọn **Create version**.

![Create Prompt](./images/3_Prompt_image-3.png)
![Create Version](./images/4_Create_Version_image-4.png)

### TẠO CHAT AGENT

Tạo Chat Agent để xử lý phản hồi giải quyết cụ thể:

1.  Trong SageMaker Unified Studio, menu **Build**, chọn **Chat agent** dưới **Machine Learning & Generative AI**.
2.  Đặt tên cho prompt.
3.  Chọn FM phù hợp (ví dụ: Claude 3 Haiku).
4.  Ở **Enter a system prompt**, nhập nội dung sau (đã dịch sang tiếng Việt):
    ```
    Bạn là một Trợ lý AI Khiếu nại Tài chính. Bạn sẽ nhận được thông tin khiếu nại từ một cơ sở tri thức và các câu hỏi về thời gian giải quyết.
    Khi trả lời các truy vấn về thời gian giải quyết:
    1. Sử dụng thông tin khiếu nại được cung cấp để xác nhận xem nó đã được giải quyết trong thời hạn hay chưa
    2. Đối với các giải pháp kịp thời, hãy cung cấp:
       - Xác nhận hoàn thành kịp thời
       - Các hành động cụ thể đã được thực hiện (từ dữ liệu khiếu nại được cung cấp)
       - Các bước tiếp theo đã được hoàn thành
    2. Đối với các giải pháp bị trì hoãn, hãy cung cấp:
       - Thừa nhận sự chậm trễ
       - Gói bồi thường tiêu chuẩn:
         • Tín dụng dịch vụ 75 đô la
         • Nâng cấp Trạng thái Ưu tiên trong 6 tháng
         • Miễn phí dịch vụ cho chu kỳ thanh toán hiện tại
       - Các hành động đã được thực hiện (từ dữ liệu khiếu nại được cung cấp)
       - Thông tin liên hệ để theo dõi: Đường dây ưu tiên: ************** 
    Luôn tham chiếu các chi tiết khiếu nại cụ thể được cung cấp trong đầu vào của bạn khi thảo luận về các hành động đã thực hiện và quy trình giải quyết.
    ```
5.  Nhấn **Save**.
6.  Sau khi lưu Agent, chọn **Deploy**.
7.  Ở **Alias name**, nhập `demoAlias`.
8.  Nhấn **Deploy**.

![Create Chat Agent](./images/5_Chat_Agent_image-5.png)

### TẠO FLOW

Khi đã có prompt và Agent, tiến hành tạo Flow để điều phối quy trình xử lý khiếu nại:

1.  Trong SageMaker Unified Studio, menu **Build**, chọn **Flow** dưới **Machine Learning & Generative AI**.
2.  Tạo Flow mới tên `demo-flow`.

![Flow](./images/6_flow_image-6.jpeg)
![New Flow](./images/7_new_flow_image-7.png)

### THÊM KNOWLEDGE BASE VÀO FLOW APP

Thực hiện các bước sau để thêm node Knowledge Base vào Flow:

1.  Ở tab **Nodes**, chọn **Knowledge Base**.
2.  Ở tab **Configure**, nhập:
    a. **Node name** (ví dụ: `complaints_kb`).
    b. Chọn **Create new Knowledge Base**.
3.  Trong **Create Knowledge Base**, nhập:
    a. **Name** (ví dụ: `complaints`).
    b. **Description** (ví dụ: `user complaints information`).
    c. Ở **Add data sources**, chọn **Local file** và tải lên `complaints.txt`.
    d. **Embeddings model**: chọn **Titan Text Embeddings V2**.
    e. **Vector store**: chọn **OpenSearch Serverless**.
    f. Nhấn **Create**.
4.  Sau khi tạo Knowledge Base, chọn nó trong Flow.
5.  Ở phần chi tiết, chọn **Response generation model** là **Claude 3 Haiku**.
6.  Kết nối đầu ra node đầu vào Flow với đầu vào node Knowledge Base.
7.  Kết nối đầu ra node Knowledge Base với đầu vào node đầu ra Flow.
8.  Nhấn **Save**.

![Knowledge Base](./images/8_Knowledge_base_image-8.png)
![First Connection](./images/9_first_connection_image-9.png)

### THÊM PROMPT VÀO FLOW APP

Tiếp theo, thêm prompt đã tạo vào Flow:

1.  Ở tab **Nodes**, thêm node prompt.
2.  Ở tab **Configure** cho node prompt, nhập:
3.  **Node name** (ví dụ: `demo_prompt`).
4.  **Prompt**: chọn `financeAssistantPrompt`.
5.  **Version**: chọn `1`.
6.  Kết nối đầu ra node Knowledge Base với đầu vào node prompt.
7.  Nhấn **Save**.

![KB to Prompt Connection](./images/10_KB_Prompt_connection_image-10.png)

### THÊM ĐIỀU KIỆN VÀO FLOW APP

Node điều kiện xác định cách Flow xử lý các loại truy vấn khác nhau, giúp định tuyến phù hợp. Nếu truy vấn liên quan thời gian giải quyết, sẽ chuyển đến Chat Agent; nếu không, trả về phản hồi từ Knowledge Base. Các bước:

1.  Ở tab **Nodes**, thêm node điều kiện.
2.  Ở tab **Configure** cho node điều kiện, nhập:
    a. **Node name** (ví dụ: `demo_condition`).
    b. Ở **Conditions**, nhập `conditionInput == "T"`.
    c. Kết nối đầu ra node prompt với đầu vào node điều kiện.
3.  Nhấn **Save**.

![Condition Connection](./images/11_condition_connection_image-11.png)

### THÊM CHAT AGENT VÀO FLOW APP

Thêm Chat Agent đã tạo vào Flow:

1.  Ở tab **Nodes**, thêm node Agent.
2.  Ở tab **Configure** cho node Agent, nhập:
    a. **Node name** (ví dụ: `demo_agent`).
    b. **Chat agent**: chọn `DemoAgent`.
    c. **Alias**: chọn `demoAlias`.
3.  Tạo các kết nối:
    a. Kết nối đầu vào node điều kiện với đầu ra node prompt.
    b. Đầu ra node điều kiện:
       i.  **If condition is true**: đến node Agent.
       ii. **If condition is false**: đến node đầu ra Flow hiện có.
    c. Đầu ra node Knowledge Base đến đầu vào:
       i.  Node Agent.
       ii. Node đầu ra Flow.
    d. Đầu ra node Agent đến node đầu ra Flow mới tên `FlowOutputNode_2`.
4.  Nhấn **Save**.

![Agent Connection](./images/12_agent_connection_image-12.png)
![Final Connection](./images/13_fina_connection_image-13.png)

### KIỂM THỬ FLOW APP

Sau khi hoàn tất, kiểm thử flow app bằng cách mở ngăn **Test** ở bên phải trang.

Nhập các câu hỏi liên quan đến bộ dữ liệu mẫu để kiểm tra.

![Test Question](./images/14_question_image-14.png)
![Test Answer](./images/15_answer_image-15.png)

### DỌN DẸP

Để giải phóng tài nguyên, hãy xóa Flow, Agent, prompt, Knowledge Base và các tài nguyên OpenSearch Serverless liên quan.

### KẾT LUẬN

Bài viết đã trình bày cách xây dựng hệ thống tham chiếu khiếu nại AI bằng flow app trong SageMaker Unified Studio. Nhờ tích hợp các tính năng như [Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html), [Amazon Bedrock Agents](https://docs.aws.amazon.com/bedrock/latest/userguide/agents.html) và [Amazon Bedrock Flows](https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html), bạn có thể phát triển và triển khai ứng dụng AI phức tạp mà không cần nhiều mã nguồn.

Khi xây dựng quy trình AI với SageMaker Unified Studio, hãy tuân thủ [Mô hình chia sẻ trách nhiệm](https://aws.amazon.com/compliance/shared-responsibility-model/) của AWS về bảo mật. Áp dụng các best practices về [bảo mật](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/adminguide/security.html), bao gồm cấu hình IAM và mã hóa dữ liệu. Tham khảo thêm [Bảo mật trợ lý AI tạo sinh với OWASP Top 10 mitigation](https://aws.amazon.com/blogs/machine-learning/secure-a-generative-ai-assistant-with-owasp-top-10-mitigation/) để đánh giá bảo mật cho trợ lý AI tạo sinh. Thực hiện các nguyên tắc này giúp xây dựng ứng dụng AI mạnh mẽ, bảo vệ dữ liệu và hệ thống.

Để tìm hiểu thêm, hãy tham khảo Amazon Bedrock trong SageMaker Unified Studio và tham gia cộng đồng AI tạo sinh AWS để trao đổi kinh nghiệm.

Chúng tôi mong chờ những giải pháp sáng tạo bạn sẽ phát triển với các tính năng mới này.

---

## 📖 Glossary - Thuật ngữ

| English | Tiếng Việt | Định nghĩa |
| --- | --- | --- |
| Foundation Models (FMs) | Mô hình nền tảng | Các mô hình học máy lớn, được đào tạo trước có thể được điều chỉnh cho các tác vụ khác nhau. |
| Generative AI | AI tạo sinh | Trí tuệ nhân tạo có khả năng tạo ra nội dung mới, chẳng hạn như văn bản, hình ảnh hoặc mã. |
| Knowledge Base | Cơ sở tri thức | Kho lưu trữ thông tin có cấu trúc và phi cấu trúc dùng cho hệ thống AI. |
| Prompt | Lời nhắc | Hướng dẫn cung cấp cho mô hình ngôn ngữ lớn để tạo phản hồi cụ thể. |
| Unified Development Environment | Môi trường phát triển hợp nhất | Nền tảng tích hợp cung cấp bộ công cụ và dịch vụ toàn diện cho phát triển phần mềm. |

---

## 🔗 Tài liệu tham khảo

### Tài liệu gốc
- [Bài viết gốc](https://aws.amazon.com/vi/blogs/machine-learning/use-amazon-sagemaker-unified-studio-to-build-complex-ai-workflows-using-amazon-bedrock-flows/)
- [Sumeet Tripathi - Tác giả 1](https://aws.amazon.com/vi/blogs/machine-learning/author/sumeett/)
- [Vishal Naik - Tác giả 2](https://aws.amazon.com/vi/blogs/machine-learning/author/vishaln/)

### Tools và Services
- [Amazon SageMaker](https://aws.amazon.com/vi/sagemaker/): Dịch vụ cloud để xây dựng, đào tạo và triển khai mô hình học máy.
- [Amazon Bedrock](https://aws.amazon.com/vi/bedrock/): Dịch vụ cloud cung cấp quyền truy cập các mô hình nền tảng hiệu suất cao.

---

## 💬 Ghi chú của người dịch

Bản dịch này thực hiện trong khuôn khổ **Chương trình thực tập FCJ**.

### Thách thức khi dịch
- **Thuật ngữ kỹ thuật**: Một số thuật ngữ như "Flows", "Agents", "Knowledge Bases" giữ nguyên tiếng Anh để đồng nhất với tài liệu AWS.
- **Bối cảnh văn hóa**: Bài viết lấy ví dụ công ty tài chính giả lập, đã được điều chỉnh phù hợp với độc giả.

### Bài học rút ra
- **Kiến thức kỹ thuật**: Quá trình dịch giúp hiểu sâu hơn về tích hợp dịch vụ AI/ML AWS để xây dựng ứng dụng phức tạp.
- **Kỹ năng ngôn ngữ**: Việc dịch bài viết giúp nâng cao kỹ năng dịch thuật kỹ thuật Anh-Việt.

---

## 🤝 Đóng góp & Phản hồi

**📧 Liên hệ**: giaule.work@gmail.com  
**💬 Phản hồi**: Mọi góp ý cải thiện chất lượng dịch thuật xin gửi về email trên  
**🔄 Cập nhật**: Bản dịch sẽ được cập nhật dựa trên phản hồi cộng đồng

---

*© 2025 - Bản dịch thuộc về Lê Minh Giàu. Vui lòng ghi nguồn khi sử dụng.*
