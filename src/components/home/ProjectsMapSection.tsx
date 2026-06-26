import { Container } from '@/components/Container'
import { SectionTag } from '@/components/SectionTag'
import ProjectsMap from '@/components/ProjectsMap'

// «География проектов» — карта со всеми объектами. Один компонент, используется
// на главной и на /about.
export default function ProjectsMapSection() {
  return (
    <section className="bg-white py-[100px]">
      <Container>
        <div className="flex items-end justify-between gap-8 mb-[52px]">
          <div className="flex flex-col gap-5 min-w-0" data-reveal="left">
            <SectionTag>География проектов</SectionTag>
            <h2 className="font-heading text-[61px] font-bold uppercase leading-none text-ink max-w-[764px]">
              Наши объекты на карте
            </h2>
          </div>
          <p className="font-body text-[20px] leading-[1.6] text-secondary max-w-[560px] text-right self-end" data-reveal="right">
            Все проекты Renaissance Development — на карте Ташкента и области.
            Нажмите на метку, чтобы перейти к объекту.
          </p>
        </div>

        <div data-reveal="fade">
          <ProjectsMap />
        </div>
      </Container>
    </section>
  )
}
