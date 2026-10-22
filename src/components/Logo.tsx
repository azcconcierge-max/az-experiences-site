import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/site";

/**
 * Le monogramme AZ officiel (V1.2), jamais redessiné, jamais encadré.
 * Versions small-sizes (trait plus épais) sous 64 px.
 * Le ratio du fichier est 646 x 471.
 */
export function Logo({
  locale,
  variant = "ivory",
  size = 48,
  className = "",
}: {
  locale: string;
  variant?: "ivory" | "black" | "lin" | "vert" | "laiton";
  size?: number;
  withName?: boolean;
  className?: string;
}) {
  const color = variant === "black" || variant === "vert" ? "black" : "ivory";
  const file =
    size < 64
      ? `/brand2/logos/az-monogram-${color}-small-sizes.svg`
      : `/brand2/logos/az-monogram-${color}.svg`;
  const height = Math.round((size * 471) / 646);
  return (
    <Link
      href={`/${locale}`}
      aria-label={`${BRAND_NAME} | Accueil`}
      className={`inline-flex items-center transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Image src={file} alt={BRAND_NAME} width={size} height={height} priority />
    </Link>
  );
}
