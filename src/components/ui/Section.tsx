import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/ui/Reveal";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  /** Alternate background band. */
  tone?: "white" | "gray";
  children: ReactNode;
  className?: string;
}

/** Page section with a consistent heading block. Renders a labelled <section> landmark. */
export function Section({ id, eyebrow, title, intro, tone = "white", children, className }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={title ? titleId : undefined}
      className={cn(tone === "gray" ? "bg-gray-50" : "bg-white", className)}
    >
      <div className="container-page py-16 sm:py-24 lg:py-28">
        {(eyebrow || title || intro) && (
          <Reveal>
            <header className="mb-10 max-w-3xl sm:mb-14">
              {eyebrow && <p className="label-caps mb-4 text-brand-700">{eyebrow}</p>}
              {title && (
                <h2
                  id={titleId}
                  className="text-[clamp(30px,5vw,52px)] leading-[1.08] font-semibold tracking-[-1px] text-gray-950"
                >
                  {title}
                </h2>
              )}
              {intro && <p className="mt-4 max-w-xl text-body-lg text-gray-600">{intro}</p>}
            </header>
          </Reveal>
        )}
        <Reveal delay={100}>{children}</Reveal>
      </div>
    </section>
  );
}
