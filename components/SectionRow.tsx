import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // si no tienes cn, puedes quitarlo y unir clases manualmente

type Props = {
  label: string;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
};

export default function SectionRow({ label, size = "md", className, children }: Props) {
  return (
    <section
      className={cn(
        // 1 col en móvil, dos columnas desde md:
        "grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] items-start gap-3 md:gap-6",
        className
      )}
    >
      {/* Etiqueta */}
      <div className="md:sticky md:top-20">
        <div
          className={cn(
            "text-[11px] md:text-xs uppercase tracking-wide text-muted-foreground",
            size === "sm" ? "mt-1" : "md:mt-2"
          )}
        >
          {label}
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-6">{children}</div>
    </section>
  );
}