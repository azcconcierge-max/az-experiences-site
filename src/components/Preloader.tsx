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
    // Appareil ou réseau lent : si l'hydratation arrive après 2,5 s, le hero
    // est déjà lu, faire surgir le rideau maintenant serait pire que rien.
    if (performance.now() > 2500) return;
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
      <div className="flex flex-col items-center gap-7">
        <div className="preloader-fade">
          <Image src="/brand2/logos/az-monogram-ivory.svg" alt="" width={84} height={61} />
        </div>
        <span aria-hidden="true" className="preloader-line block h-px w-14 bg-stone/70" />
      </div>
      <p lang="fr" className="eyebrow preloader-fade mt-7" style={{ animationDelay: "0.45s" }}>
        L&apos;art de l&apos;acc&egrave;s.
      </p>
    </div>
  );
}
