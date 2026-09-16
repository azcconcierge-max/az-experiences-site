"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { destinations } from "@/data/destinations";

/**
 * Destinations plein écran : liste de noms en capitales Bodoni à gauche,
 * image plein cadre derrière qui change en fondu au survol.
 * Sur mobile (sans survol), rotation automatique toutes les 4 s.
 * Même images et même voile sombre que l'accordéon de la page Destinations.
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
  const auto = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    auto.current = setInterval(() => {
      setActive((a) => (a + 1) % list.length);
    }, 4000);
    return () => {
      if (auto.current) clearInterval(auto.current);
    };
  }, [list.length]);

  return (
    <div className="relative min-h-svh overflow-hidden bg-nuit">
      {/* Images empilées, fondu enchaîné */}
      {list.map((dest, i) => (
        <div
          key={dest.slug}
          aria-hidden="true"
          className="photo-treated absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
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
                "linear-gradient(90deg, rgba(14,36,25,0.86) 0%, rgba(14,36,25,0.55) 45%, rgba(14,36,25,0.25) 100%)",
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
                className="group block"
              >
                <span
                  className={`city block text-4xl leading-[1.05] transition-all duration-500 md:text-6xl lg:text-7xl ${
                    i === active ? "text-lin" : "text-lin/35 hover:text-lin/70"
                  }`}
                >
                  {dest.name}
                </span>
                <span
                  className={`block overflow-hidden transition-[max-height,opacity] duration-500 ${
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
