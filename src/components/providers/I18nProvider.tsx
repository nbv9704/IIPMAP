"use client";

import "@/i18n/config"; // chỉ cần import để chạy init
import { ReactNode } from "react";

export default function I18nProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
