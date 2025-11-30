"use client"

import { useMemo, useState, useEffect, useRef } from "react"
import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoHistoryGrid from "@/components/video/VideoHistoryGrid"
import VideoCardItem, { VideoCardItemProps } from "@/components/video/VideoCardItem"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"
import { readSavedVideos } from "@/utils/videoStorage"
import { HiLocationMarker } from "react-icons/hi"
import { BiMoney, BiTimeFive, BiReply } from "react-icons/bi"
import { TbRulerMeasure, TbMountain } from "react-icons/tb"
import { AiOutlinePaperClip, AiOutlineInfoCircle, AiOutlineSmile } from "react-icons/ai"
import "@/styles/video.scss"

const formatDuration = (seconds: number) => `00:${seconds.toString().padStart(2, "0")}`

interface VideoPageContentProps {
  section?: string
  userId?: string
}

const DEFAULT_SECTION = "explore"

const VideoPageContent = ({ section = DEFAULT_SECTION, userId }: VideoPageContentProps) => {
  const { currentLang } = useLanguage()
  
  // Explore search state
  const [exploreQuery, setExploreQuery] = useState("")
  const [exploreOpen, setExploreOpen] = useState(false)
  const exploreSearchRef = useRef<HTMLDivElement>(null)
  
  const [notificationFilter, setNotificationFilter] = useState("all")
  const [notificationPage, setNotificationPage] = useState(1)
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [showMessagesMenu, setShowMessagesMenu] = useState(false)
  const [showChatMenu, setShowChatMenu] = useState(false)
  const [hoveredMessage, setHoveredMessage] = useState<number | null>(null)
  const [showMessageMenu, setShowMessageMenu] = useState<number | null>(null)
  const [dropupMessages, setDropupMessages] = useState<Set<number>>(new Set())
  const [showEmojiPicker, setShowEmojiPicker] = useState<number | null>(null)
  const [replyingTo, setReplyingTo] = useState<any>(null)
  const [showFilesPopup, setShowFilesPopup] = useState(false)
  const [filesPopupTab, setFilesPopupTab] = useState<"files" | "media" | "links">("files")
  const [showPinnedPopup, setShowPinnedPopup] = useState(false)
  const notificationsPerPage = 10
  const viewMode =
    section === "saved"
      ? "saved"
      : section === "profile"
      ? "profile"
      : section === "notifications"
      ? "notifications"
      : section === "messages"
      ? "messages"
      : section === "following"
      ? "following"
      : "default"

  useEffect(() => {
    document.title = `${getTranslation(currentLang, "pageTitle.video")} - ${getTranslation(
      currentLang,
      "pageTitle.siteName",
    )}`
  }, [currentLang])

  // Close explore search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreSearchRef.current && !exploreSearchRef.current.contains(e.target as Node)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // fake data
  const featuredVideos: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 8 }, (_, idx) => ({
        id: idx + 1,
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: idx % 2 === 0 ? "Bắc Ninh" : "Hà Nội",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: idx === 0 ? "Xu hướng" : "Mới",
        views: `${28 + idx}k`,
        duration: formatDuration(14 + idx),
      })),
    [],
  )

  const dailyVideos: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 12 }, (_, idx) => ({
        id: 101 + idx,
        title: "Video mới từ IIPMap.AI",
        location: idx % 2 === 0 ? "Hà Nội" : "Bắc Giang",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: idx % 3 === 0 ? "Hot" : "Hàng ngày",
        views: `${12 + idx}k`,
        duration: formatDuration(9 + idx),
      })),
    [],
  )

  const savedVideosDefault: VideoCardItemProps[] = useMemo(
    () =>
      Array.from({ length: 18 }, (_, idx) => ({
        id: 201 + idx,
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: idx % 2 === 0 ? "Bắc Ninh" : "Hải Dương",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Đã lưu",
        views: `${22 + idx}k`,
        duration: formatDuration(12 + idx),
      })),
    [],
  )

  // Following users data
  const followingUsers = useMemo(
    () => [
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
    ],
    [],
  )

  const notifications = useMemo(
    () =>
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
      })),
    [],
  )

  const filteredNotifications = useMemo(() => {
    if (notificationFilter === "all") return notifications
    return notifications.filter((n) => n.type === notificationFilter)
  }, [notifications, notificationFilter])

  const totalPages = Math.ceil(filteredNotifications.length / notificationsPerPage)

  const paginatedNotifications = useMemo(() => {
    const startIndex = (notificationPage - 1) * notificationsPerPage
    const endIndex = startIndex + notificationsPerPage
    return filteredNotifications.slice(startIndex, endIndex)
  }, [filteredNotifications, notificationPage])

  useEffect(() => {
    setNotificationPage(1)
  }, [notificationFilter])

  const conversations = useMemo(
    () =>
      Array.from({ length: 15 }, (_, idx) => ({
        id: idx + 1,
        user:
          idx === 0
            ? "Nguyễn Văn A Rất Dài"
            : idx === 1
            ? "Trần Thị B"
            : `Người dùng ${idx + 1}`,
        avatar: String.fromCharCode(65 + (idx % 26)),
        lastMessage:
          idx % 3 === 0
            ? "Xin chào, tôi muốn hỏi về khu công nghiệp..."
            : idx % 3 === 1
            ? "Cảm ơn bạn đã phản hồi!"
            : "Bạn có thể gửi thêm thông tin không?",
        time: idx < 3 ? `${idx + 1}m` : idx < 8 ? `${idx - 2}h` : `${idx - 7}d`,
        unread: idx < 3,
      })),
    [],
  )

  const currentChat = useMemo(() => {
    if (!selectedConversation) return null
    return conversations.find((c) => c.id === selectedConversation)
  }, [selectedConversation, conversations])

  // Explore search data & logic
  const EXPLORE_RECENT = ["siuuu", "ronaldo", "messi", "@abc"]
  const EXPLORE_ALL = [
    { q: "việt nam", v: 50000 },
    { q: "video hot", v: 35000 },
    { q: "vua", v: 15000 },
    { q: "văn hóa", v: 12000 },
    { q: "vui vẻ", v: 8000 },
    { q: "@abc", v: 20000 },
    { q: "@vietnam", v: 18000 },
    { q: "@abcd", v: 5000 },
    { q: "@abce", v: 3000 },
  ]

  const exploreRecent = useMemo(() => {
    if (!exploreQuery) return EXPLORE_RECENT
    return EXPLORE_RECENT.filter(s => s.toLowerCase().includes(exploreQuery.toLowerCase()))
  }, [exploreQuery])

  const exploreSuggestions = useMemo(() => {
    if (!exploreQuery) return []
    const recentSet = new Set(EXPLORE_RECENT.map(s => s.toLowerCase()))
    return EXPLORE_ALL
      .filter(s => s.q.toLowerCase().includes(exploreQuery.toLowerCase()) && !recentSet.has(s.q.toLowerCase()))
      .sort((a, b) => b.v - a.v)
      .slice(0, 5)
  }, [exploreQuery])

  const exploreHasResults = exploreOpen && (exploreRecent.length > 0 || exploreSuggestions.length > 0)

  const highlightText = (text: string, query: string) => {
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



  const chatMessages = useMemo(() => {
    if (!selectedConversation) return []
    return [
      {
        id: 1,
        sender: "other",
        text: "Xin chào! Tôi muốn hỏi về khu công nghiệp Tiên Sơn",
        timestamp: new Date("2024-01-15T10:30:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 2,
        sender: "me",
        text: "Chào bạn! Tôi có thể giúp gì cho bạn?",
        timestamp: new Date("2024-01-15T10:32:00"),
        pinned: true,
        replyTo: 1,
      },
      {
        id: 3,
        sender: "other",
        text: "Diện tích còn lại là bao nhiêu và giá thuê như thế nào?",
        timestamp: new Date("2024-01-15T10:33:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 4,
        sender: "me",
        text: "Hiện tại khu công nghiệp còn khoảng 150ha, giá thuê là 115 USD/m²",
        timestamp: new Date("2024-01-15T15:20:00"),
        pinned: false,
        replyTo: 3,
      },
      {
        id: 5,
        sender: "other",
        text: "Cảm ơn bạn! Tôi sẽ xem xét và liên hệ lại sau",
        timestamp: new Date("2024-01-15T15:21:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 6,
        sender: "me",
        text: "Vâng, nếu cần thêm thông tin gì bạn cứ liên hệ nhé",
        timestamp: new Date("2024-01-15T15:22:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 7,
        sender: "other",
        text: "Khu công nghiệp có gần sân bay không?",
        timestamp: new Date("2024-01-15T15:25:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 8,
        sender: "me",
        text: "Có, cách sân bay Nội Bài khoảng 25km",
        timestamp: new Date("2024-01-15T15:26:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 9,
        sender: "other",
        text: "Còn cảng biển thì sao?",
        timestamp: new Date("2024-01-15T15:27:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 10,
        sender: "me",
        text: "Cách cảng Hải Phòng khoảng 60km",
        timestamp: new Date("2024-01-15T15:28:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 11,
        sender: "other",
        text: "Hạ tầng điện nước có ổn định không?",
        timestamp: new Date("2024-01-15T15:30:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 12,
        sender: "me",
        text: "Rất ổn định, có trạm biến áp riêng và hệ thống xử lý nước hiện đại",
        timestamp: new Date("2024-01-15T15:31:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 13,
        sender: "other",
        text: "Thời gian thuê tối thiểu là bao lâu?",
        timestamp: new Date("2024-01-15T15:35:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 14,
        sender: "me",
        text: "Tối thiểu 20 năm, có thể gia hạn thêm",
        timestamp: new Date("2024-01-15T15:36:00"),
        pinned: false,
        replyTo: null,
      },
      {
        id: 15,
        sender: "other",
        text: "Vậy về câu hỏi đầu tiên của tôi, bạn có thể gửi thêm tài liệu chi tiết không?",
        timestamp: new Date("2024-01-15T15:40:00"),
        pinned: false,
        replyTo: 1,
      },
    ]
  }, [selectedConversation])

  const pinnedMessage = useMemo(() => {
    return chatMessages.find((msg) => msg.pinned)
  }, [chatMessages])

  const messagesWithTimestamps = useMemo(() => {
    const result: Array<{ type: "message" | "timestamp"; data: any }> = []
    let lastTimestamp: Date | null = null

    chatMessages.forEach((msg) => {
      const shouldShowTimestamp =
        !lastTimestamp ||
        (msg.timestamp.getTime() - lastTimestamp.getTime()) / (1000 * 60) > 30

      if (shouldShowTimestamp) {
        result.push({
          type: "timestamp",
          data: msg.timestamp.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
        lastTimestamp = msg.timestamp
      }

      result.push({ type: "message", data: msg })
    })

    return result
  }, [chatMessages])

  // Auto scroll to bottom when conversation changes or new messages
  useEffect(() => {
    if (selectedConversation) {
      const messagesContainer = document.querySelector(".video-chat-messages")
      if (messagesContainer) {
        setTimeout(() => {
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }, 100)
      }
    }
  }, [selectedConversation, messagesWithTimestamps])

  // Auto scroll when reply preview appears
  useEffect(() => {
    if (replyingTo) {
      const messagesContainer = document.querySelector(".video-chat-messages")
      if (messagesContainer) {
        setTimeout(() => {
          messagesContainer.scrollTop = messagesContainer.scrollHeight
        }, 100)
      }
    }
  }, [replyingTo])

  const [savedVideos, setSavedVideos] = useState<VideoCardItemProps[]>(savedVideosDefault)

  useEffect(() => {
    const stored = readSavedVideos()
    if (stored.length) {
      setSavedVideos(stored)
    }
  }, [])

  return (
    <Wrapper>
      <section className="video-page">
        <div className="video-page-container">
          {/* sidebar bên trái */}
          <div className="video-sidebar-wrapper">
            <VideoSidebar activeSlug={section} />
          </div>

          {/* cột chính bên phải */}
          <div className="video-main-column">
            {/* Explore Search Bar */}
            {section === "explore" && (
              <div className="vex-search" ref={exploreSearchRef}>
                <div className={`vex-search__container ${exploreHasResults ? "open" : ""}`}>
                  <div className="vex-search__input-wrapper">
                    <input
                      type="text"
                      className="vex-search__input"
                      placeholder="Tìm kiếm"
                      value={exploreQuery}
                      onChange={(e) => {
                        setExploreQuery(e.target.value)
                        setExploreOpen(true)
                      }}
                      onFocus={() => setExploreOpen(true)}
                    />
                    <button type="button" className="vex-search__btn" aria-label="Search">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <line x1="13.5" y1="13.5" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  {exploreHasResults && (
                    <>
                      <div className="vex-search__divider-line" />
                      <div className="vex-search__dropdown">
                        {exploreRecent.length > 0 && (
                          <div className="vex-search__section">
                            <div className="vex-search__label">Recent Searches</div>
                            {exploreRecent.map((q, i) => (
                              <button
                                key={i}
                                className="vex-search__item"
                                onClick={() => {
                                  setExploreQuery(q)
                                  setExploreOpen(false)
                                }}
                              >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                                  <path d="M9 5V9L12 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <span>{highlightText(q, exploreQuery)}</span>
                              </button>
                            ))}
                          </div>
                        )}

                        {exploreSuggestions.length > 0 && (
                          <div className="vex-search__section">
                            {exploreRecent.length > 0 && <div className="vex-search__divider" />}
                            <div className="vex-search__label">Gợi ý</div>
                            {exploreSuggestions.map((item, i) => (
                              <button
                                key={i}
                                className="vex-search__item"
                                onClick={() => {
                                  setExploreQuery(item.q)
                                  setExploreOpen(false)
                                }}
                              >
                                {item.q.startsWith("@") ? (
                                  <div className="vex-search__avatar">{item.q.charAt(1).toUpperCase()}</div>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                                    <line x1="13" y1="13" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                  </svg>
                                )}
                                <span>{highlightText(item.q, exploreQuery)}</span>
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

            {viewMode === "saved" ? (
              /* VIEW: Video đã lưu */
              <div className="video-section">
                <div className="video-section-scroll">
                  <VideoHistoryGrid
                    videos={savedVideos}
                    className="video-history-grid--saved"
                    sectionSlug={section}
                  />
                </div>
              </div>
            ) : viewMode === "profile" ? (
              /* VIEW: Hồ sơ cá nhân */
              <div className="video-profile-layout">
                <div className="video-profile-hero">
                  <div className="video-profile-avatar">
                    <img src="/assets/video/avatar-placeholder.png" alt="Profile" />
                  </div>
                  <div className="video-profile-details">
                    <h1>KHU CÔNG NGHIỆP TIÊN SƠN - BẮC NINH</h1>
                    
                    <div className="video-profile-actions">
                      {section === "profile" ? (
                        // My profile - Edit button
                        <>
                          <button type="button" className="video-primary-btn">
                            Chỉnh sửa trang cá nhân
                          </button>
                          <button type="button" className="video-secondary-btn">
                            Xem bài viết
                          </button>
                          <button type="button" className="video-share-btn" aria-label="Share">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M16 6L18 8L16 10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 14L6 16L8 18"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 8H10C7.79086 8 6 9.79086 6 12V16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        // Other user's profile - Follow, Message buttons
                        <>
                          <button type="button" className="video-primary-btn">
                            Follow
                          </button>
                          <button type="button" className="video-secondary-btn">
                            Message
                          </button>
                          <button type="button" className="video-outline-btn">
                            Xem bài viết
                          </button>
                          <button type="button" className="video-share-btn" aria-label="Share">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <path
                                d="M16 6L18 8L16 10"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M8 14L6 16L8 18"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 8H10C7.79086 8 6 9.79086 6 12V16"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>

                    <div className="video-profile-location">
                      <HiLocationMarker />
                      <span>Phường Đồng Nguyên, xã Đại Đồng, phường Tam Sơn, tỉnh Bắc Ninh</span>
                    </div>

                    <div className="video-profile-meta">
                      <div className="video-profile-meta-item">
                        <BiMoney />
                        <span>115 USD/m²</span>
                      </div>
                      <div className="video-profile-meta-item">
                        <TbRulerMeasure />
                        <span>402.82 ha</span>
                      </div>
                      <div className="video-profile-meta-item">
                        <TbMountain />
                        <span>Quỹ đất: Còn</span>
                      </div>
                      <div className="video-profile-meta-item">
                        <BiTimeFive />
                        <span>2019 - 2030</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="video-profile-feed">
                  <VideoHistoryGrid
                    videos={featuredVideos}
                    className="video-history-grid--saved"
                    sectionSlug={section}
                  />
                </div>
              </div>
            ) : viewMode === "notifications" ? (
              /* VIEW: Thông báo */
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
                      // TODO: Implement mark all as read logic
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
                      className={`video-notification-item ${
                        !notification.read ? "unread" : ""
                      }`}
                    >
                      <div className="video-notification-avatar">
                        {notification.user.charAt(0)}
                      </div>
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
            ) : viewMode === "following" ? (
              /* VIEW: Following - Video từ người dùng đang theo dõi */
              <>
                {followingUsers.map((user) => (
                  <div key={user.id} className="video-section video-section--following">
                    <div className="video-section-header">
                      <div className="video-section-heading video-section-heading--following">
                        <div className="video-following-user-header">
                          <div className="video-following-avatar">{user.avatar}</div>
                          <div className="video-following-info">
                            <h2>{user.displayName}</h2>
                            <span className="video-following-username">{user.username}</span>
                          </div>
                        </div>
                      </div>
                      <button className="video-section-badge">Xem tất cả →</button>
                    </div>
                    <div className="video-following-cards">
                      <VideoHistoryGrid
                        videos={user.videos}
                        sectionSlug={section}
                        className="video-history-grid--following"
                      />
                    </div>
                  </div>
                ))}
              </>
            ) : viewMode === "messages" ? (
              /* VIEW: Tin nhắn */
              <div className="video-messages-layout">
                <div className="video-messages-sidebar">
                  <div className="video-messages-sidebar-header">
                    <h3>Tin nhắn</h3>
                    <div className="video-messages-menu-wrapper">
                      <button
                        className="video-messages-menu-btn"
                        onClick={() => setShowMessagesMenu(!showMessagesMenu)}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="4" cy="10" r="1.5" fill="currentColor" />
                          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                          <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                        </svg>
                      </button>
                      {showMessagesMenu && (
                        <>
                          <div
                            className="video-messages-menu-backdrop"
                            onClick={() => setShowMessagesMenu(false)}
                          />
                          <div className="video-messages-menu-dropdown">
                            <button
                              onClick={() => {
                                console.log("Mark all as read")
                                setShowMessagesMenu(false)
                              }}
                            >
                              Đánh dấu tất cả đã đọc
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="video-messages-list">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className={`video-conversation-item ${
                          selectedConversation === conv.id ? "active" : ""
                        } ${conv.unread ? "unread" : ""}`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <div className="video-conversation-avatar">{conv.avatar}</div>
                        <div className="video-conversation-content">
                          <div className="video-conversation-header">
                            <span className="video-conversation-name">{conv.user}</span>
                            <span className="video-conversation-time">{conv.time}</span>
                          </div>
                          <p className="video-conversation-message">{conv.lastMessage}</p>
                        </div>
                        {conv.unread && <div className="video-conversation-badge" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="video-messages-main">
                  {selectedConversation ? (
                    <div className="video-chat-container">
                      <div className="video-chat-header">
                        <div className="video-chat-user">
                          <div className="video-chat-avatar">{currentChat?.avatar}</div>
                          <div className="video-chat-user-info">
                            <h4>{currentChat?.user}</h4>
                            <span>Đang hoạt động</span>
                          </div>
                        </div>
                        <div className="video-chat-menu-wrapper">
                          <button
                            className="video-chat-menu-btn"
                            onClick={() => setShowChatMenu(!showChatMenu)}
                          >
                            <AiOutlineInfoCircle size={22} />
                          </button>
                          {showChatMenu && (
                            <>
                              <div
                                className="video-chat-menu-backdrop"
                                onClick={() => setShowChatMenu(false)}
                              />
                              <div className="video-chat-menu-dropdown">
                                <button
                                  onClick={() => {
                                    console.log("View profile")
                                    setShowChatMenu(false)
                                  }}
                                >
                                  Xem trang cá nhân
                                </button>
                                <div className="video-chat-menu-divider" />
                                {pinnedMessage && (
                                  <button
                                    onClick={() => {
                                      setShowPinnedPopup(true)
                                      setShowChatMenu(false)
                                    }}
                                  >
                                    Xem tin nhắn đã ghim
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    setShowFilesPopup(true)
                                    setShowChatMenu(false)
                                  }}
                                >
                                  File, phương tiện và liên kết
                                </button>
                                <div className="video-chat-menu-divider" />
                                <button
                                  onClick={() => {
                                    console.log("Delete conversation")
                                    setShowChatMenu(false)
                                  }}
                                  className="video-chat-menu-danger"
                                >
                                  Xóa trò chuyện
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Files, Media & Links Popup */}
                      {showFilesPopup && (
                        <>
                          <div
                            className="video-files-popup-backdrop"
                            onClick={() => setShowFilesPopup(false)}
                          />
                          <div className="video-files-popup">
                            <div className="video-files-popup-header">
                              <h3>File, phương tiện và liên kết</h3>
                              <button
                                className="video-files-popup-close"
                                onClick={() => setShowFilesPopup(false)}
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path
                                    d="M15 5L5 15M5 5L15 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="video-files-popup-tabs">
                              <button
                                className={filesPopupTab === "files" ? "active" : ""}
                                onClick={() => setFilesPopupTab("files")}
                              >
                                File
                              </button>
                              <button
                                className={filesPopupTab === "media" ? "active" : ""}
                                onClick={() => setFilesPopupTab("media")}
                              >
                                Phương tiện
                              </button>
                              <button
                                className={filesPopupTab === "links" ? "active" : ""}
                                onClick={() => setFilesPopupTab("links")}
                              >
                                Liên kết
                              </button>
                            </div>
                            <div className="video-files-popup-content">
                              {filesPopupTab === "files" && (
                                <div className="video-files-list">
                                  <div className="video-files-empty">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                      <path d="M12 8H28L36 16V40H12V8Z" stroke="currentColor" strokeWidth="2" />
                                      <path d="M28 8V16H36" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <p>Chưa có file nào được chia sẻ</p>
                                  </div>
                                </div>
                              )}
                              {filesPopupTab === "media" && (
                                <div className="video-media-grid">
                                  <div className="video-files-empty">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                      <rect x="8" y="12" width="32" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
                                      <circle cx="18" cy="22" r="3" stroke="currentColor" strokeWidth="2" />
                                      <path d="M8 32L16 24L24 32L32 22L40 32" stroke="currentColor" strokeWidth="2" />
                                    </svg>
                                    <p>Chưa có ảnh hoặc video nào</p>
                                  </div>
                                </div>
                              )}
                              {filesPopupTab === "links" && (
                                <div className="video-links-list">
                                  <div className="video-files-empty">
                                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                      <path d="M20 28L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                      <path d="M24 32L20 36C17.79 38.21 14.21 38.21 12 36C9.79 33.79 9.79 30.21 12 28L16 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                      <path d="M24 16L28 12C30.21 9.79 33.79 9.79 36 12C38.21 14.21 38.21 17.79 36 20L32 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                    </svg>
                                    <p>Chưa có liên kết nào được chia sẻ</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      {/* Pinned Messages Popup */}
                      {showPinnedPopup && (
                        <>
                          <div
                            className="video-files-popup-backdrop"
                            onClick={() => setShowPinnedPopup(false)}
                          />
                          <div className="video-files-popup video-pinned-popup">
                            <div className="video-files-popup-header">
                              <h3>Tin nhắn đã ghim</h3>
                              <button
                                className="video-files-popup-close"
                                onClick={() => setShowPinnedPopup(false)}
                              >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                  <path
                                    d="M15 5L5 15M5 5L15 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div className="video-pinned-popup-content">
                              {chatMessages.filter(msg => msg.pinned).length > 0 ? (
                                <div className="video-pinned-list">
                                  {chatMessages.filter(msg => msg.pinned).map((msg) => (
                                    <div
                                      key={msg.id}
                                      className="video-pinned-item"
                                      onClick={() => {
                                        setShowPinnedPopup(false)
                                        const element = document.getElementById(`message-${msg.id}`)
                                        element?.scrollIntoView({ behavior: "smooth", block: "center" })
                                      }}
                                    >
                                      <div className="video-pinned-item-avatar">
                                        {msg.sender === "me" ? "B" : currentChat?.avatar}
                                      </div>
                                      <div className="video-pinned-item-content">
                                        <div className="video-pinned-item-header">
                                          <span className="video-pinned-item-name">
                                            {msg.sender === "me" ? "Bạn" : currentChat?.user}
                                          </span>
                                          <span className="video-pinned-item-time">
                                            {msg.timestamp.toLocaleTimeString("vi-VN", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </span>
                                        </div>
                                        <p className="video-pinned-item-text">{msg.text}</p>
                                      </div>
                                      <div className="video-pinned-item-icon">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                          <path
                                            d="M8 2L9.5 5.5L13 6.5L9.5 7.5L8 11L6.5 7.5L3 6.5L6.5 5.5L8 2Z"
                                            fill="currentColor"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="video-files-empty">
                                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <path
                                      d="M24 8L27 17L36 19L27 21L24 30L21 21L12 19L21 17L24 8Z"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinejoin="round"
                                    />
                                    <path d="M14 32L16 36L20 37L16 38L14 42L12 38L8 37L12 36L14 32Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                    <path d="M34 28L35.5 31L38.5 32L35.5 33L34 36L32.5 33L29.5 32L32.5 31L34 28Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                  </svg>
                                  <p>Chưa có tin nhắn nào được ghim</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <div className="video-chat-messages">
                        {messagesWithTimestamps.map((item, index) =>
                          item.type === "timestamp" ? (
                            <div key={`timestamp-${index}`} className="video-chat-timestamp">
                              {item.data}
                            </div>
                          ) : (
                            (() => {
                              const msg = item.data
                              return (
                          <div
                            id={`message-${msg.id}`}
                            key={msg.id}
                            className={`video-chat-message ${
                              msg.sender === "me" ? "sent" : "received"
                            }`}
                            onMouseEnter={() => setHoveredMessage(msg.id)}
                            onMouseLeave={() => setHoveredMessage(null)}
                          >
                            {msg.sender === "other" && (
                              <div className="video-chat-message-avatar">
                                {currentChat?.avatar}
                              </div>
                            )}
                            <div className="video-chat-message-content">
                              <div className="video-chat-message-bubble">
                                {msg.pinned && (
                                  <div className="video-message-pin-badge">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                      <path
                                        d="M6 1.5L7.5 4.5L10.5 5.5L7.5 6.5L6 9.5L4.5 6.5L1.5 5.5L4.5 4.5L6 1.5Z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                  </div>
                                )}
                                {msg.replyTo && (() => {
                                  const repliedMsg = chatMessages.find((m) => m.id === msg.replyTo)
                                  if (repliedMsg) {
                                    return (
                                      <div
                                        className="video-message-reply-quote"
                                        onClick={() => {
                                          const element = document.getElementById(
                                            `message-${repliedMsg.id}`,
                                          )
                                          element?.scrollIntoView({
                                            behavior: "smooth",
                                            block: "center",
                                          })
                                        }}
                                      >
                                        <div className="video-message-reply-quote-header">
                                          <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                          >
                                            <path
                                              d="M7 3L3 7L7 11M3 7H11"
                                              stroke="currentColor"
                                              strokeWidth="1.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                            />
                                          </svg>
                                          <span>
                                            {msg.sender === "me"
                                              ? repliedMsg.sender === "me"
                                                ? "Bạn đã trả lời chính mình"
                                                : currentChat?.user
                                              : repliedMsg.sender === "me"
                                              ? "Bạn"
                                              : `${currentChat?.user} đã trả lời chính họ`}
                                          </span>
                                        </div>
                                        <p>{repliedMsg.text}</p>
                                      </div>
                                    )
                                  }
                                  return null
                                })()}
                                <p>{msg.text}</p>
                              </div>
                              {hoveredMessage === msg.id && (
                                <div
                                  className={`video-chat-message-actions ${
                                    msg.sender === "me" ? "sent" : "received"
                                  }`}
                                >
                                  <div className="video-emoji-picker-wrapper">
                                    <button
                                      className="video-message-action-btn"
                                      onClick={(e) => {
                                        const button = e.currentTarget
                                        const rect = button.getBoundingClientRect()
                                        const chatContainer =
                                          button.closest(".video-chat-messages")
                                        const containerRect = chatContainer?.getBoundingClientRect()

                                        if (containerRect) {
                                          const spaceBelow = containerRect.bottom - rect.bottom
                                          const shouldDropup = spaceBelow < 100

                                          if (shouldDropup) {
                                            setDropupMessages((prev) => new Set(prev).add(msg.id))
                                          } else {
                                            setDropupMessages((prev) => {
                                              const newSet = new Set(prev)
                                              newSet.delete(msg.id)
                                              return newSet
                                            })
                                          }
                                        }

                                        setShowEmojiPicker(
                                          showEmojiPicker === msg.id ? null : msg.id,
                                        )
                                      }}
                                      title="Biểu cảm"
                                    >
                                      <AiOutlineSmile size={18} />
                                    </button>
                                    {showEmojiPicker === msg.id && (
                                      <>
                                        <div
                                          className="video-emoji-picker-backdrop"
                                          onClick={() => setShowEmojiPicker(null)}
                                        />
                                        <div
                                          className={`video-emoji-picker-dropdown ${
                                            dropupMessages.has(msg.id) ? "dropup" : ""
                                          }`}
                                        >
                                          {["❤️", "😂", "😮", "😢", "😠", "👍"].map((emoji) => (
                                            <button
                                              key={emoji}
                                              className="video-emoji-btn"
                                              onClick={() => {
                                                console.log("React with", emoji, "to", msg.id)
                                                setShowEmojiPicker(null)
                                              }}
                                            >
                                              {emoji}
                                            </button>
                                          ))}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                  <button
                                    className="video-message-action-btn"
                                    onClick={() => {
                                      setReplyingTo(msg)
                                      console.log("Reply to message", msg.id)
                                    }}
                                    title="Trả lời"
                                  >
                                    <BiReply size={18} />
                                  </button>
                                  <div className="video-message-menu-wrapper">
                                    <button
                                      className="video-message-action-btn"
                                      onClick={(e) => {
                                        const button = e.currentTarget
                                        const rect = button.getBoundingClientRect()
                                        const chatContainer =
                                          button.closest(".video-chat-messages")
                                        const containerRect = chatContainer?.getBoundingClientRect()

                                        if (containerRect) {
                                          const spaceBelow = containerRect.bottom - rect.bottom
                                          const shouldDropup = spaceBelow < 150

                                          if (shouldDropup) {
                                            setDropupMessages((prev) => new Set(prev).add(msg.id))
                                          } else {
                                            setDropupMessages((prev) => {
                                              const newSet = new Set(prev)
                                              newSet.delete(msg.id)
                                              return newSet
                                            })
                                          }
                                        }

                                        setShowMessageMenu(
                                          showMessageMenu === msg.id ? null : msg.id,
                                        )
                                      }}
                                      title="Thêm"
                                    >
                                      <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                      >
                                        <circle cx="3" cy="9" r="1.5" fill="currentColor" />
                                        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
                                        <circle cx="15" cy="9" r="1.5" fill="currentColor" />
                                      </svg>
                                    </button>
                                    {showMessageMenu === msg.id && (
                                      <>
                                        <div
                                          className="video-message-menu-backdrop"
                                          onClick={() => setShowMessageMenu(null)}
                                        />
                                        <div
                                          className={`video-message-menu-dropdown ${
                                            dropupMessages.has(msg.id) ? "dropup" : ""
                                          }`}
                                        >
                                          <button
                                            onClick={() => {
                                              console.log("Pin message")
                                              setShowMessageMenu(null)
                                            }}
                                          >
                                            Ghim tin nhắn
                                          </button>
                                          {msg.sender === "me" && (
                                            <>
                                              <button
                                                onClick={() => {
                                                  console.log("Edit message")
                                                  setShowMessageMenu(null)
                                                }}
                                              >
                                                Chỉnh sửa
                                              </button>
                                              <button
                                                onClick={() => {
                                                  console.log("Unsend message")
                                                  setShowMessageMenu(null)
                                                }}
                                                className="video-message-menu-danger"
                                              >
                                                Thu hồi
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                              )
                            })()
                          ),
                        )}
                      </div>

                      <div className="video-chat-input-wrapper">
                        {replyingTo && (
                          <div className="video-chat-reply-preview">
                            <div className="video-chat-reply-content">
                              <div className="video-chat-reply-header">
                                <span className="video-chat-reply-label">
                                  Đang trả lời {replyingTo.sender === "me" ? "chính mình" : currentChat?.user}
                                </span>
                              </div>
                              <p className="video-chat-reply-text">{replyingTo.text}</p>
                            </div>
                            <button
                              className="video-chat-reply-close"
                              onClick={() => setReplyingTo(null)}
                            >
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path
                                  d="M12 4L4 12M4 4L12 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                        )}
                        <div className="video-chat-input-container">
                          <button
                            type="button"
                            className="video-chat-pin-btn"
                            onClick={() => console.log("Pin attachment")}
                          >
                            <AiOutlinePaperClip size={20} />
                          </button>
                          <input
                            type="text"
                            placeholder="Nhập tin nhắn..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter" && messageInput.trim()) {
                                console.log("Send:", messageInput, "Reply to:", replyingTo?.id)
                                setMessageInput("")
                                setReplyingTo(null)
                              }
                            }}
                          />
                        <button
                          type="button"
                          className="video-chat-send-btn"
                          onClick={() => {
                            if (messageInput.trim()) {
                              console.log("Send:", messageInput)
                              setMessageInput("")
                            }
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M18 2L9 11M18 2L12 18L9 11M18 2L2 8L9 11"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="video-messages-empty-state">
                      <div className="video-messages-empty-icon-large">
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                          <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="3" />
                          <path
                            d="M40 20C30.06 20 22 28.06 22 38C22 42.29 23.45 46.23 25.85 49.37L23 58L31.63 55.15C34.77 57.55 38.71 59 43 59C52.94 59 61 50.94 61 41C61 31.06 52.94 23 43 23"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <h3>Tin nhắn của bạn</h3>
                      <p>Chọn một cuộc trò chuyện để bắt đầu</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* VIEW: Default – giống Figma: 2 block, mỗi block có scrollbar riêng */
              <>
                {/* VIDEO NỔI BẬT – có thanh scroll riêng */}
                <div className="video-section">
                  <div className="video-section-header">
                    <div>
                      <p className="video-section-label" style={{ visibility: "hidden" }}>
                        &nbsp;
                      </p>
                      <h2 className="video-section-title">Video nổi bật</h2>
                    </div>
                    <button className="video-section-badge">Xem tất cả →</button>
                  </div>

                  <div className="video-section-scroll">
                    <VideoHistoryGrid videos={featuredVideos} sectionSlug={section} />
                  </div>
                </div>

                {/* VIDEO HẰNG NGÀY – thanh scroll riêng thứ 2 */}
                <div className="video-section video-section--accent">
                  <div className="video-section-header">
                    <div>
                      <p className="video-section-label" style={{ visibility: "hidden" }}>
                        &nbsp;
                      </p>
                      <h2 className="video-section-title">Video hàng ngày</h2>
                    </div>
                    <button className="video-section-badge">Xem tất cả →</button>
                  </div>

                  <div className="video-section-scroll">
                    <VideoHistoryGrid
                      videos={dailyVideos}
                      className="video-history-grid--compact"
                      sectionSlug={section}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </Wrapper>
  )
}

export default VideoPageContent
