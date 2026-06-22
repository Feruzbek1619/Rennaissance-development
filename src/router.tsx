import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Quote from './pages/Quote'
import NotFound from './pages/NotFound'

// Route table grows per build stage (see Build Brief → Page Manifest).
// Stage 0 wires the shell + Home + catch-all 404; later stages add routes.
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/projects', element: <Projects /> },
      { path: '/projects/:slug', element: <ProjectDetails /> },
      { path: '/quote', element: <Quote /> },
      { path: '*', element: <NotFound /> },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
  },
})
