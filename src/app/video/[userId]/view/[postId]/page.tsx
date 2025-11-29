"use client"

import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoActions from "@/components/video/VideoActions"
import VideoPlayer from "@/components/video/VideoPlayer"
import VideoDetailHeader from "@/components/video/VideoDetailHeader"
import VideoDetailFooter from "@/components/video/VideoDetailFooter"
import { addSavedVideo, removeSavedVideo } from "@/utils/videoStorage"
import "@/styles/video.scss"

interface VideoDetailPageProps {
  params: {
    userId: string
    postId: string
  }
}

const createVideoData = (postId: string) => ({
  postId,
  likes: 18000,
  comments: 18000,
  shares: 120,
  bookmarked: false,
})

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  const { userId, postId } = params
  const videoData = createVideoData(postId)

  const handleBookmarkChange = (next: boolean) => {
    if (next) {
      addSavedVideo({
        id: parseInt(postId.slice(0, 10)), // Tạm thời convert 10 ký tự đầu thành number
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: "Phường Đồng Nguyên, Bắc Ninh",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Đã lưu",
        views: "18k",
        duration: "00:47",
      })
    } else {
      removeSavedVideo(parseInt(postId.slice(0, 10)))
    }
  }

  const handlePrev = () => {
    // TODO: Navigate to previous video of this user
    console.log("Previous video")
  }

  const handleNext = () => {
    // TODO: Navigate to next video of this user
    console.log("Next video")
  }

  return (
    <Wrapper>
      <section className="video-single-page">
        {/* Sidebar - giống các trang khác */}
        <div className="video-single-sidebar">
          <VideoSidebar activeSlug="explore" />
        </div>

        {/* Main content */}
        <div className="video-detail-main">
          {/* Header actions */}
          <VideoDetailHeader userId={userId} />

          {/* Video player + Actions */}
          <div className="video-player-actions">
            <VideoPlayer 
              videoUrl="/assets/video/khucongnghiepthainguyen.mp4"
              poster="/assets/video/khucongnghiepthainguyen.mp4"
              title="Khu công nghiệp Tiên Sơn - Bắc Ninh"
            />
            <VideoActions
              video={{ ...videoData }}
              onPrev={handlePrev}
              onNext={handleNext}
              onBookmarkChange={handleBookmarkChange}
            />
          </div>
        </div>

        {/* Footer */}
        <VideoDetailFooter />
      </section>
    </Wrapper>
  )
}
