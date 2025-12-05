"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

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
          Loading videos...
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
