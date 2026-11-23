import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Dict, Locale } from "@/i18n";
import type { Visual } from "@/lib/univers";
import { site } from "@/lib/site";
import { DaysChip } from "./DaysChip";

/* Building blocks of the preview, as React. Pages render inside <PvPage>. */

export function PvPage({ children }: { children: ReactNode }) {
  return (
    <div className="pv">
      <div className="pv-root">{children}</div>
    </div>
  );
}

const Arr = () => <span className="arr" aria-hidden="true">→</span>;

export function Media({ visual, locale, sizes = "100vw", priority }: { visual: Visual; locale: Locale; sizes?: string; priority?: boolean }) {
  return <Image src={visual.image} alt={visual.alt?.[locale] ?? ""} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />;
}

export function Label({ children, dark }: { children: ReactNode; dark?: boolean }) {
  return <div className={`label${dark ? " dark" : ""}`} data-rv="">{children}</div>;
}

export function Crumbs({ locale, dict, items }: { locale: Locale; dict: Dict; items: [string, string?][] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <Link href={`/${locale}`}>{dict.pv.home}</Link>
      {items.map(([t, h]) => (
        <span key={t} style={{ color: "inherit" }}>
          {" / "}
          {h ? <Link href={h}>{t}</Link> : <span>{t}</span>}
        </span>
      ))}
    </nav>
  );
}

export const requestHref = (locale: Locale, ctx?: string) =>
  `/${locale}/contact${ctx ? `?occasion=${encodeURIComponent(ctx)}` : ""}`;
export const waHref = (locale: Locale, ctx?: string) => {
  const hello: Record<Locale, [string, string]> = {
    fr: ["Bonjour, j'aimerais faire une demande", "Bonjour, j'aimerais faire une demande : "],
    en: ["Hello, I'd like to make a request", "Hello, I'd like to make a request: "],
    es: ["Hola, me gustaría hacer una solicitud", "Hola, me gustaría hacer una solicitud: "],
    pt: ["Olá, gostaria de fazer um pedido", "Olá, gostaria de fazer um pedido: "],
  };
  const text = ctx ? `${hello[locale][1]}${ctx}.` : `${hello[locale][0]}.`;
  return site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : `mailto:${site.email}`;
};

export function ReqBtn({ locale, ctx, children, cls = "btn btn-solid mag" }: { locale: Locale; ctx?: string; children: ReactNode; cls?: string }) {
  return (
    <Link href={requestHref(locale, ctx)} className={cls}>
      {children} <Arr />
    </Link>
  );
}
export function WaBtn({ locale, ctx, cls = "btn btn-ghost mag" }: { locale: Locale; ctx?: string; cls?: string }) {
  return (
    <a href={waHref(locale, ctx)} className={cls} target="_blank" rel="noopener noreferrer">
      WhatsApp
    </a>
  );
}

export function PageHero({
  locale, dict, k, title, sub, visual, crumbs, ctx,
}: { locale: Locale; dict: Dict; k?: string; title: string; sub?: string; visual: Visual; crumbs: [string, string?][]; ctx?: string }) {
  return (
    <section className="phero">
      <div className="phero-media" data-hero="">
        <Media visual={visual} locale={locale} priority />
      </div>
      <div className="wrap phero-content">
        <Crumbs locale={locale} dict={dict} items={crumbs} />
        {k && <div className="label hero-in">{k}</div>}
        <h1 className="phero-title split">{title}</h1>
        {sub && <p className="phero-sub hero-in">{sub}</p>}
        {ctx !== undefined && (
          <div className="hero-ctas hero-in">
            <ReqBtn locale={locale} ctx={ctx}>{dict.cta.requestAccess}</ReqBtn>
            <WaBtn locale={locale} ctx={ctx} />
          </div>
        )}
      </div>
    </section>
  );
}

export function TextHero({ locale, dict, k, title, sub, crumbs }: { locale: Locale; dict: Dict; k: string; title: string; sub?: string; crumbs?: [string, string?][] }) {
  return (
    <section className="thero">
      <div className="wrap">
        {crumbs && <Crumbs locale={locale} dict={dict} items={crumbs} />}
        <div className="label hero-in">{k}</div>
        <h1 className="thero-title split">{title}</h1>
        {sub && <p className="phero-sub hero-in">{sub}</p>}
      </div>
    </section>
  );
}

export type CardEvent = { slug: string; name: string; when: string; city: string; tag: string; date?: string; cat: string; visual: Visual };

export function EventCard({ e, locale, dict }: { e: CardEvent; locale: Locale; dict: Dict }) {
  return (
    <article className="card" data-cat={e.cat}>
      <Link href={`/${locale}/evenements/${e.slug}`} className="card-link" aria-label={e.name} />
      <div className="media">
        <Media visual={e.visual} locale={locale} sizes="(max-width: 900px) 100vw, 33vw" />
        <DaysChip date={e.date} fallback={e.when} template={dict.pv.inDays} />
      </div>
      <div className="meta">
        <div className="label">{e.when} · {e.city}</div>
        <h3>{e.name}</h3>
        <div className="where">{e.tag}</div>
        <Link href={requestHref(locale, `${e.name}, ${e.when}`)} className="link">{dict.cta.requestAccess} →</Link>
      </div>
    </article>
  );
}

export function DestCard({ slug, name, k, tag, visual, locale }: { slug: string; name: string; k: string; tag: string; visual: Visual; locale: Locale }) {
  return (
    <Link href={`/${locale}/destinations/${slug}`} className="dcard" data-rv="">
      <div className="pimg" data-par="">
        <Media visual={visual} locale={locale} sizes="(max-width: 900px) 76vw, 33vw" />
      </div>
      <div className="txt">
        <div className="label">{k}</div>
        <h3>{name}</h3>
        <p>{tag}</p>
      </div>
    </Link>
  );
}

export function FaqBlock({ items, title, label }: { items: { q: string; a: string }[]; title: string; label: string }) {
  return (
    <section className="faq sec">
      <div className="wrap faq-grid">
        <div>
          <Label>{label}</Label>
          <h2 className="h2 split">{title}</h2>
        </div>
        <div data-rv="">
          {items.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span className="pl" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ locale, dict, title, ctx }: { locale: Locale; dict: Dict; title?: string; ctx?: string }) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2 className="cta-title split">{title ?? dict.pv.ctaWhere}</h2>
        <div className="cta-row" data-rv="">
          <ReqBtn locale={locale} ctx={ctx}>{dict.cta.request}</ReqBtn>
          <WaBtn locale={locale} ctx={ctx} />
          <span className="cta-note">{dict.pv.ctaNote}</span>
        </div>
      </div>
    </section>
  );
}

export function QuoteBlock({ quotes, label }: { quotes: { text: string; name: string; context: string }[]; label: string }) {
  return (
    <section className="quotes sec">
      <div className="wrap">
        <Label>{label}</Label>
        <div className="quotes-stage" data-quotes="">
          {quotes.map((q, k) => (
            <figure key={q.name + k} className={`quote${k ? "" : " on"}`}>
              <p>“{q.text}”</p>
              <small className="label">{q.name} · {q.context}</small>
            </figure>
          ))}
        </div>
        {quotes.length > 1 && (
          <div className="qnav">
            {quotes.map((_, k) => (
              <button key={k} type="button" aria-label={`${k + 1}`}><i /></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
