"use client"

import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  return (
   <footer className="mt-16 border-t border-zinc-200/40 dark:border-white/10">

      <div className="mx-auto max-w-[720px] px-6 py-12 text-center">
        {/*
        <div className="flex items-center justify-center text-zinc-400">
          <Mail className="h-6 w-6" />
        </div>
        
        <h3 className="mt-4 text-[18px] font-semibold text-zinc-100">Subscribe to my newsletter</h3>
        <p className="mt-2 text-sm text-zinc-400">
          I send out a biweekly newsletter where I share updates on my latest case studies, essays and products.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            // placeholder: wire up subscription provider here
            console.log('subscribe', email)
          }}
          className="mt-6 flex items-center gap-3"
          aria-label="Subscribe to newsletter"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="name@email.com"
            className="flex-1 rounded-full border border-zinc-700 bg-transparent px-4 py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
          <button
            type="submit"
            className="rounded-full bg-zinc-700 px-4 py-3 text-sm font-medium text-white hover:bg-zinc-600"
          >
            Enter to subscribe
          </button>
        </form>

        <div className="mt-3 text-xs text-zinc-500">Join 1500 + subscribers</div>
        */}

        <div className="mt-8 text-sm text-zinc-500">
          © {new Date().getFullYear()} Fernando Martínez. All rights reserved.
        </div>


      </div>
    </footer>
  )
}
