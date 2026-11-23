/* PV engine: the preview's motion and page behaviour, ported as-is.
   Reveals (IntersectionObserver + CSS transitions), scroll-linked effects in one rAF loop,
   filters, tabs, testimonials, cursor image on the services list, magnetic buttons.
   Everything is skipped when the visitor prefers reduced motion. */

const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T & Element>(s)] as unknown as T[];
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const EASE = "cubic-bezier(.22,1,.36,1)";
const INOUT = "cubic-bezier(.77,0,.18,1)";

export const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const desk = () => window.innerWidth > 900;
const vh = () => window.innerHeight;

type Rect = { top: number; height: number };
const P: Record<string, (r: Rect) => number> = {
  enter: (r) => clamp((vh() - r.top) / (vh() + r.height)),
  leave: (r) => clamp(-r.top / r.height),
  pin: (r) => clamp(-r.top / Math.max(1, r.height - vh())),
  read: (r) => clamp((vh() * 0.8 - r.top) / (r.height + vh() * 0.3)),
};
type Scrub = { el: Element; type: string; fn: (p: number) => void; smooth: boolean; deskOnly: boolean };

let io: IntersectionObserver | null = null;
let scrubs: Scrub[] = [];
let raf = 0;
let sy = 0;
let disposers: (() => void)[] = [];
let playRoot: HTMLElement | null = null;

function scrub(el: Element, type: string, fn: (p: number) => void, opts: { smooth?: boolean; deskOnly?: boolean } = {}) {
  scrubs.push({ el, type, fn, smooth: opts.smooth !== false, deskOnly: !!opts.deskOnly });
}

function loop() {
  const target = window.scrollY;
  sy += (target - sy) * 0.13;
  if (Math.abs(target - sy) < 0.3) sy = target;
  const off = target - sy;
  for (const s of scrubs) {
    if (!s.el.isConnected) continue;
    if (s.deskOnly && !desk()) continue;
    const b = s.el.getBoundingClientRect();
    const r = s.smooth ? { top: b.top + off, height: b.height } : b;
    s.fn(P[s.type](r));
  }
  raf = requestAnimationFrame(loop);
}

function splitWords(el: HTMLElement) {
  if (el.dataset.split) return;
  el.dataset.split = "1";
  let n = 0;
  const walk = (node: Node) =>
    [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        const f = document.createDocumentFragment();
        (c.textContent || "").split(/(\s+)/).forEach((w) => {
          if (!w) return;
          if (/^\s+$/.test(w)) { f.appendChild(document.createTextNode(w)); return; }
          const o = document.createElement("span"); o.className = "wd";
          const i = document.createElement("span"); i.textContent = w; i.style.transitionDelay = n++ * 45 + "ms";
          o.appendChild(i); f.appendChild(o);
        });
        (c as ChildNode).replaceWith(f);
      } else if (c.nodeType === 1 && (c as Element).tagName !== "BR") walk(c);
    });
  walk(el);
}
function fillWords(el: HTMLElement): HTMLElement[] {
  if (!el.dataset.split) {
    el.dataset.split = "1";
    const words = (el.textContent || "").trim().split(/\s+/);
    el.textContent = "";
    words.forEach((w, i) => {
      const s = document.createElement("span"); s.className = "fw"; s.textContent = w;
      el.appendChild(s); if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    });
  }
  return $$<HTMLElement>(".fw", el);
}

