// components/ProfileHeader.tsx
'use client'
import { Mail, Copy, Dot, Github, Linkedin } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function ProfileHeader() {
  const [copied, setCopied] = useState(false)
  const email = 'contact@fernandomartinez.dev'

  const copy = async () => {
    await navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <header className="mx-auto flex max-w-[720px] flex-col items-center pt-10 text-center md:pt-16">
      {/* hora pequeñita */}
      <div className="mb-5 text-[11px] tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
        {new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}
      </div>

      {/* avatar */}
      <div className="mb-5">
        <Image
          src="/me.png"
          alt="Fernando"
          width={100}
          height={100}
          className="rounded-full ring-2 ring-zinc-300 dark:ring-white/10"
        />
      </div>

      {/* nombre + rol */}
      <h1 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        Fernando Martínez
      </h1>
      <p className="mt-1 text-[15px] text-zinc-600 dark:text-zinc-400">Software Engineer</p>

      {/* availability */}
      <div className="mt-2 flex items-center gap-2 text-[13px] text-zinc-600 dark:text-zinc-400">
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        </span>
        <span>Available for new opportunities</span>
      </div>

      {/* social icons (usa tus enlaces reales) */}
      <ul className="mt-4 flex items-center gap-5 text-zinc-600 dark:text-zinc-500">
        <li>
          <a
            className="opacity-70 transition hover:opacity-100"
            href="https://github.com/fmartinez09"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
        </li>
        <li>
          <a
            className="opacity-70 transition hover:opacity-100"
            href="https://www.linkedin.com/in/fmartinez01/"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </li>
        {/* agrega más si quieres */}
      </ul>

      {/* botones */}
      <div className="mt-6 flex items-center gap-3">
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 text-[13px] font-medium shadow-sm hover:bg-zinc-800 dark:hover:bg-white/90"
        >
          <Mail className="h-4 w-4" />
          Contact me
        </a>

        <button
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-white/5 px-4 py-2 text-[13px] text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/[0.08]"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copied!' : 'Copy email'}
        </button>
      </div>

      {/* ubicación con separadores */}
      <div className="mt-4 flex items-center text-[12px] text-zinc-500 dark:text-zinc-500">
        <span>CL, Temuco</span>
        {/*
        <Dot className="mx-1 h-4 w-4 text-zinc-500 dark:text-zinc-600" />
        
        <span>−33.45° S</span>
        <Dot className="mx-1 h-4 w-4 text-zinc-500 dark:text-zinc-600" />
        <span>−70.66° W</span>
        */}
      </div>

      {/* about breve */}
      <p className="mx-auto mt-8 max-w-[680px] text-[15px] leading-8 text-zinc-600 dark:text-zinc-300">
        I'm a software engineer focused on distributed systems and databases — learning fault-tolerant storage engines, consensus protocols, query processing, and high-reliability, low-latency architectures.
        Interested in building and understanding robust storage and query layers that form the backbone of modern data infrastructure.
      </p>
    </header>
  )
}
