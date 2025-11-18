import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderOne />
      {children}
      <FooterOne />
    </>
  );
}
