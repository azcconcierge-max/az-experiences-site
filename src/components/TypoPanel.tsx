/**
 * Covering typographique de la maison : monogramme AZ géant, nom du fondateur
 * et wordmark. Utilisé à la place d'une photo quand on veut de la marque pure.
 */
export function TypoPanel({ name, role }: { name: string; role: string }) {
  return (
    <div className="relative flex aspect-[3/4] max-w-md flex-col justify-between overflow-hidden border border-gold/40 bg-noir p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 80% 10%, rgba(198,166,100,0.13), transparent), radial-gradient(ellipse 70% 50% at 10% 95%, rgba(198,166,100,0.07), transparent)",
        }}
      />
      <p className="relative text-[0.6rem] tracking-[0.4em] text-ivory-dim uppercase">
        AZ Management
      </p>
      <div aria-hidden="true" className="relative select-none">
        <p className="display text-[9rem] leading-[0.85] text-gold/90 md:text-[11rem]">AZ</p>
        <div className="gold-rule mt-6 w-16" />
      </div>
      <div className="relative">
        <p className="display text-2xl text-ivory md:text-3xl">{name}</p>
        <p className="mt-2 text-[0.62rem] tracking-[0.35em] text-gold uppercase">{role}</p>
        <p className="mt-5 text-[0.6rem] tracking-[0.3em] text-ivory-dim uppercase">
          Paris · Monde
        </p>
      </div>
    </div>
  );
}
