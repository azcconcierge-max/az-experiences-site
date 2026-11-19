// Pure parsing of 360dialog / Meta Cloud API webhook payloads into normalized rows.
// No I/O here: the store is injected so this is unit-testable.

export type Direction = "in" | "out" | "echo";

export type ContactRow = { wa_id: string; name: string | null; profile_name: string | null };
export type MessageRow = {
  id: string;
  wa_id: string;
  direction: Direction;
  ts: string; // ISO
  type: string | null;
  text: string | null;
  media_id: string | null;
  status: string | null;
  source: string;
  raw: unknown;
};
export type StatusRow = { id: string; status: string; ts: string };

export interface WhatsAppStore {
  insertRawEvent(payload: unknown): Promise<number>;
  markProcessed(id: number, error?: string | null): Promise<void>;
  upsertContacts(rows: ContactRow[]): Promise<void>;
  upsertMessages(rows: MessageRow[]): Promise<void>;
  applyStatuses(rows: StatusRow[]): Promise<void>;
}

type Rec = Record<string, unknown>;
const rec = (v: unknown): Rec | null =>
  typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Rec) : null;
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const str = (v: unknown): string | null =>
  typeof v === "string" && v ? v : typeof v === "number" ? String(v) : null;
const digits = (v: unknown): string => (str(v) ?? "").replace(/\D/g, "");

