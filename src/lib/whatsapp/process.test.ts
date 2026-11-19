import assert from "node:assert/strict";
import { describe, it } from "node:test";
// @ts-expect-error node --test needs the .ts extension
import { processPayload, type WhatsAppStore, type MessageRow } from "./process.ts";

function memStore() {
  const messages = new Map<string, MessageRow>();
  const contacts = new Map<string, unknown>();
  const store: WhatsAppStore = {
    async insertRawEvent() { return 1; },
    async markProcessed() {},
    async upsertContacts(r) { r.forEach((c) => contacts.set(c.wa_id, c)); },
    async upsertMessages(r) { r.forEach((m) => { if (!messages.has(m.id)) messages.set(m.id, m); }); },
    async applyStatuses(r) { r.forEach((s) => { const m = messages.get(s.id); if (m) m.status = s.status; }); },
  };
  return { store, messages, contacts };
}
const wrap = (field: string, value: object) => ({
  object: "whatsapp_business_account",
  entry: [{ id: "W", changes: [{ field, value: { metadata: { display_phone_number: "33651173987" }, ...value } }] }],
});

describe("processPayload", () => {
  it("messages + statuses, idempotent", async () => {
    const { store, messages, contacts } = memStore();
    const p = wrap("messages", {
      contacts: [{ wa_id: "33611111111", profile: { name: "Jean" } }],
      messages: [{ id: "m1", from: "33611111111", timestamp: "1700000000", type: "text", text: { body: "hi" } }],
    });
    await processPayload(store, 1, p);
    await processPayload(store, 2, p);
    assert.equal(messages.size, 1);
    assert.equal(messages.get("m1")?.direction, "in");
    assert.equal((contacts.get("33611111111") as { profile_name: string }).profile_name, "Jean");
    await processPayload(store, 3, wrap("messages", { statuses: [{ id: "m1", status: "read", timestamp: "1700000100" }] }));
    assert.equal(messages.get("m1")?.status, "read");
  });
  it("echoes", async () => {
    const { store, messages } = memStore();
    await processPayload(store, 1, wrap("smb_message_echoes", {
      message_echoes: [{ id: "e1", from: "33651173987", to: "33622222222", timestamp: "1700000000", type: "text", text: { body: "yo" } }],
    }));
    assert.equal(messages.get("e1")?.direction, "echo");
    assert.equal(messages.get("e1")?.wa_id, "33622222222");
  });
  it("history", async () => {
    const { store, messages } = memStore();
    await processPayload(store, 1, wrap("history", {
      history: [{ metadata: { phase: 0, chunk_order: 1, progress: 10 }, threads: [{ id: "33633333333", messages: [
        { id: "h1", from: "33633333333", timestamp: "1690000000", type: "text", text: { body: "a" }, history_context: { status: "READ" } },
        { id: "h2", from: "33651173987", timestamp: "1690000010", type: "image", image: { id: "mid", caption: "c" }, history_context: { status: "DELIVERED" } },
      ] }] }],
    }));
    assert.equal(messages.get("h1")?.direction, "in");
    assert.equal(messages.get("h2")?.direction, "out");
    assert.equal(messages.get("h2")?.media_id, "mid");
  });
  it("state sync contacts", async () => {
    const { store, contacts } = memStore();
    await processPayload(store, 1, wrap("smb_app_state_sync", {
      state_sync: [{ type: "contact", action: "add", contact: { full_name: "Marie D", phone_number: "+33 6 44 44 44 44" }, metadata: { timestamp: "1700000000" } }],
    }));
    assert.equal((contacts.get("33644444444") as { name: string }).name, "Marie D");
  });
  it("history media follow-ups (messages / message_echoes without history wrapper)", async () => {
    const { store, messages } = memStore();
    await processPayload(store, 1, wrap("history", {
      messages: [{ id: "h1", from: "33622222222", timestamp: "1700000000", type: "image", image: { id: "MEDIA1", caption: "photo" } }],
    }));
    await processPayload(store, 2, wrap("history", {
      message_echoes: [{ id: "h2", from: "33651173987", to: "33622222222", timestamp: "1700000001", type: "document", document: { id: "MEDIA2", filename: "a.pdf" } }],
    }));
    assert.equal(messages.get("h1")?.direction, "in");
    assert.equal(messages.get("h1")?.wa_id, "33622222222");
    assert.equal(messages.get("h1")?.media_id, "MEDIA1");
    assert.equal(messages.get("h2")?.direction, "out");
    assert.equal(messages.get("h2")?.wa_id, "33622222222");
    assert.equal(messages.get("h2")?.media_id, "MEDIA2");
  });
});
