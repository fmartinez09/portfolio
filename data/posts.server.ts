import fs from "fs";
import path from "path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  body: string;
};

export function getAllPosts(): Post[] {
  const dir = path.join(process.cwd(), "public/posts");
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));

  return files.map((file) => {
    const body = fs.readFileSync(path.join(dir, file), "utf-8");
    const slug = file.replace(/\.md$/, "");
    return {
      slug,
      title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      date: "2025-10-24",
      category: "Blog",
      excerpt: body.slice(0, 100) + "...",
      body,
    };
  });
}
