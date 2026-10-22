/**
 * Deux bandeaux croisés : vert club incliné à -2°, laiton clair à +2°,
 * défilant en sens inverse. Les noms des rendez-vous en capitales Bodoni,
 * séparés par un petit ovale laiton. Sur mobile : un seul bandeau droit.
 */
function Dot({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-block h-1 w-1 rounded-full bg-current opacity-60 ${className}`} />
  );
}

function Track({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const seq = (
    <>
      {items.map((name) => (
        <span key={name} className="inline-flex items-center gap-9">
          <span className="city text-[0.95rem] tracking-[0.16em]">{name}</span>
          <Dot />
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
      <div className="band bg-graphite py-3.5 text-az-ivory md:hidden">
        <Track items={items} />
      </div>

      {/* Ordinateur : deux bandeaux croisés */}
      <div className="relative hidden h-32 md:block">
        <div className="band absolute inset-x-[-3%] top-1/2 -translate-y-[80%] -rotate-2 bg-graphite py-4 text-az-ivory">
          <Track items={items} />
        </div>
        <div className="band absolute inset-x-[-3%] top-1/2 -translate-y-[20%] rotate-2 bg-stone py-4 text-az-black">
          <Track items={items} reverse />
        </div>
      </div>
    </div>
  );
}
