import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/icons";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { workflow } from "@/content";
import { cn } from "@/lib/cn";

export function Workflow() {
  return (
    <Section id="workflow" eyebrow={workflow.eyebrow} title={workflow.title} tone="gray">
      <ol className="grid gap-4 lg:grid-cols-4">
        {workflow.steps.map((step, i) => {
          const isGate = "isHumanGate" in step && step.isHumanGate;
          return (
            <li
              key={step.id}
              className={cn(
                "relative rounded-feature border bg-white p-6",
                isGate ? "border-2 border-brand-600 shadow-md" : "border-gray-200",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "relative flex size-14 items-center justify-center rounded-full border-2",
                    isGate ? "border-brand-600 bg-brand-700 text-white" : "border-gray-200 bg-white text-brand-700",
                  )}
                >
                  <Icon name={step.icon} size={24} />
                </span>
                <span className="text-hxl font-semibold text-gray-500" aria-hidden="true">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 text-hmd font-semibold text-gray-950">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-1.5 text-body-lg text-gray-600">{step.summary}</p>
              {isGate && (
                <Badge tone="green" icon={<Icon name="user-check" size={14} />} className="mt-4">
                  {workflow.gateLabel}
                </Badge>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-5 text-center text-body-lg font-medium text-brand-800">{workflow.gateBody}</p>

      <details className="group mt-6 rounded-card border border-gray-200 bg-white">
        <summary className="t-fast flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-card px-4 py-3 text-body-md font-semibold text-gray-950 hover:bg-gray-50">
          {workflow.detailsLabel}
          <ChevronDown size={20} aria-hidden="true" className="shrink-0 transition-transform duration-150 group-open:rotate-180" />
        </summary>
        <div className="grid gap-4 border-t border-gray-150 p-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.steps.map((step, i) => (
            <dl key={step.id} className="space-y-3 text-body-md">
              <dt className="font-semibold text-gray-950">
                {i + 1}. {step.title}
              </dt>
              <dd>
                <span className="label-caps block text-gray-600">Input</span>
                <span className="text-gray-800">{step.input}</span>
              </dd>
              <dd>
                <span className="label-caps block text-gray-600">System action</span>
                <span className="text-gray-800">{step.action}</span>
              </dd>
              <dd>
                <span className="label-caps block text-gray-600">Output</span>
                <span className="text-gray-800">{step.output}</span>
              </dd>
            </dl>
          ))}
        </div>
      </details>
    </Section>
  );
}
