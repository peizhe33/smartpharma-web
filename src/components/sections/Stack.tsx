import { Icon } from "@/components/icons";
import { Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { sections, stackExtras, techStack } from "@/content";
import { cn } from "@/lib/cn";

/** Technology behind the SmartPharma system: four layers, then a small strip of supporting tools. */
export function Stack() {
  return (
    <Section id="stack" eyebrow={sections.stack.eyebrow} title={sections.stack.title} intro={sections.stack.intro}>
      <ol className="grid gap-4 md:grid-cols-2 md:gap-5" aria-label="Technology layers">
        {techStack.map((group, index) => (
          <li key={group.id}>
            <section
              aria-labelledby={`stack-${group.id}`}
              className="t-fast group relative h-full overflow-hidden rounded-feature border border-gray-200 bg-white p-5 hover:border-brand-300 hover:shadow-md sm:p-6"
            >
              {/* Quiet layer number in the corner. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-2 right-4 text-[72px] leading-none font-bold tracking-[-0.04em] text-gray-100 select-none"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="relative flex size-11 items-center justify-center rounded-ctrl bg-brand-50 text-brand-700">
                <Icon name={group.icon} size={22} />
              </span>
              <h3 id={`stack-${group.id}`} className="relative mt-4 text-hmd font-semibold text-gray-950">
                {group.title}
              </h3>
              <p className="relative mt-1.5 max-w-md text-body-md text-gray-600">
                <Ph text={group.description} />
              </p>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item.name}
                    className={cn(
                      "inline-flex min-h-9 items-center gap-2 rounded-full border px-3 py-1 text-body-md",
                      item.primary
                        ? "border-brand-200 bg-brand-50 font-semibold text-brand-900"
                        : "border-gray-200 bg-gray-25 font-medium text-gray-800",
                    )}
                  >
                    <span className={item.primary ? "text-brand-700" : "text-gray-600"}>
                      <Icon name={item.icon} size={16} />
                    </span>
                    <span>
                      <Ph text={item.name} />
                      <span className="sr-only">: {item.purpose}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ol>

      {/* Supporting tools. The website is listed apart so it is not mistaken for the SmartPharma stack. */}
      <div className="mt-5 grid gap-px overflow-hidden rounded-feature border border-gray-200 bg-gray-200 md:grid-cols-3">
        {stackExtras.map((group) => (
          <section key={group.id} aria-label={group.label} className="bg-gray-50 p-4 sm:p-5">
            <p className="label-caps text-gray-600">{group.label}</p>
            <p className="mt-2 text-body-md leading-6 font-medium text-gray-800">{group.items.join(" · ")}</p>
          </section>
        ))}
      </div>
      <p className="mt-4 text-body-md text-gray-600">This website uses no analytics or third-party scripts.</p>
    </Section>
  );
}
