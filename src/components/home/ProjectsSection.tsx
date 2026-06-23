import { Container } from '@/components/Container'
import { Button } from '@/components/Button'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'

const homeProjects = projects.filter((p) => p.status === 'active').slice(0, 4)

// «Наши проекты» (Figma 7778:4485)
export default function ProjectsSection() {
  const rows = [homeProjects.slice(0, 2), homeProjects.slice(2, 4)]

  return (
    <section className="bg-white py-[128px]">
      <Container>
        <div className="flex flex-col gap-16 items-center">

          {/* Header */}
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-5 w-[764px]">
              <div className="border border-border px-[24px] py-[16px] self-start">
                <span className="font-body text-body-sm text-ink">ПРОЕКТЫ</span>
              </div>
              <h2 className="font-heading text-[61px] font-bold uppercase leading-[1.3] text-ink">
                Наши проекты
              </h2>
            </div>
            <div className="flex flex-col gap-6 items-end w-[698px]">
              <p className="font-body text-[20px] leading-[1.6] text-ink text-right">
                5 объектов в продаже - от квартир в рассрочку до загородных вилл
              </p>
              <div className="flex gap-6 items-center">
                <Button to="/projects" variant="primary" size="lg">
                  Все проекты
                </Button>
                <Button to="/quote" variant="outlineLight" size="lg">
                  Заказать звонок
                </Button>
              </div>
            </div>
          </div>

          {/* Project grid */}
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-16 w-full">
              {row.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ))}

          {/* Bottom CTA */}
          <Button to="/projects" variant="primary" size="lg">
            Все проекты
          </Button>

        </div>
      </Container>
    </section>
  )
}
