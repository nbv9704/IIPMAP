"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useEffect, useMemo } from "react"
import { PAGINATION } from "@/constants/video/config"
import { generateNotifications } from "@/constants/video/mockData"

// ============================================
// TYPES
// ============================================
type NotificationType = "all" | "like" | "comment" | "message" | "follower"

// ============================================
// COMPONENT
// ============================================
const NotificationsView = () => {
  const [notificationFilter, setNotificationFilter] = useState<NotificationType>("all")
  const [notificationPage, setNotificationPage] = useState(1)

  const notifications = useMemo(() => generateNotifications(), [])

  const filteredNotifications = useMemo(() => {
    if (notificationFilter === "all") return notifications
    return notifications.filter((n) => n.type === notificationFilter)
  }, [notifications, notificationFilter])

  const totalPages = Math.ceil(
    filteredNotifications.length / PAGINATION.NOTIFICATIONS_PER_PAGE
  )

  const paginatedNotifications = useMemo(() => {
    const startIndex = (notificationPage - 1) * PAGINATION.NOTIFICATIONS_PER_PAGE
    const endIndex = startIndex + PAGINATION.NOTIFICATIONS_PER_PAGE
    return filteredNotifications.slice(startIndex, endIndex)
  }, [filteredNotifications, notificationPage])

  useEffect(() => {
    setNotificationPage(1)
  }, [notificationFilter])

  return (
    <div className="video-notifications-layout">
      <div className="video-notifications-header">
        <div className="video-notifications-filters">
          <button
            className={`video-notification-filter ${
              notificationFilter === "all" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("all")}
          >
            Tất cả hoạt động
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "like" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("like")}
          >
            Lượt thích
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "comment" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("comment")}
          >
            Bình luận
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "message" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("message")}
          >
            Tin nhắn mới
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "follower" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("follower")}
          >
            Người theo dõi
          </button>
        </div>
        <button
          className="video-mark-all-read-btn"
          onClick={() => {
            console.log("Mark all as read")
          }}
        >
          Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div className="video-notifications-list">
        {paginatedNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`video-notification-item ${!notification.read ? "unread" : ""}`}
          >
            <div className="video-notification-avatar">{notification.user.charAt(0)}</div>
            <div className="video-notification-content">
              <p>
                <strong>{notification.user}</strong> {notification.action}
                {notification.video && (
                  <>
                    {" "}
                    <span className="video-notification-video">
                      &ldquo;{notification.video}&rdquo;
                    </span>
                  </>
                )}
              </p>
              <span className="video-notification-time">{notification.time}</span>
            </div>
            {!notification.read && <div className="video-notification-dot" />}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="video-notifications-pagination">
          <button
            className="video-pagination-btn"
            onClick={() => setNotificationPage((p) => Math.max(1, p - 1))}
            disabled={notificationPage === 1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12 15L7 10L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="video-pagination-numbers">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= notificationPage - 1 && page <= notificationPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    className={`video-pagination-number ${
                      page === notificationPage ? "active" : ""
                    }`}
                    onClick={() => setNotificationPage(page)}
                  >
                    {page}
                  </button>
                )
              } else if (page === notificationPage - 2 || page === notificationPage + 2) {
                return (
                  <span key={page} className="video-pagination-dots">
                    ...
                  </span>
                )
              }
              return null
            })}
          </div>

          <button
            className="video-pagination-btn"
            onClick={() => setNotificationPage((p) => Math.min(totalPages, p + 1))}
            disabled={notificationPage === totalPages}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M8 5L13 10L8 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default NotificationsView
