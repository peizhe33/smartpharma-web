import { ArrowRight, Check, Info } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { sections } from "@/content";
import { cn } from "@/lib/cn";

const validationData = {
  phases: [
    {
      phase: "Phase 1A",
      title: "Initial guideline-based testing",
      sample: "30 simulated cases",
      description: "System outputs were compared with guideline-based reference answers.",
      items: ["Safety issue detection", "Guideline agreement", "Citation support"],
    },
    {
      phase: "Phase 1B",
      title: "System refinement and retesting",
      sample: "30 simulated cases",
      description: "The same evaluation approach was repeated after improving the system.",
      items: [
        "Safety-rule refinement",
        "Guideline-matching improvement",
        "RAG retrieval improvement",
        "Fine-tuned model output",
      ],
    },
    {
      phase: "Phase 2",
      title: "Pharmacist-reviewed validation",
      sample: "20 anonymised UMMC patient test cases",
      description: "Outputs were reviewed and validated by two UMMC pharmacists.",
      items: [],
    },
  ],
  comparisons: [
    { name: "Safety issue detection", phase1a: 60, phase1b: 91, improvement: "+31 percentage points" },
    { name: "Guideline agreement", phase1a: 56, phase1b: 85, improvement: "+29 percentage points" },
    { name: "Citation support", phase1a: 62, phase1b: 94, improvement: "+32 percentage points" },
  ],
  phase2: {
    // TODO: Verify reported alert precision of 93.1% against TP = 19 and FP = 2 before final publication.
    matrix: [
      { key: "TP", label: "Actually unsafe and correctly flagged", value: 19, tone: "bg-green-50 border-green-200" },
      { key: "FN", label: "Actually unsafe but no safety alert", value: 1, tone: "bg-red-50 border-red-200" },
      { key: "FP", label: "Actually safe but incorrectly flagged", value: 2, tone: "bg-yellow-50 border-yellow-200" },
      { key: "TN", label: "Actually safe and correctly recognised", value: 20, tone: "bg-brand-50 border-brand-200" },
    ],
    outcomes: [
      ["Unsafe prescription detection", "95.0%"],
      ["Alert precision", "93.1%"],
      ["Safe prescription recognition", "90.9%"],
      ["Critical misses", "0"],
    ],
  },
  survey: [
    ["Clinical usefulness", "4.8/5"],
    ["Ease of use", "4.6/5"],
    ["Workflow efficiency", "4.6/5"],
    ["Clinical trust", "4.4/5"],
  ],
  methodology: [
    ["Evaluation design", "Sequential three-stage prototype evaluation consisting of simulated case testing, system refinement and pharmacist-reviewed anonymised case validation."],
    ["Phase 1 dataset", "Thirty simulated guideline-based cases were used in Phase 1A. The system was refined and evaluated again using 30 simulated guideline-based cases in Phase 1B."],
    ["Reference standard", "System responses were compared with guideline-based answers during simulated testing. Phase 2 outputs were validated by two UMMC pharmacists."],
    ["Measures", "Safety issue detection, guideline agreement, citation support, average review time, unsafe prescription detection, alert precision, safe prescription recognition and target-user ratings."],
    ["Phase 2 evaluation set", "Twenty anonymised real UMMC patient test cases were used for pharmacist-reviewed prototype validation."],
    ["User evaluation", "Five UMMC medical staff assessed clinical usefulness, ease of use, workflow efficiency and clinical trust."],
    ["Evaluation limitations", "Phase 2 used a limited set of 20 anonymised test cases, while the target-user survey included five medical staff. The findings demonstrate prototype feasibility but do not establish clinical effectiveness or readiness for autonomous clinical use."],
    ["Reproducibility", "Evaluation metrics were calculated from recorded system outputs, guideline-based reference answers and pharmacist review outcomes. Personally identifiable patient information was not included in the portfolio."],
  ],
};

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

      <ol className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:gap-8" aria-label="Three-stage testing methodology">
        <div aria-hidden="true" className="absolute left-5 top-5 bottom-5 w-px bg-brand-200 lg:left-1/3 lg:right-1/3 lg:top-5 lg:bottom-auto lg:h-px lg:w-auto" />
        {validationData.phases.map((phase, index) => (
          <li key={phase.phase} className="relative rounded-feature border border-gray-200 bg-white p-5">
            {index < validationData.phases.length - 1 && (
              <ArrowRight
                aria-hidden="true"
                size={20}
                className="absolute -right-6 top-5 z-10 hidden text-brand-500 lg:block"
              />
            )}
            <div className="relative z-10 flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-body-md font-semibold text-brand-800">
                {index + 1}
              </span>
              <p className="label-caps text-brand-700">{phase.phase}</p>
            </div>
            <h3 className="mt-4 text-body-lg font-semibold text-gray-950">{phase.title}</h3>
            <p className="mt-2 font-medium text-gray-800">{phase.sample}</p>
            <p className="mt-2 text-body-md leading-6 text-gray-600">{phase.description}</p>
            {phase.items.length > 0 && (
              <ul className="mt-4 space-y-2 border-t border-gray-150 pt-4 text-body-md text-gray-700">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>

      <p className="mt-5 text-body-md text-gray-600">
        Testing progressed from controlled simulated cases to anonymised real-case evaluation, with system refinements introduced between Phase 1A and Phase 1B.
      </p>

      <section className="mt-12" aria-labelledby="performance-improvement-title">
        <h3 id="performance-improvement-title" className="text-hsm font-semibold text-gray-950">
          Performance improvement after system refinement
        </h3>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {validationData.comparisons.map((comparison) => (
            <article key={comparison.name} className="rounded-feature border border-gray-200 bg-white p-5">
              <h4 className="font-semibold text-gray-950">{comparison.name}</h4>
              <div className="mt-4 space-y-3" aria-label={`${comparison.name} comparison`}>
                {[
                  { label: "Phase 1A", value: comparison.phase1a, color: "bg-primary-500" },
                  { label: "Phase 1B", value: comparison.phase1b, color: "bg-brand-700" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between gap-3 text-body-md text-gray-700">
                      <span>{label}</span>
                      <span className="font-semibold text-gray-950">{value}%</span>
                    </div>
                    <div className="mt-1 h-2 rounded-full bg-gray-100">
                      <div className={cn("h-2 rounded-full", color)} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-body-md font-semibold text-brand-800">{comparison.improvement}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["Average review time, Phase 1A", "1 minute per case"],
            ["Average review time, Phase 1B", "15 seconds per case"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-feature border border-brand-200 bg-brand-50 p-4">
              <p className="text-body-md text-gray-700">{label}</p>
              <p className="mt-1 text-hsm font-semibold text-brand-800">{value}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-body-md text-gray-600">
          Following safety-rule, retrieval and model-output refinements, all three evaluation measures improved while average review time decreased.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="phase-2-safety-title">
        <h3 id="phase-2-safety-title" className="text-hsm font-semibold text-gray-950">Phase 2 safety evaluation</h3>
        <p className="mt-2 text-body-md text-gray-600">
          Safety performance was evaluated using 20 anonymised UMMC patient test cases reviewed by two pharmacists.
        </p>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid grid-cols-2 gap-3" aria-label="Phase 2 confusion matrix">
            {validationData.phase2.matrix.map((cell) => (
              <div key={cell.key} className={cn("rounded-feature border p-4", cell.tone)}>
                <p className="text-label font-semibold text-gray-700">{cell.key}</p>
                <p className="mt-1 text-[32px] font-bold leading-none text-gray-950">{cell.value}</p>
                <p className="mt-2 text-body-md leading-5 text-gray-700">{cell.label}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {validationData.phase2.outcomes.map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-4 rounded-ctrl border border-gray-200 bg-white p-4">
                <span className="text-body-md text-gray-700">{label}</span>
                <strong className="text-hsm text-brand-800">{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="target-user-title">
        <h3 id="target-user-title" className="text-hsm font-semibold text-gray-950">Target-user evaluation</h3>
        <p className="mt-2 text-body-md text-gray-600">Survey feedback was collected from five UMMC medical staff.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {validationData.survey.map(([label, value]) => (
            <div key={label} className="rounded-feature border border-gray-200 bg-white p-4">
              <p className="text-body-md text-gray-700">{label}</p>
              <p className="mt-2 text-hsm font-semibold text-brand-800">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-feature border-2 border-brand-300 bg-brand-50 p-5">
          <p className="text-body-md text-gray-700">UTAUT acceptance score</p>
          <p className="mt-1 text-[32px] font-bold leading-none text-brand-800">4.6/5</p>
        </div>
        <p className="mt-4 text-body-md text-gray-600">
          Results reflect a small target-user survey of five medical staff and should be interpreted as preliminary usability feedback.
        </p>
      </section>

      <section className="mt-12 rounded-card border border-gray-200 bg-white" aria-labelledby="methodology-title">
        <div className="border-b border-gray-150 p-5 sm:p-6">
          <h3 id="methodology-title" className="text-hsm font-semibold text-gray-950">Evaluation methodology</h3>
        </div>
        <dl className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
          {validationData.methodology.map(([label, value]) => (
            <div key={label}>
              <dt className="label-caps text-gray-600">{label}</dt>
              <dd className="mt-1 text-body-md leading-6 text-gray-700">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-5 flex items-start gap-2 text-body-md text-gray-600">
        <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700" />
        Prototype evaluation only; these findings do not establish clinical effectiveness or readiness for autonomous clinical use.
      </p>
    </Section>
  );
}
