import Image from "next/image";
import { contactHref } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Reveal } from "./Reveal";
import { Button } from "./GoldLink";
import { TitleReveal } from "./TitleReveal";

/**
 * Section de clôture partagée : Crépuscule plein écran, médaillon,
 * « Où souhaitez-vous être ? », Demande privée + WhatsApp.
 * Utilisée par l'accueil et Qui sommes-nous.
 */
export function AskSection({ locale, dict }: { locale: string; dict: Dict }) {
  return (
    <section className="crepuscule grain flex min-h-svh items-center px-5 md:px-10">
      <div className="mx-auto flex max-w-[900px] flex-col items-center py-28 text-center">
        <Reveal>
          <Image
            src="/brand/logos/AZ-medaillon-lin.svg"
            alt=""
            width={110}
            height={140}
            className="mx-auto"
          />
        </Reveal>
        <TitleReveal
          text={dict.home.askTitle}
          className="display mt-12 text-[clamp(2.6rem,7vw,6.5rem)] leading-[1.02] text-lin"
        />
        <Reveal delay={200} className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <Button href={`/${locale}/contact`} variant="lin">
            {dict.cta.request}
          </Button>
          <a
            href={contactHref("Bonjour, je souhaite faire une demande.")}
            className="inline-block rounded-full border border-lin/60 px-8 py-3.5 text-[0.9rem] font-normal text-lin transition-opacity duration-500 hover:opacity-70"
          >
            {dict.cta.whatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
