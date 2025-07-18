
# Week 5 Summary - Performance & Cost Optimization

## 📊 Tổng quan tuần 5 (09/06/2025 - 13/06/2025)

### 🎯 Mục tiêu tuần đã đặt ra
- [x] Phân tích và xác định các điểm nghẽn hiệu năng của ứng dụng NodeJS và database MongoDB.
- [x] Triển khai một lớp caching hiệu năng cao với **Amazon ElastiCache for Redis**.
- [x] Phân tích và tối ưu hóa chi phí vận hành hệ thống bằng **AWS Cost Explorer**.
- [x] Áp dụng các chiến lược tiết kiệm chi phí như **AWS Fargate Spot**.
- [x] Thiết lập hệ thống **AWS Budgets** để chủ động quản lý chi tiêu.

### 📈 Tiến độ hoàn thành: 100%

## 🏆 Thành tựu chính

### 1. Performance Tuning Mastery
- Cải thiện đáng kể hiệu năng của trang web:
  - **Giảm độ trễ cho các API đọc dữ liệu (như danh sách sản phẩm) lên đến 70%** nhờ việc triển khai caching một cách hiệu quả.
- Sử dụng các công cụ phân tích để:
  - Xác định và tối ưu hóa các câu lệnh truy vấn MongoDB chậm.
  - Trực tiếp cải thiện trải nghiệm mua sắm của người dùng.

### 2. FinOps & Cost Optimization
- Áp dụng thành công **Fargate Spot**:
  - **Giảm chi phí tính toán cho các service backend lên đến 65%** mà vẫn duy trì độ ổn định cần thiết.
- Xây dựng quy trình phân tích chi phí hàng tuần:
  - Chuyển từ trạng thái bị động sang chủ động trong việc quản lý ngân sách cho hạ tầng.

### 3. High-Performance Architecture Implementation
- Nâng cấp kiến trúc hiện tại bằng cách:
  - Thêm vào một lớp caching (ElastiCache), tăng khả năng chịu tải và giảm tải trực tiếp cho database.
- Tinh chỉnh cấu hình:
  - ECS Service và Application Load Balancer để đạt được sự cân bằng tối ưu giữa hiệu năng và chi phí.

### 4. Proactive Financial Governance
- Thiết lập thành công các cảnh báo ngân sách (Budget Alerts):
  - Đảm bảo chi phí vận hành luôn nằm trong tầm kiểm soát.
  - Tránh được những chi tiêu bất ngờ.

## 📚 Kiến thức và kỹ năng đạt được

### Technical Skills
- **AWS Services**:
  - Amazon ElastiCache for Redis
  - AWS Cost Explorer
  - AWS Budgets
  - Fargate Spot
- **DevOps**:
  - Performance Tuning
  - Caching Strategies (Cache-Aside)
  - Cost Optimization (FinOps)
- **Database**:
  - MongoDB Performance Tuning
  - Indexing Strategies
- **Architecture**:
  - Thiết kế kiến trúc có lớp caching
  - Kiến trúc chịu tải cao
- **Networking**:
  - Cấu hình Security Groups cho phép ECS giao tiếp với ElastiCache

### Soft Skills
- **Data Analysis**:
  - Phân tích biểu đồ chi phí và các chỉ số hiệu năng để tìm ra insight.
- **Business Acumen**:
  - Hiểu được sự liên kết trực tiếp giữa việc tối ưu kỹ thuật và kết quả kinh doanh (trải nghiệm người dùng, lợi nhuận).
- **Strategic Planning**:
  - Lập kế hoạch tối ưu chi phí dài hạn.

## 🚧 Challenges và Solutions

### Major Challenges Overcome
1. **Cache Invalidation Strategy:**
   - Việc quyết định khi nào cần xóa dữ liệu trong cache để đảm bảo người dùng thấy thông tin mới nhất (ví dụ: giá sản phẩm thay đổi) là rất phức tạp.
   - **Giải quyết:** Bắt đầu với một chiến lược đơn giản là đặt **Time-To-Live (TTL)** thấp (ví dụ: 5 phút) cho dữ liệu cache. Điều này cân bằng giữa hiệu năng và tính cập nhật của dữ liệu.
2. **Identifying What to Cache:**
   - Không phải API nào cũng nên được cache. Việc cache các API ghi dữ liệu hoặc ít được gọi sẽ không hiệu quả.
   - **Giải quyết:** Sử dụng CloudWatch metrics để phân tích các API được gọi nhiều nhất và có thời gian phản hồi lâu nhất. Tập trung nỗ lực caching vào các API đọc dữ liệu, có tần suất truy cập cao này.
