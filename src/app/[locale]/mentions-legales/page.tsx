import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: dict.legal.mentionsTitle,
    robots: { index: false },
  };
}

export default async function MentionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const fr = locale === "fr";

  return (
    <>
      <PageHero eyebrow={fr ? "Légal" : "Legal"} title={dict.legal.mentionsTitle} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-3xl text-sm leading-relaxed text-ivory-dim [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-medium [&_h2]:text-ivory">
          <h2>{fr ? "Éditeur du site" : "Site publisher"}</h2>
          <p>
            {site.legalName} — SIRET 993 643 378 00017
            <br />
            {site.address.street}, {site.address.postalCode} {site.address.city}, France
            <br />
            Email : {site.email}
          </p>
          <h2>{fr ? "Directeur de la publication" : "Publication director"}</h2>
          <p>Noam Azoulay</p>
          <h2>{fr ? "Hébergement" : "Hosting"}</h2>
          <p>
            Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, USA —{" "}
            <a href="https://vercel.com" className="text-gold">
              vercel.com
            </a>
          </p>
          <h2>{fr ? "Propriété intellectuelle" : "Intellectual property"}</h2>
          <p>
            {fr
              ? "L'ensemble des contenus de ce site (textes, visuels, logo, identité) est la propriété exclusive de "
              : "All content on this site (texts, visuals, logo, identity) is the exclusive property of "}
            {site.legalName}.
          </p>
        </div>
      </section>
    </>
  );
}
