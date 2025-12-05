import VideoDetailPageClient from "./VideoDetailPageClient"

// ============================================
// PAGE: VideoDetailPage (server)
// ============================================
interface VideoDetailPageProps {
  params: {
    userId: string
    postId: string
  }
}

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  return <VideoDetailPageClient />
}
