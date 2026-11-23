"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { curtainIn, curtainOut, destroy, init, preloader, release } from "./engine";

/**
 * Site-wide motion layer from the preview: first-visit preloader (the AZ mark draws,
 * a counter runs to 100), film grain, the graphite curtain between pages, and the
 * per-page engine (reveals, word rise, fills, filters, tabs, quotes, magnetic buttons).
 */
export function PvRuntime({ locale, admitLabel }: { locale: string; admitLabel: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  // preloader, once per visit
  useEffect(() => {
    preloader(release);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // per page: start the engine, then lift the curtain if it is down
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".pv-root");
    if (root) init(root, locale);
    else destroy();
    const c = curtain.current;
    if (c) curtainOut(c).finally(() => { busy.current = false; });
    return () => destroy();
  }, [pathname, locale]);

  // internal links: drop the curtain, then navigate
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page (hash or query only)
      const c = curtain.current;
      if (!c || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      curtainIn(c).then(() => router.push(url.pathname + url.search + url.hash));
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div className="pv pv-overlays" aria-hidden="true">
      <div ref={curtain} className="curtain">
        <svg viewBox="2 0 104 80">
          <g fill="none" stroke="currentColor" strokeWidth="2.4">
            <polyline points="7.2,76 30,8 52,72" />
            <polyline points="60,8 100,8 52,72 100,72" />
          </g>
        </svg>
      </div>
      <div className="grain" />
      <div className="pre" suppressHydrationWarning>
        <svg viewBox="2 0 104 80">
          <g fill="none" stroke="currentColor" strokeWidth="1.6">
            <polyline points="7.2,76 30,8 52,72" />
            <polyline points="60,8 100,8 52,72 100,72" />
          </g>
        </svg>
        <div className="pre-k">
          <span>{admitLabel}</span>
          <b data-pc="">000</b>
        </div>
      </div>
    </div>
  );
}
