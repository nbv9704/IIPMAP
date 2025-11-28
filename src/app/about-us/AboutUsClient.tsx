"use client"
import "@/styles/about-us.scss"
import HeroSection from "@/components/about-us/HeroSection"
import IntroSection from "@/components/about-us/IntroSection"
import MissionSection from "@/components/about-us/MissionSection"
import CustomersSection from "@/components/about-us/CustomersSection"
import PartnersSection from "@/components/about-us/PartnersSection"
import WhyChooseSection from "@/components/about-us/WhyChooseSection"
import ContactSection from "@/components/about-us/ContactSection"

const AboutUsClient = () => {

  return (
    <div className="about-us-page">
      <HeroSection />
      <IntroSection />
      <MissionSection />
      <CustomersSection />
      <PartnersSection />
      <WhyChooseSection />
      <ContactSection />
    </div>
  )
}

export default AboutUsClient;
