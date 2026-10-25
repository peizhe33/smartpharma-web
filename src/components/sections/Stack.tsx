import { Icon } from "@/components/icons";
import { Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { sections, techStack } from "@/content";

export function Stack() {
  return (
    <Section id="stack" eyebrow={sections.stack.eyebrow} title={sections.stack.title}>
      <div className="grid gap-4 md:grid-cols-2">
        {techStack.map((group) => (
          <section key={group.id} aria-labelledby={`stack-${group.id}`} className="rounded-feature border border-gray-200 bg-white p-5">
            <h3 id={`stack-${group.id}`} className="flex items-center gap-2.5 text-body-lg font-semibold text-gray-950">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name={group.icon} size={18} />
              </span>
              {group.title}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item.name}
                  className="inline-flex min-h-9 items-center gap-2 rounded-full border border-gray-200 bg-gray-25 px-3 py-1 text-body-md font-medium text-gray-800"
                >
                  <span className="text-gray-600">
                    <Icon name={item.icon} size={16} />
                  </span>
                  <Ph text={item.name} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-6 text-body-md text-gray-600">{sections.stack.siteNote}</p>
    </Section>
  );
}
