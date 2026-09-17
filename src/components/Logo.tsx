import Image from "next/image";
import Link from "next/link";
import { BRAND_NAME } from "@/lib/site";

/**
 * Le médaillon de la maison, toujours à partir des fichiers du kit,
 * jamais retapé au clavier. Version petites tailles sous 200 px.
 * withName : logotype provisoire, médaillon + « AZ Experiences » en Bodoni
 * capitales espacées, en attendant le fichier SVG définitif.
 */
export function Logo({
  locale,
  variant = "vert",
  size = 52,
  withName = false,
  className = "",
}: {
  locale: string;
  variant?: "lin" | "vert" | "laiton";
  size?: number;
  withName?: boolean;
  className?: string;
}) {
  const file =
    size < 200
      ? `/brand/logos/AZ-medaillon-petites-tailles-${variant}.svg`
      : `/brand/logos/AZ-medaillon-${variant}.svg`;
  const nameColor = variant === "vert" ? "text-club" : "text-lin";
  return (
    <Link
      href={`/${locale}`}
      aria-label={`${BRAND_NAME} | Accueil`}
      className={`inline-flex items-center gap-3.5 transition-opacity duration-300 hover:opacity-80 ${className}`}
    >
      <Image src={file} alt={BRAND_NAME} width={size} height={size} priority />
      {withName && (
        <span
          aria-hidden="true"
          className={`city text-[0.92rem] leading-none tracking-[0.16em] ${nameColor}`}
        >
          {BRAND_NAME}
        </span>
      )}
    </Link>
  );
}
