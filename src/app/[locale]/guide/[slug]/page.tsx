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
import { ReadingCounter } from "@/components/ReadingCounter";
import { articleVisual } from "@/lib/univers";
import { PosterHero } from "@/components/poster";

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
  const visual = articleVisual(slug);

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
      <ReadingCounter />

      <PosterHero locale={locale}
        visual={visual}
        label={`${d.published} ${formatDate(article.date, locale)} · ${article.readingMinutes} ${d.reading}`}
        title={article.title[locale]}
        chapter="05"
        footer={`AZ Experiences — ${dict.nav.guide}`}
        short
      />

      <article className="py-24">
        <div className="wrap grid gap-12 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-3">
            <Link
              href={`/${locale}/guide`}
              className="label text-ivory transition-opacity hover:opacity-60"
            >
              ← {dict.cta.backToGuide}
            </Link>
          </div>
          <div className="md:col-span-7 md:col-start-5">
            <Reveal>
              <p className="t-h2 text-ivory">{article.excerpt[locale]}</p>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-12 flex flex-col gap-6">
                {article.body[locale].map((block, i) =>
                  block.h ? (
                    <h2 key={i} className="t-h2 mt-6 text-ivory">
                      {block.h}
                    </h2>
                  ) : (
                    <p key={i} className="t-body measure text-ivory/80">
                      {block.p}
                    </p>
                  )
                )}
              </div>
            </Reveal>
            <Reveal>
              <div className="mt-16 bg-graphite p-8">
                <h2 className="t-h3 mb-3 text-ivory">{d.ctaTitle}</h2>
                <p className="t-small mb-8 text-ivory/80">{d.ctaText}</p>
                <GoldLink href={`/${locale}/contact`} solid>
                  {dict.cta.request}
                </GoldLink>
              </div>
            </Reveal>
          </div>
        </div>
      </article>
    </>
  );
}
