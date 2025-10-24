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
      className="inline-flex w-full items-center justify-center gap-2
                 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3
                 text-[13px] text-zinc-200 transition
                 hover:bg-white/[0.06] hover:text-white
                 focus:outline-none focus:ring-2 focus:ring-white/20"
    >
      View all <span aria-hidden>→</span>
    </Link>
  )

  return (
    <SectionRow label="Writing" size="sm" topAction={viewAllBtn} bottomAction={viewAllBtn}>
      <ul
        className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]
                   shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset]"
      >
        {posts.map((p) => (
          <li
            key={p.slug}
            className="group grid grid-cols-[1fr_auto] gap-6 p-4 transition
                       hover:bg-white/[0.05] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]
                       focus-within:bg-white/[0.05]"
          >
            {/* título + tag */}
            <div>
              <Link
                href={`/blog/${p.slug}`}
                className="block text-[15px] leading-6 text-zinc-200 transition
                           hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20 rounded"
                aria-label={p.title}
              >
                <span className="line-clamp-2">{p.title}</span>
              </Link>

              {p.category && (
                <span
                  className="mt-2 inline-flex rounded-md border border-white/10
                             bg-white/[0.04] px-2 py-0.5 text-[11px] text-zinc-400
                             transition group-hover:border-white/15"
                >
                  {p.category}
                </span>
              )}
            </div>

            {/* fecha derecha */}
            <time
              dateTime={p.date}
              className="self-start whitespace-nowrap text-[12px] text-zinc-500
                         transition group-hover:text-zinc-400"
            >
              {new Date(p.date).toLocaleDateString("es-CL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </time>
          </li>
        ))}
      </ul>
    </SectionRow>
  )
}
