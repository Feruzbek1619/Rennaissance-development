import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import ProjectsMap from '@/components/ProjectsMap'
import { useTranslation } from '@/i18n'

// «География проектов» — карта со всеми объектами. Один компонент, используется
// на главной и на /about.
export default function ProjectsMapSection() {
  const { t } = useTranslation()
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-[52px] max-lg:flex-col max-lg:items-start max-lg:gap-5">
          <div className="flex flex-col gap-5 min-w-0" data-reveal="left">
            <SectionTag>{t('home.map.tag')}</SectionTag>
            <h2 className="font-heading text-[61px] max-md:text-[34px] font-bold uppercase leading-none text-ink max-w-[764px]">
              {t('home.map.title')}
            </h2>
          </div>
          <p className="font-body text-[20px] leading-[1.6] text-secondary max-w-[560px] text-right self-end" data-reveal="right">
            {t('home.map.desc')}
          </p>
        </div>

        <div data-reveal="fade">
          <ProjectsMap />
        </div>
      </Container>
    </section>
  )
}
