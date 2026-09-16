"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { locales } from "@/i18n";
import { Logo } from "./Logo";

type NavItem = { href: string; label: string };

/** En-tête clair : médaillon, navigation en mentions, bouton arrondi. */
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

  const localeHref = (target: string) =>
    pathname?.replace(new RegExp(`^/${locale}`), `/${target}`) || `/${target}`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-lin transition-shadow duration-500 ${
        scrolled || open ? "border-b border-laiton/30 shadow-[0_1px_0_rgba(184,147,90,0.12)]" : ""
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <Logo locale={locale} variant="vert" size={52} />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[0.8rem] font-normal lowercase tracking-[0.12em] transition-colors duration-300 ${
                pathname?.startsWith(item.href)
                  ? "text-laiton"
                  : "text-club/80 hover:text-club"
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
                className={`text-[0.7rem] lowercase tracking-[0.12em] transition-colors ${
                  l === locale ? "text-laiton" : "text-club/50 hover:text-club"
                }`}
              >
                {l}
              </Link>
            ))}
          </nav>
          <Link
            href={`/${locale}/contact`}
            className="hidden rounded-full bg-club px-6 py-2.5 text-[0.8rem] font-normal text-lin transition-colors duration-500 hover:bg-nuit lg:inline-block"
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
              className={`h-px w-6 bg-club transition-transform duration-300 ${
                open ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-club transition-transform duration-300 ${
                open ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-laiton/30 bg-lin px-5 py-8 lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="display text-2xl text-club transition-colors hover:text-laiton"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-block rounded-full bg-club px-7 py-3 text-[0.85rem] text-lin"
              >
                {ctaLabel}
              </Link>
            </li>
            <li className="flex gap-4 pt-2">
              {locales.map((l) => (
                <Link
                  key={l}
                  href={localeHref(l)}
                  className={`text-[0.75rem] lowercase tracking-[0.12em] ${
                    l === locale ? "text-laiton" : "text-club/50"
                  }`}
                >
                  {l}
                </Link>
              ))}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
