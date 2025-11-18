// src/app/layout.tsx
"use client";

import "../styles/index.scss";
import "../i18n/config";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="vi" suppressHydrationWarning={isDev}>
      <head>
        {/* meta chung */}
      </head>
      <body suppressHydrationWarning>
        <Provider store={store}>
          <AuthProvider>
            <div className="main-page-wrapper">
              {children}
              <ToastContainer position="top-center" autoClose={2500} />
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
