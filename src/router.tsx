import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Quote from './pages/Quote'
import About from './pages/About'
import FAQ from './pages/FAQ'
import B2B from './pages/B2B'
import Services from './pages/Services'
import ServiceDetails from './pages/ServiceDetails'
import Process from './pages/Process'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <Projects /> },
      { path: '/projects/:slug', element: <ProjectDetails /> },
      { path: '/quote', element: <Quote /> },
      { path: '/about', element: <About /> },
      { path: '/faq', element: <FAQ /> },
      { path: '/b2b', element: <B2B /> },
      { path: '/services', element: <Services /> },
      { path: '/services/:slug', element: <ServiceDetails /> },
      { path: '/process', element: <Process /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:slug', element: <BlogDetails /> },
      { path: '/privacy', element: <Privacy /> },
      { path: '/terms', element: <Terms /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
})
