"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import VideoLoadingSpinner from "@/components/video/VideoLoadingSpinner"

const VideoRedirectClient = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace("/video/explore")
  }, [router])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f8ff",
      }}
    >
      <VideoLoadingSpinner />
    </div>
  )
}

export default VideoRedirectClient
