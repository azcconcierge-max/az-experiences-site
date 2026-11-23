"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { sendContact } from "@/app/actions/contact";
import type { Dict } from "@/i18n";
import { Monogram } from "../Logo";
import { Barcode } from "../admit/Pass";
import { pop } from "./engine";

/**
 * The private request, from the preview: three short steps, context carried over
 * from the page the visitor came from (?occasion=), and a live pass beside the form
 * that fills in as they write and is stamped once the house has it.
 * If automatic sending is unavailable, the same request goes out by WhatsApp or email
 * in one tap, already written.
 */
export function RequestForm({
  dict, email, whatsapp, side,
}: { dict: Dict; email: string; whatsapp?: string | null; side: React.ReactNode }) {
  const r = dict.pv.req;
  const types = dict.contact.form.types;
  const [step, setStep] = useState(0);
  const [result, setResult] = useState<"idle" | "sent" | "fallback">("idle");
  const [pending, start] = useTransition();
  const [err, setErr] = useState(false);
  const [v, setV] = useState({ type: types[0], what: "", dates: "", guests: 2, msg: "", name: "", email: "", phone: "", via: r.channels[0] });
  const stepRef = useRef<HTMLDivElement>(null);

  // context from the page the visitor came from
  useEffect(() => {
    const o = new URLSearchParams(window.location.search).get("occasion");
    if (o) setV((x) => ({ ...x, what: x.what || o }));
  }, []);

  useEffect(() => {
    if (stepRef.current) pop(stepRef.current, { x: 30, y: 0, d: 650 });
  }, [step, result]);

  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setV((x) => ({ ...x, [k]: k === "guests" ? Math.max(1, +e.target.value || 1) : e.target.value }));

  const summary = useMemo(
    () => [
      `${r.wish}: ${v.what || "—"}`,
      `${dict.contact.form.type}: ${v.type}`,
      `${r.dates}: ${v.dates || r.datesEmpty}`,
      `${r.guests}: ${v.guests}`,
      v.msg ? `${r.matters}: ${v.msg}` : null,
      "",
      `${dict.contact.form.name}: ${v.name}`,
      `${dict.contact.form.email}: ${v.email}`,
      v.phone ? `${dict.contact.form.phone}: ${v.phone}` : null,
      `${r.via}: ${v.via}`,
    ].filter((x) => x !== null).join("\n"),
    [v, r, dict],
  );

  const validContact = v.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim());

  const send = () => {
    if (!validContact) { setErr(true); return; }
    setErr(false);
    const fd = new FormData();
    fd.set("name", v.name); fd.set("email", v.email); fd.set("phone", v.phone); fd.set("type", v.type);
    fd.set("message", summary);
    start(async () => {
      const res = await sendContact({ status: "idle" }, fd).catch(() => ({ status: "error" as const }));
      setResult(res.status === "success" ? "sent" : "fallback");
      setStep(3);
    });
  };

  const next = () => (step < 2 ? setStep(step + 1) : send());
  const admit = v.guests <= 6 ? r.admitN[v.guests - 1] : r.admitMany.replace("{n}", String(v.guests));
  const shown = Math.min(step, 2);
  const label = result === "sent" ? r.sent : `${r.step.replace("{n}", String(shown + 1))} · ${r.names[shown]}`;
  const fill = result === "sent" ? 100 : ((shown + 1) / 3) * 100;
  const wa = whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(summary)}` : null;
  const mail = `mailto:${email}?subject=${encodeURIComponent(`${v.type}, ${v.name}`)}&body=${encodeURIComponent(summary)}`;

  return (
    <div className="wrap req-wrap">
      <div className="req-side">
        {side}
        <div className="req-pass hero-in">
          <div className={`ao-pass dk ${result === "sent" ? "is-stamped" : ""}`}>
            <div className="ao-pass-main">
              <span className="ao-emboss" aria-hidden="true"><Monogram width={240} /></span>
              <div className="ao-pass-top"><Monogram width={46} /><span>{admit}</span></div>
              <div className="ao-pass-body" aria-live="polite">
                <span className="ao-k">{r.typeK}</span>
                <p className="ao-pass-title">{v.what || r.occasionEmpty}</p>
                <p className="ao-pass-sub">{v.type}</p>
                <div className="ao-pass-grid">
                  <div><span className="ao-k">{r.dateK}</span><b>{v.dates || r.datesEmpty}</b></div>
                  <div><span className="ao-k">{r.nameK}</span><b>{v.name || "—"}</b></div>
                </div>
              </div>
              <div className="ao-pass-status">
                <span className="ao-sold">{dict.contact.live.pending}</span>
                <span className="ao-stamp">{dict.contact.live.received}</span>
              </div>
            </div>
            <div className="ao-stub">
              <div><span className="ao-k">Nº</span><b>000 {String((v.what.length * 37 + v.name.length * 11) % 1000).padStart(3, "0")}</b></div>
              <Barcode />
            </div>
          </div>
          <p className="label" style={{ marginTop: 18 }}>{result === "sent" ? r.passDone : r.passCap}</p>
        </div>
      </div>

      <div className="stepper hero-in">
        <div className="stepper-head">
          <span>{label}</span>
          <div className="stepper-bar"><i style={{ width: `${fill}%` }} /></div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); next(); }} noValidate>
          {step === 0 && (
            <div className="fstep on" ref={stepRef}>
              <fieldset>
                <legend className="label">{r.what}</legend>
                <div className="opts">
                  {types.map((o) => (
                    <label key={o} className="opt">
                      <input type="radio" name="type" value={o} checked={v.type === o} onChange={() => setV((x) => ({ ...x, type: o }))} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="f">
                <label htmlFor="fv">{r.wish}</label>
                <input id="fv" value={v.what} onChange={set("what")} placeholder={r.wishPh} />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="fstep on" ref={stepRef}>
              <div className="frow">
                <div className="f"><label htmlFor="fd">{r.dates}</label><input id="fd" value={v.dates} onChange={set("dates")} placeholder={r.datesPh} /></div>
                <div className="f"><label htmlFor="fg">{r.guests}</label><input id="fg" type="number" min={1} value={v.guests} onChange={set("guests")} /></div>
              </div>
              <div className="f"><label htmlFor="fm">{r.matters}</label><textarea id="fm" value={v.msg} onChange={set("msg")} placeholder={r.mattersPh} /></div>
            </div>
          )}
          {step === 2 && (
            <div className="fstep on" ref={stepRef}>
              <div className="frow">
                <div className="f"><label htmlFor="fn">{dict.contact.form.name}</label><input id="fn" autoComplete="name" value={v.name} onChange={set("name")} className={err && v.name.trim().length < 2 ? "err" : ""} /></div>
                <div className="f"><label htmlFor="fe">{dict.contact.form.email}</label><input id="fe" type="email" autoComplete="email" value={v.email} onChange={set("email")} className={err && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()) ? "err" : ""} /></div>
              </div>
              <div className="f"><label htmlFor="fp">{dict.contact.form.phone}</label><input id="fp" type="tel" autoComplete="tel" value={v.phone} onChange={set("phone")} /></div>
              <fieldset>
                <legend className="label">{r.via}</legend>
                <div className="opts small">
                  {r.channels.map((o) => (
                    <label key={o} className="opt">
                      <input type="radio" name="via" value={o} checked={v.via === o} onChange={() => setV((x) => ({ ...x, via: o }))} />
                      <span>{o}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              {err && <p className="ferr">{r.required}</p>}
              <p className="privacy">{r.privacy}</p>
            </div>
          )}
          {step === 3 && result === "sent" && (
            <div className="fstep done on" ref={stepRef}>
              <svg className="done-mark" viewBox="2 0 104 80" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7.2,76 30,8 52,72" /><polyline points="60,8 100,8 52,72 100,72" /></g></svg>
              <h2>{r.doneTitle}</h2>
              <ol className="next-steps">
                <li><b>{r.next1b}</b> {r.next1}</li>
                <li><b>{r.next2b}</b> {r.next2}</li>
                <li><b>{r.next3b}</b> {r.next3}</li>
              </ol>
            </div>
          )}
          {step === 3 && result === "fallback" && (
            <div className="fstep done on fallback" ref={stepRef}>
              <h2>{r.failTitle}</h2>
              <p>{r.failText}</p>
              <div className="row">
                {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-solid">WhatsApp <span className="arr" aria-hidden="true">→</span></a>}
                <a href={mail} className="btn btn-ghost">{email}</a>
              </div>
            </div>
          )}
          {step < 3 && (
            <div className="fnav">
              {step > 0 && <button type="button" className="link" onClick={() => setStep(step - 1)}>← {r.back}</button>}
              <button type="submit" className="btn btn-solid mag" disabled={pending} style={{ marginLeft: "auto" }}>
                {pending ? r.sending : step === 2 ? r.send : r.cont} <span className="arr" aria-hidden="true">→</span>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
