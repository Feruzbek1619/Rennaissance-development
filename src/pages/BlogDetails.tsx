import { useParams, Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { posts } from '@/data/blog'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import NotFound from './NotFound'

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find((p) => p.slug === slug)

  if (!post) return <NotFound />

  const related = posts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <main>
      {/* ── Article hero ─────────────────────────────────── */}
      <section className="bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async" src={post.image} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/30" />
        </div>
        <div className="relative py-[100px]">
          <Container>
            <div className="flex flex-col gap-6 max-w-[780px]">
              <div className="flex items-center gap-4">
                <Link
                  to="/blog"
                  className="font-body text-[14px] text-white/50 hover:text-white/80 transition-colors"
                >
                  ← Блог
                </Link>
                <span className="text-white/30">•</span>
                <span className="font-body text-[13px] uppercase tracking-[0.1em] text-accent font-medium">
                  {post.category}
                </span>
              </div>
              <h1 className="font-heading text-[61px] font-bold uppercase leading-[1.2] text-bg-subtle">
                {post.title}
              </h1>
              <div className="flex items-center gap-5">
                <span className="font-body text-[15px] text-white/60">{post.date}</span>
                <span className="text-white/30">•</span>
                <span className="font-body text-[15px] text-white/60">{post.readTime} чтения</span>
              </div>
            </div>
          </Container>
        </div>
      </section>

      {/* ── Article body + sidebar ────────────────────────── */}
      <section className="bg-white py-[100px]">
        <Container>
          <div className="flex items-start gap-[80px]">

            {/* Main content */}
            <article className="flex-1 min-w-0">
              <div className="overflow-hidden mb-[48px]">
                <img loading="lazy" decoding="async"
                  src={post.image}
                  alt={post.title}
                  className="w-full aspect-[820/480] object-cover"
                />
              </div>

              <div className="flex flex-col gap-6">
                <p className="font-body text-[20px] leading-[1.75] text-ink font-medium">
                  {post.excerpt}
                </p>
                {post.content.split('\n\n').map((para, i) => (
                  <p key={i} className="font-body text-[18px] leading-[1.75] text-secondary">
                    {para}
                  </p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex items-center gap-3 mt-[48px] pt-[48px] border-t border-border">
                <span className="font-body text-[14px] text-secondary/60">Теги:</span>
                {[post.category, 'Строительство', 'Узбекистан'].map((tag) => (
                  <span
                    key={tag}
                    className="h-[32px] px-4 bg-bg-subtle font-body text-[13px] text-ink flex items-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="w-[360px] shrink-0 flex flex-col gap-8 sticky top-8">

              {/* About company card */}
              <div className="bg-primary p-[36px] flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <span className="font-body text-[13px] uppercase tracking-[0.1em] text-white/50">
                    О компании
                  </span>
                  <h3 className="font-heading text-[25px] font-bold uppercase leading-[1.3] text-white">
                    Renaissance Development
                  </h3>
                </div>
                <p className="font-body text-[15px] leading-[1.7] text-white/70">
                  Застройщик полного цикла. Собственный завод UTB, проектирование, строительство и сдача объектов под ключ.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center h-[48px] px-6 bg-accent rounded-[5px] font-body font-medium text-[16px] text-white hover:bg-[#E85F00] transition-colors"
                >
                  О компании →
                </Link>
              </div>

              {/* Quick nav */}
              <div className="bg-bg-subtle p-[36px] flex flex-col gap-4">
                <h3 className="font-heading text-[20px] font-bold uppercase leading-[1.3] text-ink">
                  Разделы
                </h3>
                <div className="flex flex-col gap-2">
                  {[
                    { label: 'Проекты', to: '/projects' },
                    { label: 'Услуги', to: '/services' },
                    { label: 'О компании', to: '/about' },
                    { label: 'B2B / Производство', to: '/b2b' },
                    { label: 'Связаться', to: '/quote' },
                  ].map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="font-body text-[16px] text-ink hover:text-accent transition-colors py-[6px] border-b border-border last:border-0"
                    >
                      {item.label} →
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div className="border border-border p-[36px] flex flex-col gap-5">
                <h3 className="font-heading text-[20px] font-bold uppercase leading-[1.3] text-ink">
                  Нужна консультация?
                </h3>
                <p className="font-body text-[15px] leading-[1.7] text-secondary">
                  Задайте вопрос по строительству или приобретению недвижимости.
                </p>
                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center h-[48px] px-6 bg-primary rounded-[5px] font-body font-medium text-[16px] text-white hover:bg-primary/90 transition-colors"
                >
                  Оставить заявку
                </Link>
              </div>

            </aside>
          </div>
        </Container>
      </section>

      {/* ── Related articles ─────────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <div className="flex flex-col gap-[48px]">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-[49px] font-bold uppercase leading-[1.2] text-ink">
                Похожие статьи
              </h2>
              <Link
                to="/blog"
                className="font-body font-medium text-[16px] text-primary hover:text-accent transition-colors"
              >
                Все статьи →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to={`/blog/${p.slug}`}
                  className="group bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                >
                  <div className="overflow-hidden aspect-[400/260]">
                    <img loading="lazy" decoding="async"
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-[24px]">
                    <span className="font-body text-[12px] uppercase tracking-[0.1em] text-accent font-medium">
                      {p.category}
                    </span>
                    <h3 className="font-heading text-[18px] font-bold leading-[1.3] text-ink group-hover:text-primary transition-colors">
                      {p.title}
                    </h3>
                    <span className="font-body text-[13px] text-secondary/70">{p.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <NeedHelpSection />
    </main>
  )
}
