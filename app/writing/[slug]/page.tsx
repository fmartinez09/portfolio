import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <>
      <main className="md:pl-20">
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          <aside className="sticky top-0 h-[calc(100dvh-2rem)] overflow-y-auto pt-10 pr-4">
            <h2 className="mb-4 text-sm font-semibold text-zinc-400">Writing</h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <a href={`/writing/${p.slug}`} className={`block rounded-xl border border-white/10 p-3 ${p.slug===post.slug?'bg-white/10':'bg-white/[0.03] hover:bg-white/10'}`}>
                    <div className="text-sm font-medium">{p.title}</div>
                    <div className="text-xs text-zinc-500">{new Date(p.date).toDateString()}</div>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          <article className="pt-10">
            {post.cover && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-white/10">
                <Image src={post.cover} alt={post.title} width={1280} height={720} className="h-auto w-full" />
              </div>
            )}
            <div className="text-xs text-zinc-500">{new Date(post.date).toDateString()}</div>
            <h1 className="mt-2 text-3xl font-semibold leading-tight">{post.title}</h1>
            <div className="mt-2">
              <Badge variant="secondary" className="bg-white/10">{post.category}</Badge>
            </div>
            <div className="prose prose-invert mt-6 max-w-none">
              <p>{post.body}</p>
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
