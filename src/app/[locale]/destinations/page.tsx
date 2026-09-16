import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { DestinationsStrip } from "@/components/DestinationsStrip";

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
      <section className="px-5 pt-40 pb-14 md:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow mb-5">{d.eyebrow}</p>
            <h1 className="display max-w-3xl text-5xl leading-[1.02] text-club md:text-7xl">
              {d.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-dim md:text-lg">
              {d.intro}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-2 pb-24 md:px-4">
        <Reveal>
          <DestinationsStrip locale={locale} ctaLabel={d.explore} />
        </Reveal>
      </section>
    </>
  );
}
