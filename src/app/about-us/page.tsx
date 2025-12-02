// ============================================
// IMPORTS
// ============================================
import Wrapper from "@/layouts/Wrapper";
import AboutUsClient from "./AboutUsClient";

// ============================================
// METADATA
// ============================================
export const metadata = {
  title: "Về chúng tôi - IIPMap.AI",
  description: "Xúc tiến đầu tư bất động sản công nghiệp công nghệ 4.0",
};

// ============================================
// PAGE: AboutUsPage
// ============================================
const AboutUsPage = () => {
  // ========== Render ==========
  return (
    <Wrapper>
      <AboutUsClient />
    </Wrapper>
  );
};

export default AboutUsPage;
