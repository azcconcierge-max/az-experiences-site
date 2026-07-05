import Link from "next/link";
import type { EventItem } from "@/data/events";
import type { Dict, Locale } from "@/i18n";
import { EventVisual } from "./EventVisual";

/** Carte événement, visuel plein cadre, titre sur l'image, façon TGZ. */
export function EventCard({
  event,
  locale,
  dict,
  large = false,
}: {
  event: EventItem;
  locale: Locale;
  dict: Dict;
  large?: boolean;
}) {
  return (
    <Link
      href={`/${locale}/evenements/${event.slug}`}
      className="group relative block overflow-hidden border border-ivory/8"
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <EventVisual
          event={event}
          className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-transparent"
        />
        <span className="absolute top-5 left-5 border border-ivory/25 bg-noir/50 px-3 py-1 text-[0.58rem] tracking-[0.28em] text-ivory uppercase backdrop-blur-sm">
          {dict.events.categories[event.category]}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <p className="mb-2 truncate text-[0.62rem] tracking-[0.28em] text-gold uppercase">
            {event.dateLabel[locale]}
          </p>
          <h3 className={`display text-ivory ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {event.name}
          </h3>
          {large && (
            <p className="mt-2 text-sm text-ivory/65 italic">{event.tagline[locale]}</p>
          )}
          <span className="mt-4 inline-flex items-center gap-3 text-[0.62rem] tracking-[0.28em] text-gold uppercase">
            {dict.cta.requestAccess}
            <span className="inline-block h-px w-6 bg-gold transition-all duration-500 group-hover:w-12" />
          </span>
        </div>
      </div>
    </Link>
  );
}
