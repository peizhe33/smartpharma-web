import { Icon } from "@/components/icons";
import { ProblemVisual } from "@/components/ProblemVisual";
import { Section } from "@/components/ui/Section";

const responses = [
  {
    icon: "search" as const,
    title: "Evidence in one view",
    body: "Relevant sources appear beside the medication order.",
  },
  {
    icon: "file-search" as const,
    title: "Every flag is traceable",
    body: "Each alert links to its supporting evidence.",
  },
  {
    icon: "list-checks" as const,
    title: "Consistent safety checks",
    body: "Deterministic rules run before the AI explanation.",
  },
];

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="Medication checks are scattered."
      intro="Before an order can be safely reviewed, a pharmacist has to piece together five separate sources."
      className="[&_header]:mb-8 sm:[&_header]:mb-10"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-14">
        {/* The numbers: one big, two supporting. */}
        <div>
          <p className="text-[clamp(64px,11vw,120px)] leading-[0.95] font-bold tracking-[-0.04em] text-brand-700">70.5%</p>
          <p className="mt-3 max-w-sm text-hsm text-gray-800">of reported medication incidents involved prescribing errors</p>

          <dl className="mt-8 grid gap-6 border-t border-gray-200 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-[clamp(32px,4vw,44px)] leading-none font-bold tracking-[-1px] text-brand-700">27%+</dt>
              <dd className="mt-2 text-body-md leading-6 text-gray-600">
                of pharmacists&apos; work time went to medication review and case clerking
              </dd>
            </div>
            <div>
              <dt className="text-[clamp(32px,4vw,44px)] leading-none font-bold tracking-[-1px] text-brand-700">19%</dt>
              <dd className="mt-2 text-body-md leading-6 text-gray-600">
                of pharmacists&apos; work time went to recording interventions
              </dd>
            </div>
          </dl>
          <p className="mt-5 text-body-md text-gray-600">Statistics from published studies cited in the technical report.</p>
        </div>

        <ProblemVisual />
      </div>

      {/* The design response. */}
      <div className="mt-14 border-t border-gray-150 pt-8 sm:mt-16">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <p className="label-caps text-brand-700">Our design response</p>
          <p className="text-body-md text-gray-600">
            Design goals, not measured results. See{" "}
            <a
              className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
              href="#validation"
            >
              Validation
            </a>
            .
          </p>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-3 md:gap-8">
          {responses.map((r) => (
            <li key={r.title} className="flex gap-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name={r.icon} size={20} />
              </span>
              <div>
                <h3 className="text-hmd font-semibold text-gray-950">{r.title}</h3>
                <p className="mt-1 text-body-lg text-gray-600">{r.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
