import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { EventVisual } from "@/components/EventVisual";
import { EventCard } from "@/components/EventCard";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return locales.flatMap((locale) => events.map((e) => ({ locale, slug: e.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  const l = locale as Locale;
  const suffix = {
    fr: "Billets VIP & hospitality",
    en: "VIP tickets & hospitality",
    es: "Entradas VIP y hospitality",
    pt: "Bilhetes VIP e hospitality",
  }[l];
  return {
    title: { absolute: `${event.name} — ${suffix} — ${site.name}` },
    description: event.description[l],
    alternates: pageAlternates(`/evenements/${slug}`, locale),
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const event = getEvent(slug);
  if (!event) notFound();
  const dict = getDict(locale);
  const d = dict.events;
  const others = events.filter((e) => e.slug !== slug).slice(0, 3);

  const eventJsonLd = event.startDate
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: event.startDate,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: event.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: event.city,
            addressCountry: event.country,
          },
        },
        description: event.description[locale],
        organizer: { "@type": "Organization", name: site.name, url: site.baseUrl },
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          url: `${site.baseUrl}/${locale}/evenements/${event.slug}`,
        },
      }
    : null;

  return (
    <>
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      <JsonLd data={faqJsonLd(d.faq)} />

      {/* ---- HERO ---- */}
      <section className="relative flex min-h-[75svh] items-end overflow-hidden">
        <EventVisual event={event} className="kenburns absolute inset-0 h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/25"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/evenements`}
              className="mb-8 inline-block text-[0.65rem] tracking-[0.25em] text-ivory-dim uppercase transition-colors hover:text-gold"
            >
              ← {dict.cta.backToEvents}
            </Link>
            <p className="eyebrow mb-4">
              {event.dateLabel[locale]} — {event.venue}
            </p>
            <h1 className="display max-w-4xl text-5xl leading-[1.02] text-ivory md:text-7xl">
              {event.name}
            </h1>
            <p className="display mt-5 max-w-xl text-xl text-ivory/70 italic">
              {event.tagline[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- CONTENU ---- */}
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <p className="text-base leading-relaxed text-ivory/85 md:text-lg">
                {event.description[locale]}
              </p>
              <div className="mt-16">
                <h2 className="display mb-8 text-2xl text-ivory">{d.faqTitle}</h2>
                <Faq items={d.faq} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="h-fit border border-gold/30 bg-noir-card p-8 lg:sticky lg:top-28">
              <h2 className="eyebrow mb-6">{d.whatWeOffer}</h2>
              <ul className="flex flex-col gap-4">
                {event.offers[locale].map((offer) => (
                  <li key={offer} className="flex items-start gap-3 text-sm text-ivory/85">
                    <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-gold" />
                    {offer}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3">
                <GoldLink href={`/${locale}/contact`} solid className="text-center">
                  {dict.cta.requestAccess}
                </GoldLink>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- AUTRES ÉVÉNEMENTS ---- */}
      <section className="section-ivory px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="display mb-12 text-3xl md:text-4xl">{dict.cta.allEvents}</h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 100}>
                <EventCard event={other} locale={locale} dict={dict} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
