"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Compteur de lecture discret pour les articles : le pourcentage lu,
 * en mention, en bas à droite. Apparaît dès que la lecture commence.
 */
export function ReadingCounter() {
  const [percent, setPercent] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
      setPercent(Math.round(p * 100));
      raf.current = 0;
    };
    const onScroll = () => {
      if (!raf.current) raf.current = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <p
      aria-hidden="true"
      className={`fixed right-5 bottom-5 z-40 hidden text-[0.72rem] font-normal tracking-[0.16em] text-stone transition-opacity duration-500 md:block ${
        percent > 2 && percent < 100 ? "opacity-100" : "opacity-0"
      }`}
    >
      {String(percent).padStart(2, "0")} %
    </p>
  );
}
