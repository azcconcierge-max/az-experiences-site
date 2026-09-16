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
    title: dict.legal.privacyTitle,
    robots: { index: false },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const fr = locale === "fr";

  return (
    <>
      <PageHero eyebrow={fr ? "Légal" : "Legal"} title={dict.legal.privacyTitle} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-3xl text-sm leading-relaxed text-ink-dim [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-medium [&_h2]:text-club">
          <h2>{fr ? "Données collectées" : "Data collected"}</h2>
          <p>
            {fr
              ? "Les seules données personnelles collectées sur ce site sont celles que vous transmettez volontairement via le formulaire de demande privée : nom, email, téléphone et contenu de votre message. Elles servent exclusivement à traiter votre demande."
              : "The only personal data collected on this site is what you voluntarily submit through the private request form: name, email, phone and the content of your message. It is used exclusively to handle your request."}
          </p>
          <h2>{fr ? "Conservation & partage" : "Retention & sharing"}</h2>
          <p>
            {fr
              ? "Vos données ne sont jamais vendues ni partagées avec des tiers. La discrétion est le fondement de notre maison. Vous pouvez demander la suppression de vos données à tout moment en écrivant à "
              : "Your data is never sold or shared with third parties. Discretion is the foundation of our house. You may request deletion of your data at any time by writing to "}
            <a href={`mailto:${site.email}`} className="text-laiton">
              {site.email}
            </a>
            .
          </p>
          <h2>Cookies</h2>
          <p>
            {fr
              ? "Ce site n'utilise aucun cookie publicitaire ni traceur tiers."
              : "This site uses no advertising cookies or third-party trackers."}
          </p>
        </div>
      </section>
    </>
  );
}
