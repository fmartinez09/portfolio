// components/BlogCard.tsx
import Link from 'next/link'
import { Boxes } from 'lucide-react'

type BlogCardProps = {
  slug: string
  title: string
  date: string
  excerpt?: string
  tag?: string
}

export default function BlogCard({ slug, title, date, excerpt, tag }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
    >
      <div className="mb-3 flex items-center gap-2 text-zinc-300">
        <Boxes className="h-4 w-4 text-zinc-400" />
        <span className="text-[13px]">{title}</span>
      </div>

      {/* mini meta */}
      <div className="mb-3 flex items-center gap-2 text-[12px] text-zinc-500">
        <span>{new Date(date).toLocaleDateString('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        {tag && (
          <>
            <span>·</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px]">{tag}</span>
          </>
        )}
      </div>

      {excerpt && (
        <p className="line-clamp-3 text-[13.5px] leading-6 text-zinc-400">
          {excerpt}
        </p>
      )}
    </Link>
  )
}
