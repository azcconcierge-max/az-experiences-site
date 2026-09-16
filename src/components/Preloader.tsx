"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Rideau d'entrée : le médaillon sur fond Nuit, puis le voile se lève.
 * Une fois par session, jamais si l'utilisateur réduit les animations.
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
    }, 2500);
    return () => {
      clearTimeout(t);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className="preloader nuit grain fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <div className="hero-up" style={{ animationDelay: "0.15s" }}>
        <Image src="/brand/logos/AZ-medaillon-lin.svg" alt="" width={130} height={130} />
      </div>
      <p lang="fr" className="eyebrow hero-up mt-8" style={{ animationDelay: "0.45s" }}>
        sur recommandation
      </p>
    </div>
  );
}
