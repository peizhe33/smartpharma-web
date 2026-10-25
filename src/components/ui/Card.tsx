import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** "compact" trims desktop padding for dense cards. */
  padding?: "default" | "compact";
  /** Raises elevation on hover. Only for cards that are themselves interactive. */
  interactive?: boolean;
}

export function Card({ as: Tag = "div", children, className, interactive, padding = "default" }: CardProps) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-gray-200 bg-white p-4 shadow-sm",
        padding === "compact" ? "sm:p-5" : "sm:p-6",
        interactive && "t-fast hover:shadow-md",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Small icon tile used at the top of cards. */
export function IconTile({ children, muted }: { children: ReactNode; muted?: boolean }) {
  return (
    <span
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-ctrl border",
        muted
          ? "border-gray-200 bg-gray-100 text-gray-600"
          : "border-brand-200 bg-brand-50 text-brand-700",
      )}
    >
      {children}
    </span>
  );
}