function count(el: HTMLElement, locale: string) {
  const to = +(el.dataset.count || 0), t0 = performance.now(), d = 1800;
  const step = (t: number) => {
    const p = clamp((t - t0) / d), e = 1 - Math.pow(1 - p, 4);
    el.textContent = Math.round(to * e).toLocaleString(locale);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export function pop(els: Element | Element[], opts: { x?: number; y?: number; d?: number; stagger?: number } = {}) {
  if (reduceMotion()) return;
  (Array.isArray(els) ? els : [els]).forEach((el, i) =>
    (el as HTMLElement).animate(
      [{ opacity: 0, transform: `translate(${opts.x || 0}px,${opts.y ?? 28}px)` }, { opacity: 1, transform: "none" }],
      { duration: opts.d || 800, delay: i * (opts.stagger || 60), easing: EASE, fill: "both" },
    ),
  );
}

export function release() {
  if (!playRoot) return;
  playRoot.classList.add("play");
  $$<HTMLElement>("h1.split", playRoot).forEach((h) => h.classList.add("in"));
}

function behaviours(root: HTMLElement) {
  const reduce = reduceMotion();
  // filters
  $$<HTMLElement>(".filters", root).forEach((f) => {
    const scope = f.parentElement!;
    const on = (e: Event) => {
      const b = (e.target as Element).closest("button"); if (!b) return;
      $$<HTMLElement>("button", f).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", String(x === b)); });
      const c = b.dataset.filter;
      $$<HTMLElement>("[data-cat]", scope).forEach((card) => {
        const show = c === "all" || card.dataset.cat === c || card.dataset.cat === "all";
        card.hidden = !show; if (show) pop(card, { y: 24 });
      });
    };
    f.addEventListener("click", on); disposers.push(() => f.removeEventListener("click", on));
  });
  // tabs
  $$<HTMLElement>(".tabs", root).forEach((t) => {
    const ink = t.querySelector<HTMLElement>(".tab-ink"), panels = $$<HTMLElement>(".tab-panel", t.parentElement!);
    const move = (b: HTMLElement | null) => { if (!b || !ink) return; ink.style.width = b.offsetWidth + "px"; ink.style.transform = `translateX(${b.offsetLeft}px)`; };
    requestAnimationFrame(() => move(t.querySelector("button.on")));
    const on = (e: Event) => {
      const b = (e.target as Element).closest<HTMLElement>("button"); if (!b) return;
      $$<HTMLElement>("button", t).forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-selected", String(x === b)); });
      move(b);
      panels.forEach((p) => p.classList.toggle("on", p.dataset.panel === b.dataset.tab));
      const panel = panels.find((p) => p.dataset.panel === b.dataset.tab);
      if (panel) pop($$(".addr", panel), { y: 30, stagger: 70 });
    };
    t.addEventListener("click", on); disposers.push(() => t.removeEventListener("click", on));
  });
  // testimonials
  $$<HTMLElement>("[data-quotes]", root).forEach((st) => {
    const qs = $$<HTMLElement>(".quote", st), bs = $$<HTMLElement>(".qnav button", st.parentElement!);
    if (qs.length < 2) return;
    let i = 0, last = performance.now(), r = 0;
    const show = (k: number) => { i = k; qs.forEach((q, j) => q.classList.toggle("on", j === k)); bs.forEach((b, j) => ((b.firstElementChild as HTMLElement).style.width = j < k ? "100%" : "0")); last = performance.now(); };
    bs.forEach((b, k) => b.addEventListener("click", () => show(k)));
    const lp = (t: number) => { const p = Math.min(1, (t - last) / 7000); if (!reduce) { (bs[i].firstElementChild as HTMLElement).style.width = p * 100 + "%"; if (p >= 1) show((i + 1) % qs.length); } r = requestAnimationFrame(lp); };
    r = requestAnimationFrame(lp); disposers.push(() => cancelAnimationFrame(r));
  });
  // services list: image follows the cursor
  $$<HTMLElement>("[data-svc]", root).forEach((list) => {
    const fl = list.nextElementSibling as HTMLElement | null; if (!fl) return;
    const imgs = [...fl.children] as HTMLElement[];
    let mx = 0, my = 0, fx = 0, fy = 0, on = false, r = 0;
    list.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    $$<HTMLElement>("a", list).forEach((a) => {
      a.addEventListener("mouseenter", (e) => { if (!desk() || reduce) return; if (!on) { fx = mx = e.clientX; fy = my = e.clientY; } on = true; fl.classList.add("show"); imgs.forEach((im, k) => im.classList.toggle("on", String(k) === a.dataset.i)); });
      a.addEventListener("mouseleave", () => { on = false; fl.classList.remove("show"); });
    });
    const lp = () => { fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12; if (on) fl.style.transform = `translate(${fx - 130}px,${fy - 162}px) rotate(${(mx - fx) * 0.04}deg)`; r = requestAnimationFrame(lp); };
    lp(); disposers.push(() => cancelAnimationFrame(r));
  });
  // magnetic buttons
  if (!reduce && window.matchMedia("(hover:hover)").matches)
    $$<HTMLElement>(".mag", root).forEach((b) => {
      const mv = (e: MouseEvent) => { const r = b.getBoundingClientRect(); const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2; b.style.transform = `translate(${x * 0.18}px,${y * 0.3}px)`; };
      const lv = () => { b.style.transform = ""; };
      b.addEventListener("mousemove", mv); b.addEventListener("mouseleave", lv);
      disposers.push(() => { b.removeEventListener("mousemove", mv); b.removeEventListener("mouseleave", lv); });
    });
}

export function init(root: HTMLElement, locale = "en") {
  destroy();
  const reduce = reduceMotion();
  if (!reduce) document.documentElement.classList.add("anim");
  $$<HTMLElement>("h1.split, h2.split", root).forEach(splitWords);
  const fills = $$<HTMLElement>("[data-fill]", root).map((p) => ({ p, w: fillWords(p) }));
  behaviours(root);
  if (reduce) {
    $$<HTMLElement>(".split, [data-rv], .card-grid", root).forEach((e) => e.classList.add("in"));
    root.classList.add("play");
    $$<HTMLElement>("[data-count]", root).forEach((c) => (c.textContent = (+(c.dataset.count || 0)).toLocaleString(locale)));
    return;
  }
  $$<HTMLElement>(".card-grid", root).forEach((g) => $$<HTMLElement>(".card", g).forEach((c, i) => (c.style.transitionDelay = i * 80 + "ms")));
  $$<HTMLElement>(".hero-in", root).forEach((e, i) => (e.style.transitionDelay = 550 + i * 90 + "ms"));

  playRoot = root;
  requestAnimationFrame(() => requestAnimationFrame(() => { if (!document.documentElement.classList.contains("pre-on")) release(); }));

  io = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      const t = e.target as HTMLElement; io?.unobserve(t);
      if (t.hasAttribute("data-count")) count(t, locale); else t.classList.add("in");
    }),
    { rootMargin: "0px 0px -12% 0px" },
  );
  $$<HTMLElement>("h2.split, [data-rv], .card-grid, [data-count]", root).forEach((e) => io!.observe(e));

  // inner heroes: the image drifts slower than the page
  $$<HTMLElement>(".phero", root).forEach((h) => { const m = h.querySelector<HTMLElement>("[data-hero]"); if (m) scrub(h, "leave", (p) => (m.style.transform = `translateY(${18 * p}%)`)); });
  // parallax
  $$<HTMLElement>("[data-par]", root).forEach((el) => scrub(el.parentElement!, "enter", (p) => (el.style.transform = `translateY(${(p - 0.5) * 14}%)`)));
  // lead paragraphs fill as you read
  fills.forEach(({ p, w }) => { const n = w.length; scrub(p, "read", (q) => { const x = q * (n + 6); w.forEach((s, i) => (s.style.opacity = String(0.14 + 0.86 * clamp(x - i)))); }); });
  // article reading bar
  const art = root.querySelector("[data-article]"), rb = root.querySelector<HTMLElement>("[data-readbar]");
  if (art && rb) scrub(art, "read", (p) => (rb.style.width = p * 100 + "%"), { smooth: false });

  sy = window.scrollY;
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(loop);
}

