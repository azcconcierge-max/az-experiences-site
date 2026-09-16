import type { Metadata } from "next";
import Image from "next/image";
import { getDict, type Locale } from "@/i18n";
import { pageAlternates } from "@/lib/seo";
import { Reveal } from "@/components/Reveal";
import { TitleReveal, LineMask } from "@/components/TitleReveal";
import { ClipReveal } from "@/components/ClipReveal";
import { PillarsPinned } from "@/components/PillarsPinned";
import { TestimonialRotator } from "@/components/TestimonialRotator";
import { AskSection } from "@/components/AskSection";
import { Filet } from "@/components/brand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const d = getDict(locale).about;
  return {
    title: { absolute: d.metaTitle },
    description: d.metaDescription,
    alternates: pageAlternates("/qui-sommes-nous", locale),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  const dict = getDict(locale);
  const d = dict.about;

  return (
    <>
      {/* ---- 1 · HERO 100svh : la maison de l'accès ---- */}
      <section className="relative flex min-h-svh items-end overflow-hidden bg-nuit">
        <div aria-hidden="true" className="photo-treated absolute inset-0 overflow-hidden">
          <div className="hero-zoom absolute inset-0">
            <Image
              src="/images/sur-mesure.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(14,36,25,0.55) 0%, rgba(14,36,25,0.15) 30%, rgba(14,36,25,0.25) 60%, #0E2419 100%)",
            }}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-20 md:px-10 md:pb-24">
          <LineMask delay={150}>
            <p className="eyebrow">{d.eyebrow}</p>
          </LineMask>
          <h1 className="display mt-5 text-[clamp(2.8rem,7.5vw,8rem)] leading-[0.98] text-lin">
            <LineMask delay={300}>
              <span className="block">{d.title}.</span>
            </LineMask>
          </h1>
          <LineMask delay={480}>
            <p className="mt-7 max-w-xl text-base leading-[1.7] font-light text-lin/85 md:text-lg">
              {d.heroPhrase}
            </p>
          </LineMask>
        </div>
      </section>

      {/* ---- 2 · MANIFESTE (lin) : une phrase, mot par mot ---- */}
      <section className="px-5 py-32 md:px-10 md:py-44">
        <div className="mx-auto max-w-[1100px] text-center">
          <TitleReveal
            text={d.manifestoShort}
            as="p"
            mode="scrub"
            className="display text-[clamp(2.2rem,6vw,6.5rem)] leading-[1.05]"
          />
        </div>
      </section>

      {/* ---- 3 · LE FONDATEUR (vert club) : portrait, trois phrases, citation ---- */}
      <section className="bg-club overflow-hidden">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ClipReveal className="photo-treated relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <Image
              src="/images/fondateur.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </ClipReveal>
          <div>
            <p className="eyebrow mb-6">{d.founder.eyebrow}</p>
            <h2 className="display text-4xl text-lin md:text-6xl">{d.founder.name}</h2>
            <p className="mt-3 text-[0.8rem] font-normal lowercase tracking-[0.12em] text-laiton-clair">
              {d.founder.role} · AZ Management
            </p>
            <div className="mt-9 flex flex-col gap-4 text-lg leading-[1.6] font-light text-lin/85">
              {d.founderShort.map((phrase) => (
                <p key={phrase}>{phrase}</p>
              ))}
            </div>
            <p className="display mt-10 border-l border-laiton pl-6 text-2xl leading-[1.35] text-laiton-clair md:text-3xl">
              {d.founder.quote}
            </p>

            {/* Le récit complet, replié (conservé intact) */}
            <details className="group mt-10">
              <summary className="eyebrow cursor-pointer list-none transition-opacity hover:opacity-70 [&::-webkit-details-marker]:hidden">
                <span className="mr-2 inline-block transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
                {d.readStory}
              </summary>
              <div className="mt-7 flex max-w-[62ch] flex-col gap-5 text-base leading-[1.7] font-light text-lin/80">
                <p>{d.founder.p1}</p>
                <p>{d.founder.p2}</p>
                <p>{d.founder.p3}</p>
                <p>{d.soldout.text}</p>
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ---- 4 · LES PILIERS (vert nuit) : I → IV épinglés, chiffres dessous ---- */}
      <section className="nuit grain">
        <div className="mx-auto max-w-[1440px] px-5 pt-24 md:px-10 md:pt-32">
          <p className="eyebrow mb-5">{d.pillarsEyebrow}</p>
          <PillarsPinned pillars={d.pillars} />

          {/* Les chiffres de la maison */}
          <div className="pt-20 pb-24 md:pt-24 md:pb-32">
            <Filet className="mb-14" />
            <Reveal className="grid gap-10 text-center sm:grid-cols-3">
              {d.stats.map((stat) => (
                <p key={stat} className="display text-4xl text-lin md:text-5xl">
                  {stat}
                </p>
              ))}
            </Reveal>
            <Reveal delay={150}>
              <p className="mx-auto mt-12 max-w-[60ch] text-center text-sm leading-[1.7] font-light text-lin/70">
                {d.closing}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- 5 · TÉMOIGNAGE en grand (vert club) ---- */}
      <section className="bg-club px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow mb-12">{dict.home.avisEyebrow}</p>
          </Reveal>
          <TestimonialRotator locale={locale} />
          <Reveal delay={150}>
            <p className="mt-12 text-[0.8rem] font-light text-lin/60">{dict.home.avisNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- 6 · DEMANDE PRIVÉE partagée ---- */}
      <AskSection locale={locale} dict={dict} />
    </>
  );
}
