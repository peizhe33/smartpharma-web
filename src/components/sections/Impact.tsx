import Image from "next/image";
import { Icon } from "@/components/icons";
import { Card, IconTile } from "@/components/ui/Card";
import { Ph } from "@/components/ui/Ph";
import { Section } from "@/components/ui/Section";
import { contribution, recognition, sections } from "@/content";

/** "Impact" nav target: recognition and personal contribution. */
export function Impact() {
  return (
    <Section id="impact" tone="gray">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <section aria-labelledby="recognition-title">
          <p className="label-caps mb-3 text-brand-700">{sections.recognition.eyebrow}</p>
          <h2 id="recognition-title" className="text-hlg font-semibold text-gray-950 sm:text-hxl">
            {sections.recognition.title}
          </h2>

          <Card className="mt-6 rounded-feature">
            <IconTile>
              <Icon name="award" size={20} />
            </IconTile>
            <dl className="mt-4 divide-y divide-gray-150 border-t border-gray-150 text-body-md">
              {recognition.items.map((row) => (
                <div key={row.id} className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
                  <dt className="shrink-0 text-gray-600 sm:w-40">{row.label}</dt>
                  <dd className="font-medium text-gray-950">
                    <Ph text={row.value} />
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-4">
              {recognition.image ? (
                <Image
                  src={recognition.image.src}
                  alt={recognition.image.alt}
                  width={recognition.image.width}
                  height={recognition.image.height}
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="h-auto w-full rounded-ctrl border border-gray-200"
                />
              ) : (
                <div className="flex min-h-32 items-center justify-center rounded-ctrl border border-dashed border-gray-300 bg-gray-50 p-4 text-center text-body-md">
                  <Ph text={recognition.imagePlaceholder} />
                </div>
              )}
            </div>
          </Card>
        </section>

        <section aria-labelledby="contribution-title">
          <p className="label-caps mb-3 text-brand-700">{sections.contribution.eyebrow}</p>
          <h2 id="contribution-title" className="text-hlg font-semibold text-gray-950 sm:text-hxl">
            {sections.contribution.title}
          </h2>

          <Card className="mt-6 rounded-feature">
            <dl className="divide-y divide-gray-150 text-body-md">
              <div className="flex flex-col gap-0.5 pb-2.5 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-gray-600 sm:w-40">Role</dt>
                <dd className="font-medium text-gray-950">
                  <Ph text={contribution.role} />
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 py-2.5 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-gray-600 sm:w-40">Summary</dt>
                <dd className="text-gray-950">
                  <Ph text={contribution.summary} />
                </dd>
              </div>
              <div className="flex flex-col gap-0.5 pt-2.5 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-gray-600 sm:w-40">Team</dt>
                <dd className="text-gray-950">
                  <Ph text={contribution.collaborators} />
                </dd>
              </div>
            </dl>
            <h3 className="mt-5 text-body-lg font-semibold text-gray-950">Responsibilities</h3>
            <ul className="mt-2 space-y-2">
              {contribution.responsibilities.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-body-md text-gray-800">
                  <span className="mt-0.5 text-brand-700">
                    <Icon name="list-checks" size={18} />
                  </span>
                  <span>
                    <Ph text={r} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        </section>
      </div>
    </Section>
  );
}
