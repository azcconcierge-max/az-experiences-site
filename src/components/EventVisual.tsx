import Image from "next/image";
import type { EventItem } from "@/data/events";

/**
 * Visuel d'un événement : photo /public/images/<slug>.jpg,
 * absorbée par le vert club vers le bas (le fondu de la charte).
 */
export function EventVisual({
  event,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  event: EventItem;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`${className} overflow-hidden`} aria-hidden="true">
      <Image
        src={event.image ?? `/images/${event.slug}.jpg`}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(23,58,44,0.08) 0%, rgba(23,58,44,0.35) 55%, #173A2C 100%)" }}
      />
    </div>
  );
}
