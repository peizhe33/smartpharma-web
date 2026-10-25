import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="bg-white">
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
        <LogoMark size={40} className="text-brand-600" />
        <p className="label-caps mt-6 text-gray-600">Error 404</p>
        <h1 id="nf-title" className="mt-2 text-hxl font-semibold text-gray-950 sm:text-h2xl">
          This page could not be found.
        </h1>
        <p className="mt-3 max-w-lg text-body-lg text-gray-600">
          The address may be mistyped, or the page may have moved. SmartPharma is a single-page project site, so
          everything lives on the home page.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" size="lg">
            Back to SmartPharma
          </ButtonLink>
          <ButtonLink href="/#resources" variant="secondary" size="lg">
            Go to resources
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
