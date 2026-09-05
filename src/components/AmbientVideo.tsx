"use client";

import { useEffect, useState } from "react";

/**
 * Vidéo d'ambiance en fond de hero : lecture auto, silencieuse, en boucle.
 * La photo (poster) s'affiche immédiatement et reste seule si le visiteur
 * préfère réduire les animations.
 */
export function AmbientVideo({
  src,
  poster,
  className = "",
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotion(true);
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      {motion && (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
