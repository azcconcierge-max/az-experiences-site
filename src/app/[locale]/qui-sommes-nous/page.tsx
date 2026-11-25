import type { Metadata } from "next";
import Image from "next/image";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { testimonials } from "@/data/testimonials";
import { CtaBand, Label, PvPage, QuoteBlock, TextHero } from "@/components/pv/blocks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).about;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/qui-sommes-nous", locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.about;
  const pv = dict.pv;

  return (
    <PvPage>
      <TextHero locale={locale} dict={dict} k={d.eyebrow} title={`${d.title}.`} sub={`${d.heroPhrase} ${d.manifestoShort}`} crumbs={[[d.eyebrow]]} />
      <section className="ivory">
        <div className="wrap about-grid">
          <div className="about-portrait" data-rv="">
            <div className="about-portrait-img">
              <Image src="/az/gen/about-door.webp" alt={pv.aboutAlt} fill sizes="(max-width: 900px) 320px, 35vw" style={{ objectFit: "cover" }} />
            </div>
            <div className="label" style={{ color: "#BFB8A8", marginTop: 16 }}>{pv.portrait}</div>
          </div>
          <div>
            <div className="label dark" data-rv="">{d.founder.eyebrow}</div>
            <p className="about-lead" data-fill="">{d.founder.quote}</p>
            <div className="about-story" data-rv="">
              <p>{d.founder.p1}</p>
              <p>{d.founder.p2}</p>
              <p>{d.founder.p3}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="sec founders">
        <div className="wrap">
          <div className="a-sechead">
            <span className="label">I.</span>
            <h2 className="h2 split">{pv.founders}</h2>
          </div>
          <div className="fd-grid">
            <article className="fd" data-rv="">
              <div className="fd-mono" aria-hidden="true">NA</div>
              <div><span className="label">{d.founder.role}</span><h3>{d.founder.name}</h3><p>{pv.noamBio}</p></div>
            </article>
            <article className="fd" data-rv="">
              <div className="fd-mono" aria-hidden="true">AO</div>
              <div><span className="label">{d.cofounder.role}</span><h3>{d.cofounder.name}</h3><p>{d.cofounder.text}</p></div>
            </article>
          </div>
          <p className="fd-sign" data-rv="">{pv.fdSign}</p>
        </div>
      </section>
      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Label>{d.pillarsEyebrow}</Label>
          <h2 className="h2 split">{pv.pillarsTitle}</h2>
          <div className="pillars">
            {d.pillars.map((p, i) => (
              <div key={p.title} className="pillar" data-rv="">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="stats" aria-label={pv.requests}>
        <div className="stats-grid four">
          <div className="stat" data-rv=""><div className="n">24/7</div><span className="label">{pv.reachable}</span></div>
          <div className="stat" data-rv=""><div className="n">&lt;1h</div><span className="label">{pv.avgResponse}</span></div>
          <div className="stat" data-rv=""><div className="n"><span data-count="1000">1000</span>+</div><span className="label">{pv.requests}</span></div>
          <div className="stat" data-rv=""><div className="n">4</div><span className="label">{pv.languages}</span></div>
        </div>
      </section>
      <QuoteBlock label={pv.trusted} quotes={testimonials.slice(0, 3).map((t) => ({ text: t.quote[locale], name: t.name, context: t.context[locale] }))} />
      <CtaBand locale={locale} dict={dict} />
    </PvPage>
  );
}
