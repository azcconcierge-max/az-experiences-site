import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { destinations, getDestination, type GuideCategory } from "@/data/destinations";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { TitleReveal, LineMask, LetterMask } from "@/components/TitleReveal";
import { ClipReveal } from "@/components/ClipReveal";
import { DestinationsShowcase } from "@/components/DestinationsShowcase";
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

  return (
    <>
      <JsonLd data={placeJsonLd} />

      {/* ---- 1 · HERO : le nom de la ville, lettre à lettre ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-nuit">
        <div aria-hidden="true" className="photo-treated absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image
              src={`/images/dest-${dest.slug}.jpg`}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,12,0.6) 0%, rgba(13,13,12,0.18) 30%, rgba(13,13,12,0.35) 60%, #0D0D0C 100%)",
            }}
          />
        </div>
        <Breadcrumb
          ariaLabel={dict.nav.destinations}
          items={[
            { href: `/${locale}`, label: dict.nav.home },
            { href: `/${locale}/destinations`, label: dict.nav.destinations },
            { label: dest.name.toLowerCase() },
          ]}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-10 md:pb-20">
          <LineMask delay={220}>
            <p className="eyebrow">{dest.region[locale]}</p>
          </LineMask>
          <h1 className="city mt-4 text-[clamp(3.2rem,11.5vw,12rem)] leading-[0.95] text-lin">
            <LetterMask text={dest.name} delay={350} step={55} />
          </h1>
          <LineMask delay={350 + dest.name.length * 55 + 200}>
            <p className="display mt-6 max-w-2xl text-xl leading-[1.3] text-lin/85 md:text-2xl">
              {dest.tagline[locale]}
            </p>
          </LineMask>
        </div>
      </section>

      {/* ---- 2 · RÉCIT (lin) : mot à mot au défilement ---- */}
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1100px]">
          <TitleReveal
            text={dest.intro[locale]}
            as="p"
            mode="scrub"
            className="display text-[clamp(1.6rem,3.4vw,3.1rem)] leading-[1.3]"
          />
        </div>
      </section>

      {/* ---- 3 · LE GUIDE en quatre chapitres ---- */}
      <section className="px-5 pb-10 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow mb-5">{d.spotsLabel}</p>
          <TitleReveal
            text={d.spotsTitle}
            className="display mb-4 max-w-2xl text-3xl leading-[1.02] md:text-5xl"
          />
          <Reveal>
            <p className="max-w-xl text-sm leading-[1.7] font-light text-ink-dim md:text-base">
              {d.spotsNote}
            </p>
          </Reveal>
        </div>
      </section>

      {cats.map((cat, ci) => (
        <section key={cat} className="px-5 py-12 md:px-10 md:py-16">
          <div className="mx-auto max-w-[1440px]">
            {/* Couverture du chapitre : image pleine largeur, titre posé dessus */}
            <ClipReveal className="photo-treated relative aspect-[4/3] overflow-hidden rounded-[2px] md:aspect-[21/9]">
              <Image
                src={`/images/guide-${cat}.jpg`}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 92vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,13,12,0.05) 40%, rgba(13,13,12,0.7) 100%)",
                }}
              />
              <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between md:right-10 md:bottom-8 md:left-10">
                <h3 className="display text-3xl text-lin md:text-6xl">{d.cats[cat]}</h3>
                <span className="display mb-1 text-sm text-laiton-clair md:text-base">
                  {String(ci + 1).padStart(2, "0")} / {String(cats.length).padStart(2, "0")}
                </span>
              </div>
            </ClipReveal>

            {/* Les trois adresses du chapitre */}
            <div className="mx-auto mt-4 max-w-[1100px]">
              {dest.guide[cat].map((spot, si) => (
                <Reveal key={spot.name} delay={si * 90}>
                  <div className="group grid gap-2 border-b border-club/12 py-8 md:grid-cols-[72px_1fr] md:gap-8 md:py-10">
                    <span className="display pt-1 text-sm text-laiton-fonce">
                      {String(si + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h4 className="display text-2xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                        {spot.name}
                      </h4>
                      <p className="mt-3 max-w-[60ch] text-sm leading-[1.7] font-light text-ink-dim md:text-base">
                        {spot.text[locale]}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ---- 4 · SUR PLACE, NOUS ORCHESTRONS (vert nuit) ---- */}
      <section className="nuit grain mt-12 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow mb-5">{d.whatWeDo}</p>
          <TitleReveal
            text={dest.tagline[locale]}
            className="display mb-14 max-w-3xl text-3xl leading-[1.05] text-lin md:text-5xl"
          />
          <div className="grid gap-x-16 gap-y-6 md:grid-cols-2">
            {dest.offers[locale].map((offer) => (
              <Reveal key={offer}>
                <p className="flex items-start gap-4 border-b border-lin/12 pb-6 text-base font-light text-lin/85 md:text-lg">
                  <span aria-hidden="true" className="filet mt-3 w-6 shrink-0" />
                  {offer}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150}>
            <div className="mt-14">
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.request}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- 5 · CONTINUER LE VOYAGE : plein écran ---- */}
      <DestinationsShowcase locale={locale} eyebrow={d.homeEyebrow} exclude={slug} />
    </>
  );
}
