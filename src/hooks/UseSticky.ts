// ============================================
// IMPORTS
// ============================================
'use client'
import { useEffect, useState } from "react";

// ============================================
// TYPES
// ============================================
interface StickyState {
   sticky: boolean;
}

// ============================================
// HOOK: UseSticky
// ============================================
const UseSticky = (): StickyState => {
   // ========== State ==========
   const [sticky, setSticky] = useState(false);

   // ========== Handlers ==========
   const stickyHeader = (): void => {
      if (window.scrollY > 200) {
         setSticky(true);
      } else {
         setSticky(false);
      }
   };

   // ========== Effects ==========
   useEffect(() => {
      window.addEventListener("scroll", stickyHeader);

      return (): void => {
         window.removeEventListener("scroll", stickyHeader);
      };
   }, []);
   return {
      sticky,
   };
}

export default UseSticky
