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

**Текущий этап:** Stages 0–8 COMPLETE · Desktop QA · Full Figma audit · **Mobile responsive · i18n (ru/uz/en) · SEO · Telegram-лиды — ВСЁ COMPLETE**. Осталось: Stage 9 (анимации) + custom domain.

- [x] Stage 0 — Scaffold + tokens + fonts
- [x] Stage 1 — Base components (Navigation, TopHeader, Button, Footer, ServiceCard, Form)
- [x] Stage 2 — Home (все секции: Hero, Stats, WhyUs, Projects, About, NeedHelp, Partners, Production, FAQ, Process, Contact)
- [x] Stage 3 — Quote (`/quote`) — hero + form + map + contact cards + stats + FAQ
- [x] Stage 4 — About (`/about`) — hero + company desc + team + stats + production + partners + why-us + NeedHelp + FAQ + projects grid
- [x] Stage 5 — FAQ (`/faq`) — hero + accordion + extended NeedHelp form
- [x] Stage 6 — B2B (`/b2b`) — hero + UTB description + products + FAQ + contact cards + NeedHelp
- [x] Stage 7 — NotFound (404) + Privacy (`/privacy`) + Terms (`/terms`)
- [x] Stage 8 — Services (`/services`) + ServiceDetails (`/services/:slug`) + Process (`/process`) + Blog (`/blog`) + BlogDetails (`/blog/:slug`) + data files (`services.ts`, `blog.ts`)
- [x] QA — Responsive/browser-truth pass (desktop strategy): honest gates green @1280/1440/1920 via Playwright
- [x] QA — Full Figma audit pass (per-page deviation sweep, 14 страниц)
- [x] **i18n** — ru/uz/en на весь сайт (`useTranslation`+`tx()`, оверлеи данных `*I18n.ts`). См. memory [[i18n-setup]].
- [x] **SEO** — RouteSeo (per-route localized meta + canonical + OG/Twitter + JSON-LD), `robots.txt`, `sitemap.xml`. См. memory [[seo-setup]].
- [x] **Telegram-лиды** — формы → serverless endpoint → группа, объект на канон-RU. См. memory [[telegram-lead-integration]].
- [x] **Mobile responsive** — phones-first ниже lg(1024): burger-меню, max-* !important оверрайды, стек колонок/сеток. Реально-глаза Playwright-проход по КАЖДОЙ странице @375. Desktop ≥1024 не тронут. См. memory [[responsive-strategy]].
- [~] Stage 9 — Animations pass (Framer Motion) — в работе (сейчас живой CSS scroll-reveal; framer-motion установлен)
- [ ] Custom domain — обновить `SITE_URL` (Seo.tsx) + robots + sitemap при подключении домена (сейчас `rnd-vatan.vercel.app`)

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

