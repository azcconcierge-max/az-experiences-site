"use client";

import { useEffect, useRef } from "react";

/**
 * Curseur maison : point or + anneau qui suit avec inertie et s'ouvre
 * sur les éléments cliquables. Desktop uniquement, jamais en reduced-motion.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!fine || reduced || !dot || !ring) return;

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      ring.classList.toggle("is-active", !!target.closest("a, button, [role='button']"));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
}
