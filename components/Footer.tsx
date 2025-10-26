"use client"

import { Mail } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  return (
    <footer
      className="
        mt-16 border-t border-zinc-200/40 dark:border-white/10
        /* deja espacio para la tab bar fija en móvil */
        pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0
      "
      role="contentinfo"
    >
      <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-8 text-center">
        <div className="text-sm text-zinc-500">
          © {new Date().getFullYear()} Fernando Martínez. All rights reserved.
        </div>
      </div>
    </footer>
  )
}