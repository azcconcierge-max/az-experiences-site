"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type ProgrammeRow = { slug: string; href: string; when: string; name: string; city: string; group: "sport" | "culture" | "music"; start?: string; image: string };
type Labels = { all: string; sport: string; culture: string; music: string; inDays: string; onRequest: string };

/** The season as a printed programme: filters, live countdowns, the image follows the cursor. */
export function Programme({ rows, labels }: { rows: ProgrammeRow[]; labels: Labels }) {
  const [filter, setFilter] = useState<"all" | ProgrammeRow["group"]>("all");
  const [today, setToday] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const float = useRef<HTMLDivElement>(null);
  useEffect(() => setToday(Date.now()), []);

  const days = (start?: string) => {
    if (!start || today === null) return null;
    const d = Math.round((new Date(start.length === 7 ? `${start}-01` : start).getTime() - today) / 864e5);
    return d > 0 && start.length === 10 ? d : null;
  };
  const sorted = useMemo(() => [...rows].sort((a, b) => (a.start ?? "9999").localeCompare(b.start ?? "9999")), [rows]);
  const shown = sorted.filter((r) => filter === "all" || r.group === filter);

  // image follows the cursor (fine pointers only)
  useEffect(() => {
    const el = float.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let x = 0, y = 0, fx = 0, fy = 0, raf = 0;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      fx += (x - fx) * 0.12; fy += (y - fy) * 0.12;
      el.style.transform = `translate(${fx - 130}px, ${fy - 162}px) rotate(${(x - fx) * 0.04}deg)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", move);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", move); };
  }, []);

  const tabs: { key: typeof filter; label: string }[] = [
    { key: "all", label: labels.all },
    { key: "sport", label: labels.sport },
    { key: "culture", label: labels.culture },
    { key: "music", label: labels.music },
  ];
  return (
    <div className="ao-prog-wrap">
      <div className="ao-filters" role="group">
        {tabs.map((t) => (
          <button key={t.key} type="button" aria-pressed={filter === t.key} className={filter === t.key ? "is-on" : ""} onClick={() => setFilter(t.key)}>
            {t.label}
          </button>
        ))}
      </div>
      <ul className="ao-prog" onPointerLeave={() => setHover(null)}>
        {shown.map((r, i) => {
          const d = days(r.start);
          return (
            <li key={r.slug}>
              <Link href={r.href} className="ao-row" onPointerEnter={() => setHover(rows.indexOf(r))}>
                <span className="ao-row-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="ao-row-d">{r.when}</span>
                <span className="ao-row-t">{r.name}</span>
                <span className="ao-row-c">{r.city}</span>
                <span className="ao-row-s">{d ? labels.inDays.replace("{n}", String(d)) : labels.onRequest}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div ref={float} className={`ao-float ${hover !== null ? "is-on" : ""}`} aria-hidden="true">
        {rows.map((r, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={r.slug} src={r.image} alt="" className={hover === i ? "is-on" : ""} loading="lazy" />
        ))}
      </div>
    </div>
  );
}
