import { Reveal } from "./Reveal";

/** En-tête éditorial commun aux pages intérieures. */
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
          <h1 className="display max-w-3xl text-4xl leading-tight text-ivory md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ivory-dim">{intro}</p>
          )}
        </Reveal>
        <div className="gold-line mt-16" />
      </div>
    </section>
  );
}
