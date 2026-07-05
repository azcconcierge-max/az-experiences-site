import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { Parallax } from "@/components/Parallax";

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
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.about;

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      {/* Manifeste */}
      <section className="px-5 pb-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="display text-2xl leading-relaxed text-ivory md:text-3xl">
              {d.manifesto}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Spécialistes du sold out (ivoire) */}
      <section className="section-ivory px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <h2 className="display text-3xl leading-[1.1] md:text-5xl">{d.soldout.title}</h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-base leading-relaxed text-ink-dim md:text-lg lg:pt-3">
              {d.soldout.text}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="img-reveal relative aspect-[3/4] overflow-hidden">
              <Parallax amount={32} className="absolute -inset-y-10 inset-x-0">
                <Image
                  src="/images/fondateur.jpg"
                  alt={`${d.founder.name} — ${d.founder.role}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </Parallax>
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent"
              />
            </div>
          </Reveal>
          <Reveal delay={180}>
            <p className="eyebrow mb-6">{d.founder.eyebrow}</p>
            <h2 className="display text-4xl text-ivory md:text-5xl">{d.founder.name}</h2>
            <p className="mt-2 text-[0.68rem] tracking-[0.3em] text-gold uppercase">
              {d.founder.role}
            </p>
            <div className="mt-8 flex flex-col gap-5 text-sm leading-relaxed text-ivory-dim md:text-base">
              <p>{d.founder.p1}</p>
              <p>{d.founder.p2}</p>
              <p>{d.founder.p3}</p>
            </div>
            <p className="display mt-9 border-l border-gold/60 pl-6 text-xl leading-relaxed text-gold italic md:text-2xl">
              « {d.founder.quote} »
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trois piliers */}
      <section className="px-5 py-24 md:px-8 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {d.pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 150}>
                <div className="border-t border-ivory/12 pt-6">
                  <span className="display text-4xl text-gold/50">{["I", "II", "III"][i]}</span>
                  <h2 className="display mt-4 mb-3 text-2xl text-ivory">{pillar.title}</h2>
                  <p className="text-sm leading-relaxed text-ivory-dim">{pillar.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="gold-line my-20" />
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-ivory">
              {d.closing}
            </p>
            <div className="mt-12 text-center">
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
