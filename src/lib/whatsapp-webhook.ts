import { createHmac, timingSafeEqual } from "node:crypto";

const SIGNATURE_PREFIX = "sha256=";
const ID_LOG_LIMIT = 50;

export function whatsappSignatureMatches(
  rawBody: string,
  header: string | null,
  secret: string
): boolean {
  if (!header?.startsWith(SIGNATURE_PREFIX)) return false;
  const receivedHex = header.slice(SIGNATURE_PREFIX.length).trim();
  if (!/^[0-9a-f]{64}$/i.test(receivedHex)) return false;

  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
  const received = Buffer.from(receivedHex, "hex");
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export type WebhookCount = {
  count: number;
  byType: Record<string, number>;
  ids: string[];
};

export type WebhookSummary = {
  object: string | null;
  wabaIds: string[];
  fields: string[];
  phoneNumberIds: string[];
  messages: WebhookCount;
  statuses: WebhookCount;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function asList(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function remember(bucket: string[], value: unknown) {
  if (typeof value !== "string" || !value || bucket.includes(value) || bucket.length >= ID_LOG_LIMIT) {
    return;
  }
  bucket.push(value);
}

function bump(map: Record<string, number>, key: string) {
  map[key] = (map[key] ?? 0) + 1;
}

function emptyCount(): WebhookCount {
  return { count: 0, byType: {}, ids: [] };
}

/**
 * Résumé journalisable : objet, champs, identifiants et comptes.
 * Les corps de message, noms et numéros d'expéditeur ne sont pas repris.
 */
export function summarizeWhatsAppWebhook(payload: unknown): WebhookSummary {
  const root = asRecord(payload);
  const wabaIds: string[] = [];
  const fields: string[] = [];
  const phoneNumberIds: string[] = [];
  const messages = emptyCount();
  const statuses = emptyCount();

  for (const entry of asList(root?.entry)) {
    const entryRecord = asRecord(entry);
    if (!entryRecord) continue;
    remember(wabaIds, entryRecord.id);

    for (const change of asList(entryRecord.changes)) {
      const changeRecord = asRecord(change);
      if (!changeRecord) continue;
      const field =
        typeof changeRecord.field === "string" && changeRecord.field
          ? changeRecord.field
          : "unknown";
      if (!fields.includes(field)) fields.push(field);

      const value = asRecord(changeRecord.value);
      if (!value) continue;
      remember(phoneNumberIds, asRecord(value.metadata)?.phone_number_id);

      for (const message of asList(value.messages)) {
        const messageRecord = asRecord(message);
        messages.count += 1;
        const type =
          typeof messageRecord?.type === "string" && messageRecord.type
            ? messageRecord.type
            : "unknown";
        bump(messages.byType, type);
        if (messages.ids.length < ID_LOG_LIMIT && typeof messageRecord?.id === "string") {
          messages.ids.push(messageRecord.id);
        }
      }

      for (const status of asList(value.statuses)) {
        const statusRecord = asRecord(status);
        statuses.count += 1;
        const type =
          typeof statusRecord?.status === "string" && statusRecord.status
            ? statusRecord.status
            : "unknown";
        bump(statuses.byType, type);
        if (statuses.ids.length < ID_LOG_LIMIT && typeof statusRecord?.id === "string") {
          statuses.ids.push(statusRecord.id);
        }
      }
    }
  }

  return {
    object: typeof root?.object === "string" ? root.object : null,
    wabaIds,
    fields,
    phoneNumberIds,
    messages,
    statuses,
  };
}
