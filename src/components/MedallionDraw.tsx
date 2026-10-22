"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Le monogramme AZ qui paraît à l'entrée dans l'écran, souligné d'un
 * trait qui se trace. Sans JavaScript : visible directement.
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
  const color = variant === "vert" ? "black" : "ivory";
  const height = Math.round((width * 471) / 646);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const img = el.querySelector("img");
    const line = el.querySelector("[data-line]");
    if (!img || !line) return;
    let tl: gsap.core.Timeline;
    try {
      tl = gsap.timeline({ scrollTrigger: { trigger: el, start, once: true } });
      tl.from(img, { autoAlpha: 0, y: 10, duration: 0.8, ease: "power2.out" }, 0).fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power2.inOut" },
        0.3
      );
    } catch {
      return;
    }
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [start]);

  return (
    <div ref={ref} className={`flex flex-col items-center gap-5 ${className}`}>
      <Image
        src={`/brand2/logos/az-monogram-${color}${width < 64 ? "-small-sizes" : ""}.svg`}
        alt=""
        width={width}
        height={height}
      />
      <span
        data-line
        aria-hidden="true"
        className={`block h-px w-12 origin-center ${variant === "vert" ? "bg-az-black/40" : "bg-stone/70"}`}
      />
    </div>
  );
}
