import { VideoCardItemProps } from "@/components/video/VideoCardItem"

const STORAGE_KEY = "iipmap-saved-videos"

export const readSavedVideos = (): VideoCardItemProps[] => {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as VideoCardItemProps[]
  } catch {
    return []
  }
}

export const writeSavedVideos = (videos: VideoCardItemProps[]) => {
  if (typeof window === "undefined") return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
}

export const addSavedVideo = (video: VideoCardItemProps) => {
  const stored = readSavedVideos()
  const exists = stored.find((item) => item.id === video.id)
  if (exists) return stored
  const next = [...stored, video]
  writeSavedVideos(next)
  return next
}

export const removeSavedVideo = (videoId: number) => {
  const stored = readSavedVideos()
  const next = stored.filter((item) => item.id !== videoId)
  writeSavedVideos(next)
  return next
}
