"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Fondu discret à l'entrée dans l'écran (GSAP).
 * Le contenu est rendu visible côté serveur : aucun texte caché
 * pour les robots ni en cas d'échec du JavaScript.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const anim = gsap.from(el, {
      autoAlpha: 0,
      y: 22,
      duration: 0.9,
      delay: delay / 1000,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
