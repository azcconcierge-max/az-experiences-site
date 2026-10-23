import type { ReactNode } from "react";
import type { Visual } from "@/lib/univers";
import type { Locale } from "@/i18n";
import { PosterCard } from "./poster";
import { Reveal } from "./Reveal";

/** Trois posters en fin de page : « autres services », « autres rendez-vous »… */
export function RelatedPosters({
  title,
  items,
  locale,
}: {
  title: ReactNode;
  locale?: Locale;
  items: { href: string; visual: Visual; label?: ReactNode; title: ReactNode; mention?: ReactNode }[];
}) {
  return (
    <section className="border-t border-graphite py-24">
      <div className="wrap">
        <h2 className="t-h1 mb-12 text-ivory">{title}</h2>
        <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {items.slice(0, 3).map((item, i) => (
            <Reveal key={item.href} delay={i * 80} className="h-full">
              <PosterCard {...item} locale={locale} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * La phrase signature d'une page, seule sur le noir, sous un filet
 * (brand book : « une ligne de texte claire »). Les tons restent dans les images.
 */
export function ToneBand({ children }: { visual?: Visual; children: ReactNode }) {
  return (
    <section className="py-24">
      <div className="wrap">
        <p className="t-h1 max-w-[40rem] border-t border-graphite pt-12 text-ivory">{children}</p>
      </div>
    </section>
  );
}
