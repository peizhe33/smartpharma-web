import { EvidenceExplorer } from "@/components/EvidenceExplorer";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { sections } from "@/content";

/**
 * Validation: one interactive explorer instead of five stacked blocks.
 * All figures live in src/content/validation.ts.
 */
export function Validation() {
  return (
    <Section
      id="validation"
      eyebrow={sections.validation.eyebrow}
      title={sections.validation.title}
      intro={sections.validation.intro}
      tone="white"
    >
      <Badge tone="green">Three-stage prototype evaluation completed</Badge>
      <div className="mt-8">
        <EvidenceExplorer />
      </div>
    </Section>
  );
}
