"use client";

import { useEffect, useRef } from "react";

/** Filet d'or en haut de page qui suit la progression de lecture. */
export function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      el.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div ref={ref} className="reading-progress w-full" style={{ transform: "scaleX(0)" }} />;
}
