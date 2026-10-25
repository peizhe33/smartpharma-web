import { Icon } from "@/components/icons";
import { Section } from "@/components/ui/Section";

export function Problem() {
  return (
    <Section
      id="problem"
      eyebrow="The problem"
      title="Medication checks are scattered across disconnected systems."
      intro="Pharmacists must assemble the patient context, prescription, laboratory results, allergies, and clinical guidance before an order can be safely reviewed."
      className="[&_header]:mb-6 [&_header]:max-w-[1000px] [&_h2]:text-[clamp(27px,4.4vw,46px)] sm:[&_header]:mb-8"
    >
      <div className="space-y-8">
        <div>
          <ul className="grid gap-6 sm:grid-cols-3">
            <li className="sm:border-r sm:border-gray-200 sm:pr-6">
              <p className="text-[clamp(32px,4vw,48px)] leading-none font-bold tracking-[-1px] text-brand-700">70.5%</p>
              <p className="mt-2 max-w-xs text-body-md leading-6 text-gray-600">
                of reported medication incidents involved prescribing errors
              </p>
            </li>
            <li className="sm:border-r sm:border-gray-200 sm:pr-6">
              <p className="text-[clamp(32px,4vw,48px)] leading-none font-bold tracking-[-1px] text-brand-700">27%+</p>
              <p className="mt-2 max-w-xs text-body-md leading-6 text-gray-600">
                of pharmacists&apos; work time went to medication review and case clerking
              </p>
            </li>
            <li>
              <p className="text-[clamp(32px,4vw,48px)] leading-none font-bold tracking-[-1px] text-brand-700">19%</p>
              <p className="mt-2 max-w-xs text-body-md leading-6 text-gray-600">
                of pharmacists&apos; work time went to recording interventions
              </p>
            </li>
          </ul>
          <p className="mt-5 text-body-md text-gray-500">
            Context statistics from published studies cited in the project report. See References for full details.
          </p>
        </div>

        <div className="flex flex-col gap-4 text-body-md lg:flex-row lg:items-center lg:gap-5">
          <div className="flex-1 rounded-card border border-dashed border-gray-300 p-3 sm:p-4">
            <p className="label-caps mb-3 text-gray-500">Separate information sources</p>
            <ul aria-label="Separate information sources" className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <li className="flex items-center gap-2 rounded-ctrl border border-gray-200 bg-gray-50 p-3">
                <Icon name="file-text" size={18} className="shrink-0 text-gray-500" />
                <span>Patient record</span>
              </li>
              <li className="flex items-center gap-2 rounded-ctrl border border-gray-300 bg-white p-3">
                <Icon name="clipboard-list" size={18} className="shrink-0 text-gray-500" />
                <span>Prescription</span>
              </li>
              <li className="flex items-center gap-2 rounded-ctrl border border-gray-200 bg-gray-50 p-3">
                <Icon name="flask" size={18} className="shrink-0 text-gray-500" />
                <span>Lab results</span>
              </li>
              <li className="flex items-center gap-2 rounded-ctrl border border-gray-300 bg-white p-3">
                <Icon name="shield-check" size={18} className="shrink-0 text-gray-500" />
                <span>Allergy history</span>
              </li>
              <li className="flex items-center gap-2 rounded-ctrl border border-gray-200 bg-gray-50 p-3 sm:col-span-2 lg:col-span-1">
                <Icon name="book-open" size={18} className="shrink-0 text-gray-500" />
                <span>Clinical guidance</span>
              </li>
            </ul>
          </div>
          <div aria-hidden="true" className="mx-auto h-5 border-l-2 border-dashed border-gray-300 lg:h-0 lg:w-8 lg:border-l-0 lg:border-t-2" />
          <div className="flex items-center gap-2 rounded-ctrl border border-brand-200 bg-brand-50 p-4 font-semibold text-gray-950 lg:shrink-0">
            <Icon name="user-check" size={18} className="shrink-0 text-brand-700" />
            <span>Pharmacist review</span>
          </div>
        </div>

        <div className="border-t border-gray-150 pt-8">
          <p className="label-caps mb-4 text-brand-700">Our design response</p>
          <ul className="grid gap-4 md:grid-cols-3">
            {[
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
            ].map((o) => (
              <li
                key={o.title}
                className="t-fast group rounded-feature border border-gray-200 bg-white p-4 hover:border-brand-200 hover:shadow-md sm:p-5"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-150 group-hover:scale-105">
                  <Icon name={o.icon} size={20} />
                </span>
                <h3 className="mt-4 text-hmd font-semibold text-gray-950">{o.title}</h3>
                <p className="mt-1.5 text-body-lg text-gray-600">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <p className="py-2 text-body-md text-gray-600">
          Design principles are shown here. See{" "}
          <a className="font-medium text-brand-700 underline decoration-brand-200 underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700" href="#validation">
            Validation
          </a>{" "}
          for measured prototype outcomes.
        </p>
      </div>
    </Section>
  );
}
