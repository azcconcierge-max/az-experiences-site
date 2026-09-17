"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales } from "@/i18n";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string };

/**
 * En-tête : transparent au-dessus du hero (texte lin), lin flouté au
 * défilement, masqué quand on descend, visible quand on remonte.
 */
export function Header({
  locale,
  nav,
  ctaLabel,
}: {
  locale: string;
  nav: NavItem[];
  ctaLabel: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 32);
      setHidden(y > 160 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const localeHref = (target: string) =>
    pathname?.replace(new RegExp(`^/${locale}`), `/${target}`) || `/${target}`;

  // Transparent uniquement au-dessus d'un hero sombre (liste tenue à jour
  // au fil de la refonte) ; ailleurs, fond lin permanent.
  const darkHeroRoutes = [`/${locale}`, `/${locale}/qui-sommes-nous`, `/${locale}/guide`];
  const darkHeroPrefixes = [`/${locale}/services/`, `/${locale}/destinations`];
  const hasDarkHero =
    darkHeroRoutes.includes(pathname ?? "") ||
    darkHeroPrefixes.some((p) => (pathname ?? "").startsWith(p));
  // Menu ouvert : l'en-tête passe en lin sur le dégradé Nuit du menu.
  const solid = !open && (scrolled || !hasDarkHero);
  const linkBase = solid ? "text-club/80 hover:text-club" : "text-lin/85 hover:text-lin";
  const linkActive = solid ? "text-laiton-fonce" : "text-laiton-clair";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        open
          ? "bg-nuit"
          : solid
            ? "bg-lin/90 shadow-[0_1px_0_rgba(184,147,90,0.25)] backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 md:px-10">
        <div className={`origin-left transition-transform duration-500 ${scrolled ? "scale-[0.82]" : ""}`}>
          <Logo locale={locale} variant={solid ? "vert" : "lin"} size={50} withName className="max-sm:[&>span]:hidden" />
        </div>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`u-line text-[0.8rem] font-normal lowercase tracking-[0.12em] transition-colors duration-300 ${
                pathname?.startsWith(item.href) ? `nav-active ${linkActive}` : linkBase
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <nav aria-label="Langues" className="hidden items-center gap-2.5 md:flex">
            {locales.map((l) => (
              <Link
                key={l}
                href={localeHref(l)}
                aria-current={l === locale ? "true" : undefined}
                className={`inline-flex h-6 min-w-6 items-center justify-center text-[0.7rem] lowercase tracking-[0.12em] transition-colors ${
                  l === locale ? linkActive : solid ? "text-club/50 hover:text-club" : "text-lin/60 hover:text-lin"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${locale}/contact`}
            className={`hidden rounded-full px-6 py-2.5 text-[0.8rem] font-normal transition-colors duration-500 lg:inline-block ${
              solid ? "bg-club text-lin hover:bg-nuit" : "bg-lin text-club hover:bg-ivory-soft"
            }`}
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 transition-transform duration-300 ${solid ? "bg-club" : "bg-lin"} ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 transition-transform duration-300 ${solid ? "bg-club" : "bg-lin"} ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="nuit grain fixed inset-0 top-20 flex flex-col justify-between overflow-y-auto px-6 pt-10 pb-8 lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-4">
            {nav.map((item, i) => (
              <li key={item.href} className="menu-link" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className={`display text-4xl leading-[1.15] transition-colors ${
                    pathname?.startsWith(item.href) ? "text-laiton-clair" : "text-lin hover:text-laiton-clair"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div
            className="menu-link flex items-center justify-between gap-6 pt-10"
            style={{ "--i": nav.length } as React.CSSProperties}
          >
            <Link
              href={`/${locale}/contact`}
              className="inline-block rounded-full bg-lin px-7 py-3 text-[0.85rem] text-club"
            >
              {ctaLabel}
            </Link>
            <span className="flex gap-4">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localeHref(l)}
                  className={`inline-flex h-6 min-w-6 items-center justify-center text-[0.8rem] lowercase tracking-[0.12em] ${
                    l === locale ? "text-laiton-clair" : "text-lin/60"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
