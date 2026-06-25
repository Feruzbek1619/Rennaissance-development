// Serverless lead endpoint (Vercel). Receives a lead from the site and posts it
// to the Renaissance Development Telegram group. The bot token lives here on the
// server only — it is never shipped to the browser.
//
// Secrets come from env vars only (set at deploy time) — never hardcoded.
const TOKEN = process.env.TELEGRAM_BOT_TOKEN || ''
const CHAT = process.env.TELEGRAM_CHAT_ID || ''

const esc = (s) =>
  String(s).replace(/[<&>]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]))

export default async function handler(req, res) {
  // CORS — the static site calls this from another origin.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method' })
  if (!TOKEN || !CHAT) return res.status(500).json({ ok: false, error: 'not configured' })

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  const { name = '', phone = '', question = '', object = '', page = '' } = body || {}

  if (!phone && !name) {
    return res.status(400).json({ ok: false, error: 'no contact' })
  }

  const lines = [
    '🏠 <b>Новая заявка — Renaissance Development</b>',
    '➖➖➖➖➖➖➖➖',
    object ? `🏢 Объект: <b>${esc(object)}</b>` : '🏢 Объект: <i>общая заявка</i>',
    name ? `👤 Имя: ${esc(name)}` : '',
    phone ? `📞 Телефон: ${esc(phone)}` : '',
    question ? `💬 Вопрос: ${esc(question)}` : '',
    page ? `🌐 Страница: ${esc(page)}` : '',
  ].filter(Boolean)

  try {
    const tg = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    const data = await tg.json()
    if (!data.ok) return res.status(502).json({ ok: false, error: data.description || 'telegram' })
    return res.status(200).json({ ok: true })
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'network' })
  }
}
