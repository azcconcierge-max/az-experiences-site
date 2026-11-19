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

// Same content as db/whatsapp.sql, additive only (IF NOT EXISTS). Run once per instance,
// because the DB is not reachable for manual migrations from outside Vercel.
const SCHEMA_SQL = `
-- WhatsApp storage (additive only). Schema isolated from the CRM's public schema.
CREATE SCHEMA IF NOT EXISTS whatsapp;

CREATE TABLE IF NOT EXISTS whatsapp.contacts (
  wa_id        text PRIMARY KEY,
  name         text,
  profile_name text,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp.conversations (
  id              bigserial PRIMARY KEY,
  wa_id           text NOT NULL UNIQUE REFERENCES whatsapp.contacts(wa_id),
  last_message_at timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS whatsapp.messages (
  id              text PRIMARY KEY,          -- WhatsApp message id (wamid...)
  conversation_id bigint NOT NULL REFERENCES whatsapp.conversations(id),
  wa_id           text NOT NULL,             -- the customer
  direction       text NOT NULL CHECK (direction IN ('in','out','echo')),
  ts              timestamptz NOT NULL,
  type            text,
  text            text,
  media_id        text,
  status          text,
  source          text,                      -- messages | smb_message_echoes | history
  raw             jsonb,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS messages_conv_ts_idx ON whatsapp.messages (conversation_id, ts);
CREATE INDEX IF NOT EXISTS messages_wa_ts_idx ON whatsapp.messages (wa_id, ts);

CREATE TABLE IF NOT EXISTS whatsapp.raw_events (
  id           bigserial PRIMARY KEY,
  received_at  timestamptz NOT NULL DEFAULT now(),
  payload      jsonb NOT NULL,
  processed_at timestamptz,
  error        text
);

-- Server-only: no access through Supabase REST (anon/authenticated).
ALTER TABLE whatsapp.contacts      ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp.messages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp.raw_events    ENABLE ROW LEVEL SECURITY;
`;
let schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = db()
      .unsafe(SCHEMA_SQL)
      .then(() => undefined)
      .catch((e) => {
        schemaReady = null;
        throw e;
      });
  }
  return schemaReady;
}

const CHUNK = 500;
function chunks<T>(rows: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < rows.length; i += CHUNK) out.push(rows.slice(i, i + CHUNK));
  return out;
}

export const pgStore: WhatsAppStore & { stats(): Promise<Record<string, unknown>>; rawShapes(): Promise<unknown>; allRaw(): Promise<readonly Record<string, unknown>[]> } = {
  // Structure seule des événements bruts (aucun contenu client) : champs, clés, métadonnées history, erreurs.
  async rawShapes() {
    await ensureSchema();
    return db()`
      select r.id, r.received_at, r.processed_at, r.error,
        (select jsonb_agg(k) from jsonb_object_keys(case when jsonb_typeof(r.payload)='object' then r.payload else '{}'::jsonb end) k) as top_keys,
        (select jsonb_agg(jsonb_build_object(
            'field', c->>'field',
            'value_keys', (select jsonb_agg(k) from jsonb_object_keys(case when jsonb_typeof(c->'value')='object' then c->'value' else '{}'::jsonb end) k),
            'value_errors', c->'value'->'errors',
            'n_messages', case when jsonb_typeof(c->'value'->'messages')='array' then jsonb_array_length(c->'value'->'messages') end,
            'n_contacts', case when jsonb_typeof(c->'value'->'contacts')='array' then jsonb_array_length(c->'value'->'contacts') end,
            'n_state_sync', case when jsonb_typeof(c->'value'->'state_sync')='array' then jsonb_array_length(c->'value'->'state_sync') end,
            'history', (select jsonb_agg(jsonb_build_object(
                 'keys', (select jsonb_agg(k) from jsonb_object_keys(case when jsonb_typeof(h)='object' then h else '{}'::jsonb end) k),
                 'metadata', h->'metadata',
                 'errors', h->'errors',
                 'n_threads', case when jsonb_typeof(h->'threads')='array' then jsonb_array_length(h->'threads') end,
                 'n_thread_messages', (select sum(case when jsonb_typeof(t->'messages')='array' then jsonb_array_length(t->'messages') else 0 end)
                                       from jsonb_array_elements(case when jsonb_typeof(h->'threads')='array' then h->'threads' else '[]'::jsonb end) t)))
               from jsonb_array_elements(case when jsonb_typeof(c->'value'->'history')='array' then c->'value'->'history' else '[]'::jsonb end) h)))
          from jsonb_array_elements(case when jsonb_typeof(r.payload->'entry')='array' then r.payload->'entry' else '[]'::jsonb end) e,
               jsonb_array_elements(case when jsonb_typeof(e->'changes')='array' then e->'changes' else '[]'::jsonb end) c) as changes
      from whatsapp.raw_events r order by r.id`;
  },
  async allRaw() {
    await ensureSchema();
    return db()`select id, payload from whatsapp.raw_events order by id`;
  },
  async stats() {
    await ensureSchema();
    const [r] = await db()`
      select
        (select count(*) from whatsapp.raw_events)::int as raw_events,
        (select count(*) from whatsapp.raw_events where error is not null)::int as raw_errors,
        (select count(*) from whatsapp.raw_events where processed_at is null)::int as raw_unprocessed,
        (select count(*) from whatsapp.contacts)::int as contacts,
        (select count(*) from whatsapp.conversations)::int as conversations,
        (select count(*) from whatsapp.messages)::int as messages,
        (select max(received_at) from whatsapp.raw_events) as last_event_at`;
    return r;
  },
  async insertRawEvent(payload) {
    await ensureSchema();
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
