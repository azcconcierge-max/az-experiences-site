"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Showreel du hero d'accueil : séquences vidéo (ou photo en zoom lent)
 * enchaînées en fondu croisé, chacune signée du nom de l'événement.
 * Automatique, silencieux, sans aucun clic. Photo seule si le visiteur
 * préfère réduire les animations.
 */
export type Slide = { type: "video" | "image"; src: string; label: string };

function Layer({ slide, visible }: { slide: Slide; visible: boolean }) {
  const cls =
    "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out";
  if (slide.type === "image") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={slide.src}
        alt=""
        className={`kenburns ${cls}`}
        style={{ opacity: visible ? 1 : 0 }}
      />
    );
  }
  return (
    <video
      src={slide.src}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={cls}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}

export function HeroShowreel({
  slides,
  poster,
  interval = 7000,
}: {
  slides: Slide[];
  poster: string;
  interval?: number;
}) {
  const [motion, setMotion] = useState(false);
  const [layerA, setLayerA] = useState(0);
  const [layerB, setLayerB] = useState(1 % Math.max(slides.length, 1));
  const [aInFront, setAInFront] = useState(true);
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const frontRef = useRef(true);

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setMotion(true);
  }, []);

  useEffect(() => {
    if (!motion || slides.length < 2) return;
    const t = setInterval(() => {
      const next = (idxRef.current + 1) % slides.length;
      idxRef.current = next;
      if (frontRef.current) setLayerB(next);
      else setLayerA(next);
      frontRef.current = !frontRef.current;
      setAInFront(frontRef.current);
      setIdx(next);
    }, interval);
    return () => clearInterval(t);
  }, [motion, slides.length, interval]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {motion && (
        <>
          <Layer key={`a-${layerA}`} slide={slides[layerA]} visible={aInFront} />
          {slides.length > 1 && (
            <Layer key={`b-${layerB}`} slide={slides[layerB]} visible={!aInFront} />
          )}
        </>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-noir/75 via-noir/50 to-noir" />

      {/* Signature de la séquence en cours */}
      {motion && (
        <div className="absolute bottom-10 left-6 z-10 md:left-10">
          <div key={idx} className="hero-up flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            <span className="display text-lg text-ivory/90 italic md:text-xl">
              {slides[idx].label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
