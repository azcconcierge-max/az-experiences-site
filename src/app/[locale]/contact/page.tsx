import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
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
      <PageHero eyebrow={d.eyebrow} title={d.title} intro={d.intro} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <ContactForm dict={dict} email={site.email} />
          </Reveal>

          <Reveal delay={150}>
            <aside className="nuit grain h-fit rounded-[2px] p-8">
              <h2 className="eyebrow mb-6">{d.direct}</h2>
              <ul className="flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-lin transition-colors hover:text-laiton-clair"
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
                      className="text-lin transition-colors hover:text-laiton-clair"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
                <li className="text-lin/75">
                  {site.address.street}
                  <br />
                  {site.address.postalCode} {site.address.city}
                </li>
              </ul>
              <div className="filet my-8" />
              <p className="text-xs leading-[1.7] font-light text-lin/70">{d.confidential}</p>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
