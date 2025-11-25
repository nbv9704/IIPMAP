import VideoPageContent from "@/components/video/VideoPageContent"

interface VideoSectionPageProps {
  params: {
    section: string
  }
}

export default function VideoSectionPage({ params }: VideoSectionPageProps) {
  return <VideoPageContent section={params.section || "kham-pha"} />
}
