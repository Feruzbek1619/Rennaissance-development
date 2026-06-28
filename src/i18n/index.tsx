'use client'
import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import ru from './ru'
import en from './en'
import uz from './uz'

export type Lang = 'ru' | 'uz' | 'en'

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'ru', label: 'Русский' },
  { code: 'uz', label: "O‘zbekcha" },
  { code: 'en', label: 'English' },
]

const dicts: Record<Lang, Record<string, unknown>> = { ru, uz, en }
const STORAGE = 'rnd_lang'

function initialLang(): Lang {
  if (typeof window === 'undefined') return 'ru'
  const saved = localStorage.getItem(STORAGE) as Lang | null
  return saved && dicts[saved] ? saved : 'ru'
}

function resolve(dict: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>(
    (o, k) => (o && typeof o === 'object' ? (o as Record<string, unknown>)[k] : undefined),
    dict,
  )
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }
const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE, l)
    } catch {
      /* ignore */
    }
    if (typeof document !== 'undefined') document.documentElement.lang = l
  }, [])

  // t('a.b.c') → string for the active language; falls back to RU, then the key.
  const t = useCallback(
    (key: string): string => {
      const v = resolve(dicts[lang], key)
      if (typeof v === 'string') return v
      const fallback = resolve(dicts.ru, key)
      return typeof fallback === 'string' ? fallback : key
    },
    [lang],
  )

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>
}

export function useTranslation() {
  const ctx = useContext(I18nContext)
  if (!ctx) return { lang: 'ru' as Lang, setLang: () => {}, t: (k: string) => k }
  return ctx
}
