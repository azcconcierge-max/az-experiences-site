"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Barre d'appel discrète : apparaît après la moitié du parcours de lecture,
 * quand l'envie est là. Jamais sur la page contact.
 */
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
        className="block border border-gold bg-noir/90 px-8 py-3.5 text-[0.68rem] tracking-[0.3em] text-gold uppercase backdrop-blur-md transition-colors duration-500 hover:bg-gold hover:text-noir"
      >
        {label}
      </Link>
    </div>
  );
}
