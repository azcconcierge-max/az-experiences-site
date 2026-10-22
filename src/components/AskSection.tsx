import { contactHref } from "@/lib/site";
import type { Dict } from "@/i18n";
import { Reveal } from "./Reveal";
import { Button } from "./GoldLink";
import { TitleReveal } from "./TitleReveal";
import { MedallionDraw } from "./MedallionDraw";

/**
 * Section de clôture partagée : Crépuscule plein écran dont la lumière
 * dérive lentement, « SUR RECOMMANDATION » en contour laiton qui défile
 * derrière le titre, médaillon dont l'ovale se dessine à l'entrée.
 */
export function AskSection({ locale, dict }: { locale: string; dict: Dict }) {
  return (
    <section className="crepuscule grain relative flex min-h-svh items-center overflow-hidden px-5 md:px-10">
      {/* La lumière du Crépuscule dérive sur un cycle de 20 s */}
      <div
        aria-hidden="true"
        className="light-drift pointer-events-none absolute inset-[-12%]"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 108%, rgba(239,232,218,0.1) 0%, rgba(239,232,218,0) 70%)",
        }}
      />

      {/* Titre fantôme : la devise en capitales géantes, contour laiton */}
      <div
        aria-hidden="true"
        className="band pointer-events-none absolute top-1/2 left-0 w-full -translate-y-1/2 select-none"
      >
        <div className="band-track" style={{ animationDuration: "90s" }}>
          {[0, 1].map((k) => (
            <span
              key={k}
              className="ghost-title city pr-16 text-[clamp(6rem,16vw,15rem)] leading-none whitespace-nowrap"
            >
              l&apos;art de l&apos;acc&egrave;s
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center py-28 text-center">
        <Reveal>
          <MedallionDraw variant="lin" width={104} start="top 80%" />
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
