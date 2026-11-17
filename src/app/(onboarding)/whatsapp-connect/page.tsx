import type { Metadata } from "next";
import { WhatsAppEmbeddedSignup } from "@/components/WhatsAppEmbeddedSignup";

export const metadata: Metadata = {
  title: "Connexion WhatsApp Business",
  robots: { index: false, follow: false },
};

export default function WhatsAppConnectPage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-xl flex-col justify-center px-6 py-16">
      <p className="label">WhatsApp Business</p>
      <h1 className="t-h1 mt-6 text-ivory">Connecter le compte</h1>
      <p className="t-body mt-4 text-stone">
        Reliez le numéro de la maison. Il peut rester ouvert dans l&apos;application WhatsApp
        Business : le parcours affiche un QR code pour confirmer la coexistence.
      </p>
      <WhatsAppEmbeddedSignup />
    </main>
  );
}
