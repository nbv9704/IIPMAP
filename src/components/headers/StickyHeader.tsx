// ============================================
// CLIENT COMPONENT: Sticky Header Wrapper
// ============================================
"use client"

import { ReactNode } from "react"
import UseSticky from "@/hooks/UseSticky"

interface StickyHeaderProps {
  children: ReactNode
}

export default function StickyHeader({ children }: StickyHeaderProps) {
  const { sticky } = UseSticky()

  return (
    <header className={`header-iip ${sticky ? "sticky" : ""}`}>
      {children}
    </header>
  )
}
