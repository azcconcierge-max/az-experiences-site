import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { serviceDetails } from "@/data/services-details";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { TitleReveal, LineMask } from "@/components/TitleReveal";
import { ServicesStrip } from "@/components/ServicesStrip";
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

      {/* ---- 1 · HERO plein écran : photo, titre, une ligne ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-nuit">
        <div aria-hidden="true" className="photo-treated absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image
              src={`/images/${service.slug}.jpg`}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(13,13,12,0.72) 0%, rgba(13,13,12,0.2) 32%, rgba(13,13,12,0.35) 60%, #0D0D0C 100%)",
            }}
          />
        </div>
        <Breadcrumb
          ariaLabel={dict.nav.services}
          items={[
            { href: `/${locale}`, label: dict.nav.home },
            { href: `/${locale}/services`, label: dict.nav.services },
            { label: service.title[locale] },
          ]}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10 md:pb-24">
          <h1 className="display text-[clamp(2.6rem,7vw,7.5rem)] leading-[0.98] text-lin">
            <LineMask delay={250}>
              <span className="block">{service.title[locale]}</span>
            </LineMask>
          </h1>
        </div>
      </section>

      {/* ---- 2 · PROMESSE (lin) : textes intacts en colonne ---- */}
      <section className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1440px] lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-24">
          <Reveal>
            <p className="display max-w-3xl text-2xl leading-[1.35] md:text-3xl lg:text-4xl">
              {detail.intro[locale]}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <div className="mt-12 lg:mt-2">
              <p className="max-w-[60ch] text-base leading-[1.7] font-light text-ink-dim">
                {service.text[locale]}
              </p>
              <p className="eyebrow mt-10 mb-4">{d.pointsLabel}</p>
              <ul className="flex flex-col gap-2.5">
                {service.points[locale].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm font-light">
                    <span aria-hidden="true" className="filet mt-2.5 w-4 shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- 3 · LA PHRASE SIGNATURE en très grand (vert nuit) ---- */}
      <section className="nuit grain flex min-h-[70svh] items-center px-5 py-28 md:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <TitleReveal
            text={service.phrase[locale]}
            as="p"
            mode="scrub"
            className="display text-[clamp(2.2rem,5.5vw,5.5rem)] leading-[1.08] text-lin"
          />
        </div>
      </section>

      {/* ---- 4 · CE QUE NOUS ORCHESTRONS (vert club) ---- */}
      <section className="bg-club px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1440px]">
          <p className="eyebrow mb-5">{d.orchestrationsLabel}</p>
          <TitleReveal
            text={service.title[locale]}
            className="display mb-14 max-w-2xl text-3xl leading-[0.98] text-lin md:text-5xl"
          />
          <div className="grid gap-px bg-lin/12 sm:grid-cols-2 lg:grid-cols-3">
            {detail.orchestrations[locale].map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 100} className="bg-club">
                <div className="flex h-full flex-col gap-4 p-8">
                  <span className="display text-2xl text-laiton-clair">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-[1.7] font-light text-lin/85 md:text-base">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- 5 · FAQ + demande (lin) ---- */}
      <section className="px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div>
              <h2 className="display mb-10 text-3xl md:text-4xl">{d.faqTitle}</h2>
              <Faq items={detail.faq[locale]} />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <aside className="nuit grain h-fit rounded-[2px] p-9 text-center lg:sticky lg:top-28">
              <p className="display mb-3 text-2xl text-lin">{dict.contact.title}</p>
              <p className="mb-8 text-sm leading-[1.7] font-light text-lin/80">
                {dict.contact.intro}
              </p>
              <Button href={`/${locale}/contact`} variant="lin">
                {dict.cta.request}
              </Button>
              <p className="mt-6 text-[0.75rem] font-normal lowercase tracking-[0.12em] text-lin/60">
                {dict.contact.confidential}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- 6 · AUTRES SERVICES en défilement horizontal ---- */}
      <ServicesStrip locale={locale} exclude={slug} title={dict.cta.allServices} />
    </>
  );
}
