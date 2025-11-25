"use client"
import Link from "next/link"

interface VideoSidebarProps {
  activeSlug: string
}

const menuItems = [
  { id: 1, label: "Khám phá", slug: "kham-pha" },
  { id: 2, label: "Đang theo dõi", slug: "dang-theo-doi" },
  { id: 3, label: "Xem cùng bản đồ", slug: "xem-cung-ban-do" },
  { id: 4, label: "Video đã lưu", slug: "video-da-luu" },
  { id: 5, label: "Tin nhắn", slug: "tin-nhan" },
  { id: 6, label: "Thông báo", slug: "thong-bao" },
  { id: 7, label: "Hồ sơ cá nhân", slug: "ho-so-ca-nhan" },
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
