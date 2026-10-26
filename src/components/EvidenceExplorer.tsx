"use client";

import { Check, ChevronLeft, ChevronRight, Info, Pause, Play, RotateCcw, X } from "lucide-react";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import {
  phase2Metrics,
  phase2Results,
  refinementMetrics,
  refinements,
  reviewTime,
  survey,
  validationLimits,
  validationMethod,
  validationStages,
  type ResultKey,
  type ValidationStage,
} from "@/content";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/* Motion helpers                                                             */
/* -------------------------------------------------------------------------- */

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);

/** Counts from 0 to `target` when mounted. Jumps straight to the value with reduced motion. */
function useCountUp(target: number, reduced: boolean, duration = 1000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(target * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, reduced, duration]);
  return reduced ? target : value;
}

function Count({ value, decimals = 0, suffix = "", reduced }: { value: number; decimals?: number; suffix?: string; reduced: boolean }) {
  const shown = useCountUp(value, reduced);
  return (
    <span className="tabular-nums">
      {shown.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Small pieces                                                               */
/* -------------------------------------------------------------------------- */

function Dots({ count }: { count: number }) {
  return (
    <ul aria-hidden="true" className="mt-4 grid max-w-[260px] grid-cols-10 gap-1.5">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="dot-in aspect-square rounded-full bg-brand-500" style={{ ["--i" as string]: i }} />
      ))}
    </ul>
  );
}

function SampleColumn({ stage }: { stage: ValidationStage }) {
  return (
    <div key={stage.id}>
      <p className="text-[clamp(48px,8vw,72px)] leading-none font-bold tracking-[-0.03em] text-brand-700">{stage.count}</p>
      <p className="mt-2 text-body-md font-medium text-gray-800">{stage.unit}</p>
      <Dots count={stage.count} />
      <div className="mt-5 border-t border-gray-200 pt-4">
        <p className="label-caps text-gray-600">{stage.checkLabel}</p>
        <p className="mt-1 text-body-md font-semibold text-gray-950">{stage.check}</p>
      </div>
    </div>
  );
}

const formatSeconds = (s: number) => (s >= 59.5 ? "1 minute" : `${Math.round(s)} seconds`);

/* -------------------------------------------------------------------------- */
/* Phase 1A / 1B: the before-and-after slider                                 */
/* -------------------------------------------------------------------------- */

