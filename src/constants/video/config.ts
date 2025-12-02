// ============================================
// VIDEO CONFIGURATION CONSTANTS
// ============================================

/**
 * Video preview behavior
 */
export const VIDEO_PREVIEW = {
  /** Delay before starting video preview on hover (ms) */
  DELAY_MS: 300,
  /** Duration of video preview playback (ms) */
  DURATION_MS: 3000,
} as const

/**
 * User ID validation rules
 */
export const USER_ID = {
  /** Maximum length of username (after @) */
  MAX_USERNAME_LENGTH: 10,
  /** Minimum length of username (after @) */
  MIN_USERNAME_LENGTH: 1,
  /** Valid characters pattern */
  VALID_PATTERN: /^[a-zA-Z0-9_]+$/,
} as const

/**
 * Pagination settings
 */
export const PAGINATION = {
  /** Number of notifications per page */
  NOTIFICATIONS_PER_PAGE: 10,
  /** Number of videos per page */
  VIDEOS_PER_PAGE: 12,
} as const

/**
 * Chat/Messages settings
 */
export const CHAT = {
  /** Time threshold to show new timestamp (minutes) */
  TIMESTAMP_THRESHOLD_MINUTES: 30,
  /** Auto-scroll delay after message sent (ms) */
  AUTO_SCROLL_DELAY_MS: 100,
} as const

/**
 * Search settings
 */
export const SEARCH = {
  /** Maximum number of suggestions to show */
  MAX_SUGGESTIONS: 5,
  /** Debounce delay for search input (ms) */
  DEBOUNCE_DELAY_MS: 300,
} as const
