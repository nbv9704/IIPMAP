"use client"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"

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

const VideoSidebar = ({ activeSlug }: VideoSidebarProps) => {
  const hasUnreadNotifications = true
  
  // Sidebar search state
  const [sidebarQuery, setSidebarQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // Mock data
  const SIDEBAR_RECENT = ["siuuu", "ronaldo", "messi", "@abc"]
  const SIDEBAR_ALL = [
    { q: "việt nam", v: 50000 },
    { q: "video hay", v: 25000 },
    { q: "vua", v: 15000 },
    { q: "văn hóa", v: 12000 },
    { q: "vui vẻ", v: 8000 },
    { q: "@abc", v: 20000 },
    { q: "@abcd", v: 5000 },
    { q: "@abce", v: 3000 },
  ]

  // Get matching recent searches
  const sidebarRecent = !sidebarQuery
    ? SIDEBAR_RECENT
    : SIDEBAR_RECENT.filter(s => s.toLowerCase().includes(sidebarQuery.toLowerCase()))

  // Get filtered suggestions (exclude recent, sort by views)
  const sidebarSuggestions = !sidebarQuery
    ? []
    : SIDEBAR_ALL
        .filter(s => {
          const match = s.q.toLowerCase().includes(sidebarQuery.toLowerCase())
          const notRecent = !SIDEBAR_RECENT.some(r => r.toLowerCase() === s.q.toLowerCase())
          return match && notRecent
        })
        .sort((a, b) => b.v - a.v)
        .slice(0, 5)

  const sidebarHasResults = sidebarOpen && (sidebarRecent.length > 0 || sidebarSuggestions.length > 0)

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setSidebarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  // Highlight matching text
  const highlight = (text: string, query: string) => {
    if (!query) return text
    const idx = text.toLowerCase().indexOf(query.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <strong>{text.slice(idx, idx + query.length)}</strong>
        {text.slice(idx + query.length)}
      </>
    )
  }

  return (
    <aside className="video-sidebar">
      {/* Sidebar Search */}
      {activeSlug !== "explore" && (
        <div className={`sidebar-search ${sidebarHasResults ? 'has-results' : ''}`} ref={sidebarRef}>
          <div className="sidebar-search-input">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={sidebarQuery}
              onChange={(e) => {
                setSidebarQuery(e.target.value)
                setSidebarOpen(true)
              }}
              onFocus={() => setSidebarOpen(true)}
            />
            <button type="button" aria-label="Search">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {sidebarHasResults && (
            <div className="sidebar-search-results">
              {sidebarRecent.length > 0 && (
                <div className="search-section">
                  <div className="search-label">Recent Searches</div>
                  {sidebarRecent.map((q, i) => (
                    <button
                      key={i}
                      className="search-item"
                      onClick={() => {
                        setSidebarQuery(q)
                        setSidebarOpen(false)
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>{highlight(q, sidebarQuery)}</span>
                    </button>
                  ))}
                </div>
              )}

              {sidebarSuggestions.length > 0 && (
                <div className="search-section">
                  {sidebarRecent.length > 0 && <div className="search-divider" />}
                  <div className="search-label">Gợi ý</div>
                  {sidebarSuggestions.map((item, i) => (
                    <button
                      key={i}
                      className="search-item"
                      onClick={() => {
                        setSidebarQuery(item.q)
                        setSidebarOpen(false)
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span>{highlight(item.q, sidebarQuery)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <nav className="video-nav-menu">
        {menuItems.map((item) => (
          <Link
            key={item.slug}
            href={`/video/${item.slug}`}
            className={`video-nav-item ${activeSlug === item.slug ? "active" : ""}`}
          >
            {item.label}
            {item.slug === "notifications" && hasUnreadNotifications && (
              <span className="video-nav-badge" />
            )}
          </Link>
        ))}
      </nav>
    </aside>
  )
}

export default VideoSidebar
