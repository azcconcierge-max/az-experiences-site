"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Vidéo d'ambiance en fond de hero. Un seul clip, ou un montage :
 * plusieurs clips enchaînés en fondu croisé (effet showreel).
 * La photo (poster) s'affiche immédiatement et reste seule si le visiteur
 * préfère réduire les animations.
 */
export function AmbientVideo({
  sources,
  poster,
  className = "",
  interval = 7000,
}: {
  sources: string[];
  poster: string;
  className?: string;
  interval?: number;
}) {
  const [motion, setMotion] = useState(false);
  const [layerA, setLayerA] = useState(0);
  const [layerB, setLayerB] = useState(1 % Math.max(sources.length, 1));
  const [aInFront, setAInFront] = useState(true);
  const idxRef = useRef(0);
  const frontRef = useRef(true);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotion(true);
  }, []);

  useEffect(() => {
    if (!motion || sources.length < 2) return;
    const t = setInterval(() => {
      const next = (idxRef.current + 1) % sources.length;
      idxRef.current = next;
      // la couche cachée reçoit le clip suivant, puis passe devant en fondu
      if (frontRef.current) setLayerB(next);
      else setLayerA(next);
      frontRef.current = !frontRef.current;
      setAInFront(frontRef.current);
    }, interval);
    return () => clearInterval(t);
  }, [motion, sources.length, interval]);

  const front = aInFront;

  return (
    <div className={className} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {motion && (
        <>
          <video
            key={`a-${layerA}`}
            src={sources[layerA]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: front ? 1 : 0 }}
          />
          {sources.length > 1 && (
            <video
              key={`b-${layerB}`}
              src={sources[layerB]}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out"
              style={{ opacity: front ? 0 : 1 }}
            />
          )}
        </>
      )}
    </div>
  );
}
