"use client"

// ============================================
// VIDEO LOADING SPINNER
// ============================================
const VideoLoadingSpinner = () => {
  return (
    <div className="video-loading-container">
      <div className="video-loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      <p className="video-loading-text">Loading...</p>
    </div>
  )
}

export default VideoLoadingSpinner
