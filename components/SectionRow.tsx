import { ReactNode } from "react"

export default function SectionRow({
  label,
  children,
  topAction,
  bottomAction,
  size = "md", // "sm" | "md"
}: {
  label: string
  children: ReactNode
  topAction?: ReactNode
  bottomAction?: ReactNode
  size?: "sm" | "md"
}) {
  const maxW = size === "sm" ? "max-w-[720px]" : "max-w-[960px]"
  return (
    <section className={`mx-auto ${maxW} px-6 md:px-0`}>
      <div className="grid grid-cols-[160px_minmax(0,1fr)] items-start gap-8">
        <div className="pt-2 text-sm text-zinc-500 dark:text-zinc-500">{label}</div>
        <div className="w-full">
          {topAction ? <div className="mb-4 flex justify-center">{topAction}</div> : null}
          {children}
          {bottomAction ? <div className="mt-4 flex justify-center">{bottomAction}</div> : null}
        </div>
      </div>
    </section>
  )
}