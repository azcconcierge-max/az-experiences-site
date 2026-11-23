"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Monogram } from "../Logo";
import { Barcode } from "./Pass";

type Step = { num: string; title: string; text: string };
type Labels = { label: string; occasion: string; date: string; access: string; requested: string; confirmedIn: string; place: string; admitTwo: string; occasionK: string; dateK: string; accessK: string; confirmed: string };

/**
 * « How it works », pinned: the occasion types itself onto the pass, the stamp
 * lands, then the stub tears and the place opens up behind it.
 */
export function PassStory({ steps, labels, image }: { steps: Step[]; labels: Labels; image: string }) {
  const sec = useRef<HTMLElement>(null);
  const bar = useRef<HTMLElement>(null);
  const pass = useRef<HTMLDivElement>(null);
  const stub = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState({ typed: false, stamped: false, timed: false });

  useEffect(() => {
    const s = sec.current;
    if (!s) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setTyped(labels.occasion); setPhase({ typed: true, stamped: true, timed: true }); return; }
    const word = labels.occasion;
    let raf = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const loop = () => {
      const b = s.getBoundingClientRect();
      const p = clamp(-b.top / Math.max(1, b.height - window.innerHeight));
      if (bar.current) bar.current.style.width = `${p * 100}%`;
      setStep(p < 0.34 ? 0 : p < 0.67 ? 1 : 2);
      setTyped(word.slice(0, Math.round(clamp(p / 0.26) * word.length)));
      setPhase((old) => {
        const n = { typed: p > 0.27, stamped: p > 0.45, timed: p > 0.55 };
        return n.typed === old.typed && n.stamped === old.stamped && n.timed === old.timed ? old : n;
      });
      const t = clamp((p - 0.7) / 0.22);
      if (stub.current) {
        stub.current.style.transform = `translate(${t * 60}px, ${t * 220}px) rotate(${t * 24}deg)`;
        stub.current.style.opacity = String(1 - clamp((t - 0.5) / 0.5));
      }
      if (pass.current) pass.current.style.transform = `translate(${-t * 22}%, ${-t * 4}%) rotate(${-t * 6}deg) scale(${1 - t * 0.12})`;
      if (plate.current) {
        const i = (1 - t) * 50;
        plate.current.style.clipPath = `inset(${i}% ${i}% ${i}% ${i}%)`;
        plate.current.style.opacity = t > 0 ? "1" : "0";
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [labels.occasion]);

  const cls = `ao-story ${phase.typed ? "is-typed" : ""} ${phase.stamped ? "is-stamped" : ""} ${phase.timed ? "is-timed" : ""}`;
  return (
    <section ref={sec} className={cls} aria-label={labels.label}>
      <div className="ao-story-sticky">
        <div>
          <div className="ao-sechead ao-sechead-short"><span className="label">I.</span><span className="label">{labels.label}</span></div>
          <ol className="ao-steps">
            {steps.map((s, i) => (
              <li key={s.num} className={i === step ? "is-on" : ""}>
                <span className="ao-step-n">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="ao-story-bar"><i ref={bar} /></div>
        </div>
        <div className="ao-story-stage dk">
          <div ref={plate} className="ao-story-plate">
            <Image src={image} alt="" fill sizes="(max-width: 900px) 100vw, 50vw" className="object-cover" />
            <span className="label">{labels.place}</span>
          </div>
          <div ref={pass} className="ao-story-pass">
            <div className="ao-pass-main">
              <div className="ao-pass-top"><Monogram width={46} /><span>{labels.admitTwo}</span></div>
              <div className="ao-pass-body">
                <span className="ao-k">{labels.occasionK}</span>
                <p className="ao-pass-title ao-typing">{typed || " "}</p>
                <div className="ao-pass-grid ao-story-meta">
                  <div><span className="ao-k">{labels.dateK}</span><b>{labels.date}</b></div>
                  <div><span className="ao-k">{labels.accessK}</span><b>{labels.access}</b></div>
                </div>
              </div>
              <div className="ao-pass-status">
                <span className="ao-req">{labels.requested}</span>
                <span className="ao-stamp">{labels.confirmed}</span>
                <span className="ao-time">{labels.confirmedIn}</span>
              </div>
            </div>
            <div ref={stub} className="ao-stub">
              <div><span className="ao-k">Nº</span><b>000 412</b></div>
              <Barcode />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
