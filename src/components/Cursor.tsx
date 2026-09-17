"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur maison : un point laiton de 8 px qui suit avec un léger retard.
 * Sur les cibles marquées data-cursor, il devient un anneau de 64 px
 * avec la mention correspondante (« voir » sur les cartes et images
 * cliquables, « glisser » sur les carrousels).
 * Ordinateur uniquement, jamais en mouvement réduit.
 */
export function Cursor({ labels }: { labels: Record<string, string> }) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!fine || reduced || !dot || !ring || !label) return;

    dot.style.opacity = "1";

    let x = -100;
    let y = -100;
    let dx = -100;
    let dy = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const loop = () => {
      // le point suit avec un léger retard, l'anneau un peu plus loin derrière
      dx += (x - dx) * 0.3;
      dy += (y - dy) * 0.3;
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${dx}px, ${dy}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      const kind = target?.dataset.cursor;
      if (kind && labels[kind]) {
        label.textContent = labels[kind];
        ring.classList.add("is-open");
        dot.style.opacity = "0";
      } else {
        ring.classList.remove("is-open");
        dot.style.opacity = "1";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, [labels]);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
