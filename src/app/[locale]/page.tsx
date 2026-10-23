import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { destinations } from "@/data/destinations";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { destinationVisual, universes, visuals } from "@/lib/univers";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { Monogram } from "@/components/Logo";
import { AskSection } from "@/components/AskSection";
import { ParisClock } from "@/components/ParisClock";
import { TestimonialRotator } from "@/components/TestimonialRotator";
import { EventPoster, Illustration, RuledRow, SectionHead, UniverseTile } from "@/components/poster";

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

/*
  L'accueil se lit comme le brand book : couverture, les huit portes,
  manifeste, sommaire, rendez-vous, destinations, page ivoire, clôture.
*/
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const h = dict.home;
  const serviceTitle = (slug: string) => services.find((x) => x.slug === slug)?.title[locale] ?? "";
  // Libellés propres à l'accueil : les fiches gardent leur vrai nom.
  const homeLabels: Record<string, Record<Locale, string>> = {
    "festival-cannes": { fr: "Red Carpet Access", en: "Red Carpet Access", es: "Red Carpet Access", pt: "Red Carpet Access" },
    "celine-dion": { fr: "Concert", en: "Concert", es: "Concierto", pt: "Concerto" },
    "f1-monaco": { fr: "Formule 1", en: "Formula One", es: "Fórmula 1", pt: "Fórmula 1" },
    "tennis-tour": { fr: "Tennis", en: "Tennis", es: "Tenis", pt: "Ténis" },
    "champions-league": { fr: "Football européen", en: "European Football", es: "Fútbol europeo", pt: "Futebol europeu" },
  };
  const homeName = (slug: string, name: string) => homeLabels[slug]?.[locale] ?? name;
  const eventName = (slug: string) => homeName(slug, events.find((x) => x.slug === slug)?.name ?? "");
  const doors = universes.map((u) => {
    const [, kind, slug] = u.href.split("/");
    return { ...u, label: kind === "services" ? serviceTitle(slug) : eventName(slug) };
  });

  return (
    <>
      {/* ---- COUVERTURE (p.01) : noir, un titre Thin, deux labels ---- */}
      <section className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-black pt-32">
        {/* le monogramme en fond : ivoire à 6 %, flou, derrière le texte */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Monogram width={1100} className="h-auto w-[92vw] max-w-[1100px] opacity-[0.06] blur-[40px]" />
        </div>
        <div className="wrap relative pb-8">
          <p className="label fade-late mb-8" style={{ "--d": "100ms" } as CSSProperties}>
            {h.heroEyebrow}
          </p>
          <h1 className="t-cover max-w-[64rem] text-ivory">
            <span className="rise-mask">
              <span style={{ "--d": "250ms" } as CSSProperties}>{h.heroLine1}</span>
            </span>{" "}
            <span className="rise-mask">
              <span style={{ "--d": "400ms" } as CSSProperties}>{h.heroLine2}</span>
            </span>
          </h1>
          <div className="fade-late mt-12" style={{ "--d": "900ms" } as CSSProperties}>
            <Button
              href={`/${locale}/contact`}
              variant="lin"
              className="!px-10 !py-5 !text-[0.875rem] md:!px-14 md:!py-6 md:!text-base"
            >
              {dict.cta.request}
            </Button>
          </div>
          <div className="fade-late mt-20 flex items-center justify-between gap-6" style={{ "--d": "1100ms" } as CSSProperties}>
            <span className="label">AZ Experiences · Paris</span>
            <span className="label">
              <ParisClock />
            </span>
          </div>
        </div>
      </section>

      {/* ---- LES HUIT PORTES (p.22) : la grille d'images, bord à bord ----
          Chaque porte ouvre une page du site et porte son nom d'origine. */}
      <section aria-label={h.eventsTitle} className="doors grid grid-cols-2 md:grid-cols-4">
        {doors.map((d, i) => (
          <Reveal key={d.href} delay={(i % 4) * 90}>
            <UniverseTile locale={locale} href={`/${locale}${d.href}`} visual={d.visual} label={d.label} />
          </Reveal>
        ))}
      </section>

      {/* ---- MANIFESTE (p.04) : une phrase, la signature ---- */}
      <section className="py-24">
        <div className="wrap grid items-center gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-graphite">
              <Illustration locale={locale} visual={visuals.palaces} sizes="(max-width: 768px) 100vw, 40vw" />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6 md:col-start-7">
            <p className="t-h1 text-ivory">{h.manifesto}</p>
            <p className="label mt-8">{h.manifestoSignature}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- LES RENDEZ-VOUS (p.06) : image, titre, légende ---- */}
      <section className="py-24">
        <div className="wrap">
          <SectionHead
            kicker={h.eventsEyebrow}
            title={h.eventsTitle}
            aside={
              <Link href={`/${locale}/evenements`} className="transition-opacity hover:opacity-60">
                {dict.cta.allEvents} →
              </Link>
            }
          />
          <p className="t-body measure -mt-6 mb-12 text-stone">{h.eventsIntro}</p>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
            {events.map((e, i) => (
              <Reveal key={e.slug} delay={(i % 3) * 90}>
                <EventPoster
                  event={{ ...e, name: homeName(e.slug, e.name) }}
                  locale={locale}
                  cta={dict.cta.requestAccess}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- DESTINATIONS (p.23) : six images bord à bord, légendées ---- */}
      <section className="pt-24">
        <div className="wrap">
          <p className="label mb-12">{dict.destinations.homeEyebrow}</p>
        </div>
        <div className="doors grid grid-cols-2 md:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.slug} delay={(i % 3) * 90}>
            <UniverseTile locale={locale}
              href={`/${locale}/destinations/${d.slug}`}
              visual={destinationVisual(d.slug)}
              label={d.name}
              caption={d.tagline[locale]}
              sizes="(max-width: 768px) 50vw, 33vw"
            />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- LES SERVICES (p.02) : liste à filets ---- */}
      <section className="py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4">
            <p className="label mb-6">{h.servicesEyebrow}</p>
            <h2 className="t-h1 text-ivory">{h.servicesTitle}</h2>
            <Link
              href={`/${locale}/services`}
              className="label mt-10 inline-block text-ivory transition-opacity hover:opacity-60"
            >
              {dict.cta.allServices} →
            </Link>
          </div>
          <ul className="md:col-span-7 md:col-start-6">
            {services.map((s, i) => (
              <RuledRow
                delay={i * 60}
                key={s.slug}
                href={`/${locale}/services/${s.slug}`}
                num={String(i + 1).padStart(2, "0")}
                title={s.title[locale]}
              />
            ))}
          </ul>
        </div>
      </section>

      {/* ---- LA MAISON (p.05, page ivoire) : la voix des clients ---- */}
      <section className="bg-ivory py-24 text-black">
        <div className="wrap">
          <p className="label mb-8 text-black/70">{h.avisEyebrow}</p>
          <div className="max-w-[44rem]">
            <TestimonialRotator locale={locale} onLight />
          </div>
          <Link
            href={`/${locale}/qui-sommes-nous`}
            className="label mt-12 inline-block text-black transition-opacity hover:opacity-60"
          >
            {h.aboutLink} →
          </Link>
        </div>
      </section>

      {/* ---- CLÔTURE (p.28) ---- */}
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
