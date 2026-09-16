import Link from "next/link";
import { site, whatsappHref } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Logo } from "./Logo";
import { Filet } from "./brand";

export function Footer({ locale, dict }: { locale: string; dict: Dict }) {
  const year = new Date().getFullYear();
  const nav = [
    { href: `/${locale}/qui-sommes-nous`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/evenements`, label: dict.nav.events },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/guide`, label: dict.nav.guide },
    { href: `/${locale}/contact`, label: dict.nav.contact },
  ];

  return (
    <footer className="nuit grain">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-4 md:px-8">
        <div className="flex flex-col items-start gap-5">
          <Logo locale={locale} variant="lin" size={64} />
          <p className="text-sm font-light text-lin/80">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <h3 className="eyebrow mb-5">{dict.footer.navTitle}</h3>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-light text-lin/75 transition-colors hover:text-laiton-clair"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5">{dict.footer.contactTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm font-light text-lin/75">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-laiton-clair"
              >
                {site.email}
              </a>
            </li>
            {whatsappHref() ? (
              <li>
                <a
                  href={whatsappHref()!}
                  className="transition-colors hover:text-laiton-clair"
                >
                  {dict.cta.whatsapp}
                </a>
              </li>
            ) : null}
            <li>
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.city}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="eyebrow mb-5">{dict.footer.legalTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm font-light text-lin/75">
            <li>
              <Link
                href={`/${locale}/mentions-legales`}
                className="transition-colors hover:text-laiton-clair"
              >
                {dict.footer.mentions}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/confidentialite`}
                className="transition-colors hover:text-laiton-clair"
              >
                {dict.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Filet />
        <div className="flex flex-col items-center justify-between gap-2 py-6 text-[0.75rem] font-light tracking-[0.12em] text-lin/60 md:flex-row">
          <span>
            © {year} {site.name}. {dict.footer.rights}
          </span>
          <span className="city text-[0.7rem] text-lin/70">Paris</span>
        </div>
      </div>
    </footer>
  );
}
