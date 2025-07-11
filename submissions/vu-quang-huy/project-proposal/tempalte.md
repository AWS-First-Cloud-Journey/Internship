# Triển khai hạ tầng đa môi trường với kiến trúc Dual-stack 

##### *Triển khai hạ tầng đa môi trường cho 3 giai đoạn Dev/Test - Staging - Production. CodePipeline cho Dev và Test, cụm ECS môi trường staging và cụm EKS cho môi trường production. Hỗ trợ dual-stack (IPv4+IPv6) cho các môi trường* 
---

# Executive Summary
Dự án này nhằm xây dựng một hệ thống hạ tầng hiện đại cho ứng dụng sử dụng kiến trúc microservices, kết hợp với quy trình CI/CD tự động trên nền tảng AWS. Điểm nổi bật trong giải pháp là việc triển khai kiến trúc mạng dual-stack, cho phép hệ thống hoạt động đồng thời với cả IPv4 và IPv6. Điều này giúp ứng dụng sẵn sàng kết nối với các thiết bị và mạng hiện đại trong tương lai mà vẫn đảm bảo khả năng tương thích ngược.
Toàn bộ quá trình triển khai và vận hành ứng dụng được tự động hóa bằng các dịch vụ như Amazon EKS, CodePipeline, CodeBuild và CodeDeploy. Hệ thống giám sát và cảnh báo cũng được tích hợp thông qua CloudWatch và SNS, giúp phát hiện sự cố nhanh chóng và giảm thiểu thời gian khắc phục.
Việc áp dụng dual-stack mang lại nhiều lợi ích về lâu dài, đặc biệt là trong bối cảnh địa chỉ IPv4 ngày càng khan hiếm và nhu cầu sử dụng IPv6 ngày càng tăng. Bên cạnh đó, hệ thống CI/CD giúp tăng tốc độ phát triển, giảm sai sót khi triển khai và nâng cao độ ổn định cho toàn bộ ứng dụng.
Chi phí vận hành hạ tầng duy trì ở mức hợp lý, khoảng 180–200 USD mỗi tháng, và sau khoảng 6 tháng sử dụng ổn định, hệ thống bắt đầu mang lại hiệu quả đầu tư rõ rệt.
Tóm lại, dự án cho thấy cách tiếp cận kết hợp giữa hạ tầng cloud-native, CI/CD và mạng dual-stack không chỉ giúp tự động hóa quá trình phát triển phần mềm, mà còn chuẩn bị tốt cho các yêu cầu mở rộng và nâng cấp hệ thống trong tương lai.

# 1. Problem Statement
Hiện nay các tổ chức và doanh nghiệp đã và đang triển khai ứng dụng theo kiến trúc microservices, bên cạnh đó việc chuyển dịch hạ tầng từ IPv4 sang IPv6 đang trở thành 1 xu hướng phổ biến trong tương lai gần.
## Current Situation
- Các tổ chức và doanh nghiệp hiện nay đang phát triển ứng dụng của mình dựa trên kiến trúc microservices để đảm bảo tính độc lập và mở rộng của các dịch vụ cũng như các nhóm phát triển.
- Các hạ tầng mạng truyền thống chỉ hỗ trợ IPv4 tuy nhiên địa chỉ IPv4 dần cạn kiệt và xu thế của hạ tầng trong tương lai là chuyển dịch sang IPv6.
- Việc chuyển dịch hạ tầng sang các nền tảng Cloud Native như AWS để có thể quản lý linh hoạt cũng như việc tối ưu hóa chi phí đang trở thành xu hướng phổ biến.
- Các doanh nghiệp cần đánh giá khả năng sẵn sàng của hệ thống để chuyển sang Dual Stack, bao gồm các yếu tố: giám sát, bảo mật, DNS, định tuyến, và tích hợp pipeline
## Key Challenges
- Việc triển khai Dual-stack trong môi trường đa nền tảng rất phức tạp
    + Cần cấu hình kết hợp nhiều thành phần: VPC, Subnet, Route Table, InternetGateway, Route53,...
    + Một số dịch vụ của AWS chưa hỗ trợ IPv6 hoặc chỉ hỗ trợ một phần  
- Quản lý quá trình CI/CD cho hai môi trường Staging và Production
    + Đảm bảo việc phần quyền cũng như phiên bản của images và quá trình rollback khi có lỗi xảy ra
- Quản lý ECS và EKS
    + Hai công nghệ container khác nhau về cách quản lý, networking và deployment strategy
