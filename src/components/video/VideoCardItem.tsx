"use client"
import React from "react"
import Link from "next/link"

export interface VideoCardItemProps {
   id: number
   title: string
   location: string
   thumbnail: string
   badge: string
   views: string
   duration: string
   className?: string
   sectionSlug?: string
}

const VideoCardItem = ({
   id,
   title,
   location,
   thumbnail,
   badge,
   views,
   duration,
   className = "",
   sectionSlug = "kham-pha",
}: VideoCardItemProps) => (
   <Link href={`/video/${sectionSlug}/${id}`} className={`video-card ${className}`}>
      <div className="video-card-media">
         <div className="video-card-badge">{badge}</div>
         <div className="video-card-duration">{duration}</div>
         <video className="video-card-element" poster={thumbnail}>
            <source src={thumbnail} type="video/mp4" />
            Your browser does not support the video tag.
         </video>
         <button className="video-card-play" type="button">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
               <circle cx="24" cy="24" r="24" fill="rgba(255, 255, 255, 0.5)" />
               <path d="M19 15L33 24L19 33V15Z" fill="#000" />
            </svg>
         </button>
         <div className="video-card-stats">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
               <path
                  d="M1 6C1 6 4 1 9 1C14 1 17 6 17 6C17 6 14 11 9 11C4 11 1 6 1 6Z"
                  stroke="#fff"
                  strokeWidth="1"
               />
               <circle cx="9" cy="6" r="2" stroke="#fff" strokeWidth="1" />
            </svg>
            <span>{views}</span>
         </div>
      </div>
      <div className="video-card-info">
         <div className="video-card-avatar">
            <span>{id}</span>
         </div>
         <div className="video-card-text">
            <p>{title}</p>
            <span>{location}</span>
         </div>
      </div>
   </Link>
)

export default VideoCardItem
