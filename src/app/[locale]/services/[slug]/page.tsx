import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { serviceDetails } from "@/data/services-details";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { eventVisual, serviceVisual } from "@/lib/univers";
import { eventCity, eventName, GROUP, when } from "@/lib/names";
import { faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, EventCard, FaqBlock, Label, PageHero, PvPage } from "@/components/pv/blocks";

/** The occasions each service is most often used around. */
const SERVICE_EVENTS: Record<string, string[]> = {
  evenements: ["champions-league", "f1-monaco", "celine-dion"],
  gastronomie: ["f1-monaco", "fashion-week-paris", "festival-cannes"],
  "jet-prive": ["f1-monaco", "super-bowl", "festival-cannes"],
  yachts: ["f1-monaco", "festival-cannes"],
  hotels: ["festival-cannes", "fashion-week-paris", "f1-monaco"],
  transport: ["fashion-week-paris", "champions-league", "met-gala"],
  securite: ["met-gala", "oscars", "festival-cannes"],
  voyages: ["super-bowl", "tennis-tour", "champions-league"],
};

export function generateStaticParams() {
  return locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  const l = locale as Locale;
  return {
    title: { absolute: `${service.title[l]} | ${site.name}` },
    description: `${service.phrase[l]} ${service.text[l]}`,
    alternates: pageAlternates(`/services/${slug}`, locale),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const service = services.find((s) => s.slug === slug);
  const detail = serviceDetails[slug];
  if (!service || !detail) notFound();
  const dict = getDict(locale);
  const d = dict.services;
  const title = service.title[locale];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: title,
    description: detail.intro[locale],
    provider: { "@type": "Organization", name: site.name, url: site.baseUrl },
    areaServed: "Worldwide",
  };

  const related = (SERVICE_EVENTS[slug] ?? [])
    .map((s) => events.find((e) => e.slug === s))
    .filter((e): e is (typeof events)[number] => Boolean(e));

  return (
    <PvPage>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd(detail.faq[locale])} />
      <PageHero
        locale={locale}
        dict={dict}
        k={dict.pv.service}
        title={title}
        sub={detail.intro[locale]}
        visual={serviceVisual(slug)}
        crumbs={[[dict.nav.services, `/${locale}/services`], [title]]}
        ctx={title}
      />
      <section className="sec">
        <div className="wrap two">
          <div>
            <Label>{d.pointsLabel}</Label>
            <p className="big-sm" data-fill="">{service.text[locale]}</p>
          </div>
          <div className="pill-list" data-rv="">
            {service.points[locale].map((p) => (
              <div key={p}><span className="dot" />{p}</div>
            ))}
          </div>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Label>{d.orchestrationsLabel}</Label>
          <ol className="orch">
            {detail.orchestrations[locale].map((l, i) => (
              <li key={l} data-rv=""><span className="num">{String(i + 1).padStart(2, "0")}</span>{l}</li>
            ))}
          </ol>
        </div>
      </section>
      {related.length > 0 && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Label>{dict.pv.whereClients}</Label>
            <h2 className="h2 split">{dict.pv.aroundOccasions}</h2>
            <div className="card-grid">
              {related.map((e) => (
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
      )}
      <FaqBlock items={detail.faq[locale]} title={dict.pv.faqFrequent} label={dict.pv.essential} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Label>{dict.pv.allServices}</Label>
          <div className="mini-links">
            {services.filter((x) => x.slug !== slug).map((x) => (
              <Link key={x.slug} href={`/${locale}/services/${x.slug}`} className="link">{x.title[locale]} →</Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} title={dict.pv.ctaNeed} ctx={title} />
    </PvPage>
  );
}
