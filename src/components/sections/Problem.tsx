import { Icon } from "@/components/icons";
import { Section } from "@/components/ui/Section";
import { problem } from "@/content";

export function Problem() {
  return (
    <Section id="problem" eyebrow={problem.eyebrow} title={problem.title} intro={problem.intro}>
      <ul className="grid gap-4 md:grid-cols-3">
        {problem.outcomes.map((o) => (
          <li
            key={o.id}
            className="t-fast group rounded-feature border border-gray-200 bg-white p-6 hover:border-brand-200 hover:shadow-md"
          >
            <span className="flex size-12 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition-transform duration-150 group-hover:scale-105">
              <Icon name={o.icon} size={22} />
            </span>
            <h3 className="mt-5 text-hmd font-semibold text-gray-950">{o.title}</h3>
            <p className="mt-1.5 text-body-lg text-gray-600">{o.body}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-body-md text-gray-600">{problem.note}</p>
    </Section>
  );
}
