import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getDict, type Locale } from "@/i18n";
import { events } from "@/data/events";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { pageAlternates } from "@/lib/seo";
import { contactHref } from "@/lib/site";
import { destinationVisual, eventVisual, universes, visuals } from "@/lib/univers";
import { Reveal } from "@/components/Reveal";
import { Button } from "@/components/GoldLink";
import { AskSection } from "@/components/AskSection";
import { Illustration, RuledRow } from "@/components/poster";
import { Pass } from "@/components/admit/Pass";
import { PassStory } from "@/components/admit/PassStory";
import { Programme, type ProgrammeRow } from "@/components/admit/Programme";
import { Letters } from "@/components/admit/Letters";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = getDict(locale);
  return {
    title: { absolute: dict.home.metaTitle },
    description: dict.home.metaDescription,
    alternates: pageAlternates("", locale),
  };
}

type T = Record<Locale, string>;
const all = (s: string): T => ({ fr: s, en: s, es: s, pt: s });

/** Event names and cities as each language says them (the data keeps one string). */
const NAMES: Record<string, T> = {
  "champions-league": { fr: "Finale de la Ligue des champions", en: "Champions League Final", es: "Final de la Champions League", pt: "Final da Liga dos Campeões" },
  "super-bowl": all("Super Bowl LXI"),
  "f1-monaco": { fr: "Grand Prix de Monaco", en: "Monaco Grand Prix", es: "Gran Premio de Mónaco", pt: "Grande Prémio do Mónaco" },
  "tennis-tour": { fr: "Tennis, toute la saison", en: "Tennis, all season", es: "Tenis, toda la temporada", pt: "Ténis, toda a temporada" },
  "fashion-week-paris": all("Paris Fashion Week"),
  "festival-cannes": { fr: "Festival de Cannes", en: "Cannes Film Festival", es: "Festival de Cannes", pt: "Festival de Cannes" },
  "met-gala": all("Met Gala"),
  oscars: { fr: "Les Oscars", en: "The Oscars", es: "Los Óscar", pt: "Os Óscares" },
  "celine-dion": { fr: "Céline Dion, tournée mondiale", en: "Céline Dion, world tour", es: "Céline Dion, gira mundial", pt: "Céline Dion, digressão mundial" },
};
const CITIES: Record<string, T> = {
  "tennis-tour": { fr: "Monde", en: "Worldwide", es: "Mundo", pt: "Mundo" },
  "celine-dion": { fr: "Monde", en: "Worldwide", es: "Mundo", pt: "Mundo" },
};
const GROUP: Record<string, ProgrammeRow["group"]> = { sport: "sport", musique: "music", mode: "culture", festival: "culture", ceremonie: "culture" };

