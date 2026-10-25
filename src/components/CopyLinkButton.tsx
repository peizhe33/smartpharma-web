"use client";

import { Check, Link2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type CopyState = "idle" | "copied" | "failed";

/** Copies the current page URL. Feedback is announced via a polite live region. */
export function CopyLinkButton({ className, inverse }: { className?: string; inverse?: boolean }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const flash = (next: CopyState) => {
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  const copy = async () => {
    const url = window.location.href.split("#")[0];
    try {
      await navigator.clipboard.writeText(url);
      flash("copied");
    } catch {
      flash("failed");
    }
  };

  return (
    <span className="relative inline-flex">
      <Button variant={inverse ? "outline-inverse" : "secondary"} onClick={copy} className={className}>
        {state === "copied" ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        Copy page link
      </Button>
      <span role="status" aria-live="polite" className="sr-only">
        {state === "copied" ? "Link copied" : state === "failed" ? "Could not copy. Copy the address from your browser instead." : ""}
      </span>
      {state !== "idle" && (
        <span
          aria-hidden="true"
          className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-ctrl bg-gray-950 px-3 py-1.5 text-body-md whitespace-nowrap text-white shadow-md"
        >
          {state === "copied" ? "Link copied" : "Copy failed"}
        </span>
      )}
    </span>
  );
}
