"use client";

import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProseProps = {
  children: string;
  className?: string;
};

export default function MarkdownProse({ children, className }: MarkdownProseProps) {
  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1 {...props} className="mt-10 mb-5 text-2xl md:text-3xl font-semibold tracking-tight" />
    ),
    h2: ({ node, ...props }) => (
      <h2 {...props} className="mt-8 mb-4 text-xl md:text-2xl font-semibold tracking-tight" />
    ),
    h3: ({ node, ...props }) => (
      <h3 {...props} className="mt-6 mb-3 text-lg md:text-xl font-medium tracking-tight" />
    ),
    p: ({ node, ...props }) => (
      <p {...props} className="mb-4 text-[15px] leading-7 text-muted-foreground" />
    ),
    ul: ({ node, ...props }) => (
      <ul {...props} className="my-4 ml-5 list-disc space-y-1 marker:text-muted-foreground" />
    ),
    ol: ({ node, ...props }) => (
      <ol {...props} className="my-4 ml-5 list-decimal space-y-1 marker:text-muted-foreground" />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote {...props} className="my-6 border-l-2 pl-4 italic text-muted-foreground" />
    ),
    hr: ({ node, ...props }) => <hr {...props} className="my-6 border-border" />,
    a: ({ node, ...props }) => (
      <a {...props} className="underline underline-offset-4 decoration-border hover:decoration-foreground" />
    ),
    img: (props) => (
      // @ts-ignore
      <img {...props} className="my-6 w-full rounded-2xl border border-border shadow" />
    ),
    code: ({ inline, ...props }: any) => (inline ? <code {...props} /> : <code {...props} />),
    pre: ({ node, ...props }) => (
      <pre
        {...props}
        className="my-6 overflow-x-auto rounded-xl border border-border bg-muted/30 p-4 text-[13.5px]"
      />
    ),
  };

  const base = "prose dark:prose-invert max-w-[620px] mx-auto prose-p:leading-relaxed";
  const merged = [base, className].filter(Boolean).join(" ");

  return (
    <article className={merged}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </article>
  );
}
