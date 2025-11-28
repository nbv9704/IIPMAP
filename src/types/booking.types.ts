export interface ScheduleItem {
  id: number
  content: string
  linkType: "article" | "video" | ""
  linkUrl: string
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  note: string
}
