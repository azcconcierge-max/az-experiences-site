"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Révélation typographique : chaque mot est masqué puis monte dans son cadre.
 * mode "words" (stagger rapide) pour les titres, "scrub" pour un manifeste
 * qui se révèle mot à mot au fil du défilement.
 * Rendu serveur : texte complet visible sans JavaScript.
 */
export function TitleReveal({
  text,
  as: Tag = "h2",
  mode = "words",
  className = "",
}: {
  text: string;
  as?: "h1" | "h2" | "p";
  mode?: "words" | "scrub";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    let anim: gsap.core.Tween;
    if (mode === "scrub") {
      // 0.6 minimum : reste lisible (contraste AA grand texte) avant le défilement
      anim = gsap.from(words, {
        autoAlpha: 0.6,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 30%", scrub: 0.4 },
      });
    } else {
      anim = gsap.from(words, {
        yPercent: 110,
        duration: 0.9,
        stagger: 0.045,
        ease: "power4.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    }
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [mode]);

  const words = text.split(" ");

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={mode === "words" ? "inline-block overflow-hidden pb-[0.08em] align-top" : ""}
        >
          <span data-word className="inline-block">
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Variante pour un contenu déjà composé (ex. deux lignes) : masque par ligne.
 * Animation CSS pure : elle démarre dès le chargement de la feuille de style,
 * sans attendre JavaScript. Indispensable pour le titre du hero (LCP).
 */
export function LineMask({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <div className="lineup" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </div>
    </div>
  );
}
