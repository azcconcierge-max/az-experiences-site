import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { articles, getArticle } from "@/data/articles";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { GoldLink } from "@/components/GoldLink";
import { JsonLd } from "@/components/JsonLd";
import { ReadingProgress } from "@/components/ReadingProgress";

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const l = locale as Locale;
  return {
    title: { absolute: `${article.title[l]}, ${site.name}` },
    description: article.excerpt[l],
    alternates: pageAlternates(`/guide/${slug}`, locale),
  };
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(
    { fr: "fr-FR", en: "en-GB", es: "es-ES", pt: "pt-PT" }[locale] ?? "fr-FR",
    { day: "numeric", month: "long", year: "numeric" }
  );
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  const article = getArticle(slug);
  if (!article) notFound();
  const dict = getDict(locale);
  const d = dict.guide;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.excerpt[locale],
    datePublished: article.date,
    inLanguage: locale,
    author: { "@type": "Organization", name: site.name, url: site.baseUrl },
    publisher: { "@type": "Organization", name: site.name, url: site.baseUrl },
    mainEntityOfPage: `${site.baseUrl}/${locale}/guide/${article.slug}`,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <ReadingProgress />

      <article className="px-5 pt-40 pb-28 md:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Link
              href={`/${locale}/guide`}
              className="mb-10 inline-block text-[0.65rem] tracking-[0.12em] lowercase text-ink-dim transition-colors hover:text-laiton"
            >
              ← {dict.cta.backToGuide}
            </Link>
            <p className="eyebrow mb-5">
              {d.published} {formatDate(article.date, locale)}, {article.readingMinutes}{" "}
              {d.reading}
            </p>
            <h1 className="display text-4xl leading-[1.08] text-club md:text-6xl">
              {article.title[locale]}
            </h1>
            <p className="mt-7 text-lg leading-relaxed text-ink-dim">
              {article.excerpt[locale]}
            </p>
            <div className="filet my-12" />
          </Reveal>

          <Reveal delay={150}>
            <div className="flex flex-col gap-6">
              {article.body[locale].map((block, i) =>
                block.h ? (
                  <h2 key={i} className="display mt-6 text-2xl text-club md:text-3xl">
                    {block.h}
                  </h2>
                ) : (
                  <p key={i} className="text-base leading-relaxed text-club/85">
                    {block.p}
                  </p>
                )
              )}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-16 nuit grain rounded-[2px] p-10 text-center">
              <h2 className="display mb-3 text-2xl text-lin">{d.ctaTitle}</h2>
              <p className="mx-auto mb-7 max-w-md text-sm leading-[1.7] font-light text-lin/80">
                {d.ctaText}
              </p>
              <GoldLink href={`/${locale}/contact`}>
                {dict.cta.request}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
