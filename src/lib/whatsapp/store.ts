import postgres from "postgres";
import type { ContactRow, MessageRow, StatusRow, WhatsAppStore } from "./process";

let sql: ReturnType<typeof postgres> | null = null;
function db() {
  if (!sql) {
    const url = process.env.WA_DATABASE_URL;
    if (!url) throw new Error("WA_DATABASE_URL is not set");
    // pgbouncer transaction mode: no prepared statements
    sql = postgres(url, { prepare: false, max: 3, idle_timeout: 20, connect_timeout: 10 });
  }
  return sql;
}

const CHUNK = 500;
function chunks<T>(rows: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += CHUNK) out.push(rows.slice(i, i + CHUNK));
  return out;
}

export const pgStore: WhatsAppStore = {
  async insertRawEvent(payload) {
    const s = db();
    const [r] = await s`insert into whatsapp.raw_events (payload) values (${s.json(payload as never)}) returning id`;
    return Number(r.id);
  },
  async markProcessed(id, error) {
    await db()`update whatsapp.raw_events set processed_at = now(), error = ${error ?? null} where id = ${id}`;
  },
  async upsertContacts(rows: ContactRow[]) {
    const s = db();
    for (const c of chunks(rows)) {
      await s`
        insert into whatsapp.contacts (wa_id, name, profile_name)
        select wa_id, name, profile_name from jsonb_to_recordset(${s.json(c as never)}::jsonb)
          as r(wa_id text, name text, profile_name text)
        on conflict (wa_id) do update set
          name = coalesce(excluded.name, whatsapp.contacts.name),
          profile_name = coalesce(excluded.profile_name, whatsapp.contacts.profile_name),
          updated_at = now()`;
      await s`
        insert into whatsapp.conversations (wa_id)
        select wa_id from jsonb_to_recordset(${s.json(c as never)}::jsonb) as r(wa_id text)
        on conflict (wa_id) do nothing`;
    }
  },
  async upsertMessages(rows: MessageRow[]) {
    const s = db();
    for (const c of chunks(rows)) {
      await s`
        insert into whatsapp.messages
          (id, conversation_id, wa_id, direction, ts, type, text, media_id, status, source, raw)
        select r.id, cv.id, r.wa_id, r.direction, r.ts, r.type, r.text, r.media_id, r.status, r.source, r.raw
        from jsonb_to_recordset(${s.json(c as never)}::jsonb) as r(
          id text, wa_id text, direction text, ts timestamptz, type text, text text,
          media_id text, status text, source text, raw jsonb)
        join whatsapp.conversations cv on cv.wa_id = r.wa_id
        on conflict (id) do update set
          status = coalesce(whatsapp.messages.status, excluded.status),
          text = coalesce(whatsapp.messages.text, excluded.text),
          media_id = coalesce(whatsapp.messages.media_id, excluded.media_id),
          updated_at = now()`;
      await s`
        update whatsapp.conversations cv set last_message_at = m.mx
        from (select wa_id, max(ts) mx from jsonb_to_recordset(${s.json(c as never)}::jsonb)
              as r(wa_id text, ts timestamptz) group by wa_id) m
        where cv.wa_id = m.wa_id and (cv.last_message_at is null or cv.last_message_at < m.mx)`;
    }
  },
  async applyStatuses(rows: StatusRow[]) {
    const s = db();
    for (const c of chunks(rows)) {
      // never downgrade (read > delivered > sent); failed always wins
      await s`
        update whatsapp.messages m set status = r.status, updated_at = now()
        from jsonb_to_recordset(${s.json(c as never)}::jsonb) as r(id text, status text)
        where m.id = r.id and (
          r.status = 'failed' or
          (case coalesce(m.status,'') when 'read' then 3 when 'delivered' then 2 when 'sent' then 1 else 0 end)
          < (case r.status when 'read' then 3 when 'delivered' then 2 when 'sent' then 1 else 0 end))`;
    }
  },
};