/*
  Admit One. The home reads like a printed programme; the pass is the brand
  object: it carries the promise, sold out → confirmed.
*/
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const h = dict.home;
  const a = dict.admit;
  const name = (slug: string, fallback: string) => NAMES[slug]?.[locale] ?? fallback;
  const city = (slug: string, fallback: string) => CITIES[slug]?.[locale] ?? fallback;
  const when = (label: string) => label.split(" · ")[0];

  const passItems = ["champions-league", "f1-monaco", "fashion-week-paris", "festival-cannes"]
    .map((s) => events.find((e) => e.slug === s))
    .filter((e): e is (typeof events)[number] => Boolean(e))
    .map((e) => ({ title: name(e.slug, e.name), sub: `${e.venue} · ${city(e.slug, e.city)}`, date: when(e.dateLabel[locale]), access: e.offers[locale][0] }));

  const rows: ProgrammeRow[] = events.map((e) => ({
    slug: e.slug,
    href: `/${locale}/evenements/${e.slug}`,
    when: when(e.dateLabel[locale]),
    name: name(e.slug, e.name),
    city: city(e.slug, e.city),
    group: GROUP[e.category] ?? "culture",
    start: e.startDate,
    image: eventVisual(e.slug).image,
  }));

  const serviceTitle = (slug: string) => services.find((x) => x.slug === slug)?.title[locale] ?? "";
  const plates = [
    ...universes.map((u) => {
      const [, kind, slug] = u.href.split("/");
      const ev = events.find((e) => e.slug === slug);
      return { href: `/${locale}${u.href}`, visual: u.visual, title: kind === "services" ? serviceTitle(slug) : name(slug, ev?.name ?? "") };
    }),
    { href: `/${locale}/destinations/monaco`, visual: destinationVisual("monaco"), title: "Monaco" },
  ];
  const plateShape = ["tall", "", "", "wide", "", "tall", "", "", "wide"];

  return (
    <>
      {/* ---- HERO : the programme masthead and the pass ---- */}
      <section className="ao-hero">
        <div className="wrap ao-hero-grid">
          <div>
            <div className="ao-masthead fade-late" style={{ "--d": "100ms" } as CSSProperties}>
              {a.masthead.map((m, i) => (
                <span key={m} className={i === 1 ? "hidden md:inline" : ""}>{m}</span>
              ))}
            </div>
            <h1 className="ao-title">
              <span className="rise-mask">
                <span style={{ "--d": "250ms" } as CSSProperties}>{a.heroTitle}</span>
              </span>
            </h1>
            <p className="ao-sub fade-late" style={{ "--d": "700ms" } as CSSProperties}>{a.heroSub}</p>
            <div className="fade-late mt-10 flex flex-wrap gap-4" style={{ "--d": "850ms" } as CSSProperties}>
              <Button href={`/${locale}/contact`} variant="lin">{dict.cta.request}</Button>
              <a href={contactHref()} className="btn-label inline-block border border-ivory/40 px-8 py-4 text-ivory transition-colors duration-500 hover:border-ivory">
                {dict.cta.whatsapp}
              </a>
            </div>
            <div className="ao-proof fade-late" style={{ "--d": "1000ms" } as CSSProperties}>
              {a.proof.map((p) => (
                <div key={p.l}><b>{p.n}</b><span>{p.l}</span></div>
              ))}
            </div>
          </div>
          <Pass
            items={passItems}
            labels={{ admit: a.pass.admit, occasion: a.pass.occasion, date: a.pass.date, access: a.pass.access, sold: a.pass.sold, confirmed: a.pass.confirmed, hint: a.pass.hint, keep: a.pass.keep, another: a.pass.another }}
          />
        </div>
      </section>

      {/* ---- TICKER : the next occasions ---- */}
      <div className="ao-ticker" aria-label={a.programme.title}>
        <div className="ao-ticker-in">
          {[0, 1].map((n) => (
            <span key={n} aria-hidden={n === 1} className="ao-ticker-set">
              {rows.map((r) => (
                <span key={r.slug}><b>{r.name}</b> {r.when}<i>·</i></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ---- HOW IT WORKS : the pass story, pinned ---- */}
      <PassStory
        steps={h.steps}
        image={visuals.formulaOne.image}
        labels={{
          label: a.story.label, occasion: a.story.occasion, date: a.story.date, access: a.story.access,
          requested: a.story.requested, confirmedIn: a.story.confirmedIn, place: a.story.place,
          admitTwo: a.pass.admitTwo, occasionK: a.pass.occasion, dateK: a.pass.date, accessK: a.pass.access, confirmed: a.pass.confirmed,
        }}
      />

      {/* ---- II · THE PROGRAMME ---- */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="ao-sechead"><span className="label">II.</span><h2 className="ao-h2">{a.programme.title}</h2><span className="label hidden md:inline">{a.programme.season}</span></div>
          <Programme
            rows={rows}
            labels={{ all: a.programme.all, sport: a.programme.sport, culture: a.programme.culture, music: a.programme.music, inDays: a.ticker.inDays, onRequest: a.ticker.onRequest }}
          />
        </div>
      </section>

      {/* ---- III · PLATES : the doors, developing like prints ---- */}
      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="ao-sechead"><span className="label">III.</span><h2 className="ao-h2">{a.plates.title}</h2><span className="label hidden md:inline">{a.plates.count}</span></div>
          <div className="ao-plates">
            {plates.map((p, i) => (
              <Reveal key={p.href} delay={(i % 3) * 90} className={`ao-plate ${plateShape[i]}`}>
                <Link href={p.href} className="group block h-full">
                  <span className="ao-plate-img dk">
                    <Illustration visual={p.visual} locale={locale} sizes="(max-width: 768px) 50vw, 33vw" />
                  </span>
                  <span className="ao-cap">
                    <span>{a.plates.plate} {String(i + 1).padStart(2, "0")}</span>
                    <span>{p.title}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---- IV · THE HOUSE : the manifesto on a black band ---- */}
      <section className="dk bg-black py-28 md:py-40">
        <div className="wrap">
          <span className="label">IV.</span>
          <Reveal>
            <p className="ao-quote">{h.manifesto}</p>
          </Reveal>
          <div className="ao-sign">
            <span>{h.manifestoSignature}</span>
            <Link href={`/${locale}/qui-sommes-nous`} className="label text-ivory transition-opacity hover:opacity-60">{h.aboutLink} →</Link>
          </div>
        </div>
      </section>

      {/* ---- V · THE HOUSE ARRANGES ---- */}
      <section className="py-24 md:py-32">
        <div className="wrap">
          <div className="ao-sechead"><span className="label">V.</span><h2 className="ao-h2">{a.arranges}</h2>
            <Link href={`/${locale}/services`} className="label hidden text-ivory transition-opacity hover:opacity-60 md:inline">{dict.cta.allServices} →</Link>
          </div>
          <ul>
            {services.map((s, i) => (
              <RuledRow delay={i * 60} key={s.slug} href={`/${locale}/services/${s.slug}`} num={String(i + 1).padStart(2, "0")} title={s.title[locale]} />
            ))}
          </ul>
        </div>
      </section>

      {/* ---- VI · CORRESPONDENCE ---- */}
      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="ao-sechead"><span className="label">VI.</span><h2 className="ao-h2">{a.letters.title}</h2><span /></div>
          <Letters
            letters={testimonials.map((t) => ({ quote: t.quote[locale], name: t.name, context: t.context[locale] }))}
            labels={{ next: a.letters.next, letter: a.letters.letter, client: a.letters.client }}
          />
        </div>
      </section>

      {/* ---- VII · PRIVATE REQUEST ---- */}
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
