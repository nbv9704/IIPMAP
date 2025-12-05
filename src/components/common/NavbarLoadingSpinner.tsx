"use client"

import LoadingSpinner from "@/components/common/LoadingSpinner"

// ============================================
// NAVBAR LOADING SPINNER
// ============================================
const NavbarLoadingSpinner = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <LoadingSpinner 
      text={text} 
      size="small" 
      className="navbar-loading"
    />
  )
}

export default NavbarLoadingSpinner
