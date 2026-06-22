import { Link } from 'react-router-dom'

// Stage 0 placeholder. Designed Error 404/405 screens land in Stage 8.
export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="font-heading text-6xl font-semibold text-primary">404</span>
      <p className="font-body text-body-md text-secondary">Страница не найдена</p>
      <Link to="/" className="font-body text-body-sm font-medium text-accent">
        На главную
      </Link>
    </main>
  )
}
