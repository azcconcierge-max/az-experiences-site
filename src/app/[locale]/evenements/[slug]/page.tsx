import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent, organizers } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { EventPass } from "@/components/admit/EventPass";
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

          <Reveal delay={120} className="md:col-span-5 md:col-start-8 lg:col-span-4 lg:col-start-9">
            <aside className="h-fit md:sticky md:top-28">
              <EventPass
                admit={dict.admit.pass.admit}
                title={event.name}
                facts={[
                  { label: d.facts.date, value: event.dateLabel[locale] },
                  { label: d.facts.venue, value: event.venue },
                  { label: d.facts.city, value: event.city },
                  { label: d.facts.organizer, value: organizers[event.slug] },
                ]}
                offersTitle={d.whatWeOffer}
                offers={event.offers[locale]}
                sold={dict.admit.pass.sold}
                cta={dict.cta.requestAccess}
                href={`/${locale}/contact?occasion=${encodeURIComponent(event.name)}`}
                no={`000 ${String((events.findIndex((e) => e.slug === slug) * 137 + 1) % 1000).padStart(3, "0")}`}
              />
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
