import { contactHref } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Button } from "./GoldLink";
import { MonogramDraw } from "./Logo";
import { Reveal } from "./Reveal";

/**
 * Clôture partagée (brand book p.28) : le monogramme seul, une phrase,
 * deux actions. Noir, centré, rien d'autre.
 */
export function AskSection({ locale, dict }: { locale: string; dict: Dict }) {
  return (
    <section className="border-t border-graphite py-32">
      <div className="wrap flex flex-col items-center text-center">
        <MonogramDraw width={160} />
        <Reveal delay={500}>
          <h2 className="t-h1 mt-10 text-ivory">{dict.home.askTitle}</h2>
        </Reveal>
        <Reveal delay={700} className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={`/${locale}/contact`} variant="lin">
            {dict.cta.request}
          </Button>
          <a
            href={contactHref("Bonjour, je souhaite faire une demande.")}
            className="btn-label inline-block border border-ivory/60 px-8 py-4 text-ivory transition-colors duration-500 hover:border-ivory"
          >
            {dict.cta.whatsapp}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
