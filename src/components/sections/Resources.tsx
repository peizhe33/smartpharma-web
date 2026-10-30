import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/icons";
import { Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { resources, sections } from "@/content";
import type { ProjectLink } from "@/content";
import { isExternalHref } from "@/lib/links";
import { cn } from "@/lib/cn";

const hiddenResourceIds = new Set(["linkedin", "contact"]);

export function Resources() {
  return (
    <Section id="resources" eyebrow={sections.resources.eyebrow} title={sections.resources.title}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources
          .filter((r) => !hiddenResourceIds.has(r.id))
          .map((r) => (
            <li key={r.id}>
              <ResourceCard resource={r} />
            </li>
          ))}
      </ul>
    </Section>
  );
}

function ResourceCard({ resource }: { resource: ProjectLink }) {
  const available = Boolean(resource.href);
  const body = (
    <>
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-full",
          available ? "bg-brand-50 text-brand-700" : "bg-gray-100 text-gray-600",
        )}
      >
        <Icon name={resource.icon} size={22} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-body-lg font-semibold text-gray-950">{resource.title}</span>
        {!available && (
          <span className="mt-0.5 block text-body-md text-gray-600 [overflow-wrap:anywhere]">
            Not yet available <Ph text={resource.placeholder} />
          </span>
        )}
      </span>
      {available && <ArrowUpRight size={20} className="shrink-0 text-gray-600" aria-hidden="true" />}
    </>
  );

  const shell = "flex items-center gap-4 rounded-feature border bg-white p-5";

  if (!resource.href) {
    // Unavailable resources are labelled, not linked.
    return (
      <div aria-disabled="true" className={cn(shell, "border-dashed border-gray-300 bg-gray-25")}>
        {body}
      </div>
    );
  }

  const external = isExternalHref(resource.href);
  return (
    <a
      href={resource.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(shell, "t-fast border-gray-200 hover:border-brand-300 hover:shadow-md")}
    >
      {body}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  );
}
