import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/site";

/** Monogramme AZ : proportions du fichier maître (02-Logo, viewBox 104 × 80). */
export const MONOGRAM_RATIO = 80 / 104;

/**
 * Le monogramme AZ seul, toujours à partir des fichiers maîtres, jamais
 * redessiné : pas de nom accolé, pas d'ovale, une seule couleur.
 * Largeur minimale à l'écran : 40 px (brand book p.11).
 */
export function monogramSrc(_width: number, variant: "ivory" | "black" = "ivory") {
  return `/brand/logos/AZ-logo-${variant}.svg`;
}

export function Monogram({
  width = 40,
  variant = "ivory",
  className = "",
  priority = false,
}: {
  width?: number;
  variant?: "ivory" | "black";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={monogramSrc(width, variant)}
      alt={BRAND_NAME}
      width={width}
      height={Math.round(width * MONOGRAM_RATIO)}
      priority={priority}
      className={className}
    />
  );
}

export function Logo({
  locale,
  variant = "ivory",
  size = 40,
  className = "",
}: {
  locale: string;
  variant?: "ivory" | "black";
  /** largeur en px */
  size?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/${locale}`}
      aria-label={`${BRAND_NAME} | Accueil`}
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Monogram width={size} variant={variant} priority />
    </Link>
  );
}

/**
 * Le monogramme qui se trace d'un seul trait à l'entrée dans l'écran
 * (classe `.mono-draw`, pilotée par RevealObserver). Géométrie identique au
 * fichier maître 02-Logo/AZ-logo-ivory.svg ; sans JavaScript, il est visible.
 */
export function MonogramDraw({ width = 160, className = "" }: { width?: number; className?: string }) {
  return (
    <svg
      viewBox="2 0 104 80"
      width={width}
      height={Math.round(width * MONOGRAM_RATIO)}
      role="img"
      aria-label={BRAND_NAME}
      className={`mono-draw ${className}`}
    >
      <defs>
        <clipPath id="az-mono-base">
          <rect x="-50" y="-50" width="250" height="123.6" />
        </clipPath>
      </defs>
      <g
        clipPath="url(#az-mono-base)"
        fill="none"
        stroke="#EFE8DA"
        strokeWidth="3.2"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
      >
        <polyline points="7.2,76 30,8 52,72" pathLength={1} />
        <polyline points="60,8 100,8 52,72 100,72" pathLength={1} />
      </g>
    </svg>
  );
}
