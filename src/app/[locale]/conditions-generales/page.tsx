import type { Metadata } from "next";
import Link from "next/link";
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
    title: dict.legal.termsTitle,
    robots: { index: false },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const fr = locale === "fr";

  return (
    <>
      <PageHero eyebrow={fr ? "Légal" : "Legal"} title={dict.legal.termsTitle} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-3xl text-sm leading-relaxed text-ink-dim [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-medium [&_h2]:text-club [&_p]:mb-3">
          {fr ? (
            <>
              <p>
                Version en vigueur au 2 octobre 2026. La version française des présentes
                conditions fait seule foi ; les traductions sont fournies à titre de commodité.
              </p>

              <h2>1. Identité du vendeur</h2>
              <p>
                {site.legalName}, SIRET 993 643 378 00017, dont le siège est situé{" "}
                {site.address.street}, {site.address.postalCode} {site.address.city}, France,
                exploitant la marque AZ Experiences (ci-après « la Maison »).
                <br />
                Contact : {site.email} · WhatsApp +33 6 51 73 39 87 · azexperiences.com
              </p>

              <h2>2. Objet et champ d&apos;application</h2>
              <p>
                Les présentes conditions générales de vente (« CGV ») régissent toute commande de
                billets d&apos;événements, de prestations d&apos;hospitalité et de services de
                conciergerie passée auprès de la Maison, par tout client particulier ou
                professionnel (« le Client »). Toute commande emporte acceptation pleine et
                entière des présentes CGV, à l&apos;exclusion de tout autre document.
              </p>

              <h2>3. Nature du service</h2>
              <p>
                La Maison opère sur le marché secondaire et auprès d&apos;un réseau de détenteurs
                officiels, d&apos;organisateurs et de partenaires d&apos;hospitalité. Elle est
                indépendante des organisateurs, salles, fédérations, artistes et clubs cités,
                auxquels elle n&apos;est ni affiliée ni liée. Les prix proposés sont des prix de
                marché : ils peuvent être supérieurs ou inférieurs à la valeur faciale imprimée
                sur les billets.
              </p>

              <h2>4. Commande</h2>
              <p>
                Aucun prix n&apos;est affiché publiquement : chaque demande donne lieu à une
                proposition personnalisée (événement, date, catégorie, quantité, prix, conditions
                de livraison), communiquée par écrit (email ou WhatsApp). La commande est ferme et
                le contrat conclu dès acceptation écrite de la proposition par le Client et
                réception du paiement, selon les modalités précisées dans la proposition.
              </p>

              <h2>5. Prix et paiement</h2>
              <p>
                Les prix sont exprimés en euros, toutes taxes comprises, et incluent les frais de
                service de la Maison. Ils sont valables pour la durée indiquée dans la
                proposition ; à défaut, jusqu&apos;à épuisement de la disponibilité. Le paiement
                s&apos;effectue par virement bancaire ou tout autre moyen indiqué dans la
                proposition. La Maison se réserve le droit de ne pas donner suite à une commande
                non réglée dans les délais convenus.
              </p>

              <h2>6. Livraison des billets</h2>
              <p>
                Les billets sont livrés par voie électronique (e-billet, transfert officiel sur la
                plateforme de l&apos;organisateur) ou, le cas échéant, par remise physique, aux
                coordonnées fournies par le Client. Conformément aux usages du marché secondaire,
                certains billets ne peuvent être émis ou transférés par les organisateurs
                qu&apos;à l&apos;approche de l&apos;événement ; la livraison peut alors intervenir
                jusqu&apos;à 24 à 48 heures avant celui-ci sans que ce délai constitue un
                manquement. Le Client s&apos;engage à fournir des informations exactes et à
                suivre les instructions de transfert communiquées.
              </p>

              <h2>7. Garantie de livraison et remboursement</h2>
              <p>
                La Maison garantit la livraison de billets valides pour l&apos;événement, la date
                et une catégorie au moins équivalente à celle commandée. À défaut, le Client est
                intégralement remboursé dans les conditions détaillées dans la{" "}
                <Link href={`/${locale}/remboursements`} className="text-laiton">
                  politique de remboursement et d&apos;annulation
                </Link>
                , qui fait partie intégrante des présentes CGV.
              </p>

              <h2>8. Absence de droit de rétractation</h2>
              <p>
                Conformément à l&apos;article L221-28, 12° du Code de la consommation, le droit de
                rétractation ne s&apos;applique pas aux prestations de services d&apos;activités
                de loisirs devant être fournies à une date ou à une période déterminée. Toute
                commande confirmée est donc ferme et définitive, sous réserve des garanties
                prévues à l&apos;article 7.
              </p>

              <h2>9. Annulation ou report de l&apos;événement</h2>
              <p>
                En cas d&apos;annulation définitive de l&apos;événement par son organisateur, le
                Client est intégralement remboursé. En cas de report, les billets restent valables
                pour la nouvelle date et ne donnent pas lieu à remboursement, conformément aux
                conditions de l&apos;organisateur.
              </p>

              <h2>10. Obligations du Client</h2>
              <p>
                Le Client s&apos;engage à respecter les conditions d&apos;accès et le règlement du
                lieu de l&apos;événement, ainsi que les conditions du billet (identité requise,
                restrictions d&apos;âge, interdiction de revente lorsque celle-ci est prohibée par
                l&apos;organisateur). Le refus d&apos;accès imputable au comportement du Client ou
                au non-respect de ces conditions n&apos;ouvre droit à aucun remboursement.
              </p>

              <h2>11. Responsabilité</h2>
              <p>
                La Maison est tenue d&apos;une obligation de résultat quant à la livraison des
                billets, dans les limites de la garantie prévue à l&apos;article 7. Elle ne
                saurait en revanche être tenue responsable du contenu, du déroulement, de la
                qualité ou des modifications de programmation de l&apos;événement, qui relèvent
                exclusivement de l&apos;organisateur, ni des cas de force majeure. Sa
                responsabilité est en toute hypothèse limitée au montant payé par le Client pour
                la commande concernée.
              </p>

              <h2>12. Données personnelles</h2>
              <p>
                Les données du Client sont traitées conformément à la{" "}
                <Link href={`/${locale}/confidentialite`} className="text-laiton">
                  politique de confidentialité
                </Link>
                .
              </p>

              <h2>13. Droit applicable et litiges</h2>
              <p>
                Les présentes CGV sont soumises au droit français. En cas de réclamation, le
                Client s&apos;adresse d&apos;abord à la Maison ({site.email}), qui s&apos;engage à
                répondre dans les meilleurs délais. Le Client consommateur peut recourir
                gratuitement à un médiateur de la consommation ou à la plateforme européenne de
                règlement en ligne des litiges (ec.europa.eu/consumers/odr). À défaut de
                résolution amiable, les tribunaux compétents sont ceux de Paris, sous réserve des
                règles impératives de compétence applicables aux consommateurs.
              </p>
            </>
          ) : (
            <>
              <p>
                Version in force as of October 2, 2026. The French version of these terms is the
                authoritative one; translations are provided for convenience.
              </p>

              <h2>1. Seller identity</h2>
              <p>
                {site.legalName}, SIRET 993 643 378 00017, registered office at{" "}
                {site.address.street}, {site.address.postalCode} {site.address.city}, France,
                operating under the brand AZ Experiences (the &quot;House&quot;).
                <br />
                Contact: {site.email} · WhatsApp +33 6 51 73 39 87 · azexperiences.com
              </p>

              <h2>2. Purpose and scope</h2>
              <p>
                These Terms of Service govern every order of event tickets, hospitality packages
                and concierge services placed with the House by any private or business client
                (the &quot;Client&quot;). Placing an order implies full acceptance of these terms,
                to the exclusion of any other document.
              </p>

              <h2>3. Nature of the service</h2>
              <p>
                The House operates on the secondary market and through a network of official
                allocation holders, organisers and hospitality partners. It is independent from,
                and not affiliated with, the organisers, venues, federations, artists and clubs
                mentioned. Prices are market prices and may be higher or lower than the face value
                printed on the tickets.
              </p>

              <h2>4. Orders</h2>
              <p>
                No prices are displayed publicly: each request receives a personalised written
                proposal (event, date, category, quantity, price, delivery terms) by email or
                WhatsApp. The order is firm and the contract formed upon the Client&apos;s written
                acceptance of the proposal and receipt of payment, under the terms stated in the
                proposal.
              </p>

              <h2>5. Prices and payment</h2>
              <p>
                Prices are in euros, all taxes included, and include the House&apos;s service
                fees. They are valid for the period stated in the proposal or, failing that, while
                availability lasts. Payment is made by bank transfer or any other method stated in
                the proposal. The House may cancel any order not paid within the agreed time.
              </p>

              <h2>6. Ticket delivery</h2>
              <p>
                Tickets are delivered electronically (e-ticket or official transfer on the
                organiser&apos;s platform) or, where applicable, by physical handover, using the
                details provided by the Client. In line with secondary market practice, some
                tickets can only be issued or transferred by organisers close to the event;
                delivery may therefore occur up to 24 to 48 hours before the event without
                constituting a breach. The Client agrees to provide accurate information and to
                follow the transfer instructions given.
              </p>

              <h2>7. Delivery guarantee and refunds</h2>
              <p>
                The House guarantees delivery of valid tickets for the ordered event and date, in
                the ordered category or a better one. Failing that, the Client is refunded in
                full, as detailed in the{" "}
                <Link href={`/${locale}/remboursements`} className="text-laiton">
                  Refund and Cancellation Policy
                </Link>
                , which forms an integral part of these terms.
              </p>

              <h2>8. No right of withdrawal</h2>
              <p>
                Under Article L221-28, 12° of the French Consumer Code, the right of withdrawal
                does not apply to leisure services to be provided on a specific date or period.
                Every confirmed order is therefore firm and final, subject to the guarantees of
                section 7.
              </p>

              <h2>9. Event cancellation or postponement</h2>
              <p>
                If the organiser definitively cancels the event, the Client is refunded in full.
                If the event is postponed, tickets remain valid for the new date and are not
                refundable, in accordance with the organiser&apos;s conditions.
              </p>

              <h2>10. Client obligations</h2>
              <p>
                The Client agrees to comply with the venue&apos;s access conditions and rules and
                with the ticket conditions (identity requirements, age restrictions, resale
                restrictions where imposed by the organiser). Denied entry caused by the
                Client&apos;s conduct or non-compliance gives no right to a refund.
              </p>

              <h2>11. Liability</h2>
              <p>
                The House is bound by an obligation of result as to ticket delivery, within the
                limits of the guarantee in section 7. It is not responsible for the content,
                running, quality or programme changes of the event, which are the sole
                responsibility of the organiser, nor for force majeure. Its liability is in any
                event limited to the amount paid by the Client for the relevant order.
              </p>

              <h2>12. Personal data</h2>
              <p>
                The Client&apos;s data is processed in accordance with the{" "}
                <Link href={`/${locale}/confidentialite`} className="text-laiton">
                  privacy policy
                </Link>
                .
              </p>

              <h2>13. Governing law and disputes</h2>
              <p>
                These terms are governed by French law. Complaints should first be addressed to
                the House ({site.email}). Consumers may use a consumer mediation service free of
                charge or the European online dispute resolution platform
                (ec.europa.eu/consumers/odr). Failing amicable resolution, the courts of Paris
                have jurisdiction, subject to mandatory consumer jurisdiction rules.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