export function toIso(ts: unknown): string {
  const s = str(ts);
  if (s && /^\d+$/.test(s)) {
    let n = Number(s);
    if (n > 1e12) n = Math.floor(n / 1000); // ms -> s
    return new Date(n * 1000).toISOString();
  }
  if (s) {
    const d = new Date(s);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return new Date().toISOString();
}

const MEDIA_TYPES = ["image", "video", "audio", "document", "sticker"];

function extractContent(m: Rec): { text: string | null; media_id: string | null } {
  const type = str(m.type) ?? "";
  let text: string | null = null;
  let media_id: string | null = null;
  if (type === "text") text = str(rec(m.text)?.body);
  else if (MEDIA_TYPES.includes(type)) {
    const o = rec(m[type]);
    media_id = str(o?.id);
    text = str(o?.caption) ?? str(o?.filename);
  } else if (type === "button") text = str(rec(m.button)?.text);
  else if (type === "interactive") {
    const i = rec(m.interactive);
    text = str(rec(i?.button_reply)?.title) ?? str(rec(i?.list_reply)?.title);
  } else if (type === "reaction") text = str(rec(m.reaction)?.emoji);
  else if (type === "location") {
    const l = rec(m.location);
    text = l ? [str(l.name), str(l.address), `${l.latitude},${l.longitude}`].filter(Boolean).join(" ") : null;
  } else text = str(rec(m.text)?.body);
  return { text, media_id };
}

function toMessage(
  m: Rec,
  wa_id: string,
  direction: Direction,
  source: string,
  status: string | null
): MessageRow | null {
  const id = str(m.id);
  if (!id || !wa_id) return null;
  const c = extractContent(m);
  return {
    id,
    wa_id,
    direction,
    ts: toIso(m.timestamp),
    type: str(m.type),
    text: c.text,
    media_id: c.media_id,
    status,
    source,
    raw: m,
  };
}

export type Batch = { contacts: ContactRow[]; messages: MessageRow[]; statuses: StatusRow[] };

export function parsePayload(payload: unknown): Batch {
  const out: Batch = { contacts: [], messages: [], statuses: [] };
  const root = rec(payload);
  for (const entry of list(root?.entry)) {
    for (const change of list(rec(entry)?.changes)) {
      const ch = rec(change);
      const field = str(ch?.field);
      const value = rec(ch?.value);
      if (!value) continue;
      const bizNumber = digits(rec(value.metadata)?.display_phone_number);

      switch (field) {
        case "messages": {
          for (const c of list(value.contacts)) {
            const cr = rec(c);
            const wa = str(cr?.wa_id);
            if (wa) out.contacts.push({ wa_id: wa, name: null, profile_name: str(rec(cr?.profile)?.name) });
          }
          for (const m of list(value.messages)) {
            const mr = rec(m);
            if (!mr) continue;
            const from = str(mr.from) ?? "";
            const row = toMessage(mr, from, "in", "messages", null);
            if (row) out.messages.push(row);
          }
          for (const s of list(value.statuses)) {
            const sr = rec(s);
            const id = str(sr?.id);
            const status = str(sr?.status);
            if (id && status) out.statuses.push({ id, status, ts: toIso(sr?.timestamp) });
          }
          break;
        }
        case "smb_message_echoes": {
          for (const m of list(value.message_echoes ?? value.messages)) {
            const mr = rec(m);
            if (!mr) continue;
            const to = str(mr.to) ?? "";
            const row = toMessage(mr, to, "echo", "smb_message_echoes", null);
            if (row) out.messages.push(row);
          }
          break;
        }
        case "history": {
          // value.history[] = { metadata:{phase,chunk_order,progress}, threads:[{id, messages:[...]}] }
          for (const h of list(value.history)) {
            for (const t of list(rec(h)?.threads)) {
              const tr = rec(t);
              const wa = str(tr?.id) ?? "";
              for (const m of list(tr?.messages)) {
                const mr = rec(m);
                if (!mr) continue;
                const from = digits(mr.from);
                const isOut = bizNumber ? from === bizNumber : from !== digits(wa);
                const customer = wa || (isOut ? digits(mr.to) : from);
                const hs = str(rec(mr.history_context)?.status);
                const row = toMessage(mr, customer, isOut ? "out" : "in", "history", hs ? hs.toLowerCase() : null);
                if (row) out.messages.push(row);
              }
            }
          }
          break;
        }
        case "smb_app_state_sync": {
          for (const s of list(value.state_sync)) {
            const sr = rec(s);
            if (str(sr?.type) !== "contact" || str(sr?.action) === "remove") continue;
            const c = rec(sr?.contact);
            const phone = digits(c?.phone_number);
            if (!phone) continue;
            out.contacts.push({
              wa_id: phone,
              name: str(c?.full_name) ?? str(c?.first_name),
              profile_name: null,
            });
          }
          break;
        }
        default:
          break; // other fields kept in raw_events only
      }
    }
  }
  return out;
}

function dedupe<T>(rows: T[], key: (r: T) => string): T[] {
  const m = new Map<string, T>();
  for (const r of rows) m.set(key(r), r);
  return [...m.values()];
}

/** Process a stored raw event. Never throws: errors are recorded on the raw row. */
export async function processPayload(store: WhatsAppStore, rawId: number, payload: unknown) {
  try {
    const b = parsePayload(payload);
    // contacts needed by messages must exist (FK): add bare ones for any message wa_id
    const contacts = dedupe(
      [...b.contacts, ...b.messages.map((m) => ({ wa_id: m.wa_id, name: null, profile_name: null }))],
      (c) => c.wa_id
    );
    // merge: keep named versions over bare ones
    const named = new Map<string, ContactRow>();
    for (const c of [...b.contacts]) {
      const p = named.get(c.wa_id);
      named.set(c.wa_id, { wa_id: c.wa_id, name: c.name ?? p?.name ?? null, profile_name: c.profile_name ?? p?.profile_name ?? null });
    }
    const merged = contacts.map((c) => named.get(c.wa_id) ?? c);
    await store.upsertContacts(merged);
    await store.upsertMessages(dedupe(b.messages, (m) => m.id));
    await store.applyStatuses(b.statuses);
    await store.markProcessed(rawId, null);
  } catch (e) {
    console.error("[WA_WEBHOOK] processing failed", e instanceof Error ? e.message : e);
    try {
      await store.markProcessed(rawId, e instanceof Error ? e.message.slice(0, 500) : "error");
    } catch {}
  }
}
