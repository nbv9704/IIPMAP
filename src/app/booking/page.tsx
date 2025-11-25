"use client"
import { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import BookingArea from "@/components/booking/BookingArea";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

const BookingPage = () => {
  const { currentLang } = useLanguage();
  
  useEffect(() => {
    document.title = `${getTranslation(currentLang, 'pageTitle.booking')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
  }, [currentLang]);
  
  return (
    <Wrapper>
      <BookingArea />
    </Wrapper>
  );
};

export default BookingPage;