- Việc triển khai song song hai giao thức gây khó khăn trong việc giám sát và cảnh báo
    + Khó phân biệt giữa lỗi kết nối do IPv4/IPv6      
## Stakeholder Impact
- **Developer**
    + Triển khai nhanh chóng: tự động chạy Pipeline khi có trigger 
    + An toàn : Không cần truy cập trực tiếp Production — giảm rủi ro bảo mật
- **Tester**
    + Mối liên hệ giữa hai môi trường Staging và Production: Tester kiểm thử trong ECS Staging có cấu hình mạng và image giống Production
    + Kiểm thử Dual Stack: Có thể test cả IPv4 và IPv6 để phát hiện lỗi routing/DNS từ sớm
    + Có thể test performance ngay trong staging
- **Opeation**
    + Quản lý tập trung: Hạ tầng được triển khai trên AWS với các môi trường tách biệt cho các nhóm
    + Tối ưu chi phí: Scale các cụm ECS/EKS tùy theo điều kiện
    + Quản lý Image tập trung: Đảm bảo quá trình động bộ các image về phiên bản 
- **End User**  
    + Hiệu năng truy cập tốt và đa dạng hơn nhờ hỗ trợ IPv6
    + Ổn định: Hạ tầng chạy trên EKS đảm bảo tính sẵn sàng cao, quy trình kiểm thử tự động giúp giảm lỗi trên môi trường production
## Business Consequences
- **Tối ưu chi phí vận hành**: sử dụng các dịch vụ serverless(Fargate), giảm chi phí NAT các kết nối ra bên ngoài
- **Tăng tốc Time-to-Market**: do tự động hóa toàn bộ chuỗi build → test → deploy
- **Sẵn sàng mở rộng**: nhờ việc sử dụng các công cụ như EKS góp phần đơn giảm hóa quá trình scaling trong nhiều điều kiện khác nhau
- **Tăng độ tin cậy và khả năng kiểm soát rủi ro**: đảm bảo tính sẵn sàng của hệ thống, kiểm soát các rủi ro có thể xảy ra thông qua các dịch vụ giám sát như Cloud Watch và SNS
# 2. Solution Architecture
## Architecture Overview
Hệ thống được thiết kế theo mô hình multi-environment CI/CD pipeline với hai VPC riêng biệt đại diện cho môi trường Staging và Production, sử dụng các dịch vụ container của AWS là ECS Fargate (Staging) và Amazon EKS (Production). Cả hai VPC đều hỗ trợ Dual Stack (IPv4 + IPv6) nhằm đảm bảo khả năng kết nối mở rộng và sẵn sàng cho việc chuyển đổi mạng trong tương lai.
## AWS Services Used
| Dịch vụ | Vai trò |
|---|---|
| Amazon EKS | Triển khai ứng dụng trên môi trường Production | 
| Amazon ECS | Triển khai ứng dụng trên môi trường Staging cho mục đích test |
| Amazon ECR | Container Registry nơi lưu trữ các phiên bản của các Docker Image được build từ CodeBuild |
| AWS VPC | Tạo các môi trường riêng biệt và độc lập cho các giai đoạn khác nhau | 
| IAM | Tạo các user, các role cho phù hợp cho các team phát triển và các quá trình |
| AWS Code Pipeline | Điều phối CI/CD pipeline |
| AWS Code Build | Build Docker image từ source code | 
| AWS CodeDeploy | Deploy ECS task sau khi build |
| Amazon Route 53 | Quản lý DNS và routing domain đến ALB |
| Application Load Balancer | Điều phối các traffic đến các node trong cụm |
| Amazon CloudWatch | Thu thập logs, metrics và tạo alarm |
| Amazon SNS | Gửi thông báo khi có sự kiện xảy ra | 
## Component Design
- CI/CD pipeline
    + Code commit/Github: lưu giữ source code
    + 3 Phase pipeline
      + Commit: Trigger khi thỏa điều kiện 
      + Build: Sử dụng Code Build dể build các image và đẩy lên ECR
      + Deploy: Sử dụng Code Deploy để chạy các container trên các ECS task để kiểm thử hoạt động của ứng dụng
- ECS cluster - Fargate (Staging)
    + ECS Task được triển khai tự động sau khi build xong
    + Kết nối tới LoadBalancer 
    + Kết nối ra ngoài thông qua Egress-only IGW(IPv6)
