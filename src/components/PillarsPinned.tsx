"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TitleReveal } from "./TitleReveal";

gsap.registerPlugin(ScrollTrigger);

const NUMERALS = ["I", "II", "III", "IV"];

/**
 * Les quatre piliers de la maison, en défilement épinglé.
 * Ordinateur : le chiffre romain géant reste collé à gauche (position sticky)
 * et change en fondu pendant que les piliers défilent à droite.
 * Mobile et mouvement réduit : liste simple, chiffre au-dessus de chaque pilier.
 */
export function PillarsPinned({ pillars }: { pillars: { title: string; text: string }[] }) {
  const root = useRef<HTMLDivElement>(null);
  const numerals = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const blocks = el.querySelectorAll<HTMLElement>("[data-pillar]");
      blocks.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (!self.isActive) return;
            numerals.current.forEach((num, j) => {
              if (!num) return;
              gsap.to(num, { autoAlpha: j === i ? 1 : 0, duration: 0.45, overwrite: "auto" });
            });
          },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
      {/* Chiffre romain géant, collé pendant le défilement (ordinateur) */}
      <div className="hidden lg:block">
        <div className="sticky top-0 flex h-svh items-center">
          <div className="relative h-[22rem] w-full">
            {NUMERALS.map((n, i) => (
              <span
                key={n}
                ref={(node) => {
                  numerals.current[i] = node;
                }}
                aria-hidden="true"
                className="display absolute top-1/2 left-0 -translate-y-1/2 text-[clamp(12rem,16vw,20rem)] leading-none text-laiton-clair"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Les quatre piliers */}
      <div>
        {pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            data-pillar
            className="flex flex-col justify-center py-14 lg:min-h-[70svh] lg:py-0"
          >
            <span className="display text-4xl text-laiton-clair lg:hidden">{NUMERALS[i]}</span>
            <TitleReveal
              text={pillar.title}
              className="display mt-4 text-4xl text-lin md:text-6xl lg:mt-0"
            />
            <p className="mt-5 max-w-md text-base leading-[1.7] font-light text-lin/80">
              {pillar.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
