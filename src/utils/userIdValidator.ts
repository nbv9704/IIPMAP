// ============================================
// IMPORTS
// ============================================
import { USER_ID } from "@/constants/video/config"

// ============================================
// USER ID VALIDATOR
// ============================================
/**
 * Validate userId format
 * - Phải bắt đầu bằng @
 * - Sau @ chỉ có tối đa 10 ký tự
 * - Chỉ chứa chữ cái, số, dấu gạch dưới
 */

// ========== Validation Function ==========
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
  if (!userId.startsWith('@')) return false
  
  const username = userId.slice(1)
  
  if (username.length < USER_ID.MIN_USERNAME_LENGTH || 
      username.length > USER_ID.MAX_USERNAME_LENGTH) {
    return false
  }
  
  return USER_ID.VALID_PATTERN.test(username)
}

// ========== Format Function ==========
/**
 * Format tên thành userId hợp lệ
 * @param {string} name - Tên cần format
 * @returns {string} UserId đã format
 * @example
 * formatToUserId('KCN Tiên Sơn Bắc Ninh') // '@kcn_tien_s'
 * formatToUserId('VSIP Hải Phòng') // '@vsip_hai_p'
 */
export const formatToUserId = (name: string): string => {
  let formatted = name.toLowerCase()
  formatted = formatted.replace(/\s+/g, '_')
  formatted = formatted.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  formatted = formatted.replace(/[^a-z0-9_]/g, '')
  formatted = formatted.slice(0, USER_ID.MAX_USERNAME_LENGTH)
  
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
  const formattedUserId = addAtSymbol(userId)
  
  if (!isValidUserId(formattedUserId)) {
    const username = getUsernameFromUserId(formattedUserId)
    
    if (username.length === 0) {
      return {
        valid: false,
        userId: formattedUserId,
        error: 'Username không được để trống'
      }
    }
    
    if (username.length > USER_ID.MAX_USERNAME_LENGTH) {
      return {
        valid: false,
        userId: formattedUserId,
        error: `Username không được quá ${USER_ID.MAX_USERNAME_LENGTH} ký tự`
      }
    }
    
    if (!USER_ID.VALID_PATTERN.test(username)) {
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
