"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n";
import { testimonials } from "@/data/testimonials";

/**
 * Un seul témoignage à la fois, en grand, fondu enchaîné toutes les 6 s.
 * Sans étoiles ; prénom et rendez-vous en mention.
 */
export function TestimonialRotator({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative min-h-[16rem]">
      {testimonials.map((t, i) => (
        <figure
          key={t.name}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <blockquote>
            <p className="display text-2xl leading-[1.35] text-lin md:text-3xl lg:text-4xl">
              {t.quote[locale]}
            </p>
          </blockquote>
          <figcaption className="mt-8 text-[0.8rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
            {t.name} · {t.context[locale]}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
