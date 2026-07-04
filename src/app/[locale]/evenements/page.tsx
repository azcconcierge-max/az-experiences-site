import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { EventCard } from "@/components/EventCard";
import { Marquee } from "@/components/Marquee";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).events;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/evenements", locale),
  };
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.events;

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <Marquee items={events.map((e) => e.name)} />

      <section className="px-5 py-20 pb-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={(i % 3) * 100}>
                <EventCard event={event} locale={locale} dict={dict} />
              </Reveal>
            ))}

            {/* Carte « sur mesure » — tous les autres événements */}
            <Reveal delay={(events.length % 3) * 100}>
              <Link
                href={`/${locale}/contact`}
                className="group flex aspect-[4/3] flex-col items-center justify-center border border-gold/40 bg-noir-card p-8 text-center transition-colors duration-500 hover:border-gold"
              >
                <span className="display text-4xl text-gold/50 transition-colors duration-500 group-hover:text-gold">
                  +
                </span>
                <h3 className="display mt-4 text-2xl text-ivory">{d.custom.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ivory-dim">
                  {d.custom.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
                  {d.custom.cta}
                  <span className="inline-block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
