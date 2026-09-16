import { Reveal } from "./Reveal";
import { Filet } from "./brand";

/** En-tête éditorial commun aux pages intérieures, sur fond lin. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="px-5 pt-40 pb-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow mb-6">{eyebrow}</p>
          <h1 className="display max-w-3xl text-4xl leading-[0.98] md:text-6xl">{title}</h1>
          {intro && (
            <p className="mt-8 max-w-[65ch] text-base leading-[1.7] font-light text-ink-dim">
              {intro}
            </p>
          )}
        </Reveal>
        <Filet className="mt-16" />
      </div>
    </section>
  );
}
