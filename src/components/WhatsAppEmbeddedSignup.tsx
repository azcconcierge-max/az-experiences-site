"use client";

import { useEffect, useRef, useState } from "react";

const FB_APP_ID = "1497957998858786";
const FB_CONFIG_ID = "1079937201743718";
/** Version Graph indiquée comme actuelle dans le guide d'implémentation Meta. */
const FB_GRAPH_VERSION = "v27.0";
const FB_SDK_SRC = "https://connect.facebook.net/en_US/sdk.js";

type Ids = {
  wabaId: string | null;
  phoneNumberId: string | null;
  businessId: string | null;
};

type FinishPayload = {
  event: string;
  ids: Ids;
};

type Status =
  | { kind: "loading" }
  | { kind: "idle" }
  | { kind: "pending" }
  | { kind: "success"; ids: Ids }
  | { kind: "cancelled"; step: string | null }
  | { kind: "error"; message: string };

type FbLoginResponse = {
  status?: string;
  authResponse?: { code?: string } | null;
};

type WaMessage = {
  type?: unknown;
  event?: unknown;
  data?: unknown;
};

declare global {
  interface Window {
    FB?: {
      init: (params: {
        appId: string;
        autoLogAppEvents: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: FbLoginResponse) => void,
        options: {
          config_id: string;
          response_type: "code";
          override_default_response_type: true;
          extras: {
            setup: Record<string, never>;
            version: "v5";
            featureType: "whatsapp_business_app_onboarding";
          };
        }
      ) => void;
    };
    fbAsyncInit?: () => void;
  }
}

