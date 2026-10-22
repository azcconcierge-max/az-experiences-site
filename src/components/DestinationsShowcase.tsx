"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { destinations } from "@/data/destinations";

/** Fuseau horaire de chaque destination, pour l'heure locale en direct. */
const TIMEZONES: Record<string, string> = {
  monaco: "Europe/Monaco",
  "cote-d-azur": "Europe/Paris",
  paris: "Europe/Paris",
  mykonos: "Europe/Athens",
  ibiza: "Europe/Madrid",
  "new-york": "America/New_York",
};

/**
 * Destinations plein écran : liste de noms en capitales Bodoni à gauche,
 * image plein cadre derrière qui change par un balayage de gauche à droite.
 * Numéro laiton devant chaque nom, heure locale à côté du nom actif.
 * Sur mobile (sans survol), rotation automatique toutes les 4 s.
 */
export function DestinationsShowcase({
  locale,
  eyebrow,
  exclude,
}: {
  locale: Locale;
  eyebrow: string;
  exclude?: string;
}) {
  const list = destinations.filter((d) => d.slug !== exclude);
  const [active, setActive] = useState(0);
  const [now, setNow] = useState<Date | null>(null);
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setNow(new Date());
    const clock = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    auto.current = setInterval(() => {
      setActive((a) => (a + 1) % list.length);
    }, 4000);
    return () => {
      if (auto.current) clearInterval(auto.current);
    };
  }, [list.length]);

  const localTime = (slug: string) => {
    if (!now) return null;
    try {
      return new Intl.DateTimeFormat("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: TIMEZONES[slug] ?? "Europe/Paris",
      }).format(now);
    } catch {
      return null;
    }
  };

  return (
    <div className="relative min-h-svh overflow-hidden bg-nuit">
      {/* Images empilées : balayage en clip-path + fondu */}
      {list.map((dest, i) => (
        <div
          key={dest.slug}
          aria-hidden="true"
          className={`photo-treated absolute inset-0 transition-opacity duration-700 ease-in-out ${
            i === active ? "sweep-in" : ""
          }`}
          style={{ opacity: i === active ? 1 : 0 }}
        >
          <Image
            src={`/images/dest-${dest.slug}.jpg`}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            className="object-cover"
          />
          {/* le voile sombre de la charte : lisibilité garantie */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(13,13,12,0.86) 0%, rgba(13,13,12,0.55) 45%, rgba(13,13,12,0.25) 100%)",
            }}
          />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex min-h-svh max-w-[1440px] flex-col justify-center px-5 py-28 md:px-10">
        <p className="eyebrow mb-10">{eyebrow}</p>
        <ul className="flex flex-col gap-2 md:gap-3">
          {list.map((dest, i) => (
            <li key={dest.slug}>
              <Link
                href={`/${locale}/destinations/${dest.slug}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="voir"
                className="group block"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className={`display w-8 shrink-0 text-sm transition-colors duration-500 ${
                      i === active ? "text-laiton-clair" : "text-laiton-clair/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`city block origin-left text-4xl leading-[1.05] transition-all duration-500 md:text-6xl lg:text-7xl ${
                      i === active ? "scale-[1.03] text-lin" : "text-lin/40 hover:text-lin/70"
                    }`}
                  >
                    {dest.name}
                  </span>
                  {i === active && localTime(dest.slug) && (
                    <span
                      aria-hidden="true"
                      className="hidden text-[0.72rem] font-normal lowercase tracking-[0.16em] text-laiton-clair md:inline"
                    >
                      {dest.name.toLowerCase()} {localTime(dest.slug)}
                    </span>
                  )}
                </span>
                <span
                  className={`block overflow-hidden pl-12 transition-[max-height,opacity] duration-500 ${
                    i === active ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <span className="mt-1 block text-sm font-light text-laiton-clair md:text-base">
                    {dest.tagline[locale]}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
