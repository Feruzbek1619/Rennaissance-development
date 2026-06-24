'use client'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { projects } from '@/data/projects'

/**
 * Interactive map of all projects across Tashkent (Leaflet + OpenStreetMap,
 * no API key). Each project is a gold pin with its name; clicking opens the
 * project page. Page scroll is not hijacked (wheel-zoom off).
 */
export default function ProjectsMap() {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const pts = projects.filter((p) => Array.isArray(p.coords))
    const map = L.map(el, { scrollWheelZoom: false, zoomControl: true })
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap &copy; CARTO',
    }).addTo(map)

    const markers: L.Marker[] = []
    pts.forEach((p) => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="proj-pin" role="link" aria-label="${p.title}"><i></i><b>${p.title}</b></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })
      const m = L.marker(p.coords as [number, number], { icon, riseOnHover: true })
        .addTo(map)
        .bindPopup(
          `<div class="proj-pop"><strong>${p.title}</strong><span>${p.location}</span></div>`,
        )
      m.on('click', () => navigate(`/projects/${p.slug}`))
      markers.push(m)
    })

    if (markers.length) {
      map.fitBounds(L.featureGroup(markers).getBounds().pad(0.25))
    } else {
      map.setView([41.31, 69.28], 11)
    }

    return () => {
      map.remove()
    }
  }, [navigate])

  return <div ref={ref} className="h-[520px] w-full rounded-[8px] overflow-hidden border border-border" />
}
