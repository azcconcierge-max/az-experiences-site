import Link from "next/link";
import type { EventItem } from "@/data/events";
import type { Dict, Locale } from "@/i18n";
import { EventVisual } from "./EventVisual";

/** Carte événement : photo en fondu vers le vert, ville en capitales, date en Hanken. */
export function EventCard({
  event,
  locale,
  dict,
  large = false,
  priority = false,
}: {
  event: EventItem;
  locale: Locale;
  dict: Dict;
  large?: boolean;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/${locale}/evenements/${event.slug}`}
      data-cursor="voir"
      className="group relative block overflow-hidden rounded-[2px]"
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <EventVisual
          event={event}
          priority={priority}
          className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        {/* Date en pastille */}
        <p className="absolute top-4 left-4 z-10 rounded-full bg-nuit/60 px-4 py-1.5 text-[0.72rem] font-normal lowercase tracking-[0.1em] text-lin backdrop-blur-sm">
          {event.dateLabel[locale]}
        </p>
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <p className="city mb-2 text-[0.7rem] text-laiton-clair">
            {event.city}
            <span
              aria-hidden="true"
              className="mt-1.5 block h-px w-10 origin-left scale-x-0 bg-laiton-clair transition-transform duration-500 group-hover:scale-x-100"
            />
          </p>
          <p className={`display text-lin ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {event.name}
          </p>
          <span className="block overflow-hidden">
            <span className="mt-3 block text-[0.78rem] font-normal lowercase tracking-[0.12em] text-laiton-clair transition-transform duration-500 [@media(hover:hover)]:translate-y-[130%] [@media(hover:hover)]:group-hover:translate-y-0">
              {dict.cta.requestAccess} →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
