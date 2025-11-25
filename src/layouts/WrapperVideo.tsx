"use client"
import { ReactNode } from "react";
import HeaderIIP from "@/layouts-iip/headers/HeaderIIP";
import FooterIIP from "@/layouts-iip/footers/FooterIIP";

const WrapperVideo = ({ children }: { children: ReactNode }) => {
   return (
      <div className="main-page-wrapper-video">
         <HeaderIIP />
         <main className="video-main-wrapper">
            {children}
         </main>
         <FooterIIP />
      </div>
   );
};

export default WrapperVideo;
