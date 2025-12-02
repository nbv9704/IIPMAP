// ============================================
// MOCK CHAT DATA
// ============================================

export const generateConversations = () =>
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
  }))

export const generateChatMessages = (conversationId: number | null) => {
  if (!conversationId) return []
  
  return [
    {
      id: 1,
      sender: "other" as const,
      text: "Xin chào! Tôi muốn hỏi về khu công nghiệp Tiên Sơn",
      timestamp: new Date("2024-01-15T10:30:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 2,
      sender: "me" as const,
      text: "Chào bạn! Tôi có thể giúp gì cho bạn?",
      timestamp: new Date("2024-01-15T10:32:00"),
      pinned: true,
      replyTo: 1,
    },
    {
      id: 3,
      sender: "other" as const,
      text: "Diện tích còn lại là bao nhiêu và giá thuê như thế nào?",
      timestamp: new Date("2024-01-15T10:33:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 4,
      sender: "me" as const,
      text: "Hiện tại khu công nghiệp còn khoảng 150ha, giá thuê là 115 USD/m²",
      timestamp: new Date("2024-01-15T15:20:00"),
      pinned: false,
      replyTo: 3,
    },
    {
      id: 5,
      sender: "other" as const,
      text: "Cảm ơn bạn! Tôi sẽ xem xét và liên hệ lại sau",
      timestamp: new Date("2024-01-15T15:21:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 6,
      sender: "me" as const,
      text: "Vâng, nếu cần thêm thông tin gì bạn cứ liên hệ nhé",
      timestamp: new Date("2024-01-15T15:22:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 7,
      sender: "other" as const,
      text: "Khu công nghiệp có gần sân bay không?",
      timestamp: new Date("2024-01-15T15:25:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 8,
      sender: "me" as const,
      text: "Có, cách sân bay Nội Bài khoảng 25km",
      timestamp: new Date("2024-01-15T15:26:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 9,
      sender: "other" as const,
      text: "Còn cảng biển thì sao?",
      timestamp: new Date("2024-01-15T15:27:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 10,
      sender: "me" as const,
      text: "Cách cảng Hải Phòng khoảng 60km",
      timestamp: new Date("2024-01-15T15:28:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 11,
      sender: "other" as const,
      text: "Hạ tầng điện nước có ổn định không?",
      timestamp: new Date("2024-01-15T15:30:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 12,
      sender: "me" as const,
      text: "Rất ổn định, có trạm biến áp riêng và hệ thống xử lý nước hiện đại",
      timestamp: new Date("2024-01-15T15:31:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 13,
      sender: "other" as const,
      text: "Thời gian thuê tối thiểu là bao lâu?",
      timestamp: new Date("2024-01-15T15:35:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 14,
      sender: "me" as const,
      text: "Tối thiểu 20 năm, có thể gia hạn thêm",
      timestamp: new Date("2024-01-15T15:36:00"),
      pinned: false,
      replyTo: null,
    },
    {
      id: 15,
      sender: "other" as const,
      text: "Vậy về câu hỏi đầu tiên của tôi, bạn có thể gửi thêm tài liệu chi tiết không?",
      timestamp: new Date("2024-01-15T15:40:00"),
      pinned: false,
      replyTo: 1,
    },
  ]
}
