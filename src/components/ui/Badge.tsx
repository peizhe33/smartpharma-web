import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type Tone = "gray" | "primary" | "green" | "amber" | "red" | "purple";

/**
 * Text colours are the dark steps (700/800) so they pass 4.5:1 on their tint.
 * Badges always carry text, and callers should add an icon, so state is never
 * conveyed by colour alone.
 */
const tones: Record<Tone, string> = {
  gray: "bg-gray-100 text-gray-700 border-gray-200",
  primary: "bg-primary-50 text-primary-700 border-primary-200",
  green: "bg-green-50 text-green-800 border-green-200",
  amber: "bg-yellow-50 text-yellow-800 border-yellow-200",
  red: "bg-red-50 text-red-800 border-red-200",
  purple: "bg-purple-50 text-purple-800 border-purple-200",
};

interface BadgeProps {
  tone?: Tone;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = "gray", icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[13px] leading-5 font-medium",
        tones[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}
