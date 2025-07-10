# Cách Lumi tối ưu hóa quy trình phê duyệt khoản vay với Amazon SageMaker AI

> **📖 Bài viết gốc**: [How Lumi streamlines loan approvals with Amazon SageMaker AI](https://aws.amazon.com/blogs/machine-learning/how-lumi-streamlines-loan-approvals-with-amazon-sagemaker-ai/)  
> **👤 Tác giả**: Daniel Wirjo, Melanie Li, và Paul Pagnan  
> **📅 Ngày xuất bản**: 04 April 2025  
> **🌐 Nguồn**: AWS Machine Learning Blog  
> **👨‍💻 Người dịch**: Nguyễn Minh Tân - FCJ Intern  
> **📅 Ngày dịch**: 08/07/2025  
> **⏱️ Thời gian đọc**: 12 phút

---

## 📋 Tóm tắt

Lumi là một công ty fintech hàng đầu của Australia chuyên cung cấp các giải pháp tài trợ nhanh chóng, linh hoạt và minh bạch cho các doanh nghiệp nhỏ. Họ sử dụng dữ liệu thời gian thực và machine learning để cung cấp các khoản vay tùy chỉnh nhằm thúc đẩy tăng trưởng bền vững. Bài viết này khám phá cách Lumi sử dụng Amazon SageMaker AI để đạt được mục tiêu cung cấp thời gian phản hồi nhanh (tính bằng giờ thay vì ngày), nâng cao khả năng xử lý và phân loại giao dịch, từ đó phát triển kinh doanh thông qua việc xử lý đơn vay nhanh hơn, quyết định tín dụng chính xác hơn và cải thiện trải nghiệm khách hàng.

**🎯 Đối tượng đọc**: Data Scientists, ML Engineers, Financial Services Leaders, Technical Decision Makers  
**📊 Độ khó**: Intermediate to Advanced  
**🏷️ Tags**: #AmazonSageMaker #MachineLearning #FinTech #LoanProcessing #BERT #AsynchronousInference

---

## 📚 Mục lục

- [Tổng quan: Cách Lumi sử dụng machine learning cho quyết định tín dụng thông minh](#tổng-quan-cách-lumi-sử-dụng-machine-learning-cho-quyết-định-tín-dụng-thông-minh)
- [Thách thức: Mở rộng quy mô ML inference](#thách-thức-mở-rộng-quy-mô-ml-inference)
- [Giải pháp: Sử dụng Asynchronous Inference trên Amazon SageMaker AI](#giải-pháp-sử-dụng-asynchronous-inference-trên-amazon-sagemaker-ai)
- [Best Practices và Khuyến nghị](#best-practices-và-khuyến-nghị)
- [Kết quả và Tác động](#kết-quả-và-tác-động)
- [Kết luận](#kết-luận)
- [Glossary - Thuật ngữ](#glossary---thuật-ngữ)
- [Tài liệu tham khảo](#tài-liệu-tham-khảo)

---

## Tổng quan: Cách Lumi sử dụng machine learning cho quyết định tín dụng thông minh

Trong quá trình onboarding khách hàng và xử lý đơn vay, Lumi cần một giải pháp mạnh mẽ để xử lý khối lượng lớn dữ liệu giao dịch kinh doanh. Quy trình phân loại cần hoạt động với độ trễ thấp để hỗ trợ cam kết tốc độ ra quyết định hàng đầu thị trường của Lumi.

### 🧠 Mô hình BERT cho Phân loại Giao dịch

Lumi đã phát triển một mô hình phân loại dựa trên **BERT (Bidirectional Encoder Representations from Transformers)** - một kỹ thuật xử lý ngôn ngữ tự nhiên (NLP) tiên tiến. Họ đã fine-tune mô hình này sử dụng dataset độc quyền và chuyên môn data science nội bộ.

**Ưu điểm của mô hình BERT:**
- 🔍 **Phân tích giao dịch tài chính phức tạp**: Hiểu được ngữ cảnh và sắc thái trong văn bản
- 🏢 **Hiểu mối quan hệ với các yếu tố ngữ cảnh**: Như ngành nghề kinh doanh
- 📄 **Xử lý dữ liệu văn bản không có cấu trúc**: Từ nhiều nguồn khác nhau
- 🔄 **Thích ứng với các loại sản phẩm tài chính mới**: Linh hoạt với các giao dịch mới

### 👥 Quy trình Human-in-the-Loop

Hoạt động trong ngành dịch vụ tài chính, Lumi cần đảm bảo độ chính xác của đầu ra mô hình để có được đánh giá rủi ro chính xác. Do đó, Lumi triển khai quy trình **human-in-the-loop** kết hợp chuyên môn của đội ngũ risk và compliance:

1. **ML model xử lý và phân loại giao dịch** một cách nhanh chóng
2. **Kết quả có độ tin cậy thấp được gắn cờ** và tự động chuyển đến đội ngũ phù hợp
3. **Các chuyên gia phân tích rủi ro có kinh nghiệm** xem xét các trường hợp này
4. **Dữ liệu đã được phân loại chính xác** được đưa vào quá trình retrain mô hình

Cách tiếp cận hybrid này cho phép Lumi duy trì tiêu chuẩn quản lý rủi ro cao trong khi vẫn cung cấp quyết định vay nhanh chóng.

## Thách thức: Mở rộng quy mô ML inference

Để triển khai mô hình trong môi trường production, Lumi yêu cầu một nền tảng inference đáp ứng các nhu cầu kinh doanh:

### 🚀 Yêu cầu Hiệu suất
- **High performance**: Xử lý khối lượng lớn giao dịch nhanh chóng và hiệu quả
- **Low latency**: Duy trì trải nghiệm khách hàng xuất sắc và thời gian phản hồi nhanh
- **Cost-effectiveness at scale**: Giải pháp kinh tế khả thi khi hoạt động mở rộng

### ⚡ Yêu cầu về Scaling
- **Adaptive scaling**: Thích ứng động với workload dao động
- **Scale-to-zero capability**: Khả năng scale xuống 0 vào ban đêm để loại bỏ chi phí không cần thiết
- **Peak handling**: Xử lý hiệu quả thời gian xử lý cao điểm

### 📊 Yêu cầu về Observability
- **Robust monitoring**: Giám sát mạnh mẽ và khả năng logging
- **Model performance insights**: Hiểu biết sâu sắc về hiệu suất mô hình
- **Compliance tracking**: Đáp ứng yêu cầu quy định thông qua audit trails chi tiết

Sau khi đánh giá nhiều nhà cung cấp ML model hosting và benchmark về hiệu quả chi phí cũng như hiệu suất, Lumi đã chọn **Amazon SageMaker Asynchronous Inference** làm giải pháp của họ.

## Giải pháp: Sử dụng Asynchronous Inference trên Amazon SageMaker AI

Lumi đã sử dụng SageMaker Asynchronous Inference để host mô hình machine learning của họ, tận dụng một số lợi ích chính phù hợp với yêu cầu của họ.

### 🔄 Cơ chế Queuing
**Managed queue** của SageMaker Asynchronous Inference xử lý hiệu quả workload thay đổi, đảm bảo tất cả inference requests được xử lý mà không gây quá tải hệ thống trong thời gian cao điểm. Điều này rất quan trọng đối với Lumi vì các requests thường dao động từ 100 MB đến 1 GB, bao gồm hơn 100,000 giao dịch trong các khung thời gian cụ thể.

### 📉 Scale-to-Zero Capability
Dịch vụ tự động scale xuống 0 instances trong thời gian không hoạt động, giảm đáng kể chi phí. Tính năng này đặc biệt có lợi cho Lumi vì các đơn vay thường xảy ra trong giờ làm việc.

### ⚡ High Performance và Low Latency
Được thiết kế cho các payload lớn và inference jobs chạy dài, SageMaker Asynchronous Inference lý tưởng cho việc xử lý dữ liệu giao dịch tài chính phức tạp.

### 🛠️ Custom Container Optimization
Lumi đã tạo ra một custom container lean chỉ bao gồm các thư viện thiết yếu như MLFlow, Tensorflow, và MLServer. Việc có thể mang container riêng của họ có nghĩa là họ có thể giảm đáng kể kích thước container và cải thiện thời gian cold start.

### 📋 Model Deployment và Governance
Lumi triển khai các mô hình phân loại giao dịch của họ sử dụng SageMaker, tận dụng khả năng model registry và versioning. Điều này cho phép quản trị mô hình mạnh mẽ, đáp ứng yêu cầu compliance.

### 🔗 Integration với Existing Systems trên AWS
Lumi tích hợp liền mạch SageMaker Asynchronous Inference endpoints với pipeline xử lý khoản vay hiện có của họ:

- **Databricks on AWS**: Để huấn luyện mô hình
- **Amazon EKS**: Lưu trữ ứng dụng chính
- **Amazon S3**: Lưu trữ dữ liệu batch và đầu ra
- **Amazon SNS**: Cảnh báo cập nhật trạng thái công việc

### 🖥️ Instance Selection và Performance Benchmarking
Để tối ưu hóa triển khai, Lumi đã benchmark latency, cost và scalability trên nhiều tùy chọn inference serving khác nhau. Sau phân tích, họ phát hiện rằng:

- **Real-time inference** trên instances lớn hơn cung cấp latency thấp hơn cho các requests riêng lẻ
- **Asynchronous inference** với **c5.xlarge instances** cung cấp sự cân bằng tốt nhất về hiệu quả chi phí và hiệu suất cho batch-oriented workload của Lumi

Sau khi cập nhật mô hình để sử dụng Tensorflow CUDA, Lumi tiến hành tối ưu hóa thêm bằng cách chuyển sang **ml.g5.xlarge GPU enabled cluster**, cải thiện hiệu suất **82%** trong khi giảm chi phí **10%**.

## Best Practices và Khuyến nghị

Đối với các doanh nghiệp muốn triển khai các giải pháp tương tự, hãy xem xét các best practices sau:

### 🎯 Optimize Your Container
Học theo Lumi bằng cách tạo ra một container lean, custom chỉ với các dependencies cần thiết. Cách tiếp cận này có thể cải thiện đáng kể tốc độ inference và giảm chi phí.

### ⚡ Leverage Asynchronous Processing
Đối với workloads có khối lượng thay đổi hoặc thời gian xử lý dài, asynchronous inference có thể cung cấp lợi ích đáng kể về scalability và hiệu quả chi phí.

### 📈 Plan for Scale
Thiết kế hạ tầng ML của bạn với tầm nhìn tăng trưởng tương lai. Tính linh hoạt của SageMaker AI cho phép bạn dễ dàng thêm các mô hình và khả năng mới khi nhu cầu phát triển.

### 📊 Model Observability và Governance
Khi đánh giá nền tảng inference và hosting, hãy xem xét khả năng observability và governance. Các tính năng observability và governance mạnh mẽ của SageMaker AI giúp dễ dàng chẩn đoán vấn đề, duy trì hiệu suất mô hình, đảm bảo compliance.

## Kết quả và Tác động

Bằng cách triển khai SageMaker AI, Lumi đã đạt được những cải thiện đáng kể cho kinh doanh của họ:

### 📊 Cải thiện Độ chính xác
- **Tăng 56% độ chính xác phân loại giao dịch** sau khi chuyển sang mô hình BERT mới

### ⚡ Cải thiện Hiệu suất Xử lý
- **Giảm 53% thời gian xử lý tổng thể** cho các đơn vay nhờ khả năng xử lý batches lớn giao dịch một cách bất đồng bộ

### 💰 Tối ưu hóa Chi phí
- **Cải thiện 47% hiệu quả chi phí** của mô hình nhờ tính năng auto-scaling và scale-to-zero trong giờ thấp điểm

### 🚀 Khả năng Mở rộng
- Có thể dễ dàng xử lý **đột biến đơn vay** mà không ảnh hưởng đến tốc độ xử lý hoặc độ chính xác

## Kết luận

> "Amazon SageMaker AI đã là một game-changer cho kinh doanh của chúng tôi. Nó cho phép chúng tôi xử lý đơn vay nhanh hơn, hiệu quả hơn và chính xác hơn bao giờ hết, đồng thời giảm đáng kể chi phí vận hành. Khả năng xử lý khối lượng lớn giao dịch trong thời gian cao điểm và scale xuống 0 trong thời gian yên tĩnh đã mang lại cho chúng tôi sự linh hoạt cần thiết để phát triển nhanh chóng mà không ảnh hưởng đến hiệu suất hoặc trải nghiệm khách hàng."  
> 
> **_Paul Pagnan, Chief Technology Officer tại Lumi_**

### 🔮 Hướng phát triển tương lai

Được khuyến khích bởi sự thành công của việc triển khai, Lumi đang khám phá việc mở rộng sử dụng Amazon SageMaker AI cho các mô hình khác và tìm hiểu các tools khác như **Amazon Bedrock** để kích hoạt các use cases generative AI.

**Các mô hình tương lai bao gồm:**
- 🎯 **Enhanced credit scoring models**: Đánh giá khả năng vay chính xác hơn
- 👥 **Customer segmentation models**: Hiểu rõ hơn về khách hàng và cá nhân hóa offerings
- 📈 **Predictive analytics**: Chủ động xác định xu hướng thị trường và điều chỉnh chiến lược cho vay

---

## 📖 Glossary - Thuật ngữ

| English | Tiếng Việt | Định nghĩa |
|---------|------------|------------|
| **Machine Learning & AI** |
| BERT | BERT | Bidirectional Encoder Representations from Transformers - mô hình NLP tiên tiến |
| Natural Language Processing (NLP) | Xử lý Ngôn ngữ Tự nhiên | Công nghệ AI xử lý và hiểu ngôn ngữ con người |
| Asynchronous Inference | Inference Bất đồng bộ | Xử lý inference không đồng bộ, phù hợp cho batch processing |
| Human-in-the-Loop | Con người trong Vòng lặp | Quy trình kết hợp AI và con người để đảm bảo chất lượng |
| Model Retraining | Huấn luyện lại Mô hình | Quá trình cập nhật mô hình với dữ liệu mới |
| **AWS Services** |
| Amazon SageMaker | Amazon SageMaker | Dịch vụ machine learning fully-managed của AWS |
| Amazon EKS | Amazon EKS | Elastic Kubernetes Service - dịch vụ container orchestration |
| Amazon S3 | Amazon S3 | Simple Storage Service - dịch vụ lưu trữ đối tượng |
| Amazon SNS | Amazon SNS | Simple Notification Service - dịch vụ thông báo |
| **Technical Terms** |
| Fine-tuning | Fine-tuning | Tinh chỉnh mô hình pre-trained cho tác vụ cụ thể |
| Scale-to-zero | Scale xuống 0 | Khả năng giảm resources xuống 0 khi không sử dụng |
| Cold Start | Cold Start | Thời gian khởi động ban đầu của container/service |
| Batch Processing | Xử lý Batch | Xử lý dữ liệu theo lô thay vì real-time |
| **Business Terms** |
| FinTech | FinTech | Financial Technology - công nghệ tài chính |
| Credit Scoring | Chấm điểm Tín dụng | Đánh giá khả năng trả nợ của khách hàng |
| Loan Approval | Phê duyệt Khoản vay | Quá trình xác nhận và chấp thuận đơn vay |
| Transaction Classification | Phân loại Giao dịch | Việc phân loại các giao dịch tài chính theo danh mục |

## 🔗 Tài liệu tham khảo

### Tài liệu gốc
- [AWS Blog Post](https://aws.amazon.com/blogs/machine-learning/how-lumi-streamlines-loan-approvals-with-amazon-sagemaker-ai/): Bài viết gốc trên AWS Machine Learning Blog
- [Lumi Homepage](https://lumi.com.au/): Trang chủ chính thức của Lumi
- [Amazon SageMaker AI](https://aws.amazon.com/sagemaker/): Trang chủ Amazon SageMaker

### Tài liệu kỹ thuật
- [Amazon SageMaker Asynchronous Inference](https://docs.aws.amazon.com/sagemaker/latest/dg/async-inference.html): Hướng dẫn chi tiết về Asynchronous Inference
- [BERT Documentation](https://huggingface.co/docs/transformers/model_doc/bert): Tài liệu về mô hình BERT
- [MLflow Documentation](https://mlflow.org/docs/latest/index.html): Hướng dẫn sử dụng MLflow

### AWS Services được sử dụng
- [Amazon EKS](https://aws.amazon.com/eks/): Elastic Kubernetes Service
- [Amazon S3](https://aws.amazon.com/s3/): Simple Storage Service
- [Amazon SNS](https://aws.amazon.com/sns/): Simple Notification Service
- [AWS Key Management Service](https://aws.amazon.com/kms/): Dịch vụ quản lý key

### Tools và Frameworks
- [TensorFlow](https://www.tensorflow.org/): Framework machine learning
- [Databricks](https://databricks.com/): Nền tảng analytics và AI
- [JMeter](https://jmeter.apache.org/): Tool testing performance

---

## 💬 Ghi chú của người dịch

### Challenges trong quá trình dịch
- **Technical Terms**: Nhiều thuật ngữ ML/AI chuyên sâu như "BERT", "Asynchronous Inference" được giữ nguyên và giải thích chi tiết
- **Financial Context**: Thuật ngữ fintech và lending cần được dịch phù hợp với ngữ cảnh Việt Nam
- **Complex Architecture**: Giải thích rõ kiến trúc hệ thống phức tạp với nhiều AWS services

### Insights gained
- **Technical Learning**: Hiểu sâu về implementation ML models trong production environment với focus vào performance và cost optimization
- **Industry Knowledge**: Nắm bắt xu hướng áp dụng AI trong ngành tài chính, đặc biệt là lending
- **AWS Ecosystem**: Học cách tích hợp nhiều AWS services để tạo ra solution hoàn chỉnh

### Giá trị cho độc giả Việt Nam
- **Practical Implementation**: Case study thực tế về cách deploy ML models ở quy mô production
- **Cost Optimization**: Strategies cụ thể để tối ưu hóa chi phí khi sử dụng AWS ML services
- **Best Practices**: Các best practices từ một công ty fintech thành công

---

## 🤝 Đóng góp và Feedback

Bài dịch này được thực hiện trong khuôn khổ **FCJ Internship Program**. 

**📧 Liên hệ**: nminhtan1411@gmail.com 
**💬 Feedback**: Mọi góp ý để cải thiện chất lượng dịch thuật xin gửi về email trên  
**🔄 Updates**: Bài dịch sẽ được cập nhật dựa trên feedback từ cộng đồng  
**🤝 Collaboration**: Chào mừng các đóng góp từ community để hoàn thiện bài dịch

---

*© 2024 - Bản dịch thuộc về Nguyễn Minh Tân. Vui lòng credit khi sử dụng.* 