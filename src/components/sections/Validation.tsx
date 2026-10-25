import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/icons";
import { hasPlaceholder, Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { generalLimitations, metrics, methodology, projectSpecificLimitations, sections } from "@/content";
import { cn } from "@/lib/cn";

export function Validation() {
  return (
    <>
      <Section id="validation" eyebrow={sections.validation.eyebrow} title={sections.validation.title} intro={sections.validation.intro}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <li key={m.id} className="flex flex-col rounded-feature border border-gray-200 bg-white p-5">
              <h3 className="label-caps text-gray-600">{m.name}</h3>
              <p
                className={cn(
                  "mt-3 text-gray-950",
                  hasPlaceholder(m.value) ? "text-body-md font-medium" : "text-[40px] leading-[1.1] font-bold tracking-[-1px] text-brand-700",
                )}
              >
                <Ph text={m.value} />
              </p>
              <dl className="mt-4 space-y-2 border-t border-gray-150 pt-3 text-body-md">
                <div>
                  <dt className="sr-only">Test context</dt>
                  <dd className="text-gray-600">
                    <Ph text={m.context} />
                  </dd>
                </div>
                <div>
                  <dt className="sr-only">Sample / evaluation note</dt>
                  <dd className="text-gray-600">
                    <Ph text={m.sampleNote} />
                  </dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>

        <details className="group mt-6 rounded-card border border-gray-200 bg-white">
          <summary className="t-fast flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-card px-4 py-3 text-body-md font-semibold text-gray-950 hover:bg-gray-50">
            Methodology
            <ChevronDown size={20} aria-hidden="true" className="shrink-0 transition-transform duration-150 group-open:rotate-180" />
          </summary>
          <dl className="grid gap-4 border-t border-gray-150 p-4 md:grid-cols-2">
            {methodology.map((row) => (
              <div key={row.id}>
                <dt className="label-caps text-gray-600">{row.label}</dt>
                <dd className="mt-1 text-body-md text-gray-800">
                  <Ph text={row.value} />
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </Section>

      <Section id="limitations" eyebrow={sections.limitations.eyebrow} title={sections.limitations.title} tone="gray">
        <ul className="grid gap-4 md:grid-cols-2">
          {[...generalLimitations, ...projectSpecificLimitations].map((l) => (
            <li key={l.id} className="flex items-start gap-3 rounded-feature border border-gray-200 bg-white p-5">
              <span className="mt-0.5 text-yellow-800">
                <Icon name="info" size={20} />
              </span>
              <div>
                <h3 className="text-body-lg font-semibold text-gray-950">{l.title}</h3>
                <p className="mt-1 text-body-md text-gray-600">
                  <Ph text={l.body} />
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
