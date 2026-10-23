import type { Metadata } from "next";
import { visuals } from "@/lib/univers";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { EventPoster, PosterHero } from "@/components/poster";
import { AskSection } from "@/components/AskSection";

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
      <PosterHero locale={locale}
        visual={visuals.concerts}
        label={d.eyebrow}
        title={d.title}
        chapter="03"
        footer={`AZ Experiences — ${dict.nav.events}`}
      />
      <section className="pt-24 pb-12">
        <div className="wrap">
          <p className="t-h2 max-w-[40rem] text-ivory">{d.intro}</p>
        </div>
      </section>

      <section className="pb-24">
        <div className="wrap grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {events.map((event, i) => (
            <Reveal key={event.slug} delay={(i % 3) * 80} className="h-full">
              <EventPoster event={event} locale={locale} cta={dict.cta.requestAccess} />
            </Reveal>
          ))}

          {/* Carte « sur mesure » : tous les autres rendez-vous */}
          <Reveal delay={(events.length % 3) * 80} className="h-full">
            <Link
              href={`/${locale}/contact`}
              className="group flex h-full min-h-[24rem] flex-col justify-between border border-graphite p-6 transition-colors duration-500 hover:border-ivory/40"
            >
              <p className="label">{d.custom.cta}</p>
              <div>
                <p className="t-h2 text-ivory">{d.custom.title}</p>
                <p className="t-small mt-3 text-ivory/70">{d.custom.text}</p>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
