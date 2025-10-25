// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/posts.server";
import MarkdownProse from "@/components/MarkdownProse";
import PostHeadingFx from "@/components/PostHeadingFx"; // 👈 importa el efecto

export const revalidate = 60;

type ParamsPromise = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: ParamsPromise }
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return { title: post?.title ?? "Blog" };
}

export default async function PostPage(
  { params }: { params: ParamsPromise }
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const body = post.body ?? "";
  const noH1 = body.replace(/^\s*# .*\n+/, "");

  let lead = (post as any).excerpt?.trim() ?? "";
  let rest = noH1.trimStart();

  if (!lead) {
    const m = /\n\s*\n/.exec(noH1);
    if (m && m.index > 0) {
      lead = noH1.slice(0, m.index).trim();
      rest = noH1.slice(m.index + m[0].length).trimStart();
    } else {
      lead = "";
      rest = noH1 || body;
    }
  }
  if (!rest) rest = noH1 || body;

  const author = (post as any).author ?? "Fernando Martínez";

  return (
    <main className="py-6 md:py-8">
      <div className="relative mx-auto max-w-2xl px-4 md:px-0">
        <div className="h-px w-full bg-border mb-8" />

        {/* 👇 Título + meta + lead con efecto */}
        <PostHeadingFx
          title={post.title}
          meta={`${fmt(post.date)} · By ${author}`}
          lead={lead}
        />

        {/* Cover 16:9 */}
        {post.cover && (
          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
          </div>
        )}

        {/* Cuerpo */}
        <div className="mt-8">
          <MarkdownProse
            className="
    /* texto general más compacto */
    prose-p:mb-3 prose-p:leading-7 prose-p:text-[14.5px]
    prose-li:my-0.5 prose-li:leading-7 prose-li:text-[14.5px]

    /* code blocks súper compactos */
    prose-pre:my-3 prose-pre:p-3 prose-pre:text-[12px] prose-pre:leading-[1.35]
    prose-code:text-[12px] prose-code:leading-[1.35] prose-code:font-medium

    /* titulares un poco más contenidos */
    prose-h2:mt-7 prose-h2:mb-2 prose-h2:text-[19px]
    prose-h3:mt-5 prose-h3:mb-2 prose-h3:text-[16px]

    /* imágenes: menos espacio vertical */
    prose-img:my-5
  "
          >
            {rest}
          </MarkdownProse>
        </div>
      </div>
    </main>
  );
}
