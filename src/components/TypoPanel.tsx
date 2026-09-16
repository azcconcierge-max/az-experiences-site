import Image from "next/image";

/**
 * Panneau signature : le médaillon du kit sur fond Nuit avec grain,
 * nom du fondateur et mentions. Remplace toute version tapée du logo.
 */
export function TypoPanel({ name, role }: { name: string; role: string }) {
  return (
    <div className="nuit grain relative flex aspect-[3/4] max-w-md flex-col items-center justify-between overflow-hidden rounded-[2px] p-10 text-center">
      <p className="eyebrow">az management</p>
      <Image
        src="/brand/logos/AZ-medaillon-lin.svg"
        alt=""
        width={230}
        height={230}
        className="mx-auto"
      />
      <div>
        <p className="display text-2xl text-lin md:text-3xl">{name}</p>
        <p className="eyebrow mt-3">{role.toLowerCase()}</p>
        <p className="city mt-5 text-[0.7rem] text-lin/70">Paris</p>
      </div>
    </div>
  );
}
