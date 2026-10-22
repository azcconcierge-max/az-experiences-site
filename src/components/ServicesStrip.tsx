import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n";
import { services } from "@/data/services";
import { SERVICE_FRAMES, frameUniverse, universeSrc } from "@/lib/universes";

/**
 * Bande horizontale des autres services : cartes portrait 4:5 en défilement
 * naturel (snap), fondu vert en bas pour le titre. Fin des pages de détail.
 */
export function ServicesStrip({
  locale,
  exclude,
  title,
}: {
  locale: Locale;
  exclude: string;
  title: string;
}) {
  const others = services.filter((s) => s.slug !== exclude);

  return (
    <section className="nuit grain py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <p className="eyebrow mb-10">{title}</p>
      </div>
      <div data-cursor="glisser"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {others.map((service) => (
          <Link
            key={service.slug}
            href={`/${locale}/services/${service.slug}`}
            data-cursor="voir"
            className="group relative aspect-[4/5] w-[62vw] shrink-0 snap-start overflow-hidden rounded-[2px] sm:w-[36vw] lg:w-[21vw]"
          >
            <div className="photo-treated photo-brand absolute inset-0">
              {SERVICE_FRAMES[service.slug] ? (
                <Image
                  src={universeSrc(frameUniverse(SERVICE_FRAMES[service.slug]!), "540")}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 62vw, (max-width: 1024px) 36vw, 21vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ objectPosition: SERVICE_FRAMES[service.slug]!.position ?? "50% 50%" }}
                />
              ) : (
                <div className="absolute inset-0 bg-graphite" />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(13,13,12,0) 40%, rgba(13,13,12,0.85) 100%)",
                }}
              />
            </div>
            <p className="display absolute right-5 bottom-5 left-5 text-xl leading-[1.1] text-lin md:text-2xl">
              {service.title[locale]}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
