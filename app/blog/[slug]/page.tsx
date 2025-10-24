import MarkdownProse from '@/components/MarkdownProse'
import { getAllPosts } from '@/data/posts.server'
import { notFound } from 'next/navigation'

export default async function PostPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const dateFmt = new Date(post.date).toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <section className="flex-1 px-6 md:px-12 py-16 overflow-y-auto">
      <div className="max-w-[720px] mx-auto">
        {/* Fecha y título 
        <div className="mb-8">
          <div className="text-sm text-zinc-500">{dateFmt}</div>
          <h1 className="mt-2 text-4xl md:text2xl font-semibold tracking-tight text-zinc-100">
            {post.title}
          </h1>
          <div className="mt-3 inline-flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[11px] text-zinc-300">
              {post.category}
            </span>
          </div>
        </div>
        

        Opcional: metadatos 
        <dl className="grid grid-cols-2 gap-y-2 text-sm text-zinc-400 mb-10">
          <dt>Cliente</dt><dd>Alpha</dd>
          <dt>Timeline</dt><dd>Jan 22 – Jul 22</dd>
          <dt>Rol</dt><dd>Product Designer</dd>
          <dt>Outcome</dt><dd>+45% conversion</dd>
        </dl>

         Divider sutil *
        <div className="my-6 h-px w-full bg-white/10" />

         Contenido markdown */}
        <MarkdownProse>{post.body}</MarkdownProse>
      </div>
    </section>
  )
}
