import { Info } from "lucide-react";
import { Icon } from "@/components/icons";
import { responsibleNotice, trustPrinciples } from "@/content";

export function TrustStrip() {
  return (
    <section aria-label="Responsible use" className="border-y border-gray-150 bg-white">
      <div className="container-page py-6">
        <ul className="flex flex-col items-start justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
          {trustPrinciples.map((p) => (
            <li key={p.id} className="flex items-center gap-2.5 text-body-md font-medium text-gray-800">
              <span className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                <Icon name={p.icon} size={16} />
              </span>
              {p.title}
            </li>
          ))}
        </ul>
        <p role="note" className="mt-4 flex items-start gap-2 text-body-md text-gray-600 sm:justify-center">
          <Info size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
          <span>{responsibleNotice}</span>
        </p>
      </div>
    </section>
  );
}
