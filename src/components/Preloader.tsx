"use client";

import { useEffect, useState } from "react";

/**
 * Rideau d'entrée de la maison : monogramme AZ, filet d'or qui se trace,
 * puis le voile se lève. Joué une fois par session, jamais si l'utilisateur
 * préfère réduire les animations.
 */
export function Preloader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (sessionStorage.getItem("az-intro")) return;
    sessionStorage.setItem("az-intro", "1");
    setShow(true);
    document.documentElement.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.documentElement.style.overflow = "";
    }, 2700);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader fixed inset-0 z-[100] flex flex-col items-center justify-center bg-noir"
    >
      <p className="hero-up display text-7xl text-gold md:text-8xl" style={{ animationDelay: "0.15s" }}>
        AZ
      </p>
      <div className="preloader-line mt-6 h-px w-40 bg-gold/70" />
      <p
        className="hero-up mt-6 text-[0.6rem] tracking-[0.5em] text-ivory-dim uppercase"
        style={{ animationDelay: "0.5s" }}
      >
        Conciergerie
      </p>
    </div>
  );
}
