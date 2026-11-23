import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { testimonials } from "@/data/testimonials";
import { pageAlternates } from "@/lib/seo";
import { eventVisual } from "@/lib/univers";
import { eventCity, eventName, GROUP, when } from "@/lib/names";
import { faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, EventCard, FaqBlock, PvPage, QuoteBlock, TextHero, requestHref } from "@/components/pv/blocks";

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
  const pr = dict.admit.programme;
  const filters: [string, string][] = [["all", pr.all], ["sport", pr.sport], ["culture", pr.culture], ["music", pr.music]];

  return (
    <PvPage>
      <JsonLd data={faqJsonLd(d.faq)} />
      <TextHero locale={locale} dict={dict} k={d.eyebrow} title={`${d.title}.`} sub={d.intro} crumbs={[[dict.nav.events]]} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="filters" role="tablist">
            {filters.map(([k, l], i) => (
              <button key={k} type="button" role="tab" aria-selected={i === 0} data-filter={k} className={i ? "" : "on"}>{l}</button>
            ))}
          </div>
          <div className="card-grid" data-grid="">
            {events.map((e) => (
              <EventCard
                key={e.slug}
                locale={locale}
                dict={dict}
                e={{ slug: e.slug, name: eventName(e, locale), when: when(e.dateLabel[locale]), city: eventCity(e, locale), tag: e.tagline[locale], date: e.startDate, cat: GROUP[e.category], visual: eventVisual(e.slug) }}
              />
            ))}
            <article className="card bespoke" data-cat="all">
              <div className="media">
                <div className="ph" style={{ ["--tone" as string]: "#2C302E" }}><b>{dict.pv.yourEvent}</b></div>
              </div>
              <div className="meta">
                <div className="label">{dict.pv.notListed}</div>
                <h3>{dict.pv.anyEvent}</h3>
                <div className="where">{dict.pv.anyEventText}</div>
                <Link href={requestHref(locale)} className="link">{d.custom.cta} →</Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <QuoteBlock
        label={dict.pv.trusted}
        quotes={testimonials.slice(0, 3).map((t) => ({ text: t.quote[locale], name: t.name, context: t.context[locale] }))}
      />
      <FaqBlock items={d.faq} title={dict.pv.faqHow} label={dict.pv.essential} />
      <CtaBand locale={locale} dict={dict} />
    </PvPage>
  );
}
