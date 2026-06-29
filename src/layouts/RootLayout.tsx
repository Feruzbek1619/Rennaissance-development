import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import TopHeader from '@/components/layout/TopHeader'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/Preloader'
import { LeadModalProvider } from '@/components/LeadModal'
import RouteSeo from '@/components/Seo'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

// Shell for every page: dark top header + main navigation, routed page, footer.
// LeadModalProvider wraps everything so any CTA can open the lead modal.
export default function RootLayout() {
  const { pathname } = useLocation()
  const reduceMotion = useReducedMotion()
  useSmoothScroll()
  useScrollReveal()
  return (
    <LeadModalProvider>
      <RouteSeo />
      <Preloader />
      <ScrollRestoration />
      <TopHeader />
      <Navigation />
      {/* Page transition: opacity-only fade on route change. No transform on the
          wrapper — a transform here would create a containing block and break
          position:sticky/fixed inside pages. Per-element y/x motion is handled by
          useScrollReveal. Disabled under prefers-reduced-motion. */}
      <motion.main
        key={pathname}
        className="min-h-[40vh]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
    </LeadModalProvider>
  )
}
