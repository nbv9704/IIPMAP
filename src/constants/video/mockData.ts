import { VideoCardItemProps } from "@/types"
import { USER_ID } from "./config"

const formatDuration = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`

export const generateFeaturedVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 8 }, (_, idx) => ({
    id: idx + 1,
    title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
    location: idx % 2 === 0 ? "Bắc Ninh" : "Hà Nội",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: idx === 0 ? "Xu huong" : "Moi",
    views: `${28 + idx}k`,
    duration: formatDuration(14 + idx),
  }))

export const generateDailyVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 12 }, (_, idx) => ({
    id: 101 + idx,
    title: "Video mới từ IIPMap.AI",
    location: idx % 2 === 0 ? "Hà Nội" : "Bắc Giang",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: idx % 3 === 0 ? "Hot" : "Hang ngay",
    views: `${12 + idx}k`,
    duration: formatDuration(9 + idx),
  }))

export const generateSavedVideos = (): VideoCardItemProps[] =>
  Array.from({ length: 18 }, (_, idx) => ({
    id: 201 + idx,
    title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
    location: idx % 2 === 0 ? "Bắc Ninh" : "Hải Dương",
    thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
    badge: "Da luu",
    views: `${22 + idx}k`,
    duration: formatDuration(12 + idx),
  }))

export const generateFollowingUsers = () => [
  {
    id: 1,
    username: "@kcn_tien".slice(0, USER_ID.MAX_USERNAME_LENGTH + 1),
    displayName: "KCN Tiên Sơn",
    avatar: "T",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 301 + idx,
      title: "Video từ KCN Tiên Sơn",
      location: "Bắc Ninh",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Moi" : "Hot",
      views: `${15 + idx}k`,
      duration: formatDuration(20 + idx),
    })),
  },
  {
    id: 2,
    username: "@kcn_vsip".slice(0, USER_ID.MAX_USERNAME_LENGTH + 1),
    displayName: "KCN VSIP",
    avatar: "V",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 401 + idx,
      title: "Video từ KCN VSIP",
      location: "Hải Phòng",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Xu huong" : "Moi",
      views: `${25 + idx}k`,
      duration: formatDuration(15 + idx),
    })),
  },
  {
    id: 3,
    username: "@kcn_my_ph".slice(0, USER_ID.MAX_USERNAME_LENGTH + 1),
    displayName: "KCN Mỹ Phước",
    avatar: "M",
    videos: Array.from({ length: 5 }, (_, idx) => ({
      id: 501 + idx,
      title: "Video từ KCN Mỹ Phước",
      location: "Bình Dương",
      thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
      badge: idx === 0 ? "Hot" : "Hang ngay",
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
    actionKey:
      idx % 4 === 0
        ? "video.likedYourVideo"
        : idx % 4 === 1
        ? "video.commentedOnYourVideo"
        : idx % 4 === 2
        ? "video.sentYouMessage"
        : "video.startedFollowingYou",
    video: idx % 4 === 0 || idx % 4 === 1 ? `Khu công nghiệp ${idx + 1}` : "",
    timeValue: idx < 2 ? idx + 2 : idx < 7 ? idx - 1 : idx - 6,
    timeUnit: idx < 2 ? "video.hoursAgo" : idx < 7 ? "video.daysAgo" : "video.weeksAgo",
    read: idx > 2,
  }))
