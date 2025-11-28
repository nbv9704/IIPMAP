import { useState, useRef } from "react"

export const useVideoPageState = () => {
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

  return {
    exploreQuery,
    setExploreQuery,
    exploreOpen,
    setExploreOpen,
    exploreSearchRef,
    notificationFilter,
    setNotificationFilter,
    notificationPage,
    setNotificationPage,
    selectedConversation,
    setSelectedConversation,
    messageInput,
    setMessageInput,
    showMessagesMenu,
    setShowMessagesMenu,
    showChatMenu,
    setShowChatMenu,
    hoveredMessage,
    setHoveredMessage,
    showMessageMenu,
    setShowMessageMenu,
    dropupMessages,
    setDropupMessages,
    showEmojiPicker,
    setShowEmojiPicker,
    replyingTo,
    setReplyingTo,
    showFilesPopup,
    setShowFilesPopup,
    filesPopupTab,
    setFilesPopupTab,
    showPinnedPopup,
    setShowPinnedPopup,
  }
}
