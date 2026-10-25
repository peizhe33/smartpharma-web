import { ButtonLink } from "@/components/ui/Button";
import { sections } from "@/content";
import { resolveLink } from "@/lib/links";

export function FinalCta() {
  const github = resolveLink("github", "#resources");
  const demo = resolveLink("demo", "#demo");
  const contact = resolveLink("contact", "#resources");

  return (
    <section aria-labelledby="cta-title" className="on-dark bg-brand-900 text-white">
      <div className="container-page py-14 sm:py-20">
        <div className="max-w-2xl">
          <h2 id="cta-title" className="text-[clamp(30px,5vw,52px)] leading-[1.08] font-semibold tracking-[-1px]">
            {sections.finalCta.title}
          </h2>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={github.href}
              external={github.external}
              variant="inverse"
              size="lg"
              title={github.isFallback ? "GitHub URL not yet added. Opens the Resources section." : undefined}
            >
              View GitHub
            </ButtonLink>
            <ButtonLink
              href={demo.href}
              external={demo.external}
              variant="outline-inverse"
              size="lg"
              title={demo.isFallback ? "Demo video not yet added. Opens the interactive demonstration." : undefined}
            >
              Watch demo
            </ButtonLink>
            <ButtonLink
              href={contact.href}
              external={contact.external}
              variant="outline-inverse"
              size="lg"
              title={contact.isFallback ? "Contact email not yet added. Opens the Resources section." : undefined}
            >
              Contact creator
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