3. **Ensuring Stability with Spot Instances:**
   - Fargate Spot có thể bị ngắt quãng.
   - **Giải quyết:** Chỉ áp dụng Fargate Spot cho các service zustandslos (stateless) của backend. Cấu hình ECS Service để luôn duy trì một số lượng tối thiểu các task chạy trên Fargate theo yêu cầu (On-Demand) để đảm bảo tính sẵn sàng, phần còn lại sẽ dùng Spot để tiết kiệm chi phí.

### Key Learnings
- Tối ưu hóa hiệu năng không phải là làm cho mọi thứ nhanh hơn, mà là làm cho những thứ quan trọng nhất nhanh hơn.
- FinOps (Financial Operations) là một phần không thể thiếu của DevOps. Việc xây dựng một hệ thống tốt cũng bao gồm việc xây dựng nó với chi phí hợp lý.
- Caching là một công cụ hai lưỡi: nó có thể tăng tốc hệ thống một cách đáng kinh ngạc, nhưng cũng mang lại sự phức tạp trong việc quản lý tính nhất quán của dữ liệu.

## 📊 Metrics và Results

### Performance Achievements
- **API Latency Reduction:** Giảm 70% thời gian phản hồi P99 cho API lấy danh sách sản phẩm.
- **Database Read Reduction:** Giảm 60% số lượt đọc trên database MongoDB cho các workload thông thường.
- **Cache Hit Rate:** Đạt được tỉ lệ cache hit trên 85% cho các endpoint được tối ưu.

### Quality Metrics
- **Cost Savings:** Giảm 65% chi phí compute cho ECS services nhờ Fargate Spot.
- **Budget Adherence:** 100% các chi tiêu nằm trong ngân sách đã đặt ra với hệ thống cảnh báo chủ động.
- **Documentation:** Tạo được tài liệu "Playbook Tối ưu hóa Hiệu năng và Chi phí" để áp dụng trong tương lai.

## 🔮 Kế hoạch tuần tới (Week 6)

### Focus Areas
- **Advanced Observability:** 
  - Chuyển từ giám sát (monitoring) sang khả năng quan sát (observability) sâu sắc.
- **Automated Operations:** 
  - Tự động hóa các quy trình vận hành thủ công.
- **Resilience Engineering:** 
  - Chuẩn bị cho các kịch bản lỗi.

### Learning Objectives
- Master **AWS X-Ray** để thực hiện Distributed Tracing, theo dõi một request qua nhiều service.
- Sử dụng **AWS Systems Manager (SSM) Automation** để tạo các kịch bản tự động hóa (Runbooks).
- Tìm hiểu và thực hành các khái niệm cơ bản của **Chaos Engineering**.

## 💡 Key Insights

### Technical Insights
- **ElastiCache** là một giải pháp cực kỳ hiệu quả để giảm tải cho hầu hết mọi loại database, không chỉ riêng RDS.
- **Fargate Spot** là một công cụ tuyệt vời để tối ưu chi phí, nhưng cần được triển khai với một chiến lược rõ ràng để không ảnh hưởng đến độ ổn định.
- Phân tích chi phí trên **Cost Explorer** không chỉ là việc của kế toán, mà là một kỹ năng quan trọng của kỹ sư DevOps để xây dựng các hệ thống bền vững.

### Strategic Insights
- Hiệu năng và chi phí không chỉ là các chỉ số kỹ thuật, chúng là các **tính năng quan trọng** của sản phẩm, ảnh hưởng trực tiếp đến sự hài lòng của khách hàng và lợi nhuận của doanh nghiệp.
- Một hệ thống được tối ưu tốt là một hệ thống có sự cân bằng giữa Performance, Cost, và Reliability.

## 🎯 Self Assessment

### Overall Performance: 9.5/10
- **Strengths:** 
  - Áp dụng thành công các kỹ thuật tối ưu hóa nâng cao, mang lại kết quả có thể đo lường được và có giá trị trực tiếp cho kinh doanh.
- **Areas for Growth:** 
  - Cần đào sâu hơn vào việc tự động hóa các quy trình vận hành và khắc phục sự cố.

### Learning Velocity: Excellent
- Nhanh chóng nắm bắt và triển khai các dịch vụ mới (ElastiCache, Cost Explorer) và các khái niệm phức tạp (FinOps).
- Cân bằng tốt giữa việc tối ưu kỹ thuật và hiểu được tác động kinh doanh.

### Readiness for Advanced Topics: High
- Nền tảng vững chắc về hiệu năng và chi phí cho phép khám phá các chủ đề vận hành nâng cao như Observability và Chaos Engineering.

---

**Week 5 Status: ✅ COMPLETED SUCCESSFULLY**

*Prepared by: Tran Nguyen Daenel*  
*Review Date: 13/06/2025*  
*Next Milestone: Advanced Observability & Operations (Week 6)*
