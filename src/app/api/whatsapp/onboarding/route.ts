import { connection } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FIELD = 4096;

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function bounded(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_FIELD) return null;
  return trimmed;
}

/**
 * Reçoit le résultat d'Embedded Signup. Le code Facebook est journalisé
 * tel quel : il n'est pas échangé contre un jeton (pas de secret d'app ici).
 */
export async function POST(request: Request) {
  await connection();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  const record = asRecord(body);
  if (!record) return Response.json({ ok: false }, { status: 400 });

  console.log("[WA_ONBOARDING]", {
    event: bounded(record.event),
    waba_id: bounded(record.waba_id),
    phone_number_id: bounded(record.phone_number_id),
    business_id: bounded(record.business_id),
    code: bounded(record.code),
  });

  return Response.json({ ok: true });
}
