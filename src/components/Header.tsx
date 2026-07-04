"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string };

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Bascule fr/en en conservant la page courante
  const otherLocale = locale === "fr" ? "en" : "fr";
  const switchHref =
    pathname?.replace(new RegExp(`^/${locale}`), `/${otherLocale}`) || `/${otherLocale}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-ivory/8 bg-noir/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Logo locale={locale} />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.68rem] uppercase tracking-[0.22em] transition-colors duration-300 ${
                pathname === item.href ? "text-gold" : "text-ivory/70 hover:text-ivory"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Link
            href={switchHref}
            className="text-[0.68rem] uppercase tracking-[0.22em] text-ivory-dim transition-colors hover:text-gold"
            aria-label={otherLocale === "en" ? "Switch to English" : "Passer en français"}
          >
            {otherLocale.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="hidden border border-gold/60 px-5 py-2 text-[0.65rem] uppercase tracking-[0.25em] text-gold transition-all duration-500 hover:bg-gold hover:text-noir md:inline-block"
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
              className={`h-px w-6 bg-ivory transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-ivory transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-ivory/8 bg-noir/95 px-5 py-8 backdrop-blur-md lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="display text-2xl text-ivory transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-block border border-gold/60 px-6 py-3 text-[0.68rem] uppercase tracking-[0.25em] text-gold"
              >
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
