import { Outlet, ScrollRestoration } from 'react-router-dom'
import TopHeader from '@/components/layout/TopHeader'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// Shell for every page: dark top header + main navigation, routed page, footer.
export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <TopHeader />
      <Navigation />
      <main className="min-h-[40vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
