import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDict, locales, type Locale } from "@/i18n";
import { articles, getArticle } from "@/data/articles";
import { events } from "@/data/events";
import { site } from "@/lib/site";
import { pageAlternates } from "@/lib/seo";
import { articleVisual } from "@/lib/univers";
import { eventCity, eventName, when } from "@/lib/names";
import { JsonLd } from "@/components/JsonLd";
import { Crumbs, Media, PvPage, ReqBtn } from "@/components/pv/blocks";

const ARTICLE_EVENT: Record<string, string> = {
  "obtenir-billets-evenement-sold-out": "champions-league",
  "grand-prix-monaco-vip": "f1-monaco",
  "monaco-adresses": "f1-monaco",
  "psg-parc-des-princes-loge-vip": "champions-league",
  "real-madrid-santiago-bernabeu-vip": "champions-league",
  "finale-ligue-des-champions-2027-madrid": "champions-league",
  "super-bowl-lxi-2027-billets-suite": "super-bowl",
  "rolex-monte-carlo-masters-2027-vip": "tennis-tour",
  "rolex-paris-masters-la-defense-arena-vip": "tennis-tour",
  "celine-dion-paris-la-defense-arena-2027": "celine-dion",
};

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
    { day: "numeric", month: "long", year: "numeric" },
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
  const i = articles.indexOf(article);
  const next = articles[(i + 1) % articles.length];
  const ev = events.find((e) => e.slug === ARTICLE_EVENT[slug]);

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
    <PvPage>
      <JsonLd data={articleJsonLd} />
      <div className="read-bar"><i data-readbar="" /></div>
      <section className="art-head">
        <div className="wrap narrow">
          <Crumbs locale={locale} dict={dict} items={[[dict.nav.guide, `/${locale}/guide`], [article.title[locale]]]} />
          <div className="label hero-in">{d.published} {formatDate(article.date, locale)} · {article.readingMinutes} {d.reading}</div>
          <h1 className="art-title split">{article.title[locale]}</h1>
          <p className="art-lead hero-in">{article.excerpt[locale]}</p>
        </div>
        <div className="wrap">
          <div className="art-hero" data-hero="">
            <Media visual={articleVisual(slug)} locale={locale} priority />
          </div>
        </div>
      </section>
      <section className="sec art-body" data-article="">
        <div className="wrap narrow">
          {article.body[locale].map((b, k) =>
            b.h ? <h2 key={k} data-rv="">{b.h}</h2> : <p key={k} data-rv="">{b.p}</p>,
          )}
          {ev && (
            <div className="art-cta" data-rv="">
              <div>
                <div className="label">{dict.pv.related}</div>
                <h3>{eventName(ev, locale)}</h3>
                <p>{when(ev.dateLabel[locale])} · {eventCity(ev, locale)}</p>
              </div>
              <div className="cta-row" style={{ marginTop: 0 }}>
                <ReqBtn locale={locale} ctx={`${eventName(ev, locale)}, ${when(ev.dateLabel[locale])}`}>{dict.cta.requestAccess}</ReqBtn>
                <Link href={`/${locale}/evenements/${ev.slug}`} className="link">{dict.pv.seeEvent} →</Link>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="next-art">
        <Link href={`/${locale}/guide/${next.slug}`} className="wrap next-link">
          <span className="label">{dict.pv.nextArticle}</span>
          <span className="next-title">{next.title[locale]}</span>
          <span className="go">→</span>
        </Link>
      </section>
    </PvPage>
  );
}
