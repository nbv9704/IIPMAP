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

// Mock data for search
const RECENT_SEARCHES = ["siuuu", "ronaldo", "messi", "@abc"]
const SUGGESTIONS_DATA = [
  { q: "việt nam", views: 50000 },
  { q: "video hay", views: 25000 },
  { q: "vua", views: 15000 },
  { q: "văn hóa", views: 12000 },
  { q: "vui vẻ", views: 8000 },
  { q: "@abcd", views: 5000 },
  { q: "@abce", views: 3000 },
]

const VideoSidebar = ({ activeSlug }: VideoSidebarProps) => {
  const hasUnreadNotifications = true
  
  // Search state
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Filter recent searches
  const recentResults = query
    ? RECENT_SEARCHES.filter(s => s.toLowerCase().includes(query.toLowerCase()))
    : RECENT_SEARCHES

  // Filter suggestions (exclude items already in recent)
  const suggestions = query
    ? SUGGESTIONS_DATA
        .filter(item => {
          const matchesQuery = item.q.toLowerCase().includes(query.toLowerCase())
          const notInRecent = !RECENT_SEARCHES.some(r => r.toLowerCase() === item.q.toLowerCase())
          return matchesQuery && notInRecent
        })
        .sort((a, b) => b.views - a.views)
        .slice(0, 5)
    : []

  const showDropdown = isOpen && (recentResults.length > 0 || suggestions.length > 0)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Highlight matching text
  const highlightMatch = (text: string, search: string) => {
    if (!search) return text
    const index = text.toLowerCase().indexOf(search.toLowerCase())
    if (index === -1) return text
    return (
      <>
        {text.slice(0, index)}
        <strong>{text.slice(index, index + search.length)}</strong>
        {text.slice(index + search.length)}
      </>
    )
  }

  const handleSelect = (value: string) => {
    setQuery(value)
    setIsOpen(false)
  }

  return (
    <aside className="video-sidebar">
      {/* Sidebar Search - only show when NOT on explore page */}
      {activeSlug !== "explore" && (
        <div className="vsb-search" ref={containerRef}>
          <div className={`vsb-search__container ${showDropdown ? "open" : ""}`}>
            <div className="vsb-search__input-wrapper">
              <input
                type="text"
                className="vsb-search__input"
                placeholder="Tìm kiếm"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setIsOpen(true)
                }}
                onFocus={() => setIsOpen(true)}
              />
              <button type="button" className="vsb-search__btn" aria-label="Search">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {showDropdown && (
              <>
                <div className="vsb-search__divider-line" />
                <div className="vsb-search__dropdown">
                  {recentResults.length > 0 && (
                    <div className="vsb-search__section">
                      <div className="vsb-search__label">Recent Searches</div>
                      {recentResults.map((item, i) => (
                        <button key={i} className="vsb-search__item" onClick={() => handleSelect(item)}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M8 4V8L11 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <span>{highlightMatch(item, query)}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {suggestions.length > 0 && (
                    <div className="vsb-search__section">
                      {recentResults.length > 0 && <div className="vsb-search__divider" />}
                      <div className="vsb-search__label">Gợi ý</div>
                      {suggestions.map((item, i) => (
                        <button key={i} className="vsb-search__item" onClick={() => handleSelect(item.q)}>
                          {item.q.startsWith("@") ? (
                            <div className="vsb-search__avatar">{item.q.charAt(1).toUpperCase()}</div>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                              <line x1="10.5" y1="10.5" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                          )}
                          <span>{highlightMatch(item.q, query)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
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
