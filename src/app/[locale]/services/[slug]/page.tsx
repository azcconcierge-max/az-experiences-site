import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { services } from "@/data/services";
import { serviceDetails } from "@/data/services-details";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { FadeImage } from "@/components/brand";
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
  const others = services.filter((s) => s.slug !== slug).slice(0, 3);

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

      {/* ---- Hero : photo en fondu vers le vert ---- */}
      <section className="relative flex min-h-[65svh] items-end overflow-hidden bg-club pt-20">
        <FadeImage
          src={`/images/${service.slug}.jpg`}
          priority
          className="absolute inset-0 h-full w-full"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/services`}
              className="mb-8 inline-block text-[0.8rem] font-normal lowercase tracking-[0.12em] text-lin/75 transition-colors hover:text-laiton-clair"
            >
              ← {dict.nav.services}
            </Link>
            <h1 className="display max-w-4xl text-4xl leading-[0.98] text-lin md:text-7xl">
              {service.title[locale]}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light text-laiton-clair md:text-xl">
              {service.phrase[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- Promesse ---- */}
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-2xl leading-[1.35] md:text-3xl">{detail.intro[locale]}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- Ce que nous orchestrons (vert club) ---- */}
      <section className="bg-club px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-5">{d.orchestrationsLabel}</p>
            <h2 className="display mb-14 max-w-2xl text-3xl leading-[0.98] text-lin md:text-5xl">
              {service.title[locale]}
            </h2>
          </Reveal>
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

      {/* ---- FAQ + demande ---- */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
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

      {/* ---- Autres services ---- */}
      <section className="border-t border-laiton/30 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-px bg-club/12 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/services/${other.slug}`}
                  className="group block bg-lin p-8 transition-colors duration-500 hover:bg-ivory-soft"
                >
                  <h3 className="display text-xl transition-colors duration-300 group-hover:text-laiton">
                    {other.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm font-light text-ink-dim">{other.phrase[locale]}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
