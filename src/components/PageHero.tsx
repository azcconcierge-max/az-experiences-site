import { Reveal } from "./Reveal";

/** En-tête des pages intérieures : un label, un titre H1, une phrase. */
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
    <section className="pt-40 pb-16 md:pt-48 md:pb-24">
      <div className="wrap">
        <Reveal>
          <p className="label mb-6">{eyebrow}</p>
          <h1 className="t-h1 max-w-[40rem] text-ivory">{title}</h1>
          {intro && <p className="t-body measure mt-8 text-ivory/75">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}
