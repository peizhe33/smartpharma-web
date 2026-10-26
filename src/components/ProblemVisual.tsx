"use client";

import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { IconKey } from "@/content";
import { cn } from "@/lib/cn";

interface Source {
  id: string;
  label: string;
  icon: IconKey;
  /** Where the tile sits when the sources are scattered (percent of the stage). */
  scatter: { left: number; top: number; rotate: number };
  /** Row it moves to when everything is in one view. */
  row: number;
}

const sources: Source[] = [
  { id: "record", label: "Patient record", icon: "file-text", scatter: { left: 2, top: 4, rotate: -3 }, row: 0 },
  { id: "rx", label: "Prescription", icon: "clipboard-list", scatter: { left: 40, top: 17, rotate: 2.5 }, row: 1 },
  { id: "lab", label: "Lab results", icon: "flask", scatter: { left: 3, top: 31, rotate: 2 }, row: 2 },
  { id: "allergy", label: "Allergy history", icon: "shield-check", scatter: { left: 39, top: 46, rotate: -2.5 }, row: 3 },
  { id: "guidance", label: "Clinical guidance", icon: "book-open", scatter: { left: 20, top: 62, rotate: 3 }, row: 4 },
];

const ROW_TOP = [14, 27.5, 41, 54.5, 68];

/**
 * "Today" versus "With SmartPharma": five separate sources slide into one view.
 * Plays once when it scrolls into view, then the buttons take over.
 */
export function ProblemVisual() {
  const stageRef = useRef<HTMLDivElement>(null);
  const touched = useRef(false);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setJoined(true);
        }, 1600);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  function choose(next: boolean) {
    touched.current = true;
    setJoined(next);
  }

  return (
    <div>
      <div role="group" aria-label="Choose a view" className="inline-flex rounded-ctrl border border-gray-200 bg-white p-1 shadow-xs">
        {[
          { value: false, label: "Today" },
          { value: true, label: "With SmartPharma" },
        ].map((o) => (
          <button
            key={o.label}
            type="button"
            aria-pressed={joined === o.value}
            onClick={() => choose(o.value)}
            className={cn(
              "t-fast min-h-11 rounded-[8px] px-4 text-body-md font-medium lg:min-h-9",
              joined === o.value ? "bg-brand-700 text-white" : "text-gray-700 hover:bg-gray-100",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>

      <div
        ref={stageRef}
        className="relative mt-4 h-[440px] overflow-hidden rounded-feature border border-gray-200 bg-gray-50 sm:h-[420px]"
      >
        {/* The single view the sources slide into. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-[3%] left-[6%] h-[80%] w-[88%] rounded-card border border-brand-200 bg-brand-50 transition-opacity duration-700 motion-reduce:transition-none",
            joined ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="label-caps absolute top-3 left-4 text-brand-800">One view</p>
        </div>

        <ul aria-label="Information sources">
          {sources.map((s, i) => {
            const pos = joined
              ? { left: 12, top: ROW_TOP[s.row], width: 76, rotate: 0 }
              : { left: s.scatter.left, top: s.scatter.top, width: 58, rotate: s.scatter.rotate };
            return (
              <li
                key={s.id}
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  width: `${pos.width}%`,
                  transform: `rotate(${pos.rotate}deg)`,
                  transitionDelay: `${i * 70}ms`,
                }}
                className={cn(
                  "absolute flex items-center gap-2 rounded-ctrl border bg-white p-2.5 text-body-md font-medium text-gray-950 shadow-sm",
                  "transition-[left,top,width,transform,border-color,padding] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                  joined ? "border-brand-300 pr-9" : "border-gray-300",
                )}
              >
                <Icon name={s.icon} size={18} className={cn("shrink-0", joined ? "text-brand-700" : "text-gray-500")} />
                <span className="min-w-0 truncate">{s.label}</span>
                <Check
                  size={16}
                  aria-hidden="true"
                  className={cn("absolute top-1/2 right-3 -translate-y-1/2 text-brand-700 transition-opacity duration-500 motion-reduce:transition-none", joined ? "opacity-100" : "opacity-0")}
                />
              </li>
            );
          })}
        </ul>

        {/* Link to the pharmacist. */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute top-[83%] left-1/2 h-[6%] -translate-x-px border-l-2 transition-colors duration-700 motion-reduce:transition-none",
            joined ? "border-solid border-brand-600" : "border-dashed border-gray-400",
          )}
        />
        <div
          className={cn(
            "absolute top-[89%] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-ctrl border px-4 py-2 text-body-md font-semibold whitespace-nowrap text-gray-950 transition-colors duration-700 motion-reduce:transition-none",
            joined ? "border-brand-300 bg-brand-50" : "border-gray-300 bg-white",
          )}
        >
          <Icon name="user-check" size={18} className="text-brand-700" />
          Pharmacist review
        </div>
      </div>

      <p aria-live="polite" className="mt-3 text-body-md text-gray-600">
        {joined
          ? "One view. Relevant sources sit beside the order, and the pharmacist decides."
          : "Five separate sources, checked one by one before an order can be reviewed."}
      </p>
    </div>
  );
}
