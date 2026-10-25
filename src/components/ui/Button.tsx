import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "outline-inverse" | "inline";
type Size = "md" | "lg";

const base =
  "t-fast inline-flex items-center justify-center gap-2 rounded-ctrl py-2 text-center font-medium select-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  // Primary 600 (not 500) so white text meets WCAG AA. See globals.css.
  primary:
    "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-900 disabled:hover:bg-brand-700",
  secondary:
    "border border-gray-200 bg-white text-gray-950 shadow-xs hover:bg-gray-50 active:bg-gray-100",
  inverse: "bg-white text-brand-900 hover:bg-brand-50 active:bg-brand-100",
  "outline-inverse":
    "border border-white/40 bg-transparent text-white hover:bg-white/10 active:bg-white/20",
  inline: "text-brand-700 hover:text-brand-950 underline-offset-4 hover:underline px-0",
};

const sizes: Record<Size, string> = {
  // 44px touch target on small screens, tighter from lg up.
  md: "min-h-11 px-4 text-body-md lg:min-h-9",
  lg: "min-h-11 px-5 text-body-md sm:text-body-lg lg:min-h-10",
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, variants[variant], variant === "inline" ? "min-h-11 lg:min-h-9" : sizes[size], className);
}

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Open in a new tab with safe rel attributes. Inferred from the URL when omitted. */
  external?: boolean;
  /** Accessible description, e.g. when the destination is an on-page fallback. */
  title?: string;
  onClick?: () => void;
}

/** Anchor styled as a button. Handles internal anchors, mailto: and external URLs. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
  title,
  onClick,
}: ButtonLinkProps) {
  const isExternal = external ?? /^https?:\/\//i.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes(variant, size, className)}
        title={title}
        onClick={onClick}
      >
        {children}
        <ArrowUpRight size={16} aria-hidden="true" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <a href={href} className={classes(variant, size, className)} title={title} onClick={onClick}>
      {children}
    </a>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({ variant = "secondary", size = "md", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={classes(variant, size, className)} {...rest} />;
}
