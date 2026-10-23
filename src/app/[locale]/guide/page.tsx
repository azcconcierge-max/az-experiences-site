import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { articles } from "@/data/articles";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { articleVisual } from "@/lib/univers";
import { PosterCard, PosterHero } from "@/components/poster";
import { Button } from "@/components/GoldLink";
import { AskSection } from "@/components/AskSection";

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

/** Espace insécable avant la ponctuation haute, pour ne jamais isoler un « ? ». */
function frPunct(text: string) {
  return text.replace(/ ([?!:;\u00BB])/g, "\u00A0$1").replace(/\u00AB /g, "\u00AB\u00A0");
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
  const [cover, ...rest] = sorted;

  return (
    <>
      {/* ---- COUVERTURE : le dernier article, en poster ---- */}
      <PosterHero
        visual={articleVisual(cover.slug)}
        label={`${d.eyebrow} · ${formatDate(cover.date, locale)}`}
        title={frPunct(cover.title[locale])}
        chapter="05"
        footer={`AZ Experiences — ${dict.nav.guide}`}
      >
        <Button href={`/${locale}/guide/${cover.slug}`} variant="lin">
          {dict.cta.readArticle}
        </Button>
      </PosterHero>

      {/* ---- LES AUTRES ARTICLES ---- */}
      {rest.length > 0 && (
        <section className="py-24">
          <div className="wrap grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 3) * 80} className="h-full">
                <PosterCard
                  href={`/${locale}/guide/${article.slug}`}
                  visual={articleVisual(article.slug)}
                  label={formatDate(article.date, locale)}
                  title={frPunct(article.title[locale])}
                />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
