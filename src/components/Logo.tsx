import { cn } from "@/lib/cn";

/**
 * SmartPharma mark: a shield (safety), a check (verification) and a node
 * (structured data). Geometric, single-weight, legible at 24px.
 */
export function LogoMark({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        d="M12 2.5 19.5 5.5v6c0 4.4-3.1 8-7.5 10-4.4-2-7.5-5.6-7.5-10v-6L12 2.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="m8.5 12 2.5 2.5 4-4.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="10" r="1.25" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className, inverse }: { className?: string; inverse?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={inverse ? "text-white" : "text-brand-600"} />
      <span className={cn("font-display text-[21px] leading-none font-semibold tracking-[-0.02em]", inverse ? "text-white" : "text-gray-950")}>SmartPharma</span>
    </span>
  );
}
