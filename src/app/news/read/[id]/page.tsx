// ============================================
// IMPORTS
// ============================================
"use client";
import React, { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import news_data_multilang, { getNewsItem } from "@/data/NewsDataMultilang";
import NewsDetailArea from "@/components/news/NewsDetailArea";
import NewsNotFound from "@/components/news/NewsNotFound";
import { useLanguage } from "@/hooks/useLanguage";

// ============================================
// PAGE: NewsDetailPage
// ============================================
const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  // ========== Hooks ==========
  const { currentLang } = useLanguage();
  const newsItem = getNewsItem(parseInt(params.id), currentLang);

  // ========== Effects ==========
  useEffect(() => {
    if (newsItem) {
      document.title = `${newsItem.title} - IIPVIETNAM.COM`;
    }
  }, [newsItem]);

  // ========== Render ==========
  if (!newsItem) {
    return (
      <Wrapper>
        <NewsNotFound />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <NewsDetailArea newsItem={newsItem} />
    </Wrapper>
  );
};

export default NewsDetailPage;
