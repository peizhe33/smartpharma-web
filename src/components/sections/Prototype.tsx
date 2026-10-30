import Image from "next/image";
import { Info } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Ph } from "@/components/ui/Ph";
import { Reveal } from "@/components/ui/Reveal";
import { prototype } from "@/content";
import { resolveLink } from "@/lib/links";
import { PrototypeComponents } from "@/components/sections/PrototypeComponents";

/**
 * "Meet the prototype": the physical device, shown right after the hero.
 * Large front photo first, then the back and the inside with numbered pins.
 * Pins are decorative; the numbered list beneath carries the information.
 */
export function Prototype() {
  const demo = resolveLink("demo", "#demo");
  const github = resolveLink("github", "#resources");
  const { front, back, inside, components } = prototype;

  return (
    <section
      id="prototype"
      aria-labelledby="prototype-title"
      className="prototype-showcase relative isolate overflow-hidden"
    >
      <div className="prototype-atmosphere" aria-hidden="true" />
      <div className="container-page relative py-16 sm:py-24 lg:py-28">
        <Reveal>
          <header className="prototype-header mx-auto max-w-3xl text-center">
            <p className="prototype-eyebrow label-caps">{prototype.eyebrow}</p>
            <h2 id="prototype-title" className="prototype-title">
              <span className="prototype-title-intro block">Meet the</span>
              <span className="prototype-title-accent block">prototype.</span>
            </h2>
            <p className="prototype-description mx-auto mt-5 max-w-xl text-body-lg sm:text-hsm">
              <Ph text={prototype.description} />
            </p>
            <div className="prototype-actions mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <ButtonLink
                href={demo.href}
                external={demo.external}
                size="lg"
                className="prototype-primary"
                title={demo.isFallback ? "Demo video not yet added. Opens the interactive demonstration." : undefined}
              >
                Watch demo
              </ButtonLink>
              <ButtonLink href={github.href} external={github.external} variant="secondary" size="lg" className="prototype-secondary">
                View GitHub
              </ButtonLink>
            </div>
          </header>
        </Reveal>

        {/* Front: the hero shot. */}
        <Reveal delay={80} className="mt-12 sm:mt-16">
          <figure className="prototype-product mx-auto max-w-[1100px]">
            <div className="prototype-photo-shell">
              <div className="prototype-photo overflow-hidden">
                <Image
                  src={front.image.src}
                  alt={front.image.alt}
                  width={front.image.width}
                  height={front.image.height}
                  sizes="(min-width: 1200px) 1100px, 100vw"
                  priority={false}
                  className="h-auto w-full"
                />
              </div>
            </div>
            <figcaption className="prototype-caption mt-5 text-center">
              <span className="font-semibold text-gray-950">{front.caption}</span>
              <span className="prototype-caption-divider" aria-hidden="true" />
              <span className="text-gray-600">{front.detail}</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Back and inside. */}
        <div className="mx-auto mt-14 grid max-w-[1100px] gap-6 sm:mt-20 lg:grid-cols-[5fr_6fr] lg:gap-8">
          <Reveal>
            <figure className="flex h-full flex-col">
              <div className="prototype-back-panel flex flex-1 items-center justify-center rounded-[20px] border p-8 sm:rounded-[28px] sm:p-12">
                <Image
                  src={back.image.src}
                  alt={back.image.alt}
                  width={back.image.width}
                  height={back.image.height}
                  sizes="(min-width: 1024px) 440px, 90vw"
                  className="h-auto max-h-[340px] w-full max-w-[420px] object-contain drop-shadow-[0_24px_28px_rgb(14_18_27_/_0.25)]"
                />
              </div>
              <figcaption className="mt-4 text-center">
                <span className="text-body-lg font-semibold text-gray-950">{back.caption}</span>
                <span className="block text-body-md text-gray-600">{back.detail}</span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={100}>
            <figure className="flex h-full flex-col">
              <PrototypeComponents image={inside.image} components={components} />
              <figcaption className="mt-4 text-center">
                <span className="text-body-lg font-semibold text-gray-950">{inside.caption}</span>
                <span className="block text-body-md text-gray-600">{inside.detail}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <p className="prototype-notice mx-auto mt-10 flex w-fit max-w-full items-center gap-2 rounded-full border px-4 py-2 text-body-md text-gray-600">
          <Info size={16} aria-hidden="true" className="shrink-0" />
          {prototype.notice}
        </p>
      </div>
    </section>
  );
}
