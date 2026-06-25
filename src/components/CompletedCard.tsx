import { Link } from 'react-router-dom'
import type { CompletedProject } from '@/data/completed'
import { SkeletonImage } from '@/components/SkeletonImage'

function ArrowUpRight({ light = false }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px]">
      <path d="M4.5 13.5L13.5 4.5M13.5 4.5H6.75M13.5 4.5V11.25" stroke={light ? 'white' : '#38485A'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Card for a completed / sold-out project. Shows a "Распродано" badge and a
 * "Подробно" button at the bottom linking to the showcase page — no sale CTAs.
 */
export function CompletedCard({ project }: { project: CompletedProject }) {
  return (
    <div data-reveal className="group flex flex-col gap-5">
      <Link to={`/completed/${project.slug}`} className="relative h-[360px] overflow-hidden rounded-[8px]">
        <SkeletonImage
          src={project.hero}
          alt={project.title}
          className="absolute inset-0"
          imgClassName="size-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
        />
        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-stone px-5 py-2">
          <span className="size-2 rounded-full bg-white/90" />
          <span className="font-vela text-[16px] font-medium text-white">Распродано</span>
        </div>
      </Link>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-[13px] font-semibold uppercase tracking-[0.16em] text-accent-dark">{project.eyebrow}</p>
          <p className="font-heading text-[40px] font-bold uppercase leading-none text-ink">{project.title}</p>
          <p className="font-body text-[15px] leading-[1.5] text-secondary">{project.location}</p>
        </div>

        <Link
          to={`/completed/${project.slug}`}
          className="mt-1 flex items-center justify-between rounded-full bg-primary px-7 py-4 text-white transition-colors hover:bg-[#2F3A45]"
        >
          <span className="font-vela text-[20px] font-medium leading-[1.6] whitespace-nowrap">Подробно</span>
          <span className="flex size-[34px] items-center justify-center rounded-full bg-white shrink-0">
            <ArrowUpRight />
          </span>
        </Link>
      </div>
    </div>
  )
}
