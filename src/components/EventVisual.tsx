import Image from "next/image";
import type { EventItem } from "@/data/events";

/**
 * Visuel d'un événement : photo /public/images/<slug>.jpg (convention),
 * voile sombre + légère teinte par-dessus pour rester dans l'ambiance noir & or.
 * Pour changer une photo : remplacer le fichier du même nom dans /public/images.
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
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(10,10,9,0.2), rgba(10,10,9,0.5)), hsla(${event.hue}, 30%, 12%, 0.15)`,
        }}
      />
    </div>
  );
}
