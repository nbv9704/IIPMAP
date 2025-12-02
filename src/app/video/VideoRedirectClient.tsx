"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

// Mock data - danh s�ch video IDs c� s?n
const MOCK_VIDEOS = [
  { userId: "@kcn_tien_son", postId: "00000000000000000001" },
  { userId: "@kcn_vsip", postId: "00000000000000000002" },
  { userId: "@kcn_my_phuoc", postId: "00000000000000000003" },
  { userId: "@kcn_long_hau", postId: "00000000000000000004" },
  { userId: "@kcn_tan_binh", postId: "00000000000000000005" },
]

const VideoRedirectClient = () => {
  const router = useRouter()

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * MOCK_VIDEOS.length)
    const randomVideo = MOCK_VIDEOS[randomIndex]
    router.replace(`/video/${randomVideo.userId}/view/${randomVideo.postId}`)
  }, [router])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f5f8ff",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid #e5e7eb",
            borderTopColor: "#0051cb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <p style={{ color: "#4f5b8a", fontFamily: "Montserrat, sans-serif" }}>
          Dang t?i video...
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

export default VideoRedirectClient
