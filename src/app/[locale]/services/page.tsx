import type { Metadata } from "next";
import { serviceVisual, visuals } from "@/lib/univers";
import { getDict, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { pageAlternates } from "@/lib/seo";
import { PosterCard, PosterHero } from "@/components/poster";
import { Reveal } from "@/components/Reveal";
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

      {/* ---- Un titre, une phrase, puis un poster par service ---- */}
      <PosterHero
        visual={visuals.palaces}
        label={d.eyebrow}
        title={d.title}
        chapter="02"
        footer={`AZ Experiences — ${dict.nav.services}`}
      />
      <section className="pt-24 pb-12">
        <div className="wrap">
          <p className="t-h2 max-w-[40rem] text-ivory">{d.introShort}</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="wrap grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 80} className="h-full">
              <PosterCard
                href={`/${locale}/services/${s.slug}`}
                visual={serviceVisual(s.slug)}
                label={String(i + 1).padStart(2, "0")}
                title={s.title[locale]}
              />
            </Reveal>
          ))}
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
