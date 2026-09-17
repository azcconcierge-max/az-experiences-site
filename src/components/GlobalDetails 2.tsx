"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Détails globaux appliqués à toutes les pages :
 * - le filet laiton qui se trace sous chaque mention de section
 *   quand elle entre à l'écran ;
 * - les images chargées en différé qui arrivent en fondu (fond sauge,
 *   flou qui se dissipe), jamais d'espace blanc brut.
 * Relancé à chaque changement de page.
 */
export function GlobalDetails() {
  const pathname = usePathname();

  useEffect(() => {
    // Filets sous les mentions
    const eyebrows = document.querySelectorAll<HTMLElement>("main p.eyebrow");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("filet-drawn");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    eyebrows.forEach((el) => io.observe(el));

    // Révélations en montée (nom géant du footer) : visibles sans JavaScript,
    // masquées puis animées seulement une fois le script chargé.
    const riseIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("risen");
            riseIO.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -4% 0px" }
    );
    const rises: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-rise]").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) return;
      el.classList.add("rise-init");
      riseIO.observe(el);
      rises.push(el);
    });

    // Fondu des images en différé
    const marked: HTMLImageElement[] = [];
    const onLoad = (e: Event) => {
      const img = e.currentTarget as HTMLImageElement;
      img.classList.add("img-loaded");
      img.classList.remove("img-loading");
    };
    document.querySelectorAll<HTMLImageElement>('main img[loading="lazy"]').forEach((img) => {
      if (img.complete || img.classList.contains("img-loaded")) return;
      img.classList.add("img-loading");
      img.addEventListener("load", onLoad, { once: true });
      marked.push(img);
    });

    return () => {
      io.disconnect();
      riseIO.disconnect();
      rises.forEach((el) => el.classList.remove("rise-init", "risen"));
      marked.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.classList.remove("img-loading");
      });
    };
  }, [pathname]);

  return null;
}
