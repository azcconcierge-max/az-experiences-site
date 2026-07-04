import { Reveal } from "./Reveal";

/**
 * En-tête de section standardisé — utilisé partout pour une structure
 * identique : numéro + eyebrow, grand titre serif, intro optionnelle.
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
          {num && <span className="display text-sm tracking-normal opacity-70">{num}</span>}
          {eyebrow}
        </p>
        <h2 className="display text-3xl leading-[1.1] md:text-5xl">{title}</h2>
        {intro && <p className="mt-6 text-base leading-relaxed opacity-70">{intro}</p>}
      </div>
    </Reveal>
  );
}
