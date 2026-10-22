"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { EventItem } from "@/data/events";
import type { Locale } from "@/i18n";

gsap.registerPlugin(ScrollTrigger);

/**
 * Les rendez-vous : section épinglée à défilement horizontal sur ordinateur,
 * carrousel à aimantation sur mobile. Cartes portrait 4:5, lieu en capitales,
 * date en mention, « Demander un accès » au survol.
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

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

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
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="overflow-hidden">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:px-10 lg:snap-none lg:overflow-visible lg:pb-0"
      >
        {events.map((event, i) => (
          <Link
            key={event.slug}
            href={`/${locale}/evenements/${event.slug}`}
            className="group relative block w-[76vw] shrink-0 snap-center overflow-hidden rounded-[2px] sm:w-[46vw] lg:w-[26vw]"
          >
            <div className="photo-treated relative aspect-[4/5] overflow-hidden">
              <Image
                src={`/images/${event.slug}.jpg`}
                alt={event.name}
                fill
                sizes="(max-width: 1024px) 76vw, 26vw"
                priority={i < 2}
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,13,12,0.12) 0%, rgba(13,13,12,0.2) 55%, rgba(13,13,12,0.88) 100%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="city text-[0.95rem] text-lin">{event.city}</p>
                <p className="display mt-1 text-2xl text-lin">{event.name}</p>
                <p className="mt-2 text-[0.78rem] font-normal lowercase tracking-[0.12em] text-lin/70">
                  {event.dateLabel[locale]}
                </p>
                <p className="mt-3 text-[0.78rem] font-normal lowercase tracking-[0.12em] text-laiton-clair opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {ctaLabel} →
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