### Stage 1 — Base components (часть 2: Service Card + Footer)
**Добавлено:**
- `src/components/ServiceCard.tsx` (Figma 42:885/45:141) — горизонтальная строка-услуга: заголовок (Instrument Sans 39) + описание (Poppins 16, `text-muted`) + чеклист (CheckCircle + Instrument Sans 20) + outline-кнопка «Show Details» + повёрнутое фото (−6°, absolute). **Прозрачная**, рассчитана на тёмную секцию. ⚠️ Визуальная сверка отложена до первого монтирования (Stage 4 Services) — на странице пока не используется.
- `src/components/layout/Footer.tsx` (Figma 7802:10788) — bg `ink`(#000): CTA-заголовок + white-кнопка «Оставить заявку», 4 колонки (бренд+tagline / Навигация / ПРОЕКТЫ / Контакты) с вертикальными divider (`border-l border-white/10`), нижняя строка (копирайт + соцсети-чипы + Dasta). Врезан в RootLayout.
- Иконки: + `CheckCircle`, `MapPin`, `Telegram`.
- Ассеты: `public/logo-stacked.svg` (вертикальное лого 256×253), `public/assets/dasta-icon.svg` + `dasta-word.svg`.
- **Button `white`-вариант** перенастроен под футер: `bg-white text-ink` + белый круг + navy-стрелка (было navy-круг/white-стрелка — это теперь только hover у `outline`).

**⚠️ Новые шрифты (подмена + флаг):**
- Footer-заголовок «Начните жизнь…» — Figma `MTS Compact Bold 61` (проприетарный шрифт МТС, не лицензируем) → подменён на `font-heading` (Instrument Sans bold).
- Копирайт/кредиты — Figma `Inter` → подменён на `font-body` (Poppins).
- Решить с Feruz: оставляем подмены или тянем настоящие шрифты (MTS Compact платный).

**Проверено (preview @1920):** footer — заголовок в 1 строку✓, 4 колонки без переносов✓, white-кнопка✓, build green, консоль чистая.

### Stage 1 — часть 3: Form-карточка (отложена в пользу Home)
- `src/components/form/{TextField,TextArea}.tsx` + `src/components/Form.tsx` (Figma 7768:2830) — green-форма «Обращение к директору»: Vela-поля white/10, зелёная кнопка, соцсети. Карточка собрана, но **полная декоративная секция** (иллюстрация `public/assets/director-illustration.png`, свечения, watermark — скачаны) ещё не смонтирована. Feruz переключил на Home — вернёмся к green-секции на её странице.
- Токены: `muted.field #959695`, `muted.soft #8A8C8A`. Иконка Facebook.

### Stage 2 — Home → Hero
**Шрифты (важно):** Poppins и Instrument Sans **без кириллицы** → добавлен fallback на самохостед-Manrope в `font-heading`/`font-body`. Русский текст рендерится в Manrope. Display-заголовки в Figma — `MTS Compact` (проприетарный МТС) → подмена на `font-heading`. Описание hero в Figma — Arial (несетевой дефолт) → `font-body`.
**Button — новые варианты:** `primary` (navy-заливка, белый круг+navy-стрелка), `outlineLight` (navy-обводка на светлом; круг navy+white-стрелка, hover-заливка navy). Hero-кнопки: `!px-8` (симметричный px-32 вместо lg pl32/pr16).
**Иконки:** ChevronLeft/Right (карусель).
- `src/components/home/Hero.tsx` (332:5981): заголовок 134.7px + описание/2 кнопки (w-574) + фото 1720×800 (`hero-alandalus.png`) с круглыми стрелками карусели. pt-82 под навигацией.
**Проверено @1920:** совпадает с Figma; build green.

### Stage 8 — Services, ServiceDetails, Process, Blog, BlogDetails
**Добавлено:**
- `src/data/services.ts` — тип `Service` + массив 4 услуг (жилые комплексы, коммерческая, производство, проектирование). Поля: slug, title, category, description, longDescription, image, stats[4], features[6].
- `src/data/blog.ts` — тип `BlogPost` + массив 6 постов с русскоязычным контентом о строительстве. Поля: slug, title, category, date, excerpt, content, image, readTime.
- `src/pages/Services.tsx` — `/services`: hero primary (dark bg, "MASTERING THE ART OF STRUCTURAL PRECISION.") + accordion всех услуг (номер/категория/название → expand: описание + features grid 2-col + изображение + ссылка) + preview процесса (3 карточки) + FAQSection + NeedHelpSection.
- `src/pages/ServiceDetails.tsx` — `/services/:slug`: hero + breadcrumb + dark stats row (4 числа) + описание/фото 2-col + process steps (4 карточки) + related projects (3 ProjectCard) + FAQSection + NeedHelpSection. NotFound при неизвестном slug.
- `src/pages/Process.tsx` — `/process`: hero primary "STRATEGIC EXECUTION." + 3 чередующихся блока (фото слева/справа, большой номер, описание, features 2-col) + stats strip (primary bg) + FAQSection + NeedHelpSection.
- `src/pages/Blog.tsx` — `/blog`: hero primary "NEWS, INSIGHTS & ARTICLES" + фильтры-кнопки по категориям + grid 3-col BlogCard (изображение/категория/заголовок/excerpt/дата) + pagination + NeedHelpSection.
- `src/pages/BlogDetails.tsx` — `/blog/:slug`: hero с фоном-изображением (opacity 30% + gradient) + article (полное изображение + текст параграфами + теги) + sticky sidebar (О компании card/navy, разделы nav, CTA card) + related articles (3 карточки) + NeedHelpSection. NotFound при неизвестном slug.
- `src/router.tsx` — добавлены роуты `/services`, `/services/:slug`, `/process`, `/blog`, `/blog/:slug`.

**Паттерны/решения:**
- `ProjectCard` экспортируется как named export `{ ProjectCard }` — не default. Импортировать только через `{ ProjectCard }`.
- BlogCard и related-articles — inline-компоненты внутри страниц (не выносить в отдельный файл — используются только там).
- Контент блога — оригинальный, про строительство в Узбекистане (не шаблонный Solidus).
- Services accordion: нумерация 01–04, категория как подзаголовок, expand показывает longDescription + features grid.

**Проверено (preview):** все 5 страниц рендерятся, навигация работает, 404 для неизвестных slug работает.

### QA — Responsive / browser-truth pass (desktop strategy)
**Решение Feruz (2026-06-23):** сайт **desktop-only**. Pixel-perfect на 1920, плавно держим 1440→1280; ниже 1280 — честный горизонтальный скролл. Мобайл/планшет ВНЕ scope (в Figma их нет). См. memory [[responsive-strategy]].

> ⚠️ **ОБНОВЛЕНО (позже):** стратегия изменена — сайт теперь **полностью адаптивный**. Ниже lg(1024) — phones-first через `max-*` `!important`-оверрайды + burger-меню; desktop ≥1024 остаётся pixel-perfect нетронутым. `body{min-width:1280px}` scoped только в `@media(min-width:1024px)`. Проведён реально-глаза Playwright-проход по каждой странице @375 (см. секцию ниже «Mobile responsive pass»). Запись «desktop-only» выше — историческая.

**Источник правды — реальный Chromium (Playwright), не превью.** Аудит-харнесс:
- `tests/audit.spec.ts` + `playwright.audit.config.ts` (bundled chromium, viewports 1280/1440/1920). Гейты: scrollWidth ≤ clientWidth, ноль console-ошибок, ноль 404, ноль битых картинок, fonts incl. Cyrillic loaded (`document.fonts.check`), CLS, childOverflow. Артефакты → `tests/audit-out/*.json` (gitignored).
- `tests/interaction.spec.ts` — состояния в браузере: дропдаун навигации (hover), FAQ-аккордеон (клик), видимый focus.

**Найдено и починено ПО КОРНЮ:**
- ❌ `overflow-x: hidden` на `html/body` + `<nav>` **маскировал** полный слом фикс-1920 вёрстки на <1500px. → Снято. `body { min-width: 1280px }` + `scrollbar-gutter: stable` (`src/index.css`) — ниже 1280 честный скролл, не обрезка.
- **Container** (`Container.tsx`): гаттеры `xl:px-[60px] 2xl:px-[100px]` — на 1280–1440 +80px ширины контента; на 2xl (≥1536, вкл. 1920) ровно 100px → 1720-колонка pixel-perfect.
- **Navigation**: компактный режим на 1280–1535 (логотип 208, ссылки 14px/px-2.5, номер телефона скрыт — иконка-звонилка остаётся, номер виден в TopHeader), полный размер на 2xl. Контент nav: 1366→1121px, влезает в 1080 (1280) и 1240 (1440).
- **Паттерн «две фикс-колонки рядом»** (About projects-header, About production, B2B products, Projects hero): фикс `w-[Npx]` → `flex-1 min-w-0` / `w-[%] max-w-[Npx]`, responsive gap `gap-8 2xl:gap-[...]`, на 2xl возврат к Figma-размеру.
- **ProjectCard** кнопки: `flex-1` (basis 0) обманывал `flex-wrap` → `flex-auto` (basis=контент) + `flex-wrap` → в узких 3-кол сетках кнопки переносятся, не вылезают.
- Удалены 3 пре-существующих unused-import (ломали `tsc -b`/`npm run build`): ProjectCard←Button, About←Link, ProjectDetails←ProjectCard.

**Гейты (все зелёные):** `npm run build` ✓; 48 Playwright-тестов ✓; 0 console/404/broken-img; Cyrillic — MTS Compact (заголовки) + Manrope (body-fallback, Poppins кириллицу не покрывает); CLS ≤ 0.04.
**⚠️ JIT-staleness подтверждён снова:** новые responsive-утилиты не подхватывались на лету — перед замерами/аудитом перезапускать dev-сервер (`pkill -f vite`).

### QA — Full Figma audit pass (per-page deviation sweep)
Полный аудит всех 14 страниц против Figma (4 параллельных субагента: Figma MCP скриншот ↔ живой Playwright-скриншот). Источник правды — Figma + браузер.

**Починено:**
- **404** (`7802:9441`): был большой текст «404» → дизайн Figma (белый герой + изометрическая иллюстрация `error-illustration.png` + чёрная пилюля «Вернуться на главную»).
- **/contacts**: роут отсутствовал (nav → 404). Добавлен `/contacts` → страница «Наши контакты» (= Quote, `7801:4056`). `/quote` оставлен для CTA.
- **About** (`7801:3087`): cartoon-заглушка директора → реальное фото (`director-photo.png`), карточка имени внахлёст, «Джаббаров» → «Джабборов»; production год 2020 → 2021.
- **Home process** (`7782:2938`): точная Figma-копия шагов («Выбираете квартиру / Подписываете договор / Получаете ключи» + «Шаг 0X»), фото команды (`home-process.png`).
- **Projects**: «Все проекты» → «Наши реализованные и текущие проекты»; 6 карточек в 2-кол сетке (было 2/стр); проданные без кнопок.
- **Quote/FAQ**: серая заглушка/неверное фото → фото ЖК.
- **ProjectDetails** (`7800:3198`, `7791:12363`): иконки «мест поблизости» (искры/шапка/машина/корзина) + серые карточки; карточки карусели → строки Площадь/Локация + 2 кнопки.

**Решение Feruz (2026-06-23):** шаблонные страницы (Services, ServiceDetails, Process, Blog, BlogDetails) — их Figma это generic Solidus с английским placeholder-контентом → **оставлены как есть** (текущая RU-адаптация).
**~~Отложено~~ → СДЕЛАНО:** B2B секция ПРОИЗВОДСТВО (товары concrete/travertine/ventilation/aluminium/cranes + детальные блоки) есть; ProjectDetails/детальные страницы блок ПРЕИМУЩЕСТВА реализован карточками (фото + заголовок + описание). Оба пункта закрыты.

### i18n / SEO / Telegram-лиды
- **i18n:** `useTranslation()` → `{ t, lang, setLang, tx }`; `tx<T>()` возвращает массивы/объекты с RU-фолбэком. Локали `src/i18n/{ru,en,uz}.ts` (default-export вложенных объектов, 3×536 строк, симметрично). Оверлеи данных `projectsI18n/completedI18n/servicesI18n/blogI18n.ts` — локализуют по индексу, RU = источник правды.
- **SEO:** `src/components/Seo.tsx` `RouteSeo` (вмонтирован в `RootLayout`) обновляет `<head>` per route+lang; JSON-LD (Organization/WebSite/Residence+geo/BreadcrumbList); canonical схлопывает дубли роутов (`/quote`→`/contacts`, `/production`→`/b2b`). `public/robots.txt` + `public/sitemap.xml`. **`SITE_URL` в Seo.tsx = `https://rnd-vatan.vercel.app` — менять при подключении домена** (+ robots + sitemap).
- **Лиды:** `openLead(object?, displayObject?)` — `object`=канон-RU (уходит в Telegram), `displayObject`=локализованный (показ в модалке). Bot-token только в env-переменных serverless-функции, не в репо.

### Mobile responsive pass
- **Стратегия:** phones-first ниже `lg`(1024). `body{min-width:1280px}` обёрнут в `@media(min-width:1024px)`; `@media(max-width:1023px){html,body{overflow-x:clip}}`. Burger-меню + slide-out панель ниже lg.
- **Правило оверрайдов:** мобильные правки ТОЛЬКО через `max-sm/max-md/max-lg` + `!important` (`max-md:!flex-col`, `max-sm:!w-full` …) — потому что произвольные утилити (`w-[Npx]`, `grid-cols-N`, `flex`) бьют по равной специфичности порядком в источнике. Desktop ≥1024 не трогать.
- **Типовые баги (исправлены):** десктопные горизонтальные ряды (`flex`/фикс-ширина/`self-end`) не перестраивались → контент сжимался в полоску и обрезался `overflow-x:clip`. Чинится `max-*:flex-col` + сброс ширины (`max-sm:!w-full`) + `flex-wrap` для мета-рядов. Carousel-слайды (ProductionSection) — `max-md:!flex-col` на слайде + сброс w/h фото.
- **Верификация:** реально-глаза (скриншоты Playwright @375), не только overflow-числа — 1fr/flex-1 колонки сжимаются БЕЗ горизонтального overflow, числовой аудит их не ловит.

---

## Открытые вопросы (не блокируют)
1. Дубли `Design` ↔ `Component` (Project details, About, FAQ, Request Quote) — берём версию с `Design`.
2. ✅ РЕШЕНО (Feruz): зелёный `#62AD5A` — оставлен (контакт-иконки + green-форма «Обращение к директору»). Vela Sans — self-host (взят Manrope, OFL-база). Остаётся открытым только `#FF9500` (второй оранж) — пока не встречался, держим дропнутым до появления.
3. 4 безымянных фрейма 1727×759 на `Design` + 3 «Modal» — назначение (слайды героя? quote/contact/success модалки?).
4. Routes — структура из манифеста принята. «Контакты» в навигации → `/contacts` (в манифесте отдельной страницы нет — placeholder).
5. **Footer** в списке компонентов нет node-id; в метаданных Home явного футера не видно (последние секции — Contact-cards + 2 «Main container»-инстанса 7825:3043/7825:3064). Надо локализовать узел футера перед сборкой.
