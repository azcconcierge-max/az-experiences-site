/** Bandeau défilant des noms d'événements — pur CSS, pause si reduced-motion. */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((name) => (
    <span key={name} className="flex items-center">
      <span className="display px-8 text-lg text-ivory/60 italic md:text-xl">{name}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-gold/70" />
    </span>
  ));

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-ivory/8 bg-noir py-5 select-none"
    >
      <div className="marquee-track">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
