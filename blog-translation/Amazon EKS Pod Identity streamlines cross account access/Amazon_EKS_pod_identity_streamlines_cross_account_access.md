# Amazon EKS Pod Identity mở rộng khả năng truy cập tài nguyên AWS giữa nhiều tài khoản

> **📖 Bài viết gốc**: https://aws.amazon.com/vi/blogs/containers/amazon-eks-pod-identity-streamlines-cross-account-access/
> **👤 Tác giả**: Ashok Srirama, George John
> **📅 Ngày xuất bản**: 12/6/2025  
> **🌐 Nguồn**: AWS Blogs
> **👨‍💻 Người dịch**: Vũ Quang Huy - FCJ Intern  
> **📅 Ngày dịch**: 7/7/2025
> **⏱️ Thời gian đọc**: 30 phút

---

## 📋 Tóm tắt

Amazon EKS Pod Identity vừa ra mắt tính năng mới hỗ trợ truy cập chéo tài khoản (cross-account access), cho phép các ứng dụng chạy trong cụm EKS ở một tài khoản AWS có thể truy cập an toàn vào tài nguyên nằm ở tài khoản khác, chẳng hạn như S3 hoặc DynamoDB. Quá trình thực hiện bắt đầu bằng việc tạo hai vai trò IAM: một vai trò trong tài khoản nguồn (Account A) được liên kết với tài khoản dịch vụ Kubernetes thông qua Pod Identity, và một vai trò trong tài khoản đích (Account B) cấp quyền truy cập tài nguyên và cho phép vai trò từ Account A giả định (assume). Các vai trò này được kết nối bằng cơ chế IAM role chaining. Để tăng cường bảo mật, Amazon EKS Pod Identity tự động chèn externalId vào lệnh AssumeRole để giảm rủi ro confused deputy. Sau khi cấu hình hoàn tất, triển khai một ứng dụng mẫu sử dụng service account đã liên kết. Khi pod khởi động, nó sẽ tự động nhận thông tin xác thực IAM tạm thời của vai trò trong tài khoản đích thông qua agent của EKS. Người dùng có thể xác minh quá trình cấp quyền bằng cách sử dụng AWS CLI. Quá trình này giúp đơn giản hóa đáng kể việc truy cập đa tài khoản trong các kiến trúc cloud-native hiện đại.

**🎯 Đối tượng đọc**: Cloud Engineer, Application Developer, DevOps Engineer.
**📊 Độ khó**: Intermediate
**🏷️ Tags**:  Amazon Elastic Kubernetes Service, Best Practices, Technical How-to

---

## 📚 Mục lục

