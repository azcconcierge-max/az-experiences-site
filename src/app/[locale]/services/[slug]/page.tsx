import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { serviceDetails } from "@/data/services-details";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { serviceVisual } from "@/lib/univers";
import { PosterHero } from "@/components/poster";
import { RelatedPosters, ToneBand } from "@/components/RelatedPosters";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

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
  const visual = serviceVisual(slug);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title[locale],
    description: detail.intro[locale],
    provider: { "@type": "Organization", name: site.name, url: site.baseUrl },
    areaServed: "Worldwide",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <JsonLd data={faqJsonLd(detail.faq[locale])} />

      {/* ---- 1 · HERO : l'illustration de l'univers, le nom du service ---- */}
      <div className="relative">
        <PosterHero locale={locale} visual={visual} title={service.title[locale]} chapter="02" footer={`AZ Experiences — ${dict.nav.services}`} short />
        <Breadcrumb
          ariaLabel={dict.nav.services}
          items={[
            { href: `/${locale}`, label: dict.nav.home },
            { href: `/${locale}/services`, label: dict.nav.services },
            { label: service.title[locale] },
          ]}
        />
      </div>

      {/* ---- 2 · LA PROMESSE : une colonne de lecture, les points à côté ---- */}
      <section className="py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-6">
            <p className="t-h2 text-ivory">{detail.intro[locale]}</p>
            <p className="t-body measure mt-8 text-ivory/75">{service.text[locale]}</p>
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <p className="label mb-6">{d.pointsLabel}</p>
            <ul className="border-t border-graphite">
              {service.points[locale].map((point) => (
                <li key={point} className="t-body border-b border-graphite py-4 text-ivory">
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ---- 3 · LA PHRASE SIGNATURE, sur la couleur de l'univers ---- */}
      <ToneBand visual={visual}>{service.phrase[locale]}</ToneBand>

      {/* ---- 4 · CE QUE NOUS ORCHESTRONS ---- */}
      <section className="py-24">
        <div className="wrap">
          <p className="label mb-12">{d.orchestrationsLabel}</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {detail.orchestrations[locale].map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 80}>
                <div className="border-t border-graphite pt-6">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <p className="t-body mt-4 text-ivory/85">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5 · FAQ + demande ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-7">
            <h2 className="t-h2 mb-8 text-ivory">{d.faqTitle}</h2>
            <Faq items={detail.faq[locale]} />
          </Reveal>
          <Reveal delay={120} className="md:col-span-4 md:col-start-9">
            <aside className="h-fit bg-graphite p-8 md:sticky md:top-28">
              <p className="t-h3 mb-3 text-ivory">{dict.contact.title}</p>
              <p className="t-small mb-8 text-ivory/80">{dict.contact.intro}</p>
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.request}
              </Button>
              <p className="caption mt-6 !text-ivory/70">{dict.contact.confidential}</p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- 6 · AUTRES SERVICES ---- */}
      <RelatedPosters locale={locale}
        title={dict.cta.allServices}
        items={services
          .filter((s) => s.slug !== slug)
          .map((s) => ({
            href: `/${locale}/services/${s.slug}`,
            visual: serviceVisual(s.slug),
            title: s.title[locale],
          }))}
      />
    </>
  );
}
