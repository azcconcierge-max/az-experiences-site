import { connection } from "next/server";
import { summarizeWhatsAppWebhook, whatsappSignatureMatches } from "@/lib/whatsapp-webhook";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

let missingSecretWarned = false;

function text(body: string, status: number) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

function warnMissingSecretOnce() {
  if (missingSecretWarned) return;
  missingSecretWarned = true;
  console.warn(
    "[WA_WEBHOOK] META_APP_SECRET is not set; X-Hub-Signature-256 verification skipped."
  );
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

/**
 * Notifications WhatsApp. Le corps brut sert à la signature HMAC.
 * TODO: persister les événements. La destination de stockage (base, file
 * d'attente ou CRM) sera choisie plus tard. Répondre 200 avant toute écriture.
 */
export async function POST(request: Request) {
  await connection();
  const rawBody = await request.text();
  const secret = process.env.META_APP_SECRET;

  if (!secret) {
    warnMissingSecretOnce();
  } else if (
    !whatsappSignatureMatches(rawBody, request.headers.get("x-hub-signature-256"), secret)
  ) {
    return text("Invalid signature", 401);
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
  return text("OK", 200);
}
