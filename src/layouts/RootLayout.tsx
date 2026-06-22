import { Outlet, ScrollRestoration } from 'react-router-dom'
import TopHeader from '@/components/layout/TopHeader'
import Navigation from '@/components/layout/Navigation'

// Shell for every page: dark top header + main navigation, then the routed page.
// Footer lands here once its Figma node is located.
export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <TopHeader />
      <Navigation />
      <Outlet />
    </>
  )
}