- EKS cluster (Prodcution)
    + EKS pod sử dụng image từ ECR
    + Triển khai các node trong multi AZ
    + Kết nối đến ALB để chia tải cho các node
    + Có đường kết nối ra bên ngoài sử dụng Egress-only IGW(IPv6)
- Các thành phần khác:
    + Route53: trỏ domain đến các ALB, quản lý các A và AAAA record
    + Cloud Watch và SNS: CloudWatch thu thập logs và metrics từ ECS/EKS, SNS gửi cảnh báo về hệ thống
    + Amazon ECR: Lưu trữ image từ quá trình Build
## Security Architecture
Network-level Security
| Thành phần | Yêu cầu |
| ---- | ---- | 
| VPC Stag / VPC Prod | Tách biệt hoàn toàn, không chia sẻ subnet hoặc security group |
| Private Subnet | ECS Task và EKS Pod chỉ chạy trong subnet private | 
| Egress-Only IGW | Cho phép outbound IPv6 từ private subnet |
| Route Tables | Chỉ định tuyến đến các subnet trong VPC và Egress-Only IGW |
- Security Groups
    + Mỗi ECS task, EKS node group, ALB được gán Security Group riêng.
    + Ingress rules giới hạn truy cập theo port (ví dụ: chỉ HTTP/HTTPS từ ALB)
- IAM Roles & Policies: 
    + Cấu hình các IAM user và phân quyền phù hợp cho các nhóm: Dev, Test,..
    + Tạo các role tách biệt cho từng dịch vụ: CodeBuild, ECS Task, EKS Pod
- DNS và Public Access
    + Route 53 public hosted zone trỏ domain về ALB.
    + ALB được gán public IP, nhưng container bên trong vẫn private.
    + Không mở port vào ECS Task hoặc Pod nếu không cần (chỉ expose qua Ingress/ALB)
- Giám sát và Cảnh báo
    + CloudWatch Alarm theo dõi CPU, Memory, log error.
    + Khi vượt ngưỡng, gửi cảnh báo qua SNS đến Email/Slack/DevOps tool
## Scalability Design
- ECS Cluster
    + Service Auto Scaling dựa trên: CPU Utilization (%) và Memory Usage (%)
    + Tự động tăng/giảm số lượng ECS task trong ECS Service
    + Giúp staging linh hoạt test tải lớn
- EKS Cluster  
    + Horizontal scaling: scale pod hoặc node khi số lượng tải tăng cao hoặc metric vượt ngưỡng
    + ALB Auto Scaling: Application Load Balancer có thể mở rộng listener và target group theo lưu lượng đến
- Multi-AZ Deployment
    + Các node trong hai cụm EKS và ECS được triển khai tối thiểu trên 2 AZ 
    + Đảm bảo tính sẵn sàng (HA) và khả năng phục hồi (resiliency)
- IPv6 : Hỗ trợ các kết nối IPv6 giảm độ trễ khi NAT cũng như hỗ trợ 2 loại DNS record là A và AAAA 
# 3. Technical Implementation
## Implementation Phases
Phase 1 - Infrastructure Setup
  - Tạo các VPC tách biệt cho hai môi trường Staging và Production hỗ trợ dual-stack
  - Thiết lập các private subnets trong các AZ khác nhau
  - Triển khai cụm EKS trên VPC Production và cụm ECS trên VPC Staging  
  -  Cấu hình Egress Internet access cho IPv6 
  - Cấu hình các Security Group và Route Table hỗ trợ bảo mật và giao tiếp trong các VPC
  - Cấu hình IAM role , IAM user
Phase 2 - CI/CD Setup
  - Tạo repo với AWS CodeCommit / Liên kết với Github repo
  - Tạo trigger với các điều kiện chạy pipeline khác nhau
  - Thiết lập pipeline qua AWS CodePipeline: CodeCommit → CodeBuild → CodeDeploy
  - Triển khai ECR để lưu trữ container image cho ứng dụng microservice
Phase 3 - Application Deployment
  - Chạy CodePipeline build và đẩy image lên ECR 
  - Tiến hành chạy thử trên môi trường Staging với cụm ECS
  - Khi ứng dụng hoạt động ổn định trên môi trường Staging, triển khai ứng dụng lên cụm EKS 
  - Tạo các manifest Kubernetes để sử dụng dual-stack IP
Phase 4 - Monitoring and Alerts
  - Tích hợp Amazon CloudWatch để giám sát cụm EKS
  - Thiết lập SNS để gửi cảnh báo khi có sự cố hoặc vấn đề hiệu năng
