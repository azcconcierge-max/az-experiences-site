import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { TypoPanel } from "@/components/TypoPanel";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { EventCard } from "@/components/EventCard";
import { DestinationsStrip } from "@/components/DestinationsStrip";
import { SectionHeader } from "@/components/SectionHeader";
import { Marquee } from "@/components/Marquee";
import { OvalImage, Filet } from "@/components/brand";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

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
  const featured = events.slice(0, 6);

  const stats = (
    {
      fr: [
        { value: "24/7", label: "disponibilité" },
        { value: "4", label: "langues parlées" },
        { value: "Paris", label: "8e arrondissement" },
        { value: "Monde", label: "terrain de jeu" },
      ],
      en: [
        { value: "24/7", label: "availability" },
        { value: "4", label: "languages spoken" },
        { value: "Paris", label: "8th arrondissement" },
        { value: "World", label: "playing field" },
      ],
      es: [
        { value: "24/7", label: "disponibilidad" },
        { value: "4", label: "idiomas" },
        { value: "París", label: "distrito 8" },
        { value: "Mundo", label: "terreno de juego" },
      ],
      pt: [
        { value: "24/7", label: "disponibilidade" },
        { value: "4", label: "línguas faladas" },
        { value: "Paris", label: "8.º arrondissement" },
        { value: "Mundo", label: "terreno de jogo" },
      ],
    } as const
  )[locale];

  return (
    <>
      <JsonLd data={faqJsonLd(h.faq)} />

      {/* ---- HERO : Crépuscule, grain, image en ovale ---- */}
      <section className="crepuscule grain relative overflow-hidden pt-20">
        <div className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow hero-up mb-7" style={{ animationDelay: "0.1s" }}>
              {h.heroEyebrow}
            </p>
            <h1
              className="display hero-up text-5xl leading-[0.98] text-lin md:text-7xl"
              style={{ animationDelay: "0.25s" }}
            >
              {h.heroLine1} {h.heroLine2}
            </h1>
            <p
              className="hero-up mt-8 max-w-[60ch] text-base leading-[1.7] font-light text-lin/85 md:text-lg"
              style={{ animationDelay: "0.45s" }}
            >
              {h.heroSubtitle}
            </p>
            <div className="hero-up mt-10" style={{ animationDelay: "0.65s" }}>
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.request}
              </Button>
            </div>
          </div>
          <div className="hero-up mx-auto w-64 md:w-80" style={{ animationDelay: "0.5s" }}>
            <OvalImage src="/images/voyages.jpg" alt="" priority />
          </div>
        </div>
      </section>

      {/* ---- Le carnet qui défile ---- */}
      <Marquee items={events.map((e) => e.name)} />

      {/* ---- 01 Qui sommes-nous (lin) ---- */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <TypoPanel name={dict.about.founder.name} role={dict.about.founder.role} />
          </Reveal>
          <Reveal delay={200}>
            <p className="eyebrow mb-6 flex items-baseline gap-4">
              <span className="display text-sm normal-case tracking-normal">I</span>
              {h.aboutEyebrow}
            </p>
            <h2 className="display text-4xl leading-[0.98] md:text-6xl">{h.aboutTitle}</h2>
            <p className="mt-8 max-w-[65ch] text-base leading-[1.7] font-light text-ink-dim md:text-lg">
              {h.aboutText}
            </p>
            <Link
              href={`/${locale}/qui-sommes-nous`}
              className="mt-8 inline-block text-[0.85rem] font-normal lowercase tracking-[0.12em] text-laiton transition-opacity hover:opacity-70"
            >
              {h.aboutLink} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- 02 Services (vert club) ---- */}
      <section className="bg-club px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              num="II"
              eyebrow={h.servicesEyebrow}
              title={h.servicesTitle}
              intro={h.servicesIntro}
            />
            <Reveal delay={150}>
              <Button href={`/${locale}/services`} className="mb-16">
                {dict.cta.allServices}
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-px bg-lin/12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100} className="bg-club">
                <Link
                  href={`/${locale}/services/${s.slug}`}
                  className="group block h-full p-8 transition-colors duration-500 hover:bg-noir-card"
                >
                  <span className="display text-sm text-laiton-clair">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 mb-2 text-xl text-lin transition-colors duration-300 group-hover:text-laiton-clair md:text-2xl">
                    {s.title[locale]}
                  </h3>
                  <p className="text-sm font-light text-lin/70">{s.phrase[locale]}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 03 Événements (lin) ---- */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              num="III"
              eyebrow={h.eventsEyebrow}
              title={h.eventsTitle}
              intro={h.eventsIntro}
            />
            <Reveal delay={150}>
              <Button href={`/${locale}/evenements`} className="mb-16">
                {dict.cta.allEvents}
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {featured.slice(0, 2).map((event, i) => (
              <Reveal key={event.slug} delay={i * 120}>
                <EventCard event={event} locale={locale} dict={dict} large />
              </Reveal>
            ))}
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(2, 6).map((event, i) => (
              <Reveal key={event.slug} delay={(i % 4) * 100}>
                <EventCard event={event} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 04 Destinations : le panorama ---- */}
      <section className="pb-24 md:pb-36">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              num="IV"
              eyebrow={dict.destinations.homeEyebrow}
              title={dict.destinations.homeTitle}
              intro={dict.destinations.intro}
            />
            <Reveal delay={150}>
              <Button href={`/${locale}/destinations`} className="mb-16">
                {dict.nav.destinations}
              </Button>
            </Reveal>
          </div>
        </div>
        <div className="px-2 md:px-4">
          <Reveal>
            <DestinationsStrip locale={locale} ctaLabel={dict.destinations.explore} />
          </Reveal>
        </div>
      </section>

      {/* ---- 05 L'expérience (lin, filets) ---- */}
      <section className="px-5 pb-24 md:px-8 md:pb-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeader num="V" eyebrow={h.stepsEyebrow} title={h.stepsTitle} />
          <div className="grid gap-12 md:grid-cols-3">
            {h.steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 150}>
                <div>
                  <Filet className="mb-6" />
                  <span className="display text-4xl text-laiton">{step.num}</span>
                  <h3 className="display mt-4 mb-3 text-2xl">{step.title}</h3>
                  <p className="text-sm leading-[1.7] font-light text-ink-dim">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Chiffres (Pelouse) ---- */}
      <section className="pelouse grain px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 100}>
              <div className="text-center">
                <p className="display text-3xl text-lin md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-[0.78rem] font-normal lowercase tracking-[0.12em] text-lin/80">
                  {stat.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- 06 Avis (lin) ---- */}
      <section className="px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeader num="VI" eyebrow={h.avisEyebrow} title={h.avisTitle} intro={h.avisNote} />
          <div className="grid gap-px bg-club/12 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 130} className="bg-lin">
                <figure className="flex h-full flex-col justify-between p-9">
                  <blockquote>
                    <p className="display text-lg leading-[1.4] text-club">{t.quote[locale]}</p>
                  </blockquote>
                  <figcaption className="mt-8">
                    <Filet className="mb-5" />
                    <p className="text-sm font-normal">{t.name}</p>
                    <p className="mt-1 text-[0.75rem] font-normal lowercase tracking-[0.12em] text-laiton">
                      {t.context[locale]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 07 FAQ (Nuit) ---- */}
      <section className="nuit grain px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto max-w-3xl">
          <SectionHeader num="VII" eyebrow={h.faqEyebrow} title={h.faqTitle} />
          <Reveal delay={150}>
            <Faq items={h.faq} />
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-14 text-center">
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.request}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
