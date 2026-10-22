"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n";
import { services } from "@/data/services";
import { SERVICE_FRAMES, frameUniverse, universeSrc } from "@/lib/universes";

/**
 * Index éditorial des services : grands titres Bodoni séparés de filets.
 * Au survol, un fond vert club se remplit derrière la ligne (titre en lin,
 * numéro en laiton), et une grande image portrait suit le curseur avec un
 * léger retard et une rotation de 2° maximum qui se redresse à l'arrêt.
 * Mobile : liste simple, image en fondu au-dessus.
 */
export function ServicesIndex({ locale }: { locale: Locale }) {
  const [active, setActive] = useState<number | null>(null);
  const [mobileActive, setMobileActive] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -9999, y: -9999, cx: -9999, cy: -9999, rot: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = cursorRef.current;
    if (!el) return;
    const p = pos.current;
    const loop = () => {
      const prevX = p.cx;
      p.cx += (p.x - p.cx) * 0.14;
      p.cy += (p.y - p.cy) * 0.14;
      // rotation liée à la vitesse, 2° maximum, se redresse à l'arrêt
      const target = Math.max(-2, Math.min(2, (p.cx - prevX) * 0.35));
      p.rot += (target - p.rot) * 0.1;
      el.style.transform = `translate(${p.cx + 24}px, ${p.cy - 190}px) rotate(${p.rot}deg)`;
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    pos.current.x = e.clientX;
    pos.current.y = e.clientY;
  };

  return (
    <div onMouseMove={onMove} className="relative">
      {/* Image mobile, fondu au-dessus de la liste */}
      <div className="photo-treated photo-brand relative mb-10 aspect-[4/3] overflow-hidden lg:hidden">
        {services.map((s, i) => {
          const frame = SERVICE_FRAMES[s.slug];
          if (!frame)
            return (
              <div
                key={s.slug}
                className="absolute inset-0 bg-graphite transition-opacity duration-700"
                style={{ opacity: i === mobileActive ? 1 : 0 }}
              />
            );
          return (
            <Image
              key={s.slug}
              src={universeSrc(frameUniverse(frame), "1080")}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 128px, 100vw"
              className="object-cover transition-opacity duration-700"
              style={{
                opacity: i === mobileActive ? 1 : 0,
                objectPosition: frame.position ?? "50% 50%",
                transform: frame.zoom ? `scale(${frame.zoom})` : undefined,
              }}
            />
          );
        })}
      </div>

      <ul>
        {services.map((s, i) => (
          <li key={s.slug} className="border-b border-stone/20 first:border-t">
            <Link
              href={`/${locale}/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onTouchStart={() => setMobileActive(i)}
              data-cursor="voir"
              className="group relative flex items-baseline gap-6 overflow-hidden py-6 md:py-7"
            >
              {/* le fond vert club se remplit de gauche à droite */}
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-graphite transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <span
                className={`display relative z-10 w-10 shrink-0 pl-3 text-sm transition-colors duration-300 md:pl-4 ${
                  active === i ? "text-az-ivory" : "text-stone/70"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`display relative z-10 pr-3 text-3xl leading-[1.05] transition-[transform,color] duration-500 md:text-5xl ${
                  active === i ? "translate-x-3 text-az-ivory" : "text-az-ivory"
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
        className="pointer-events-none fixed top-0 left-0 z-30 hidden will-change-transform lg:block"
        style={{ transform: "translate(-9999px, -9999px)" }}
      >
        <div
          className={`photo-treated photo-brand relative h-[380px] w-[290px] overflow-hidden transition-opacity duration-300 ${
            active !== null ? "opacity-100" : "opacity-0"
          }`}
        >
          {services.map((s, i) => {
            const frame = SERVICE_FRAMES[s.slug];
            if (!frame)
              return (
                <div
                  key={s.slug}
                  className="absolute inset-0 bg-graphite transition-opacity duration-300"
                  style={{ opacity: i === active ? 1 : 0 }}
                />
              );
            return (
              <Image
                key={s.slug}
                src={universeSrc(frameUniverse(frame), "540")}
                alt=""
                fill
                sizes="290px"
                className="object-cover transition-opacity duration-300"
                style={{
                  opacity: i === active ? 1 : 0,
                  objectPosition: frame.position ?? "50% 50%",
                  transform: frame.zoom ? `scale(${frame.zoom})` : undefined,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
