"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { testimonials } from "@/data/testimonials";

const DURATION = 6000;

/**
 * Un seul témoignage à la fois, en grand, fondu enchaîné toutes les 6 s.
 * Grands guillemets Bodoni laiton derrière la citation ; trois traits fins
 * qui se remplissent pour montrer la progression, cliquables.
 */
export function TestimonialRotator({ locale }: { locale: Locale }) {
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
      <div className="relative min-h-[16rem]">
        {/* Grands guillemets derrière la citation */}
        <span
          aria-hidden="true"
          className="display pointer-events-none absolute -top-24 -left-4 text-[clamp(9rem,16vw,15rem)] leading-none text-laiton/10 select-none"
        >
          «
        </span>
        {testimonials.map((t, i) => (
          <figure
            key={t.name}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
            style={{ opacity: i === active ? 1 : 0 }}
            aria-hidden={i !== active}
          >
            <blockquote>
              <p className="display relative text-2xl leading-[1.35] text-lin md:text-3xl lg:text-4xl">
                {t.quote[locale]}
              </p>
            </blockquote>
            <figcaption className="mt-8 text-[0.8rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
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
            <span className="relative block h-px w-full overflow-hidden bg-lin/20 transition-colors group-hover:bg-lin/35">
              <span
                className="absolute inset-0 origin-left bg-laiton-clair"
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
