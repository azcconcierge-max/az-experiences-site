import Link from "next/link";

export type Crumb = { href?: string; label: string };

/**
 * Fil d'Ariane des pages de détail : une barre fine en haut de l'image
 * du hero, en mention (accueil / services / yachts).
 */
export function Breadcrumb({ items, ariaLabel }: { items: Crumb[]; ariaLabel: string }) {
  return (
    <nav aria-label={ariaLabel} className="absolute inset-x-0 top-20 z-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex items-center gap-2.5 border-b border-lin/20 py-3 text-[0.72rem] font-normal lowercase tracking-[0.14em] text-lin/70">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-2.5">
              {i > 0 && <span aria-hidden="true">/</span>}
              {item.href ? (
                <Link href={item.href} className="u-line transition-colors hover:text-lin">
                  {item.label}
                </Link>
              ) : (
                <span className="text-lin">{item.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}
