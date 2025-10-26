import { ReactNode } from "react";

type Props = {
  label: string;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  bottomAction?: ReactNode; // 👈 NUEVO
};

export default function SectionRow({
  label,
  size = "md",
  className = "",
  children,
  bottomAction,
}: Props) {
  return (
    <section
      className={[
        // 1 col en móvil; dos columnas desde md
        "grid grid-cols-1 md:grid-cols-[140px_minmax(0,1fr)] items-start gap-3 md:gap-6",
        className,
      ].join(" ")}
    >
      {/* Etiqueta */}
      <div className="md:sticky md:top-20">
        <div
          className={[
            "text-[11px] md:text-xs uppercase tracking-wide text-muted-foreground",
            size === "sm" ? "mt-1" : "md:mt-2",
          ].join(" ")}
        >
          {label}
        </div>
      </div>

      {/* Contenido */}
      <div className="space-y-6">{children}</div>

      {/* Acción inferior opcional (View all, etc.) */}
      {bottomAction && (
        <div className="mt-3 md:mt-4 md:col-start-2">
          <div className="flex justify-start md:justify-end">
            {bottomAction}
          </div>
        </div>
      )}
    </section>
  );
}