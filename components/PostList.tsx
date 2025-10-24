'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Post } from '@/data/posts.server'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CL', { year:'numeric', month:'short', day:'numeric' })
}

export default function PostList({ posts }: { posts: Post[] }) {
  const pathname = usePathname()
  const active = pathname.split('/').pop()

  if (!posts?.length) {
    return <aside className="pt-10 pr-4"><p className="text-zinc-500">No hay artículos aún.</p></aside>
  }

  return (
    <aside className="sticky top-0 h-[100dvh] overflow-y-auto pt-10 pr-4">
      <h2 className="mb-4 text-sm font-semibold text-zinc-400">Posts</h2>
      <div className="space-y-6">
        <ul className="space-y-3">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link
                prefetch
                href={`/blog/${encodeURIComponent(p.slug)}`}
                className={`block rounded-xl border p-3 transition ${
                  active === p.slug ? 'bg-white/10 border-white/10' : 'bg-white/[0.03] border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="text-sm font-medium">{p.title}</div>
                {p.excerpt && <div className="text-xs text-zinc-500 line-clamp-2">{p.excerpt}</div>}
                <div className="mt-1 text-[11px] text-zinc-500">{formatDate(p.date)}</div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
