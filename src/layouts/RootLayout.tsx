import { Outlet, ScrollRestoration } from 'react-router-dom'
import TopHeader from '@/components/layout/TopHeader'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import { LeadModalProvider } from '@/components/LeadModal'

// Shell for every page: dark top header + main navigation, routed page, footer.
// LeadModalProvider wraps everything so any CTA can open the lead modal.
export default function RootLayout() {
  return (
    <LeadModalProvider>
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
