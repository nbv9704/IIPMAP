import { VideoCardItemProps } from "@/types"

const formatDuration = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`

export const generateFeaturedVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 8 }, (_, idx) => ({
    id: idx + 1,
    title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
    location: idx % 2 === 0 ? "Bắc Ninh" : "Hà Nội",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: idx === 0 ? "Xu hướng" : "Mới",
    views: `${28 + idx}k`,
    duration: formatDuration(14 + idx),
  }))

export const generateDailyVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 12 }, (_, idx) => ({
    id: 101 + idx,
    title: "Video mới từ IIPMap.AI",
    location: idx % 2 === 0 ? "Hà Nội" : "Bắc Giang",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: idx % 3 === 0 ? "Hot" : "Hàng ngày",
    views: `${12 + idx}k`,
    duration: formatDuration(9 + idx),
  }))

export const generateSavedVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 18 }, (_, idx) => ({
    id: 201 + idx,
    title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
    location: idx % 2 === 0 ? "Bắc Ninh" : "Hải Dương",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: "Đã lưu",
    views: `${22 + idx}k`,
    duration: formatDuration(12 + idx),
  }))

export const generateFollowingUsers = () => [
  {
    id: 1,
    username: "@kcn_tien_son",
    displayName: "KCN Tiên Sơn",
    avatar: "T",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 301 + idx,
      title: "Video từ KCN Tiên Sơn",
      location: "Bắc Ninh",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Mới" : "Hot",
      views: `${15 + idx}k`,
      duration: formatDuration(20 + idx),
    })),
  },
  {
    id: 2,
    username: "@kcn_vsip",
    displayName: "KCN VSIP",
    avatar: "V",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 401 + idx,
      title: "Video từ KCN VSIP",
      location: "Hải Phòng",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Xu hướng" : "Mới",
      views: `${25 + idx}k`,
      duration: formatDuration(15 + idx),
    })),
  },
  {
    id: 3,
    username: "@kcn_my_phuoc",
    displayName: "KCN Mỹ Phước",
    avatar: "M",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 501 + idx,
      title: "Video từ KCN Mỹ Phước",
      location: "Bình Dương",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Hot" : "Hàng ngày",
      views: `${18 + idx}k`,
      duration: formatDuration(25 + idx),
    })),
  },
]

export const generateNotifications = () =>
  Array.from({ length: 35 }, (_, idx) => ({
    id: idx + 1,
    type: ["like", "comment", "message", "follower"][idx % 4],
    user: `Người dùng ${idx + 1}`,
    action:
      idx % 4 === 0
        ? "đã thích video của bạn"
        : idx % 4 === 1
        ? "đã bình luận về video của bạn"
        : idx % 4 === 2
        ? "đã gửi tin nhắn cho bạn"
        : "đã bắt đầu theo dõi bạn",
    video: idx % 4 === 0 || idx % 4 === 1 ? `Khu công nghiệp ${idx + 1}` : "",
    time:
      idx < 2
        ? `${idx + 2} giờ trước`
        : idx < 7
        ? `${idx - 1} ngày trước`
        : `${idx - 6} tuần trước`,
    read: idx > 2,
  }))