function ComparePanel({
  t,
  onScrub,
  showRefinements,
}: {
  t: number;
  onScrub: (value: number) => void;
  showRefinements: boolean;
}) {
  const sliderId = useId();
  const seconds = reviewTime.beforeSeconds + (reviewTime.afterSeconds - reviewTime.beforeSeconds) * t;
  const percent = Math.round(t * 100);
  const valueText =
    percent === 0 ? "Phase 1A results" : percent === 100 ? "Phase 1B results" : `${percent}% of the way from Phase 1A to Phase 1B`;

  return (
    <div>
      <div className="space-y-5">
        {refinementMetrics.map((m) => {
          const value = m.before + (m.after - m.before) * t;
          return (
            <div key={m.id} aria-hidden="true">
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-body-md font-medium text-gray-800">{m.label}</span>
                <span className="flex items-baseline gap-2">
                  <span
                    className={cn(
                      "rounded-full bg-brand-100 px-2 py-0.5 text-label font-semibold text-brand-900 transition-opacity",
                      t < 0.03 && "opacity-0",
                    )}
                  >
                    +{Math.round((m.after - m.before) * t)} pts
                  </span>
                  <span className="text-hsm font-bold text-gray-950 tabular-nums">{Math.round(value)}%</span>
                </span>
              </div>
              <div className="relative mt-2 h-3 rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${value}%`,
                    background: `color-mix(in oklab, var(--color-brand-600) ${t * 100}%, var(--color-primary-500))`,
                  }}
                />
                {/* Where Phase 1A started. */}
                <span
                  title={`Phase 1A: ${m.before}%`}
                  className="absolute top-1/2 h-5 w-0.5 -translate-y-1/2 rounded bg-gray-950/60"
                  style={{ left: `${m.before}%` }}
                />
              </div>
            </div>
          );
        })}

        <div aria-hidden="true">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-body-md font-medium text-gray-800">{reviewTime.label}</span>
            <span className="flex items-baseline gap-2">
              <span
                className={cn(
                  "rounded-full bg-brand-100 px-2 py-0.5 text-label font-semibold text-brand-900 transition-opacity",
                  t < 0.03 && "opacity-0",
                )}
              >
                {Math.round(reviewTime.beforeSeconds - seconds)} s faster
              </span>
              <span className="text-hsm font-bold text-gray-950 tabular-nums">{formatSeconds(seconds)}</span>
            </span>
          </div>
          <div className="mt-2 h-3 rounded-full bg-gray-200">
            <div
              className="h-full rounded-full"
              style={{
                width: `${(seconds / reviewTime.beforeSeconds) * 100}%`,
                background: `color-mix(in oklab, var(--color-brand-600) ${t * 100}%, var(--color-primary-500))`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Screen readers get the result as a sentence instead of animated bars. */}
      <ul className="sr-only">
        {refinementMetrics.map((m) => (
          <li key={m.id}>
            {m.label}: {m.before}% in Phase 1A, {m.after}% in Phase 1B.
          </li>
        ))}
        <li>
          {reviewTime.label}: {formatSeconds(reviewTime.beforeSeconds)} in Phase 1A, {formatSeconds(reviewTime.afterSeconds)} in Phase 1B.
        </li>
      </ul>

      <div className="mt-6 rounded-ctrl border border-gray-200 bg-white p-4">
        <label htmlFor={sliderId} className="flex items-center justify-between text-body-md font-semibold text-gray-950">
          <span>Drag to compare</span>
          <span className="text-label font-medium text-gray-600">{valueText}</span>
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          step={1}
          value={percent}
          aria-valuetext={valueText}
          onChange={(e) => onScrub(Number(e.target.value) / 100)}
          className="mt-3 h-6 w-full cursor-pointer accent-brand-700"
        />
        <div className="mt-1 flex justify-between text-label font-semibold text-gray-700">
          <span>Phase 1A</span>
          <span>Phase 1B</span>
        </div>
      </div>

      {showRefinements && (
        <div className="mt-5">
          <p className="label-caps text-gray-600">What changed in 1B</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {refinements.map((r) => (
              <li
                key={r}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-brand-200 bg-white px-3 py-1 text-body-md font-medium text-brand-900"
              >
                <Check size={14} aria-hidden="true" className="text-brand-700" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Phase 2: result mosaic                                                     */
/* -------------------------------------------------------------------------- */

const squareStyle: Record<ResultKey, string> = {
  TP: "bg-brand-700 text-white",
  FN: "bg-red-600 text-white",
  FP: "border border-yellow-500 bg-yellow-200 text-yellow-800",
  TN: "border border-brand-300 bg-brand-100 text-brand-800",
};

const tileStyle: Record<ResultKey, string> = {
  TP: "border-brand-200 bg-brand-50",
  FN: "border-red-200 bg-red-50",
  FP: "border-yellow-200 bg-yellow-50",
  TN: "border-gray-200 bg-white",
};

function Glyph({ k }: { k: ResultKey }) {
  if (k === "FN") return <span className="text-[14px] leading-none font-bold">!</span>;
  if (k === "FP") return <X size={14} strokeWidth={3} />;
  return <Check size={14} strokeWidth={3} />;
}

function Phase2Panel({ reduced }: { reduced: boolean }) {
  const [selected, setSelected] = useState<ResultKey | null>(null);
  const squares = phase2Results.flatMap((r) => Array.from({ length: r.count }, () => r.key));
  const active = phase2Results.find((r) => r.key === selected);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-[minmax(0,280px)_1fr] sm:items-start">
        <div aria-hidden="true" className="grid w-full max-w-[280px] grid-cols-7 gap-1.5">
          {squares.map((k, i) => (
            <span
              key={i}
              className={cn(
                "dot-in flex aspect-square items-center justify-center rounded-md transition-[opacity,transform] duration-200",
                squareStyle[k],
                selected && selected !== k && "scale-90 opacity-25",
                selected === k && "scale-105 ring-2 ring-gray-950/70",
              )}
              style={{ ["--i" as string]: i }}
            >
              <Glyph k={k} />
            </span>
          ))}
        </div>

        <div>
          <p className="text-body-md text-gray-600">Select a result type to highlight it.</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {phase2Results.map((r) => {
              const on = selected === r.key;
              return (
                <li key={r.key}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelected(on ? null : r.key)}
                    className={cn(
                      "t-fast h-full w-full rounded-ctrl border p-3 text-left hover:shadow-sm",
                      tileStyle[r.key],
                      on && "ring-2 ring-brand-700",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true" className={cn("flex size-6 items-center justify-center rounded", squareStyle[r.key])}>
                        <Glyph k={r.key} />
                      </span>
                      <span className="label-caps text-gray-700">{r.key}</span>
                    </span>
                    <span className="mt-1 block text-hlg leading-none font-bold text-gray-950">
                      <Count value={r.count} reduced={reduced} />
                    </span>
                    <span className="mt-1.5 block text-body-md leading-5 text-gray-700">{r.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <p role="status" className="sr-only">
            {active ? `${active.key}: ${active.count}. ${active.label}.` : ""}
          </p>
        </div>
      </div>

      <ul className="mt-6 grid grid-cols-2 gap-3 xl:grid-cols-4">
        {phase2Metrics.map((m) => (
          <li key={m.label} className="rounded-ctrl border border-gray-200 bg-white p-4">
            <p className="text-hlg leading-none font-bold text-brand-800">
              <Count value={m.value} decimals={m.decimals} suffix={m.suffix} reduced={reduced} />
            </p>
            <p className="mt-2 text-body-md leading-5 text-gray-700">{m.label}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Survey                                                                     */
/* -------------------------------------------------------------------------- */

function Rating({ label, score, reduced }: { label: string; score: number; reduced: boolean }) {
  const shown = useCountUp(score, reduced);
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-body-md font-medium text-gray-800">{label}</span>
        <span className="text-hsm font-bold text-gray-950 tabular-nums">
          {shown.toFixed(1)}
          <span className="text-body-md font-medium text-gray-600">/{survey.scale}</span>
        </span>
      </div>
      <div aria-hidden="true" className="relative mt-2 h-3 overflow-hidden rounded-full bg-gray-200">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${(shown / survey.scale) * 100}%` }} />
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${(n / survey.scale) * 100}%` }} />
        ))}
      </div>
    </li>
  );
}

function SurveyPanel({ reduced }: { reduced: boolean }) {
  const score = useCountUp(survey.utaut.score, reduced, 1200);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-center lg:h-full lg:content-center">
      <ul className="space-y-5">
        {survey.ratings.map((r) => (
          <Rating key={r.label} label={r.label} score={r.score} reduced={reduced} />
        ))}
      </ul>
      <div className="mx-auto flex flex-col items-center sm:mx-0">
        <div className="relative size-36">
          <svg viewBox="0 0 120 120" aria-hidden="true" className="size-full -rotate-90">
            <circle cx="60" cy="60" r={radius} fill="none" strokeWidth="10" className="stroke-gray-200" />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="10"
              strokeLinecap="round"
              className="stroke-brand-600"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - score / survey.scale)}
            />
          </svg>
          <p className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-h2xl leading-none font-bold text-brand-800 tabular-nums">{score.toFixed(1)}</span>
            <span className="text-body-md text-gray-600">out of {survey.scale}</span>
          </p>
        </div>
        <p className="mt-2 text-center text-body-md font-semibold text-gray-950">{survey.utaut.label}</p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Explorer                                                                   */
/* -------------------------------------------------------------------------- */

const STEP_MS = 7000;

export function EvidenceExplorer() {
  const uid = useId();
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const userRef = useRef(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const last = validationStages.length - 1;
  const current = validationStages[stage];

  const applyT = (value: number) => {
    tRef.current = value;
    setT(value);
  };

  // Phase 1A and 1B share one panel: the slider glides to the stage you picked.
  useEffect(() => {
    if (stage > 1) return;
    const goal = stage === 1 ? 1 : 0;
    const from = tRef.current;
    userRef.current = false;
    let raf = 0;
    if (reduced) {
      raf = requestAnimationFrame(() => applyT(goal));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (now: number) => {
      if (userRef.current) return;
      const p = Math.min(1, (now - start) / 1100);
      applyT(from + (goal - from) * easeOut(p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, reduced]);

  // Walkthrough: moves on every few seconds, stops at the end or when you take over.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (stage >= last) setPlaying(false);
      else setStage(stage + 1);
    }, STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, stage, last]);

  function select(index: number) {
    setPlaying(false);
    setStage(index);
  }

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (stage >= last) setStage(0);
    setPlaying(true);
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % validationStages.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (index - 1 + validationStages.length) % validationStages.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  const panelGroup = stage <= 1 ? "compare" : current.id;
  const next = validationStages[stage + 1];

  return (
    <div className="rounded-card border border-gray-200 bg-white">
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p id={`${uid}-hint`} className="text-body-md text-gray-600">
            Select a stage, or play the walkthrough.
          </p>
          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={playing}
            className="t-fast inline-flex min-h-11 items-center gap-2 rounded-ctrl border border-gray-200 bg-white px-4 text-body-md font-medium text-gray-950 shadow-xs hover:bg-gray-50 lg:min-h-9"
          >
            {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
            {playing ? "Pause" : "Play walkthrough"}
          </button>
        </div>

        {/* Stages. */}
        <div className="mt-4" role="tablist" aria-labelledby={`${uid}-hint`}>
          <div aria-hidden="true" className="mb-3 grid grid-cols-4 gap-1.5">
            {validationStages.map((s, i) => (
              <span key={s.id} className={cn("h-1.5 overflow-hidden rounded-full bg-gray-200")}>
                <span
                  className={cn(
                    "block h-full origin-left rounded-full bg-brand-600 transition-transform duration-500",
                    i <= stage ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </span>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {validationStages.map((s, i) => {
              const on = i === stage;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${uid}-tab-${s.id}`}
                  aria-selected={on}
                  aria-controls={`${uid}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "t-fast min-h-14 rounded-ctrl border px-3 py-2 text-left",
                    on
                      ? "border-brand-600 bg-brand-50 text-brand-950 shadow-xs"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50",
                  )}
                >
                  <span className={cn("label-caps block", on ? "text-brand-800" : "text-gray-600")}>{s.tab}</span>
                  <span className="mt-0.5 block text-body-md leading-5 font-semibold">{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel. */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${current.id}`}
          tabIndex={0}
          className="mt-5 grid gap-6 rounded-feature bg-gray-50 p-4 sm:p-6 lg:min-h-[470px] lg:grid-cols-[240px_1fr] lg:gap-10"
        >
          <h3 className="sr-only">
            {current.tab}: {current.name}
          </h3>
          <SampleColumn stage={current} />
          <div key={panelGroup} className="min-w-0">
            {panelGroup === "compare" && (
              <ComparePanel
                t={t}
                showRefinements={stage === 1}
                onScrub={(value) => {
                  userRef.current = true;
                  setPlaying(false);
                  applyT(value);
                }}
              />
            )}
            {panelGroup === "2" && <Phase2Panel reduced={reduced} />}
            {panelGroup === "survey" && <SurveyPanel reduced={reduced} />}
          </div>
        </div>

        {/* Back and next. */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => select(stage - 1)}
            disabled={stage === 0}
            className="t-fast inline-flex min-h-11 items-center gap-1.5 rounded-ctrl px-3 text-body-md font-medium text-gray-700 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-40 lg:min-h-9"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Back
          </button>
          {next ? (
            <button
              type="button"
              onClick={() => select(stage + 1)}
              className="t-fast inline-flex min-h-11 items-center gap-1.5 rounded-ctrl bg-brand-700 px-4 text-body-md font-medium text-white hover:bg-brand-800 lg:min-h-9"
            >
              Next: {next.tab}
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => select(0)}
              className="t-fast inline-flex min-h-11 items-center gap-1.5 rounded-ctrl border border-gray-200 bg-white px-4 text-body-md font-medium text-gray-950 hover:bg-gray-50 lg:min-h-9"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Start again
            </button>
          )}
        </div>
      </div>

      {/* Limits and method, once. */}
      <div className="space-y-2 border-t border-gray-150 p-4 text-body-md text-gray-600 sm:px-6">
        <p className="flex items-start gap-2">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700" />
          <span>{validationLimits}</span>
        </p>
        <details>
          <summary className="t-fast inline-flex min-h-11 cursor-pointer items-center font-medium text-brand-700 underline-offset-4 hover:underline lg:min-h-9">
            How the numbers were calculated
          </summary>
          <p className="mt-1 max-w-2xl leading-6">{validationMethod}</p>
        </details>
      </div>
    </div>
  );
}
