import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { destinations, getDestination, type GuideCategory } from "@/data/destinations";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { destinationVisual, guideVisual } from "@/lib/univers";
import { Illustration, PosterHero, UniverseTile } from "@/components/poster";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";

export function generateStaticParams() {
  return locales.flatMap((locale) => destinations.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  const l = locale as Locale;
  return {
    title: { absolute: `${dest.name} | ${site.name}` },
    description: `${dest.tagline[l]} ${dest.intro[l]}`,
    alternates: pageAlternates(`/destinations/${slug}`, locale),
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const dest = getDestination(slug);
  if (!dest) notFound();
  const dict = getDict(locale);
  const d = dict.destinations;

  const cats: GuideCategory[] = ["vivre", "tables", "verres", "nuit"];
  const allSpots = cats.flatMap((c) => dest.guide[c]);

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.intro[locale],
    touristType: "Luxury travellers",
    includesAttraction: allSpots.map((s) => ({ "@type": "TouristAttraction", name: s.name })),
  };

  const visual = destinationVisual(slug);

  return (
    <>
      <JsonLd data={placeJsonLd} />

      {/* ---- 1 · HERO : le territoire, sa couleur, son nom ---- */}
      <div className="relative">
        <PosterHero locale={locale} visual={visual} label={dest.region[locale]} title={dest.name} subtitle={dest.tagline[locale]} chapter="04" footer={`AZ Experiences — ${dict.nav.destinations}`} short />
        <Breadcrumb
          ariaLabel={dict.nav.destinations}
          items={[
            { href: `/${locale}`, label: dict.nav.home },
            { href: `/${locale}/destinations`, label: dict.nav.destinations },
            { label: dest.name },
          ]}
        />
      </div>

      {/* ---- 2 · RÉCIT : la phrase, puis le texte ---- */}
      <section className="py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-5">
            <p className="t-h2 text-ivory">{dest.tagline[locale]}</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-6 md:col-start-7">
            <p className="t-body measure text-ivory/75">{dest.intro[locale]}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- 3 · LE GUIDE en quatre chapitres ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap">
          <p className="label mb-6">{d.spotsLabel}</p>
          <h2 className="t-h1 max-w-[36rem] text-ivory">{d.spotsTitle}</h2>
          <p className="t-small measure mt-6 text-ivory/70">{d.spotsNote}</p>

          {cats.map((cat, ci) => {
            const chapter = guideVisual(cat);
            return (
              <div key={cat} className="mt-20 grid gap-8 md:grid-cols-12 md:gap-6">
                <Reveal className="md:col-span-4">
                  <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
                    <Illustration locale={locale} visual={chapter} portrait={false} sizes="(max-width: 768px) 100vw, 30vw" />
                  </div>
                  <div className="mt-4 flex items-baseline justify-between">
                    <h3 className="t-h2 text-ivory">{d.cats[cat]}</h3>
                    <span className="label">
                      {String(ci + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
                <div className="md:col-span-7 md:col-start-6">
                  {dest.guide[cat].map((spot, si) => (
                    <Reveal key={spot.name} delay={si * 80}>
                      <div className="grid gap-2 border-b border-graphite py-6 first:pt-0 md:grid-cols-[48px_1fr] md:gap-6">
                        <span className="label pt-1">{String(si + 1).padStart(2, "0")}</span>
                        <div>
                          <h4 className="t-h3 text-ivory">{spot.name}</h4>
                          <p className="t-small measure mt-2 text-ivory/70">{spot.text[locale]}</p>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---- 4 · SUR PLACE, NOUS ORCHESTRONS : la couleur du territoire ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="label mb-6">{d.whatWeDo}</p>
            <Button href={`/${locale}/contact`} variant="lin">
              {dict.cta.request}
            </Button>
          </div>
          <ul className="border-t border-graphite md:col-span-7 md:col-start-6">
            {dest.offers[locale].map((offer) => (
              <li key={offer} className="t-body border-b border-graphite py-4 text-ivory">
                {offer}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---- 5 · LES AUTRES TERRITOIRES ---- */}
      <section className="py-24">
        <div className="wrap">
          <p className="label mb-12">{d.homeEyebrow}</p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5">
            {destinations
              .filter((o) => o.slug !== slug)
              .map((o) => (
                <UniverseTile locale={locale}
                  key={o.slug}
                  href={`/${locale}/destinations/${o.slug}`}
                  visual={destinationVisual(o.slug)}
                  label={o.name}
                  sizes="(max-width: 768px) 50vw, 20vw"
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
