import type { Metadata } from "next";
import Link from "next/link";
import { serviceVisual } from "@/lib/univers";
import { getDict, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/components/Faq";
import { site } from "@/lib/site";
import { CtaBand, FaqBlock, Media, PvPage, TextHero } from "@/components/pv/blocks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).services;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/services", locale),
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.services;
  const faq = dict.home.faq.slice(0, 3);

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@type": "Service", name: s.title[locale], description: s.text[locale], provider: { "@type": "Organization", name: site.name } },
    })),
  };

  return (
    <PvPage>
      <JsonLd data={servicesJsonLd} />
      <JsonLd data={faqJsonLd(faq)} />
      <TextHero locale={locale} dict={dict} k={d.eyebrow} title={`${d.title}.`} sub={d.introShort} crumbs={[[dict.nav.services]]} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap svc-hub">
          {services.map((s, i) => (
            <Link key={s.slug} href={`/${locale}/services/${s.slug}`} className="svc-row" data-rv="">
              <div className="svc-row-media">
                <Media visual={serviceVisual(s.slug)} locale={locale} sizes="(max-width: 900px) 100vw, 55vw" />
              </div>
              <div className="svc-row-txt">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.title[locale]}</h2>
                <p>{s.phrase[locale]}</p>
                <span className="link">{dict.pv.explore} →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <FaqBlock items={faq} title={dict.pv.faqBefore} label={dict.pv.essential} />
      <CtaBand locale={locale} dict={dict} />
    </PvPage>
  );
}
