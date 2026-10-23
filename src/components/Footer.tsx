import Link from "next/link";
import { site, whatsappHref } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Logo } from "./Logo";
import { BackToTop } from "./BackToTop";

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
    <footer className="border-t border-graphite bg-black">
      <div className="wrap grid gap-12 py-24 md:grid-cols-4">
        <div className="flex flex-col items-start gap-5">
          <Logo locale={locale} size={64} />
          <p className="text-sm text-ivory/80">{dict.footer.tagline}</p>
        </div>

        <nav aria-label={dict.footer.navTitle}>
          <h3 className="eyebrow mb-5">{dict.footer.navTitle}</h3>
          <ul className="flex flex-col gap-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="u-line text-sm text-ivory/75 transition-colors hover:text-ivory"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-5">{dict.footer.contactTitle}</h3>
          <ul className="flex flex-col gap-3 text-sm text-ivory/75">
            <li>
              <a
                href={`mailto:${site.email}`}
                className="u-line transition-colors hover:text-ivory"
              >
                {site.email}
              </a>
            </li>
            {whatsappHref() ? (
              <li>
                <a
                  href={whatsappHref()!}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-line transition-colors hover:text-ivory"
                >
                  {dict.cta.whatsapp}
                </a>
              </li>
            ) : null}
            {site.linkedin ? (
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="u-line transition-colors hover:text-ivory"
                >
                  LinkedIn
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
          <ul className="flex flex-col gap-3 text-sm text-ivory/75">
            <li>
              <Link
                href={`/${locale}/mentions-legales`}
                className="u-line transition-colors hover:text-ivory"
              >
                {dict.footer.mentions}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/confidentialite`}
                className="u-line transition-colors hover:text-ivory"
              >
                {dict.footer.privacy}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/conditions-generales`}
                className="u-line transition-colors hover:text-ivory"
              >
                {dict.footer.terms}
              </Link>
            </li>
            <li>
              <Link
                href={`/${locale}/remboursements`}
                className="u-line transition-colors hover:text-ivory"
              >
                {dict.footer.refunds}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap">
        <div className="h-px bg-graphite" />
        <div className="flex flex-col items-center justify-between gap-4 py-6 caption !text-stone md:flex-row">
          <span>
            © {year} {site.name}. {dict.footer.rights}
          </span>
          <span className="flex items-center gap-6">
            <span className="city text-[0.7rem] text-ivory/70">Paris</span>
            <BackToTop label={dict.footer.backToTop} />
          </span>
        </div>
      </div>

    </footer>
  );
}
