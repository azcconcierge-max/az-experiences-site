import { PageHero } from "./PageHero";
import { Reveal } from "./Reveal";
import { GoldLink } from "./GoldLink";

type Service = { title: string; text: string };

/** Gabarit commun des pages de services (conciergerie, transport, hospitality). */
export function ServicesPage({
  eyebrow,
  title,
  intro,
  services,
  note,
  locale,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  services: Service[];
  note?: string;
  locale: string;
  ctaLabel: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} />
      <section className="px-5 pb-28 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-px border border-ivory/8 bg-ivory/8 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={(i % 2) * 100} className="bg-noir">
                <div className="h-full p-10">
                  <span className="display text-sm text-gold/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display mt-4 mb-3 text-2xl text-ivory">{service.title}</h2>
                  <p className="text-sm leading-relaxed text-ivory-dim">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          {note && (
            <Reveal>
              <p className="mx-auto mt-16 max-w-2xl text-center text-base leading-relaxed text-ivory-dim italic">
                {note}
              </p>
            </Reveal>
          )}
          <Reveal>
            <div className="mt-16 text-center">
              <GoldLink href={`/${locale}/contact`} solid>
                {ctaLabel}
              </GoldLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
