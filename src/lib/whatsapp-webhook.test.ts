import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { describe, it } from "node:test";
import { summarizeWhatsAppWebhook, whatsappSignatureMatches } from "./whatsapp-webhook";

describe("whatsappSignatureMatches", () => {
  const secret = "app-secret";
  const body = '{"object":"whatsapp_business_account"}';
  const digest = createHmac("sha256", secret).update(body, "utf8").digest("hex");

  it("accepts a matching sha256 signature", () => {
    assert.equal(whatsappSignatureMatches(body, `sha256=${digest}`, secret), true);
  });

  it("rejects a mismatched signature, a bad prefix, and a short digest", () => {
    assert.equal(whatsappSignatureMatches(body, `sha256=${"ab".repeat(32)}`, secret), false);
    assert.equal(whatsappSignatureMatches(body, digest, secret), false);
    assert.equal(whatsappSignatureMatches(body, "sha256=abcd", secret), false);
    assert.equal(whatsappSignatureMatches(body, null, secret), false);
  });
});

describe("summarizeWhatsAppWebhook", () => {
  it("counts message types and ids without keeping the body", () => {
    const summary = summarizeWhatsAppWebhook({
      object: "whatsapp_business_account",
      entry: [
        {
          id: "WABA_1",
          changes: [
            {
              field: "messages",
              value: {
                metadata: { display_phone_number: "33600000000", phone_number_id: "PHONE_1" },
                messages: [
                  { id: "m1", type: "text", text: { body: "secret client text" } },
                  { id: "m2", type: "image", image: { caption: "hidden" } },
                ],
                statuses: [{ id: "m1", status: "delivered", recipient_id: "33611111111" }],
              },
            },
          ],
        },
      ],
    });

    assert.deepEqual(summary, {
      object: "whatsapp_business_account",
      wabaIds: ["WABA_1"],
      fields: ["messages"],
      phoneNumberIds: ["PHONE_1"],
      messages: { count: 2, byType: { text: 1, image: 1 }, ids: ["m1", "m2"] },
      statuses: { count: 1, byType: { delivered: 1 }, ids: ["m1"] },
    });
    assert.equal(JSON.stringify(summary).includes("secret client text"), false);
    assert.equal(JSON.stringify(summary).includes("33611111111"), false);
    assert.equal(JSON.stringify(summary).includes("33600000000"), false);
  });
});