## Technical Requirements
AWS Services
  - CI/CD tools: AWS CodePipeline, CodeBuild, CodeCommit, CodeDeploy
  - Container management: Amazon EKS, Amazon ECS, Amazon ECR
  - Network: VPC
  - Compute: EC2, Fargate
  - Monitor and alert: CloudWatch, SNS
Network
  - Dual-stack IPv4 và IPv6 với các CIDR block 10.x.0.0/16 và 2001:db::/56
  - Egress Internet Gateway để giao tiếp từ VPC ra ngoài Internet sử dụng IPv6
  - Route Table giao tiếp nội bộ giữa các subnet
Security
  - IAM Role cho EKS và các service CI/CD
  - Security Group cho các private subnet
Container & Build
  - Docker, docker registry 
  - Kubernetes manifests    
## Development Approach
  - Sử dụng GitOps để quản lý manifest Kubernetes và pipeline CI/CD.
  - Mỗi lần đẩy mã nguồn mới lên CodeCommit sẽ kích hoạt pipeline để:
    - Xây dựng Docker image bằng CodeBuild
    - Đẩy lên ECR
    - Tự động triển khai ứng dụng lên EKS qua CodeDeploy
  - Manifest Kubernetes được tối ưu để khai thác dual-stack
## Testing Strategy
- Functional Testing: Kiểm tra các dịch vụ microservices hoạt động ổn định trong cả môi trường IPv4 và IPv6.
- Performance Testing: So sánh throughput, latency giữa dual-stack và IPv4-only.
- CI/CD Testing:
  - Tạo commit giả định để kiểm tra luồng pipeline.
  - Kiểm tra tự động rollback nếu triển khai lỗi.
- Monitoring Verification:
  - Kiểm tra metric gửi về CloudWatch.
  - Thử nghiệm gửi alert qua SNS đến email/dev team
## Deployment Plan
| Step | Task | Team | Environment | 
|---|---|---|---|
| 1 | Provision VPCs và EKS | DevOps | AWS |
| 2 | Setup pipeline CI/CD | DevOps | CodePipeline |
| 3 | Build & push container | CodeBuild | ECR |
| 4	| Deploy microservices | CodeDeploy | EKS |
| 5	| Enable monitoring & alerts | 	DevOps | CloudWatch, SNS |
| 6 | Test hệ thống | QA team |	Staging/Prod |

