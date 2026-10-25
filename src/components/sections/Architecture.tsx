import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { architectureAudit, architectureStages, sections } from "@/content";
import { cn } from "@/lib/cn";

export function Architecture() {
  return (
    <Section
      id="architecture"
      eyebrow={sections.architecture.eyebrow}
      title={sections.architecture.title}
      intro={sections.architecture.intro}
      tone="gray"
    >
      <div className="mb-6">
        <Badge tone="green">End-to-end prototype implemented</Badge>
      </div>

      <ol
        className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-7 lg:gap-3"
        aria-label="SmartPharma workflow stages"
      >
        <div
          aria-hidden="true"
          className="absolute left-5 top-5 bottom-5 w-px bg-brand-200 sm:hidden"
        />
        <div
          aria-hidden="true"
          className="absolute left-[7%] right-[7%] top-5 hidden h-px bg-brand-200 lg:block"
        />
        {architectureStages.map((stage, index) => (
          <li
            key={stage.id}
            className={cn(
              "relative rounded-feature border bg-white p-4 shadow-sm",
              "lg:min-h-[250px]",
              stage.id === "bedside-verification" ? "border-2 border-brand-600" : "border-gray-200",
            )}
          >
            <div className="relative z-10 flex items-center gap-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full text-body-md font-semibold",
                  stage.id === "bedside-verification"
                    ? "bg-brand-700 text-white"
                    : "bg-brand-50 text-brand-800",
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <span className="text-brand-700">
                <Icon name={stage.icon} size={20} />
              </span>
            </div>
            <h3 className="mt-4 text-body-lg font-semibold text-gray-950">{stage.title}</h3>
            <p className="mt-2 text-body-md leading-6 text-gray-600">{stage.description}</p>
          </li>
        ))}
      </ol>

      <article className="mt-4 rounded-feature border border-brand-200 bg-brand-50 p-5 sm:p-6">
        <h3 className="text-body-lg font-semibold text-gray-950">{architectureAudit.title}</h3>
        <p className="mt-2 text-body-md leading-6 text-gray-700">{architectureAudit.description}</p>
      </article>
    </Section>
  );
}
