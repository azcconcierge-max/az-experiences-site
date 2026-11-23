"use client";

import { useEffect, useState } from "react";

type Letter = { quote: string; name: string; context: string };

/** Testimonials as a stack of letters: click or wait, the next one comes forward. */
export function Letters({ letters, labels }: { letters: Letter[]; labels: { next: string; letter: string; client: string } }) {
  const [top, setTop] = useState(0);
  const n = letters.length;
  const adv = () => setTop((t) => (t + 1) % n);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(adv, 8000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);
  return (
    <div>
      <div className="ao-letters" onClick={adv}>
        {letters.map((l, i) => {
          const k = (i - top + n) % n;
          return (
            <figure key={l.name} className="ao-letter" style={{ ["--k" as string]: k }} aria-hidden={k !== 0}>
              <div className="ao-letter-head"><span>{l.context}</span><span>{labels.letter} {String(i + 1).padStart(2, "0")}</span></div>
              <blockquote>« {l.quote} »</blockquote>
              <figcaption><span className="ao-sig">{l.name}</span><span className="label">{labels.client} · {l.context}</span></figcaption>
            </figure>
          );
        })}
      </div>
      <div className="ao-letters-nav">
        <span className="label">{String(top + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
        <button type="button" className="btn-label ao-next" onClick={adv}>{labels.next} →</button>
      </div>
    </div>
  );
}
