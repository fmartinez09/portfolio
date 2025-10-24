'use client'
import React from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownProse({ children }: { children: string }) {
  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1 {...props} className="mt-12 text-4xl md:text-5xl font-semibold tracking-tight" />
    ),
    h2: ({ node, ...props }) => (
      <h2 {...props} className="mt-10 text-2xl md:text-3xl font-semibold tracking-tight" />
    ),
    h3: ({ node, ...props }) => (
      <h3 {...props} className="mt-8 text-xl font-semibold tracking-tight" />
    ),
    p: ({ node, ...props }) => <p {...props} className="leading-7 text-zinc-300" />,
    ul: ({ node, ...props }) => (
      <ul {...props} className="my-6 ml-6 list-disc marker:text-zinc-500 space-y-2" />
    ),
    ol: ({ node, ...props }) => (
      <ol {...props} className="my-6 ml-6 list-decimal marker:text-zinc-500 space-y-2" />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote {...props} className="my-6 border-l-2 pl-4 italic text-zinc-400" />
    ),
    hr: ({ node, ...props }) => <hr {...props} className="my-10 border-white/10" />,
    a: ({ node, ...props }) => (
      <a
        {...props}
        className="underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
      />
    ),
    img: (props) => (
      // @ts-ignore
      <img {...props} className="my-6 w-full rounded-2xl border border-white/10 shadow" />
    ),

    // ✅ SOLO inline code aquí
    code: ({ inline, ...props }: any) =>
      inline ? (
        <code {...props} />
      ) : (
        // para bloques lo renderiza <pre> y aquí solo dejamos <code>
        <code {...props} />
      ),

    // ✅ Bloques de código aquí (no dentro de <p>)
    pre: ({ node, ...props }) => (
      <pre
        {...props}
        className="my-6 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-4"
      />
    ),
  }

  return (
    <article className="prose prose-invert prose-lg max-w-[680px] mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </article>
  )
}
