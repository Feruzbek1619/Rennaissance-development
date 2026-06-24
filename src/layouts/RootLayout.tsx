import { Outlet, ScrollRestoration } from 'react-router-dom'
import TopHeader from '@/components/layout/TopHeader'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/Preloader'
import { LeadModalProvider } from '@/components/LeadModal'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

// Shell for every page: dark top header + main navigation, routed page, footer.
// LeadModalProvider wraps everything so any CTA can open the lead modal.
export default function RootLayout() {
  useSmoothScroll()
  useScrollReveal()
  return (
    <LeadModalProvider>
      <Preloader />
      <ScrollRestoration />
      <TopHeader />
      <Navigation />
      <main className="min-h-[40vh]">
        <Outlet />
      </main>
      <Footer />
    </LeadModalProvider>
  )
}
