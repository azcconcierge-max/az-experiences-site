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
