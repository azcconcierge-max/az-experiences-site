import Link from "next/link";

export function Logo({
  locale,
  withWordmark = true,
}: {
  locale: string;
  withWordmark?: boolean;
}) {
  return (
    <Link
      href={`/${locale}`}
      className="group inline-flex flex-col items-center gap-1"
      aria-label="AZ Conciergerie | Accueil"
    >
      <span className="display text-3xl leading-none tracking-[-0.06em] text-ivory transition-colors duration-500 group-hover:text-gold">
        AZ
      </span>
      {withWordmark && (
        <span className="text-[0.5rem] tracking-[0.42em] text-ivory-dim uppercase">
          Conciergerie
        </span>
      )}
    </Link>
  );
}
