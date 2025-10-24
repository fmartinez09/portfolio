"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";

export default function ProjectCard({
  title, cover, subtitle,
}: { title: string; cover: string; subtitle?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden border-white/10 bg-white/[0.03]">
        <div className="aspect-[16/9] w-full">
          <Image src={cover} alt={title} width={1280} height={720} className="h-full w-full object-cover" />
        </div>
        <div className="p-4">
          <div className="text-sm text-zinc-400">{subtitle}</div>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
        </div>
      </Card>
    </motion.div>
  );
}
