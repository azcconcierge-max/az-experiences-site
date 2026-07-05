type Item = { q: string; a: string };

/** FAQ accessible (details/summary), également balisée en Schema.org FAQPage. */
export function Faq({ items }: { items: Item[] }) {
  return (
    <div className="divide-y divide-ivory/8 border-y border-ivory/8">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left text-base text-ivory transition-colors hover:text-gold [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              aria-hidden="true"
              className="text-gold transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-3xl pb-6 text-sm leading-relaxed text-ivory-dim">{item.a}</p>
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
