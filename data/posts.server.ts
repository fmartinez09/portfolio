import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  body: string;
  cover?: string;
};

export function getAllPosts(): Post[] {
  const dir = path.join(process.cwd(), "public/posts");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const slug = file.replace(/\.md$/, "");
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: data.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      date: data.date ?? "2025-10-24",
      category: data.category ?? "Blog",
      excerpt: data.excerpt ?? content.slice(0, 100) + "...",
      author: data.author ?? "Fernando Martínez",
      cover: data.cover,
      body: content,
    };
  });
}

export function getPostBySlug(slug: string): Post | null {
  const dir = path.join(process.cwd(), "public/posts");
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    date: data.date ?? "2025-10-24",
    category: data.category ?? "Blog",
    excerpt: data.excerpt ?? content.slice(0, 100) + "...",
    author: data.author ?? "Fernando Martínez",
    cover: data.cover,
    body: content,
  };
}
