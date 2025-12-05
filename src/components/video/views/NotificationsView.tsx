"use client"

// ============================================
// IMPORTS
// ============================================
import { useState, useEffect, useMemo } from "react"
import { PAGINATION } from "@/constants/video/config"
import { generateNotifications } from "@/constants/video/mockData"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { useGetNotificationsQuery } from "@/redux/slice/videoApiSlice"

// ============================================
// TYPES
// ============================================
type NotificationType = "all" | "like" | "comment" | "message" | "follower"

// ============================================
// COMPONENT
// ============================================
const NotificationsView = () => {
  const { currentLang } = useLanguage()
  const [notificationFilter, setNotificationFilter] = useState<NotificationType>("all")
  const [notificationPage, setNotificationPage] = useState(1)

  // ✅ RTK Query API call (following VNG004's pattern)
  const { data: apiNotifications, error: errorNotifications } = useGetNotificationsQuery(50)
  
  // ✅ Mock data fallback (for testing phase)
  const mockNotifications = useMemo(() => generateNotifications(), [])
  
  // ✅ Determine data source
  const USE_MOCK = !apiNotifications || errorNotifications
  
  // ✅ Transform API data (when backend ready)
  const transformApiToNotification = (notifs: typeof apiNotifications) => {
    if (!notifs) return []
    return notifs.map(n => ({
      id: parseInt(n.id) || 0,
      type: n.type,
      user: n.fromUser?.displayName || "User",
      actionKey: n.type === "like" ? "video.likedYourVideo" 
        : n.type === "comment" ? "video.commentedOnYourVideo"
        : n.type === "follow" ? "video.startedFollowingYou"
        : "video.sentYouMessage",
      video: n.videoId ? "Video title" : "",
      timeValue: 1,
      timeUnit: "video.hoursAgo",
      read: n.isRead,
    }))
  }
  
  // ✅ Select data to display
  const notifications = USE_MOCK ? mockNotifications : transformApiToNotification(apiNotifications)
  
  // 🔍 Debug logging
  console.log("🔔 NotificationsView - Using:", USE_MOCK ? "📦 Mock" : "🌐 API")

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
            {getTranslation(currentLang, "video.allActivity")}
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "like" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("like")}
          >
            {getTranslation(currentLang, "video.likes")}
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "comment" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("comment")}
          >
            {getTranslation(currentLang, "video.comments")}
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "message" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("message")}
          >
            {getTranslation(currentLang, "video.newMessages")}
          </button>
          <button
            className={`video-notification-filter ${
              notificationFilter === "follower" ? "active" : ""
            }`}
            onClick={() => setNotificationFilter("follower")}
          >
            {getTranslation(currentLang, "video.followers")}
          </button>
        </div>
        <button
          className="video-mark-all-read-btn"
          onClick={() => {
            console.log("Mark all as read")
          }}
        >
          {getTranslation(currentLang, "video.markAllRead")}
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
                <strong>{notification.user}</strong> {getTranslation(currentLang, notification.actionKey)}
                {notification.video && (
                  <>
                    {" "}
                    <span className="video-notification-video">
                      &ldquo;{notification.video}&rdquo;
                    </span>
                  </>
                )}
              </p>
              <span className="video-notification-time">
                {notification.timeValue} {getTranslation(currentLang, notification.timeUnit)}
              </span>
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