# 4. Timeline & Milestones
## Project Timeline
| Tuần     | Giai đoạn                 | Hoạt động cụ thể                                                                                          | Thời gian   | Trách nhiệm       |
|----------|---------------------------|------------------------------------------------------------------------------------------------------------|-------------|-------------------|
| Tuần 1   | Phase 1 – Infrastructure   | - Thiết kế sơ đồ mạng, chia subnet dual-stack (IPv4 + IPv6)<br>- Khởi tạo VPC Prod & Staging<br>- Tạo subnet riêng tư & NAT Gateway<br>- Tạo cụm Amazon EKS | 5 ngày      | DevOps            |
| Tuần 2   | Phase 2 – CI/CD Setup      | - Tạo CodeCommit repo<br>- Viết Dockerfile & buildspec.yml<br>- Cấu hình CodeBuild và ECR<br>- Thiết lập CodePipeline<br>- Gán IAM Role | 5 ngày      | DevOps, DevTeam   |
| Tuần 3   | Phase 3 – App Deployment   | - Container hóa ứng dụng<br>- Viết manifest Kubernetes (Deployment, Service, dual-stack config)<br>- Triển khai thử nghiệm lên EKS Staging | 5 ngày      | DevTeam, DevOps   |
| Tuần 4   | Phase 3 & 4                | - Deploy lên Production<br>- Bật Container Insights & CloudWatch<br>- Thiết lập dashboard & SNS alerts<br>- Kiểm thử hệ thống cảnh báo | 5 ngày      | DevOps, QA        |
| Tuần 5   | Phase 5 – Testing          | - Benchmark hiệu năng dual-stack vs IPv4-only<br>- Ghi nhận log & metric<br>- Tối ưu pipeline & cấu hình | 5 ngày      | QA, DevOps, DevTeam |
## Key Milestones
| Mốc quan trọng                                            | Thời gian dự kiến | Mô tả                                                               |
|-----------------------------------------------------------|-------------------|---------------------------------------------------------------------|
| ✅ Hoàn tất cấu hình mạng dual-stack                      | Cuối tuần 1       | VPC, subnet IPv6, route table hoàn thiện                           |
| ✅ CI/CD pipeline hoạt động đầy đủ                         | Cuối tuần 2       | Build → Push image → Deploy lên EKS                                |
| ✅ Deploy thành công ứng dụng trên EKS                    | Giữa tuần 4       | Ứng dụng chạy trên Staging và Production                           |
| ✅ CloudWatch + SNS hoạt động ổn định                     | Cuối tuần 4       | Có log, cảnh báo gửi về email/dev team                             |
| ✅ Kết thúc benchmark dual-stack vs IPv4-only             | Cuối tuần 5       | So sánh chi tiết hiệu năng, lưu kết quả và đề xuất tối ưu          |
## Dependencies
| Hạng mục                 | Phụ thuộc vào                                                            |
|--------------------------|-------------------------------------------------------------------------|
| CI/CD hoạt động          | ECR và IAM Role đã được cấu hình                                        |
| Deploy ứng dụng          | EKS đã triển khai, image đã push lên ECR                                |
| Monitoring               | Ứng dụng đã chạy, EKS bật CloudWatch hoặc Prometheus exporter           |
| Benchmark hiệu năng      | Cả môi trường IPv4-only và dual-stack đã sẵn sàng                       |
## Resource Allocation
| Vai trò            | Số lượng | Nhiệm vụ cụ thể                                                                 |
|--------------------|----------|---------------------------------------------------------------------------------|
| DevOps Engineer     | 1–2      | Thiết lập hạ tầng (VPC, EKS, CI/CD, giám sát, bảo mật mạng)                   |
| Backend Developer   | 2        | Viết mã microservices, Dockerfile, Kubernetes manifest                         |
| QA/Tester           | 1–2      | Viết test case, chạy kiểm thử, đo hiệu năng hệ thống dual-stack                |
| Project Manager     | 1        | Quản lý tiến độ, điều phối công việc và milestone hàng tuần                     |

# 5. Budget Estimation
## Infrastructure Costs
| Dịch vụ AWS | Mục đích sử dụng | Thông số | Chi phí ước tính hàng tháng (USD) |
| ---- | ---- | ---- | ---- |
| Applicatipn Load Balancer | Cân bằng tải cho cụm EKS | 300GB/tháng | 20.80 |
| Network Load Balancer | Cân bằng tải cụm ECS | 30GB/tháng | 18.58 |
| Amazon Route 53 | 	DNS cho ứng dụng | 1 hosted zone | 0.50 |
| Amazon ECR | Lưu trữ Docker image | 100GB / tháng | 10 |
| Amazon EKS (không bao gồm EC2/NodeGroup) | Cluster control plane | 1 cluster - 4 nodes | 73 |
| Amazon ECS - Fargate | Test container task | 10 task/ngày và duration 1 giờ | 37.49 |
| AWS CodeBuild | Build Image/Container | 300 build/tháng | 24 |
| S3 (tùy chọn) | Lưu trữ build artifact/log | 100 GB/ tháng | 2.5 |

**Monthly cost**: 186.87 USD 
**12 months cost**: 2,242.44 USD 
*Các dịch vụ khác có chi phí hàng tháng không đáng kể hoặc không tính phí và chi phí đã bao gồm tùy chọn thêm S3*
## Operational Costs
| Dịch vụ AWS | Mục đích sử dụng | Thông số | Chi phí ước tính hàng tháng (USD) |
| ---- | ---- | ---- | ---- |
| CloudWatch Metrics	| Theo dõi CPU, memory, logs ECS/EKS | 10 metrics /tháng | 3 |
| CloudWatch Logs	| Logs ECS, EKS, ứng dụng | 20GB/tháng | 14.09 |
| CloudWatch Alarms | Cảnh báo CPU, memory, error | 20 alarm /tháng | 2 |

