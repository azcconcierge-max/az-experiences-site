"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Le médaillon dont l'ovale se dessine à l'entrée dans l'écran
 * (ou au moment voulu via `start`). Sans JavaScript : trait visible.
 */
export function MedallionDraw({
  variant = "vert",
  width = 44,
  start = "top 70%",
  className = "",
}: {
  variant?: "vert" | "lin";
  width?: number;
  start?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const height = Math.round((width * 130) / 100);
  const stroke = variant === "vert" ? "#B8935A" : "#D8BD8C";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ellipse = el.querySelector("ellipse");
    const img = el.querySelector("img");
    if (!ellipse || !img) return;
    let tl: gsap.core.Timeline;
    try {
      tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true } });
      tl.fromTo(
        ellipse,
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
        0
      ).from(img, { autoAlpha: 0, duration: 0.7, ease: "power2.out" }, 0.45);
    } catch {
      return;
    }
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start]);

  return (
    <div ref={ref} className={`relative ${className}`} style={{ width, height }}>
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" fill="none">
        <ellipse
          cx="50"
          cy="65"
          rx="49"
          ry="64"
          stroke={stroke}
          strokeWidth="1.4"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      </svg>
      {/* monogramme seul : l'ovale est dessiné par le trait ci-dessus */}
      <Image
        src={`/brand/logos/AZ-monogramme-petites-tailles-${variant === "vert" ? "vert" : "lin"}.svg`}
        alt=""
        width={Math.round(width * 0.52)}
        height={Math.round(width * 0.52)}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
