/** Bandeau défilant des rendez-vous, pause au survol, sobre. */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((name) => (
    <span key={name} className="flex items-center">
      <span className="display px-8 text-lg text-current opacity-70 md:text-xl">{name}</span>
      <span aria-hidden="true" className="h-1 w-1 rounded-full bg-laiton" />
    </span>
  ));

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden border-y border-laiton/30 py-5 select-none"
    >
      <div className="marquee-track">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
