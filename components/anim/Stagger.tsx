'use client'
import { motion, type Variants } from 'framer-motion'
import type { ReactNode, ElementType } from 'react'

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.4, when: 'beforeChildren', staggerChildren: 0.06 },
  },
}

export const itemVariant: Variants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

export function Stagger({
  children, as: As = 'div', className = '',
}: { children: ReactNode; as?: ElementType; className?: string }) {
  const M = motion(As as any)
  return (
    <M
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </M>
  )
}

export function Item({
  children, as: As = 'div', className = '',
}: { children: ReactNode; as?: ElementType; className?: string }) {
  const M = motion(As as any)
  return (
    <M variants={itemVariant} className={className}>
      {children}
    </M>
  )
}
