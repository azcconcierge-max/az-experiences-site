"use client";

import { useEffect, useState } from "react";

/** « In 42 days », counted on the visitor's day; falls back to the date label. */
export function DaysChip({ date, fallback, template }: { date?: string; fallback: string; template: string }) {
  const [label, setLabel] = useState(fallback);
  useEffect(() => {
    if (!date || date.length < 10) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const d = Math.round((new Date(date + "T00:00:00").getTime() - today.getTime()) / 864e5);
    if (d > 0) setLabel(template.replace("{n}", String(d)));
  }, [date, template]);
  return <span className="chip">{label}</span>;
}
