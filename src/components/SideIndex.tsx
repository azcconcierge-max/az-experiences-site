"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * L'index vertical du brand book : 01 à 06 sur le bord droit, le chapitre
 * courant en ivoire. Un repère discret, sur ordinateur seulement.
 */
export function SideIndex({ locale, items }: { locale: string; items: { href: string; label: string }[] }) {
  const pathname = usePathname() ?? "";
  return (
    <nav
      aria-label="Chapitres"
      className="fixed top-1/2 right-6 z-40 hidden -translate-y-1/2 flex-col gap-3 mix-blend-difference xl:flex"
    >
      {items.map((item, i) => {
        const active = pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-label={item.label}
            title={item.label}
            className={`text-[0.6875rem] leading-none tracking-[0.1em] transition-colors ${
              active ? "text-ivory" : "text-stone/60 hover:text-ivory"
            }`}
          >
            {String(i + 1).padStart(2, "0")}
          </Link>
        );
      })}
      <span className="sr-only">{locale}</span>
    </nav>
  );
}
