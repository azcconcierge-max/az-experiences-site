"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { services } from "@/data/services";

/**
 * Index éditorial des services : grands titres Bodoni séparés de filets,
 * zéro descriptif. Au survol, une grande image portrait suit le curseur
 * et le numéro passe en laiton. Mobile : liste simple, image en fondu au-dessus.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const [mobileActive, setMobileActive] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = cursorRef.current;
    if (!el) return;
    el.style.transform = `translate(${e.clientX + 24}px, ${e.clientY - 190}px)`;
  };

  return (
    <div onMouseMove={onMove} className="relative">
      {/* Image mobile, fondu au-dessus de la liste */}
      <div className="photo-treated relative mb-10 aspect-[4/3] overflow-hidden rounded-[2px] lg:hidden">
        {services.map((s, i) => (
          <Image
            key={s.slug}
            src={`/images/${s.slug}.jpg`}
            alt=""
            fill
            sizes="100vw"
            className="object-cover transition-opacity duration-700"
            style={{ opacity: i === mobileActive ? 1 : 0 }}
          />
        ))}
      </div>

      <ul>
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-club/15 first:border-t">
            <Link
              href={`/${locale}/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={() => setMobileActive(i)}
              className="group flex items-baseline gap-6 py-6 md:py-7"
            >
              <span
                className={`display w-10 shrink-0 text-sm transition-colors duration-300 ${
                  active === i ? "text-laiton-fonce" : "text-club/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`display text-3xl leading-[1.05] transition-transform duration-500 md:text-5xl ${
                  active === i ? "translate-x-3" : ""
                }`}
              >
                {s.title[locale]}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Image portrait qui suit le curseur (ordinateur) */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-30 hidden lg:block"
        style={{ transform: "translate(-9999px, -9999px)" }}
      >
        <div
          className={`photo-treated relative h-[380px] w-[290px] overflow-hidden rounded-[2px] transition-opacity duration-300 ${
            active !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          {services.map((s, i) => (
            <Image
              key={s.slug}
              src={`/images/${s.slug}.jpg`}
              alt=""
              fill
              sizes="290px"
              className="object-cover transition-opacity duration-300"
              style={{ opacity: i === active ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
