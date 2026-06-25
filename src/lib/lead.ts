import { projects } from '@/data/projects'

// Lead submissions are sent to a small serverless endpoint that forwards them to
// the Telegram group. The bot token is NOT here — it lives only on the server.
const ENDPOINT = 'https://lead-api-phi.vercel.app/api/lead'

export type LeadInput = {
  name?: string
  phone?: string
  question?: string
  /** Explicit object/project name. If omitted, it is derived from the URL. */
  object?: string
}

/** Project title for the current path, or '' for non-project (general) pages. */
export function objectFromPath(path: string = window.location.pathname): string {
  const m = path.match(/^\/projects\/(.+?)\/?$/)
  if (m) {
    const p = projects.find((x) => x.slug === m[1])
    if (p) return p.title
  }
  return ''
}

/** POST a lead to the Telegram endpoint. Returns true on success. */
export async function sendLead(input: LeadInput): Promise<boolean> {
  const payload = {
    name: (input.name ?? '').trim(),
    phone: (input.phone ?? '').trim(),
    question: (input.question ?? '').trim(),
    object: input.object ?? objectFromPath(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const data = await res.json().catch(() => ({ ok: false }))
    return !!data.ok
  } catch {
    return false
  }
}
