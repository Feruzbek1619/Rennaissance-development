import { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import FAQSection from '@/components/home/FAQSection'
import { projects } from '@/data/projects'

const ITEMS_PER_PAGE = 6
const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-5">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Projects() {
  const [page, setPage] = useState(1)

  const start = (page - 1) * ITEMS_PER_PAGE
  const pageProjects = projects.slice(start, start + ITEMS_PER_PAGE)

  return (
    <main>
      {/* Hero */}
      <section className="bg-primary overflow-hidden relative">
        <img
          src="/assets/projects-hero-bg.svg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
        />
        <Container className="relative">
          <div className="flex items-center justify-between gap-10 pt-[110px] pb-[90px]">
            {/* Left: heading */}
            <h1 className="font-heading text-[80px] font-bold uppercase leading-[1.3] text-bg-subtle flex-1 min-w-0">
              Наши реализованные и текущие проекты
            </h1>
            {/* Right: description + CTA */}
            <div className="flex flex-col gap-8 w-[460px] 2xl:w-[538px] shrink-0">
              <p className="font-vela text-[20px] leading-[1.6] text-white">
                Каждый объект Renaissance development — это результат полного производственного цикла: от
                собственных материалов до финальной отделки. Строим то, за что не стыдно через двадцать лет.
              </p>
              <div>
                <Button variant="accent" size="lg" to="/quote">
                  Заказать звонок
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Projects grid */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="grid grid-cols-2 gap-x-16 gap-y-[80px]">
            {pageProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </Container>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <section className="bg-white pb-[100px]">
          <Container>
            <div className="flex items-center justify-center gap-6">
              {/* Prev */}
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-2 h-[48px] px-5 bg-white border border-border rounded-full font-vela text-[16px] font-medium text-ink disabled:opacity-40 hover:bg-bg-subtle transition-colors"
              >
                <ChevronLeftIcon />
                Назад
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPage(p)}
                  className={`flex items-center justify-center w-[40px] h-[40px] rounded-full font-vela text-[16px] font-medium transition-colors ${
                    p === page
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border text-ink hover:bg-bg-subtle'
                  }`}
                >
                  {p}
                </button>
              ))}

              {/* Next */}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-2 h-[48px] px-5 bg-white border border-border rounded-full font-vela text-[16px] font-medium text-ink disabled:opacity-40 hover:bg-bg-subtle transition-colors"
              >
                Далее
                <ChevronRightIcon />
              </button>
            </div>
          </Container>
        </section>
      )}

      <NeedHelpSection />
      <FAQSection />
    </main>
  )
}
