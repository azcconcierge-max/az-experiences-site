import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { destinations, getDestination, type GuideCategory } from "@/data/destinations";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { destinationVisual, eventVisual } from "@/lib/univers";
import { cityName, eventCity, eventName, GROUP, when } from "@/lib/names";
import { JsonLd } from "@/components/JsonLd";
import { CtaBand, DestCard, EventCard, Label, PageHero, PvPage, requestHref } from "@/components/pv/blocks";
import Link from "next/link";

const DEST_EVENTS: Record<string, string[]> = {
  monaco: ["f1-monaco"],
  "cote-d-azur": ["festival-cannes", "f1-monaco"],
  paris: ["fashion-week-paris"],
  "new-york": ["met-gala"],
  london: ["tennis-tour"],
  miami: ["super-bowl"],
};

export function generateStaticParams() {
  return locales.flatMap((locale) => destinations.map((d) => ({ locale, slug: d.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return {};
  const l = locale as Locale;
  return {
    title: { absolute: `${dest.name} | ${site.name}` },
    description: `${dest.tagline[l]} ${dest.intro[l]}`,
    alternates: pageAlternates(`/destinations/${slug}`, locale),
  };
}

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const dest = getDestination(slug);
  if (!dest) notFound();
  const dict = getDict(locale);
  const d = dict.destinations;
  const name = cityName(dest.name, locale);

  const cats: GuideCategory[] = ["vivre", "tables", "verres", "nuit"];
  const allSpots = cats.flatMap((c) => dest.guide[c]);
  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.intro[locale],
    touristType: "Luxury travellers",
    includesAttraction: allSpots.map((s) => ({ "@type": "TouristAttraction", name: s.name })),
  };
  const evs = (DEST_EVENTS[slug] ?? []).map((s) => events.find((e) => e.slug === s)).filter((e): e is (typeof events)[number] => Boolean(e));
  const others = destinations.filter((x) => x.slug !== slug).slice(0, 3);

  return (
    <PvPage>
      <JsonLd data={placeJsonLd} />
      <PageHero
        locale={locale}
        dict={dict}
        k={dest.region[locale]}
        title={name}
        sub={dest.tagline[locale]}
        visual={destinationVisual(slug)}
        crumbs={[[dict.nav.destinations, `/${locale}/destinations`], [name]]}
        ctx={name}
      />
      <section className="sec">
        <div className="wrap two">
          <div>
            <Label>{dict.pv.theCity}</Label>
            <p className="big-sm" data-fill="">{dest.intro[locale]}</p>
          </div>
          <div>
            <div className="label" data-rv="">{d.whatWeDo}</div>
            <div className="pill-list" data-rv="">
              {dest.offers[locale].map((p) => (
                <div key={p}><span className="dot" />{p}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="sec guide-sec">
        <div className="wrap">
          <Label>{d.spotsLabel}</Label>
          <h2 className="h2 split">{d.spotsTitle}.</h2>
          <p className="sub" data-rv="">{d.spotsNote}</p>
          <div className="tabs" role="tablist">
            {cats.map((c, i) => (
              <button key={c} type="button" role="tab" aria-selected={i === 0} className={i ? "" : "on"} data-tab={i}>{d.cats[c]}</button>
            ))}
            <i className="tab-ink" />
          </div>
          <div className="tab-panels">
            {cats.map((c, i) => (
              <div key={c} className={`tab-panel${i ? "" : " on"}`} data-panel={i}>
                {dest.guide[c].map((s, k) => (
                  <div key={s.name} className="addr">
                    <span className="num">{String(k + 1).padStart(2, "0")}</span>
                    <h3>{s.name}</h3>
                    <p>{s.text[locale]}</p>
                    <Link href={requestHref(locale, `${s.name}, ${name}`)} className="link">{dict.pv.bookThrough} →</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {evs.length > 0 && (
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Label>{dict.pv.occasionsIn.replace("{city}", name)}</Label>
            <div className="card-grid">
              {evs.map((e) => (
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
      <section className="sec" style={{ paddingTop: evs.length ? 0 : undefined }}>
        <div className="wrap">
          <Label>{dict.pv.otherDestinations}</Label>
          <div className="dest-grid" style={{ marginTop: 40 }}>
            {others.map((x) => (
              <DestCard key={x.slug} slug={x.slug} name={cityName(x.name, locale)} k={x.region[locale]} tag={x.tagline[locale]} visual={destinationVisual(x.slug)} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} title={dict.pv.ctaDates} ctx={name} />
    </PvPage>
  );
}
