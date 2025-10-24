'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end','end start'] })
  const y = useTransform(scrollYProgress, [0,1], ['-8%', '8%'])

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl border border-white/10">
      <motion.div style={{ y }}>
        <Image src={src} alt={alt} width={1280} height={720} className="w-full h-auto object-cover" />
      </motion.div>
    </div>
  )
}
