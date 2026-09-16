"use client";

import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";

/**
 * Bouton de la maison : entièrement arrondi, Hanken regular.
 * Variantes : club (vert sur lin), lin (lin sur dégradé), outline (hérite la
 * couleur du contexte). Légèrement magnétique au survol.
 */
export function Button({
  href,
  children,
  variant = "outline",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "club" | "lin" | "outline";
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    el.style.transform = `translate(${dx * 4}px, ${dy * 3}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const base =
    "inline-block rounded-full px-8 py-3.5 font-sans text-[0.9rem] font-normal tracking-[0.02em] transition-all duration-500 will-change-transform";
  const styles = {
    club: "bg-club text-lin hover:bg-nuit",
    lin: "bg-lin text-club hover:bg-ivory-soft",
    outline: "border border-current opacity-90 hover:opacity-60",
  }[variant];

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Compatibilité avec l'ancien nom : solid = vert club, sinon contour. */
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
  return (
    <Button href={href} variant={solid ? "club" : "outline"} className={className}>
      {children}
    </Button>
  );
}
