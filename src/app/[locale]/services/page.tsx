import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { OvalImage, Filet } from "@/components/brand";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

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

  const servicesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((s, i) => ({
      "@type": "Service",
      position: i + 1,
      name: s.title[locale],
      description: s.text[locale],
      provider: { "@type": "Organization", name: site.name, url: site.baseUrl },
    })),
  };

  return (
    <>
      <JsonLd data={servicesJsonLd} />
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col">
          {services.map((service, i) => (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className={`grid scroll-mt-28 items-center gap-10 py-16 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative mx-auto w-64 md:w-80">
                  <OvalImage
                    src={`/images/${service.slug}.jpg`}
                    alt={service.title[locale]}
                    sizes="(max-width: 1024px) 70vw, 30vw"
                  />
                  <span className="display absolute -top-2 -left-2 text-4xl text-laiton">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="display text-3xl md:text-4xl">{service.title[locale]}</h2>
                  <p className="mt-3 text-base font-light text-laiton">{service.phrase[locale]}</p>
                  <p className="mt-6 max-w-[65ch] text-sm leading-[1.7] font-light text-ink-dim md:text-base">
                    {service.text[locale]}
                  </p>
                  <p className="eyebrow mt-8 mb-4">{d.pointsLabel}</p>
                  <ul className="flex flex-col gap-2.5">
                    {service.points[locale].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm font-light">
                        <span aria-hidden="true" className="filet mt-2.5 w-4 shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9">
                    <Button href={`/${locale}/services/${service.slug}`}>
                      {dict.cta.discover}
                    </Button>
                  </div>
                </div>
              </article>
              {i < services.length - 1 && <Filet />}
            </Reveal>
          ))}

          <Reveal>
            <div className="pt-16 text-center">
              <Button href={`/${locale}/contact`} variant="club">
                {dict.cta.request}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
