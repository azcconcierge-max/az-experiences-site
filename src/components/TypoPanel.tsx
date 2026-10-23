import { Monogram } from "./Logo";

/**
 * Panneau signature : le monogramme du kit sur fond noir avec grain,
 * nom du fondateur et labels. Remplace toute version tapée du logo.
 */
export function TypoPanel({ name, role }: { name: string; role: string }) {
  return (
    <div className="nuit grain relative flex aspect-[3/4] max-w-md flex-col items-center justify-between overflow-hidden p-10 text-center">
      <p className="eyebrow">AZ Management</p>
      <Monogram width={160} className="mx-auto" />
      <div>
        <p className="display text-2xl text-ivory md:text-3xl">{name}</p>
        <p className="eyebrow mt-3">{role}</p>
        <p className="city mt-5 text-[0.7rem] text-ivory/70">Paris</p>
      </div>
    </div>
  );
}
