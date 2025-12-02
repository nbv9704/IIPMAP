export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('vi-VN')
}

export const formatDateTime = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleString('vi-VN')
}

export const formatTime = (time: string): string => {
  return time
}
