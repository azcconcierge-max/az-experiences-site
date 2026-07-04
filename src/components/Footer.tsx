import Link from "next/link";
import { site } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Logo } from "./Logo";

export function Footer({ locale, dict }: { locale: string; dict: Dict }) {
  const year = new Date().getFullYear();
  const nav = [
    { href: `/${locale}/maison`, label: dict.nav.maison },
    { href: `/${locale}/conciergerie`, label: dict.nav.conciergerie },
    { href: `/${locale}/transport`, label: dict.nav.transport },
    { href: `/${locale}/hospitality`, label: dict.nav.hospitality },
    { href: `/${locale}/evenements`, label: dict.nav.evenements },
  ];

  return (
    <footer className="border-t border-ivory/8 bg-noir-soft">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="flex flex-col items-start gap-4">
          <Logo locale={locale} />
          <p className="text-sm text-ivory-dim italic">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <h3 className="eyebrow mb-5">{dict.footer.navTitle}</h3>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-ivory/70 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5">{dict.footer.contactTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm text-ivory/70">
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-gold">
                {site.email}
              </a>
            </li>
            <li>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">{dict.footer.legalTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm text-ivory/70">
            <li>
              <Link
                href={`/${locale}/mentions-legales`}
                className="transition-colors hover:text-gold"
              >
                {dict.footer.mentions}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/confidentialite`}
                className="transition-colors hover:text-gold"
              >
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-ivory-dim md:flex-row md:px-8">
          <span>
            © {year} {site.name}. {dict.footer.rights}
          </span>
          <span className="tracking-[0.2em] uppercase">Paris</span>
        </div>
      </div>
    </footer>
  );
}
