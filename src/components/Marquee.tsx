/** Bandeau très fin et lent : les rendez-vous en capitales espacées. */
export function Marquee({ items }: { items: string[] }) {
  const row = items.map((name) => (
    <span key={name} className="flex items-center">
      <span className="city px-10 text-[0.8rem] text-lin/50">{name}</span>
      <span aria-hidden="true" className="h-0.5 w-0.5 rounded-full bg-laiton/60" />
    </span>
  ));

  return (
    <div aria-hidden="true" className="overflow-hidden border-t border-lin/10 py-3 select-none">
      <div className="marquee-track" style={{ animationDuration: "90s" }}>
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
}
