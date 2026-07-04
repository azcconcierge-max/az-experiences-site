import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { EventCard } from "@/components/EventCard";
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
    alternates: { canonical: `/${locale}`, languages: { fr: "/fr", en: "/en" } },
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
  const featured = events.slice(0, 4);

  return (
    <>
      <JsonLd data={faqJsonLd(h.faq)} />

      {/* ---- HERO ---- */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <div
          aria-hidden="true"
          className="kenburns absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(198,166,100,0.13), transparent)",
              "radial-gradient(ellipse 50% 40% at 80% 90%, rgba(198,166,100,0.07), transparent)",
              "radial-gradient(ellipse 90% 70% at 20% 100%, rgba(30,28,22,0.9), transparent)",
              "linear-gradient(180deg, #0c0c0a, #0a0a09)",
            ].join(", "),
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <p className="eyebrow mb-8">{h.heroEyebrow}</p>
          </Reveal>
          <Reveal delay={150}>
            <h1 className="display text-5xl leading-[1.05] text-ivory md:text-7xl lg:text-8xl">
              {h.heroTitle}
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory-dim md:text-lg">
              {h.heroSubtitle}
            </p>
          </Reveal>
          <Reveal delay={450}>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <GoldLink href={`/${locale}/contact`} solid>
                {dict.cta.request}
              </GoldLink>
              <GoldLink href={`/${locale}/evenements`}>{dict.nav.evenements}</GoldLink>
            </div>
          </Reveal>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-10 left-1/2 h-14 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-gold/60"
        />
      </section>

      {/* ---- MANIFESTE ---- */}
      <section className="px-5 py-28 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-8">{h.manifestoEyebrow}</p>
            <p className="display text-2xl leading-relaxed text-ivory md:text-3xl">
              {h.manifesto}
            </p>
          </Reveal>
        </div>
      </section>

      <div className="gold-line mx-auto max-w-6xl" />

      {/* ---- UNIVERS ---- */}
      <section className="px-5 py-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-4">{h.universesEyebrow}</p>
            <h2 className="display mb-16 text-3xl text-ivory md:text-5xl">{h.universesTitle}</h2>
          </Reveal>
          <div className="grid gap-px border border-ivory/8 bg-ivory/8 md:grid-cols-2">
            {h.universes.map((u, i) => (
              <Reveal key={u.num} delay={i * 100} className="bg-noir">
                <Link
                  href={`/${locale}${u.href}`}
                  className="group block h-full p-10 transition-colors duration-500 hover:bg-noir-card"
                >
                  <span className="display text-sm text-gold/60">{u.num}</span>
                  <h3 className="display mt-4 mb-3 text-2xl text-ivory transition-colors duration-300 group-hover:text-gold">
                    {u.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ivory-dim">{u.text}</p>
                  <span className="mt-6 inline-block h-px w-8 bg-gold/50 transition-all duration-500 group-hover:w-16 group-hover:bg-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- ÉVÉNEMENTS ---- */}
      <section className="bg-noir-soft px-5 py-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="eyebrow mb-4">{h.eventsEyebrow}</p>
                <h2 className="display text-3xl text-ivory md:text-5xl">{h.eventsTitle}</h2>
              </div>
              <GoldLink href={`/${locale}/evenements`}>{dict.cta.allEvents}</GoldLink>
            </div>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((event, i) => (
              <Reveal key={event.slug} delay={i * 100}>
                <EventCard event={event} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- EXPÉRIENCE ---- */}
      <section className="px-5 py-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-4">{h.stepsEyebrow}</p>
            <h2 className="display mb-16 text-3xl text-ivory md:text-5xl">{h.stepsTitle}</h2>
          </Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            {h.steps.map((step, i) => (
              <Reveal key={step.num} delay={i * 150}>
                <div>
                  <span className="display text-4xl text-gold/50">{step.num}</span>
                  <h3 className="display mt-5 mb-3 text-xl text-ivory">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-ivory-dim">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CHIFFRES ---- */}
      <section className="border-y border-ivory/8 bg-noir-soft px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 md:grid-cols-4">
          {h.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100}>
              <div className="text-center">
                <p className="display text-3xl text-gold md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs tracking-wide text-ivory-dim">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="px-5 py-28 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow mb-4">{h.faqEyebrow}</p>
            <h2 className="display mb-12 text-3xl text-ivory md:text-4xl">{h.faqTitle}</h2>
          </Reveal>
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
