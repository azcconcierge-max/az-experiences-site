"use client";

import Image from "next/image";

/** Retour en haut de page, avec le petit médaillon. */
export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="group inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-lin/30 transition-colors duration-500 hover:border-laiton-clair"
    >
      <Image
        src="/brand/logos/AZ-medaillon-petites-tailles-lin.svg"
        alt=""
        width={22}
        height={28}
        className="transition-transform duration-500 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
