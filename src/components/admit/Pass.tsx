"use client";

import { useEffect, useRef, useState } from "react";
import { Monogram } from "../Logo";

export type PassItem = { title: string; sub: string; date: string; access: string };
type Labels = { admit: string; occasion: string; date: string; access: string; sold: string; confirmed: string; hint: string; keep: string; another: string };

/** Barcode bars: fixed pattern, purely decorative. */
export function Barcode() {
  const w = [1, 2, 1, 3, 1, 2, 2, 1, 3];
  return (
    <span className="ao-bar" aria-hidden="true">
      {Array.from({ length: 34 }, (_, i) => (
        <i key={i} style={{ width: w[i % 9] }} />
      ))}
    </span>
  );
}

/**
 * The hero pass. Tilts with the cursor, shows another occasion on tap,
 * stamps « Confirmed » over « Sold out », and its stub tears as the page scrolls.
 */
export function Pass({ items, labels }: { items: PassItem[]; labels: Labels }) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const stub = useRef<HTMLDivElement>(null);
  const sheen = useRef<HTMLElement>(null);
  const [k, setK] = useState(0);
  const [stamped, setStamped] = useState(false);

  // stamp after each change
  useEffect(() => {
    setStamped(false);
    const t = window.setTimeout(() => setStamped(true), k === 0 ? 1400 : 450);
    return () => window.clearTimeout(t);
  }, [k]);

  const next = () => {
    const el = card.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || !el.animate) {
      setK((v) => (v + 1) % items.length);
      return;
    }
    el.animate([{ transform: "rotateY(0)" }, { transform: "rotateY(90deg)" }], { duration: 260, easing: "ease-in" }).finished.then(() => {
      setK((v) => (v + 1) % items.length);
      el.animate([{ transform: "rotateY(-90deg)" }, { transform: "rotateY(0)" }], { duration: 420, easing: "cubic-bezier(.22,1,.36,1)" });
    });
  };

  // auto-advance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(next, 7000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tilt + tear
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const w = wrap.current;
    if (!w) return;
    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;
    const move = (e: PointerEvent) => {
      const r = w.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - 0.5) * -14;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 18;
    };
    const leave = () => { tx = 0; ty = 0; };
    const loop = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      w.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      if (sheen.current) sheen.current.style.transform = `translate(${ry * 6}%, ${rx * 4}%)`;
      const r = w.getBoundingClientRect();
      const tear = Math.min(1, Math.max(0, (-r.top + 80) / (r.height * 0.8)));
      if (stub.current) {
        stub.current.style.transform = `translate(${tear * 40}px, ${tear * 160}px) rotate(${tear * 18}deg)`;
        stub.current.style.opacity = String(1 - Math.min(1, Math.max(0, (tear - 0.6) / 0.4)));
      }
      raf = requestAnimationFrame(loop);
    };
    w.addEventListener("pointermove", move);
    w.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); w.removeEventListener("pointermove", move); w.removeEventListener("pointerleave", leave); };
  }, []);

  const p = items[k];
  return (
    <div ref={wrap} className="ao-pass-wrap">
      <div
        ref={card}
        className={`ao-pass dk ${stamped ? "is-stamped" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={labels.another}
        onClick={next}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); next(); } }}
      >
        <div className="ao-pass-main">
          <span className="ao-emboss" aria-hidden="true"><Monogram width={240} /></span>
          <div className="ao-pass-top">
            <Monogram width={46} />
            <span>{labels.admit}</span>
          </div>
          <div className="ao-pass-body" aria-live="polite">
            <span className="ao-k">{labels.occasion}</span>
            <p className="ao-pass-title">{p.title}</p>
            <p className="ao-pass-sub">{p.sub}</p>
            <div className="ao-pass-grid">
              <div><span className="ao-k">{labels.date}</span><b>{p.date}</b></div>
              <div><span className="ao-k">{labels.access}</span><b>{p.access}</b></div>
            </div>
          </div>
          <div className="ao-pass-status">
            <span className="ao-sold">{labels.sold}</span>
            <span className="ao-stamp">{labels.confirmed}</span>
          </div>
          <i ref={sheen} className="ao-sheen" aria-hidden="true" />
        </div>
        <div ref={stub} className="ao-stub">
          <div><span className="ao-k">Nº</span><b>000 {String(k * 137 + 1).padStart(3, "0")}</b></div>
          <Barcode />
        </div>
      </div>
      <p className="label ao-hint">{labels.hint}</p>
    </div>
  );
}
