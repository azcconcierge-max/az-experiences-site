"use client";

import { useEffect, useState } from "react";

/**
 * « Voir l'ambiance » : bouton play élégant qui ouvre la vidéo OFFICIELLE
 * de l'événement (lecteur YouTube embarqué, autorisé par les ayants droit)
 * dans une lightbox plein écran. Zéro fichier protégé hébergé chez nous.
 */
export function VideoLightbox({ videoId, label }: { videoId: string; label: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group mt-7 inline-flex items-center gap-4"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 text-gold transition-all duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-noir">
          <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true">
            <path d="M8 5.5v13l11-6.5-11-6.5Z" />
          </svg>
        </span>
        <span className="gold-underline text-[0.68rem] tracking-[0.28em] text-gold uppercase">
          {label}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-noir/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setOpen(false)}
            className="absolute top-5 right-6 text-3xl text-ivory/70 transition-colors hover:text-gold"
          >
            ✕
          </button>
          <div
            className="relative aspect-video w-full max-w-5xl border border-gold/30"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title={label}
              className="h-full w-full"
            />
          </div>
        </div>
      )}
    </>
  );
}
