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
    title: dict.legal.refundsTitle,
    robots: { index: false },
  };
}

export default async function RefundsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDict(locale);
  const fr = locale === "fr";

  return (
    <>
      <PageHero eyebrow={fr ? "Légal" : "Legal"} title={dict.legal.refundsTitle} />
      <section className="pb-24">
        <div className="wrap t-small max-w-[56rem] text-ivory/70 [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-medium [&_h2]:text-ivory [&_p]:mb-3">
          {fr ? (
            <>
              <p>
                Version en vigueur au 2 octobre 2026. La présente politique complète les{" "}
                <Link href={`/${locale}/conditions-generales`} className="text-stone">
                  conditions générales de vente
                </Link>{" "}
                de {site.legalName} (marque AZ Experiences) et fait foi dans sa version française.
              </p>

              <h2>1. Le principe : la garantie intégrale</h2>
              <p>
                Si la Maison ne livre pas des billets valides pour l&apos;événement, la date et
                une catégorie au moins équivalente à celle commandée, le Client est remboursé
                intégralement : 100 % des sommes versées, frais de service compris. Cette garantie
                couvre notamment les cas suivants :
              </p>
              <p>
                · billets non livrés avant l&apos;événement, quelle qu&apos;en soit la cause ;
                <br />
                · billets refusés à l&apos;entrée pour invalidité, sur présentation d&apos;un
                justificatif du contrôle d&apos;accès ;
                <br />
                · annulation définitive de l&apos;événement par l&apos;organisateur, sans report.
              </p>

              <h2>2. Billets de catégorie équivalente ou supérieure</h2>
              <p>
                Lorsque la catégorie exacte commandée n&apos;est plus disponible, la Maison peut
                proposer des billets de catégorie équivalente ou supérieure, sans supplément. Le
                Client est libre de les refuser : il est alors remboursé intégralement.
              </p>

              <h2>3. Événement reporté</h2>
              <p>
                En cas de report de l&apos;événement, les billets restent valables pour la
                nouvelle date, conformément aux conditions de l&apos;organisateur ; le report
                n&apos;ouvre pas droit à remboursement. Si le Client ne peut pas assister à la
                nouvelle date, la Maison s&apos;efforce, sans y être tenue, de proposer une
                solution commerciale.
              </p>

              <h2>4. Annulation par le Client</h2>
              <p>
                Toute commande confirmée et payée est ferme et définitive. Conformément à
                l&apos;article L221-28, 12° du Code de la consommation, le droit de rétractation
                ne s&apos;applique pas aux prestations de loisirs fournies à une date déterminée.
                L&apos;annulation par le Client, de même que le refus d&apos;accès imputable à son
                comportement ou au non-respect des conditions du billet, n&apos;ouvre droit à
                aucun remboursement.
              </p>

              <h2>5. Modalités de remboursement</h2>
              <p>
                Tout remboursement est effectué sur le moyen de paiement utilisé lors de la
                commande, dans un délai maximum de 10 jours ouvrés à compter de la confirmation du
                cas de remboursement par la Maison. Aucun frais n&apos;est retenu.
              </p>

              <h2>6. Réclamations</h2>
              <p>
                Toute demande s&apos;effectue par email ({site.email}) ou WhatsApp
                (+33 6 51 73 39 87), en indiquant la référence de la commande. La Maison accuse
                réception sous 48 heures ouvrées et traite chaque demande avec la plus grande
                diligence.
              </p>
            </>
          ) : (
            <>
              <p>
                Version in force as of October 2, 2026. This policy supplements the{" "}
                <Link href={`/${locale}/conditions-generales`} className="text-stone">
                  Terms of Service
                </Link>{" "}
                of {site.legalName} (brand AZ Experiences); the French version is authoritative.
              </p>

              <h2>1. The principle: a full guarantee</h2>
              <p>
                If the House fails to deliver valid tickets for the ordered event and date, in the
                ordered category or a better one, the Client is refunded in full: 100% of all sums
                paid, service fees included. This guarantee covers in particular:
              </p>
              <p>
                · tickets not delivered before the event, for any reason;
                <br />
                · tickets denied at the entrance as invalid, upon evidence from access control;
                <br />
                · definitive cancellation of the event by the organiser, with no rescheduled date.
              </p>

              <h2>2. Equivalent or upgraded tickets</h2>
              <p>
                Where the exact ordered category is no longer available, the House may offer
                tickets of an equivalent or better category at no extra cost. The Client is free
                to decline them, in which case a full refund is issued.
              </p>

              <h2>3. Postponed events</h2>
              <p>
                If the event is postponed, tickets remain valid for the new date in accordance
                with the organiser&apos;s conditions; postponement does not give right to a
                refund. If the Client cannot attend the new date, the House will endeavour, on a
                goodwill basis, to offer a commercial solution.
              </p>

              <h2>4. Cancellation by the Client</h2>
              <p>
                Every confirmed and paid order is firm and final. Under Article L221-28, 12° of
                the French Consumer Code, the right of withdrawal does not apply to leisure
                services provided on a specific date. Cancellation by the Client, as well as
                denied entry caused by the Client&apos;s conduct or non-compliance with the ticket
                conditions, gives no right to a refund.
              </p>

              <h2>5. Refund process</h2>
              <p>
                Refunds are issued to the payment method used for the order, within a maximum of
                10 business days from the House&apos;s confirmation of the refund case. No fees
                are withheld.
              </p>

              <h2>6. Claims</h2>
              <p>
                Requests are made by email ({site.email}) or WhatsApp (+33 6 51 73 39 87), quoting
                the order reference. The House acknowledges receipt within 48 business hours and
                handles every request with the utmost diligence.
              </p>
            </>
          )}
        </div>
      </section>
    </>
  );
}
