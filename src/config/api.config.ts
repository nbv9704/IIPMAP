// ============================================
// API CONFIGURATION
// ============================================

/**
 * API Feature Flags
 * Set to false to disable API calls during development
 * and use only mock data for faster compilation
 */
export const API_CONFIG = {
  // Enable/disable API calls globally
  ENABLE_API_CALLS: false, // ← Set to true when backend is ready
  
  // Module-specific flags (can override global setting)
  MODULES: {
    INDUSTRIAL_AREA: false,
    VIDEO: false,
    NEWS: false,
  },
  
  // Development settings
  DEV: {
    LOG_API_CALLS: true, // Log when API would be called
    SIMULATE_DELAY: false, // Simulate API delay with mock data
    DELAY_MS: 500,
  },
};

/**
 * Check if API calls should be enabled for a module
 */
export const shouldUseAPI = (module: keyof typeof API_CONFIG.MODULES): boolean => {
  if (!API_CONFIG.ENABLE_API_CALLS) return false;
  return API_CONFIG.MODULES[module] ?? false;
};

/**
 * Log API call attempt (for debugging)
 */
export const logAPICall = (module: string, endpoint: string, useAPI: boolean) => {
  if (API_CONFIG.DEV.LOG_API_CALLS) {
    console.log(
      `🔌 [${module}] ${endpoint}:`,
      useAPI ? "🌐 API Call" : "📦 Mock Data (API disabled)"
    );
  }
};
