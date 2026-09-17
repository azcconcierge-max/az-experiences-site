import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { LineMask } from "@/components/TitleReveal";
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
      <section className="px-5 pt-36 pb-24 md:px-10 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-[1100px]">
          <LineMask delay={100}>
            <p className="eyebrow">AZ Experiences</p>
          </LineMask>
          <h1 className="display mt-5 text-[clamp(2.6rem,6vw,6rem)] leading-[0.98]">
            <LineMask delay={250}>
              <span className="block">{d.title}</span>
            </LineMask>
          </h1>
          <LineMask delay={420}>
            <p className="mt-7 max-w-xl text-base leading-[1.7] font-light text-ink-dim md:text-lg">
              {dict.events.intro}
            </p>
          </LineMask>
          <div className="mt-16 md:mt-20">
            <SelectionList
              locale={locale}
              labels={{ empty: d.empty, updated: d.updated, request: dict.cta.requestAccess }}
            />
          </div>
        </div>
      </section>
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
