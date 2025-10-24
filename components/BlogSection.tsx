import BlogCard from './BlogCard'
import { getAllPosts } from '@/data/posts.server'

export default function BlogSection() {
  const posts = getAllPosts()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))

  return (
    <section className="mx-auto mt-14 max-w-[720px] px-6 md:px-0">
      <h2 className="mb-3 text-[13px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Blog
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map(p => (
          <BlogCard
            key={p.slug}
            slug={p.slug}
            title={p.title}
            date={p.date}
            tag={p.category}
            excerpt={p.excerpt ?? p.body.slice(0, 120)}
          />
        ))}
      </div>
    </section>
  )
}
