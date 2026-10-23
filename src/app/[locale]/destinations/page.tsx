import type { Metadata } from "next";
import Link from "next/link";
import { destinationVisual, visuals } from "@/lib/univers";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { destinations } from "@/data/destinations";
import { PosterHero, UniverseTile } from "@/components/poster";
import { Reveal } from "@/components/Reveal";
import { AskSection } from "@/components/AskSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).destinations;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/destinations", locale),
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.destinations;

  return (
    <>
      <PosterHero locale={locale}
        visual={visuals.destinationsHero}
        label={d.eyebrow}
        title={d.title}
        chapter="04"
        footer={`AZ Experiences — ${dict.nav.destinations}`}
      />
      <section className="pt-24 pb-12">
        <div className="wrap">
          <p className="t-h2 max-w-[40rem] text-ivory">{d.introShort}</p>
        </div>
      </section>

      {/* ---- Six territoires, une couleur chacun ---- */}
      <section className="pb-24">
        <div className="wrap grid gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {destinations.map((dest, i) => (
            <Reveal key={dest.slug} delay={(i % 3) * 80}>
              <UniverseTile locale={locale}
                href={`/${locale}/destinations/${dest.slug}`}
                visual={destinationVisual(dest.slug)}
                label={`${dest.name} · ${dest.region[locale]}`}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <p className="t-small mt-3 text-ivory/70">{dest.tagline[locale]}</p>
              <Link
                href={`/${locale}/destinations/${dest.slug}`}
                className="label mt-4 inline-block text-ivory transition-opacity hover:opacity-60"
              >
                {d.explore} →
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
