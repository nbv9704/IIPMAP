// ============================================
// IMPORTS
// ============================================
"use client"
import { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import BookingArea from "@/components/booking/BookingArea";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

// ============================================
// PAGE: BookingPage
// ============================================
const BookingPage = () => {
  // ========== Hooks ==========
  const { currentLang } = useLanguage();
  
  // ========== Effects ==========
  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.booking')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
  }, [currentLang]);
  
  // ========== Render ==========
  return (
    <Wrapper>
      <BookingArea />
    </Wrapper>
  );
};

export default BookingPage;
