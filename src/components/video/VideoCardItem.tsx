"use client"

// ============================================
// IMPORTS
// ============================================
import React, { useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { VIDEO_PREVIEW, USER_ID } from "@/constants/video/config"

// ============================================
// TYPES
// ============================================
export interface VideoCardItemProps {
   id: number
   title: string
   location: string
   thumbnail: string
   badge: string
   views: string
   duration: string
   author?: string
   authorAvatar?: string
   className?: string
}

// ============================================
// COMPONENT
// ============================================
const VideoCardItem = ({
   id,
   location,
   thumbnail,
   badge,
   views,
   duration,
   author = "Khu công nghiệp Tiên Sơn - Bắc Ninh",
   authorAvatar,
   className = "",
}: VideoCardItemProps) => {
   const videoRef = useRef<HTMLVideoElement>(null)
   const timeoutRef = useRef<NodeJS.Timeout | null>(null)
   const [isPlaying, setIsPlaying] = useState(false)

   const handleMouseEnter = () => {
      if (videoRef.current) {
         timeoutRef.current = setTimeout(() => {
            videoRef.current?.play()
            setIsPlaying(true)
            
            setTimeout(() => {
               if (videoRef.current) {
                  videoRef.current.pause()
                  videoRef.current.currentTime = 0
                  setIsPlaying(false)
               }
            }, VIDEO_PREVIEW.DURATION_MS)
         }, VIDEO_PREVIEW.DELAY_MS)
      }
   }

   const handleMouseLeave = () => {
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)
      }
      
      if (videoRef.current) {
         videoRef.current.pause()
         videoRef.current.currentTime = 0
         setIsPlaying(false)
      }
   }

   // TODO: Thay id bằng postId thực tế từ backend
   const mockPostId = id.toString().padStart(20, '0')
   const mockUserId = author 
     ? `@${author.toLowerCase().replace(/\s+/g, '_').slice(0, USER_ID.MAX_USERNAME_LENGTH)}` 
     : '@user'
   
   return (
      <Link 
         href={`/video/${mockUserId}/view/${mockPostId}`} 
         className={`video-card ${className}`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
      >
         <div className="video-card-media">
            <div className={`video-card-badge video-card-badge--${badge.toLowerCase().replace(/\s+/g, '-')}`}>{badge}</div>
            <div className="video-card-duration">{duration}</div>
            <video 
               ref={videoRef}
               className="video-card-element" 
               poster={thumbnail}
               muted
               playsInline
            >
               <source src={thumbnail} type="video/mp4" />
               Your browser does not support the video tag.
            </video>
         <button 
            className="video-card-play" 
            type="button"
            style={{ opacity: isPlaying ? 0 : 1 }}
         >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
               <path d="M8 5L19 12L8 19V5Z" fill="#000" />
            </svg>
         </button>
         <div className="video-card-stats">
            <span className="video-card-views">
               <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
                  <path
                     d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z"
                     stroke="#fff"
                     strokeWidth="1"
                  />
                  <circle cx="9" cy="6" r="2" stroke="#fff" strokeWidth="1" />
               </svg>
               <span>{views}</span>
            </span>
            <span className="video-card-location">{location}</span>
         </div>
      </div>
      <div className="video-card-info">
         <div className="video-card-author">
            <div className="video-card-author-avatar">
               {authorAvatar ? (
                  <Image 
                     src={authorAvatar} 
                     alt={author}
                     width={32}
                     height={32}
                     style={{ objectFit: 'cover' }}
                  />
               ) : (
                  <span>{author.charAt(0).toUpperCase()}</span>
               )}
            </div>
            <p className="video-card-author-name">{author}</p>
         </div>
      </div>
      </Link>
   )
}

export default VideoCardItem
