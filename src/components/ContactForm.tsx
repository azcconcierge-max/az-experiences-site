"use client";

import { useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import type { Dict } from "@/i18n";
import { Monogram } from "./Logo";
import { Barcode } from "./admit/Pass";

const inputClass =
  "ao-field w-full rounded-none border-0 border-b border-ivory/25 bg-transparent px-0 py-3 text-base text-ivory placeholder:text-stone/60 outline-none transition-colors duration-300 focus:border-ivory";

/**
 * The private request, as a live pass: every field the visitor fills
 * is written onto the black pass beside the form, and the pass is stamped
 * « Received » once the request is sent.
 */
export function ContactForm({ dict, email, aside }: { dict: Dict; email: string; aside?: ReactNode }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });
  const f = dict.contact.form;
  const l = dict.contact.live;
  const admit = dict.admit.pass;

  const [name, setName] = useState("");
  const [type, setType] = useState(f.types[0]);
  const [message, setMessage] = useState("");
  const [bump, setBump] = useState(0);
  const passRef = useRef<HTMLDivElement>(null);
  const done = state.status === "success";

  // small "ink" pulse on the pass whenever a field changes
  useEffect(() => {
    if (!bump) return;
    const el = passRef.current;
    if (!el || !el.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.animate(
      [{ transform: "translateY(0) rotate(0)" }, { transform: "translateY(-3px) rotate(-0.4deg)" }, { transform: "none" }],
      { duration: 380, easing: "cubic-bezier(.22,1,.36,1)" },
    );
  }, [bump]);

  // arriving from an event page: ?occasion=Monaco Grand Prix
  const msgRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const o = new URLSearchParams(window.location.search).get("occasion");
    if (o && msgRef.current && !msgRef.current.value) {
      msgRef.current.value = `${o}. `;
      setMessage(`${o}. `);
    }
  }, []);

  // first line of the message, trimmed, is the occasion
  const occasion = message.split(/\n|[.!?]/)[0].trim().slice(0, 48);
  const no = String((name.length * 37 + message.length * 11) % 1000).padStart(3, "0");

  return (
    <div className="ao-contact grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
      <div>
        {done ? (
          <div className="ao-sent border-t border-graphite pt-10">
            <p className="label mb-4">{l.received}</p>
            <p className="t-h2 text-ivory">{f.success}</p>
          </div>
        ) : (
          <form action={action} className="flex flex-col gap-8">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <fieldset className="flex flex-col gap-2">
              <legend className="eyebrow mb-3">{f.type}</legend>
              <div className="flex flex-wrap gap-2">
                {f.types.map((t) => (
                  <label key={t} className="ao-chip">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={type === t}
                      onChange={() => { setType(t); setBump((b) => b + 1); }}
                    />
                    <span>{t}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid gap-8 md:grid-cols-2">
              <label className="flex flex-col gap-2">
                <span className="eyebrow">{f.name}</span>
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className={inputClass}
                  onChange={(e) => { setName(e.target.value); setBump((b) => b + 1); }}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="eyebrow">{f.email}</span>
                <input name="email" type="email" required autoComplete="email" className={inputClass} />
              </label>
            </div>

            <label className="flex flex-col gap-2 md:max-w-[50%]">
              <span className="eyebrow">{f.phone}</span>
              <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
            </label>

            <label className="flex flex-col gap-2">
              <span className="eyebrow">{f.message}</span>
              <textarea
                ref={msgRef}
                name="message"
                required
                rows={5}
                placeholder={f.messagePlaceholder}
                className={inputClass}
                onChange={(e) => { setMessage(e.target.value); setBump((b) => b + 1); }}
              />
            </label>

            {state.status === "error" && (
              <p className="text-sm text-stone">
                {f.error}{" "}
                <a href={`mailto:${email}`} className="underline underline-offset-4">
                  {email}
                </a>
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-2 cursor-pointer self-start btn-label border border-ivory bg-ivory px-10 py-4 text-black transition-colors duration-500 hover:bg-transparent hover:text-ivory disabled:opacity-50"
            >
              {pending ? f.sending : f.submit}
            </button>
          </form>
        )}
      </div>

      {/* the live pass */}
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="label mb-6">{l.eyebrow}</p>
        <div ref={passRef} className={`ao-pass ao-live dk ${done ? "is-stamped" : ""}`} style={{ cursor: "default" }}>
          <div className="ao-pass-main">
            <span className="ao-emboss" aria-hidden="true"><Monogram width={240} /></span>
            <div className="ao-pass-top">
              <Monogram width={46} />
              <span>{admit.admit}</span>
            </div>
            <div className="ao-pass-body" aria-live="polite">
              <span className="ao-k">{l.occasion}</span>
              <p className={`ao-pass-title ${occasion ? "" : "is-empty"}`}>{occasion || l.occasionEmpty}</p>
              <p className="ao-pass-sub">{type}</p>
              <div className="ao-pass-grid">
                <div><span className="ao-k">{l.guest}</span><b className={name ? "" : "is-empty"}>{name.trim() || l.guestEmpty}</b></div>
                <div><span className="ao-k">{l.reply}</span><b>{l.replyValue}</b></div>
              </div>
            </div>
            <div className="ao-pass-status">
              <span className="ao-sold">{l.pending}</span>
              <span className="ao-stamp">{l.received}</span>
            </div>
          </div>
          <div className="ao-stub">
            <div><span className="ao-k">Nº</span><b>000 {no}</b></div>
            <Barcode />
          </div>
        </div>
        <p className="caption mt-5">{l.hint}</p>
        <ol className="ao-csteps mt-10">
          {[l.step1, l.step2, l.step3].map((s, i) => (
            <li key={i}><span>0{i + 1}</span>{s}</li>
          ))}
        </ol>
        {aside}
      </div>
    </div>
  );
}
