interface NewsItem {
   id: number;
   category: string;
   title: string;
   date: string;
   image: string;
   excerpt?: string;
   content?: string[];
   images?: string[];
   likes?: number;
   comments?: number;
}

// Dummy data - sẽ thay bằng data thật sau
const news_data_iip: NewsItem[] = [
   {
      id: 1,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_01.jpg",
      excerpt: "UBND tỉnh Bà Rịa - Vũng Tàu vừa có quyết định chấp thuận chủ trương đầu tư dự án Khu công nghiệp Vạn Thương với quy mô 500ha, tổng vốn đầu tư dự kiến 5.000 tỷ đồng...",
      content: [
         "Dự án Khu công nghiệp Vạn Thương được triển khai tại huyện Xuyên Mộc với diện tích 500ha, tập trung phát triển các ngành công nghiệp hỗ trợ, công nghệ cao và logistics. Tổng vốn đầu tư dự kiến khoảng 5.000 tỷ đồng, trong đó vốn đầu tư hạ tầng kỹ thuật khoảng 2.500 tỷ đồng.",
         "Theo quy hoạch, KCN Vạn Thương sẽ được chia thành các phân khu chức năng rõ ràng: khu sản xuất công nghiệp, khu dịch vụ logistics, khu nhà ở công nhân và các tiện ích phục vụ. Dự án hướng đến mục tiêu phát triển bền vững, ứng dụng công nghệ xanh và thân thiện với môi trường.",
         "UBND tỉnh yêu cầu nhà đầu tư phải hoàn thành các thủ tục pháp lý, đánh giá tác động môi trường và bồi thường giải phóng mặt bằng theo đúng quy định. Dự kiến dự án sẽ khởi công vào quý II/2026 và hoàn thành giai đoạn 1 vào năm 2028.",
         "Khi đi vào hoạt động, KCN Vạn Thương dự kiến thu hút khoảng 100-150 doanh nghiệp, tạo việc làm cho hơn 30.000 lao động, đóng góp quan trọng vào phát triển kinh tế - xã hội của tỉnh Bà Rịa - Vũng Tàu."
      ],
      images: ["/assets/images/listing/img_01.jpg", "/assets/images/listing/img_01.jpg"],
      likes: 18,
      comments: 5
   },
   {
      id: 2,
      category: "Tin thị trường",
      title: "Nam Định: Chấp thuận chủ trương đầu tư khu công nghiệp Hải Long giai đoạn 1",
      date: "14/11/2025",
      image: "/assets/images/listing/img_02.jpg",
      excerpt: "Ngày 6/3/2025, UBND tỉnh Nam Định đã chính thức phê duyệt chủ trương đầu tư và lựa chọn nhà đầu tư thực hiện dự án Khu công nghiệp (KCN) Hải Long giai đoạn 1...",
      content: [
         "Dự án do Công ty Cổ phần Phát triển đô thị và KCN Việt Nam Singapore (VSIP) triển khai với diện tích 180ha tại huyện Giao Thủy. Tổng vốn đầu tư dự kiến khoảng 2.249,345 tỷ đồng, trong đó nhà đầu tư góp 337,402 tỷ đồng. Thời gian thực hiện kéo dài 50 năm, dự kiến khởi công vào quý III hoặc đầu quý IV năm 2025, và hoàn thiện toàn bộ hạ tầng vào cuối năm 2027.",
         "UBND tỉnh đã phân công trách nhiệm cụ thể cho các cơ quan chức năng và chính quyền địa phương nhằm đảm bảo tiến độ dự án. Ban Quản lý các KCN chịu trách nhiệm kiểm tra, giám sát và quản lý dự án theo Luật Đầu tư. Các sở, ngành liên quan sẽ đánh giá và thẩm định các thủ tục về quy hoạch, sử dụng đất, bảo vệ môi trường, xây dựng hạ tầng, cũng như hỗ trợ nhà đầu tư trong quá trình triển khai. Đồng thời, chính quyền huyện Giao Thủy và các xã trong vùng dự án sẽ tổ chức thu hồi đất, đền bù, giải phóng mặt bằng theo đúng quy định, đảm bảo quá trình thi công không bị gián đoạn.",
         "Về phía nhà đầu tư, Công ty VSIP cam kết tuân thủ đầy đủ các quy định pháp lý liên quan đến đầu tư, đất đai, môi trường và xây dựng. Nhà đầu tư phải đảm bảo huy động vốn đúng cam kết, ký quỹ thực hiện dự án, hoàn thành hạ tầng đúng tiến độ và phối hợp chặt chẽ với chính quyền địa phương để thực hiện công tác giải phóng mặt bằng. Ngoài ra, doanh nghiệp phải đảm bảo quyền lợi của người dân trong khu vực dự án, tuân thủ quy định về tái định cư, bảo vệ tài nguyên và phát triển bền vững.",
         "Với định hướng phát triển một khu công nghiệp hiện đại và đồng bộ, dự án KCN Hải Long kỳ vọng thu hút nhiều doanh nghiệp trong nước và quốc tế, đặc biệt trong lĩnh vực công nghệ cao. Dự án dự kiến tạo ra khoảng 18.000 việc làm, đóng góp quan trọng vào sự phát triển kinh tế - xã hội của khu vực ven biển Nam Định."
      ],
      images: ["/assets/images/listing/img_02.jpg", "/assets/images/listing/img_02.jpg"],
      likes: 24,
      comments: 3
   },
   {
      id: 3,
      category: "Tin quy hoạch",
      title: "Hà Nội: Điều chỉnh quy hoạch khu công nghiệp Sóc Sơn mở rộng",
      date: "12/11/2025",
      image: "/assets/images/listing/img_03.jpg",
      excerpt: "UBND TP Hà Nội đang lấy ý kiến về điều chỉnh quy hoạch chi tiết KCN Sóc Sơn mở rộng với diện tích tăng thêm 200ha...",
      content: [
         "Theo dự thảo điều chỉnh, KCN Sóc Sơn mở rộng sẽ tăng từ 300ha lên 500ha, tập trung phát triển các ngành công nghiệp điện tử, cơ khí chính xác và dược phẩm. Việc điều chỉnh nhằm đáp ứng nhu cầu thu hút đầu tư ngày càng tăng của khu vực phía Bắc Hà Nội.",
         "Quy hoạch mới bổ sung thêm các khu vực dịch vụ logistics hiện đại, khu nhà ở công nhân với đầy đủ tiện ích và hệ thống xử lý môi trường đạt tiêu chuẩn quốc tế. Dự án cũng tích hợp hệ thống giao thông kết nối với cao tốc Nội Bài - Lào Cai và đường vành đai 4.",
         "UBND TP yêu cầu các sở ngành liên quan thẩm định kỹ lưỡng về tác động môi trường, hạ tầng giao thông và nguồn cung cấp điện nước. Dự kiến quy hoạch điều chỉnh sẽ được phê duyệt trong quý I/2026."
      ],
      images: ["/assets/images/listing/img_03.jpg", "/assets/images/listing/img_03.jpg"],
      likes: 15,
      comments: 2
   },
   {
      id: 4,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_04.jpg"
   },
   {
      id: 5,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_05.jpg"
   },
   {
      id: 6,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_06.jpg"
   },
];

export default news_data_iip;
