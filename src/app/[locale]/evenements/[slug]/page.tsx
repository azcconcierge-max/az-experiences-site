import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent, organizers } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { eventVisual } from "@/lib/univers";
import { PosterHero } from "@/components/poster";
import { RelatedPosters } from "@/components/RelatedPosters";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/Breadcrumb";

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
  // une soirée sur invitation ne se vend pas en billets : on parle du séjour
  const suffix = (
    event.invitationOnly
      ? {
          fr: "Séjour & conciergerie",
          en: "Stay & concierge",
          es: "Estancia y conserjería",
          pt: "Estadia e concierge",
        }
      : {
          fr: "Billets VIP & hospitality",
          en: "VIP tickets & hospitality",
          es: "Entradas VIP y hospitality",
          pt: "Bilhetes VIP e hospitality",
        }
  )[l];
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
  const visual = eventVisual(slug);

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

      {/* ---- Hero : l'univers du rendez-vous, son nom, sa phrase ---- */}
      <div className="relative">
        <PosterHero locale={locale}
          visual={visual}
          label={event.city}
          title={event.name}
          subtitle={event.tagline[locale]}
          chapter="03"
          footer={`AZ Experiences — ${dict.nav.events}`}
          short
        />
        <Breadcrumb
          ariaLabel={dict.nav.events}
          items={[
            { href: `/${locale}`, label: dict.nav.home },
            { href: `/${locale}/evenements`, label: dict.nav.events },
            { label: event.name },
          ]}
        />
      </div>

      {/* ---- Contenu : une colonne de lecture, la fiche à côté ---- */}
      <section className="py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <p className="t-h2 text-ivory">{event.description[locale]}</p>
            <div className="mt-16">
              <h2 className="t-h2 mb-8 text-ivory">{d.faqTitle}</h2>
              <Faq items={d.faq} />
            </div>
          </Reveal>

          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <aside className="h-fit bg-graphite p-8 md:sticky md:top-28">
              <h2 className="label mb-5 text-ivory/75">{d.facts.title}</h2>
              <dl className="mb-8 flex flex-col">
                {[
                  { label: d.facts.date, value: event.dateLabel[locale] },
                  { label: d.facts.venue, value: event.venue },
                  { label: d.facts.city, value: event.city },
                  { label: d.facts.organizer, value: organizers[event.slug] },
                ]
                  .filter((f) => f.value)
                  .map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-6 border-b border-ivory/15 py-3"
                    >
                      <dt className="label shrink-0 text-ivory/65">{fact.label}</dt>
                      <dd className="t-small text-right text-ivory">{fact.value}</dd>
                    </div>
                  ))}
              </dl>
              <h2 className="label mb-4 text-ivory/75">{d.whatWeOffer}</h2>
              <ul className="mb-8 flex flex-col">
                {event.offers[locale].map((offer) => (
                  <li key={offer} className="t-small border-b border-ivory/15 py-3 text-ivory">
                    {offer}
                  </li>
                ))}
              </ul>
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.requestAccess}
              </Button>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- Autres rendez-vous ---- */}
      <RelatedPosters locale={locale}
        title={dict.cta.allEvents}
        items={others.map((o) => ({
          href: `/${locale}/evenements/${o.slug}`,
          visual: eventVisual(o.slug),
          label: o.dateLabel[locale],
          title: o.name,
        }))}
      />
    </>
  );
}
