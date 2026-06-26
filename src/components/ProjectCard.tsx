import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'
import { useLeadModalOptional } from '@/components/LeadModal'
import { SkeletonImage } from '@/components/SkeletonImage'

function AreaIcon() {
  return (
    <svg viewBox="0 0 15 12.5" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0">
      <path d="M0.5 12H14.5M13.4996 12V5C13.4996 4.86739 13.447 4.74022 13.3532 4.64645C13.2594 4.55268 13.1322 4.5 12.9996 4.5H8.49963M10.4996 9.5H11.4996M8.49963 12V1C8.49963 0.867392 8.44696 0.740215 8.35319 0.646447C8.25942 0.552678 8.13224 0.5 7.99963 0.5H1.99963C1.86703 0.5 1.73985 0.552678 1.64608 0.646447C1.55231 0.740215 1.49963 0.867392 1.49963 1V12M3.49963 9.5H5.49963M10.4996 7H11.4996M4.49963 7H6.49963M3.49963 3H5.49963" stroke="#737476" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LocationIconSmall() {
  return (
    <svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 shrink-0">
      <path d="M5.5 7.5C6.60457 7.5 7.5 6.60457 7.5 5.5C7.5 4.39543 6.60457 3.5 5.5 3.5C4.39543 3.5 3.5 4.39543 3.5 5.5C3.5 6.60457 4.39543 7.5 5.5 7.5Z" stroke="#737476" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 5.5C10.5 10 5.5 13.5 5.5 13.5C5.5 13.5 0.5 10 0.5 5.5C0.5 4.17392 1.02678 2.90215 1.96447 1.96447C2.90215 1.02678 4.17392 0.5 5.5 0.5C6.82608 0.5 8.09785 1.02678 9.03553 1.96447C9.97322 2.90215 10.5 4.17392 10.5 5.5Z" stroke="#737476" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowUpRightIcon({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-[18px]">
      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke={light ? 'white' : '#3A4754'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ProjectCard({ project }: { project: Project }) {
  const badgeClass = project.comingSoon ? 'bg-primary' : project.status === 'active' ? 'bg-[#BE9C68]' : 'bg-[#8C8275]'
  const badgeLabel = project.comingSoon ? 'Скоро в продаже' : project.status === 'active' ? 'Идут продажи' : 'Распродано'
  const modal = useLeadModalOptional()

  return (
    <div data-reveal className="group flex flex-col gap-5 flex-1 min-w-0">
      {/* Image */}
      <div className="relative h-[418px] rounded-[8px] overflow-hidden">
        <SkeletonImage
          src={project.image}
          alt={project.title}
          className="absolute inset-0"
          imgClassName="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
        <div className={`absolute top-6 left-6 ${badgeClass} flex items-center justify-center px-[35px] h-[48px] rounded-full`}>
          <span className="font-vela text-[20px] font-medium text-white whitespace-nowrap leading-[1.6]">
            {badgeLabel}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-[5px]">
          <p className="font-heading text-[14px] font-semibold leading-[1.4] text-ink">{project.category}</p>
          <p className="font-heading text-[61px] font-bold uppercase leading-none text-ink">{project.title}</p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AreaIcon />
              <span className="font-vela text-[16px] font-semibold text-secondary leading-[1.6]">Площадь</span>
            </div>
            <span className="font-vela text-[16px] font-semibold text-secondary leading-[1.6]">{project.area}</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <LocationIconSmall />
              <span className="font-vela text-[16px] font-semibold text-secondary leading-[1.6]">Локация</span>
            </div>
            <span className="font-vela text-[16px] font-semibold text-secondary leading-[1.6] text-right max-w-[505px]">{project.location}</span>
          </div>
          <div className="h-px bg-border" />
        </div>

        {project.cardOnly ? (
          <button type="button" onClick={() => modal?.openLead(project.title)} className="flex items-center justify-between bg-primary text-white rounded-full px-7 py-4 hover:bg-[#2F3A45] transition-colors">
            <span className="font-vela text-[24px] font-medium leading-[1.6] whitespace-nowrap">Оставить заявку</span>
            <span className="flex size-[37px] items-center justify-center rounded-full bg-white shrink-0 ml-2">
              <ArrowUpRightIcon light={false} />
            </span>
          </button>
        ) : project.status === 'active' ? (
          <div className="flex items-center gap-4 flex-wrap">
            <Link to={`/projects/${project.slug}`} className="flex flex-auto items-center justify-between bg-primary text-white rounded-full px-7 py-4 min-w-0 hover:bg-[#2F3A45] transition-colors">
              <span className="font-vela text-[24px] font-medium leading-[1.6] whitespace-nowrap">Выбрать квартиру</span>
              <span className="flex size-[37px] items-center justify-center rounded-full bg-white shrink-0 ml-2">
                <ArrowUpRightIcon light={false} />
              </span>
            </Link>
            <button type="button" onClick={() => modal?.openLead()} className="flex flex-auto items-center justify-between border border-primary text-primary rounded-full px-7 py-4 min-w-0">
              <span className="font-vela text-[24px] font-medium leading-[1.6] whitespace-nowrap">Заказать звонок</span>
              <span className="flex size-[37px] items-center justify-center rounded-full bg-primary shrink-0 ml-2">
                <ArrowUpRightIcon light={true} />
              </span>
            </button>
          </div>
        ) : (
          <Link to={project.href ?? `/projects/${project.slug}`} className="flex items-center justify-between bg-primary text-white rounded-full px-7 py-4 hover:bg-[#2F3A45] transition-colors">
            <span className="font-vela text-[24px] font-medium leading-[1.6] whitespace-nowrap">Подробно</span>
            <span className="flex size-[37px] items-center justify-center rounded-full bg-white shrink-0 ml-2">
              <ArrowUpRightIcon light={false} />
            </span>
          </Link>
        )}
      </div>
    </div>
  )
}
