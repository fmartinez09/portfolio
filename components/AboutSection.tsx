// components/AboutSection.tsx
'use client'
import { motion } from "framer-motion"
import SectionRow from "./SectionRow"

export default function AboutSection() {
  return (
    <SectionRow label="About">
      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-5 text-[15px] leading-8 text-zinc-300"
      >
        <p>
          I'm Fernando, a multidisciplinary software engineer based in Chile. I focus on
          distributed systems and databases, crafting products with high visual polish without
          sacrificing technical robustness.
        </p>
        <p>
          With experience across full-stack apps, data, and infra, I enjoy shipping clean UX,
          pragmatic APIs, and reliable storage layers.
        </p>
        <p>
          Whether collaborating with cross-functional teams or leading initiatives, I care about
          clarity, performance and maintainability.
        </p>
      </motion.div>
    </SectionRow>
  )
}
