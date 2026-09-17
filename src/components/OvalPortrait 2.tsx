"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Le grand ovale de la charte, en portrait : le trait laiton se dessine
 * autour de la photo qui apparaît dans un léger zoom. Une fois par page.
 * Sans JavaScript : trait et photo visibles directement.
 */
export function OvalPortrait({
  src,
  alt = "",
  className = "",
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ellipse = el.querySelector("ellipse");
    const img = el.querySelector("[data-oval-img]");
    if (!ellipse || !img) return;
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 78%", once: true },
    });
    tl.fromTo(
      ellipse,
      { strokeDashoffset: 1 },
      { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" },
      0
    ).from(img, { autoAlpha: 0, scale: 1.08, duration: 1.3, ease: "power2.out" }, 0.4);
    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={`relative aspect-[100/130] ${className}`}>
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" fill="none">
        <ellipse
          cx="50"
          cy="65"
          rx="49.4"
          ry="64.4"
          stroke="#B8935A"
          strokeWidth="0.6"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset="0"
        />
      </svg>
      <div
        data-oval-img
        className="photo-treated absolute inset-[4.5%] overflow-hidden rounded-[50%]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 80vw, 420px"
          className="object-cover"
        />
      </div>
    </div>
  );
}
