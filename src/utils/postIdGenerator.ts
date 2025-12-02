/**
 * Generate một postId ngẫu nhiên 20 ký tự số
 * @returns {string} Chuỗi 20 ký tự số
 * @example generatePostId() // "12345678901234567890"
 */
export const generatePostId = (): string => {
  let postId = ''
  for (let i = 0; i < 20; i++) {
    postId += Math.floor(Math.random() * 10).toString()
  }
  return postId
}

/**
 * Kiểm tra postId có hợp lệ không (đúng 20 ký tự số)
 * @param {string} postId - PostId cần kiểm tra
 * @returns {boolean} True nếu hợp lệ
 */
export const isValidPostId = (postId: string): boolean => {
  return /^\d{20}$/.test(postId)
}

/**
 * Generate postId unique (trong thực tế sẽ check với database)
 * @param {Set<string>} existingIds - Set các postId đã tồn tại
 * @returns {string} PostId unique
 */
export const generateUniquePostId = (existingIds: Set<string> = new Set()): string => {
  let postId = generatePostId()
  let attempts = 0
  const maxAttempts = 100
  
  // Retry nếu postId đã tồn tại
  while (existingIds.has(postId) && attempts < maxAttempts) {
    postId = generatePostId()
    attempts++
  }
  
  if (attempts >= maxAttempts) {
    throw new Error('Không thể generate postId unique sau 100 lần thử')
  }
  
  return postId
}

/**
 * Format postId để hiển thị (ví dụ: 12345...67890)
 * @param {string} postId - PostId cần format
 * @returns {string} PostId đã format
 */
export const formatPostId = (postId: string): string => {
  if (!isValidPostId(postId)) return postId
  return `${postId.slice(0, 5)}...${postId.slice(-5)}`
}
