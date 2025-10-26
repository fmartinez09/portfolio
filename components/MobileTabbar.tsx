"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, PenSquare, PlusCircle } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/blog", label: "Blog", Icon: PenSquare },
  { href: "/about", label: "About", Icon: PlusCircle },
];

export default function MobileTabbar() {
  const path = usePathname();

  return (
    <nav
      className="
    lg:hidden fixed inset-x-0 bottom-0 z-[60]
    border-t border-border
    bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60
    shadow-[0_-6px_12px_-6px_rgba(0,0,0,0.15)]
  "
      style={{
        paddingBottom: "env(safe-area-inset-bottom)", // notch / barras del SO
      }}
      aria-label="Mobile navigation"
    >
      <ul className="grid grid-cols-3 h-16"> {/* +alto para que no quede “al ras” */}
        {items.map(({ href, label, Icon }) => {
          const active = path === href || (href !== "/" && path.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center justify-center py-2 text-xs ${active ? "text-foreground" : "text-muted-foreground"
                  }`}
                aria-current={active ? "page" : undefined}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-0.5">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
