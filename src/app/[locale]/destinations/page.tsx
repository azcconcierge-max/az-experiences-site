import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { destinations } from "@/data/destinations";
import { pageAlternates } from "@/lib/seo";
import { destinationVisual } from "@/lib/univers";
import { cityName } from "@/lib/names";
import { CtaBand, DestCard, PvPage, TextHero } from "@/components/pv/blocks";

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
    <PvPage>
      <TextHero locale={locale} dict={dict} k={d.eyebrow} title={`${d.title}.`} sub={d.introShort} crumbs={[[dict.nav.destinations]]} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="dest-grid">
            {destinations.map((x) => (
              <DestCard key={x.slug} slug={x.slug} name={cityName(x.name, locale)} k={x.region[locale]} tag={x.tagline[locale]} visual={destinationVisual(x.slug)} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} />
    </PvPage>
  );
}
