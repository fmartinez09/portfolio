// components/WritingList.tsx  (Server Component)
import Link from "next/link"
import SectionRow from "./SectionRow"
import { getAllPosts } from "@/data/posts.server"

export default function WritingList({ limit = 3 }: { limit?: number }) {
  const posts = getAllPosts()
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
    .slice(0, limit)

  const viewAllBtn = (
    <Link
      href="/blog"
      className="inline-flex items-center justify-center gap-2 w-full max-w-[720px]
                 rounded-xl border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-white/[0.03] px-5 py-3
                 text-[13px] text-zinc-700 dark:text-zinc-200 transition
                 hover:bg-zinc-100 dark:hover:bg-white/[0.06] hover:text-zinc-900 dark:hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-white/20"
    >
      View all <span aria-hidden>→</span>
    </Link>
  )

  return (
    <SectionRow label="Writing" size="sm" bottomAction={viewAllBtn}>
      <div className="space-y-6">
        {posts.map((p) => (
          <div
            key={p.slug}
            className="group flex items-start justify-between gap-6 transition
                       hover:bg-zinc-50 dark:hover:bg-white/[0.02] rounded-lg p-3 -m-3"
          >
            {/* título + tag */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/blog/${p.slug}`}
                className="block text-[15px] leading-6 text-zinc-700 dark:text-zinc-200 transition
                           hover:text-zinc-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-white/20 rounded"
                aria-label={p.title}
              >
                <span className="line-clamp-2">{p.title}</span>
              </Link>

              {p.category && (
                <span
                  className="mt-2 inline-flex rounded-md border border-zinc-300 dark:border-white/10
                             bg-zinc-100 dark:bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-600 dark:text-zinc-400
                             transition group-hover:border-zinc-400 dark:group-hover:border-white/15"
                >
                  {p.category}
                </span>
              )}
            </div>

            {/* fecha derecha */}
            <time
              dateTime={p.date}
              className="flex-shrink-0 whitespace-nowrap text-[12px] text-zinc-500 dark:text-zinc-500
                         transition group-hover:text-zinc-600 dark:group-hover:text-zinc-400"
            >
              {new Date(p.date).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </div>
        ))}
      </div>
    </SectionRow>
  )
}
