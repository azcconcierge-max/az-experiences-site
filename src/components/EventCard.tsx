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
      className="group relative block overflow-hidden rounded-[2px]"
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[16/11]" : "aspect-[4/3]"}`}>
        <EventVisual
          event={event}
          priority={priority}
          className="absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
          <p className="city mb-2 text-[0.7rem] text-laiton-clair">{event.city}</p>
          <p className={`display text-lin ${large ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
            {event.name}
          </p>
          <p className="mt-2 text-[0.8rem] font-light tracking-[0.04em] text-lin/75">
            {event.dateLabel[locale]}
          </p>
          <span className="mt-4 inline-flex items-center gap-3 text-[0.78rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
            {dict.cta.requestAccess}
            <span className="inline-block h-px w-6 bg-laiton-clair transition-all duration-500 group-hover:w-12" />
          </span>
        </div>
      </div>
    </Link>
  );
}
