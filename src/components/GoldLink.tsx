import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Bouton de la maison : rectangle net, Inter Medium 500, capitales espacées
 * à 15 % (guidelines §4, style Button). Variantes : club (noir sur noir,
 * filet ivoire), lin (ivoire plein, texte noir : l'action principale),
 * outline (hérite la couleur du contexte). Aucun effet : la retenue d'abord.
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
  const base =
    "group relative inline-flex items-center gap-2.5 btn-label px-8 py-4 transition-colors duration-500";
  const styles = {
    club: "border border-ivory/60 bg-black text-ivory hover:border-ivory",
    lin: "border border-ivory bg-ivory text-black hover:bg-transparent hover:text-ivory",
    outline: "border border-current opacity-90 hover:opacity-60",
  }[variant];

  return (
    <Link
      href={href}
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

/** Compatibilité avec l'ancien nom : solid = action principale ivoire, sinon contour. */
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
    <Button href={href} variant={solid ? "lin" : "outline"} className={className}>
      {children}
    </Button>
  );
}
