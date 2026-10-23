import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Parallax } from "./Parallax";
import type { Locale } from "@/i18n";
import { eventVisual, universeNumber, universeWords, type Visual } from "@/lib/univers";
import type { EventItem } from "@/data/events";

/*
  La grammaire du brand book, reprise page par page :
  couverture de chapitre (image plein cadre, titre Thin en bas à droite),
  cartes « image, titre, légende » (p.06), tuiles légendées (p.22-23).
*/

/** « PORTE 06 · TENNIS », ou le seul nom hors des huit portes. */
export function universeLabel(visual: Visual, locale: Locale) {
  const n = universeNumber(visual);
  return n ? `${universeWords.word[locale]} ${n} · ${visual.name[locale]}` : visual.name[locale];
}

/** Une image du brand book, en plein cadre dans son conteneur. */
export function Illustration({
  visual,
  priority = false,
  sizes = "100vw",
  className = "",
}: {
  visual: Visual;
  priority?: boolean;
  sizes?: string;
  /** conservé pour compatibilité : les images du brand book sont carrées */
  portrait?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={visual.image}
      alt=""
      fill
      priority={priority}
      sizes={sizes}
      quality={75}
      className={`object-cover ${className}`}
    />
  );
}

/**
 * Couverture de chapitre (brand book p.03, 14, 20, 24) : l'image en plein
 * cadre, le label « CHAPITRE 02 » au-dessus d'un titre Thin aligné à droite,
 * un label dessous, et la ligne de pied « AZ EXPERIENCES — … · 02 / 06 ».
 */
export function PosterHero({
  visual,
  label,
  title,
  aside,
  children,
  as: Title = "h1",
  short = false,
  priority = true,
  chapter,
  footer,
  subtitle,
}: {
  visual: Visual;
  /** label au-dessus du titre (« CHAPITRE 02 », une porte, une région) */
  label?: ReactNode;
  title: ReactNode;
  /** label sous le titre (« MANIFESTE · MISSION · VISION ») */
  aside?: ReactNode;
  /** phrase sous le titre, en Headline 2 */
  subtitle?: ReactNode;
  children?: ReactNode;
  as?: "h1" | "h2" | "p";
  short?: boolean;
  priority?: boolean;
  /** « 02 » : numéro affiché dans la ligne de pied */
  chapter?: string;
  /** texte de gauche de la ligne de pied */
  footer?: ReactNode;
}) {
  // Le Thin géant est réservé aux titres courts (« Brand », « Logo ») ;
  // une phrase longue passe en Display 56 px, comme une ligne de héros.
  const long = typeof title === "string" && title.length > 28;
  return (
    <section
      className={`relative flex flex-col justify-end overflow-hidden bg-graphite ${short ? "min-h-[84svh]" : "min-h-svh"}`}
    >
      <div aria-hidden="true" className="absolute inset-0">
        {/* l'image arrive (flou → net) puis glisse moins vite que la page */}
        <Parallax>
          <div className="cover-arrive absolute inset-0">
            <Illustration visual={visual} priority={priority} />
          </div>
        </Parallax>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,13,12,0.35) 0%, rgba(13,13,12,0) 25%, rgba(13,13,12,0) 45%, rgba(13,13,12,0.6) 100%)",
          }}
        />
      </div>
      <div className="wrap relative z-10 pb-8">
        <div className="ml-auto flex max-w-[60rem] flex-col items-end text-right">
          {label && (
            <p className="label fade-late mb-4 text-ivory/90" style={{ "--d": "200ms" } as CSSProperties}>
              {label}
            </p>
          )}
          <Title className={`${long ? "t-display" : "t-cover"} text-ivory`}>
            <span className="rise-mask">
              <span>{title}</span>
            </span>
          </Title>
          {subtitle && (
            <p className="t-h2 fade-late mt-6 max-w-[36rem] text-ivory/90" style={{ "--d": "800ms" } as CSSProperties}>
              {subtitle}
            </p>
          )}
          {aside && (
            <p className="label fade-late mt-5 text-ivory/90" style={{ "--d": "900ms" } as CSSProperties}>
              {aside}
            </p>
          )}
          {children && (
            <div className="fade-late mt-10 flex flex-wrap justify-end gap-4" style={{ "--d": "1000ms" } as CSSProperties}>
              {children}
            </div>
          )}
        </div>
        <div className="fade-late mt-16 flex items-center justify-between gap-6" style={{ "--d": "1200ms" } as CSSProperties}>
          <span className="label text-ivory/75">{footer ?? "AZ Experiences"}</span>
          {chapter && <span className="label shrink-0 whitespace-nowrap text-ivory/75">{chapter} / 06</span>}
        </div>
      </div>
    </section>
  );
}

