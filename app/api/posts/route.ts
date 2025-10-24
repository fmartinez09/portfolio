import { NextResponse } from "next/server";
import { getAllPosts } from "@/data/posts.server";

export async function GET() {
  const posts = getAllPosts();
  return NextResponse.json(posts);
}