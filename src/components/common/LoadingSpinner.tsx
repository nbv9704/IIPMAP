"use client"

// ============================================
// GENERAL LOADING SPINNER
// ============================================

interface LoadingSpinnerProps {
  text?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

const LoadingSpinner = ({ 
  text = "Loading...", 
  size = 'medium',
  className = '' 
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'loading-small',
    medium: 'loading-medium', 
    large: 'loading-large'
  }

  return (
    <div className={`loading-container ${sizeClasses[size]} ${className}`}>
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
