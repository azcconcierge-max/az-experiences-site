"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { EventItem } from "@/data/events";
import type { Locale } from "@/i18n";
import { EVENT_FRAMES, frameUniverse, universeSrc } from "@/lib/universes";

gsap.registerPlugin(ScrollTrigger);

/**
 * Les rendez-vous : section épinglée à défilement horizontal sur ordinateur,
 * carrousel à aimantation sur mobile. Cartes portrait 4:5 avec date en
 * pastille, filet qui glisse sous le lieu au survol, « Demander un accès »
 * qui monte depuis le bas. Compteur « 03 / 10 » et barre laiton dessous.
 */
export function HorizontalEvents({
  events,
  locale,
  ctaLabel,
}: {
  events: EventItem[];
  locale: Locale;
  ctaLabel: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const bar = barRef.current;
    const counter = counterRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const setProgress = (p: number) => {
      if (bar) bar.style.transform = `scaleX(${Math.min(Math.max(p, 0), 1)})`;
      if (counter) {
        const n = Math.min(events.length, Math.max(1, Math.round(p * (events.length - 1)) + 1));
        counter.textContent = String(n).padStart(2, "0");
      }
    };

    if (window.matchMedia("(min-width: 1024px)").matches) {
      const getDistance = () => track.scrollWidth - section.clientWidth;
      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }

    // Mobile : la barre suit le défilement naturel du carrousel
    const onScroll = () => {
      const max = track.scrollWidth - track.clientWidth;
      setProgress(max > 0 ? track.scrollLeft / max : 0);
    };
    onScroll();
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [events.length]);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        data-cursor="glisser"
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:px-10 lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {events.map((event, i) => (
          <Link
            key={event.slug}
            href={`/${locale}/evenements/${event.slug}`}
            className="group relative block w-[76vw] shrink-0 snap-center overflow-hidden rounded-[2px] sm:w-[46vw] lg:w-[26vw]"
          >
            <div className="photo-treated photo-brand relative aspect-[4/5] overflow-hidden">
              <Image
                src={universeSrc(frameUniverse(EVENT_FRAMES[event.slug] ?? { universe: "concerts" }), "1080")}
                alt={event.name}
                fill
                sizes="(max-width: 1024px) 76vw, 26vw"
                priority={i < 2}
                className="object-cover"
                style={{
                  objectPosition: (EVENT_FRAMES[event.slug]?.position) ?? "50% 50%",
                  transform: EVENT_FRAMES[event.slug]?.zoom ? `scale(${EVENT_FRAMES[event.slug]!.zoom})` : undefined,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,13,12,0.1) 0%, rgba(13,13,12,0.25) 55%, rgba(13,13,12,0.9) 100%)",
                }}
              />
              {/* Date en pastille */}
              <p className="absolute top-4 left-4 z-10 rounded-full bg-nuit/60 px-4 py-1.5 text-[0.72rem] font-normal lowercase tracking-[0.1em] text-lin backdrop-blur-sm">
                {event.dateLabel[locale]}
              </p>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="city text-[0.95rem] text-lin">
                  {event.city}
                  {/* filet laiton qui glisse sous le lieu */}
                  <span
                    aria-hidden="true"
                    className="mt-1.5 block h-px w-10 origin-left scale-x-0 bg-laiton-clair transition-transform duration-500 group-hover:scale-x-100"
                  />
                </p>
                <p className="display mt-1 text-2xl text-lin">{event.name}</p>
                {/* la mention monte depuis le bas au survol (toujours visible au tactile) */}
                <span className="block overflow-hidden">
                  <span className="mt-3 block text-[0.78rem] font-normal lowercase tracking-[0.12em] text-laiton-clair transition-transform duration-500 [@media(hover:hover)]:translate-y-[130%] [@media(hover:hover)]:group-hover:translate-y-0">
                    {ctaLabel} →
                  </span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Compteur et barre de progression laiton */}
      <div
        aria-hidden="true"
        className="mx-auto mt-8 flex max-w-[1440px] items-center gap-5 px-5 md:px-10"
      >
        <p className="display text-[0.9rem] tracking-[0.08em] text-lin/85">
          <span ref={counterRef}>01</span> / {String(events.length).padStart(2, "0")}
        </p>
        <div className="relative h-px flex-1 bg-lin/15">
          <div ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-laiton" />
        </div>
      </div>
    </div>
  );
}
