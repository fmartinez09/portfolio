'use client'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  amount?: number // 0..1 qué % debe entrar al viewport
}

export default function Reveal({
  children, delay = 0, className = '', amount = 0.3,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
  className={className}
    >
      {children}
    </motion.div>
  )
}