export function destroy() {
  io?.disconnect(); io = null; scrubs = [];
  disposers.forEach((f) => { try { f(); } catch { /* noop */ } }); disposers = [];
  cancelAnimationFrame(raf);
  playRoot = null;
}

/* page transition: graphite curtain carrying the AZ mark */
export async function curtainIn(c: HTMLElement) {
  if (reduceMotion() || !c.animate) return;
  c.style.visibility = "visible";
  const lines = $$<SVGPolylineElement>("polyline", c);
  await c.animate([{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }], { duration: 650, easing: INOUT, fill: "forwards" }).finished;
  lines.forEach((l, i) => l.animate([{ strokeDashoffset: 240 }, { strokeDashoffset: 0 }], { duration: 600, delay: i * 90, easing: "ease-in-out", fill: "forwards" }));
  await new Promise((r) => setTimeout(r, 420));
}
export async function curtainOut(c: HTMLElement) {
  if (reduceMotion() || !c.animate || c.style.visibility !== "visible") return;
  await c.animate([{ transform: "translateY(0%)" }, { transform: "translateY(-100%)" }], { duration: 750, easing: INOUT, fill: "forwards" }).finished;
  c.style.visibility = "hidden";
  c.getAnimations().forEach((a) => a.cancel());
  $$<SVGPolylineElement>("polyline", c).forEach((l) => l.getAnimations().forEach((a) => a.cancel()));
}

/* first-visit preloader: the markup is server-rendered (PvRuntime) so it covers the very first frame;
   a head script marks html.pre-skip for returning visitors or reduced motion. */
export function preloader(onDone: () => void) {
  const el = document.querySelector<HTMLElement>(".pre");
  const html = document.documentElement;
  if (!el) return false;
  if (html.classList.contains("pre-skip") || reduceMotion()) { el.style.display = "none"; html.classList.remove("pre-on"); return false; }
  try { sessionStorage.setItem("azPre", "1"); } catch { /* private mode */ }
  html.classList.add("pre-on");
  const c = el.querySelector<HTMLElement>("[data-pc]")!, t0 = performance.now(), d = 1500;
  const done = () => { el.classList.add("out"); html.classList.remove("pre-on"); onDone(); setTimeout(() => (el.style.display = "none"), 1200); };
  const step = (t: number) => { const p = clamp((t - t0) / d); c.textContent = String(Math.round((1 - Math.pow(1 - p, 3)) * 100)).padStart(3, "0"); if (p < 1) requestAnimationFrame(step); else done(); };
  requestAnimationFrame(step);
  return true;
}
