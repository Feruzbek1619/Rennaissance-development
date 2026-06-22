import { Outlet, ScrollRestoration } from 'react-router-dom'

// Shell for every page. Navigation (Top header + Nav) and Footer land here in
// Stage 1; for now it only renders the routed page.
export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
