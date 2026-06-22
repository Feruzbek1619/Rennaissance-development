# Renaissance Building — Build Doc

Маркетинговый сайт Renaissance Building Company (девелопер недвижимости, Ташкент).
Multi-page, ~15 экранов + модалки. Источник дизайна — Figma. Собирать **точ-в-точ**.

- **Figma:** https://www.figma.com/design/Zai7sLI7rmdUAqL0jYenfL/Renaissance-Building
- **Figma fileKey:** `Zai7sLI7rmdUAqL0jYenfL`

> Это живой документ. После каждого этапа обновляются разделы **Build Progress** и
> **Conventions Log**. Перед стартом этапа — читать Conventions Log целиком.

---

## Стек
- Vite + React + TypeScript
- Tailwind v3 (токены — единственный источник цвета и типографики)
- React Router (multi-page)
- Framer Motion — анимации
- Backend: Django (отдельная команда, REST API). UI бэком не блокируется — где данных нет, моки/заглушки.

Stack зафиксирован. Миграции не предлагать без причины.

---

## Design Tokens (источник: `tailwind.config.js`)

### Colors
| Token | Hex | Назначение |
|---|---|---|
| `accent` | `#FF6701` | акцент (CTA, ссылки, выделения) |
| `primary` | `#0D2B45` | основной тёмно-синий |
| `ink` | `#000000` | текст/чёрный |
| `white` | `#FFFFFF` | белый |
| `bg` | `#FFFFFF` | фон страницы |
| `bg-subtle` | `#F0F3F5` | приглушённый фон секций |
| `bg-grey` | `#F2F2F7` | серый фон-блок |
| `border` | `#E5E6E8` | границы/разделители |
| `muted` | `#C4C4C4` | приглушённые элементы |
| `secondary` | `#737476` | вторичный текст |
| `muted-text` (`muted.text`) | `#6C757D` | третичный текст |

### Type
- **Headings:** `Instrument Sans` (`font-heading`) · **Body:** `Poppins` (`font-body`)

| Token | Size / LH / Weight |
|---|---|
| `text-h5` | 25 / 1.4 / 500 |
| `text-h6` | 20 / 1.4 / 600 |
| `text-body-lg` | 20 / 1.6 |
| `text-body-md` | 18 / 1.6 |
| `text-body-sm` | 16 / 1.6 |

**Gap:** в токенах только h5/h6. Заголовки h1–h4 читать из самих фреймов, scale не выдумывать.

---

## Page Manifest
Node-id для `get_design_context`.

### Страница `Design` (источник правды)
| Экран | nodeId | Route |
|---|---|---|
| Home | `314:2857` | `/` |
| Project | `94:4561` | `/projects` |
| Project details | `94:4869` | `/projects/:slug` |
| Request Free Quote | `7801:4056` | `/quote` |
| About | `7801:2798` | `/about` |
| FAQ | `7802:10225` | `/faq` |
| Производство (B2B) | `7803:11473` | `/b2b` |
| Error 405 | `7802:9441` | — |
| Modal ×3 | `7798:6182` · `7810:4938` · `7807:2027` | модалки |

### Страница `Component`
| Экран | nodeId | Route |
|---|---|---|
| Services | `7803:16907` | `/services` |
| Services details | `7803:17026` | `/services/:slug` |
| Process | `7803:17541` | `/process` |
| Blog | `7803:18585` | `/blog` |
| Blog Details | `7803:18772` | `/blog/:slug` |
| Error 404 | `7803:18973` | — |
| Privacy Policy | `7803:19207` | `/privacy` |
| Terms & Conditions | `7803:19294` | `/terms` |

### Components (собрать один раз, переиспользовать)
| Компонент | nodeId |
|---|---|
| Navigation | `129:4743` (инстанс `7803:16657`) |
| Top header | `7803:24664` |
| Button (variants) | `45:601` |
| Service Card (sets 1–6) | `42:885` · `45:141` · `45:147` · `45:150` · `129:3526` · `129:3752` |
| Contact Form | `7803:16242` |
| Form | `7768:2671` |

### Игнорировать
3 секции `… by html.to.design ❤️ FREE version …` (apexdev.uz / gh.uz / mbc.uz) — скрейп чужих сайтов.

---

## Build Progress

**Текущий этап:** Stage 1 — Base components (в работе). Готово: shell (Button, Top header, Navigation). Осталось: Footer, Service Card, Form.

- [x] Stage 0 — Scaffold + tokens + fonts
- [ ] Stage 1 — Base components (Navigation ✓, Top header ✓, Button ✓, Footer ⃞, Service Card ⃞, Form ⃞)
- [ ] Stage 2 — Home (`314:2857`)
- [ ] Stage 3 — Projects + Project details
- [ ] Stage 4 — About + Services + Services details
- [ ] Stage 5 — Request Quote + Modals
- [ ] Stage 6 — FAQ + Process + B2B
- [ ] Stage 7 — Blog + Blog Details
- [ ] Stage 8 — Privacy + Terms + Errors
- [ ] Stage 9 — Animations pass

---

## Conventions Log

### Stage 0 — Scaffold
**Добавлено:**
- Vite 5 + React 18 + TS (project-references: `tsconfig.json` orchestrator → `tsconfig.app.json` + `tsconfig.node.json`). Build: `tsc -b && vite build`.
- Tailwind **v3** (не v4): брифовый `theme.extend` конфиг работает 1:1, без миграции в CSS `@theme`.
- React Router v6 data-router (`createBrowserRouter` + `RouterProvider`). Future-флаги включены: `v7_relativeSplatPath` (router) + `v7_startTransition` (provider) — консоль чистая.
- Framer Motion установлен (применяется в Stage 9).
- Шрифты — Google Fonts `<link>` в `index.html`: Instrument Sans + Poppins (400/500/600/700).
- Path alias `@/*` → `src/*` (vite + tsconfig).
- `.claude/launch.json` — preview-сервер `dev` на порту 5173.

