import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { Preloader } from "@/components/Preloader";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileBar } from "@/components/MobileBar";
import { Cursor } from "@/components/Cursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { GlobalDetails } from "@/components/GlobalDetails";
import { StickyCta } from "@/components/StickyCta";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
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
      template: `%s | ${site.name}`,
    },
    description: dict.home.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      languages: { fr: "/fr", en: "/en", es: "/es", pt: "/pt" },
    },
    openGraph: {
      siteName: site.name,
      locale: { fr: "fr_FR", en: "en_US", es: "es_ES", pt: "pt_PT" }[locale] ?? "fr_FR",
      type: "website",
      images: [{ url: "/brand2/og-image-1200x630.png", width: 1200, height: 630 }],
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
  knowsLanguage: ["fr", "en", "es", "pt"],
  telephone: site.whatsapp ? `+${site.whatsapp}` : undefined,
  sameAs: [site.linkedin, site.instagram].filter(Boolean),
  contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    telephone: site.whatsapp ? `+${site.whatsapp}` : undefined,
    contactType: "customer service",
    availableLanguage: ["French", "English", "Spanish", "Portuguese"],
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
    { href: `/${locale}/qui-sommes-nous`, label: dict.nav.about },
    { href: `/${locale}/services`, label: dict.nav.services },
    { href: `/${locale}/evenements`, label: dict.nav.events },
    { href: `/${locale}/destinations`, label: dict.nav.destinations },
    { href: `/${locale}/guide`, label: dict.nav.guide },
  ];

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <GlobalDetails />
        <Preloader />
        <JsonLd data={organizationJsonLd} />
        <Header locale={locale} nav={nav} ctaLabel={dict.cta.request} />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <div className="hidden md:block">
          <WhatsAppFloat label={dict.cta.whatsapp} />
          <StickyCta href={`/${locale}/contact`} label={dict.cta.requestAccess} />
        </div>
        <MobileBar locale={locale} requestLabel={dict.cta.request} />
        <Cursor labels={{ voir: dict.cta.cursorSee, glisser: dict.cta.cursorDrag }} />
        {/* Grain cinéma, texture de la maison */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[35] opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
