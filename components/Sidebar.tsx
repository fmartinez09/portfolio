'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, PenSquare, PlusCircle } from "lucide-react";
import ThemeToggle from './ThemeToggle'

const items = [
  { href: '/', icon: Home, label: 'Home' },
  // { href: '/work', icon: Layers, label: 'Work' },
  { href: '/blog', icon: PenSquare, label: 'Blog' },
  // { href: '/contact', icon: Mail, label: 'Contact' },
   { href: '/about', icon: PlusCircle, label: 'About' },
  // { href: '/search', icon: Search, label: 'Search' },
]

export default function Sidebar() {
  return (
    <>
      {/* Vertical Line Separator */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-16 top-0 bottom-0 hidden md:block w-px bg-zinc-200/40 dark:bg-white/10 origin-top z-50"

      />
      
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0, filter: 'blur(1px)' }}
        animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-6 z-50"
      >
        {items.map(({ href, icon: Icon, label }, i) => (
          <motion.div
            key={href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
          >
            <Link
              href={href}
              className="grid h-9 w-9 place-items-center rounded-lg border border-zinc-200/50 dark:border-white/10 bg-zinc-50/80 dark:bg-white/5 hover:bg-zinc-100/70 dark:hover:bg-white/10 transition"

              title={label}
            >
              <Icon size={16} className="text-zinc-600 dark:text-zinc-200" />
            </Link>
          </motion.div>
        ))}
        
        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + items.length * 0.05, duration: 0.4 }}
        >
          <ThemeToggle />
        </motion.div>
      </motion.aside>
    </>
  )
}
