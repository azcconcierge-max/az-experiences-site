import Link from "next/link";
import { contactHref } from "@/lib/site";

/** Barre fixe mobile : « Demande privée » et WhatsApp. Discrète, toujours là. */
export function MobileBar({ locale, requestLabel }: { locale: string; requestLabel: string }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-stretch gap-px border-t border-laiton/30 bg-nuit md:hidden">
      <Link
        href={`/${locale}/contact`}
        className="flex-1 py-4 text-center text-[0.85rem] font-normal text-lin"
      >
        {requestLabel}
      </Link>
      <a
        href={contactHref("Bonjour, je souhaite faire une demande.")}
        aria-label="WhatsApp"
        className="flex w-16 items-center justify-center border-l border-lin/10"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-laiton-clair" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.1 4c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.4 3.9 2.1.9 2.6.7 3 .7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.5-.3-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.1-.2 0-.4.1-.5l.6-.7c.1-.2.1-.3.2-.5v-.4L10.3 8c-.1-.3-.3-.3-.5-.3h-.9Z" />
        </svg>
      </a>
    </div>
  );
}
