import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import FeaturedWorks from '@/components/FeaturedWorks'
import CTASection from '@/components/CTASection'

export default function Home() {
  return (
    <div className="page-transition">
      <HeroSection />
      <AboutSection />
      <FeaturedWorks />
      <CTASection />
    </div>
  )
}
