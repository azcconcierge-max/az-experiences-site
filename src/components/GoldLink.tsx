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

  // Onde lin très douce depuis le point cliqué
  const onClick = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const wave = document.createElement("span");
    wave.className = "ripple";
    wave.style.width = wave.style.height = `${size}px`;
    wave.style.left = `${e.clientX - rect.left - size / 2}px`;
    wave.style.top = `${e.clientY - rect.top - size / 2}px`;
    el.appendChild(wave);
    window.setTimeout(() => wave.remove(), 700);
  };

  const base =
    "group relative inline-flex items-center gap-2.5 overflow-hidden px-6 py-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.15em] transition-all duration-500 will-change-transform";
  const styles = {
    club: "bg-az-ivory text-az-black hover:bg-stone",
    lin: "bg-az-ivory text-az-black hover:bg-stone",
    outline: "border border-current opacity-90 hover:opacity-60",
  }[variant];

  return (
    <Link
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-500 group-hover:translate-x-1"
      >
        →
      </span>
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
