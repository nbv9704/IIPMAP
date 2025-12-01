// ============================================
// IMPORTS
// ============================================
"use client"
import UseSticky from "@/hooks/UseSticky";
import { useState, useEffect } from "react";

// ============================================
// COMPONENT: ScrollToTop
// ============================================
const ScrollToTop = () => {
   // ========== Hooks ==========
   const { sticky }: { sticky: boolean } = UseSticky();

   // ========== State Management ==========
   const [showScroll, setShowScroll] = useState(false);

   // ========== Handlers ==========
   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   // ========== Effects ==========
   useEffect(() => {
      const checkScrollTop = () => {
         if (!showScroll && window.pageYOffset > 400) {
            setShowScroll(true);
         } else if (showScroll && window.pageYOffset <= 400) {
            setShowScroll(false);
         }
      };

      window.addEventListener("scroll", checkScrollTop);
      return () => window.removeEventListener("scroll", checkScrollTop);
   }, [showScroll]);

   // ========== Render ==========
   return (
      <>
         <div onClick={scrollTop} className={`scroll-top ${sticky ? "active" : ""}`}>
            <i className="bi bi-arrow-up-short"></i>
         </div>
      </>
   )
}

export default ScrollToTop
