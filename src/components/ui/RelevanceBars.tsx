import { cn } from "@/lib/cn";

export type RelevanceLevel = "high" | "medium" | "low";

export const relevanceLabel: Record<RelevanceLevel, string> = {
  high: "High relevance",
  medium: "Medium relevance",
  low: "Low relevance",
};

const filled: Record<RelevanceLevel, number> = { high: 3, medium: 2, low: 1 };

/** Three-step relevance glyph. Always pair with the text label from `relevanceLabel`. */
export function RelevanceBars({ level, className }: { level: RelevanceLevel; className?: string }) {
  return (
    <span className={cn("inline-flex items-end gap-0.5", className)} aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span
          key={n}
          className={cn(
            "w-1.5 rounded-sm",
            n === 1 ? "h-2" : n === 2 ? "h-3" : "h-4",
            n <= filled[level] ? "bg-brand-600" : "bg-gray-300",
          )}
        />
      ))}
    </span>
  );
}
