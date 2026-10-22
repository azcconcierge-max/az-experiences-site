"use client";

import Image from "next/image";

/** Retour en haut de page, avec le petit médaillon. */
export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="group inline-flex h-12 w-12 cursor-pointer items-center justify-center border border-stone/40 transition-colors duration-500 hover:border-laiton-clair"
    >
      <Image
        src="/brand2/logos/az-monogram-ivory-small-sizes.svg"
        alt=""
        width={26}
        height={19}
        className="transition-transform duration-500 group-hover:-translate-y-0.5"
      />
    </button>
  );
}