/** Carte du brand book (p.06) : l'image, un titre, une légende en Stone. */
export function PosterCard({
  href,
  visual,
  label,
  title,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  href: string;
  visual: Visual;
  label?: ReactNode;
  title: ReactNode;
  /** conservé pour compatibilité, non affiché */
  mention?: ReactNode;
  sizes?: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Illustration
          visual={visual}
          sizes={sizes}
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </div>
      <p className="t-h2 mt-4 text-ivory transition-opacity group-hover:opacity-70">{title}</p>
      {label && <p className="t-small mt-1 text-stone">{label}</p>}
    </Link>
  );
}

/** Tuile carrée légendée (brand book p.22-23) : le label posé en bas à gauche. */
export function UniverseTile({
  href,
  visual,
  label,
  caption,
  sizes = "(max-width: 768px) 50vw, 25vw",
  className = "",
}: {
  href: string;
  visual: Visual;
  label: ReactNode;
  /** phrase sous le label (ex. l'accroche d'une destination) */
  caption?: ReactNode;
  portrait?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={`door group relative block aspect-square overflow-hidden bg-graphite ${className}`}>
      <Illustration
        visual={visual}
        sizes={sizes}
        className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <span className="absolute right-4 bottom-4 left-4 md:right-6 md:bottom-6 md:left-6">
        <span className="label door-label block text-ivory">{label}</span>
        {caption && <span className="t-small mt-2 hidden max-w-[22rem] text-ivory/80 md:block">{caption}</span>}
      </span>
    </Link>
  );
}

/** En-tête de section (brand book) : « 02 — SERVICES » puis un titre Light. */
export function SectionHead({
  kicker,
  title,
  aside,
  className = "",
}: {
  kicker: ReactNode;
  title: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${className}`}>
      <div>
        <p className="label mb-6 text-inherit opacity-80">{kicker}</p>
        <h2 className="t-h1">{title}</h2>
      </div>
      {aside && <div className="label text-inherit opacity-70">{aside}</div>}
    </div>
  );
}

/** Ligne de liste à filet (brand book p.02) : numéro, titre, label à droite. */
export function RuledRow({
  href,
  num,
  title,
  aside,
  delay = 0,
}: {
  delay?: number;
  href: string;
  num: string;
  title: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <li className="ruled-row reveal border-b border-graphite first:border-t" style={{ "--d": `${delay}ms` } as CSSProperties}>
      <Link href={href} className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 py-5 xl:grid-cols-[3rem_1fr_9rem]">
        <span className="label text-ivory">{num}</span>
        <span className="ruled-title t-h2 text-ivory">{title}</span>
        {aside && <span className="label col-start-2 mt-2 xl:col-start-3 xl:mt-0 xl:text-right">{aside}</span>}
      </Link>
    </li>
  );
}

/**
 * Carte événement : les textes de la carte d'origine (date, ville, nom,
 * « Demander un accès ») dans la grammaire du brand book.
 */
export function EventPoster({ event, locale, cta }: { event: EventItem; locale: Locale; cta: string }) {
  return (
    <Link href={`/${locale}/evenements/${event.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
        <Illustration
          visual={eventVisual(event.slug)}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <span className="label absolute top-4 left-4 bg-black/70 px-3 py-1.5 text-ivory">{event.dateLabel[locale]}</span>
      </div>
      <p className="label mt-4">{event.city}</p>
      <p className="t-h2 mt-2 text-ivory transition-opacity group-hover:opacity-70">{event.name}</p>
      <p className="label mt-3 text-ivory">
        {cta} <span className="arrow">→</span>
      </p>
    </Link>
  );
}
