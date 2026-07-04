import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { ServicesPage } from "@/components/ServicesPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).hospitality;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/hospitality`,
      languages: { fr: "/fr/hospitality", en: "/en/hospitality" },
    },
  };
}

export default async function HospitalityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.hospitality;
  return (
    <ServicesPage
      eyebrow={d.eyebrow}
      title={d.title}
      intro={d.intro}
      services={d.services}
      note={d.note}
      locale={locale}
      ctaLabel={dict.cta.requestAccess}
    />
  );
}
