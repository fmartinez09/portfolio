import { redirect } from "next/navigation";
import { getAllPosts } from "@/data/posts.server";

export default function BlogIndex() {
  const posts = getAllPosts();
  // asume que están ordenados de más nuevo a más viejo; si no, ordénalos:
  const latest = posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  if (latest) redirect(`/blog/${latest.slug}`);

  return <section className="pt-10 text-zinc-400">Cargando último artículo…</section>;
}

