"use client";

import { useEffect, useState } from "react";

/** Big countdown on an event's pass: hidden when the date is past or unknown. */
export function DaysCount({ date, label }: { date?: string; label: string }) {
  const [d, setD] = useState<number | null>(null);
  useEffect(() => {
    if (!date || date.length < 10) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const n = Math.round((new Date(date + "T00:00:00").getTime() - today.getTime()) / 864e5);
    if (n > 0) setD(n);
  }, [date]);
  if (d === null) return null;
  return (
    <div className="countdown">
      <span className="n">{d}</span>
      <span className="label">{label}</span>
    </div>
  );
}
