import Link from "next/link";
import type { ReactNode } from "react";

/** Bouton principal, contour or, remplissage au survol. */
export function GoldLink({
  href,
  children,
  solid = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  solid?: boolean;
  className?: string;
}) {
  const base =
    "inline-block border px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.3em] transition-all duration-500";
  const style = solid
    ? "border-gold bg-gold text-noir hover:bg-transparent hover:text-gold"
    : "border-gold/60 text-gold hover:bg-gold hover:text-noir hover:border-gold";
  return (
    <Link href={href} className={`${base} ${style} ${className}`}>
      {children}
    </Link>
  );
}
