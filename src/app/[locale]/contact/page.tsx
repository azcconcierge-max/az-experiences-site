import type { Metadata } from "next";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";
import { faqJsonLd } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { Crumbs, FaqBlock, PvPage, waHref } from "@/components/pv/blocks";
import { RequestForm } from "@/components/pv/RequestForm";

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
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const r = dict.pv.req;

  return (
    <PvPage>
      <JsonLd data={faqJsonLd(dict.home.faq)} />
      <section className="req">
        <RequestForm
          dict={dict}
          email={site.email}
          whatsapp={site.whatsapp}
          side={
            <>
              <Crumbs locale={locale} dict={dict} items={[[dict.cta.request]]} />
              <div className="label hero-in">{dict.cta.request}</div>
              <h1 className="req-title split">{r.title}</h1>
              <p className="hero-in">{r.sub}</p>
              <div className="req-direct hero-in">
                {site.whatsapp && (
                  <a href={waHref(locale)} target="_blank" rel="noopener noreferrer" className="link">{r.preferWa} →</a>
                )}
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <span>{site.address.street}, {site.address.postalCode} {site.address.city}</span>
              </div>
            </>
          }
        />
      </section>
      <FaqBlock items={dict.home.faq} title={dict.home.faqTitle} label={dict.home.faqEyebrow} />
    </PvPage>
  );
}
