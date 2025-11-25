"use client";
import { ReactNode } from "react";

interface NewsLayoutProps {
  children: ReactNode;
}

const NewsLayout = ({ children }: NewsLayoutProps) => {
  return (
    <>
      {children}
    </>
  );
};

export default NewsLayout;
