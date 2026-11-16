import { permanentRedirect } from "next/navigation";

/** Ancienne adresse : la politique est publiée sous /politique-de-confidentialite. */
export default async function LegacyPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  permanentRedirect(`/${locale}/politique-de-confidentialite`);
}
