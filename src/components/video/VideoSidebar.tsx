"use client"
import Link from "next/link"

interface VideoSidebarProps {
  activeSlug: string
}

const menuItems = [
  { id: 1, label: "Khám phá", slug: "explore" },
  { id: 2, label: "Đang theo dõi", slug: "following" },
  { id: 3, label: "Xem cùng bản đồ", slug: "map-view" },
  { id: 4, label: "Video đã lưu", slug: "saved" },
  { id: 5, label: "Tin nhắn", slug: "messages" },
  { id: 6, label: "Thông báo", slug: "notifications" },
  { id: 7, label: "Hồ sơ cá nhân", slug: "profile" },
]

const VideoSidebar = ({ activeSlug }: VideoSidebarProps) => (
  <aside className="video-sidebar">
    <nav className="video-nav-menu">
      {menuItems.map((item) => (
        <Link
          key={item.slug}
          href={`/video/${item.slug}`}
          className={`video-nav-item ${activeSlug === item.slug ? "active" : ""}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  </aside>
)

export default VideoSidebar
