"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Bouton d'appel discret, après la moitié du parcours. Jamais sur la page contact. */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrollable > 800 && window.scrollY > scrollable * 0.45);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname?.includes("/contact")) return null;

  return (
    <div
      className={`sticky-cta fixed bottom-5 left-1/2 z-40 -translate-x-1/2 ${
        visible ? "is-visible" : ""
      }`}
    >
      <Link
        href={href}
        className="block rounded-full border border-lin/25 bg-club px-8 py-3.5 text-[0.85rem] font-normal text-lin shadow-lg transition-colors duration-500 hover:bg-nuit"
      >
        {label}
      </Link>
    </div>
  );
}
