import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { events, getEvent, organizers } from "@/data/events";
import { destinations } from "@/data/destinations";
import { articles } from "@/data/articles";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { articleVisual, destinationVisual, eventVisual, serviceVisual } from "@/lib/univers";
import { cityName, eventCity, eventName, GROUP, when } from "@/lib/names";
import { faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, EventCard, FaqBlock, Label, Media, PageHero, PvPage, QuoteBlock, ReqBtn, WaBtn } from "@/components/pv/blocks";
import { DaysCount } from "@/components/pv/DaysCount";

/** What completes each occasion: its city, its article, the services around it. */
const AROUND: Record<string, { dest?: string; article?: string; svc: string[] }> = {
  "champions-league": { article: "obtenir-billets-evenement-sold-out", svc: ["transport", "hotels"] },
  "super-bowl": { dest: "miami", svc: ["jet-prive", "voyages"] },
  "f1-monaco": { dest: "monaco", article: "grand-prix-monaco-vip", svc: ["yachts", "jet-prive"] },
  "tennis-tour": { dest: "london", svc: ["voyages", "hotels"] },
  "fashion-week-paris": { dest: "paris", svc: ["transport", "gastronomie"] },
  "festival-cannes": { dest: "cote-d-azur", svc: ["hotels", "yachts"] },
  "met-gala": { dest: "new-york", svc: ["securite", "transport"] },
  oscars: { svc: ["securite", "transport"] },
  "celine-dion": { article: "obtenir-billets-evenement-sold-out", svc: ["evenements", "transport"] },
};

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
  const suffix = (
    event.invitationOnly
      ? { fr: "Séjour & conciergerie", en: "Stay & concierge", es: "Estancia y conserjería", pt: "Estadia e concierge" }
      : { fr: "Billets VIP & hospitality", en: "VIP tickets & hospitality", es: "Entradas VIP y hospitality", pt: "Bilhetes VIP e hospitality" }
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
  const name = eventName(event, locale);
  const w = when(event.dateLabel[locale]);
  const ctx = `${name}, ${w}`;
  const around = AROUND[slug] ?? { svc: [] };
  const dest = around.dest ? destinations.find((x) => x.slug === around.dest) : undefined;
  const art = around.article ? articles.find((x) => x.slug === around.article) : undefined;
  const svcs = around.svc.map((s) => services.find((x) => x.slug === s)).filter((s): s is (typeof services)[number] => Boolean(s));
  const quote = testimonials.find((t) => t.context.en.toLowerCase().includes(event.name.split(" ")[0].toLowerCase())) ?? testimonials[0];
  const others = events.filter((e) => e.slug !== slug).slice(0, 3);

  const eventJsonLd = event.startDate
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: event.name,
        startDate: event.startDate,
        ...(event.endDate ? { endDate: event.endDate } : {}),
        eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "Place", name: event.venue, address: { "@type": "PostalAddress", addressLocality: event.city, addressCountry: event.country } },
        description: event.description[locale],
        organizer: { "@type": "Organization", name: site.name, url: site.baseUrl },
        offers: { "@type": "Offer", availability: "https://schema.org/InStock", url: `${site.baseUrl}/${locale}/evenements/${event.slug}` },
      }
    : null;

  return (
    <PvPage>
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
      <JsonLd data={faqJsonLd(d.faq)} />
      <PageHero
        locale={locale}
        dict={dict}
        k={`${d.categories[event.category]} · ${eventCity(event, locale)}`}
        title={name}
        sub={event.tagline[locale]}
        visual={eventVisual(slug)}
        crumbs={[[dict.nav.events, `/${locale}/evenements`], [name]]}
        ctx={ctx}
      />
      <section className="sec">
        <div className="wrap detail">
          <div>
            <Label>{dict.pv.theOccasion}</Label>
            <p className="big-sm" data-fill="">{event.description[locale]}</p>
            <div style={{ marginTop: 56 }}>
              <Label>{d.whatWeOffer}</Label>
              <div className="offer">
                {event.offers[locale].map((o, i) => (
                  <div key={o} data-rv=""><span className="num">{String(i + 1).padStart(2, "0")}</span>{o}</div>
                ))}
              </div>
            </div>
          </div>
          <aside className="facts" data-rv="" data-admit={dict.admit.pass.admit}>
            <DaysCount date={event.startDate} label={dict.pv.daysToGo} />
            <dl>
              <div><dt>{d.facts.date}</dt><dd>{w}</dd></div>
              <div><dt>{d.facts.venue}</dt><dd>{event.venue}</dd></div>
              <div><dt>{d.facts.city}</dt><dd>{eventCity(event, locale)}</dd></div>
              {organizers[event.slug] && <div><dt>{d.facts.organizer}</dt><dd>{organizers[event.slug]}</dd></div>}
            </dl>
            <ReqBtn locale={locale} ctx={ctx} cls="btn btn-solid full">{dict.cta.requestAccess}</ReqBtn>
            <WaBtn locale={locale} ctx={ctx} cls="btn btn-ghost full" />
            <small className="facts-note">{dict.pv.factsNote}</small>
          </aside>
        </div>
      </section>
      <QuoteBlock label={dict.pv.trusted} quotes={[{ text: quote.quote[locale], name: quote.name, context: quote.context[locale] }]} />
      {(dest || art || svcs.length > 0) && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Label>{dict.pv.completeLabel}</Label>
            <h2 className="h2 split">{dict.pv.completeTitle}</h2>
            <div className="complete">
              {dest && (
                <Link href={`/${locale}/destinations/${dest.slug}`} className="cpl" data-rv="">
                  <div className="cpl-media"><Media visual={destinationVisual(dest.slug)} locale={locale} sizes="140px" /></div>
                  <div><div className="label">{dict.pv.destination}</div><h3>{cityName(dest.name, locale)}</h3><p>{dest.tagline[locale]}</p></div>
                </Link>
              )}
              {art && (
                <Link href={`/${locale}/guide/${art.slug}`} className="cpl" data-rv="">
                  <div className="cpl-media"><Media visual={articleVisual(art.slug)} locale={locale} sizes="140px" /></div>
                  <div><div className="label">{dict.nav.guide} · {art.readingMinutes} {dict.guide.reading}</div><h3>{art.title[locale]}</h3><p>{art.excerpt[locale].slice(0, 90)}…</p></div>
                </Link>
              )}
              {svcs.map((s) => (
                <Link key={s.slug} href={`/${locale}/services/${s.slug}`} className="cpl" data-rv="">
                  <div className="cpl-media"><Media visual={serviceVisual(s.slug)} locale={locale} sizes="140px" /></div>
                  <div><div className="label">{dict.pv.service}</div><h3>{s.title[locale]}</h3><p>{s.phrase[locale]}</p></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <FaqBlock items={d.faq} title={dict.pv.faqFrequent} label={dict.pv.essential} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Label>{dict.pv.otherOccasions}</Label>
          <div className="card-grid">
            {others.map((e) => (
              <EventCard
                key={e.slug}
                locale={locale}
                dict={dict}
                e={{ slug: e.slug, name: eventName(e, locale), when: when(e.dateLabel[locale]), city: eventCity(e, locale), tag: e.tagline[locale], date: e.startDate, cat: GROUP[e.category], visual: eventVisual(e.slug) }}
              />
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} title={dict.pv.ctaPlace} ctx={ctx} />
    </PvPage>
  );
}
