import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { articles } from "@/data/articles";
import { pageAlternates } from "@/lib/seo";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).guide;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/guide", locale),
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    { fr: "fr-FR", en: "en-GB", es: "es-ES", pt: "pt-PT" }[locale] ?? "fr-FR",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.guide;
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />

      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col">
            {sorted.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <Link
                  href={`/${locale}/guide/${article.slug}`}
                  className="group block border-t border-club/12 py-12"
                >
                  <p className="mb-3 text-[0.62rem] tracking-[0.12em] lowercase text-laiton">
                    {d.published} {formatDate(article.date, locale)}, {article.readingMinutes}{" "}
                    {d.reading}
                  </p>
                  <h2 className="display text-3xl text-club transition-colors duration-300 group-hover:text-laiton md:text-4xl">
                    {article.title[locale]}
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim md:text-base">
                    {article.excerpt[locale]}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-3 text-[0.62rem] tracking-[0.12em] lowercase text-laiton">
                    {dict.cta.readArticle}
                    <span className="inline-block h-px w-6 bg-laiton transition-all duration-500 group-hover:w-12" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-8 nuit grain rounded-[2px] p-12 text-center">
              <h2 className="display mb-3 text-2xl text-lin md:text-3xl">{d.ctaTitle}</h2>
              <p className="mx-auto mb-8 max-w-xl text-sm leading-[1.7] font-light text-lin/80">
                {d.ctaText}
              </p>
              <GoldLink href={`/${locale}/contact`}>
                {dict.cta.request}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
