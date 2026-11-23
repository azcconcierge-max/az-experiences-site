/** Header of the simple pages (legal, selection): the preview's text hero. */
export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="pv">
      <div className="pv-root">
        <section className="thero" style={{ paddingBottom: "clamp(48px,6vw,80px)" }}>
          <div className="wrap">
            <div className="label hero-in">{eyebrow}</div>
            <h1 className="thero-title split">{title}</h1>
            {intro && <p className="phero-sub hero-in">{intro}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
