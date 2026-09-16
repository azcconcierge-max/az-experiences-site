import Image from "next/image";
import type { ReactNode } from "react";

/*
  Primitives de la charte : mention, lieux en capitales, ovale, fondu, filet.
  Quatre éléments graphiques, pas un de plus.
*/

/** Mention : Hanken regular, minuscules espacées. */
export function Mention({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Lieu (ville, salle, circuit) : capitales Bodoni espacées. */
export function City({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={`city ${className}`}>{children}</span>;
}

/** Photo dans un ovale vertical 3:4, en écho au médaillon. */
export function OvalImage({
  src,
  alt = "",
  sizes = "(max-width: 768px) 80vw, 40vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[3/4] overflow-hidden rounded-[50%] ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}

/** Photo plein cadre absorbée par le vert vers le bas. */
export function FadeImage({
  src,
  alt = "",
  to = "#173A2C",
  sizes = "100vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt?: string;
  to?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: `linear-gradient(180deg, transparent 35%, ${to} 100%)` }}
      />
    </div>
  );
}

/** Filet : un trait laiton d'un pixel, pour séparer seulement. */
export function Filet({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`filet ${className}`} />;
}
