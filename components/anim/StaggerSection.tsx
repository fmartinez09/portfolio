'use client'
import { motion } from 'framer-motion'

export function StaggerSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { when: 'beforeChildren', staggerChildren: 0.06 },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const child = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.45, ease: [0.22,1,0.36,1] } },
}
