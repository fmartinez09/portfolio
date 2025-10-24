'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Home, Layers, PenSquare, Mail, Search } from 'lucide-react'

const items = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/work', icon: Layers, label: 'Work' },
  { href: '/blog', icon: PenSquare, label: 'Blog' },
  { href: '/contact', icon: Mail, label: 'Contact' },
  { href: '/search', icon: Search, label: 'Search' },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0, filter: 'blur(4px)' }}
      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-4 top-0 bottom-0 hidden md:flex flex-col gap-6 pt-16"
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
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition"
            title={label}
          >
            <Icon size={16} />
          </Link>
        </motion.div>
      ))}
    </motion.aside>
  )
}
