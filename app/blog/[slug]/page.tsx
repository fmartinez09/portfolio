// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/data/posts.server";
import MarkdownProse from "@/components/MarkdownProse";

export const revalidate = 60;

// En tu runtime, params es un Promise:
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

  // --- Preparar contenido ---
  const body = post.body ?? "";

  // 1) quita H1 inicial si existe (por si el .md arranca con "# Título")
  const noH1 = body.replace(/^\s*# .*\n+/, "");

  // 2) lead + resto con fallback seguro
  let lead = (post as any).excerpt?.trim() ?? "";
  let rest = noH1.trimStart();

  if (!lead) {
    const m = /\n\s*\n/.exec(noH1); // primer párrafo hasta línea en blanco
    if (m && m.index > 0) {
      lead = noH1.slice(0, m.index).trim();
      rest = noH1.slice(m.index + m[0].length).trimStart();
    } else {
      // si no hay doble salto, no separamos: mostramos todo
      lead = "";
      rest = noH1 || body;
    }
  }
  if (!rest) rest = noH1 || body;

  const author = (post as any).author ?? "Fernando Martínez";

  return (
    <main className="py-10">
      <div className="relative mx-auto max-w-3xl px-5 md:px-0">
        {/* corte superior */}
        <div className="h-px w-full bg-border mb-8" />

        {/* título + byline */}
        <h1 className="text-[28px] md:text-[40px] font-semibold tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="mt-2 text-[13px] text-muted-foreground">
          {fmt(post.date)} <span className="mx-1">·</span> <strong>By {author}</strong>
        </div>

        {/* lead */}
        {lead && (
          <p className="mt-5 text-[15px] md:text-[16px] leading-7 text-muted-foreground">
            {lead}
          </p>
        )}

        {/* cover dentro del post (como en la referencia) */}
        {post.cover && (
          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
            <img
              src={post.cover}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        {/* cuerpo */}
        <div className="mt-8">
          <MarkdownProse>{rest}</MarkdownProse>
        </div>
      </div>
    </main>
  );
}
