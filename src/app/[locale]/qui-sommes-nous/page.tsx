import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { visuals } from "@/lib/univers";
import { PosterHero } from "@/components/poster";
import { TypoPanel } from "@/components/TypoPanel";
import { TestimonialRotator } from "@/components/TestimonialRotator";
import { AskSection } from "@/components/AskSection";

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
      {/* ---- 1 · HERO : la porte entrouverte, la maison ---- */}
      <PosterHero locale={locale}
        visual={visuals.jet}
        label={d.eyebrow}
        title={`${d.title}.`}
        subtitle={d.heroPhrase}
        chapter="01"
        footer={`AZ Experiences — ${d.eyebrow}`}
      />

      {/* ---- 2 · LA PHRASE, seule ---- */}
      <section className="py-24">
        <div className="wrap text-center">
          <p className="t-h1 mx-auto max-w-[36rem] text-ivory">{d.manifestoShort}</p>
        </div>
      </section>

      {/* ---- 3 · LE FONDATEUR : le monogramme plutôt qu'un visage ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <Reveal className="md:col-span-5">
            <TypoPanel name={d.founder.name} role={d.founder.role} />
          </Reveal>
          <Reveal delay={120} className="md:col-span-6 md:col-start-7">
            <p className="label mb-6">{d.founder.eyebrow}</p>
            <p className="t-h1 text-ivory">{d.founder.quote}</p>

            {/* Le récit complet, replié (conservé intact) */}
            <details className="group mt-12">
              <summary className="label cursor-pointer list-none text-ivory transition-opacity hover:opacity-60 [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-block transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
                {d.readStory}
              </summary>
              <div className="t-body measure mt-8 flex flex-col gap-5 text-ivory/75">
                <p>{d.founder.p1}</p>
                <p>{d.founder.p2}</p>
                <p>{d.founder.p3}</p>
                <p>{d.soldout.text}</p>
              </div>
            </details>
          </Reveal>
        </div>
      </section>

      {/* ---- 4 · LES PILIERS, puis les chiffres ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap">
          <p className="label mb-12">{d.pillarsEyebrow}</p>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-4">
            {d.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 80}>
                <div className="border-t border-graphite pt-6">
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="t-h3 mt-4 text-ivory">{pillar.title}</h2>
                  <p className="t-small mt-3 text-ivory/70">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-24 grid gap-10 border-t border-graphite pt-12 sm:grid-cols-3">
            {d.stats.map((stat) => (
              <p key={stat} className="t-h1 text-ivory">
                {stat}
              </p>
            ))}
          </div>
          <p className="t-small measure mt-10 text-ivory/70">{d.closing}</p>
        </div>
      </section>

      {/* ---- 5 · TÉMOIGNAGE ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap grid md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label mb-10">{dict.home.avisEyebrow}</p>
            <TestimonialRotator locale={locale} />
            <p className="caption mt-10">{dict.home.avisNote}</p>
          </div>
        </div>
      </section>

      {/* ---- 6 · DEMANDE PRIVÉE partagée ---- */}
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
