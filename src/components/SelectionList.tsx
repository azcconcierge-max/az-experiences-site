"use client";

import { useEffect, useState } from "react";
import { whatsappHref } from "@/lib/site";
import type { Locale } from "@/i18n";

const DISPO_URL = "https://9tias9iooamfkhju.public.blob.vercel-storage.com/selection/dispo.json";

type DispoEvent = { title: string; date: string | null; venue: string | null };
type Dispo = { updatedAt: string; events: DispoEvent[] };

const LOCALE_TAG: Record<string, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES", pt: "pt-PT" };

/**
 * La sélection du moment : la liste vivante publiée depuis le CRM.
 * Le contenu est lu à chaque visite, la page n'a jamais besoin d'être redéployée.
 */
export function SelectionList({
  locale,
  labels,
}: {
  locale: Locale;
  labels: { empty: string; updated: string; request: string };
}) {
  const [dispo, setDispo] = useState<Dispo | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    fetch(DISPO_URL, { cache: "no-store" })
      .then((r) => r.json())
      .then(setDispo)
      .catch(() => setFailed(true));
  }, []);

  const tag = LOCALE_TAG[locale] ?? "fr-FR";
  const fmtDay = (iso: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString(tag, { day: "numeric", month: "long", year: "numeric" })
      : null;

  if (failed || (dispo && dispo.events.length === 0)) {
    return <p className="max-w-xl text-base leading-[1.7] font-light text-ink-dim">{labels.empty}</p>;
  }
  if (!dispo) {
    return (
      <div aria-hidden="true" className="flex flex-col gap-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-[2px] bg-club/5" />
        ))}
      </div>
    );
  }

  return (
    <div>
      <ul>
        {dispo.events.map((e, i) => (
          <li key={i} className="border-b border-club/12 first:border-t">
            <a
              href={
                whatsappHref(`Bonjour, je souhaite des informations sur ${e.title}.`) ??
                "/fr/contact"
              }
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="voir"
              className="group flex flex-wrap items-baseline gap-x-8 gap-y-1 py-7 md:py-8"
            >
              <span className="display w-10 shrink-0 text-sm text-club/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="display block text-2xl leading-[1.1] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                  {e.title}
                </span>
                <span className="eyebrow mt-2 block normal-case">
                  {[fmtDay(e.date), e.venue].filter(Boolean).join(" · ")}
                </span>
              </span>
              <span className="hidden text-[0.78rem] font-normal lowercase tracking-[0.12em] text-laiton-fonce opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                {labels.request} →
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="eyebrow mt-10">
        {labels.updated}{" "}
        {new Date(dispo.updatedAt).toLocaleDateString(tag, { day: "numeric", month: "long" })}
      </p>
    </div>
  );
}
