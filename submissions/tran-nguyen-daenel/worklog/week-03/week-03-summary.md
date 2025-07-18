# 📊 TUẦN 3 - TỔNG KẾT (26/05/2025 - 30/05/2025)

## 🎯 Tổng Quan Tuần 3 

### 🎯 Mục Tiêu Đã Đặt Ra
- [x] Tối ưu hóa hiệu năng ứng dụng với **Amazon ElastiCache (Redis)**
- [x] Phân phối nội dung toàn cầu, giảm độ trễ với **Amazon CloudFront**
- [x] Triển khai logic tại biên với **Lambda@Edge**
- [x] Nắm vững các khái niệm mạng nâng cao: **VPC Peering, Transit Gateway**
- [x] Chuyển đổi từ CloudFormation (YAML) sang **AWS CDK** (TypeScript)
- [x] Viết lại toàn bộ hạ tầng (VPC, ECS, Pipeline) bằng AWS CDK
- [x] Tự động hóa bản sao lưu với **EBS Data Lifecycle Manager**

### ✅ Kết Quả Đạt Được
- **100% mục tiêu hoàn thành**
- Hạ tầng được quản lý bằng code (AWS CDK), tăng linh hoạt & tái sử dụng
- Cải thiện 70-80% thời gian phản hồi nhờ caching & CDN
- Ứng dụng triển khai toàn cầu với độ trễ thấp
- Thành thạo tối ưu hóa hiệu năng & chi phí ở cấp độ chuyên sâu

---

## 📚 Kiến Thức Đã Học

### 🔧 Performance & Advanced IaC Services

1. **Amazon ElastiCache**
  - So sánh Redis vs Memcached, chọn Redis cho tính năng nâng cao  
  - Triển khai **Cache-aside** giảm tải database  
  - Chiến lược cache invalidation: TTL  
  - Cấu hình cluster & Security Groups  

2. **Amazon CloudFront**
  - Cấu hình Distribution cho nội dung tĩnh (S3) & động (ALB)  
  - Tùy chỉnh Cache Behaviors  
  - Dùng **CloudFront Functions** cho redirect URL tại biên  

3. **Lambda@Edge**
  - Hiểu 4 loại trigger (viewer/origin request/response)  
  - Viết Lambda@Edge tùy chỉnh header cho A/B testing  
  - Nắm giới hạn & quy trình deploy  

4. **AWS CDK**
  - Chuyển tư duy từ declarative (YAML) sang imperative (TypeScript)  
  - Dùng **Constructs (L1/L2/L3)** định nghĩa tài nguyên  
  - Tổ chức code thành các Stack tái sử dụng  
  - Quản lý vòng đời hạ tầng:  
    - `cdk synth`  
    - `cdk diff`  
    - `cdk deploy`  

5. **Advanced AWS Networking**
  - Thiết lập **VPC Peering** giữa 2 VPC cùng region  
  - Hiểu **Transit Gateway** như network hub  

6. **Amazon EBS Data Lifecycle Manager**
  - Tạo Lifecycle Policy tự động snapshot EBS  
  - Cấu hình retention policy tối ưu chi phí  

### 💡 Advanced Concepts

#### Performance Optimization
- **Caching Layers**:  
  - Từ browser  
  - CDN (CloudFront)  
  - In-memory (ElastiCache)  
- **TTFB**:  
  - Phân tích  
  - Tối ưu bằng CDN  
- **Database Load Reduction**:  
  - Giảm truy vấn đọc tới RDS nhờ caching  

#### Infrastructure as Code (IaC) Evolution
- **Declarative vs Imperative IaC**:  
  - So sánh CloudFormation & CDK  
- **Abstraction in IaC**:  
  - Dùng L2/L3 constructs tạo tài nguyên phức tạp  
- **Software Engineering Principles**:  
  - Áp dụng DRY cho code hạ tầng  

#### Edge Computing
- **Moving Logic to the Edge**:  
  - Xử lý request tại edge giảm độ trễ  
  - Tăng tùy biến  
- **Global Distribution of Logic**:  
  - Lambda@Edge triển khai code toàn cầu  

### 🛠️ Technical Skills Enhanced

- **Programming**:  
  - Viết TypeScript định nghĩa hạ tầng với CDK  
- **Performance Engineering**:  
  - Phân tích  
  - Đo lường  
  - Tối ưu hiệu năng web  
- **Architectural Design**:  
  - Thiết kế kiến trúc mở rộng toàn cầu  
  - Hiệu năng cao  
  - Quản lý bằng code  
- **Advanced Debugging**:  
  - Gỡ lỗi cache (miss, stale data)  
  - Lambda@Edge  

---

**📝 Prepared by:** Tran Nguyen Daenel  
**📅 Date:** 30/05/2025  
**🔄 Next Review:** 06/06/2025  
**📊 Week:** 3/12 of Internship Program  
**🎯 Progress:** Achieved DevOps Engineer foundation
