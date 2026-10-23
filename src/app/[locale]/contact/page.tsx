import type { Metadata } from "next";
import { visuals } from "@/lib/univers";
import { Illustration } from "@/components/poster";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Faq, faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).contact;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/contact", locale),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const d = dict.contact;
  const wa = whatsappHref();

  return (
    <>
      {/* ---- Écran divisé : la maison à gauche, le formulaire à droite ---- */}
      <section className="grid lg:min-h-svh lg:grid-cols-[0.9fr_1.1fr]">
        {/* Gauche : la porte entrouverte, le titre, les liens directs */}
        <div
          className="relative flex min-h-[80svh] flex-col justify-end overflow-hidden bg-graphite lg:min-h-0"
        >
          <div aria-hidden="true" className="absolute inset-0">
            <Illustration locale={locale as Locale} visual={visuals.palaces} priority sizes="(max-width: 1024px) 100vw, 45vw" />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(13,13,12,0.2) 0%, rgba(13,13,12,0) 40%, rgba(13,13,12,0.75) 100%)" }}
            />
          </div>
          <div className="relative z-10 px-4 pt-40 pb-12 md:px-20 lg:pb-16">
            <h1 className="t-h1 text-ivory">{d.title}</h1>
            <p className="t-body measure mt-6 text-ivory/80">{d.intro}</p>
            <p className="label mt-12 mb-4 text-ivory/75">{d.direct}</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href={`mailto:${site.email}`} className="t-h3 text-ivory transition-opacity hover:opacity-60">
                  {site.email}
                </a>
              </li>
              {wa && (
                <li>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="t-h3 text-ivory transition-opacity hover:opacity-60"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
            <p className="t-small mt-6 text-ivory/70">
              {site.address.street}, {site.address.postalCode} {site.address.city}
            </p>
            <p className="caption mt-6 max-w-sm !text-ivory/65">{d.confidential}</p>
          </div>
        </div>

        {/* Droite : le formulaire, cinq champs soulignés */}
        <div className="flex items-center px-4 py-16 md:px-20 lg:py-40">
          <div className="w-full max-w-xl lg:mx-auto">
            <Reveal>
              <ContactForm dict={dict} email={site.email} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- FAQ (déplacée de l'accueil, balisage conservé) ---- */}
      <section className="border-t border-graphite py-24">
        <div className="wrap max-w-[56rem]">
          <JsonLd data={faqJsonLd(dict.home.faq)} />
          <p className="label mb-6">{dict.home.faqEyebrow}</p>
          <h2 className="t-h1 mb-10 text-ivory">{dict.home.faqTitle}</h2>
          <Faq items={dict.home.faq} />
        </div>
      </section>
    </>
  );
}
