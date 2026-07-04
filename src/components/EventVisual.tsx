import type { EventItem } from "@/data/events";

/**
 * Visuel d'événement : la photo si elle existe, sinon un dégradé abstrait
 * élégant généré à partir de la teinte de l'événement.
 * Pour utiliser une photo : déposer le fichier dans /public/events/ et
 * renseigner `image` dans data/events.ts.
 */
export function EventVisual({
  event,
  className = "",
}: {
  event: EventItem;
  className?: string;
}) {
  if (event.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={event.image}
        alt={event.name}
        className={`object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  const h = event.hue;
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        background: [
          `radial-gradient(ellipse 80% 60% at 70% 20%, hsl(${h} 30% 22% / 0.9), transparent)`,
          `radial-gradient(ellipse 60% 50% at 20% 80%, hsl(${(h + 40) % 360} 35% 16% / 0.8), transparent)`,
          `radial-gradient(ellipse 40% 30% at 85% 85%, hsl(42 45% 35% / 0.35), transparent)`,
          `linear-gradient(160deg, #14130f, #0a0a09)`,
        ].join(", "),
      }}
    />
  );
}
