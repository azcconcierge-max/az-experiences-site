"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Révélation d'image par clip-path : de inset(100% 0 0 0) à inset(0),
 * avec un léger parallaxe interne (8 % maximum) au défilement.
 */
export function ClipReveal({
  children,
  parallax = 6,
  className = "",
}: {
  children: ReactNode;
  parallax?: number;
  className?: string;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let clip: gsap.core.Tween;
    let para: gsap.core.Tween;
    try {
      clip = gsap.fromTo(
        o,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: o, start: "top 85%", once: true },
        }
      );
      para = gsap.fromTo(
        i,
        { yPercent: -parallax },
        {
          yPercent: parallax,
          ease: "none",
          scrollTrigger: { trigger: o, start: "top bottom", end: "bottom top", scrub: 0.5 },
        }
      );
    } catch {
      gsap.set([o, i], { clearProps: "all" });
      return;
    }
    // Garde-fou : l'image ne reste jamais masquée si le déclencheur échoue.
    const failsafe = window.setTimeout(() => {
      if (clip.progress() === 0 && o.getBoundingClientRect().top < window.innerHeight) {
        clip.progress(1);
      }
    }, 3000);
    return () => {
      window.clearTimeout(failsafe);
      clip.scrollTrigger?.kill();
      clip.kill();
      para.scrollTrigger?.kill();
      para.kill();
    };
  }, [parallax]);

  return (
    <div ref={outer} className={className}>
      <div ref={inner} className="h-full w-full">
        {children}
      </div>
    </div>
  );
}
