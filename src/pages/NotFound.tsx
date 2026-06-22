import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'

export default function NotFound() {
  return (
    <main className="bg-bg-subtle min-h-[calc(100vh-150px)] flex items-center">
      <Container>
        <div className="flex flex-col items-center justify-center gap-8 py-[120px] text-center">
          <p className="font-heading text-[220px] font-bold leading-none text-primary select-none">
            404
          </p>
          <div className="flex flex-col gap-4 items-center">
            <h1 className="font-heading text-[40px] font-bold leading-[1.3] text-ink">
              Страница не найдена
            </h1>
            <p className="font-body text-[18px] leading-[1.6] text-secondary max-w-[580px]">
              Страница, которую вы ищете, была перемещена, переименована или никогда не существовала.
              Но хорошие дома — существуют. Давайте вернёмся к ним.
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-3 h-[56px] px-8 bg-primary rounded-full font-body text-[20px] font-medium text-white hover:bg-primary/90 transition-colors"
          >
            На главную
            <svg viewBox="0 0 24 24" fill="none" className="size-5">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </Container>
    </main>
  )
}
