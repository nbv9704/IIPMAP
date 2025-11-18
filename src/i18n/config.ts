// src/i18n/config.ts
"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import viCommon from "./locales/vi/common.json";
import enCommon from "./locales/en/common.json";
import zhCommon from "./locales/zh/common.json";

const resources = {
  vi: { common: viCommon },
  en: { common: enCommon },
  zh: { common: zhCommon }
} as const;

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "vi",          // ngôn ngữ mặc định
      fallbackLng: "vi",  // khi không tìm thấy key
      ns: ["common"],
      defaultNS: "common",
      interpolation: {
        escapeValue: false // React đã tự escape
      }
    });
}

export default i18n;