**Monthly cost**: 19.09 USD 
**12 months cost**: 229.08 USD
*Các dịch vụ khác có chi phí hàng tháng không đáng kể hoặc không tính phí*
## ROI Analysis
## 🏗️ Investment (Chi phí hạ tầng ban đầu - không bao gồm nhân công)
| Hạng mục chi phí                     | Mô tả                                                | Ước tính chi phí hàng tháng (USD) |
|--------------------------------------|-------------------------------------------------------|------------------------------------|
| Hạ tầng AWS | Chi phí cho cụm EKS, ECS, ECR, CodePipeline, Route53 và các LoadBalancer | 180~200 |
| Chi phí monitoring | CloudWatch và SNS | 20 |
**Tổng chi phí**: 200~220 USD 
## 💡 Return (Lợi ích mang lại)
| Giá trị mang lại                            | Ước lượng tiết kiệm / tháng       | Ghi chú                                             |
|---------------------------------------------|-----------------------------------|-----------------------------------------------------|
| Tự động hóa triển khai (CI/CD)              | Tiết kiệm 10–20 giờ thao tác thủ công / tháng | Giảm lỗi và downtime khi triển khai                |
| Tăng tốc vòng đời release                   | Rút ngắn 30–50% thời gian release | Cải thiện tốc độ phản hồi và thời gian ra thị trường |
| Giảm chi phí NAT và bandwidth               | Tận dụng subnet riêng và IPv6     | Hạn chế dùng NAT Gateway                            |
| Sẵn sàng mạng IPv6                          | Tránh chi phí chuyển đổi sau này  | Hạn chế rủi ro kỹ thuật dài hạn                     |
| Cảnh báo chủ động qua SNS                   | Giảm thời gian phát hiện & khắc phục sự cố         | Tăng tính sẵn sàng dịch vụ                          |

- Với chi phí hạ tầng ổn định khoảng **$200–220/tháng**, hệ thống bắt đầu hoàn vốn sau khoảng **6 tháng**.
- ROI tiếp tục tăng theo thời gian nhờ:
  - **Tối ưu hóa quy trình vận hành**
  - **Giảm các chi phí liên quan đến NAT**
  - **Khả năng mở rộng & tiết kiệm chi phí mạng nhờ dual-stack**
  - **Khả năng ứng phó với sự cố tốt hơn thông qua cảnh báo tự động**
