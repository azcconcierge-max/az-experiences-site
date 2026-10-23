import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { getDict, isLocale, locales, type Locale } from "@/i18n";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { JsonLd } from "@/components/JsonLd";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MobileBar } from "@/components/MobileBar";
import { GlobalDetails } from "@/components/GlobalDetails";
import { SideIndex } from "@/components/SideIndex";
import { RevealObserver } from "@/components/RevealObserver";
import "../globals.css";

// Une seule famille : Thin 100, Light 300, Regular 400, Medium 500 (brand book p.18)
const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500"],
  style: "normal",
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
      images: [{ url: "/brand/images/AZ-partage-site-1200x630.png", width: 1200, height: 630 }],
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
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <head>
        {/* active les apparitions seulement si le JavaScript tourne */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <div aria-hidden="true" className="read-progress" />
        <RevealObserver />
        <SmoothScroll />
        <GlobalDetails />
        <JsonLd data={organizationJsonLd} />
        <Header locale={locale} nav={nav} ctaLabel={dict.cta.request} />
        <SideIndex
          locale={locale}
          items={[...nav, { href: `/${locale}/contact`, label: dict.nav.contact }]}
        />
        <main>{children}</main>
        <Footer locale={locale as Locale} dict={dict} />
        <div className="hidden md:block">
          <WhatsAppFloat label={dict.cta.whatsapp} />
        </div>
        <MobileBar locale={locale} requestLabel={dict.cta.request} />
      </body>
    </html>
  );
}
