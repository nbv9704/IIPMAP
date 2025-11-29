/**
 * Validate userId format
 * - Phải bắt đầu bằng @
 * - Sau @ chỉ có tối đa 10 ký tự
 * - Chỉ chứa chữ cái, số, dấu gạch dưới
 */

/**
 * Kiểm tra userId có hợp lệ không
 * @param {string} userId - UserId cần kiểm tra (ví dụ: @kcn_tien_son)
 * @returns {boolean} True nếu hợp lệ
 * @example
 * isValidUserId('@kcn_tien') // true
 * isValidUserId('@kcn_tien_son_bac_ninh') // false (quá 10 ký tự)
 * isValidUserId('kcn_tien') // false (thiếu @)
 */
export const isValidUserId = (userId: string): boolean => {
  // Phải bắt đầu bằng @
  if (!userId.startsWith('@')) return false
  
  // Lấy phần sau @
  const username = userId.slice(1)
  
  // Kiểm tra độ dài (tối đa 10 ký tự)
  if (username.length === 0 || username.length > 10) return false
  
  // Chỉ chứa chữ cái, số, dấu gạch dưới
  const validPattern = /^[a-zA-Z0-9_]+$/
  return validPattern.test(username)
}

/**
 * Format tên thành userId hợp lệ
 * @param {string} name - Tên cần format
 * @returns {string} UserId đã format
 * @example
 * formatToUserId('KCN Tiên Sơn Bắc Ninh') // '@kcn_tien_s'
 * formatToUserId('VSIP Hải Phòng') // '@vsip_hai_p'
 */
export const formatToUserId = (name: string): string => {
  // Chuyển thành lowercase
  let formatted = name.toLowerCase()
  
  // Thay khoảng trắng bằng _
  formatted = formatted.replace(/\s+/g, '_')
  
  // Xóa dấu tiếng Việt
  formatted = formatted.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  
  // Chỉ giữ chữ cái, số, dấu gạch dưới
  formatted = formatted.replace(/[^a-z0-9_]/g, '')
  
  // Cắt về tối đa 10 ký tự
  formatted = formatted.slice(0, 10)
  
  // Thêm @ vào đầu
  return `@${formatted}`
}

/**
 * Lấy username từ userId (bỏ @)
 * @param {string} userId - UserId (ví dụ: @kcn_tien_son)
 * @returns {string} Username không có @
 * @example
 * getUsernameFromUserId('@kcn_tien_son') // 'kcn_tien_son'
 */
export const getUsernameFromUserId = (userId: string): string => {
  return userId.startsWith('@') ? userId.slice(1) : userId
}

/**
 * Thêm @ vào username nếu chưa có
 * @param {string} username - Username
 * @returns {string} UserId có @
 * @example
 * addAtSymbol('kcn_tien_son') // '@kcn_tien_son'
 * addAtSymbol('@kcn_tien_son') // '@kcn_tien_son'
 */
export const addAtSymbol = (username: string): string => {
  return username.startsWith('@') ? username : `@${username}`
}

/**
 * Validate và format userId
 * @param {string} userId - UserId cần validate
 * @returns {{ valid: boolean; userId: string; error?: string }}
 */
export const validateAndFormatUserId = (userId: string): {
  valid: boolean
  userId: string
  error?: string
} => {
  // Thêm @ nếu chưa có
  const formattedUserId = addAtSymbol(userId)
  
  // Validate
  if (!isValidUserId(formattedUserId)) {
    const username = getUsernameFromUserId(formattedUserId)
    
    if (username.length === 0) {
      return {
        valid: false,
        userId: formattedUserId,
        error: 'Username không được để trống'
      }
    }
    
    if (username.length > 10) {
      return {
        valid: false,
        userId: formattedUserId,
        error: 'Username không được quá 10 ký tự'
      }
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return {
        valid: false,
        userId: formattedUserId,
        error: 'Username chỉ được chứa chữ cái, số và dấu gạch dưới'
      }
    }
  }
  
  return {
    valid: true,
    userId: formattedUserId
  }
}
