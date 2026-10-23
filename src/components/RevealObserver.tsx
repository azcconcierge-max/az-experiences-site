"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pilote toutes les apparitions du site : ajoute `is-in` aux éléments
 * `.reveal` et `.mono-draw` dès qu'ils atteignent le bas de l'écran, ou
 * s'ils l'ont déjà dépassé (défilement rapide, ancre, retour arrière).
 * Une vérification par frame au plus ; relancé à chaque page. Sans
 * JavaScript, rien n'est masqué (la classe `js` n'est jamais posée).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.92;
      document.querySelectorAll(".reveal:not(.is-in), .mono-draw:not(.is-in)").forEach((el) => {
        if (el.getBoundingClientRect().top < limit) el.classList.add("is-in");
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // contenu ajouté après coup (rotations, menus) : on revérifie
    const mo = new MutationObserver(schedule);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mo.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
