"use client";
import React, { useEffect } from "react";
import Wrapper from "@/layouts/Wrapper";
import news_data_multilang, { getNewsItem } from "@/data-iip/NewsDataMultilang";
import NewsDetailArea from "@/components/news/NewsDetailArea";
import NewsNotFound from "@/components/news/NewsNotFound";
import { useLanguage } from "@/hooks/useLanguage";

const NewsDetailPage = ({ params }: { params: { id: string } }) => {
  const { currentLang } = useLanguage();
  const newsItem = getNewsItem(parseInt(params.id), currentLang);

  useEffect(() => {
    if (newsItem) {
      document.title = `${newsItem.title} - IIPVIETNAM.COM`;
    }
  }, [newsItem]);

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
