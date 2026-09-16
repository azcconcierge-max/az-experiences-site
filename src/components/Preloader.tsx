"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Rideau d'entrée, 1,2 s maximum, une fois par session.
 * L'ovale se dessine, le médaillon et la devise apparaissent, le rideau se lève.
 * Rendu client uniquement (invisible pour les robots), le hero est rendu
 * dessous dès le départ. Un clic ou une touche le passe immédiatement.
 */
export function Preloader() {
  const [show, setShow] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const dismiss = useCallback(() => {
    setLeaving(true);
    timers.current.push(
      setTimeout(() => {
        setShow(false);
        document.documentElement.style.overflow = "";
      }, 450)
    );
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("az-intro")) return;
    sessionStorage.setItem("az-intro", "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    timers.current.push(setTimeout(dismiss, 1200));
    const skip = () => dismiss();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      timers.current.forEach(clearTimeout);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      document.documentElement.style.overflow = "";
    };
  }, [dismiss]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`bg-nuit fixed inset-0 z-[100] flex flex-col items-center justify-center transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        leaving ? "-translate-y-full" : ""
      }`}
    >
      <div className="relative flex h-32 w-32 items-center justify-center">
        <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" fill="none">
          <ellipse
            cx="50"
            cy="65"
            rx="46"
            ry="61"
            stroke="#D8BD8C"
            strokeWidth="1"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset="1"
            className="preloader-oval"
          />
        </svg>
        <div className="preloader-fade">
          <Image src="/brand/logos/AZ-medaillon-lin.svg" alt="" width={92} height={120} />
        </div>
      </div>
      <p lang="fr" className="eyebrow preloader-fade mt-6" style={{ animationDelay: "0.45s" }}>
        sur recommandation
      </p>
    </div>
  );
}
