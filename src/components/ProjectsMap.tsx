'use client'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { projects } from '@/data/projects'
import { completedProjects } from '@/data/completed'

export type MapPoint = {
  coords: [number, number]
  title: string
  location?: string
  /** If set, clicking the pin navigates to /projects/<slug>. */
  slug?: string
  /** Explicit navigation target (takes precedence over slug). */
  href?: string
  /** Label direction so clustered pins fan out (default: right). */
  labelDir?: 'right' | 'left' | 'up' | 'down'
}

/* Per-project label direction — clustered pins radiate to different sides so
   their labels don't overlap. Keyed by slug. */
const LABEL_DIR: Record<string, MapPoint['labelDir']> = {
  // active
  'botanika-luxury': 'up',
  turon: 'left',
  'vatan-village': 'down',
  alandalus: 'right',
  'sharq-avenue': 'up',
  'anor-gardens': 'right',
  'challet-resort': 'right',
  // completed
  botanika: 'down',
  renaissance: 'right',
  yakkasaroy: 'left',
  poytaxt: 'left',
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

    const activePts: MapPoint[] = projects
      .filter((p) => Array.isArray(p.coords) && p.status === 'active' && !p.cardOnly)
      .map((p) => ({
        coords: p.coords as [number, number],
        title: p.title,
        location: p.location,
        href: `/projects/${p.slug}`,
        labelDir: LABEL_DIR[p.slug] ?? 'right',
      }))

    const completedPts: MapPoint[] = completedProjects
      .filter((c) => Array.isArray(c.coords))
      .map((c) => ({
        coords: c.coords as [number, number],
        title: c.title,
        location: c.location,
        href: `/completed/${c.slug}`,
        labelDir: LABEL_DIR[c.slug] ?? 'right',
      }))

    // Renaissance Apartment — on the map, no dedicated page yet.
    const extraPts: MapPoint[] = [
      { coords: [41.304194, 69.308833], title: 'RENAISSANCE APARTMENT', location: 'г. Ташкент', labelDir: 'down' },
    ]

    const pts: MapPoint[] = points ?? [...activePts, ...completedPts, ...extraPts]

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
      const dest = p.href ?? (p.slug ? `/projects/${p.slug}` : undefined)
      if (dest) {
        m.on('click', () => navigate(dest))
        m.getElement()?.style.setProperty('cursor', 'pointer')
      }
      markers.push(m)
    })

    // Fit to the Tashkent cluster — far outliers (e.g. Chalet Resort in the
    // mountains, ~50 km east) would otherwise shrink the city pins into a blob.
    // Those pins stay on the map; pan/zoom out to reach them.
    const cityMarkers = markers.filter((_, i) => pts[i].coords[1] < 69.7)
    const fitTargets = cityMarkers.length > 1 ? cityMarkers : markers
    if (fitTargets.length > 1) {
      map.fitBounds(L.featureGroup(fitTargets).getBounds().pad(0.12), { maxZoom: 13 })
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
