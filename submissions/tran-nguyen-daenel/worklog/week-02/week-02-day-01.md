
# Worklog - Ngày 19/05/2025

## 📅 Thông tin cơ bản
- **Ngày**: 19/05/2025
- **Thứ**: Thứ Hai
- **Tuần thực tập**: Tuần thứ 2/12
- **Thời gian làm việc**: 8:00 - 17:30
- **Mood**: 🤔 + Focused, bắt đầu với các khái niệm CI/CD cốt lõi.

---

## 🎯 Mục tiêu ngày hôm nay
- [x] Tìm hiểu và thiết lập một repository trên AWS CodeCommit.
- [x] Nắm vững khái niệm và tạo một Build Project đầu tiên với AWS CodeBuild.
- [x] Hiểu rõ về file `buildspec.yml` và cách CodeBuild sử dụng nó.
- [x] Tích hợp thành công CodeCommit làm nguồn cho CodeBuild.

---

## 💼 Công việc đã thực hiện

### 1. Source Control with AWS CodeCommit ⏱️ 2.5 giờ
- **Mô tả**: Tìm hiểu về dịch vụ Git hosting của AWS. Tạo một repository mới để chứa source code cho một ứng dụng "Hello World" đơn giản. Cấu hình IAM user với Git credentials để có thể clone và push code từ máy local.
- **Kết quả**: Tạo thành công repository `devops-app-repo`. Push phiên bản đầu tiên của ứng dụng lên CodeCommit.
- **Tools/Tech**: AWS CodeCommit, Git CLI, AWS IAM (Git Credentials).
- **Links**: Screenshot of the CodeCommit repository, Git push command history.

### 2. Introduction to AWS CodeBuild & `buildspec.yml` ⏱️ 3 giờ
- **Mô tả**: Đọc tài liệu để hiểu cách CodeBuild hoạt động như một dịch vụ build được quản lý hoàn toàn. Tập trung vào vai trò của file `buildspec.yml` trong việc định nghĩa các câu lệnh và giai đoạn của quá trình build (install, pre_build, build, post_build).
- **Kết quả**: Soạn thảo một file `buildspec.yml` cơ bản, chỉ chứa các lệnh `echo` để kiểm tra từng giai đoạn. Hiểu rõ cấu trúc và cú pháp của file này.
- **Tools/Tech**: AWS Documentation, VS Code (YAML extension).
- **Links**: `buildspec.yml` v1 file on GitHub/local.

### 3. Creating and Running the First Build Project ⏱️ 2.5 giờ
- **Mô tả**: Tạo một Build Project trên AWS CodeBuild. Cấu hình project để lấy source code từ repository `devops-app-repo` trên CodeCommit. Chạy build thủ công lần đầu tiên và theo dõi log output trên CloudWatch.
- **Kết quả**: Build thành công với trạng thái "Succeeded". Log trên CloudWatch hiển thị đúng output của các lệnh `echo` trong file `buildspec.yml`.
- **Tools/Tech**: AWS CodeBuild, AWS CodeCommit, Amazon CloudWatch Logs.
- **Links**: Screenshots of build history, CloudWatch log stream.

---

## 📚 Kiến thức học được

- **AWS Services**:
    - AWS CodeCommit
    - AWS CodeBuild
    - CloudWatch Logs

- **CI/CD Tools**:
    - Sử dụng Git với CodeCommit
    - Viết cú pháp `buildspec.yml`

- **IAM**:
    - Tạo và sử dụng Git credentials cho IAM user

### 💡 Concepts & Theory

- **New Concepts**:
    - Continuous Integration (CI)
    - Build Pipeline (Source & Build stages)
    - Build Artifacts
    - Managed Build Service

- **Best Practices**:
    - Lưu trữ source code gần với môi trường build
    - Định nghĩa quy trình build bằng code (`buildspec.yml`)

- **Industry Knowledge**:
    - Hiểu được bước đầu tiên trong việc tự động hóa quy trình từ code đến build, nền tảng của DevOps

### 🤝 Soft Skills

- **Technical Documentation**:
    - Đọc và áp dụng hướng dẫn từ tài liệu của AWS để giải quyết vấn đề

- **Debugging**:
    - Phân tích logs của CodeBuild trên CloudWatch để hiểu quá trình build

- **Attention to Detail**:
    - Cấu hình đúng IAM policies và service roles để CodeBuild có quyền truy cập CodeCommit

---

## 🚧 Khó khăn và giải pháp

- **Vấn đề**: Gặp lỗi "Authentication Failed" khi thực hiện `git push` lên CodeCommit lần đầu tiên.
- **Nguyên nhân gốc rễ**: Sử dụng sai thông tin đăng nhập. Cố gắng dùng username/password của tài khoản AWS thay vì Git credentials được tạo riêng trong IAM.
- **Giải pháp**: Đọc lại kỹ tài liệu của AWS. Truy cập vào IAM Console, tìm đến user đang sử dụng, vào tab "Security credentials" và tạo "HTTPS Git credentials for AWS CodeCommit". Sử dụng credentials này để xác thực thành công.

---

## 💭 Reflection & Insights

### What went well today?
- Hiểu rõ luồng hoạt động cơ bản: CodeCommit (lưu trữ) -> CodeBuild (xây dựng).
- Việc theo dõi log build trên CloudWatch rất trực quan và hữu ích.
- `buildspec.yml` là một ý tưởng rất mạnh mẽ, cho phép kiểm soát hoàn toàn môi trường build.

### What could be improved?
- Cần tìm hiểu sâu hơn về các biến môi trường và các tùy chọn runtime có sẵn trong CodeBuild.
- Thời gian cấu hình IAM policy cho service role của CodeBuild hơi lâu do chưa quen.

### Key Insights
- AWS cung cấp một bộ công cụ CI/CD native mạnh mẽ và tích hợp chặt chẽ với nhau.
- Tự động hóa giai đoạn build là bước đầu tiên quan trọng để giảm thiểu lỗi "it works on my machine".
- Việc định nghĩa build process bằng code (`buildspec.yml`) giúp chuẩn hóa và dễ dàng phiên bản hóa quy trình.

---

## 📋 Kế hoạch ngày mai

### Priority Tasks
- [ ] **High**: Tìm hiểu về **AWS CodePipeline** để tự động hóa việc kết nối CodeCommit và CodeBuild.
- [ ] **Medium**: Bắt đầu tìm hiểu về **Containerization và Docker** để chuẩn bị cho việc deploy ứng dụng.
- [ ] **Low**: Tối ưu file `buildspec.yml` để build một ứng dụng Node.js/Python thực tế thay vì chỉ `echo`.

---

*Worklog created by: Tran Nguyen Daenel*  
*Next review: 20/05/2025*
