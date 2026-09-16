import Image from "next/image";
import Link from "next/link";

/**
 * Le médaillon de la maison, toujours à partir des fichiers du kit,
 * jamais retapé au clavier. Version petites tailles sous 200 px.
 */
export function Logo({
  locale,
  variant = "vert",
  size = 52,
}: {
  locale: string;
  variant?: "lin" | "vert" | "laiton";
  size?: number;
}) {
  const file =
    size < 200
      ? `/brand/logos/AZ-medaillon-petites-tailles-${variant}.svg`
      : `/brand/logos/AZ-medaillon-${variant}.svg`;
  return (
    <Link
      href={`/${locale}`}
      aria-label="AZ Conciergerie | Accueil"
      className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
    >
      <Image src={file} alt="AZ Conciergerie" width={size} height={size} priority />
    </Link>
  );
}
