import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { EventCard } from "@/components/EventCard";
import { GoldLink } from "@/components/GoldLink";

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
    alternates: {
      canonical: `/${locale}/evenements`,
      languages: { fr: "/fr/evenements", en: "/en/evenements" },
    },
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
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={(i % 2) * 100}>
                <EventCard event={event} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-20 border border-gold/30 bg-noir-card p-12 text-center">
              <h2 className="display mb-4 text-2xl text-ivory md:text-3xl">{d.requestOther}</h2>
              <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-ivory-dim">
                {d.requestOtherText}
              </p>
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