function isFacebookOrigin(origin: string): boolean {
  try {
    const hostname = new URL(origin).hostname;
    return hostname === "facebook.com" || hostname.endsWith(".facebook.com");
  } catch {
    return false;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function firstString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (Array.isArray(value)) {
    for (const item of value) {
      if (typeof item === "string" && item.trim()) return item.trim();
    }
  }
  return null;
}

function readString(data: unknown, key: string): string | null {
  return firstString(asRecord(data)?.[key]);
}

function readIds(data: unknown): Ids {
  const record = asRecord(data);
  return {
    wabaId:
      firstString(record?.waba_id) ??
      firstString(record?.messaging_account_ids) ??
      firstString(record?.waba_ids),
    phoneNumberId: firstString(record?.phone_number_id),
    businessId: firstString(record?.business_id),
  };
}

function statusCopy(status: Status): string | null {
  switch (status.kind) {
    case "loading":
      return "Chargement en cours…";
    case "idle":
      return null;
    case "pending":
      return "Connexion en cours…";
    case "success":
      return "Terminé.";
    case "cancelled":
      return status.step ? `Annulé. Étape : ${status.step}.` : "Annulé.";
    case "error":
      return status.message ? `Erreur. ${status.message}` : "Erreur.";
  }
}

const ID_ROWS: { key: keyof Ids; label: string }[] = [
  { key: "wabaId", label: "waba_id" },
  { key: "phoneNumberId", label: "phone_number_id" },
  { key: "businessId", label: "business_id" },
];

export function WhatsAppEmbeddedSignup() {
  const [status, setStatus] = useState<Status>({ kind: "loading" });
  const [saveNote, setSaveNote] = useState<string | null>(null);
  const codeRef = useRef<string | null>(null);
  const finishRef = useRef<FinishPayload | null>(null);
  const postedKeyRef = useRef<string | null>(null);
  const postTimerRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  async function postFinish() {
    const finish = finishRef.current;
    if (!finish) return;
    const code = codeRef.current;
    const key = JSON.stringify({ event: finish.event, ids: finish.ids, code });
    if (postedKeyRef.current === key) return;
    postedKeyRef.current = key;

    try {
      const response = await fetch("/api/whatsapp/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event: finish.event,
          waba_id: finish.ids.wabaId,
          phone_number_id: finish.ids.phoneNumberId,
          business_id: finish.ids.businessId,
          code,
        }),
      });
      if (!response.ok && mountedRef.current) {
        setSaveNote("Terminé, mais l'enregistrement du résultat a échoué.");
      }
    } catch {
      if (mountedRef.current) {
        setSaveNote("Terminé, mais l'enregistrement du résultat a échoué.");
      }
    }
  }

  function schedulePost() {
    if (postTimerRef.current !== null) window.clearTimeout(postTimerRef.current);
    const delay = codeRef.current ? 0 : 700;
    postTimerRef.current = window.setTimeout(() => {
      postTimerRef.current = null;
      void postFinish();
    }, delay);
  }

  function onLogin(response: FbLoginResponse) {
    const code = response.authResponse?.code;
    if (typeof code === "string" && code) {
      codeRef.current = code;
      if (finishRef.current) schedulePost();
      return;
    }
    window.setTimeout(() => {
      if (!mountedRef.current || finishRef.current) return;
      setStatus((current) =>
        current.kind === "pending"
          ? {
              kind: "error",
              message: "La fenêtre de connexion n'a pas pu s'ouvrir. Autorisez les popups, puis réessayez.",
            }
          : current
      );
    }, 800);
  }

  function launch() {
    const fb = window.FB;
    if (!fb) {
      setStatus({
        kind: "error",
        message: "Le SDK Facebook n'est pas prêt. Rechargez la page.",
      });
      return;
    }

    if (postTimerRef.current !== null) {
      window.clearTimeout(postTimerRef.current);
      postTimerRef.current = null;
    }
    codeRef.current = null;
    finishRef.current = null;
    postedKeyRef.current = null;
    setSaveNote(null);
    setStatus({ kind: "pending" });

    // v5 : la coexistence WhatsApp Business est active par défaut.
    // featureType conserve le parcours QR (whatsapp_business_app_onboarding).
    // sessionInfoVersion n'est plus un paramètre en v5.
    fb.login(onLogin, {
      config_id: FB_CONFIG_ID,
      response_type: "code",
      override_default_response_type: true,
      extras: {
        setup: {},
        version: "v5",
        featureType: "whatsapp_business_app_onboarding",
      },
    });
  }

  useEffect(() => {
    mountedRef.current = true;

    function initSdk() {
      window.FB?.init({
        appId: FB_APP_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: FB_GRAPH_VERSION,
      });
      if (mountedRef.current) setStatus({ kind: "idle" });
    }

    window.fbAsyncInit = initSdk;
    if (window.FB) {
      initSdk();
    } else if (!document.getElementById("facebook-jssdk")) {
      const script = document.createElement("script");
      script.id = "facebook-jssdk";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";
      script.src = FB_SDK_SRC;
      script.onerror = () => {
        if (!mountedRef.current) return;
        setStatus({
          kind: "error",
          message: "Le SDK Facebook n'a pas pu être chargé.",
        });
      };
      document.body.appendChild(script);
    }

    function onMessage(event: MessageEvent) {
      if (!isFacebookOrigin(event.origin)) return;
      let parsed: unknown;
      try {
        parsed = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      const message = parsed as WaMessage;
      if (message?.type !== "WA_EMBEDDED_SIGNUP" || typeof message.event !== "string") return;

      if (message.event === "CANCEL") {
        if (finishRef.current) return;
        setStatus({ kind: "cancelled", step: readString(message.data, "current_step") });
        return;
      }
      if (message.event === "ERROR") {
        if (finishRef.current) return;
        setStatus({
          kind: "error",
          message:
            readString(message.data, "error_message") ??
            "Une erreur est survenue pendant la connexion.",
        });
        return;
      }
      if (message.event.startsWith("FINISH")) {
        const ids = readIds(message.data);
        finishRef.current = { event: message.event, ids };
        setStatus({ kind: "success", ids });
        schedulePost();
      }
    }

    window.addEventListener("message", onMessage);
    return () => {
      mountedRef.current = false;
      window.removeEventListener("message", onMessage);
      if (postTimerRef.current !== null) window.clearTimeout(postTimerRef.current);
    };
  }, []);

  const copy = statusCopy(status);
  const pending = status.kind === "pending" || status.kind === "loading";

  return (
    <div className="mt-10">
      <button
        type="button"
        onClick={launch}
        disabled={pending}
        className="btn-label inline-flex items-center border border-ivory bg-ivory px-8 py-4 text-black transition-colors duration-500 hover:bg-transparent hover:text-ivory disabled:cursor-not-allowed disabled:border-ivory/40 disabled:bg-ivory/40 disabled:text-black disabled:hover:bg-ivory/40 disabled:hover:text-black"
      >
        Connecter WhatsApp Business
      </button>

      {copy ? (
        <p role="status" aria-live="polite" className="t-body mt-8 text-ivory">
          {copy}
        </p>
      ) : null}

      {saveNote ? <p className="t-small mt-3 text-stone">{saveNote}</p> : null}

      {status.kind === "success" ? (
        <dl className="mt-8 border border-ivory/20">
          {ID_ROWS.map((row) => (
            <div key={row.label} className="border-t border-ivory/15 px-5 py-4 first:border-t-0">
              <dt className="label">{row.label}</dt>
              <dd className="mt-2 break-all text-ivory">{status.ids[row.key] ?? "—"}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </div>
  );
}
