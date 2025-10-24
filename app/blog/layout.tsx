import PostList from '@/components/PostList'
import { getAllPosts } from '@/data/posts.server'

export const runtime = 'nodejs'
export const revalidate = 60

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  const posts = getAllPosts()
  return (
    <>
      <main className="md:pl-20">
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          <PostList posts={posts} />
          {children} {/* ← imprescindible para ver el post */}
        </div>
      </main>
    </>
  )
}