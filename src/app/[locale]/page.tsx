import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { TitleReveal, LineMask } from "@/components/TitleReveal";
import { ClipReveal } from "@/components/ClipReveal";
import { HorizontalEvents } from "@/components/HorizontalEvents";
import { AskSection } from "@/components/AskSection";
import { DestinationsShowcase } from "@/components/DestinationsShowcase";
import { ServicesIndex } from "@/components/ServicesIndex";
import { TestimonialRotator } from "@/components/TestimonialRotator";
import { Marquee } from "@/components/Marquee";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.home.metaTitle },
    description: dict.home.metaDescription,
    alternates: pageAlternates("", locale),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const h = dict.home;

  return (
    <>
      {/* ---- 1 · HERO 100svh : photo plein cadre, presque rien d'autre ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-nuit">
        <div aria-hidden="true" className="photo-treated absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image
              src="/images/hero.jpg"
              alt=""
              fill
              priority
              quality={60}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          {/* léger voile en haut pour le header, fondu vert en bas */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,36,25,0.55) 0%, rgba(14,36,25,0.12) 26%, rgba(14,36,25,0.15) 55%, #0E2419 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10 md:pb-24">
          <LineMask delay={150}>
            <p className="eyebrow">{h.heroEyebrow}</p>
          </LineMask>
          <h1 className="display mt-5 text-[clamp(3.2rem,9.5vw,10.5rem)] leading-[0.95] text-lin">
            {/* L'espace après la ligne 1 garde « L'accès est notre métier »
                lisible d'un trait par les moteurs et lecteurs d'écran. */}
            <LineMask delay={300}>
              <span className="block">{h.heroLine1} </span>
            </LineMask>
            <LineMask delay={430}>
              <span className="block">{h.heroLine2}</span>
            </LineMask>
          </h1>
          <div className="mt-10">
            <LineMask delay={620}>
              <span className="inline-block">
                <Button href={`/${locale}/contact`} variant="lin">
                  {dict.cta.request}
                </Button>
              </span>
            </LineMask>
          </div>
        </div>
      </section>

      {/* ---- 2 · MANIFESTE (lin) : une phrase, mot par mot ---- */}
      <section className="px-5 py-32 md:px-10 md:py-44">
        <div className="mx-auto max-w-[1100px] text-center">
          <TitleReveal
            text={h.manifesto}
            as="p"
            mode="scrub"
            className="display text-[clamp(2.2rem,6vw,6.5rem)] leading-[1.05]"
          />
          <Reveal delay={200} className="mt-14 flex flex-col items-center gap-4">
            <Image
              src="/brand/logos/AZ-medaillon-petites-tailles-vert.svg"
              alt=""
              width={44}
              height={56}
            />
            <p className="eyebrow">{h.manifestoSignature}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- 3 · LES RENDEZ-VOUS (vert nuit) : défilement horizontal ---- */}
      <section className="nuit grain">
        <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-32">
          <p className="eyebrow mb-5">{h.eventsEyebrow}</p>
          <div className="flex flex-wrap items-end justify-between gap-8 pb-14">
            <TitleReveal
              text={h.eventsTitle}
              className="display text-[clamp(2.6rem,6vw,6rem)] leading-[0.98] text-lin"
            />
            <div className="max-w-sm">
              <p className="text-base leading-[1.7] font-light text-lin/80">{h.eventsIntro}</p>
              <div className="mt-6">
                <Button href={`/${locale}/evenements`}>{dict.cta.allEvents}</Button>
              </div>
            </div>
          </div>
        </div>
        <HorizontalEvents events={events} locale={locale} ctaLabel={dict.cta.requestAccess} />
        <div className="pt-14">
          <Marquee items={events.map((e) => e.name)} />
        </div>
      </section>

      {/* ---- 4 · DESTINATIONS plein écran ---- */}
      <DestinationsShowcase locale={locale} eyebrow={dict.destinations.homeEyebrow} />

      {/* ---- 5 · SERVICES (lin) : index éditorial ---- */}
      <section className="px-5 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow mb-5">{h.servicesEyebrow}</p>
          <div className="flex flex-wrap items-end justify-between gap-8 pb-12">
            <TitleReveal
              text={h.servicesTitle}
              className="display max-w-4xl text-[clamp(2.4rem,5vw,5rem)] leading-[1.02]"
            />
            <Button href={`/${locale}/services`} className="mb-2">
              {dict.cta.allServices}
            </Button>
          </div>
          <ServicesIndex locale={locale} />
        </div>
      </section>

      {/* ---- 6 · LA MAISON (vert club) : photo + un témoignage ---- */}
      <section className="bg-club overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
          <ClipReveal className="photo-treated relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <Image
              src="/images/dest-paris.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ClipReveal>
          <div>
            <p className="eyebrow mb-10">{h.avisEyebrow}</p>
            <TestimonialRotator locale={locale} />
            <div className="mt-12">
              <Link
                href={`/${locale}/qui-sommes-nous`}
                className="text-[0.85rem] font-normal lowercase tracking-[0.12em] text-laiton-clair transition-opacity hover:opacity-70"
              >
                {h.aboutLink} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ---- 7 · DEMANDE PRIVÉE partagée (Crépuscule, plein écran) ---- */}
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
