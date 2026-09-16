import type { Metadata } from "next";
import Image from "next/image";
import { getDict } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { Reveal } from "@/components/Reveal";
import { LineMask } from "@/components/TitleReveal";
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
        {/* Gauche : vert nuit, médaillon, une phrase, liens directs */}
        <div className="nuit grain flex flex-col justify-between px-5 pt-32 pb-12 md:px-10 lg:pt-40 lg:pb-16">
          <div>
            <Reveal>
              <Image
                src="/brand/logos/AZ-medaillon-lin.svg"
                alt=""
                width={84}
                height={108}
              />
            </Reveal>
            <h1 className="display mt-10 text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[1.02] text-lin">
              <LineMask delay={150}>
                <span className="block">{d.title}</span>
              </LineMask>
            </h1>
            <LineMask delay={320}>
              <p className="mt-6 max-w-md text-base leading-[1.7] font-light text-lin/80">
                {d.intro}
              </p>
            </LineMask>
          </div>

          <Reveal delay={200}>
            <div className="mt-16">
              <p className="eyebrow mb-6">{d.direct}</p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="display text-xl text-lin transition-colors hover:text-laiton-clair md:text-2xl"
                  >
                    {site.email}
                  </a>
                </li>
                {wa && (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="display text-xl text-lin transition-colors hover:text-laiton-clair md:text-2xl"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
              <p className="mt-8 text-sm font-light text-lin/70">
                {site.address.street}, {site.address.postalCode} {site.address.city}
              </p>
              <div className="filet my-8 max-w-xs" />
              <p className="max-w-sm text-xs leading-[1.7] font-light text-lin/70">
                {d.confidential}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Droite : le formulaire, cinq champs soulignés */}
        <div className="flex items-center px-5 py-16 md:px-10 lg:py-40">
          <div className="w-full max-w-xl lg:mx-auto">
            <Reveal>
              <ContactForm dict={dict} email={site.email} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- FAQ (déplacée de l'accueil, balisage conservé) ---- */}
      <section className="border-t border-club/10 px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-3xl">
          <JsonLd data={faqJsonLd(dict.home.faq)} />
          <p className="eyebrow mb-5">{dict.home.faqEyebrow}</p>
          <h2 className="display mb-10 text-3xl md:text-4xl">{dict.home.faqTitle}</h2>
          <Faq items={dict.home.faq} />
        </div>
      </section>
    </>
  );
}
