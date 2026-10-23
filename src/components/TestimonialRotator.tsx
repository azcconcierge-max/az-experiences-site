"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { testimonials } from "@/data/testimonials";

const DURATION = 6000;

/**
 * Un seul témoignage à la fois, en grand, fondu enchaîné toutes les 6 s.
 * Trois traits fins
 * qui se remplissent pour montrer la progression, cliquables.
 */
export function TestimonialRotator({ locale, onLight = false }: { locale: Locale; onLight?: boolean }) {
  const ink = onLight ? "text-black" : "text-ivory";
  const meta = onLight ? "text-black/70" : "text-stone";
  const bar = onLight ? "bg-black" : "bg-ivory";
  const track = onLight ? "bg-black/20" : "bg-ivory/20";
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const restart = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setActive((a) => (a + 1) % testimonials.length), DURATION);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setAnimate(true);
    restart();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const select = (i: number) => {
    setActive(i);
    if (animate) restart();
  };

  return (
    <div>
      <div className="relative min-h-[14rem]">
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <blockquote>
              <p className={`t-h1 relative ${ink}`}>
                {t.quote[locale]}
              </p>
            </blockquote>
            <figcaption className={`mt-8 label ${meta}`}>
              {t.name} · {t.context[locale]}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Trois traits de progression, cliquables */}
      <div className="mt-10 flex gap-2.5">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => select(i)}
            aria-label={t.name}
            aria-current={i === active ? "true" : undefined}
            className="group flex h-6 flex-1 cursor-pointer items-center"
          >
            <span className={`relative block h-px w-full overflow-hidden ${track} transition-colors`}>
              <span
                className={`absolute inset-0 origin-left ${bar}`}
                style={
                  i === active && animate
                    ? { animation: `fillTick ${DURATION}ms linear forwards` }
                    : { transform: i === active ? "scaleX(1)" : "scaleX(0)" }
                }
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
