'use client'
import { useState } from 'react'
import { cn } from '@/lib/cn'

type Props = {
  src: string
  alt?: string
  /** Wrapper classes — set the size here (h-…, w-…, aspect-…, rounded-…). */
  className?: string
  /** Classes for the <img> itself (default: fills + object-cover). */
  imgClassName?: string
  eager?: boolean
}

/**
 * Image with a shimmering skeleton placeholder until it finishes loading.
 * The wrapper carries the box size; the image fades in on load.
 */
export function SkeletonImage({ src, alt = '', className, imgClassName, eager = false }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={cn('skel', loaded && 'skel--done', className)}>
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          'transition-opacity duration-700 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName ?? 'size-full object-cover',
        )}
      />
    </div>
  )
}
