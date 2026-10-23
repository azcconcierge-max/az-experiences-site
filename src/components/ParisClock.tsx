"use client";

import { useEffect, useState } from "react";

/** Heure de Paris en direct, en label (« PARIS, 14:32 »). */
export function ParisClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Europe/Paris",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 20000);
    return () => clearInterval(t);
  }, []);

  if (!time) return null;
  return <span>Paris, {time.replace("h", ":")}</span>;
}
