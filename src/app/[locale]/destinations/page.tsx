import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { LineMask } from "@/components/TitleReveal";
import { DestinationsStrip } from "@/components/DestinationsStrip";
import { AskSection } from "@/components/AskSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).destinations;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/destinations", locale),
  };
}

export default async function DestinationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.destinations;

  return (
    <>
      {/* ---- Ouverture (vert nuit) : un titre, une phrase ---- */}
      <section className="nuit grain px-5 pt-36 pb-14 md:px-10 md:pt-44 md:pb-16">
        <div className="mx-auto max-w-[1440px]">
          <LineMask delay={100}>
            <p className="eyebrow">{d.eyebrow}</p>
          </LineMask>
          <h1 className="display mt-5 text-[clamp(2.8rem,6.5vw,7rem)] leading-[0.98] text-lin">
            <LineMask delay={250}>
              <span className="block">{d.title}</span>
            </LineMask>
          </h1>
          <LineMask delay={420}>
            <p className="mt-7 max-w-xl text-base leading-[1.7] font-light text-lin/80 md:text-lg">
              {d.introShort}
            </p>
          </LineMask>
        </div>
      </section>

      {/* ---- L'accordéon plein écran : six territoires ---- */}
      <section className="bg-nuit">
        <DestinationsStrip locale={locale} ctaLabel={d.explore} />
      </section>

      <AskSection locale={locale} dict={dict} />
    </>
  );
}
