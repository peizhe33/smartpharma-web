"use client";

import { RotateCcw } from "lucide-react";
import { useEffect } from "react";
import { LogoMark } from "@/components/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Logged locally in the browser only. No error reporting service is configured.
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="err-title" className="bg-white">
      <div className="container-page flex min-h-[60vh] flex-col items-start justify-center py-16">
        <LogoMark size={40} className="text-brand-600" />
        <p className="label-caps mt-6 text-gray-600">Something went wrong</p>
        <h1 id="err-title" className="mt-2 text-hxl font-semibold text-gray-950 sm:text-h2xl">
          This section could not be displayed.
        </h1>
        <p className="mt-3 max-w-lg text-body-lg text-gray-600">
          An unexpected error occurred while rendering the page. You can try again, or return to the top of the site.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button variant="primary" size="lg" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            Try again
          </Button>
          <ButtonLink href="/" variant="secondary" size="lg">
            Back to SmartPharma
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
