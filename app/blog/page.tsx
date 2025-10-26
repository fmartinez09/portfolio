import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/data/posts.server";
import BlurredHeading from "@/components/BlurredHeading"; // 👈 importa el componente

export const revalidate = 60;

export default function BlogIndex() {
  const posts = getAllPosts()
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (posts.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 text-muted-foreground">
        Aún no hay artículos.
      </section>
    );
  }

  const [latest, ...rest] = posts;

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("es-CL", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const take = (s: string, n = 160) =>
    s.replace(/\s+/g, " ").trim().slice(0, n) + (s.length > n ? "…" : "");

  const author = (latest as any).author ?? "Fernando Martínez";

  return (
    <main className="py-10 pb-24 lg:pb-10">
      {/* Rails laterales */}
      <div
      className={[
        "relative mx-auto max-w-6xl px-5 md:px-8",
        "before:content-[''] before:absolute before:inset-y-0 before:left-3 md:before:left-6 before:w-px before:bg-border",
        "after:content-[''] after:absolute after:inset-y-0 after:right-3 md:after:right-6 after:w-px after:bg-border",
      ].join(" ")}
    >
        {/* Header con efecto Framer */}
        <BlurredHeading
          title="Blog"
          subtitle="Articles on databases, distributed systems, and the process behind my projects. Practical ideas for improving design, performance, and team collaboration."
          className="pt-2"
        />

        {/* HERO SIDE-BY-SIDE (compacto) */}
        <article className="mx-auto mt-10 w-full max-w-4xl rounded-[28px] border border-border bg-card/80 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-card/70 overflow-hidden">
          <div className="flex flex-col md:flex-row md:h-[320px]">
            {/* Imagen izquierda */}
            <div className="md:w-1/2 aspect-[16/10] md:aspect-auto md:h-full border-b md:border-b-0 md:border-r border-border overflow-hidden">
              {latest.cover ? (
                <Image
                  src={latest.cover}
                  alt={latest.title}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover"
                  priority
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
            </div>

            {/* Texto derecha */}
            <div className="md:w-1/2 p-5 md:p-6 flex flex-col justify-center gap-1">
              <div className="text-[11px] md:text-xs text-muted-foreground">
                {fmt(latest.date)} · por {(latest as any).author ?? "Fernando Martínez"}
              </div>

              <h2 className="mt-1 text-[18px] md:text-[20px] font-semibold leading-snug">
                <Link
                  href={`/blog/${latest.slug}`}
                  className="hover:underline decoration-foreground/30"
                >
                  {latest.title}
                </Link>
              </h2>

              {latest.category && (
                <div className="mt-2">
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] md:text-[11px] text-accent-foreground">
                    {latest.category}
                  </span>
                </div>
              )}

              <p className="mt-2 text-[13px] md:text-[14px] leading-6 text-muted-foreground line-clamp-3">
                {latest.excerpt ?? take(latest.body ?? "")}
              </p>

              <div className="mt-4">
                <Link
                  href={`/blog/${latest.slug}`}
                  className="inline-flex items-center rounded-xl border border-border bg-secondary px-3 py-2 text-sm text-secondary-foreground hover:opacity-90"
                >
                  Read
                </Link>
              </div>
            </div>
          </div>
        </article>


        {/* Línea divisoria */}
        <div className="relative mt-10">
          <div className="h-px w-full bg-border" />
        </div>

        {/* GRID del resto */}
        <section className="mx-auto mt-10 w-full max-w-4xl grid gap-6 md:grid-cols-2">
          {rest.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group overflow-hidden rounded-[24px] border border-border bg-card hover:bg-card/90 transition-colors"
            >
              <div className="aspect-[16/10] w-full overflow-hidden border-b border-border">
                {"cover" in p && (p as any).cover ? (
                  <Image
                    src={(p as any).cover}
                    alt={p.title}
                    width={900}
                    height={560}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>
              <div className="p-4">
                <div className="text-[11px] text-muted-foreground">{fmt((p as any).date)}</div>
                <h3 className="mt-1 text-[18px] md:text-[20px] font-semibold leading-snug group-hover:underline decoration-foreground/30">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-[14px] leading-6 text-muted-foreground">
                  {"excerpt" in p && (p as any).excerpt ? (p as any).excerpt : take((p as any).body ?? "", 140)}
                </p>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
