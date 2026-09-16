import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent, organizers } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { EventVisual } from "@/components/EventVisual";
import { EventCard } from "@/components/EventCard";
import { Filet } from "@/components/brand";
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
    title: { absolute: `${event.name}, ${suffix} | ${site.name}` },
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

      {/* ---- Hero : photo absorbée par le vert ---- */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-club pt-20">
        <EventVisual event={event} priority className="absolute inset-0 h-full w-full" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/evenements`}
              className="mb-8 inline-block text-[0.8rem] font-normal lowercase tracking-[0.12em] text-lin/75 transition-colors hover:text-laiton-clair"
            >
              ← {dict.cta.backToEvents}
            </Link>
            <p className="city mb-4 text-[0.8rem] text-laiton-clair">{event.city}</p>
            <h1 className="display max-w-5xl text-5xl leading-[0.95] text-lin md:text-8xl">
              {event.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg font-light text-lin/80">
              {event.tagline[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Contenu ---- */}
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div>
              <p className="max-w-[65ch] text-base leading-[1.7] font-light md:text-lg">
                {event.description[locale]}
              </p>
              <div className="mt-16">
                <h2 className="display mb-8 text-2xl">{d.faqTitle}</h2>
                <Faq items={d.faq} />
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <aside className="nuit grain h-fit rounded-[2px] p-8 lg:sticky lg:top-28">
              <h2 className="eyebrow mb-5">{d.facts.title}</h2>
              <dl className="mb-8 flex flex-col gap-3 pb-2">
                {[
                  { label: d.facts.date, value: event.dateLabel[locale] },
                  { label: d.facts.venue, value: event.venue },
                  { label: d.facts.city, value: event.city },
                  { label: d.facts.organizer, value: organizers[event.slug] },
                ]
                  .filter((f) => f.value)
                  .map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-6">
                      <dt className="shrink-0 text-[0.78rem] font-normal lowercase tracking-[0.12em] text-lin/60">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-sm font-light text-lin">{fact.value}</dd>
                    </div>
                  ))}
              </dl>
              <Filet className="mb-8" />
              <h2 className="eyebrow mb-6">{d.whatWeOffer}</h2>
              <ul className="flex flex-col gap-4">
                {event.offers[locale].map((offer) => (
                  <li key={offer} className="flex items-start gap-3 text-sm font-light text-lin/90">
                    <span aria-hidden="true" className="filet mt-2.5 w-4 shrink-0" />
                    {offer}
                  </li>
                ))}
              </ul>
              <div className="mt-8 text-center">
                <Button href={`/${locale}/contact`} variant="lin">
                  {dict.cta.requestAccess}
                </Button>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- Autres rendez-vous ---- */}
      <section className="bg-club px-5 py-24 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h2 className="display mb-12 text-3xl text-lin md:text-4xl">{dict.cta.allEvents}</h2>
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
