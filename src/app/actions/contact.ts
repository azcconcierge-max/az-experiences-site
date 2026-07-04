"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
};

/**
 * Envoi du formulaire de demande privée.
 * Utilise Resend (https://resend.com) si RESEND_API_KEY est défini dans .env.local.
 * Sans clé, le formulaire renvoie une erreur douce avec l'email en fallback.
 */
export async function sendContact(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Anti-spam : champ invisible que seuls les robots remplissent
  if (formData.get("company")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) return { status: "error" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[contact] RESEND_API_KEY manquant — demande non envoyée:", {
      name,
      email,
      type,
    });
    return { status: "error" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `${site.name} <onboarding@resend.dev>`, // à remplacer par le domaine vérifié
      to: [site.email],
      reply_to: email,
      subject: `Demande privée — ${type || "Général"} — ${name}`,
      text: [
        `Nom : ${name}`,
        `Email : ${email}`,
        phone && `Téléphone : ${phone}`,
        `Type : ${type}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    }),
  });

  return { status: res.ok ? "success" : "error" };
}
