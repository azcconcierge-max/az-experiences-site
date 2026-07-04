import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).maison;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/maison`,
      languages: { fr: "/fr/maison", en: "/en/maison" },
    },
  };
}

export default async function MaisonPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.maison;

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-3">
            {d.values.map((value, i) => (
              <Reveal key={value.title} delay={i * 150}>
                <div>
                  <span className="display text-4xl text-gold/50">
                    {["I", "II", "III"][i]}
                  </span>
                  <h2 className="display mt-5 mb-3 text-2xl text-ivory">{value.title}</h2>
                  <p className="text-sm leading-relaxed text-ivory-dim">{value.text}</p>
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
