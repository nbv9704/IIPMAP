import VideoPageContent from "@/components/video/VideoPageContent"

interface UserProfilePageProps {
  params: {
    userId: string
  }
}

export default function UserProfilePage({ params }: UserProfilePageProps) {
  // userId có dạng @kcn_tien_son
  return <VideoPageContent section="profile" userId={params.userId} />
}
