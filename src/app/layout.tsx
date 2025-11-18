"use client";

import "../styles/index.scss";
import "../i18n/config";

import { Provider } from "react-redux";
import store from "@/redux/store";

import HeaderOne from "@/layouts/headers/HeaderOne";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "@/lib/auth/AuthContext";  // 👈 QUAN TRỌNG

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="vi" suppressHydrationWarning={isDev}>
      <head>
        <meta
          name="keywords"
          content="IIPMap, khu công nghiệp, bất động sản công nghiệp"
        />
        <meta
          name="description"
          content="IIPMap - Nền tảng bản đồ số hóa khu, cụm công nghiệp và tư vấn đầu tư."
        />
        <meta property="og:site_name" content="IIPMap" />
        <meta property="og:url" content="https://iipmap.example.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="IIPMap - Industrial Investment Portal" />
        <meta name="og:image" content="/image.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta name="theme-color" content="#0D1A1C" />
        <link rel="icon" href="/image.png" sizes="any" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap"
        />
      </head>

      <body suppressHydrationWarning>
        <Provider store={store}>
          {/* BỌC TẤT CẢ BẰNG AuthProvider */}
          <AuthProvider>
            <div className="main-page-wrapper">
              <HeaderOne />
              {children}
              <ToastContainer position="top-center" autoClose={2500} />
            </div>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