**Структура / паттерны (переиспользовать):**
- `src/router.tsx` — единая таблица роутов, растёт по этапам.
- `src/layouts/RootLayout.tsx` — шелл всех страниц (Outlet + ScrollRestoration). **Navigation + Footer ставятся сюда в Stage 1.**
- `src/pages/*` — страницы; `Home`, `NotFound` пока заглушки.
- Базовые стили в `src/index.css` через `@layer base` (body = `font-body text-ink bg-bg`; заголовки = `font-heading`).
- Токены — только через Tailwind-классы (`text-accent`, `bg-bg-subtle`, `text-body-md` …). Hardcode цвета/размера запрещён.

**Решения / заметки:**
- npm audit: 2 issues (esbuild dev-server, moderate+high) — транзитивно через Vite, **только dev**, фикс = `vite@8` (breaking). Оставлено на Vite 5, не апгрейдим.
- h1–h4 типошкалы в токенах нет — читать из фреймов (см. Gap выше).
- ⚠️ Tailwind config-изменения требуют **рестарта dev-сервера** — JIT иногда не подхватывает новые токены/утилиты на лету (ловили: новые классы рендерились «прозрачными»). После правки `tailwind.config.js` — перезапуск preview.

### Stage 1 — Base components (часть 1: shell)
**Добавлено:**
- **Fonts:** Vela Sans (Figma) → self-hosted `@fontsource/manrope` (OFL-база Vela Sans). Импорт весов 400/500/600/700/800 в `main.tsx`. Токен `font-vela` = `['Vela Sans','Manrope','sans-serif']` — настоящие Vela-файлы можно положить в `public/fonts` под семейством "Vela Sans" и они переопределят. Poppins/Instrument Sans пока через Google Fonts `<link>`.
- **Tokens (расширение):** `dark #131612` (Main/Dark — тёмная плашка), `green #62AD5A` (Main/Green — контакт-иконки + green-форма), `bg.active #E3EBF1` (актив-таб навигации). Прозрачности — через `/60`, `/40`, `/10` (Tailwind opacity), не отдельные токены (Figma «White 60/40/10»).
- **Assets:** `public/logo.svg` (RENAISSANCE DEVELOPMENT, 303.922×76, vector). Иконки — inline SVG в `src/components/icons.tsx` (ArrowUpRight ↗, Phone, ChevronDown, Instagram, FlagRU, Spinner), без Figma-asset-URL (те истекают за 7 дней).

**Компоненты (переиспользовать):**
- `src/lib/cn.ts` — join классов (вместо clsx).
- `src/components/Container.tsx` — `max-w-[1920px] + xl:px-[100px]` ⇒ контент-колонка 1720 / гаттеры 100 при 1920 (точно по Figma), сужается на мелких экранах. **Все секции оборачивать в `<Container>`.**
- `src/components/Button.tsx` — pill + arrow-circle. Варианты: `accent` (CTA оранж), `white`, `outline` (на тёмном; hover → заливка white). Размеры: `lg` (nav/hero: pl32 pr16 py16, lh1.4, h≈60), `md` (карточки «Show Details»: pl24 pr12 py12, lh1.6). Состояния: default/hover/active/disabled/loading(spinner). Рендерится как `<Link to>` / `<a href>` / `<button>`. ⚠️ hover/active для `accent`/`white` — разумные дефолты (#E85F00/#D65800), в Figma не заданы.
- `src/components/layout/TopHeader.tsx` (Figma 7803:24664) — `bg-dark`, `font-vela`, зелёные иконки, правые ссылки `white/60`. h-42.
- `src/components/layout/Navigation.tsx` (Figma 129:4743) — лого + пилюля-меню (актив `bg-bg-active`) + дропдаун «Каталог объектов» (проекты) + телефон + divider + CTA. h-108. NavLink для актив-состояний.
- Оба врезаны в `RootLayout`. Sticky пока нет (по дизайну static).

**Проверено (preview @1920, inspect):** top-header bg `#131612`✓, актив-таб `#E3EBF1`✓, CTA `#FF6701`/h60✓, шрифты✓, консоль чистая.

---

## Открытые вопросы (не блокируют)
1. Дубли `Design` ↔ `Component` (Project details, About, FAQ, Request Quote) — берём версию с `Design`.
2. ✅ РЕШЕНО (Feruz): зелёный `#62AD5A` — оставлен (контакт-иконки + green-форма «Обращение к директору»). Vela Sans — self-host (взят Manrope, OFL-база). Остаётся открытым только `#FF9500` (второй оранж) — пока не встречался, держим дропнутым до появления.
3. 4 безымянных фрейма 1727×759 на `Design` + 3 «Modal» — назначение (слайды героя? quote/contact/success модалки?).
4. Routes — структура из манифеста принята. «Контакты» в навигации → `/contacts` (в манифесте отдельной страницы нет — placeholder).
5. **Footer** в списке компонентов нет node-id; в метаданных Home явного футера не видно (последние секции — Contact-cards + 2 «Main container»-инстанса 7825:3043/7825:3064). Надо локализовать узел футера перед сборкой.
