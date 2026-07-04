import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { site, whatsappHref } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

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
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: "/fr/contact", en: "/en/contact" },
    },
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
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <ContactForm dict={dict} email={site.email} />
          </Reveal>

          <Reveal delay={150}>
            <aside className="h-fit border border-ivory/10 bg-noir-card p-8">
              <h2 className="eyebrow mb-6">{d.direct}</h2>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-ivory transition-colors hover:text-gold"
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
                      className="text-ivory transition-colors hover:text-gold"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li className="text-ivory-dim">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </li>
              </ul>
              <div className="gold-line my-8" />
              <p className="text-xs leading-relaxed text-ivory-dim italic">{d.confidential}</p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
