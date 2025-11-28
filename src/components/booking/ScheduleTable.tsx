"use client"
import { useLanguage } from "@/hooks/useLanguage"
import { getTranslation } from "@/utils/translations"

interface ScheduleItem {
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

interface ScheduleTableProps {
  items: ScheduleItem[]
  startIndex: number
  onUpdate: (id: number, field: keyof ScheduleItem, value: string) => void
  onDelete: (id: number) => void
}

function ScheduleTable({ items, startIndex, onUpdate, onDelete }: ScheduleTableProps) {
  const { currentLang } = useLanguage()

  return (
    <div className="schedule-table">
      <div className="table-header">
        <div className="col-stt">{getTranslation(currentLang, 'booking.table.stt')}</div>
        <div className="col-content">{getTranslation(currentLang, 'booking.table.content')}</div>
        <div className="col-link">{getTranslation(currentLang, 'booking.table.link')}</div>
        <div className="col-start">{getTranslation(currentLang, 'booking.table.start')}</div>
        <div className="col-end">{getTranslation(currentLang, 'booking.table.end')}</div>
        <div className="col-note">{getTranslation(currentLang, 'booking.table.note')}</div>
      </div>

      {items.map((item, index) => (
        <div key={item.id} className="table-row">
          <div className="col-stt">{startIndex + index + 1}</div>
          
          <div className="col-content">
            <input
              type="text"
              value={item.content}
              onChange={(e) => onUpdate(item.id, "content", e.target.value)}
              placeholder={getTranslation(currentLang, 'booking.placeholders.content')}
            />
          </div>

          <div className="col-link">
            <select
              value={item.linkType}
              onChange={(e) => onUpdate(item.id, "linkType", e.target.value)}
            >
              <option value="">{getTranslation(currentLang, 'booking.linkTypes.choose')}</option>
              <option value="article">{getTranslation(currentLang, 'booking.linkTypes.article')}</option>
              <option value="video">{getTranslation(currentLang, 'booking.linkTypes.video')}</option>
            </select>
            {item.linkType && (
              <input
                type="text"
                value={item.linkUrl}
                onChange={(e) => onUpdate(item.id, "linkUrl", e.target.value)}
                placeholder={getTranslation(currentLang, 'booking.placeholders.url')}
                className="link-url-input"
              />
            )}
          </div>

          <div className="col-start">
            <input
              type="time"
              value={item.startTime}
              onChange={(e) => onUpdate(item.id, "startTime", e.target.value)}
            />
            <input
              type="date"
              value={item.startDate}
              onChange={(e) => onUpdate(item.id, "startDate", e.target.value)}
            />
          </div>

          <div className="col-end">
            <button className="time-picker-btn">
              <i className="bi bi-clock"></i>
            </button>
          </div>

          <div className="col-note">
            <button className="note-btn">
              <i className="bi bi-pencil"></i>
            </button>
            <button className="bookmark-btn">
              <i className="bi bi-bookmark"></i>
            </button>
            <button className="delete-btn" onClick={() => onDelete(item.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ScheduleTable
