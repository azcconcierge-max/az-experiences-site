import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { testimonials } from "@/data/testimonials";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { TypoPanel } from "@/components/TypoPanel";
import { Filet } from "@/components/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).about;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/qui-sommes-nous", locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.about;

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      {/* Manifeste */}
      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-2xl leading-[1.35] md:text-3xl">{d.manifesto}</p>
          </Reveal>
        </div>
      </section>

      {/* Le fondateur, à la première personne */}
      <section className="bg-club px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <TypoPanel name={d.founder.name} role={d.founder.role} />
          </Reveal>
          <Reveal delay={180}>
            <p className="eyebrow mb-6">{d.founder.eyebrow}</p>
            <h2 className="display text-4xl text-lin md:text-6xl">{d.founder.name}</h2>
            <p className="mt-3 text-[0.8rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
              {d.founder.role} · AZ Management
            </p>
            <div className="mt-9 flex flex-col gap-5 text-base leading-[1.7] font-light text-lin/85">
              <p>{d.founder.p1}</p>
              <p>{d.founder.p2}</p>
              <p>{d.founder.p3}</p>
            </div>
            <p className="display mt-9 border-l border-laiton pl-6 text-xl leading-[1.4] text-laiton-clair md:text-2xl">
              {d.founder.quote}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Spécialistes du sold out */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="display text-3xl leading-[0.98] md:text-5xl">{d.soldout.title}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="max-w-[65ch] text-base leading-[1.7] font-light text-ink-dim md:text-lg lg:pt-3">
              {d.soldout.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Les quatre valeurs de la maison */}
      <section className="nuit grain px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {d.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 120}>
                <div>
                  <Filet className="mb-6" />
                  <span className="display text-3xl text-laiton-clair">
                    {["I", "II", "III", "IV"][i]}
                  </span>
                  <h2 className="display mt-4 mb-3 text-2xl text-lin">{pillar.title}</h2>
                  <p className="text-sm leading-[1.7] font-light text-lin/75">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Avis clients */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-5">{dict.home.avisEyebrow}</p>
            <h2 className="display mb-4 max-w-2xl text-3xl leading-[0.98] md:text-4xl">
              {dict.home.avisTitle}
            </h2>
            <p className="mb-12 max-w-[65ch] text-sm font-light text-ink-dim">
              {dict.home.avisNote}
            </p>
          </Reveal>
          <div className="grid gap-px bg-club/12 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 130} className="bg-lin">
                <figure className="flex h-full flex-col justify-between p-8">
                  <blockquote>
                    <p className="display text-lg leading-[1.4]">{t.quote[locale]}</p>
                  </blockquote>
                  <figcaption className="mt-7">
                    <Filet className="mb-4" />
                    <p className="text-sm font-normal">{t.name}</p>
                    <p className="mt-1 text-[0.75rem] font-normal lowercase tracking-[0.12em] text-laiton">
                      {t.context[locale]}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fermeture */}
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Filet className="mb-20" />
          <Reveal>
            <p className="mx-auto max-w-[60ch] text-center text-lg leading-[1.7] font-light">
              {d.closing}
            </p>
            <div className="mt-12 text-center">
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
