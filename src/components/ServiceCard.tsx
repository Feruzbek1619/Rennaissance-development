import { Button } from '@/components/Button'
import { CheckCircle } from '@/components/icons'
import { cn } from '@/lib/cn'

export type ServiceCardProps = {
  title: string
  description: string
  features: string[]
  image?: string
  imageAlt?: string
  /** "Show Details" target. */
  to?: string
  className?: string
}

/**
 * Horizontal feature row (Figma 42:885 / 45:141 …). Transparent — designed to
 * sit on a dark section: title white, body/checklist #C4C4C4. The photo is a
 * rotated overlay between the checklist and the CTA. Built at the 1720 reference.
 */
export function ServiceCard({ title, description, features, image, imageAlt = '', to, className }: ServiceCardProps) {
  return (
    <div className={cn('relative h-[271px] w-full overflow-hidden', className)}>
      <div className="absolute inset-0 flex items-center justify-between">
        <div className="flex items-center gap-[135px]">
          <div className="flex w-[364px] flex-col gap-6">
            <h3 className="font-heading text-[39px] font-medium leading-[1.4] text-white">{title}</h3>
            <p className="font-body text-[16px] leading-[1.6] text-muted">{description}</p>
          </div>

          <ul className="flex flex-col gap-4">
            {features.map((f) => (
              <li key={f} className="flex items-center gap-4">
                <CheckCircle className="size-6 shrink-0 text-muted" />
                <span className="font-heading text-[20px] font-medium leading-[1.4] text-muted">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        <Button to={to ?? '#'} variant="outline" size="md">
          Show Details
        </Button>
      </div>

      {image && (
        <div className="pointer-events-none absolute left-[52%] top-1/2 -translate-y-1/2 -rotate-6">
          <img loading="lazy" decoding="async" src={image} alt={imageAlt} className="h-[223px] w-[392px] rounded-[8px] object-cover" />
        </div>
      )}
    </div>
  )
}
