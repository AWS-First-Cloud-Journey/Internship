# SỬ DỤNG AMAZON SAGEMAKER UNIFIED STUDIO ĐỂ XÂY DỰNG CÁC WORKFLOW AI PHỨC TẠP BẰNG AMAZON BEDROCK FLOWS

> **📖 Bài viết gốc**: [Use Amazon SageMaker Unified Studio to build complex AI workflows using Amazon Bedrock Flows](https://aws.amazon.com/vi/blogs/machine-learning/use-amazon-sagemaker-unified-studio-to-build-complex-ai-workflows-using-amazon-bedrock-flows/)
> **👤 Tác giả**: Sumeet Tripathi và Vishal Naik
> **📅 Ngày xuất bản**: 01/07/2025
> **🌐 Nguồn**: AWS Machine Learning Blog
> **👨‍💻 Người dịch**: Lê Minh Giàu - FCJ Intern
> **📅 Ngày dịch**: 09/07/2025
> **⏱️ Thời gian đọc**: 15 phút

---

## 📋 Tóm tắt

Bài viết này hướng dẫn cách sử dụng Amazon SageMaker Unified Studio để xây dựng các quy trình làm việc (workflow) AI phức tạp bằng cách sử dụng Amazon Bedrock Flows. Các tổ chức thường đối mặt với thách thức trong việc quản lý dữ liệu, các công cụ AI/ML và các workflow trên nhiều môi trường khác nhau, ảnh hưởng đến năng suất và quản trị. Một môi trường phát triển hợp nhất giúp giải quyết vấn đề này bằng cách tích hợp xử lý dữ liệu, phát triển mô hình và triển khai ứng dụng AI vào một hệ thống duy nhất. SageMaker Unified Studio là một môi trường phát triển dữ liệu và AI duy nhất, nơi bạn có thể tìm và truy cập dữ liệu của mình và thực hiện các hành động trên đó bằng các dịch vụ phân tích và AI/ML của AWS. Bài viết trình bày một trường hợp sử dụng giả định cho một tổ chức tài chính, "FinAssist Corp," để tạo ra một hệ thống tham chiếu khiếu nại do AI cung cấp cho các nhân viên dịch vụ khách hàng của mình.

**🎯 Đối tượng đọc**: Developers, Data Scientists, AI/ML Engineers
**📊 Độ khó**: Intermediate (200)
**🏷️ Tags**: Amazon Bedrock, Amazon SageMaker Unified Studio, Technical How-to

---

## 📚 Mục lục

- [Tổng quan về giải pháp](#tổng-quan-về-giải-pháp)
- [Điều kiện tiên quyết](#điều-kiện-tiên-quyết)
- [Chuẩn bị dữ liệu](#chuẩn-bị-dữ-liệu)
- [Tạo một dự án](#tạo-một-dự-án)
- [Tạo một prompt](#tạo-một-prompt)
- [Tạo một chat agent](#tạo-một-chat-agent)
- [Tạo một flow](#tạo-một-flow)
- [Kiểm tra ứng dụng flow](#kiểm-tra-ứng-dụng-flow)
- [Dọn dẹp](#dọn-dẹp)
- [Kết luận](#kết-luận)

---

Các tổ chức đối mặt với thách thức quản lý dữ liệu, nhiều công cụ trí tuệ nhân tạo và học máy (AI/ML), và các quy trình công việc trên các môi trường khác nhau, ảnh hưởng đến năng suất và quản trị. Một môi trường phát triển hợp nhất tổng hợp xử lý dữ liệu, phát triển mô hình và triển khai ứng dụng AI vào một hệ thống duy nhất. Sự tích hợp này tối ưu hóa các quy trình công việc, tăng cường sự hợp tác và đẩy nhanh quá trình phát triển giải pháp AI từ ý tưởng đến sản xuất.

Thế hệ tiếp theo của Amazon SageMaker là trung tâm cho dữ liệu, phân tích và AI của bạn. SageMaker tập hợp các khả năng AI/ML và phân tích của AWS và cung cấp một trải nghiệm tích hợp cho phân tích và AI với quyền truy cập hợp nhất vào dữ liệu. Amazon SageMaker Unified Studio là một môi trường phát triển dữ liệu và AI duy nhất, nơi bạn có thể tìm và truy cập dữ liệu của mình và hành động trên đó bằng cách sử dụng các dịch vụ phân tích và AI/ML của AWS, cho phân tích SQL, xử lý dữ liệu, phát triển mô hình và phát triển ứng dụng AI tạo sinh.

Với SageMaker Unified Studio, bạn có thể xây dựng hiệu quả các ứng dụng AI tạo sinh trong một môi trường đáng tin cậy và an toàn bằng cách sử dụng Amazon Bedrock. Bạn có thể chọn từ một loạt các mô hình nền tảng (FM) hiệu suất cao và các công cụ và tùy chỉnh nâng cao như Amazon Bedrock Knowledge Bases, Amazon Bedrock Guardrails, Amazon Bedrock Agents và Amazon Bedrock Flows. Bạn có thể nhanh chóng tùy chỉnh và triển khai các ứng dụng AI tạo sinh và chia sẻ với danh mục tích hợp để khám phá.

Trong bài đăng này, chúng tôi trình bày cách bạn có thể sử dụng SageMaker Unified Studio để tạo các quy trình công việc AI phức tạp bằng cách sử dụng Amazon Bedrock Flows.

### TỔNG QUAN VỀ GIẢI PHÁP

Hãy xem xét FinAssist Corp, một tổ chức tài chính hàng đầu đang phát triển một ứng dụng hỗ trợ đại lý do AI tạo sinh cung cấp. Giải pháp này cung cấp các tính năng chính sau:

*   **Hệ thống tham chiếu khiếu nại** – Một hệ thống do AI cung cấp quyền truy cập nhanh vào dữ liệu khiếu nại lịch sử, cho phép các đại diện dịch vụ khách hàng xử lý hiệu quả các cuộc theo dõi của khách hàng, hỗ trợ kiểm toán nội bộ và hỗ trợ đào tạo nhân viên mới.
*   **Cơ sở kiến thức thông minh** – Một nguồn dữ liệu toàn diện về các khiếu nại đã được giải quyết giúp truy xuất nhanh chóng các chi tiết khiếu nại, hành động giải quyết và tóm tắt kết quả có liên quan.
*   **Quản lý quy trình công việc được tối ưu hóa** – Tăng cường tính nhất quán trong giao tiếp với khách hàng thông qua quyền truy cập được tiêu chuẩn hóa vào thông tin trường hợp trong quá khứ, hỗ trợ kiểm tra tuân thủ và các sáng kiến cải tiến quy trình.
*   **Khả năng truy vấn linh hoạt** – Một giao diện đơn giản hỗ trợ các tình huống truy vấn khác nhau, từ các câu hỏi của khách hàng về các giải pháp trong quá khứ đến các đánh giá nội bộ về các quy trình xử lý khiếu nại.

Hãy cùng khám phá cách SageMaker Unified Studio và Amazon Bedrock Flows, được tích hợp với Amazon Bedrock Knowledge Bases và Amazon Bedrock Agents, giải quyết những thách thức này bằng cách tạo ra một hệ thống tham chiếu khiếu nại do AI cung cấp. Sơ đồ sau đây minh họa kiến trúc giải pháp.

![Image 1](./images/1_Soultion_Architecture_image-1.png)

Giải pháp sử dụng các thành phần chính sau:

*   **SageMaker Unified Studio** – Cung cấp môi trường phát triển
*   **Ứng dụng Flow** – Điều phối quy trình công việc, bao gồm:
    *   Truy vấn cơ sở kiến thức
    *   Phân loại dựa trên prompt
    *   Định tuyến có điều kiện
    *   Tạo phản hồi dựa trên agent
Quy trình công việc xử lý các truy vấn của người dùng thông qua các bước sau:

1.  Người dùng gửi một câu hỏi liên quan đến khiếu nại.
2.  Cơ sở kiến thức cung cấp thông tin khiếu nại có liên quan.
3.  Prompt phân loại xem truy vấn có phải về thời gian giải quyết hay không.
4.  Dựa trên phân loại bằng cách sử dụng điều kiện, ứng dụng thực hiện hành động sau:
    a. Định tuyến truy vấn đến một agent AI để có các phản hồi giải quyết cụ thể.
    b. Trả về thông tin khiếu nại chung.
5.  Ứng dụng tạo ra một phản hồi phù hợp cho người dùng.

### ĐIỀU KIỆN TIÊN QUYẾT

Đối với ví dụ này, bạn cần những điều sau:

*   Quyền truy cập vào SageMaker Unified Studio. (Bạn sẽ cần URL cổng thông tin SageMaker Unified Studio từ quản trị viên của mình). Bạn có thể xác thực bằng một trong hai cách sau:
    *   Thông tin đăng nhập người dùng AWS Identity and Access Management (IAM).
    *   Thông tin đăng nhập một lần (SSO) với AWS IAM Identity Center.
*   Người dùng IAM hoặc người dùng IAM Identity Center phải có các quyền thích hợp cho:
    *   SageMaker Unified Studio.
    *   Amazon Bedrock (bao gồm Amazon Bedrock Flows, Amazon Bedrock Agents, Amazon Bedrock Prompt Management và Amazon Bedrock Knowledge Bases).
    *   Để biết thêm thông tin, hãy tham khảo các ví dụ về chính sách dựa trên danh tính.
*   Quyền truy cập vào các FM của Amazon Bedrock (đảm bảo rằng chúng được bật cho tài khoản của bạn), ví dụ: Claude 3 Haiku của Anthropic (cho agent).
*   Định cấu hình quyền truy cập vào các mô hình không có máy chủ Amazon Bedrock của bạn cho Amazon Bedrock trong các dự án SageMaker Unified Studio.
*   Amazon Titan Embedding (cho cơ sở kiến thức).
*   Dữ liệu khiếu nại mẫu được chuẩn bị ở định dạng CSV để tạo cơ sở kiến thức.

### CHUẨN BỊ DỮ LIỆU CỦA BẠN

Chúng tôi đã tạo một bộ dữ liệu mẫu để sử dụng cho Amazon Bedrock Knowledge Bases. Bộ dữ liệu này có thông tin về các khiếu nại mà các đại diện dịch vụ khách hàng nhận được và thông tin giải quyết. Sau đây là một ví dụ từ bộ dữ liệu mẫu:

```
complaint_id,product,sub_product,issue,sub_issue,complaint_summary,action_taken,next_steps,financial_institution,state,submitted_via,resolution_type,timely_response
FIN-2024-001,04/26/24,"Mortgage","Conventional mortgage","Payment issue","Escrow dispute","Customer disputes mortgage payment increase after recent escrow analysis","Reviewed escrow analysis, explained property tax increase impact, provided detailed payment breakdown","1. Send written explanation of escrow analysis 2. Schedule annual escrow review 3. Provide payment assistance options","Financial Institution-1","TX","Web","Closed with explanation","Yes"
FIN-2024-002,04/26/24,"Money transfer","Wire transfer","Processing delay","International transfer","Wire transfer of $10,000 delayed, customer concerned about international payment deadline","Located wire transfer in system, expedited processing, waived wire fee","1. Confirm receipt with receiving bank 2. Update customer on delivery 3. Document process improvement needs","Financial Institution-2","FL","Phone","Closed with monetary relief","No"
```

### TẠO MỘT DỰ ÁN

Trong SageMaker Unified Studio, người dùng có thể sử dụng các dự án để cộng tác trong các trường hợp sử dụng kinh doanh khác nhau. Trong các dự án, bạn có thể quản lý tài sản dữ liệu trong danh mục SageMaker Unified Studio, thực hiện phân tích dữ liệu, tổ chức quy trình công việc, phát triển mô hình ML, xây dựng ứng dụng AI tạo sinh, v.v.

Để tạo một dự án, hãy hoàn thành các bước sau:

1.  Mở trang đích SageMaker Unified Studio bằng URL từ quản trị viên của bạn.
2.  Chọn **Tạo dự án**.
3.  Nhập tên dự án và mô tả tùy chọn.
4.  Đối với **Hồ sơ dự án**, hãy chọn **Phát triển ứng dụng AI tạo sinh**.
5.  Chọn **Tiếp tục**.
6.  Hoàn tất cấu hình dự án của bạn, sau đó chọn **Tạo dự án**.

### TẠO MỘT PROMPT

Hãy tạo một prompt có thể tái sử dụng để nắm bắt các hướng dẫn cho các FM, chúng ta sẽ sử dụng sau này khi tạo ứng dụng flow. Để biết thêm thông tin, hãy xem Tái sử dụng và chia sẻ các prompt của Amazon Bedrock.

1.  Trong SageMaker Unified Studio, trên menu **Xây dựng**, chọn **Prompt** trong **Học máy & AI tạo sinh**.
2.  Cung cấp tên cho prompt.
3.  Chọn FM thích hợp (đối với ví dụ này, chúng tôi chọn Claude 3 Haiku).
4.  Đối với **Thông báo prompt**, chúng tôi nhập như sau:
    ```
    Bạn là một bộ phân loại phân tích khiếu nại. Bạn sẽ nhận được dữ liệu khiếu nại từ một cơ sở kiến thức. Phân tích {{input}} và trả lời bằng một chữ cái duy nhất:
    T: Nếu đầu vào chứa thông tin về thời gian giải quyết khiếu nại, thời gian phản hồi hoặc tiến trình xử lý (cho dù kịp thời hay chậm trễ)
    F: Đối với tất cả các loại thông tin khiếu nại khác
    Chỉ trả về 'T' hoặc 'F' dựa trên việc phản hồi của cơ sở kiến thức có phải về thời gian giải quyết hay không. Không thêm bất kỳ văn bản hoặc giải thích bổ sung nào - chỉ trả lời bằng một chữ cái duy nhất 'T' hoặc 'F'.
    ```
5.  Chọn **Lưu**.
6.  Chọn **Tạo phiên bản**.

### TẠO MỘT CHAT AGENT

Hãy tạo một chat agent để xử lý các phản hồi giải quyết cụ thể. Hoàn thành các bước sau:

1.  Trong SageMaker Unified Studio, trên menu **Xây dựng**, chọn **Chat agent** trong **Học máy & AI tạo sinh**.
2.  Cung cấp tên cho prompt.
3.  Chọn FM thích hợp (đối với ví dụ này, chúng tôi chọn Claude 3 Haiku).
4.  Đối với **Nhập một prompt hệ thống**, chúng tôi nhập như sau:
    ```
    Bạn là một Trợ lý Khiếu nại Tài chính AI. Bạn sẽ nhận được thông tin khiếu nại từ một cơ sở kiến thức và các câu hỏi về thời gian giải quyết.
    Khi trả lời các truy vấn về thời gian giải quyết:
    1. Sử dụng thông tin khiếu nại được cung cấp để xác nhận xem nó đã được giải quyết trong thời hạn hay chưa
    2. Đối với các giải pháp kịp thời, hãy cung cấp:
       - Xác nhận hoàn thành kịp thời
       - Các hành động cụ thể đã được thực hiện (từ dữ liệu khiếu nại được cung cấp)
       - Các bước tiếp theo đã được hoàn thành
    2. Đối với các giải pháp bị chậm trễ, hãy cung cấp:
       - Ghi nhận sự chậm trễ
       - Gói bồi thường tiêu chuẩn:
         • Tín dụng dịch vụ 75 đô la
         • Nâng cấp Trạng thái Ưu tiên trong 6 tháng
         • Miễn phí dịch vụ cho chu kỳ thanh toán hiện tại
       - Các hành động đã được thực hiện (từ dữ liệu khiếu nại được cung cấp)
       - Thông tin liên hệ để theo dõi: Đường dây ưu tiên: **************
    Luôn tham chiếu các chi tiết khiếu nại cụ thể được cung cấp trong đầu vào của bạn khi thảo luận về các hành động đã thực hiện và quy trình giải quyết.
    ```
5.  Chọn **Lưu**.
6.  Sau khi agent được lưu, hãy chọn **Triển khai**.
7.  Đối với **Tên bí danh**, hãy nhập `demoAlias`.
8.  Chọn **Triển khai**.

### TẠO MỘT FLOW

Bây giờ chúng ta đã sẵn sàng prompt và agent, hãy tạo một flow sẽ điều phối quy trình xử lý khiếu nại:

1.  Trong SageMaker Unified Studio, trên menu **Xây dựng**, chọn **Flow** trong **Học máy & AI tạo sinh**.
2.  Tạo một flow mới có tên là `demo-flow`.

### THÊM MỘT CƠ SỞ KIẾN THỨC VÀO ỨNG DỤNG FLOW CỦA BẠN

Hoàn thành các bước sau để thêm một nút cơ sở kiến thức vào flow:

1.  Trong ngăn điều hướng, trên tab **Nút**, chọn **Cơ sở kiến thức**.
2.  Trên tab **Định cấu hình**, cung cấp thông tin sau:
    a. Đối với **Tên nút**, hãy nhập một tên (ví dụ: `complaints_kb`).
    b. Chọn **Tạo Cơ sở kiến thức mới**.
3.  Trong ngăn **Tạo Cơ sở kiến thức**, hãy nhập thông tin sau:
    a. Đối với **Tên**, hãy nhập một tên (ví dụ: `complaints`).
    b. Đối với **Mô tả**, hãy nhập một mô tả (ví dụ: `thông tin khiếu nại của người dùng`).
    c. Đối với **Thêm nguồn dữ liệu**, hãy chọn **Tệp cục bộ** và tải lên tệp `complaints.txt`.
    d. Đối với **Mô hình nhúng**, hãy chọn **Titan Text Embeddings V2**.
    e. Đối với **Kho lưu trữ vector**, hãy chọn **OpenSearch Serverless**.
    f. Chọn **Tạo**.
4.  Sau khi bạn tạo cơ sở kiến thức, hãy chọn nó trong flow.
5.  Trong tên chi tiết, cung cấp thông tin sau:
6.  Đối với **Mô hình tạo phản hồi**, hãy chọn **Claude 3 Haiku**.
7.  Kết nối đầu ra của nút đầu vào flow với đầu vào của nút cơ sở kiến thức.
8.  Kết nối đầu ra của nút cơ sở kiến thức với đầu vào của nút đầu ra flow.
9.  Chọn **Lưu**.

### THÊM MỘT PROMPT VÀO ỨNG DỤNG FLOW CỦA BẠN

Bây giờ, hãy thêm prompt bạn đã tạo trước đó vào flow:

1.  Trên tab **Nút** trong ngăn trình tạo ứng dụng Flow, hãy thêm một nút prompt.
2.  Trên tab **Định cấu hình** cho nút prompt, cung cấp thông tin sau:
3.  Đối với **Tên nút**, hãy nhập một tên (ví dụ: `demo_prompt`).
4.  Đối với **Prompt**, hãy chọn `financeAssistantPrompt`.
5.  Đối với **Phiên bản**, hãy chọn `1`.
6.  Kết nối đầu ra của nút cơ sở kiến thức với đầu vào của nút prompt.
7.  Chọn **Lưu**.

### THÊM MỘT ĐIỀU KIỆN VÀO ỨNG DỤNG FLOW CỦA BẠN

Nút điều kiện xác định cách flow xử lý các loại truy vấn khác nhau. Nó đánh giá xem một truy vấn có phải về thời gian giải quyết hay thông tin khiếu nại chung hay không, cho phép flow định tuyến truy vấn một cách thích hợp. Khi một truy vấn về thời gian giải quyết, nó sẽ được chuyển đến chat agent để xử lý chuyên biệt; nếu không, nó sẽ nhận được phản hồi trực tiếp từ cơ sở kiến thức. Hoàn thành các bước sau để thêm một điều kiện:

1.  Trên tab **Nút** trong ngăn trình tạo ứng dụng Flow, hãy thêm một nút điều kiện.
2.  Trên tab **Định cấu hình** cho nút điều kiện, cung cấp thông tin sau:
    a. Đối với **Tên nút**, hãy nhập một tên (ví dụ: `demo_condition`).
    b. Trong **Điều kiện**, đối với **Điều kiện**, hãy nhập `conditionInput == "T"`.
    c. Kết nối đầu ra của nút prompt với đầu vào của nút điều kiện.
3.  Chọn **Lưu**.

### THÊM MỘT CHAT AGENT VÀO ỨNG DỤNG FLOW CỦA BẠN

Bây giờ, hãy thêm chat agent bạn đã tạo trước đó vào flow:

1.  Trên tab **Nút** trong ngăn trình tạo ứng dụng Flow, hãy thêm nút agent.
2.  Trên tab **Định cấu hình** cho nút agent, cung cấp thông tin sau:
    a. Đối với **Tên nút**, hãy nhập một tên (ví dụ: `demo_agent`).
    b. Đối với **Chat agent**, hãy chọn `DemoAgent`.
    c. Đối với **Bí danh**, hãy chọn `demoAlias`.
3.  Tạo các kết nối nút sau:
    a. Kết nối đầu vào của nút điều kiện (`demo_condition`) với đầu ra của nút prompt (`demo_prompt`).
    b. Kết nối đầu ra của nút điều kiện:
        i. Đặt **Nếu điều kiện là đúng** thành nút agent (`demo_agent`).
        ii. Đặt **Nếu điều kiện là sai** thành nút đầu ra flow hiện có (`FlowOutputNode`).
    c. Kết nối đầu ra của nút cơ sở kiến thức (`complaints_kb`) với đầu vào của những thứ sau:
        i. Nút agent (`demo_agent`).
        ii. Nút đầu ra flow (`FlowOutputNode`).
    d. Kết nối đầu ra của nút agent (`demo_agent`) với một nút đầu ra flow mới có tên là `FlowOutputNode_2`.
4.  Chọn **Lưu**.

### KIỂM TRA ỨNG DỤNG FLOW

Bây giờ ứng dụng flow đã sẵn sàng, hãy kiểm tra nó. Ở phía bên phải của trang, hãy chọn biểu tượng mở rộng để mở ngăn **Kiểm tra**. Trong hộp văn bản **Nhập prompt**, chúng ta có thể hỏi một vài câu hỏi liên quan đến bộ dữ liệu được tạo trước đó.

### DỌN DẸP

Để dọn dẹp tài nguyên của bạn, hãy xóa flow, agent, prompt, cơ sở kiến thức và các tài nguyên OpenSearch Serverless được liên kết.

### KẾT LUẬN

Trong bài đăng này, chúng tôi đã trình bày cách xây dựng một hệ thống tham chiếu khiếu nại do AI cung cấp bằng cách sử dụng một ứng dụng flow trong SageMaker Unified Studio. Bằng cách sử dụng các khả năng tích hợp của SageMaker Unified Studio với các tính năng của Amazon Bedrock như Amazon Bedrock Knowledge Bases, Amazon Bedrock Agents và Amazon Bedrock Flows, bạn có thể nhanh chóng phát triển và triển khai các ứng dụng AI phức tạp mà không cần viết mã nhiều.

Khi bạn xây dựng các quy trình công việc AI bằng SageMaker Unified Studio, hãy nhớ tuân thủ Mô hình trách nhiệm chung của AWS về bảo mật. Triển khai các phương pháp hay nhất về bảo mật của SageMaker Unified Studio, bao gồm các cấu hình IAM phù hợp và mã hóa dữ liệu. Bạn cũng có thể tham khảo Bảo mật một trợ lý AI tạo sinh với giảm thiểu OWASP Top 10 để biết chi tiết về cách đánh giá tình hình bảo mật của một trợ lý AI tạo sinh bằng cách sử dụng các biện pháp giảm thiểu OWASP TOP 10 cho các mối đe dọa phổ biến. Việc tuân theo các nguyên tắc này giúp thiết lập các ứng dụng AI mạnh mẽ duy trì tính toàn vẹn của dữ liệu và bảo vệ hệ thống.

Để tìm hiểu thêm, hãy tham khảo Amazon Bedrock trong SageMaker Unified Studio và tham gia các cuộc thảo luận và chia sẻ kinh nghiệm của bạn trong Cộng đồng AI tạo sinh của AWS.

Chúng tôi mong muốn được thấy các giải pháp sáng tạo mà bạn sẽ tạo ra với các tính năng mới mạnh mẽ này.

---

## 📖 Glossary - Thuật ngữ

| English | Tiếng Việt | Định nghĩa |
| --- | --- | --- |
| Foundation Models (FMs) | Mô hình nền tảng | Các mô hình học máy lớn, được đào tạo trước trên một lượng lớn dữ liệu. |
| Generative AI | AI tạo sinh | Một loại trí tuệ nhân tạo có khả năng tạo ra nội dung mới, chẳng hạn như văn bản, hình ảnh hoặc âm nhạc. |
| Knowledge Base | Cơ sở kiến thức | Một kho lưu trữ thông tin có cấu trúc và không có cấu trúc được sử dụng bởi các hệ thống AI. |
| Prompt | Lời nhắc | Một đoạn văn bản được sử dụng để hướng dẫn một mô hình ngôn ngữ lớn tạo ra một phản hồi cụ thể. |
| Workflow | Quy trình công việc | Một chuỗi các nhiệm vụ được tự động hóa để hoàn thành một quy trình kinh doanh. |
| Flow | Luồng | Trong ngữ cảnh của Amazon Bedrock, đây là một quy trình công việc được điều phối. |
| Agent | Tác nhân | Một thực thể tự trị có thể thực hiện các nhiệm vụ thay mặt cho người dùng. |
| Node | Nút | Một thành phần trong một luồng, đại diện cho một hành động hoặc một điểm quyết định. |
| Condition | Điều kiện | Một biểu thức logic xác định đường đi của một luồng. |
| Embedding | Nhúng | Một biểu diễn vector của dữ liệu, thường được sử dụng trong các tác vụ học máy. |

---

## 🔗 Tài liệu tham khảo

### Tài liệu gốc
- [Original Article](https://aws.amazon.com/vi/blogs/machine-learning/use-amazon-sagemaker-unified-studio-to-build-complex-ai-workflows-using-amazon-bedrock-flows/): Bài viết gốc
- [Sumeet Tripathi](https://aws.amazon.com/blogs/machine-learning/author/sumeettripathi/): Thông tin tác giả
- [Vishal Naik](https://aws.amazon.com/blogs/machine-learning/author/vishalnaik/): Thông tin tác giả

---
