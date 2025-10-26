'use client'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import clsx from 'clsx' // 👈 opcional, si no lo tienes, puedes concatenar strings manualmente

type ThemeToggleProps = {
  className?: string
}

export default function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <button
        aria-hidden
        className={clsx(
          'grid h-9 w-9 place-items-center rounded-lg border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-white/5',
          className
        )}
        style={{ opacity: 0 }}
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={clsx(
        'grid h-9 w-9 place-items-center rounded-lg border border-zinc-300 dark:border-white/10 bg-zinc-50 dark:bg-white/5 hover:bg-zinc-100 dark:hover:bg-white/10 transition',
        className
      )}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun size={16} className="text-zinc-600 dark:text-zinc-200" />
      ) : (
        <Moon size={16} className="text-zinc-600 dark:text-zinc-200" />
      )}
    </button>
  )
}
