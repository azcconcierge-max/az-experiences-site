import { Reveal } from "./Reveal";

/**
 * En-tête de section standardisé : numéro Bodoni laiton, mention,
 * grand titre Bodoni. La couleur du titre hérite du fond de la section.
 */
export function SectionHeader({
  num,
  eyebrow,
  title,
  intro,
  center = false,
}: {
  num?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <Reveal>
      <div className={`mb-16 ${center ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
        <p className={`eyebrow mb-5 flex items-baseline gap-4 ${center ? "justify-center" : ""}`}>
          {num && <span className="display text-sm normal-case tracking-normal">{num}</span>}
          {eyebrow}
        </p>
        <h2 className="display text-3xl leading-[0.98] md:text-5xl">{title}</h2>
        {intro && (
          <p className="mt-6 max-w-[65ch] text-base leading-[1.7] font-light opacity-75">{intro}</p>
        )}
      </div>
    </Reveal>
  );
}
