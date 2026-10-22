"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Quatre univers de la bibliothèque V1.2, recadrés en bannière
const SLIDES = [
  "/images/universes/AZ-05-football_pitch-banner-1080x608.webp",
  "/images/universes/AZ-07-concerts_stage-banner-1080x608.webp",
  "/images/universes/AZ-06-tennis_clay-banner-1080x608.webp",
  "/images/universes/AZ-02-private-jet-chauffeur_dusk-banner-1080x608.webp",
];

const DURATION = 6000;

/**
 * Diaporama lent du hero : fondu enchaîné toutes les 6 s, chaque image
 * avec son zoom lent. Compteur « 01 / 04 » et traits qui se remplissent.
 * En mouvement réduit : première image fixe, compteur figé.
 */
export function HeroSlideshow() {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    const t = setInterval(() => setActive((a) => (a + 1) % SLIDES.length), DURATION);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* Images empilées : la première porte le LCP, les autres arrivent après */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <div className={i === active && animate ? "hero-zoom absolute inset-0" : "absolute inset-0"}>
            <Image
              src={src}
              alt=""
              fill
              priority={i === 0}
              quality={60}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      ))}

      {/* Compteur et traits, en bas à droite dans le cadre */}
      <div className="pointer-events-none absolute right-9 bottom-9 z-20 hidden flex-col items-end gap-3 md:flex">
        <p aria-hidden="true" className="display text-[0.95rem] tracking-[0.08em] text-lin/85">
          {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </p>
        <div aria-hidden="true" className="flex gap-1.5">
          {SLIDES.map((_, i) => (
            <span key={i} className="relative h-px w-7 overflow-hidden bg-lin/25">
              <span
                className="absolute inset-0 origin-left bg-laiton-clair"
                style={
                  i === active && animate
                    ? { animation: `fillTick ${DURATION}ms linear forwards` }
                    : { transform: i < active ? "scaleX(1)" : "scaleX(0)" }
                }
              />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

/** Heure de Paris en direct, en mention (« paris 14:32 »). */
export function ParisClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
    const tick = () => setTime(fmt.format(new Date()).replace(":", ":"));
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, []);

  if (!time) return null;
  return (
    <span>
      paris {time.replace("h", ":")}
    </span>
  );
}
