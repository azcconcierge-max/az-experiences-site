import type { Metadata } from "next";
import Image from "next/image";
import { getDict, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { Parallax } from "@/components/Parallax";
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
                className={`grid items-center gap-10 border-t border-ivory/10 py-16 scroll-mt-28 lg:grid-cols-2 lg:gap-16 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="img-reveal relative aspect-[4/3] overflow-hidden">
                  <Parallax amount={26} className="absolute -inset-y-8 inset-x-0">
                    <Image
                      src={`/images/${service.slug}.jpg`}
                      alt={service.title[locale]}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </Parallax>
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent"
                  />
                  <span className="display absolute bottom-5 left-6 text-5xl text-ivory/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="display text-3xl text-ivory md:text-4xl">
                    {service.title[locale]}
                  </h2>
                  <p className="display mt-3 text-lg text-gold italic">
                    {service.phrase[locale]}
                  </p>
                  <p className="mt-6 text-sm leading-relaxed text-ivory-dim md:text-base">
                    {service.text[locale]}
                  </p>
                  <p className="eyebrow mt-8 mb-4">{d.pointsLabel}</p>
                  <ul className="flex flex-col gap-2.5">
                    {service.points[locale].map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm text-ivory/85">
                        <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-gold" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}

          <Reveal>
            <div className="border-t border-ivory/10 pt-16 text-center">
              <GoldLink href={`/${locale}/contact`} solid>
                {dict.cta.request}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
