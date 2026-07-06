"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Bouton principal, contour or, remplissage au survol.
 * Magnétique : il glisse légèrement vers le curseur (desktop),
 * détail signature des sites travaillés.
 */
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
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `translate(${dx * 5}px, ${dy * 4}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "inline-block border px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.3em] transition-all duration-500 will-change-transform";
  const style = solid
    ? "border-gold bg-gold text-noir hover:bg-transparent hover:text-gold"
    : "border-gold/60 text-gold hover:bg-gold hover:text-noir hover:border-gold";

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </Link>
  );
}
