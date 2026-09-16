import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { pageAlternates } from "@/lib/seo";
import { LineMask } from "@/components/TitleReveal";
import { Reveal } from "@/components/Reveal";
import { EventCard } from "@/components/EventCard";
import { Marquee } from "@/components/Marquee";
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
      <section className="px-5 pt-36 pb-16 md:px-10 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1440px]">
          <LineMask delay={100}>
            <p className="eyebrow">{d.eyebrow}</p>
          </LineMask>
          <h1 className="display mt-5 max-w-5xl text-[clamp(2.6rem,6vw,6.5rem)] leading-[0.98]">
            <LineMask delay={250}>
              <span className="block">{d.title}</span>
            </LineMask>
          </h1>
          <LineMask delay={420}>
            <p className="mt-7 max-w-xl text-base leading-[1.7] font-light text-ink-dim md:text-lg">
              {d.intro}
            </p>
          </LineMask>
        </div>
      </section>
      <Marquee items={events.map((e) => e.name)} />

      <section className="px-5 py-16 pb-28 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event, i) => (
              <Reveal key={event.slug} delay={(i % 3) * 100}>
                <EventCard event={event} locale={locale} dict={dict} priority={i === 0} />
              </Reveal>
            ))}

            {/* Carte « sur mesure », tous les autres événements */}
            <Reveal delay={(events.length % 3) * 100}>
              <Link
                href={`/${locale}/contact`}
                className="group flex aspect-[4/3] flex-col items-center justify-center nuit grain rounded-[2px] border border-laiton/40 p-8 text-center transition-colors duration-500 hover:border-laiton-clair"
              >
                <span className="display text-4xl text-laiton-clair/70 transition-colors duration-500 group-hover:text-laiton-clair">
                  +
                </span>
                <p className="display mt-4 text-2xl text-lin">{d.custom.title}</p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-lin/75">
                  {d.custom.text}
                </p>
                <span className="mt-6 inline-flex items-center gap-3 text-[0.62rem] lowercase tracking-[0.12em]">
                  {d.custom.cta}
                  <span className="inline-block h-px w-6 bg-laiton-clair transition-all duration-500 group-hover:w-12" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