# 6. Risk Assessment
## Risk Matrix
| Rủi ro                                         | Mức độ ảnh hưởng | Khả năng xảy ra | Mức độ ưu tiên | Ghi chú                                                                 |
|------------------------------------------------|------------------|------------------|----------------|-------------------------------------------------------------------------|
| ⚠️ Cấu hình sai mạng dual-stack                | Cao              | Trung bình       | Cao            | Gây lỗi kết nối hoặc triển khai thất bại                              |
| ⚠️ Pipeline CI/CD bị gián đoạn                 | Cao              | Trung bình       | Cao            | Làm chậm quá trình deploy, ảnh hưởng đến tiến độ                      |
| ⚠️ IAM Role/Policy thiếu quyền                | Trung bình       | Cao              | Cao            | Dẫn đến lỗi truy cập dịch vụ AWS như ECR, EKS                          |
| ⚠️ CloudWatch không ghi nhận log/metrics       | Trung bình       | Thấp             | Trung bình     | Giảm khả năng giám sát hệ thống                                       |
| ⚠️ Benchmark không phản ánh đúng thực tế      | Thấp             | Trung bình       | Thấp           | Do môi trường test khác thực tế hoặc cấu hình chưa tối ưu             |
| ⚠️ Ứng dụng không hỗ trợ tốt IPv6             | Cao              | Thấp             | Trung bình     | Có thể gây lỗi kết nối cho một số dịch vụ microservice                |
| ⚠️ Sự cố bảo mật IAM/Cluster                   | Rất cao          | Thấp             | Rất cao        | Có thể bị truy cập trái phép nếu role cấu hình sai                    |
## Mitigation Strategies
| Rủi ro                                         | Biện pháp giảm thiểu                                                             |
|------------------------------------------------|----------------------------------------------------------------------------------|
| Cấu hình sai mạng dual-stack                  | - Kiểm tra kỹ CIDR IPv4 & IPv6<br>- Tạo route table rõ ràng<br>- Kiểm thử networking |
| Pipeline CI/CD bị gián đoạn                   | - Thiết lập thông báo lỗi trong CodePipeline<br>- Backup định kỳ các buildspec.yml |
| IAM Role/Policy thiếu quyền                  | - Sử dụng nguyên tắc **least privilege**<br>- Kiểm thử IAM trước khi deploy       |
| CloudWatch không ghi log                      | - Kiểm tra quyền ghi của EKS node IAM<br>- Enable logging ở pod và container      |
| Benchmark không chính xác                     | - Chạy nhiều lần, ở giờ cao/giờ thấp<br>- Ghi log và dùng công cụ đo khách quan    |
| Ứng dụng không hỗ trợ IPv6                    | - Kiểm thử module theo từng phần với địa chỉ IPv6<br>- Dùng fallback về IPv4 nếu lỗi |
| Sự cố bảo mật                                  | - Sử dụng RBAC cho EKS<br>- Audit IAM policy<br>- Xoá quyền thừa sau khi test     |
## Contingency Plans
| Rủi ro                                         | Kế hoạch ứng phó khi xảy ra sự cố                                               |
|------------------------------------------------|---------------------------------------------------------------------------------|
| Cấu hình mạng sai                              | - Rollback template mạng (sử dụng Terraform/CloudFormation)<br>- Dùng VPC backup |
| Pipeline CI/CD lỗi                             | - Sử dụng bản build image thủ công để deploy tạm thời                           |
| IAM thiếu quyền                                | - Gán tạm thời quyền rộng hơn cho role sau đó giới hạn lại sau khi deploy xong |
| CloudWatch không log                           | - Chuyển sang Prometheus tạm thời để ghi metric<br>- Dùng kubectl logs trực tiếp |
| Benchmark sai lệch                             | - Tạm hoãn đánh giá<br>- Thực hiện lại với traffic thực tế                      |
| Không hỗ trợ IPv6                              | - Tạm thời switch về cấu hình IPv4-only cho service đó                          |
| Sự cố bảo mật                                  | - Tắt toàn bộ quyền truy cập từ ngoài<br>- Rotate key/credential, bật logging   |
# 7. Expected Outcomes
## Success Metrics
| Mục tiêu đo lường                  | Tiêu chí cụ thể                                                       | Mốc đánh giá               |
|-----------------------------------|------------------------------------------------------------------------|----------------------------|
| ⏱️ Thời gian triển khai (Deployment Time) | < 5 phút kể từ khi commit đến khi ứng dụng được triển khai lên ECS | Sau khi hoàn tất CI/CD |
| ✅ Tỉ lệ thành công của pipeline | > 95% pipeline chạy thành công không lỗi | Mỗi tuần kiểm tra thống kê |
| 📊 Hiệu năng hệ thống              | So sánh latency/throughput giữa IPv4-only và dual-stack (<= ±5%)        | Sau kiểm thử tuần 5       |
| 🛡️ Mức độ ổn định của hệ thống     | Không downtime trong môi trường Production trong vòng 2 tuần thử nghiệm | Sau tuần 5                |
| 🔔 Giám sát & cảnh báo            | 100% cảnh báo gửi đúng kênh (email, SNS) trong thời gian thực           | Sau kiểm thử tuần 4        |
## Business Benefits
- 💸 **Tăng hiệu quả DevOps**:
  - Tự động hóa hoàn toàn quy trình triển khai giúp giảm thời gian và nhân lực
  - Giảm chi phí NAT khi giao tiếp ra bên ngoài Internet
- 🌐 **Chuẩn bị cho tương lai IPv6**:
  - Sẵn sàng kết nối với các hệ thống hiện đại hỗ trợ IPv6 
- 🚀 **Tăng tốc đưa sản phẩm ra thị trường**:
  - Việc triển khai nhanh, rollback tự động giúp nhóm phát triển release liên tục
- 🔒 **Tăng cường bảo mật hạ tầng**:
  - Triển khai trong subnet riêng tư, kiểm soát IAM chặt chẽ, logging tập trung
## Technical Improvements
- ✅ Tích hợp **CI/CD hoàn chỉnh** với AWS CodePipeline, CodeBuild, CodeDeploy
- ✅ Sử dụng **EKS + dual-stack** để hỗ trợ IPv6 song song IPv4
- ✅ Thiết lập **giám sát chủ động** với CloudWatch, cảnh báo qua SNS
- ✅ Áp dụng **best practices về mạng và IAM** (least privilege, subnet tách biệt)
- ✅ Hạ tầng **có thể mở rộng dễ dàng** (Auto Scaling, node group theo nhu cầu)
## Long-term Value
- 🌍 **Tương thích mạng toàn cầu với dual-stack (IPv6 + IPv4)**  
  - Việc triển khai kiến trúc dual-stack giúp hệ thống sẵn sàng cho sự chuyển đổi toàn cầu sang IPv6, đặc biệt quan trọng trong các khu vực mà địa chỉ IPv4 đã cạn kiệt (ví dụ: châu Á, các nhà mạng di động).
  - Cho phép ứng dụng kết nối đồng thời với cả thiết bị chỉ hỗ trợ IPv4 và thiết bị hiện đại dùng IPv6 (IoT, 5G, thiết bị di động...).
