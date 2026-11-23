import type { Metadata } from "next";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { articles } from "@/data/articles";
import { pageAlternates } from "@/lib/seo";
import { articleVisual } from "@/lib/univers";
import { CtaBand, Media, PvPage, TextHero } from "@/components/pv/blocks";

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
    { day: "numeric", month: "long", year: "numeric" },
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
  const [f, ...rest] = sorted;
  const meta = (a: (typeof articles)[number]) => `${formatDate(a.date, locale)} · ${a.readingMinutes} ${d.reading}`;

  return (
    <PvPage>
      <TextHero locale={locale} dict={dict} k={d.eyebrow} title={dict.pv.guideTitle} sub={dict.pv.guideSub} crumbs={[[dict.nav.guide]]} />
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {f && (
            <Link href={`/${locale}/guide/${f.slug}`} className="feat" data-rv="">
              <div className="feat-media" data-par="">
                <Media visual={articleVisual(f.slug)} locale={locale} sizes="(max-width: 900px) 100vw, 55vw" />
              </div>
              <div className="feat-txt">
                <div className="label">{meta(f)}</div>
                <h2>{f.title[locale]}</h2>
                <p>{f.excerpt[locale]}</p>
                <span className="link">{dict.cta.readArticle} →</span>
              </div>
            </Link>
          )}
          <div className="art-grid">
            {rest.map((a) => (
              <Link key={a.slug} href={`/${locale}/guide/${a.slug}`} className="art" data-rv="">
                <div className="art-media"><Media visual={articleVisual(a.slug)} locale={locale} sizes="(max-width: 900px) 100vw, 33vw" /></div>
                <div className="label">{meta(a)}</div>
                <h3>{a.title[locale]}</h3>
                <p>{a.excerpt[locale]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand locale={locale} dict={dict} title={d.ctaTitle} />
    </PvPage>
  );
}
