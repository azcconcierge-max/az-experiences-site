import type { CSSProperties, ReactNode } from "react";

/**
 * Bloc qui apparaît à l'entrée dans l'écran : du flou au net, une légère
 * montée (classe `.reveal`, pilotée par RevealObserver). Sans JavaScript ou
 * si l'observateur échoue, le contenu reste visible (garde-fou CSS).
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`reveal ${className}`} style={{ "--d": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}
