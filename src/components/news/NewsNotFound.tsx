// ============================================
// IMPORTS
// ============================================
"use client";
import { useLanguage } from "@/hooks/useLanguage";
import { getTranslation } from "@/utils/translations";

// ============================================
// COMPONENT: NewsNotFound
// ============================================
const NewsNotFound = () => {
  // ========== Hooks ==========
  const { currentLang } = useLanguage();

  // ========== Render ==========
  return (
    <div style={{ padding: "100px 20px", textAlign: "center" }}>
      <h1>{getTranslation(currentLang, 'news.notFound')}</h1>
    </div>
  );
};

export default NewsNotFound;
