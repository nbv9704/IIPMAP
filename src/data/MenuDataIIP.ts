interface MenuItem {
    id: number;
    title: string;
    link: string;
    has_dropdown: boolean;
}

const menu_data_iip: MenuItem[] = [
    {
        id: 1,
        has_dropdown: false,
        title: "Trang chủ",
        link: "/",
    },
    {
        id: 2,
        has_dropdown: false,
        title: "Về chúng tôi",
        link: "/about-us",
    },
    {
        id: 3,
        has_dropdown: false,
        title: "Tin mua bán",
        link: "/listings",
    },
    {
        id: 4,
        has_dropdown: false,
        title: "Video",
        link: "/video",
    },
    {
        id: 5,
        has_dropdown: false,
        title: "Tin tức",
        link: "/news",
    },
    {
        id: 6,
        has_dropdown: false,
        title: "Dịch vụ",
        link: "/services",
    },
    {
        id: 7,
        has_dropdown: false,
        title: "Liên hệ",
        link: "/contact-us",
    },
    {
        id: 8,
        has_dropdown: false,
        title: "Đặt lịch",
        link: "/booking",
    },
];

export default menu_data_iip;
