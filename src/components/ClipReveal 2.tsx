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

    const clip = gsap.fromTo(
      o,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: { trigger: o, start: "top 85%", once: true },
      }
    );
    const para = gsap.fromTo(
      i,
      { yPercent: -parallax },
      {
        yPercent: parallax,
        ease: "none",
        scrollTrigger: { trigger: o, start: "top bottom", end: "bottom top", scrub: 0.5 },
      }
    );
    return () => {
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
