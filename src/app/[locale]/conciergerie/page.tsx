import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { ServicesPage } from "@/components/ServicesPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).conciergerie;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/conciergerie`,
      languages: { fr: "/fr/conciergerie", en: "/en/conciergerie" },
    },
  };
}

export default async function ConciergeriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.conciergerie;
  return (
    <ServicesPage
      eyebrow={d.eyebrow}
      title={d.title}
      intro={d.intro}
      services={d.services}
      locale={locale}
      ctaLabel={dict.cta.request}
    />
  );
}
