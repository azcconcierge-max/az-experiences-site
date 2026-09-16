import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { TitleReveal, LineMask } from "@/components/TitleReveal";
import { ServicesIndex } from "@/components/ServicesIndex";
import { AskSection } from "@/components/AskSection";
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

      {/* ---- Index éditorial : un titre, une phrase, neuf lignes ---- */}
      <section className="px-5 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-[1440px]">
          <LineMask delay={100}>
            <p className="eyebrow">{d.eyebrow}</p>
          </LineMask>
          <h1 className="display mt-5 text-[clamp(2.8rem,7vw,7.5rem)] leading-[0.98]">
            <LineMask delay={250}>
              <span className="block">{d.title}</span>
            </LineMask>
          </h1>
          <LineMask delay={420}>
            <p className="mt-7 max-w-xl text-base leading-[1.7] font-light text-ink-dim md:text-lg">
              {d.introShort}
            </p>
          </LineMask>
          <div className="mt-16 md:mt-24">
            <ServicesIndex locale={locale} />
          </div>
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
