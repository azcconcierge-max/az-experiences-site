import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent } from "@/data/events";
import { site } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { EventVisual } from "@/components/EventVisual";
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
  const title =
    l === "fr"
      ? `${event.name} — Billets VIP & hospitality`
      : `${event.name} — VIP tickets & hospitality`;
  return {
    title: { absolute: `${title} — ${site.name}` },
    description: event.description[l],
    alternates: {
      canonical: `/${locale}/evenements/${slug}`,
      languages: {
        fr: `/fr/evenements/${slug}`,
        en: `/en/evenements/${slug}`,
      },
    },
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

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue,
      address: { "@type": "PostalAddress", addressLocality: event.city, addressCountry: event.country },
    },
    description: event.description[locale],
    organizer: { "@type": "Organization", name: site.name, url: site.baseUrl },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: `${site.baseUrl}/${locale}/evenements/${event.slug}`,
    },
  };

  const faqItems = event.faq.map((f) => ({ q: f.q[locale], a: f.a[locale] }));

  return (
    <>
      <JsonLd data={eventJsonLd} />
      {faqItems.length > 0 && <JsonLd data={faqJsonLd(faqItems)} />}

      {/* ---- HERO ÉVÉNEMENT ---- */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <EventVisual event={event} className="kenburns absolute inset-0 h-full w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/20"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/evenements`}
              className="mb-8 inline-block text-[0.65rem] tracking-[0.25em] text-ivory-dim uppercase transition-colors hover:text-gold"
            >
              ← {d.backToEvents}
            </Link>
            <p className="eyebrow mb-4">
              {event.dateLabel[locale]} — {event.venue}, {event.city}
            </p>
            <h1 className="display max-w-3xl text-4xl leading-tight text-ivory md:text-6xl">
              {event.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ivory-dim italic">{event.tagline[locale]}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- CONTENU ---- */}
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <p className="text-base leading-relaxed text-ivory/85">{event.description[locale]}</p>

              {faqItems.length > 0 && (
                <div className="mt-16">
                  <h2 className="display mb-8 text-2xl text-ivory">{d.eventFaqTitle}</h2>
                  <Faq items={faqItems} />
                </div>
              )}
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
    </>
  );
}
