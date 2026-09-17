/**
 * Deux bandeaux croisés : vert club incliné à -2°, laiton clair à +2°,
 * défilant en sens inverse. Les noms des rendez-vous en capitales Bodoni,
 * séparés par un petit ovale laiton. Sur mobile : un seul bandeau droit.
 */
function Oval({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 10 13"
      aria-hidden="true"
      className={`h-[0.85em] w-auto shrink-0 ${className}`}
      fill="none"
    >
      <ellipse cx="5" cy="6.5" rx="4.2" ry="5.8" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const seq = (
    <>
      {items.map((name) => (
        <span key={name} className="inline-flex items-center gap-9">
          <span className="city text-[0.95rem] tracking-[0.16em]">{name}</span>
          <Oval />
        </span>
      ))}
    </>
  );
  return (
    <div className={`band-track ${reverse ? "reverse" : ""}`} aria-hidden="true">
      {seq}
      {seq}
    </div>
  );
}

export function CrossMarquee({ items }: { items: string[] }) {
  return (
    <div className="relative py-10 md:py-14">
      {/* Mobile : un seul bandeau droit */}
      <div className="band bg-club py-3.5 text-lin md:hidden">
        <Track items={items} />
      </div>

      {/* Ordinateur : deux bandeaux croisés */}
      <div className="relative hidden h-32 md:block">
        <div className="band absolute inset-x-[-3%] top-1/2 -translate-y-[80%] -rotate-2 bg-club py-4 text-lin">
          <Track items={items} />
        </div>
        <div className="band absolute inset-x-[-3%] top-1/2 -translate-y-[20%] rotate-2 bg-laiton-clair py-4 text-club">
          <Track items={items} reverse />
        </div>
      </div>
    </div>
  );
}
