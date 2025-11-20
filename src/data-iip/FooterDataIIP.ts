interface FooterDataType {
   id: number;
   widget_title: string;
   widget_class: string;
   footer_link: {
      link: string;
      link_title: string;
   }[];
}

const footer_data_iip: FooterDataType[] = [
   {
      id: 1,
      widget_title: "HỆ SINH THÁI IIP",
      widget_class: "col-lg-3",
      footer_link: [
         { link: "/", link_title: "IIPMap.AI" },
         { link: "https://iipvietnam.com", link_title: "IIPVietnam.com" },
         { link: "https://cvlam.com", link_title: "CVLam.com" },
      ]
   },
   {
      id: 2,
      widget_title: "ĐỊA CHỈ",
      widget_class: "col-lg-3",
      footer_link: [
         { 
            link: "#", 
            link_title: "Lô 7, Khu nhà thấp tầng, Khu Ngoại giao đoàn, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội" 
         },
      ]
   },
   {
      id: 3,
      widget_title: "LIÊN LẠC",
      widget_class: "col-lg-3",
      footer_link: [
         { link: "tel:1900888858", link_title: "1900.8888.58" },
         { link: "mailto:info@iipvietnam.com", link_title: "info@iipvietnam.com" },
      ]
   },
   {
      id: 4,
      widget_title: "MẠNG XÃ HỘI",
      widget_class: "col-lg-3",
      footer_link: [
         { link: "https://facebook.com", link_title: "Facebook" },
         { link: "https://youtube.com", link_title: "Youtube" },
         { link: "https://linkedin.com", link_title: "Linkedin" },
      ]
   },
];

export default footer_data_iip;
