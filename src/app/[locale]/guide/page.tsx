import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDict, type Locale } from "@/i18n";
import { articles } from "@/data/articles";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { LineMask } from "@/components/TitleReveal";
import { ClipReveal } from "@/components/ClipReveal";
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
      {/* ---- COUVERTURE : le dernier article, plein écran ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-nuit">
        <Link
          href={`/${locale}/guide/${cover.slug}`}
          data-cursor="voir"
          className="group absolute inset-0 z-10"
          aria-label={cover.title[locale]}
        />
        <div aria-hidden="true" className="photo-treated absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image
              src={cover.image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,36,25,0.6) 0%, rgba(14,36,25,0.2) 32%, rgba(14,36,25,0.45) 62%, #0E2419 100%)",
            }}
          />
        </div>
        <div className="pointer-events-none relative z-20 mx-auto w-full max-w-[1440px] px-5 pb-16 md:px-10 md:pb-20">
          <LineMask delay={100}>
            <p className="eyebrow">
              {d.eyebrow} · {formatDate(cover.date, locale)}
            </p>
          </LineMask>
          <h1 className="display mt-5 max-w-5xl text-[clamp(2.4rem,5.5vw,5.5rem)] leading-[1.02] text-lin">
            <LineMask delay={260}>
              <span className="block">{frPunct(cover.title[locale])}</span>
            </LineMask>
          </h1>
          <LineMask delay={450}>
            <span className="mt-8 inline-flex items-center gap-3 text-[0.85rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
              {dict.cta.readArticle}
              <span aria-hidden="true" className="inline-block h-px w-8 bg-laiton-clair" />
            </span>
          </LineMask>
        </div>
      </section>

      {/* ---- LA GRILLE : grandes images 4:5, titre + date seulement ---- */}
      <section className="px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => (
              <Reveal key={article.slug} delay={(i % 3) * 110}>
                <Link href={`/${locale}/guide/${article.slug}`} data-cursor="voir" className="group block">
                  <ClipReveal className="photo-treated relative aspect-[4/5] overflow-hidden rounded-[2px]">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </ClipReveal>
                  <p className="eyebrow mt-6">{formatDate(article.date, locale)}</p>
                  <h2 className="display mt-3 text-2xl leading-[1.12] transition-colors duration-300 group-hover:text-laiton-fonce md:text-3xl">
                    {frPunct(article.title[locale])}
                  </h2>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
