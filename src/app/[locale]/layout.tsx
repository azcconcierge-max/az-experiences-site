import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import "../globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    metadataBase: new URL(site.baseUrl),
    title: {
      default: dict.home.metaTitle,
      template: `%s — ${site.name}`,
    },
    description: dict.home.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: site.name,
  legalName: site.legalName,
  url: site.baseUrl,
  email: site.email,
  foundingDate: String(site.foundingYear),
  description:
    "Conciergerie privée parisienne : accès VIP, hospitality, transport et billets pour les événements les plus exclusifs. Paris-based private concierge: VIP access, hospitality, transport and tickets for the world's most exclusive events.",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  areaServed: ["Paris", "France", "Europe", "Worldwide"],
  knowsLanguage: ["fr", "en"],
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    contactType: "customer service",
    availableLanguage: ["French", "English"],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDict(locale);

  const nav = [
    { href: `/${locale}/maison`, label: dict.nav.maison },
    { href: `/${locale}/conciergerie`, label: dict.nav.conciergerie },
    { href: `/${locale}/transport`, label: dict.nav.transport },
    { href: `/${locale}/hospitality`, label: dict.nav.hospitality },
    { href: `/${locale}/evenements`, label: dict.nav.evenements },
  ];

  return (
    <html lang={locale} className={`${bodoni.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={organizationJsonLd} />
        <Header locale={locale} nav={nav} ctaLabel={dict.cta.request} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <WhatsAppFloat label={dict.cta.whatsapp} />
      </body>
    </html>
  );
}
