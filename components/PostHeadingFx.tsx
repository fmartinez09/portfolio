// components/PostHeadingFx.tsx
"use client";

import { motion } from "framer-motion";

export default function PostHeadingFx({
  title,
  meta,
  lead,
}: {
  title: string;
  meta: string; // ej: "28 sept 2025 · By Fernando Martínez"
  lead?: string;
}) {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, filter: "blur(20px)", y: 8, scale: 0.97 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="text-[28px] md:text-[40px] font-semibold tracking-tight leading-tight"
      >
        {title}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.05 }}
        className="mt-2 text-[13px] text-muted-foreground"
      >
        {meta}
      </motion.div>

      {lead ? (
        <motion.p
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.12 }}
          className="mt-5 text-[15px] md:text-[16px] leading-7 text-muted-foreground"
        >
          {lead}
        </motion.p>
      ) : null}
    </>
  );
}
