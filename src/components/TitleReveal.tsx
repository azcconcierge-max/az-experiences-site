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
    try {
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
    } catch {
      gsap.set(words, { clearProps: "all" });
      return;
    }
    // Garde-fou : jamais un titre bloqué invisible si le déclencheur échoue.
    const failsafe = window.setTimeout(() => {
      if (anim.progress() === 0 && el.getBoundingClientRect().top < window.innerHeight) {
        anim.progress(1);
      }
    }, 3000);
    return () => {
      window.clearTimeout(failsafe);
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
 * Révélation lettre à lettre, CSS pur : chaque lettre monte dans son cadre,
 * l'une après l'autre. Pour les noms de villes en capitales.
 * Démarre sans JavaScript, aucun impact sur le LCP.
 */
export function LetterMask({
  text,
  className = "",
  delay = 0,
  step = 45,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {[...text].map((ch, i) =>
        ch === " " ? (
          <span key={i} aria-hidden="true">
            {" "}
          </span>
        ) : (
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden pb-[0.06em] align-top"
          >
            <span
              className="lineup inline-block"
              style={{ animationDelay: `${delay + i * step}ms` }}
            >
              {ch}
            </span>
          </span>
        )
      )}
    </span>
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
