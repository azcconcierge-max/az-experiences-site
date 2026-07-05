import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { Parallax } from "@/components/Parallax";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { EventCard } from "@/components/EventCard";
import { SectionHeader } from "@/components/SectionHeader";
import { Marquee } from "@/components/Marquee";
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

  return (
    <>
      <JsonLd data={faqJsonLd(h.faq)} />

      {/* ---- HERO ---- */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <div aria-hidden="true" className="kenburns absolute inset-0">
          <Image
            src="/images/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir/75 via-noir/50 to-noir" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 pt-20 text-center">
          <p className="eyebrow hero-up mb-8" style={{ animationDelay: "0.1s" }}>
            {h.heroEyebrow}
          </p>
          <h1 className="display text-6xl leading-[0.98] text-ivory md:text-8xl lg:text-9xl">
            <span className="hero-up block" style={{ animationDelay: "0.25s" }}>
              {h.heroLine1}
            </span>
            <span className="hero-up block italic" style={{ animationDelay: "0.45s" }}>
              {h.heroLine2}
            </span>
          </h1>
          <p
            className="hero-up mx-auto mt-9 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg"
            style={{ animationDelay: "0.65s" }}
          >
            {h.heroSubtitle}
          </p>
          <div
            className="hero-up mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            style={{ animationDelay: "0.85s" }}
          >
            <GoldLink href={`/${locale}/contact`} solid>
              {dict.cta.request}
            </GoldLink>
            <GoldLink href={`/${locale}/evenements`}>{dict.nav.events}</GoldLink>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-gold/60"
        />
      </section>

      {/* ---- MARQUEE ÉVÉNEMENTS ---- */}
      <Marquee items={events.map((e) => e.name)} />

      {/* ---- 01 QUI SOMMES-NOUS (ivoire) ---- */}
      <section className="section-ivory px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
          <Reveal>
            <div className="img-reveal relative aspect-[3/4] max-w-md overflow-hidden">
              <Parallax amount={30} className="absolute -inset-y-10 inset-x-0">
                <Image
                  src="/images/fondateur.jpg"
                  alt={`${dict.about.founder.name} — ${dict.about.founder.role}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <p className="eyebrow mb-6 flex items-baseline gap-4">
              <span className="display text-sm tracking-normal opacity-70">01</span>
              {h.aboutEyebrow}
            </p>
            <h2 className="display text-4xl leading-[1.08] md:text-6xl">{h.aboutTitle}</h2>
            <p className="mt-8 text-base leading-relaxed text-ink-dim md:text-lg">{h.aboutText}</p>
            <Link
              href={`/${locale}/qui-sommes-nous`}
              className="gold-underline mt-8 inline-block text-[0.68rem] tracking-[0.28em] text-gold-deep uppercase"
            >
              {h.aboutLink} →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---- 02 SERVICES ---- */}
      <section className="px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              num="02"
              eyebrow={h.servicesEyebrow}
              title={h.servicesTitle}
              intro={h.servicesIntro}
            />
            <Reveal delay={150}>
              <GoldLink href={`/${locale}/services`} className="mb-16">
                {dict.cta.allServices}
              </GoldLink>
            </Reveal>
          </div>
          <div className="grid gap-px border border-ivory/8 bg-ivory/8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 100} className="bg-noir">
                <Link
                  href={`/${locale}/services#${s.slug}`}
                  className="group block h-full p-8 transition-colors duration-500 hover:bg-noir-card"
                >
                  <span className="display text-sm text-gold/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="display mt-3 mb-2 text-xl text-ivory transition-colors duration-300 group-hover:text-gold md:text-2xl">
                    {s.title[locale]}
                  </h3>
                  <p className="text-sm text-ivory-dim italic">{s.phrase[locale]}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 03 ÉVÉNEMENTS ---- */}
      <section className="bg-noir-soft px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <SectionHeader
              num="03"
              eyebrow={h.eventsEyebrow}
              title={h.eventsTitle}
              intro={h.eventsIntro}
            />
            <Reveal delay={150}>
              <GoldLink href={`/${locale}/evenements`} className="mb-16">
                {dict.cta.allEvents}
              </GoldLink>
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

      {/* ---- 04 EXPÉRIENCE (ivoire) ---- */}
      <section className="section-ivory px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeader num="04" eyebrow={h.stepsEyebrow} title={h.stepsTitle} />
          <div className="grid gap-12 md:grid-cols-3">
            {h.steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 150}>
                <div className="border-t border-ink/15 pt-6">
                  <span className="display text-4xl text-gold-deep/60">{step.num}</span>
                  <h3 className="display mt-4 mb-3 text-2xl">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CHIFFRES ---- */}
      <section className="border-b border-ivory/8 px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {(
            {
              fr: [
                { value: "24/7", label: "Disponibilité" },
                { value: "4", label: "Langues parlées" },
                { value: "Paris", label: "8ᵉ arrondissement" },
                { value: "Monde", label: "Terrain de jeu" },
              ],
              en: [
                { value: "24/7", label: "Availability" },
                { value: "4", label: "Languages spoken" },
                { value: "Paris", label: "8th arrondissement" },
                { value: "World", label: "Playing field" },
              ],
              es: [
                { value: "24/7", label: "Disponibilidad" },
                { value: "4", label: "Idiomas" },
                { value: "París", label: "Distrito 8" },
                { value: "Mundo", label: "Terreno de juego" },
              ],
              pt: [
                { value: "24/7", label: "Disponibilidade" },
                { value: "4", label: "Línguas faladas" },
                { value: "Paris", label: "8.º arrondissement" },
                { value: "Mundo", label: "Terreno de jogo" },
              ],
            } as const
          )[locale].map((stat, i) => (
            <Reveal key={stat.value} delay={i * 100}>
              <div className="text-center">
                <p className="display text-3xl text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs tracking-wide text-ivory-dim">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- 05 AVIS ---- */}
      <section className="px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionHeader num="05" eyebrow={h.avisEyebrow} title={h.avisTitle} intro={h.avisNote} />
          <div className="grid gap-px border border-ivory/8 bg-ivory/8 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 130} className="bg-noir">
                <figure className="flex h-full flex-col justify-between p-9">
                  <blockquote>
                    <span aria-hidden="true" className="display block text-5xl leading-none text-gold/40">
                      “
                    </span>
                    <p className="display mt-2 text-lg leading-relaxed text-ivory italic">
                      {t.quote[locale]}
                    </p>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ivory/10 pt-5">
                    <p className="text-sm text-ivory">{t.name}</p>
                    <p className="mt-1 text-[0.62rem] tracking-[0.25em] text-gold uppercase">
                      {t.context[locale]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 06 FAQ ---- */}
      <section className="bg-noir-soft px-5 py-28 md:px-8 md:py-36">
        <div className="mx-auto max-w-3xl">
          <SectionHeader num="06" eyebrow={h.faqEyebrow} title={h.faqTitle} />
          <Reveal delay={150}>
            <Faq items={h.faq} />
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-14 text-center">
              <GoldLink href={`/${locale}/contact`} solid>
                {dict.cta.request}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
