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
import { GoldLink } from "@/components/GoldLink";
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

      {/* ---- HERO ---- */}
      <section className="relative flex min-h-[70svh] items-end overflow-hidden">
        <div aria-hidden="true" className="kenburns absolute inset-0">
          <Image
            src={`/images/${service.slug}.jpg`}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/45 to-noir/30" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 md:px-8">
          <Reveal>
            <Link
              href={`/${locale}/services`}
              className="mb-8 inline-block text-[0.65rem] tracking-[0.25em] text-ivory-dim uppercase transition-colors hover:text-gold"
            >
              ← {dict.nav.services}
            </Link>
            <h1 className="display max-w-4xl text-5xl leading-[1.02] text-ivory md:text-8xl">
              {service.title[locale]}
            </h1>
            <p className="display mt-6 max-w-2xl text-xl text-gold italic md:text-2xl">
              {service.phrase[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- PROMESSE ---- */}
      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-2xl leading-relaxed text-ivory md:text-3xl">
              {detail.intro[locale]}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---- CE QUE NOUS ORCHESTRONS (ivoire) ---- */}
      <section className="section-ivory px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-5">{d.orchestrationsLabel}</p>
            <h2 className="display mb-14 max-w-2xl text-3xl leading-[1.1] md:text-5xl">
              {service.title[locale]}
            </h2>
          </Reveal>
          <div className="grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {detail.orchestrations[locale].map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 100} className="bg-ivory">
                <div className="flex h-full flex-col gap-4 p-8">
                  <span className="display text-2xl text-gold-deep/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-ink md:text-base">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- FAQ + CTA ---- */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <div>
              <h2 className="display mb-10 text-3xl text-ivory md:text-4xl">{d.faqTitle}</h2>
              <Faq items={detail.faq[locale]} />
            </div>
          </Reveal>
          <Reveal delay={150}>
            <aside className="h-fit border border-gold/30 bg-noir-card p-9 text-center lg:sticky lg:top-28">
              <p className="display mb-3 text-2xl text-ivory">{dict.contact.title}</p>
              <p className="mb-8 text-sm leading-relaxed text-ivory-dim">
                {dict.contact.intro}
              </p>
              <div className="flex flex-col gap-3">
                <GoldLink href={`/${locale}/contact`} solid className="text-center">
                  {dict.cta.request}
                </GoldLink>
              </div>
              <p className="mt-6 text-[0.62rem] tracking-[0.2em] text-ivory-dim uppercase">
                {dict.contact.confidential}
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* ---- AUTRES SERVICES ---- */}
      <section className="border-t border-ivory/8 px-5 py-20 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="grid gap-px border border-ivory/8 bg-ivory/8 sm:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/${locale}/services/${other.slug}`}
                  className="group block bg-noir p-8 transition-colors duration-500 hover:bg-noir-card"
                >
                  <h3 className="display text-xl text-ivory transition-colors duration-300 group-hover:text-gold">
                    {other.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm text-ivory-dim italic">{other.phrase[locale]}</p>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