- 🔄 **Tăng khả năng mở rộng & khả năng phục hồi (Scalability & Resilience)**  
  - Với dual-stack, hệ thống có thể tận dụng các đường truyền và gateway song song, cải thiện tính sẵn sàng và tối ưu đường đi mạng.
  - Cho phép triển khai trên các nền tảng cloud khác nhau mà không cần thay đổi kiến trúc mạng.
- 🔐 **Tăng cường bảo mật và kiểm soát truy cập**  
  - Sử dụng IPv6 giúp quản lý truy cập chi tiết hơn với phân vùng địa chỉ rõ ràng, hỗ trợ firewall cấp subnet và security group tối ưu hơn.
  - Dễ áp dụng các chính sách phân tách mạng (network segmentation) và zero trust hơn so với mô hình IPv4-only truyền thống.
- 📊 **Đặt nền móng cho quan sát hệ thống hiện đại (Observability Ready)**  
  - Dual-stack hỗ trợ đầy đủ việc thu thập metric từ cả giao tiếp IPv4 và IPv6 qua CloudWatch/Prometheus, giúp đánh giá toàn diện lưu lượng và hiệu năng mạng.
  - Tạo điều kiện để phát triển các hệ thống AI/ML phân tích mạng trong tương lai.
- 🏗️ **Nền tảng linh hoạt cho các thế hệ ứng dụng tiếp theo**  
  - Là bước đệm vững chắc để triển khai các ứng dụng đòi hỏi kết nối toàn cầu, độ trễ thấp như livestream, game, IoT platform...
  - Dễ tích hợp vào môi trường hybrid-cloud hoặc multi-cloud mà không cần cấu hình lại địa chỉ mạng.
---

# Appendices
## A. Technical Specifications
| Thành phần | Các tham số cấu hình đề xuất |
| --- | --- |
| VPC | Prod_VPC CIDR blocks 10.10.0.0/16 - 2001:db8:123:1a00::/56 | 
|     | Stag_VPC CIDR blocks 10.20.0.0/16 - 2001:db8:123:2b00::/56 |
| ECS - Fargate | Cấu hình task runner: 2vCPUs - 4GB memory - 20GB Storage |
| CodeBuild | CodeBuild instance: arm1.medium 4vCPU - 8GB memory |
| EKS | 4 nodes, có thể tối ưu hóa RAM hoặc CPU dựa trên ứng dụng và các dịch vụ sử dụng (gợi ý: c5.xlarge: 4 vCPU, 8 GB RAM) |

Các service còn lại sử dụng Standard tier 
## B. Cost Calculations
Các chi phí được tính toán dựa trên AWS Region Singapore (ap-southeast-1), các services được tính toán dựa trên các cấu hình đề xuất ở phần **5.Budget Estimation**
**Monthly cost**: 200~220 USD 
**12 months cost**: 2,200 ~ 2,500 USD
> Region Singapore có mức phí trung bình, tùy theo các yêu cầu về vị trí cũng như độ trễ có thể sử dụng các region khác có thể ảnh hưởng đến chi phí tổng 8-10% 
## C. Architecture Diagrams
**Kiến trúc hạ tầng đề xuất**
![Architecture](/submissions/vu-quang-huy/project-proposal/Solutiondrawio.drawio.png)
## D. References
1. [Enable outbound IPv6 traffic using an egress-only internet gateway](https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html)
2. [Modernize Applications with Microservices Using Amazon EKS](https://docs.aws.amazon.com/architecture-diagrams/latest/modernize-applications-with-microservices-using-amazon-eks/modernize-applications-with-microservices-using-amazon-eks.html#diagram-history)
3. [AWS services that support IPv6](https://docs.aws.amazon.com/vpc/latest/userguide/aws-ipv6-support.html)
4. [Dual-stack IPv6 architectures for AWS and hybrid networks](https://aws.amazon.com/vi/blogs/networking-and-content-delivery/dual-stack-ipv6-architectures-for-aws-and-hybrid-networks/)
5. [Netflix’s IPv6 journey: Building network configurations on AWS](https://d1.awsstatic.com/events/Summits/reinvent2023/NFX301-R_Netflixs-IPv6-journey-Building-network-configurations-on-AWS-REPEAT.pdf)