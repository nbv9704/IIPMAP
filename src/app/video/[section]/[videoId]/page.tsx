 "use client"

import Wrapper from "@/layouts/Wrapper"
import VideoSidebar from "@/components/video/VideoSidebar"
import VideoActions from "@/components/video/VideoActions"
import { addSavedVideo, removeSavedVideo } from "@/utils/videoStorage"
import "@/styles/video.scss"

interface VideoDetailPageProps {
  params: {
    section: string
    videoId: string
  }
}

const createVideoData = (id: number) => ({
  id,
  likes: 18000,
  comments: 18000,
  shares: 120,
  bookmarked: false,
})

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  const sectionSlug = params.section
  const id = Number(params.videoId)
  const videoData = createVideoData(id)

  const handleBookmarkChange = (next: boolean) => {
    if (next) {
      addSavedVideo({
        id,
        title: "Khu công nghiệp Tiên Sơn - Bắc Ninh",
        location: "Phường Đồng Nguyên, Bắc Ninh",
        thumbnail: "/assets/video/khucongnghiepthainguyen.mp4",
        badge: "Đã lưu",
        views: "18k",
        duration: "00:47",
      })
    } else {
      removeSavedVideo(id)
    }
  }

  const handlePrev = () => {
    // placeholder
  }

  const handleNext = () => {
    // placeholder
  }

  return (
    <Wrapper>
      <section className="video-single-page">
        <div className="video-single-layout">
          <div className="video-single-sidebar">
            <VideoSidebar activeSlug={sectionSlug} />
          </div>
          <div className="video-detail-main">
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
            <div className="video-player-actions">
              <div className="video-single-player-area">
                <video
                  className="video-single-player"
                  controls
                  poster="/assets/video/khucongnghiepthainguyen.mp4"
                >
                  <source src="/assets/video/khucongnghiepthainguyen.mp4" type="video/mp4" />
                </video>
              </div>
              <VideoActions
                video={{ ...videoData }}
                onPrev={handlePrev}
                onNext={handleNext}
                onBookmarkChange={handleBookmarkChange}
              />
            </div>
          </div>
        </div>
        <footer className="video-single-footer">
          <div className="video-footer-logo">IIPMap.AI</div>
          <div className="video-footer-columns">
            <div>
              <p className="video-footer-title">HỆ SINH THÁI IIP</p>
              <p>IIPMap.AI</p>
              <p>IIPVietnam.com</p>
              <p>CVLam.com</p>
            </div>
            <div>
              <p className="video-footer-title">ĐỊA CHỈ</p>
              <p>Lô 7, Khu nhà thấp tầng, Khu Ngoại giao đoàn, Phường Xuân Đỉnh, Quận Bắc Từ Liêm, Hà Nội</p>
            </div>
            <div>
              <p className="video-footer-title">LIÊN LẠC</p>
              <p>1900.8888.58</p>
              <p>info@iipvietnam.com</p>
            </div>
            <div>
              <p className="video-footer-title">MẠNG XÃ HỘI</p>
              <p>Facebook</p>
              <p>Youtube</p>
              <p>Linkedin</p>
            </div>
          </div>
        </footer>
      </section>
    </Wrapper>
  )
}
