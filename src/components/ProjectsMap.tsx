'use client'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { projects } from '@/data/projects'

export type MapPoint = {
  coords: [number, number]
  title: string
  location?: string
  /** If set, clicking the pin navigates to /projects/<slug>. */
  slug?: string
  /** Label direction so clustered pins fan out (default: right). */
  labelDir?: 'right' | 'left' | 'up' | 'down'
}

/* Per-project label direction — the four central projects sit on a diagonal,
   so their labels radiate to different sides to avoid overlapping. */
const LABEL_DIR: Record<string, MapPoint['labelDir']> = {
  'botanika-luxury': 'up',
  turon: 'left',
  'vatan-village': 'right',
  alandalus: 'down',
  'challet-resort': 'right',
  'western-housing': 'right',
}

type Props = {
  /** Markers to render. Defaults to every project that has coords. */
  points?: MapPoint[]
  /** Zoom used when there is a single marker (default 15). */
  zoom?: number
  /** Wrapper className (height / rounding / border). */
  className?: string
}

/**
 * Interactive Leaflet map (OpenStreetMap/CARTO tiles, no API key). By default
 * it plots every project across Tashkent; pass `points` to show a custom set
 * (e.g. a single office marker). Each pin is a gold label; project pins link to
 * their page. Page scroll is not hijacked (wheel-zoom off).
 */
export default function ProjectsMap({ points, zoom = 15, className }: Props = {}) {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const pts: MapPoint[] =
      points ??
      projects
        .filter((p) => Array.isArray(p.coords))
        .map((p) => ({
          coords: p.coords as [number, number],
          title: p.title,
          location: p.location,
          slug: p.slug,
          labelDir: LABEL_DIR[p.slug] ?? 'right',
        }))

    const map = L.map(el, { scrollWheelZoom: false, zoomControl: false })
    L.control.zoom({ position: 'topright' }).addTo(map)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)

    const markers: L.Marker[] = []
    pts.forEach((p) => {
      const dirClass = p.labelDir && p.labelDir !== 'right' ? ` proj-pin--${p.labelDir}` : ''
      const icon = L.divIcon({
        className: '',
        html: `<div class="proj-pin${dirClass}" role="link" aria-label="${p.title}"><i></i><b>${p.title}</b></div>`,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      })
      const m = L.marker(p.coords, { icon, riseOnHover: true }).addTo(map)
      if (p.location) {
        m.bindPopup(`<div class="proj-pop"><strong>${p.title}</strong><span>${p.location}</span></div>`)
      }
      if (p.slug) m.on('click', () => navigate(`/projects/${p.slug}`))
      markers.push(m)
    })

    if (markers.length > 1) {
      map.fitBounds(L.featureGroup(markers).getBounds().pad(0.08), { maxZoom: 14 })
    } else if (markers.length === 1) {
      map.setView(pts[0].coords, zoom)
    } else {
      map.setView([41.31, 69.28], 11)
    }

    return () => {
      map.remove()
    }
  }, [navigate, points, zoom])

  return (
    <div
      ref={ref}
      className={className ?? 'h-[600px] w-full rounded-[8px] overflow-hidden border border-border'}
    />
  )
}
