'use client'
import { useState } from 'react'
import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { useTranslation } from '@/i18n'

const FILTERS = [
  { key: 'residential', labelKey: 'home.projects.filterResidential' },
  { key: 'business', labelKey: 'home.projects.filterBusiness' },
] as const

const kindOf = (p: (typeof projects)[number]) => p.kind ?? 'residential'

// «Наши проекты» (Figma 7778:4485) — with category filter (жилые / бизнес-центры)
export default function ProjectsSection() {
  const { t } = useTranslation()
  const [tab, setTab] = useState<'residential' | 'business'>('residential')

  const list = projects.filter((p) => p.status === 'active' && kindOf(p) === tab).slice(0, 4)

  return (
    <section className="bg-white py-[128px] max-md:!py-[56px]">
      <Container>
        <div className="flex flex-col gap-12 items-center">

          {/* Header */}
          <div data-reveal="left" className="flex items-center justify-between w-full max-lg:!flex-col max-lg:items-start max-lg:gap-6">
            <div className="flex flex-col gap-5 w-[764px] max-lg:!w-full">
              <div className="flex w-fit items-center gap-3 self-start">
                <span className="rule-gold shrink-0" aria-hidden></span>
                <span className="font-body text-[14px] font-semibold uppercase tracking-[0.2em] text-accent-dark leading-none">{t('home.projects.tag')}</span>
              </div>
              <h2 data-reveal="clip" className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-[1.3] text-ink">
                {t('home.projects.title')}
              </h2>
            </div>
            <div className="flex flex-col gap-6 items-end w-[698px] max-lg:!w-full max-lg:items-start">
              <p className="font-body text-[20px] leading-[1.6] text-ink text-right">
                {t('home.projects.desc')}
              </p>
              {/* Category filter — in place of the old CTA buttons */}
              <div className="flex gap-3 items-center">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setTab(f.key)}
                    className={`h-[56px] px-8 rounded-full font-vela text-[18px] font-medium transition-colors ${
                      tab === f.key
                        ? 'bg-primary text-white'
                        : 'bg-white border border-border text-ink hover:border-accent hover:text-accent-dark'
                    }`}
                  >
                    {t(f.labelKey)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Project grid */}
          <div className="grid grid-cols-2 max-md:!grid-cols-1 gap-x-16 max-lg:gap-x-8 gap-y-[80px] max-lg:gap-y-12 w-full">
            {list.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {/* Bottom CTA */}
          <Button to="/projects" variant="primary" size="lg">
            {t('catalog.all')}
          </Button>

        </div>
      </Container>
    </section>
  )
}
