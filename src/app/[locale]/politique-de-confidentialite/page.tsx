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

export default async function PrivacyPolicyPage({
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
      <section className="pb-24">
        <div className="wrap t-small max-w-[56rem] text-ivory/70 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-medium [&_h2]:text-ivory [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_a]:text-stone">
          {fr ? <FrenchPolicy /> : <EnglishPolicy />}
        </div>
      </section>
    </>
  );
}

function FrenchPolicy() {
  return (
    <>
      <p>Dernière mise à jour : 16 novembre 2026.</p>
      <p>
        AZ Management SAS, qui exploite la marque AZ Experiences, propose des services de
        billetterie d&apos;événements premium et de conciergerie à destination des particuliers et
        des professionnels. La présente politique décrit, en termes simples, comment les données
        personnelles sont traitées dans ce cadre.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        AZ Management SAS (marque AZ Experiences)
        <br />
        SIREN 993 643 378
        <br />
        RCS Paris
        <br />
        Siège social : 11 avenue Myron Herrick, 75008 Paris, France
        <br />
        Email : <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Données collectées</h2>
      <p>Selon les échanges et les commandes, les données suivantes peuvent être collectées :</p>
      <ul>
        <li>des données d&apos;identité ;</li>
        <li>
          des coordonnées, y compris le numéro de téléphone et le numéro WhatsApp ;
        </li>
        <li>des informations relatives aux commandes et aux paiements ;</li>
        <li>les messages échangés, y compris via WhatsApp Business.</li>
      </ul>

      <h2>Finalités</h2>
      <p>Ces données sont utilisées pour :</p>
      <ul>
        <li>traiter les demandes et les commandes ;</li>
        <li>assurer le service client ;</li>
        <li>communiquer par WhatsApp et par email ;</li>
        <li>respecter les obligations légales et comptables.</li>
      </ul>

      <h2>Bases légales</h2>
      <ul>
        <li>
          L&apos;exécution de mesures précontractuelles ou du contrat, pour le traitement des
          demandes, des commandes et du service client qui s&apos;y rapporte.
        </li>
        <li>
          Le respect d&apos;une obligation légale, pour les obligations comptables et les autres
          obligations imposées par la loi.
        </li>
        <li>
          L&apos;intérêt légitime d&apos;AZ Experiences, pour les communications par WhatsApp ou
          par email nécessaires au suivi d&apos;une demande.
        </li>
      </ul>

      <h2>Destinataires et sous-traitants</h2>
      <p>
        Les données sont communiquées uniquement à ceux qui en ont besoin pour les finalités
        ci-dessus :
      </p>
      <ul>
        <li>Vercel, hébergeur du site ;</li>
        <li>Meta / WhatsApp, pour la messagerie ;</li>
        <li>les prestataires de paiement, pour l&apos;encaissement.</li>
      </ul>
      <p>Les données ne sont pas vendues.</p>

      <h2>Durées de conservation</h2>
      <ul>
        <li>
          Les données relatives aux prospects sont conservées trois ans à compter du dernier
          contact.
        </li>
        <li>
          Les factures et les pièces qui s&apos;y rattachent sont conservées pendant les durées
          légales applicables aux documents comptables.
        </li>
      </ul>
      <p>
        Les autres données sont conservées pendant la durée nécessaire aux finalités décrites
        ci-dessus, puis supprimées.
      </p>

      <h2>Transferts hors de l&apos;Union européenne</h2>
      <p>
        Certains prestataires, notamment l&apos;hébergeur Vercel et Meta / WhatsApp, peuvent être
        établis aux États-Unis ou y traiter des données. Lorsque des données sont transférées en
        dehors de l&apos;Union européenne, ce transfert est encadré par des garanties appropriées.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement,
        d&apos;opposition, de portabilité et de limitation du traitement. Pour les exercer,
        écrivez à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la Commission nationale de
        l&apos;informatique et des libertés (CNIL) :{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        Ce site n&apos;utilise aucun cookie publicitaire ni traceur tiers. Seuls des cookies
        techniques strictement nécessaires à son fonctionnement peuvent, le cas échéant, être
        déposés.
      </p>
    </>
  );
}

function EnglishPolicy() {
  return (
    <>
      <p>Last updated: 16 November 2026.</p>
      <p>
        AZ Management SAS, which operates the AZ Experiences brand, provides premium event
        ticketing and concierge services for individuals and businesses. This policy describes, in
        plain language, how personal data is processed for that activity. The French version is
        the official text.
      </p>

      <h2>Data controller</h2>
      <p>
        AZ Management SAS (brand AZ Experiences)
        <br />
        SIREN 993 643 378
        <br />
        RCS Paris
        <br />
        Registered office: 11 avenue Myron Herrick, 75008 Paris, France
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>

      <h2>Data collected</h2>
      <p>Depending on the exchange or the order, the following data may be collected:</p>
      <ul>
        <li>identity data;</li>
        <li>contact details, including phone number and WhatsApp number;</li>
        <li>order and payment-related information;</li>
        <li>messages exchanged, including via WhatsApp Business.</li>
      </ul>

      <h2>Purposes</h2>
      <p>This data is used to:</p>
      <ul>
        <li>handle requests and orders;</li>
        <li>provide customer service;</li>
        <li>communicate by WhatsApp and by email;</li>
        <li>meet legal and accounting obligations.</li>
      </ul>

      <h2>Legal bases</h2>
      <ul>
        <li>
          Performance of pre-contractual measures or of a contract, for handling requests, orders
          and the related customer service.
        </li>
        <li>Compliance with a legal obligation, for accounting and other duties imposed by law.</li>
        <li>
          AZ Experiences&apos; legitimate interest, for WhatsApp or email messages needed to follow
          up on a request.
        </li>
      </ul>

      <h2>Recipients and processors</h2>
      <p>Data is shared only with those who need it for the purposes above:</p>
      <ul>
        <li>Vercel, the site&apos;s hosting provider;</li>
        <li>Meta / WhatsApp, for messaging;</li>
        <li>payment providers, for taking payment.</li>
      </ul>
      <p>Data is not sold.</p>

      <h2>Retention</h2>
      <ul>
        <li>Prospect data is kept for three years after the last contact.</li>
        <li>Invoices and related records are kept for the legal accounting retention periods.</li>
      </ul>
      <p>
        Other data is kept only for as long as needed for the purposes described above, then
        deleted.
      </p>

      <h2>Transfers outside the European Union</h2>
      <p>
        Some providers, in particular the host Vercel and Meta / WhatsApp, may be established in
        the United States or process data there. Where data is transferred outside the European
        Union, the transfer is covered by appropriate safeguards.
      </p>

      <h2>Your rights</h2>
      <p>
        You have the right to access, rectify and erase your data, to object to processing, to
        data portability and to restriction of processing. To exercise these rights, write to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
      <p>
        You may also lodge a complaint with the Commission nationale de l&apos;informatique et des
        libertés (CNIL):{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        .
      </p>

      <h2>Cookies</h2>
      <p>
        This site uses no advertising cookies and no third-party trackers. Only technical cookies
        strictly necessary for the site to function may be set, where required.
      </p>
    </>
  );
}
