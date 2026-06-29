'use client'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from '@/i18n'
import { projects } from '@/data/projects'
import { completedProjects } from '@/data/completed'
import { services } from '@/data/services'
import { posts } from '@/data/blog'
import { localizeProject } from '@/i18n/projectsI18n'
import { localizeCompleted } from '@/i18n/completedI18n'
import { localizeService } from '@/i18n/servicesI18n'
import { localizePost } from '@/i18n/blogI18n'

// Production origin (update when a custom domain is connected).
export const SITE_URL = 'https://rnd-vatan.vercel.app'
const DEFAULT_OG = '/assets/project-vatan.webp'

type Lang = 'ru' | 'uz' | 'en'
type Meta = { title: string; desc: string; image?: string; type?: string; noindex?: boolean }

const abs = (p?: string) => (!p ? SITE_URL : p.startsWith('http') ? p : SITE_URL + p)
const clip = (s: string, n = 160) => {
  const t = (s || '').replace(/\s+/g, ' ').trim()
  return t.length <= n ? t : t.slice(0, n - 1).replace(/[\s,.;:—-]+\S*$/, '') + '…'
}

/** Canonical: collapse duplicate routes onto their primary URL. */
function canonicalPath(pathname: string): string {
  if (pathname === '/quote') return '/contacts'
  if (pathname === '/production') return '/b2b'
  return pathname.replace(/\/$/, '') || '/'
}

function setName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('name', name); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setProp(prop: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${prop}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
  el.setAttribute('content', content)
}
function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) { el = document.createElement('link'); el.setAttribute('rel', rel); document.head.appendChild(el) }
  el.setAttribute('href', href)
}
function setJsonLd(id: string, data: unknown | null) {
  const sel = `script[data-seo="${id}"]`
  let el = document.head.querySelector<HTMLScriptElement>(sel)
  if (!data) { el?.remove(); return }
  if (!el) { el = document.createElement('script'); el.type = 'application/ld+json'; el.setAttribute('data-seo', id); document.head.appendChild(el) }
  el.textContent = JSON.stringify(data)
}

export default function RouteSeo() {
  const { pathname } = useLocation()
  const { lang, t, tx } = useTranslation()

  useEffect(() => {
    const L = lang as Lang
    const canon = canonicalPath(pathname)
    const suffix = t('seo.suffix')
    const pagesMap = tx<Record<string, { title: string; desc: string }>>('seo.pages') || {}
    const withBrand = (title: string) => (title.includes('Renaissance') ? title : title + suffix)

    let meta: Meta
    let jsonld: unknown[] = []

    const projectAddress = (loc: string) => ({
      '@type': 'PostalAddress',
      addressLocality: 'Tashkent',
      addressCountry: 'UZ',
      streetAddress: loc,
    })

    const m = pathname.match(/^\/(projects|completed|services|blog)\/(.+?)\/?$/)
    if (pagesMap[canon]) {
      const p = pagesMap[canon]
      meta = { title: withBrand(p.title), desc: p.desc }
    } else if (m && m[1] === 'projects') {
      const raw = projects.find((x) => x.slug === m[2])
      if (raw) {
        const p = localizeProject(raw, L)
        meta = { title: withBrand(p.title), desc: clip(p.details?.description?.[0] || `${p.category}. ${p.location}`), image: p.image }
        jsonld.push({
          '@context': 'https://schema.org', '@type': 'Residence', name: p.title,
          description: meta.desc, image: abs(p.image), url: abs(canon),
          address: projectAddress(p.location),
          ...(raw.coords ? { geo: { '@type': 'GeoCoordinates', latitude: raw.coords[0], longitude: raw.coords[1] } } : {}),
        })
      } else meta = { title: withBrand(pagesMap['/projects']?.title || 'Renaissance Development'), desc: pagesMap['/projects']?.desc || '' }
    } else if (m && m[1] === 'completed') {
      const raw = completedProjects.find((x) => x.slug === m[2])
      if (raw) {
        const c = localizeCompleted(raw, L)
        meta = { title: withBrand(c.title), desc: clip(c.description?.[0] || c.eyebrow), image: c.hero }
        jsonld.push({
          '@context': 'https://schema.org', '@type': 'Residence', name: c.title,
          description: meta.desc, image: abs(c.hero), url: abs(canon), address: projectAddress(c.location),
          ...(raw.coords ? { geo: { '@type': 'GeoCoordinates', latitude: raw.coords[0], longitude: raw.coords[1] } } : {}),
        })
      } else meta = { title: 'Renaissance Development', desc: '' }
    } else if (m && m[1] === 'services') {
      const raw = services.find((x) => x.slug === m[2])
      const s = raw ? localizeService(raw, L) : undefined
      meta = s ? { title: withBrand(s.title), desc: clip(s.description), image: s.image } : { title: withBrand(pagesMap['/services']?.title || ''), desc: pagesMap['/services']?.desc || '' }
    } else if (m && m[1] === 'blog') {
      const raw = posts.find((x) => x.slug === m[2])
      const post = raw ? localizePost(raw, L) : undefined
      meta = post ? { title: withBrand(post.title), desc: clip(post.excerpt), image: post.image, type: 'article' } : { title: withBrand(pagesMap['/blog']?.title || ''), desc: pagesMap['/blog']?.desc || '' }
    } else {
      // unknown route → NotFound
      meta = { title: withBrand(pagesMap['/']?.title || 'Renaissance Development'), desc: pagesMap['/']?.desc || '', noindex: true }
    }

    const url = abs(canon)
    const img = abs(meta.image || DEFAULT_OG)

    // ── Head tags ──
    document.title = meta.title
    setName('description', meta.desc)
    setName('robots', meta.noindex ? 'noindex, follow' : 'index, follow')
    setLink('canonical', url)
    setProp('og:title', meta.title)
    setProp('og:description', meta.desc)
    setProp('og:url', url)
    setProp('og:image', img)
    setProp('og:type', meta.type || 'website')
    setProp('og:locale', t('seo.ogLocale'))
    setName('twitter:card', 'summary_large_image')
    setName('twitter:title', meta.title)
    setName('twitter:description', meta.desc)
    setName('twitter:image', img)

    // ── Breadcrumbs (non-home) ──
    if (canon !== '/') {
      const crumbs = [{ name: 'Renaissance Development', url: SITE_URL }]
      if (m) {
        const sectionPath = '/' + m[1]
        crumbs.push({ name: pagesMap[sectionPath]?.title?.split(' — ')[0] || m[1], url: abs(sectionPath) })
      }
      crumbs.push({ name: meta.title.split(' | ')[0].split(' — ')[0], url })
      jsonld.push({
        '@context': 'https://schema.org', '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
      })
    }
    setJsonLd('page', jsonld.length ? jsonld : null)
  }, [pathname, lang, t, tx])

  return null
}
