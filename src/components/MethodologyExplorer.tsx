"use client";

import { Info } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export interface EvaluationStage {
  id: string;
  /** Short tab label, e.g. "Phase 1A". */
  tab: string;
  /** What this stage was. */
  name: string;
  /** Sample size shown as a big number and as that many dots. */
  count: number;
  /** What the sample was made of. */
  unit: string;
  /** Label for the row under the number, e.g. "Compared with". */
  checkLabel: string;
  check: string;
  measures: string[];
}

interface Props {
  stages: EvaluationStage[];
  limits: string;
  reproducibility: string;
}

/**
 * The evaluation methodology as a stepper instead of a wall of text.
 * Select a stage to see its sample, how it was checked and what was measured.
 * Keyboard: arrow keys, Home and End move between stages.
 */
export function MethodologyExplorer({ stages, limits, reproducibility }: Props) {
  const uid = useId();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = stages[active];

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = stages.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % stages.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (index - 1 + stages.length) % stages.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <div className="rounded-card border border-gray-200 bg-white">
      <div className="p-5 sm:p-6">
        <h3 id={`${uid}-title`} className="text-hsm font-semibold text-gray-950">
          Evaluation methodology
        </h3>
        <p className="mt-1 text-body-md text-gray-600">Three test stages, then a user survey. Select a stage.</p>

        {/* Stage selector: a progress rail above four tabs. */}
        <div className="mt-5" role="tablist" aria-labelledby={`${uid}-title`} aria-orientation="horizontal">
          <div aria-hidden="true" className="mb-3 grid grid-cols-4 gap-1.5">
            {stages.map((s, i) => (
              <span
                key={s.id}
                className={cn("t-fast h-1.5 rounded-full", i <= active ? "bg-brand-600" : "bg-gray-200")}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stages.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    refs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "t-fast min-h-14 rounded-ctrl border px-3 py-2 text-left",
                    selected
                      ? "border-brand-600 bg-brand-50 text-brand-950 shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                  )}
                >
                  <span className={cn("label-caps block", selected ? "text-brand-800" : "text-gray-600")}>{s.tab}</span>
                  <span className="mt-0.5 block text-body-md leading-5 font-semibold">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected stage. Remounted on change so the dots animate in again. */}
        <div
          key={stage.id}
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${stage.id}`}
          tabIndex={0}
          className="mt-5 grid gap-6 rounded-feature bg-gray-50 p-5 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-8 sm:p-6"
        >
          <div>
            <p className="text-[clamp(48px,8vw,72px)] leading-none font-bold tracking-[-0.03em] text-brand-700">
              {stage.count}
            </p>
            <p className="mt-2 text-body-md font-medium text-gray-800">{stage.unit}</p>
            <ul aria-hidden="true" className="mt-4 grid grid-cols-10 gap-1.5">
              {Array.from({ length: stage.count }, (_, i) => (
                <li key={i} className="dot-in aspect-square rounded-full bg-brand-500" style={{ ["--i" as string]: i }} />
              ))}
            </ul>
          </div>

          <dl className="space-y-5">
            <div>
              <dt className="label-caps text-gray-600">{stage.checkLabel}</dt>
              <dd className="mt-1 text-body-lg font-semibold text-gray-950">{stage.check}</dd>
            </div>
            <div>
              <dt className="label-caps text-gray-600">Measured</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-2">
                  {stage.measures.map((m) => (
                    <li
                      key={m}
                      className="inline-flex min-h-9 items-center rounded-full border border-brand-200 bg-white px-3 py-1 text-body-md font-medium text-brand-900"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="space-y-3 border-t border-gray-150 p-5 text-body-md text-gray-600 sm:px-6">
        <p className="flex items-start gap-2">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700" />
          <span>
            <span className="font-semibold text-gray-800">Limits. </span>
            {limits}
          </span>
        </p>
        <details className="group">
          <summary className="t-fast inline-flex min-h-11 cursor-pointer items-center font-medium text-brand-700 underline-offset-4 hover:underline lg:min-h-9">
            How the numbers were calculated
          </summary>
          <p className="mt-1 max-w-2xl leading-6">{reproducibility}</p>
        </details>
      </div>
    </div>
  );
}
