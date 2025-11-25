"use client"
import { useRef, useState } from "react"

interface VideoPlayerProps {
  video: {
    id: number;
    url: string;
    thumbnail: string;
    views: number;
  };
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="video-player-wrapper">
      {/* Close Button */}
      <button className="video-close-btn" type="button">
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <circle cx="10.5" cy="10.5" r="10" stroke="#000" strokeWidth="1" />
          <line x1="6" y1="6" x2="15" y2="15" stroke="#000" strokeWidth="1.5" />
          <line x1="15" y1="6" x2="6" y2="15" stroke="#000" strokeWidth="1.5" />
        </svg>
      </button>

      {/* Video Container */}
      <div className="video-container" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="video-element"
          poster={video.thumbnail}
          loop
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="video-play-overlay">
            <button className="play-button" type="button">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="30" fill="rgba(255,255,255,0.5)" />
                <path d="M23 18L42 30L23 42V18Z" fill="#000" />
              </svg>
            </button>
          </div>
        )}

        {/* Video Info Overlay */}
        <div className="video-info-overlay">
          <div className="video-views">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 4C4 4 1 10 1 10s3 6 9 6 9-6 9-6-3-6-9-6z"
                stroke="#EBF5FF"
                strokeWidth="1"
              />
              <circle cx="10" cy="10" r="3" stroke="#EBF5FF" strokeWidth="1" />
            </svg>
            <span>{video.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
