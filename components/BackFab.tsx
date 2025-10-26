"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackFab() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="
        lg:hidden fixed left-3 top-3 z-50
        inline-flex items-center gap-1
        rounded-full border border-border
        bg-background/80 backdrop-blur px-3 py-1.5
        text-sm shadow-sm
      "
      aria-label="Volver"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </button>
  );
}
