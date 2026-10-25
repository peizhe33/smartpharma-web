import { CopyLinkButton } from "@/components/CopyLinkButton";
import { Wordmark } from "@/components/Logo";
import { Ph } from "@/components/ui/Ph";
import { footer, identity, nav, resources } from "@/content";
import { isExternalHref } from "@/lib/links";

export function SiteFooter() {
  const available = resources.filter((r) => r.href);

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-page py-10 sm:py-12">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-md text-body-md text-gray-600">{footer.disclaimer}</p>
            <div className="mt-4">
              <CopyLinkButton />
            </div>
          </div>

          <nav aria-label="Footer sections">
            <h2 className="label-caps text-gray-600">Sections</h2>
            <ul className="mt-3 space-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className="t-fast inline-flex min-h-11 items-center text-body-md text-gray-800 hover:text-brand-700 hover:underline lg:min-h-8"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer resources">
            <h2 className="label-caps text-gray-600">Resources</h2>
            <ul className="mt-3 space-y-1">
              {available.length > 0 ? (
                available.map((r) => {
                  const external = isExternalHref(r.href as string);
                  return (
                    <li key={r.id}>
                      <a
                        href={r.href as string}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="t-fast inline-flex min-h-11 items-center text-body-md text-gray-800 hover:text-brand-700 hover:underline lg:min-h-8"
                      >
                        {r.title}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    </li>
                  );
                })
              ) : (
                <li>
                  <a
                    href="#resources"
                    className="t-fast inline-flex min-h-11 items-center text-body-md text-gray-800 hover:text-brand-700 hover:underline lg:min-h-8"
                  >
                    Resources (links coming soon)
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t border-gray-150 pt-6 text-body-md text-gray-600">
          © {identity.copyrightYear} <Ph text={identity.creatorName} />. SmartPharma is a research and demonstration
          project.
        </p>
      </div>
    </footer>
  );
}
