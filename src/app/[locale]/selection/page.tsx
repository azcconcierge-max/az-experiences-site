import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { PageHero } from "@/components/PageHero";
import { SelectionList } from "@/components/SelectionList";
import { AskSection } from "@/components/AskSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).selection;
  return {
    title: { absolute: d.metaTitle },
    // page vivante partagée en privé : pas d'indexation
    robots: { index: false, follow: false },
  };
}

export default async function SelectionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.selection;

  return (
    <>
      <PageHero eyebrow="AZ Experiences" title={d.title} intro={dict.events.intro} />
      <section className="pb-24">
        <div className="wrap max-w-[56rem]">
          <SelectionList
            locale={locale}
            labels={{ empty: d.empty, updated: d.updated, request: dict.cta.requestAccess }}
          />
        </div>
      </section>
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
