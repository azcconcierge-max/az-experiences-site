import Image from "next/image";
import type { EventItem } from "@/data/events";
import { EVENT_FRAMES, frameUniverse, universeSrc } from "@/lib/universes";

/**
 * Visuel d'un événement : image d'univers V1.2 (une teinte, un sujet),
 * cadrée différemment par événement, absorbée par le noir vers le bas.
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
  const frame = EVENT_FRAMES[event.slug] ?? { universe: "concerts" as const };
  const u = frameUniverse(frame);
  return (
    <div className={`photo-treated photo-brand ${className} overflow-hidden`} aria-hidden="true">
      <Image
        src={universeSrc(u, "1080")}
        alt=""
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={{
          objectPosition: frame.position ?? "50% 50%",
          transform: frame.zoom ? `scale(${frame.zoom})` : undefined,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(13,13,12,0.05) 0%, rgba(13,13,12,0.3) 55%, #0D0D0C 100%)" }}
      />
    </div>
  );
}
