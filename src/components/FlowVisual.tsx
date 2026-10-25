import { Icon } from "@/components/icons";
import type { IconKey } from "@/content";
import { cn } from "@/lib/cn";

const nodes: { id: string; label: string; icon: IconKey }[] = [
  { id: "order", label: "Order", icon: "clipboard-list" },
  { id: "evidence", label: "Evidence", icon: "book-open" },
  { id: "analysis", label: "Analysis", icon: "cpu" },
  { id: "reviewer", label: "Reviewer", icon: "user-check" },
];

/**
 * Animated four-step flow. Pure CSS: a light pulse travels along the line while
 * each step lights up in turn. Meaning is carried by the labels, so it reads
 * fine with animation off.
 */
export function FlowVisual({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-2xl", className)}>
      <ol
        className="relative grid grid-cols-4"
        aria-label="How a review flows: order, evidence, analysis, then a human reviewer decides"
      >
        {/* Track + travelling pulse, centred on the circles (56px tall, so 28px). */}
        <li aria-hidden="true" className="pointer-events-none absolute top-7 right-[12.5%] left-[12.5%] h-0.5 -translate-y-1/2">
          <span className="absolute inset-0 rounded-full bg-gray-200" />
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="flow-shine absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-brand-500 to-transparent" />
          </span>
        </li>

        {nodes.map((n, i) => {
          const isGate = n.id === "reviewer";
          return (
            <li key={n.id} className="relative flex flex-col items-center gap-3">
              <span
                className={cn(
                  "flow-node relative flex size-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white text-gray-600 shadow-sm",
                  isGate && "ring-4 ring-brand-100",
                )}
                style={{ ["--i" as string]: i }}
              >
                <Icon name={n.icon} size={24} />
              </span>
              <span className={cn("text-body-md font-medium", isGate ? "text-brand-800" : "text-gray-700")}>{n.label}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
