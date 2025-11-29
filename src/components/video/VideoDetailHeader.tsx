"use client"

interface VideoDetailHeaderProps {
  userId: string
}

function VideoDetailHeader({ userId }: VideoDetailHeaderProps) {
  return (
    <div className="video-detail-actions-header">
      <button type="button" className="video-utility-pill primary">
        Email
      </button>
      <button type="button" className="video-utility-pill">
        Đặt lịch khảo sát
      </button>
      <button type="button" className="video-utility-pill outlined">
        Chat
      </button>
      <button type="button" className="video-utility-pill outlined">
        Call
      </button>
    </div>
  )
}

export default VideoDetailHeader
