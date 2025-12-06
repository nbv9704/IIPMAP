"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/common/LoadingSpinner"

const ZonesRedirectClient = () => {
  const router = useRouter()

  useEffect(() => {
    // Redirect to homepage zones section
    router.replace("/#zones")
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
      <LoadingSpinner text="Loading zones..." size="medium" />
    </div>
  )
}

export default ZonesRedirectClient
