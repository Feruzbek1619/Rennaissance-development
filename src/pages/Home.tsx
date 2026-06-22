import Hero from '@/components/home/Hero'
import StatsSection from '@/components/home/StatsSection'
import WhyUsSection from '@/components/home/WhyUsSection'
import ProjectsSection from '@/components/home/ProjectsSection'
import AboutSection from '@/components/home/AboutSection'
import ProductionSection from '@/components/home/ProductionSection'
import PartnersSection from '@/components/home/PartnersSection'
import ProcessStepsSection from '@/components/home/ProcessStepsSection'
import FAQSection from '@/components/home/FAQSection'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import ContactSection from '@/components/home/ContactSection'

// Home (Figma 314:2857) — built section by section.
export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <WhyUsSection />
      <ProjectsSection />
      <AboutSection />
      <NeedHelpSection />
      <PartnersSection />
      <ProductionSection />
      <FAQSection />
      <ProcessStepsSection />
      <ContactSection />
    </>
  )
}
