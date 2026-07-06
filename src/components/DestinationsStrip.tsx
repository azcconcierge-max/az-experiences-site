import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { destinations } from "@/data/destinations";

/**
 * Panorama accordéon des destinations : chaque panneau s'ouvre au survol,
 * les autres s'assombrissent. Pur CSS, spectaculaire et léger.
 */
export function DestinationsStrip({
  locale,
  ctaLabel,
}: {
  locale: Locale;
  ctaLabel: string;
}) {
  return (
    <div className="dest-strip">
      {destinations.map((dest) => (
        <Link
          key={dest.slug}
          href={`/${locale}/destinations/${dest.slug}`}
          className="dest-panel group"
        >
          <div className="dest-photo absolute inset-0">
            <Image
              src={`/images/dest-${dest.slug}.jpg`}
              alt={dest.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/25 to-noir/30"
            />
          </div>

          {/* Nom vertical quand le panneau est fermé (desktop) */}
          <span
            aria-hidden="true"
            className="dest-name-v display absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xl tracking-wide text-ivory [writing-mode:vertical-rl] lg:block"
          >
            {dest.name}
          </span>

          {/* Détail révélé à l'ouverture */}
          <div className="dest-detail absolute inset-x-0 bottom-0 p-6 md:p-8">
            <p className="mb-2 text-[0.6rem] tracking-[0.3em] text-gold uppercase">
              {dest.region[locale]}
            </p>
            <p className="display text-3xl text-ivory md:text-4xl">{dest.name}</p>
            <p className="display mt-2 max-w-xs text-sm text-ivory/70 italic md:text-base">
              {dest.tagline[locale]}
            </p>
            <span className="mt-4 inline-flex items-center gap-3 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
              {ctaLabel}
              <span className="inline-block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
