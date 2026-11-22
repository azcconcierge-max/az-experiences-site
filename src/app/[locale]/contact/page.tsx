import type { Metadata } from "next";
import { getDict } from "@/i18n";
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
      {/* ---- Admit One: the request writes its own pass ---- */}
      <section className="ao-contact-page pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="wrap">
          <p className="label mb-6">{d.eyebrow}</p>
          <h1 className="ao-title !mt-0 max-w-[14ch]">{d.title}</h1>
          <p className="t-body measure mt-8 text-stone">{d.intro}</p>
          <div className="mt-16 border-t border-graphite pt-16 md:mt-24">
            <Reveal>
              <ContactForm
                dict={dict}
                email={site.email}
                aside={
                  <div className="mt-12 border-t border-graphite pt-8">
                    <p className="label mb-4">{d.direct}</p>
                    <ul className="flex flex-col gap-1">
                      <li>
                        <a href={`mailto:${site.email}`} className="t-h3 text-ivory transition-opacity hover:opacity-60">
                          {site.email}
                        </a>
                      </li>
                      {wa && (
                        <li>
                          <a href={wa} target="_blank" rel="noopener noreferrer" className="t-h3 text-ivory transition-opacity hover:opacity-60">
                            WhatsApp
                          </a>
                        </li>
                      )}
                    </ul>
                    <p className="t-small mt-6 text-stone">
                      {site.address.street}, {site.address.postalCode} {site.address.city}
                    </p>
                    <p className="caption mt-3">{d.confidential}</p>
                  </div>
                }
              />
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
