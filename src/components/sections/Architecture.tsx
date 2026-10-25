import { ChevronDown } from "lucide-react";
import { Icon } from "@/components/icons";
import { Badge, type Tone } from "@/components/ui/Badge";
import { Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { architectureLayers, architectureNodes, sections, statusMeta } from "@/content";
import type { IconKey, ImplementationStatus } from "@/content";
import { cn } from "@/lib/cn";

const statusStyle: Record<ImplementationStatus, { tone: Tone; icon: IconKey }> = {
  implemented: { tone: "green", icon: "shield-check" },
  simulated: { tone: "purple", icon: "layers" },
  evaluated: { tone: "primary", icon: "bar-chart" },
  proposed: { tone: "gray", icon: "clock" },
  unconfirmed: { tone: "amber", icon: "info" },
};

const statusOrder: ImplementationStatus[] = ["implemented", "simulated", "evaluated", "proposed", "unconfirmed"];

function StatusBadge({ status }: { status: ImplementationStatus }) {
  const s = statusStyle[status];
  return (
    <Badge tone={s.tone} icon={<Icon name={s.icon} size={14} />}>
      {status === "unconfirmed" ? <Ph text={statusMeta[status].label} /> : statusMeta[status].label}
    </Badge>
  );
}

export function Architecture() {
  return (
    <Section id="architecture" eyebrow={sections.architecture.eyebrow} title={sections.architecture.title} tone="gray">
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="System layers, in order of data flow">
        {architectureLayers.map((layer) => {
          const nodes = architectureNodes.filter((n) => n.layerId === layer.id);
          const isReview = layer.id === "review";
          return (
            <li
              key={layer.id}
              className={cn(
                "t-fast rounded-feature border bg-white p-5 hover:shadow-md",
                isReview ? "border-2 border-brand-600 sm:col-span-2 lg:col-span-1" : "border-gray-200",
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-full text-body-md font-semibold",
                    isReview ? "bg-brand-700 text-white" : "bg-brand-50 text-brand-800",
                  )}
                  aria-hidden="true"
                >
                  {layer.index}
                </span>
                <h3 className="text-body-lg font-semibold text-gray-950">
                  <span className="sr-only">Layer {layer.index}: </span>
                  {layer.name}
                </h3>
              </div>
              <ul className="mt-4 space-y-3">
                {nodes.map((n) => (
                  <li key={n.id} className="space-y-1.5">
                    <p className="flex items-center gap-2 text-body-md font-medium text-gray-800">
                      <span className="text-brand-700">
                        <Icon name={n.icon} size={18} />
                      </span>
                      {n.name}
                    </p>
                    <StatusBadge status={n.status} />
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ol>

      <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Status legend">
        {statusOrder.map((s) => (
          <li key={s}>
            <StatusBadge status={s} />
          </li>
        ))}
      </ul>

      {/* Technical details: native disclosure, works without JavaScript and is keyboard accessible. */}
      <details className="group mt-6 rounded-card border border-gray-200 bg-white">
        <summary className="t-fast flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-card px-4 py-3 text-body-md font-semibold text-gray-950 hover:bg-gray-50">
          Technical details
          <ChevronDown size={20} aria-hidden="true" className="shrink-0 transition-transform duration-150 group-open:rotate-180" />
        </summary>
        <dl className="grid gap-3 border-t border-gray-150 p-4 md:grid-cols-2">
          {architectureNodes.map((n) => (
            <div key={n.id} className="rounded-ctrl border border-gray-200 p-3">
              <dt className="flex flex-wrap items-center justify-between gap-2 text-body-md font-semibold text-gray-950">
                {n.name}
                <StatusBadge status={n.status} />
              </dt>
              <dd className="mt-2 text-body-md text-gray-600">{n.role}</dd>
              <dd className="mt-1 text-body-md text-gray-800">
                <Ph text={n.technicalDetail} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="border-t border-gray-150 p-4 text-body-md text-gray-600">
          {statusOrder
            .filter((s) => s !== "unconfirmed")
            .map((s) => `${statusMeta[s].label}: ${statusMeta[s].description}`)
            .join(" ")}
        </p>
      </details>
    </Section>
  );
}
