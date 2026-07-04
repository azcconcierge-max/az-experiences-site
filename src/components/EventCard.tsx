import Link from "next/link";
import type { EventItem } from "@/data/events";
import type { Dict, Locale } from "@/i18n";
import { EventVisual } from "./EventVisual";

export function EventCard({
  event,
  locale,
  dict,
}: {
  event: EventItem;
  locale: Locale;
  dict: Dict;
}) {
  return (
    <Link
      href={`/${locale}/evenements/${event.slug}`}
      className="group block overflow-hidden border border-ivory/8 bg-noir-card transition-colors duration-500 hover:border-gold/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <EventVisual
          event={event}
          className="h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 border border-ivory/20 bg-noir/60 px-3 py-1 text-[0.6rem] tracking-[0.25em] text-ivory uppercase backdrop-blur-sm">
          {dict.events.categories[event.category]}
        </span>
      </div>
      <div className="p-6">
        <p className="mb-2 text-[0.65rem] tracking-[0.25em] text-gold uppercase">
          {event.dateLabel[locale]} — {event.city}
        </p>
        <h3 className="display mb-2 text-2xl text-ivory">{event.name}</h3>
        <p className="mb-5 text-sm text-ivory-dim">{event.tagline[locale]}</p>
        <span className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.25em] text-gold uppercase">
          {dict.cta.requestAccess}
          <span className="inline-block h-px w-6 bg-gold transition-all duration-500 group-hover:w-10" />
        </span>
      </div>
    </Link>
  );
}
