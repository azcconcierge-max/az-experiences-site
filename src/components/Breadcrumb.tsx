import Link from "next/link";

export type Crumb = { href?: string; label: string };

/**
 * Fil d'Ariane des pages de détail, en label, en haut de l'illustration
 * du hero (accueil / services / yachts).
 */
export function Breadcrumb({ items, ariaLabel }: { items: Crumb[]; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className="absolute inset-x-0 top-20 z-20">
      <div className="wrap">
        <div className="label flex flex-wrap items-center gap-2.5 py-3 text-ivory/75">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="u-line transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              ) : (
                <span className="text-ivory">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
