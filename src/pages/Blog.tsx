import { Link } from 'react-router-dom'
import { Container } from '@/components/Container'
import { posts } from '@/data/blog'
import NeedHelpSection from '@/components/home/NeedHelpSection'
import { useTranslation } from '@/i18n'
import { useLocalizedPosts } from '@/i18n/blogI18n'
import type { BlogPost } from '@/data/blog'

function BlogCard({ post }: { post: BlogPost }) {
  const { t } = useTranslation()
  return (
    <Link to={`/blog/${post.slug}`} className="group flex flex-col gap-0 bg-white overflow-hidden hover:shadow-lg transition-shadow">
      <div className="overflow-hidden aspect-[556/360]">
        <img loading="lazy" decoding="async"
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col gap-4 p-[32px]">
        <div className="flex items-center gap-4">
          <span className="font-body text-[13px] uppercase tracking-[0.1em] text-accent font-medium">
            {post.category}
          </span>
          <span className="text-border">•</span>
          <span className="font-body text-[13px] text-secondary/70">{post.date}</span>
          <span className="text-border">•</span>
          <span className="font-body text-[13px] text-secondary/70">{post.readTime}</span>
        </div>
        <h3 className="font-heading text-[22px] font-bold leading-[1.3] text-ink group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="font-body text-[15px] leading-[1.7] text-secondary line-clamp-2">
          {post.excerpt}
        </p>
        <span className="font-body text-[14px] font-medium text-accent mt-1 group-hover:underline">
          {t('pages.blog.readMore')} →
        </span>
      </div>
    </Link>
  )
}

export default function Blog() {
  const { t, tx } = useTranslation()
  const localizedPosts = useLocalizedPosts(posts)
  const filters = tx<string[]>('pages.blog.filters')
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="bg-primary py-[100px]">
        <Container>
          <div className="flex items-end justify-between gap-8">
            <h1 className="font-heading text-[80px] max-lg:text-[52px] max-sm:text-[38px] font-bold uppercase leading-[1.1] text-bg-subtle max-w-[900px]">
              {t('pages.blog.heroTitle')}
            </h1>
            <p className="font-body text-[18px] leading-[1.7] text-white/70 w-[440px] shrink-0 self-end">
              {t('pages.blog.heroDesc')}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Blog grid ────────────────────────────────────── */}
      <section className="bg-bg-subtle py-[100px]">
        <Container>
          <div className="flex flex-col gap-[60px]">

            {/* Filter row */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 flex-wrap">
                {filters.map((cat, i) => (
                  <button
                    key={cat}
                    type="button"
                    className={`h-[40px] px-5 font-body text-[14px] font-medium border transition-colors ${
                      i === 0
                        ? 'bg-primary text-white border-primary'
                        : 'bg-white text-ink border-border hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid grid-cols-3 gap-6">
              {localizedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`size-[48px] font-body text-[16px] font-medium border transition-colors ${
                    p === 1
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-ink border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                type="button"
                className="size-[48px] font-body text-[16px] font-medium bg-white text-ink border border-border hover:border-primary hover:text-primary transition-colors"
              >
                →
              </button>
            </div>

          </div>
        </Container>
      </section>

      <NeedHelpSection />
    </main>
  )
}
