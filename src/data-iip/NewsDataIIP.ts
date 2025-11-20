interface NewsItem {
   id: number;
   category: string;
   title: string;
   date: string;
   image: string;
}

// Dummy data - sẽ thay bằng data thật sau
const news_data_iip: NewsItem[] = [
   {
      id: 1,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_01.jpg" // placeholder
   },
   {
      id: 2,
      category: "Tin thị trường",
      title: "Nam Định: Chấp thuận chủ trương đầu tư khu công nghiệp Hải Long giai đoạn 1",
      date: "14/11/2025",
      image: "/assets/images/listing/img_02.jpg"
   },
   {
      id: 3,
      category: "Tin thị trường",
      title: "Bà Rịa - Vũng Tàu: Chấp thuận chủ trương đầu tư dự án khu công nghiệp Vạn Thương",
      date: "14/11/2025",
      image: "/assets/images/listing/img_03.jpg"
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
