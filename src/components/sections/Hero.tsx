import { ArrowDown } from "lucide-react";
import { AnimatedWordmark } from "@/components/AnimatedWordmark";
import { FlowVisual } from "@/components/FlowVisual";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";
import { hero } from "@/content";
import { resolveLink } from "@/lib/links";

/** "Meet SmartPharma": the animated opening. Entrance and drifting colour are CSS; cursor tracking lives in the two small client components. */
export function Hero() {
  const demo = resolveLink("demo", "#demo");

  return (
    <section
      id="overview"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-56px)] items-center overflow-hidden bg-white lg:min-h-[calc(100svh-64px)]"
    >
      <HeroBackdrop />

      <div className="container-page py-14 text-center sm:py-20">
        <p className="rise label-caps text-brand-800" style={{ ["--d" as string]: 0 }}>
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-4 font-display text-[clamp(40px,12.5vw,140px)] leading-[0.95] font-semibold tracking-[-0.02em] text-gray-950"
        >
          <span
            className="rise block text-[0.4em] leading-[1.2] font-light tracking-[-0.01em] text-gray-600"
            style={{ ["--d" as string]: 150 }}
          >
            Meet
          </span>{" "}
          <AnimatedWordmark />
        </h1>

        <p
          className="rise mx-auto mt-6 max-w-xl text-body-lg text-gray-600 sm:text-hsm"
          style={{ ["--d" as string]: 520 }}
        >
          {hero.tagline}
        </p>

        <div
          className="rise mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
          style={{ ["--d" as string]: 680 }}
        >
          <ButtonLink
            href={demo.href}
            external={demo.external}
            size="lg"
            title={demo.isFallback ? "Demo video not yet added. Opens the interactive demonstration." : undefined}
          >
            {hero.primaryCta}
          </ButtonLink>
          <ButtonLink href="#workflow" variant="secondary" size="lg">
            {hero.secondaryCta}
            <ArrowDown size={16} aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="rise mt-14 sm:mt-16" style={{ ["--d" as string]: 900 }}>
          <FlowVisual />
        </div>

        <p className="rise mt-10 text-body-md text-gray-600" style={{ ["--d" as string]: 1100 }}>
          {hero.notice}
        </p>
      </div>
    </section>
  );
}
