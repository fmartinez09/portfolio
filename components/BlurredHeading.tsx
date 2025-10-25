// components/BlurredHeading.tsx
"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

export default function BlurredHeading({ title, subtitle, className }: Props) {
  return (
    <div className={`mx-auto max-w-3xl text-center ${className ?? ""}`}>
      <motion.h1
        initial={{ opacity: 0, filter: "blur(20px)", scale: 0.96, y: 8 }}
        animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="
          text-[28px] md:text-[34px] font-semibold tracking-tight
          text-transparent bg-clip-text
          bg-gradient-to-b from-foreground/90 to-foreground/90
        "
      >
        {title}
      </motion.h1>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          className="mt-3 text-sm md:text-base text-muted-foreground leading-6"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