- [Amazon EKS Pod Identity mở rộng khả năng truy cập tài nguyên AWS giữa nhiều tài khoản](#amazon-eks-pod-identity-mở-rộng-khả-năng-truy-cập-tài-nguyên-aws-giữa-nhiều-tài-khoản)
  - [📋 Tóm tắt](#-tóm-tắt)
  - [📚 Mục lục](#-mục-lục)
    - [Amazon EKS Pod Identity mở rộng khả năng truy cập tài nguyên AWS giữa nhiều tài khoản](#amazon-eks-pod-identity-mở-rộng-khả-năng-truy-cập-tài-nguyên-aws-giữa-nhiều-tài-khoản-1)
      - [Giới thiệu](#giới-thiệu)
      - [Những thay đổi của EKS Pod Identity APIs](#những-thay-đổi-của-eks-pod-identity-apis)
      - [Làm thế nào để bắt đầu](#làm-thế-nào-để-bắt-đầu)
      - [Yêu cầu trước khi bắt đầu](#yêu-cầu-trước-khi-bắt-đầu)
      - [Cài đặt](#cài-đặt)
      - [Cấu hình cho tài khoản AWS A (tài khoản cụm EKS)](#cấu-hình-cho-tài-khoản-aws-a-tài-khoản-cụm-eks)
      - [Cài đặt ở tài khoản AWS B](#cài-đặt-ở-tài-khoản-aws-b)
      - [Hoàn thành cấu hình trên tài khoản AWS A](#hoàn-thành-cấu-hình-trên-tài-khoản-aws-a)
      - [Dọn dẹp tài nguyên](#dọn-dẹp-tài-nguyên)
      - [Lưu ý](#lưu-ý)
      - [Kết luận](#kết-luận)
  - [📖 Glossary - Thuật ngữ](#-glossary---thuật-ngữ)
  - [🔗 Tài liệu tham khảo](#-tài-liệu-tham-khảo)
    - [Tài liệu gốc](#tài-liệu-gốc)
    - [Tài liệu tiếng Việt](#tài-liệu-tiếng-việt)
    - [Tools và Services](#tools-và-services)
  - [💬 Ghi chú của người dịch](#-ghi-chú-của-người-dịch)
    - [Challenges trong quá trình dịch](#challenges-trong-quá-trình-dịch)
    - [Insights gained](#insights-gained)
  - [🤝 Đóng góp và Feedback](#-đóng-góp-và-feedback)
---

### Amazon EKS Pod Identity mở rộng khả năng truy cập tài nguyên AWS giữa nhiều tài khoản

#### Giới thiệu
Hôm nay, chúng tôi rất vui mừng thông báo về một cải tiến quan trọng đối với Amazon EKS Pod Identity – quyền truy cập chéo tài khoản được đơn giản hóa cho các ứng dụng Kubernetes. Tính năng mới này giúp quy trình cấp quyền cho pod truy cập tài nguyên AWS trong các tài khoản khác trở nên dễ dàng hơn. Bằng cách cho phép chỉ định IAM role nguồn và đích trong quá trình tạo liên kết Pod Identity, chúng tôi đã loại bỏ sự phức tạp trong cấu hình và thay đổi tầng ứng dụng. Điều này có nghĩa là các ứng dụng Kubernetes của bạn giờ đây có thể truy cập liền mạch vào tài nguyên trên các tài khoản AWS mà không cần thay đổi mã nguồn. Tính năng này sử dụng cơ chế chuỗi IAM role ở phía sau, tự động cung cấp thông tin xác thực tạm thời cần thiết cho các pod trong thời gian chạy.

Tại sự kiện re:Invent 2023, **Amazon Elastic Kubernetes Service (Amazon EKS)** đã giới thiệu tính năng EKS Pod Identity, cho phép người dùng cấu hình ứng dụng **Kubernetes** chạy trên Amazon EKS với quyền kiểm soát truy cập AWS Identity and Access Management (IAM) chi tiết để truy cập các tài nguyên như **Amazon S3** và **Amazon DynamoDB**. Tính năng này đã giải quyết nhiều thách thức hiện có của phương pháp **IAM Roles for Service Accounts** – một cơ chế thay thế để cấp quyền IAM cho các ứng dụng Kubernetes – bằng cách loại bỏ nhu cầu thiết lập nhà cung cấp OIDC cho các cụm EKS, đơn giản hóa chính sách tin cậy IAM và cải thiện trải nghiệm thông qua các API của Amazon EKS. Ngoài ra, tính năng này còn hỗ trợ **IAM role session tag**, cho phép quản trị viên IAM tạo một chính sách quyền duy nhất có thể hoạt động với nhiều role khác nhau bằng cách cấp quyền truy cập dựa trên các thẻ khớp.

Nhưng hành trình của chúng tôi không dừng lại ở việc ra mắt Pod Identity. Thông qua phản hồi liên tục từ người dùng, chúng tôi nhận thấy rằng các chiến lược đa tài khoản rất phổ biến trong số người dùng Amazon EKS, khi workloads trong một tài khoản AWS cần truy cập vào tài nguyên trong một tài khoản khác. Các tình huống phổ biến bao gồm:
  - Các nhóm nền tảng quản lý các cụm EKS đa thuê bao tập trung trong một tài khoản AWS, trong khi các nhóm Đơn vị kinh doanh/Ứng dụng hoạt động trong các Tài khoản AWS riêng biệt. Ví dụ, nhóm nền tảng có thể duy trì cụm EKS dùng chung cho dịch vụ vi mô, trong khi các nhóm ứng dụng triển khai các dịch vụ microservices của họ lên cụm EKS dùng chung nhưng lưu trữ dữ liệu và cấu hình trong các tài khoản AWS tương ứng, đòi hỏi quyền truy cập an toàn giữa các tài khoản.
  - Các nền tảng CI/CD tập trung chạy trên Amazon EKS cần truy cập tài nguyên trên nhiều tài khoản AWS. Điều này bao gồm việc triển khai các ứng dụng đến các môi trường khác nhau (dev, staging và prod) và truy cập kho lưu trữ phần mềm dựng sẵn trong các tài khoản AWS khác nhau.
  - Dữ liệu API trên các cụm EKS cần truy cập hồ dữ liệu trong các Tài khoản AWS khác. Ví dụ, công việc phân tích chạy trên Amazon EKS có thể cần xử lý dữ liệu từ các kho dữ liệu của nhiều đơn vị kinh doanh mà vẫn đảm bảo tính độc lập và quản lý.
EKS Pod Identity hỗ trợ các phương pháp sau để cho phép truy cập giữa các tài khoản:
  - **Chính sách dựa trên tài nguyên**: Cho phép cấp quyền trực tiếp cho các pod Amazon EKS trong một tài khoản để truy cập tài nguyên trong tài khoản khác thông qua việc cấu hình chính sách trên các tài nguyên đích (như thùng S3 hoặc bảng DynamoDB).
  - **Chuỗi IAM role**: Cho phép các pod giả định role ở tài khoản khác thông qua mối quan hệ tin cậy giữa các role. Cụ thể, pod trước tiên sẽ giả định một role trong cùng tài khoản, role này có quyền giả định các role ở các tài khoản đích.
  - **Chuỗi IAM role với cấu hình AWS**: Đơn giản hóa cấu hình chuỗi role bằng cách chỉ định chi tiết role giữa các tài khoản trong tệp cấu hình AWS SDK, giúp quản lý và cập nhật các liên kết role dễ dàng hơn. 
Để hiểu rõ hơn về các phương pháp trên và cách triển khai, hãy tham khảo mục “Cách thực hiện truy cập chéo tài khoản với Amazon EKS Pod Identity” trong bài viết trước [Amazon EKS Pod Identity: a new way for applications on EKS to obtain IAM credentials](https://aws.amazon.com/vi/blogs/containers/amazon-eks-pod-identity-a-new-way-for-applications-on-eks-to-obtain-iam-credentials/). Mặc dù các phương pháp này hoạt động hiệu quả, nhưng chúng đòi hỏi cấu hình IAM nâng cao và thay đổi ở cấp ứng dụng, điều này có thể gây khó khăn trong việc duy trì ở quy mô lớn.

Để giải quyết những thách thức này và hỗ trợ các trường hợp sử dụng chéo tài khoản một cách liền mạch hơn, AWS đã ra mắt trải nghiệm truy cập chéo tài khoản mới được đơn giản hóa với EKS Pod Identity. Tính năng này cho phép ứng dụng trong cụm EKS của bạn truy cập tài nguyên AWS ở các tài khoản khác thông qua quá trình gọi là [chuỗi IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#iam-term-role-chaining). Khi tạo liên kết Pod Identity, bạn có thể cung cấp hai IAM role: một [EKS pod identity role](https://docs.aws.amazon.com/eks/latest/userguide/pod-id-role.html) trong cùng tài khoản với cụm EKS, và một IAM role đích từ tài khoản chứa tài nguyên AWS (chẳng hạn như S3 bucket hoặc bảng DynamoDB). Khi pod ứng dụng cần truy cập tài nguyên AWS, nó sẽ yêu cầu thông tin xác thực từ EKS Pod Identity, hệ thống sẽ tự động thực hiện chuỗi IAM role để cấp thông tin xác thực tạm thời cần thiết cho pod đó. Hơn nữa, tính năng này vẫn hỗ trợ IAM role session tags, cho phép kiểm soát truy cập chi tiết dựa trên metadata của pod giữa các tài khoản.

#### Những thay đổi của EKS Pod Identity APIs
Các API sau đây được cập nhật để giới thiệu các phần tử yêu cầu và phản hồi mới nhằm chuyển Amazon Resource Names (ARN) cho role đích.
- [CreatePodIdentityAssociation](https://docs.aws.amazon.com/eks/latest/APIReference/API_CreatePodIdentityAssociation.html): Lệnh gọi API dùng để tạo một liên kết Pod Identity giữa một tài khoản dịch vụ trong cụm EKS và một IAM role sử dụng tính năng EKS Pod Identity.
    - Các tham số yêu cầu
      + **name**: Tên của cụm EKS nơi bạn muốn tạo liên kết.
      + **Namespace**: Tên của namespace trong Kubernetes nơi bạn muốn tạo liên kết. Tài khoản dịch vụ và các pod sử dụng tài khoản này phải thuộc namespace này.
      + **roleArn**: ARN của IAM role được liên kết với tài khoản dịch vụ. Agent của EKS Pod Identity sẽ quản lý thông tin xác thực để các ứng dụng trong container của các pod sử dụng tài khoản dịch vụ này có thể giả định IAM role này.
      + **targetRoleArn**: ARN của IAM role thuộc tài khoản AWS đích cần được liên kết với tài khoản dịch vụ. EKS Pod Identity sẽ phát hành thông tin xác thực IAM tạm thời của role này.
      + **serviceAccount**: Tên của tài khoản dịch vụ trong Kubernetes mà bạn muốn liên kết với thông tin xác thực IAM.
      + **disableSessionTags**: Cờ Boolean để bật hoặc tắt session tags. Mặc định là False.

- [UpdatePodIdentityAssociation](https://docs.aws.amazon.com/eks/latest/APIReference/API_UpdatePodIdentityAssociation.html): API dùng để cập nhật một liên kết pod identity đã có, sử dụng API này để cập nhật IAM role, IAM role đích, thuộc tính disableSessionTags. Phải có ít nhất phải có một trong các thuộc tính này trong yêu cầu. Bạn không thể chuyển một liên kết giữa các cụm, namespace hoặc tài khoản dịch vụ khác nhau. Nếu bạn cần thay đổi namespace hoặc tài khoản dịch vụ, trước hết bạn phải xóa liên kết hiện có rồi tạo một liên kết mới với cấu hình mong muốn.
    - Các tham số yêu cầu
      + **name**: Tên của cụm EKS nơi liên kết đang tồn tại.
      + **associationId**: ID của liên kết cần cập nhật.
      + **roleArn**: IAM role mới để liên kết với tài khoản dịch vụ.
      + **targetRoleArn**: IAM role đích mới để liên kết với tài khoản dịch vụ.
      + **disableSessionTags**: Cờ Boolean để bật hoặc tắt session tags.

#### Làm thế nào để bắt đầu
Trong phần hướng dẫn này, chúng tôi sẽ trình bày cách một pod Kubernetes đang chạy trong cụm EKS thuộc tài khoản nguồn – AWS Account A – có thể truy cập các tài nguyên AWS khác trong tài khoản đích – AWS Account B, như minh họa trong hình sau.
![Figure 1](\Image-1-for-Cross-Pod-Identity.jpg)
*Hình 1:Quy trình ở mức High level do EKS Pod Identity thực hiện để cung cấp thông tin xác thực tạm thời STS cho pod Kubernetes.*
Luồng thực hiện ở mức high-level như sau:
1. Người quản trị nền tảng Amazon EKS tạo một IAM role (account-a-role) trong AWS Account A, với chính sách tin cậy(trust policy) cho phép giả định vai trò (AssumeRole) từ principal dịch vụ pods.eks.amazonaws.com và chính sách quyền hạn (permission policy) cho phép giả định vai trò (account-b-role) trong Account B.
2. Một người dùng từ nhóm ứng dụng hoặc bộ phận tạo một IAM role (account-b-role) trong tài khoản AWS B. Role này có chính sách tin cậy cho phép account-a-role giả định, đồng thời được cấp quyền phù hợp để thực hiện các tác vụ cần thiết.
3. Quản trị viên của Amazon EKS tạo một liên kết pod identity association, nhằm liên kết các IAM role từ cả hai tài khoản với tài khoản dịch vụ Kubernetes.
4. Webhook EKS Pod Identity trong control plane của Amazon EKS sẽ tự động sửa đổi phần định nghĩa của pod trong Kubernetes, thêm vào các biến môi trường phù hợp.
5. Khi ứng dụng bên trong pod cố gắng lấy thông tin xác thực IAM tạm thời, SDK sẽ sử dụng các biến môi trường để gọi tới endpoint của eks-pod-identity-agent nhằm truy xuất thông tin xác thực. Agent này sau đó sẽ gọi tới API xác thực EKS (EKS Auth API) để: Xác thực liên kết, thực hiện quy trình [chuỗi IAM role](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html#iam-term-role-chaining), trả về thông tin xác thực trong phản hồi.
6. Ứng dụng sử dụng thông tin xác thực IAM tạm thời này để truy cập các tài nguyên AWS (chẳng hạn như Amazon S3 và DynamoDB) trong AWS Account B.

#### Yêu cầu trước khi bắt đầu
Để hoàn thành giải pháp này, bạn cần đảm bảo các điều kiện sau:
- Hai tài khoản AWS riêng biệt
- Phiên bản mới nhất của [AWS Command Line Interface (AWS CLI)](https://aws.amazon.com/vi/cli/) đã được cấu hình trên thiết bị của bạn hoặc sử dụng [AWS CloudShell](https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html#how-to-get-started)
- Công cụ dòng lệnh cho Amazon EKS [(eksctl)](https://eksctl.io/) để tạo và quản lý cụm EKS
- Tạo hai hồ sơ được đặt tên [(named profiles)](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html#cli-configure-files-using-profiles) với AWS CLI, mỗi hồ sơ tương ứng với một tài khoản AWS

#### Cài đặt
  ```bash
  export AWS_REGION=us-west-2 #Replace with your AWS Region
  export AWS_ACCOUNT_A=111122223333 #Replace with your AWS Account number
  export AWS_ACCOUNT_B=999988887777 #Replace with your AWS Account number
  export CLUSTER_NAME=eks-pod-identity-xacct-demo #Replace with your EKS cluster name
  export ACCT_A_PROFILE=<<Name of the AWS CLI Profile for account A>>
  export ACCT_B_PROFILE=<<Name of the AWS CLI Profile for account B>>
  ```

#### Cấu hình cho tài khoản AWS A (tài khoản cụm EKS)
Bắt đầu bằng cách tạo cụm EKS sử dụng eksctl với phần mở rộng eks-pod-identity-agent. Tạo file cấu hình eksctl bằng lệnh sau
```bash
cat << EOF > cluster.yaml 
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig
metadata:
  name: ${CLUSTER_NAME}
  region: ${AWS_REGION}
  version: "1.32"

addons:
  - name: vpc-cni
  - name: coredns
  - name: kube-proxy
  - name: eks-pod-identity-agent
    
managedNodeGroups:
  - name: ${CLUSTER_NAME}-mng
    instanceType: m6a.large
    privateNetworking: true
    minSize: 2
    desiredCapacity: 2
    maxSize: 5
EOF
```
Tạo cụm EKS sử dụng eksctl
`eksctl create cluster -f cluster.yaml --profile $ACCT_A_PROFILE`

Chờ cho đến khi quá trình tạo cụm hoàn tất và đảm bảo phần mở rộng eks-pod-identity-agent đang được chạy bên trong cụm

`eksctl get addon --cluster ${CLUSTER_NAME} --region ${AWS_REGION} --name eks-pod-identity-agent --profile $ACCT_A_PROFILE -o json`

Kết quả trả về như sau:
```json
[
    {
        "Name": "eks-pod-identity-agent",
        "Version": "v1.3.5-eksbuild.2",
        "NewerVersion": "",
        "IAMRole": "",
        "Status": "ACTIVE",
        "ConfigurationValues": "",
        "Issues": null
    }
]
```
Tạo các tài nguyên IAM cần thiết để cho phép truy cập chéo tài khoản. Cần 1 IAM role trong tài khoản AWS đích có quyền truy cập vào các tài nguyên cần thiết và 1 IAM role trong tài khoản AWS nguồn có quyền giả định vai trò IAM ở tài khoản đích. Trước tiên tạo IAM role cho tài khoản nguồn. 
Tạo 1 IAM role (account-a-role) với chính sách quyền cho phép giả định vai trò của IAM role (account-b-role) trong tài khoản AWS đích

```bash
cat << EOF > role_a_permission_policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole",
                "sts:TagSession"
            ],
            "Resource": [
                "arn:aws:iam::${AWS_ACCOUNT_B}:role/account-b-role"
            ]
        }
    ]
}
EOF

cat << EOF > role_a_permission_policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "sts:AssumeRole",
                "sts:TagSession"
            ],
            "Resource": [
                "arn:aws:iam::${AWS_ACCOUNT_B}:role/account-b-role"
            ]
        }
    ]
}
EOF
```

```bash
aws iam create-policy --policy-document file://role_a_permission_policy.json \
    --policy-name eks-pod-identity-xacct-policy --profile $ACCT_A_PROFILE

aws iam create-role --role-name account-a-role \
    --assume-role-policy-document file://role_a_trust_policy.json \
    --profile $ACCT_A_PROFILE

aws iam attach-role-policy --role-name account-a-role \
    --policy-arn arn:aws:iam::${AWS_ACCOUNT_A}:policy/eks-pod-identity-xacct-policy \
    --profile $ACCT_A_PROFILE
```

#### Cài đặt ở tài khoản AWS B
Tương tự trong tài khoản AWS B, tạo 1 IAM role (account-b-role) kèm theo chính sách quyền cho phép truy cập vào các tài nguyên phù hợp trong tài khoản đích. Trong ví dụ minh họa này, bạn sẽ sử dụng chính sách **AmazonS3ReadOnlyAccess** để cấp quyền đọc dữ liệu từ Amazon S3.Có nhiều cách để thiết lập chính sách tin cậy: Bạn có thể xác định rõ các IAM role cụ thể trong tài khoản nguồn để thiết lập mối quan hệ tin cậy. Hoặc bạn có thể thiết lập tin cậy với toàn bộ tài khoản AWS nguồn. Cách làm thứ hai sẽ hữu ích nếu bạn không có quyền truy cập hoặc không nắm rõ các IAM role cụ thể trong tài khoản nguồn, và muốn giao trách nhiệm kiểm soát các quyền đó cho nhóm quản trị viên của tài khoản nguồn. Khi đó họ sẽ cần đảm bảo các chính sách quyền chỉ cho phép những role thích hợp được quyền giả định account-b-role trong Account B.

Dù bạn chọn cách nào, nên sử dụng external ID trong trust policy để giảm thiểu rủi ro từ lỗ hổng [confused deputy](https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html).Confused deputy là một vấn đề bảo mật trong đó một thực thể không có đủ quyền lại có thể "lợi dụng" một thực thể có quyền cao hơn để thực hiện hành vi trái phép.Để phòng tránh vấn đề này, EKS Pod Identity tự động chèn externalId vào trong lệnh gọi API AssumeRole giữa các tài khoản, sử dụng định dạng sau:
`region/account-a-id/cluster-name/namespace/service-account-name`

```bash
cat << EOF > role_b_trust_policy.json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::${AWS_ACCOUNT_A}:role/account-a-role"
            },
            "Action": "sts:AssumeRole",
            "Condition": {
                "StringEquals": {
                    "sts:ExternalId": "${AWS_REGION}/${AWS_ACCOUNT_A}/${CLUSTER_NAME}/default/demo-app-sa"
                }
            }
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::${AWS_ACCOUNT_A}:role/account-a-role"
            },
            "Action": "sts:TagSession"
        }
    ]
}
EOF
    
aws iam create-role --role-name account-b-role \
    --assume-role-policy-document file://role_b_trust_policy.json \
    --profile $ACCT_B_PROFILE
    
aws iam attach-role-policy --role-name account-b-role \
    --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess \
    --profile $ACCT_B_PROFILE
```

#### Hoàn thành cấu hình trên tài khoản AWS A
Bây giờ bạn đã tạo các IAM role cần thiết, hãy sử dụng EKS Pod Identity để liên kết các IAM role của tài khoản nguồn và đích với tài khoản dịch vụ Kubernetes mà ứng dụng thử nghiệm của bạn sử dụng. Lưu ý một thuộc tính mới trong API CreatePodIdentityAssociation để truyền IAM role cho tài khoản đích.

```bash
aws eks create-pod-identity-association --region $AWS_REGION \
    --cluster-name $CLUSTER_NAME \
    --service-account demo-app-sa --namespace default \
    --role-arn arn:aws:iam::${AWS_ACCOUNT_A}:role/account-a-role \
    --target-role-arn arn:aws:iam::${AWS_ACCOUNT_B}:role/account-b-role \
    --profile $ACCT_A_PROFILE 
```

Kết quả trả về
```json
{
    "association": {
        "clusterName": "eks-pod-identity-xacct-demo",
        "namespace": "default",
        "serviceAccount": "demo-app-sa",
        "roleArn": "arn:aws:iam::111122223333:role/account-a-role",
        "associationArn": "arn:aws:eks:us-west-2:111122223333:podidentityassociation/eks-pod-identity-xacct-demo/a-hw7ewqqhtvfqjkx7r",
        "associationId": "a-hw7ewqqhtvfqjkx7r",
        "tags": {},
        "createdAt": "2025-03-03T19:52:49.103000+00:00",
        "modifiedAt": "2025-03-03T19:52:49.103000+00:00",
        "disableSessionTags": false,
        "targetRoleArn": "arn:aws:iam::999988887777:role/account-b-role",
        "externalId": "us-west-2/111122223333/eks-pod-identity-xacct-demo/default/demo-app-sa"
    }
}
```

Trong phản hồi, một externalId được trả về theo định dạng sau: region/account-number/cluster-name/namespace/service-account-name cùng với  associationId,... .Bạn đã sử dụng externalId để tạo câu lệnh điều kiện trong chính sách tin cậy của IAM role ở tài khoản đích nhằm giảm thiểu rủi ro từ lỗ hổng confused deputy. Như vậy, bạn đã hoàn tất phần cấu hình hạ tầng cần thiết. Triển khai ứng dụng mẫu với tài khoản dịch vụ demo-app-sa trong namespace default của cụm EKS
```bash
kubectl create sa demo-app-sa

kubectl run awscli \
  --image=amazon/aws-cli:latest \
  --restart=Never \
  --command \
  --overrides='{ "spec": { "serviceAccountName": "demo-app-sa" }}' \
  -- sleep infinity
```
Khi trạng thái các pod là up và đang chạy hãy chạy các lệnh sau để xác minh thông tin xác thực phiên IAM. Bạn sẽ thấy rằng EKS Pod Identity đã tự động cấp thông tin xác thực phiên IAM tương ứng với IAM role của tài khoản AWS đích bằng cách thực hiện quy trình chuỗi IAM role.

Kiểm tra trạng thái các pod `kubectl get pods`
Kết quả trả về
```bash
NAME       READY      STATUS      RESTARTS      AGE
aws-cli    1/1        Running     0             4m
```
Chạy lệnh `aws-cli` để xác thực vai trò giả định
`kubectl exec awscli -- /bin/bash -c "aws sts get-caller-identity"`
Kết quả trả về:
```json
{
    "UserId": "AROA43MFJ4FMNLTSEPVJ5:..........",
    "Account": "999988887777",
    "Arn": "arn:aws:sts::999988887777:assumed-role/account-b-role/eks-eks-po-ide-awscli-8dbbcff5-9716-40c5-a474-c01c3190deeb"
}
```

Thử liệt kê các S3 Buckets trong tài khoản đích
`kubectl exec awscli -- /bin/bash -c "aws s3 ls"`
Kết quả trả về là danh sách các S3 Bucket <<list of S3 buckets from the target AWS Account>>
Điều này chứng minh rằng các workloads chạy trên Amazon EKS có thể sử dụng tính năng liên tài khoản EKS Pod Identity mới để truy cập an toàn vào tài nguyên trong các tài khoản AWS khác.

#### Dọn dẹp tài nguyên
Để tránh các chi phí phát sinh hãy đảm bảo xóa các tài nguyên cụm EKS được tạo trong tài khoản AWS của bạn.
```bash
eksctl delete cluster -f cluster.yaml --profile $ACCT_A_PROFILE

# Delete IAM Resources in Account A
aws iam detach-role-policy --role-name account-a-role \
    --policy-arn arn:aws:iam::${AWS_ACCOUNT_A}:policy/eks-pod-identity-xacct-policy \
    --profile $ACCT_A_PROFILE 
    
aws iam delete-role --role-name account-a-role --profile $ACCT_A_PROFILE

aws iam delete-policy --policy-arn arn:aws:iam::${AWS_ACCOUNT_A}:policy/eks-pod-identity-xacct-policy \
    --profile $ACCT_A_PROFILE 

# Delete IAM Resources in Account B
aws iam detach-role-policy --role-name account-b-role \
    --policy-arn arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess \
   --profile $ACCT_B_PROFILE
   
iam delete-role --role-name account-b-role --profile $ACCT_B_PROFILE
```
#### Lưu ý
- Tính năng truy cập chéo tài khoản của EKS Pod Identity được hỗ trợ trên tất cả các phiên bản Kubernetes hiện đang được Amazon EKS hỗ trợ tính đến thời điểm này.
- Tính năng này có sẵn tại tất cả các khu vực [AWS thương mại](https://aws.amazon.com/vi/about-aws/global-infrastructure/regions_az/), [Trung Quốc đại lục](https://www.amazonaws.cn/en/about-aws/china/) và [AWS GovCloud (US)](https://aws.amazon.com/vi/govcloud-us/?whats-new.sort-by=item.additionalFields.postDateTime&whats-new.sort-order=desc) nơi Amazon EKS được hỗ trợ.
- Bạn chỉ có thể liên kết một IAM role với một tài khoản dịch vụ Kubernetes bằng tính năng EKS Pod Identity. Tuy nhiên, bạn có thể cập nhật các liên kết vai trò bất kỳ lúc nào
- Bạn có thể sử dụng [AWS CloudFormation](https://aws.amazon.com/vi/cloudformation/), AWS CLI, và Amazon EKS API để tạo các liên kết pod identity chéo tài khoản. Hỗ trợ cho Terraform và eksctl sẽ được bổ sung trong tương lai.
- Khi EKS Pod Identity giả định một IAM role, nó sẽ tự động thêm các session tags. Các thẻ này, cùng với các chính sách phiên nội tuyến và ARN của các chính sách IAM được quản lý sẽ được nén thành một định dạng nhị phân đặc biệt có giới hạn kích thước nhất định.Nếu bạn gặp lỗi PackedPolicyTooLarge vì vượt quá giới hạn kích thước, bạn có thể giảm kích thước gói bằng cách tắt các session tags. Thực hiện điều này bằng cách thêm cờ `--disable-session-tags` khi gọi API create-pod-identity-association hoặc update-pod-identity-association
#### Kết luận
Trong bài viết này, chúng tôi đã trình bày tính năng truy cập chéo tài khoản mới của Amazon EKS Pod Identity, giúp đơn giản hóa cách các workload chạy trên Amazon EKS có thể truy cập an toàn vào tài nguyên AWS ở các tài khoản khác. Tính năng này loại bỏ sự phức tạp của các phương pháp truy cập chéo tài khoản truyền thống bằng cách cung cấp một trải nghiệm nhất quán và dễ triển khai thông qua các API của Amazon EKS. Dù bạn đang vận hành một nền tảng tập trung, quản lý CI/CD pipelines, xây dựng các API dữ liệu, EKS Pod Identity hiện nay đã mang đến một cách tiếp cận trực tiếp hơn và dễ duy trì hơn để xử lý truy cập chéo tài khoản.
Chúng tôi khuyến khích bạn bắt đầu sử dụng tính năng này và gửi phản hồi tại [AWS Containers Roadmap](https://github.com/aws/containers-roadmap). 

---

## 📖 Glossary - Thuật ngữ

| English | Tiếng Việt | Định nghĩa |
|---------|------------|------------|
| Auto Scaling | Tự động mở rộng quy mô | Khả năng tự động tăng/giảm resources dựa trên demand |
| Load Balancer | Bộ cân bằng tải | Phân phối traffic đến multiple servers |
| Microservices | Kiến trúc microservices | Architectural pattern chia application thành small services |
| ... | ... | ... |

## 🔗 Tài liệu tham khảo

### Tài liệu gốc
- [Original Article](https://aws.amazon.com/vi/blogs/containers/amazon-eks-pod-identity-streamlines-cross-account-access/): Bài viết gốc
- [Author's Profile](link): Thông tin tác giả
- [Related Articles](link): Bài viết liên quan

### Tài liệu tiếng Việt
- [AWS Documentation VN](link): Tài liệu AWS tiếng Việt
- [AWS Learning Resources](link): Tài nguyên học tập AWS
- [Community Discussions](link): Thảo luận cộng đồng

### Tools và Services
- [AWS Service 1](link): Mô tả service
- [AWS Service 2](link): Mô tả service
- [Third-party Tools](link): Tools bổ sung

---

## 💬 Ghi chú của người dịch

[Ghi chú về quá trình dịch, challenges gặp phải, insights gained]

### Challenges trong quá trình dịch
- **Technical Terms**: [Thuật ngữ khó dịch và cách giải quyết]
- **Cultural Context**: [Context cần adapt cho VN]
- **Complex Concepts**: [Khái niệm phức tạp và cách giải thích]

### Insights gained
- **Technical Learning**: [Kiến thức kỹ thuật học được]
- **Language Skills**: [Kỹ năng ngôn ngữ phát triển]
- **Industry Knowledge**: [Hiểu biết ngành nghề]

---

## 🤝 Đóng góp và Feedback

Bài dịch này được thực hiện trong khuôn khổ **FCJ Internship Program**. 

**📧 Liên hệ**: vuquanghuyy2211@gmail.com  
**💬 Feedback**: Mọi góp ý để cải thiện chất lượng dịch thuật xin gửi về email trên  
**🔄 Updates**: Bài dịch sẽ được cập nhật dựa trên feedback từ cộng đồng

---

*© 2024 - Bản dịch thuộc về Vũ Quang Huy. Vui lòng credit khi sử dụng.*