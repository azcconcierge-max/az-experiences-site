type Item = { q: string; a: string };

/** FAQ accessible (details/summary), balisée en Schema.org FAQPage. */
export function Faq({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-graphite border-y border-graphite">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left t-body text-ivory transition-opacity hover:opacity-70 [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="text-stone transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="t-small measure pb-6 text-ivory/70">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function faqJsonLd(items: Item[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
