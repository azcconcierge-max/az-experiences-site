import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { destinations, getDestination, type GuideCategory } from "@/data/destinations";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { Marquee } from "@/components/Marquee";
import { Parallax } from "@/components/Parallax";
import { JsonLd } from "@/components/JsonLd";

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
  const others = destinations.filter((x) => x.slug !== slug);

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

  return (
    <>
      <JsonLd data={placeJsonLd} />

      {/* ---- HERO plein écran ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden">
        <div aria-hidden="true" className="kenburns absolute inset-0">
          <Image
            src={`/images/dest-${dest.slug}.jpg`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/35 to-noir/25" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/destinations`}
              className="mb-8 inline-block text-[0.65rem] tracking-[0.25em] text-ivory-dim uppercase transition-colors hover:text-gold"
            >
              ← {dict.nav.destinations}
            </Link>
            <p className="eyebrow mb-4">{dest.region[locale]}</p>
            <h1 className="display text-6xl leading-[0.95] text-ivory md:text-9xl">{dest.name}</h1>
            <p className="display mt-6 max-w-xl text-xl text-ivory/75 italic md:text-2xl">
              {dest.tagline[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- STORYTELLING ---- */}
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-2xl leading-relaxed text-ivory md:text-3xl">
              {dest.intro[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      <Marquee items={allSpots.map((s) => s.name)} />

      {/* ---- LE GUIDE DE LA MAISON (ivoire), 4 rubriques ---- */}
      <section className="section-ivory px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-5">{d.spotsLabel}</p>
            <h2 className="display mb-4 max-w-2xl text-3xl leading-[1.1] md:text-5xl">
              {d.spotsTitle}
            </h2>
            <p className="mb-14 max-w-xl text-sm leading-relaxed text-ink-dim md:text-base">
              {d.spotsNote}
            </p>
          </Reveal>
          <div className="flex flex-col gap-20">
            {cats.map((cat, ci) => (
              <div
                key={cat}
                className={`grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 ${
                  ci % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Reveal className="lg:sticky lg:top-28">
                  <div className="img-reveal relative aspect-[4/3] overflow-hidden">
                    <Parallax amount={24} className="absolute -inset-y-8 inset-x-0">
                      <Image
                        src={`/images/guide-${cat}.jpg`}
                        alt={d.cats[cat]}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover"
                      />
                    </Parallax>
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent"
                    />
                    <span className="display absolute bottom-5 left-6 text-3xl text-ivory italic">
                      {d.cats[cat]}
                    </span>
                  </div>
                </Reveal>
                <div>
                  <Reveal>
                    <div className="mb-2 flex items-baseline gap-5">
                      <span className="display text-sm text-gold-deep/70">
                        {String(ci + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display text-2xl text-gold-deep italic md:text-3xl">
                        {d.cats[cat]}
                      </h3>
                      <div className="gold-rule flex-1 opacity-30" />
                    </div>
                  </Reveal>
                  {dest.guide[cat].map((spot) => (
                    <Reveal key={spot.name}>
                      <div className="group border-t border-ink/10 py-7">
                        <h4 className="display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                          {spot.name}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-ink-dim md:text-base">
                          {spot.text[locale]}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CE QUE NOUS ORCHESTRONS + CTA ---- */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <p className="eyebrow mb-5">{d.whatWeDo}</p>
            <ul className="flex flex-col gap-5">
              {dest.offers[locale].map((offer) => (
                <li key={offer} className="flex items-start gap-4 text-lg text-ivory/90">
                  <span aria-hidden="true" className="mt-3 h-px w-6 shrink-0 bg-gold" />
                  {offer}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={150}>
            <div className="border border-gold/30 bg-noir-card p-10 text-center">
              <p className="display mb-3 text-2xl text-ivory">{dict.contact.title}</p>
              <p className="mb-8 text-sm leading-relaxed text-ivory-dim">{dict.contact.intro}</p>
              <GoldLink href={`/${locale}/contact`} solid>
                {dict.cta.request}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- AUTRES DESTINATIONS ---- */}
      <section className="border-t border-ivory/8 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid grid-cols-2 gap-px border border-ivory/8 bg-ivory/8 md:grid-cols-5">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/destinations/${other.slug}`}
                  className="group relative block aspect-square overflow-hidden bg-noir"
                >
                  <Image
                    src={`/images/dest-${other.slug}.jpg`}
                    alt={other.name}
                    fill
                    sizes="20vw"
                    className="object-cover opacity-50 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <span className="display absolute inset-x-0 bottom-4 text-center text-lg text-ivory">
                    {other.name}
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
