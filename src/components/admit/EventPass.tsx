import { Monogram } from "../Logo";
import { Barcode } from "./Pass";
import { Button } from "../GoldLink";

type Fact = { label: string; value?: string };

/**
 * The booking panel of an event page, printed as a pass:
 * the occasion, its facts, what the house arranges, and the request button on the stub.
 */
export function EventPass({
  admit,
  title,
  facts,
  offersTitle,
  offers,
  sold,
  cta,
  href,
  no,
}: {
  admit: string;
  title: string;
  facts: Fact[];
  offersTitle: string;
  offers: string[];
  sold: string;
  cta: string;
  href: string;
  no: string;
}) {
  return (
    <div>
    <div className="ao-pass ao-event-pass dk" style={{ cursor: "default" }}>
      <div className="ao-pass-main">
        <span className="ao-emboss" aria-hidden="true"><Monogram width={240} /></span>
        <div className="ao-pass-top">
          <Monogram width={46} />
          <span>{admit}</span>
        </div>
        <div className="ao-pass-body">
          <p className="ao-pass-title !min-h-0">{title}</p>
          <dl className="ao-pass-facts">
            {facts.filter((f) => f.value).map((f) => (
              <div key={f.label}>
                <dt className="ao-k">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
          <p className="ao-k mt-7">{offersTitle}</p>
          <ul className="ao-pass-offers">
            {offers.map((o) => <li key={o}>{o}</li>)}
          </ul>
          <p className="ao-sold mt-6 inline-block">{sold}</p>
        </div>
      </div>
      <div className="ao-stub">
        <div><span className="ao-k">Nº</span><b>{no}</b></div>
        <Barcode />
      </div>
    </div>
      <div className="mt-8">
        <Button href={href} variant="lin">{cta}</Button>
      </div>
    </div>
  );
}
