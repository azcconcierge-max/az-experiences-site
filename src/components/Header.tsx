"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales } from "@/i18n";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string };

/**
 * En-tête : transparent au-dessus du hero, noir flouté au défilement,
 * masqué quand on descend, visible quand on remonte. Toujours ivoire sur noir.
 * Logo en haut à gauche, 48 px de large (guidelines §5).
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
  // au fil de la refonte) ; ailleurs, fond noir permanent.
  const darkHeroRoutes = [`/${locale}`, `/${locale}/qui-sommes-nous`, `/${locale}/guide`];
  const darkHeroPrefixes = [`/${locale}/services/`, `/${locale}/destinations`];
  const hasDarkHero =
    darkHeroRoutes.includes(pathname ?? "") ||
    darkHeroPrefixes.some((p) => (pathname ?? "").startsWith(p));
  const solid = !open && (scrolled || !hasDarkHero);
  const linkBase = "text-ivory/75 hover:text-ivory";
  const linkActive = "text-ivory";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,box-shadow] duration-500 ${
        hidden && !open ? "-translate-y-full" : ""
      } ${
        open
          ? "bg-black"
          : solid
            ? "bg-black/90 shadow-[0_1px_0_var(--color-graphite)] backdrop-blur-md"
            : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-20 items-center justify-between">
        <div className={`origin-left transition-transform duration-500 ${scrolled ? "scale-[0.82]" : ""}`}>
          <Logo locale={locale} size={40} />
        </div>

        <nav className="hidden items-center gap-8 xl:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`label u-line whitespace-nowrap transition-colors duration-300 ${
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
                className={`label inline-flex h-6 min-w-6 items-center justify-center !tracking-[0.15em] transition-colors ${
                  l === locale ? linkActive : "text-ivory/50 hover:text-ivory"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${locale}/contact`}
            className="btn-label hidden border border-ivory bg-ivory px-6 py-3 text-black transition-colors duration-500 hover:bg-transparent hover:text-ivory xl:inline-block"
          >
            {ctaLabel}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
          >
            <span
              className={`h-px w-6 transition-transform duration-300 bg-ivory ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 transition-transform duration-300 bg-ivory ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="fixed inset-0 top-20 flex flex-col justify-between overflow-y-auto bg-black px-4 pt-10 pb-8 xl:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-4">
            {nav.map((item, i) => (
              <li key={item.href} className="menu-link" style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={item.href}
                  className={`t-h1 transition-colors ${
                    pathname?.startsWith(item.href) ? "text-ivory" : "text-ivory/60 hover:text-ivory"
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
              className="btn-label inline-block bg-ivory px-7 py-4 text-black"
            >
              {ctaLabel}
            </Link>
            <span className="flex gap-4">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localeHref(l)}
                  className={`label inline-flex h-6 min-w-6 items-center justify-center !tracking-[0.15em] ${
                    l === locale ? "text-ivory" : "text-ivory/50"
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
