import { after } from "next/server";
import { connection } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { pgStore } from "@/lib/whatsapp/store";
import { processPayload } from "@/lib/whatsapp/process";
import { summarizeWhatsAppWebhook, whatsappSignatureMatches } from "@/lib/whatsapp-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function text(body: string, status: number) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

/**
 * Vérification Meta (hub.mode, hub.verify_token, hub.challenge).
 * Hors segment [locale] : pas de redirect /fr, pas de middleware i18n.
 */
export async function GET(request: Request) {
  await connection();
  const url = new URL(request.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const expected = process.env.WHATSAPP_VERIFY_TOKEN;

  if (
    mode === "subscribe" &&
    typeof expected === "string" &&
    expected.length > 0 &&
    token === expected &&
    challenge
  ) {
    return text(challenge, 200);
  }

  return text("Forbidden", 403);
}

function secretMatches(received: string, expected: string): boolean {
  const a = Buffer.from(received, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/**
 * Notifications WhatsApp (Meta ou 360dialog).
 * Auth : en-tête X-Webhook-Secret (env WA_WEBHOOK_SECRET) ; sinon, signature Meta
 * x-hub-signature-256 (env META_APP_SECRET). Le brut est stocké d'abord, 200
 * est renvoyé, puis le traitement tourne via after().
 */
export async function POST(request: Request) {
  await connection();
  const rawBody = await request.text();

  const secretHeader = request.headers.get("x-webhook-secret");
  const sigHeader = request.headers.get("x-hub-signature-256");
  const expectedSecret = process.env.WA_WEBHOOK_SECRET;
  const appSecret = process.env.META_APP_SECRET;

  if (secretHeader !== null) {
    if (!expectedSecret || !secretMatches(secretHeader, expectedSecret)) {
      return text("Unauthorized", 401);
    }
  } else if (sigHeader !== null && appSecret) {
    if (!whatsappSignatureMatches(rawBody, sigHeader, appSecret)) {
      return text("Invalid signature", 401);
    }
  } else {
    return text("Unauthorized", 401);
  }

  let payload: unknown = null;
  if (rawBody) {
    try {
      payload = JSON.parse(rawBody);
    } catch {
      console.warn("[WA_WEBHOOK] ignored non-JSON body");
      return text("OK", 200);
    }
  }

  console.log("[WA_WEBHOOK]", summarizeWhatsAppWebhook(payload));

  after(async () => {
    try {
      const rawId = await pgStore.insertRawEvent(payload);
      await processPayload(pgStore, rawId, payload);
    } catch (e) {
      console.error("[WA_WEBHOOK] storage failed", e instanceof Error ? e.message : e);
    }
  });
  return text("OK", 200);
}
