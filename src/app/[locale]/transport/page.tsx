import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { ServicesPage } from "@/components/ServicesPage";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).transport;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: {
      canonical: `/${locale}/transport`,
      languages: { fr: "/fr/transport", en: "/en/transport" },
    },
  };
}

export default async function TransportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.transport;
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
