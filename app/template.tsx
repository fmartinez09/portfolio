// app/template.tsx
'use client'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <MotionConfig transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
      <AnimatePresence mode="wait" initial={true}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
          className=""
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
