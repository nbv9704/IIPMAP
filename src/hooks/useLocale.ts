"use client";

import { useEffect, useState } from "react";

export type LocaleCode = "zh" | "en" | "vi";

const STORAGE_KEY = "iip-locale";

export function useLocale(initial: LocaleCode = "vi") {
  const [locale, setLocale] = useState<LocaleCode>(initial);

  // lấy lại ngôn ngữ đã chọn từ localStorage (reload vẫn nhớ)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as LocaleCode | null;
    if (saved) {
      setLocale(saved);
    }
  }, []);

  const changeLocale = (next: LocaleCode) => {
    setLocale(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  };

  return { locale, changeLocale };
}
