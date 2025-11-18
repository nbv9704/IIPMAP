"use client";

import { useEffect, ReactNode } from "react";
import { animationCreate } from "@/utils/utils";
import ScrollToTop from "@/components/common/ScrollToTop";

if (typeof window !== "undefined") {
  // load bootstrap JS 1 lần ở client
  require("bootstrap/dist/js/bootstrap");
}

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      animationCreate();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {/* nút kéo lên đầu trang */}
      <ScrollToTop />
    </>
  );
};

export default Wrapper;
