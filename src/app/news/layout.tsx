// ============================================
// IMPORTS
// ============================================
"use client";
import { ReactNode } from "react";

// ============================================
// TYPES
// ============================================
interface NewsLayoutProps {
  children: ReactNode;
}

// ============================================
// LAYOUT: NewsLayout
// ============================================
const NewsLayout = ({ children }: NewsLayoutProps) => {
  // ========== Render ==========
  return (
    <>
      {children}
    </>
  );
};

export default NewsLayout;
