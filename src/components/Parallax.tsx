"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Parallaxe discret des images de couverture : l'image glisse moins vite
 * que la page (transform seulement, une frame par défilement).
 */
export function Parallax({ children, speed = 0.18, className = "" }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.parentElement?.getBoundingClientRect();
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return;
      el.style.transform = `translate3d(0, ${(-rect.top * speed).toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`absolute inset-0 will-change-transform ${className}`}>
      {children}
    </div>
  );
}
