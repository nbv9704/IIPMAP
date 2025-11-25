"use client"
import { useEffect } from "react";
import ListingOne from "@/components/inner-listing/listing-01";
import Wrapper from "@/layouts/Wrapper";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

const TinMuaBanPage = () => {
   const { currentLang } = useLanguage();
   
   useEffect(() => {
      document.title = `${getTranslation(currentLang, 'pageTitle.listings')} - ${getTranslation(currentLang, 'pageTitle.siteName')}`;
   }, [currentLang]);
   
   return (
      <Wrapper>
         <ListingOne />
      </Wrapper>
   )
}

export default TinMuaBanPage
