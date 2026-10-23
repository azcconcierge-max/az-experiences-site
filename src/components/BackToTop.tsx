"use client";

/** Retour en haut de page : un label, sans logo (sous 40 px, le monogramme ne s'utilise pas). */
export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
      className="label cursor-pointer text-ivory/75 transition-colors hover:text-ivory"
    >
      ↑
    </button>
  );
}
