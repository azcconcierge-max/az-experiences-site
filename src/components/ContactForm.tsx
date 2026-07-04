"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import type { Dict } from "@/i18n";

const inputClass =
  "w-full border border-ivory/15 bg-noir-card px-4 py-3.5 text-sm text-ivory placeholder:text-ivory-dim/60 outline-none transition-colors duration-300 focus:border-gold";

export function ContactForm({ dict, email }: { dict: Dict; email: string }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });
  const f = dict.contact.form;

  if (state.status === "success") {
    return (
      <div className="border border-gold/40 bg-noir-card p-10 text-center">
        <p className="display mb-2 text-2xl text-gold">✓</p>
        <p className="text-ivory">{f.success}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Piège anti-spam, invisible pour les humains */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{f.name}</span>
          <input name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{f.email}</span>
          <input name="email" type="email" required autoComplete="email" className={inputClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{f.phone}</span>
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{f.type}</span>
          <select name="type" className={inputClass} defaultValue={f.types[0]}>
            {f.types.map((t) => (
              <option key={t} value={t} className="bg-noir-card">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className="eyebrow">{f.message}</span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder={f.messagePlaceholder}
          className={inputClass}
        />
      </label>

      {state.status === "error" && (
        <p className="text-sm text-gold">
          {f.error}{" "}
          <a href={`mailto:${email}`} className="underline underline-offset-4">
            {email}
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 cursor-pointer self-start border border-gold bg-gold px-10 py-4 text-[0.7rem] tracking-[0.3em] text-noir uppercase transition-all duration-500 hover:bg-transparent hover:text-gold disabled:opacity-50"
      >
        {pending ? f.sending : f.submit}
      </button>
    </form>
  );
}
