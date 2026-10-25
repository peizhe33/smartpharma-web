"use client";

import { ArrowLeft, ChevronDown, House, Info, Minus, Pill, RotateCcw, Square, X } from "lucide-react";
import { useEffect, useId, useState, type ReactNode } from "react";
import { Section } from "@/components/ui/Section";
import {
  OTHER_REASON,
  aiExplanation,
  aiSuggestion,
  alerts,
  decisionOptions,
  demoMeta,
  demoNotes,
  doctorPrescription,
  doseUnits,
  frequencyOptions,
  reasonOptions,
  routeOptions,
  sections,
  type AlertSeverity,
  type RxLine,
} from "@/content";
import { cn } from "@/lib/cn";

/**
 * Interactive replica of the SmartPharma "Prescription Alert" screen.
 * Layout, labels, options and colours follow the Flutter prototype.
 * Nothing is sent anywhere and no model runs: all content is pre-written.
 */

const severity: Record<AlertSeverity, { label: string; border: string; fill: string }> = {
  high: { label: "RED", border: "var(--m-red-700)", fill: "var(--m-red-100)" },
  medium: { label: "ORANGE", border: "var(--m-orange-700)", fill: "var(--m-orange-100)" },
  low: { label: "YELLOW", border: "var(--m-yellow-800)", fill: "var(--m-yellow-100)" },
};

function rxLine(m: RxLine) {
  return `${m.name} ${m.dose}${m.unit} ${m.route} - ${m.frequency}${m.prn ? " (PRN)" : ""}`;
}

/** Outlined Material-style field with a label sitting on the border. */
function Field({ label, htmlFor, children, className }: { label: string; htmlFor: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <label
        htmlFor={htmlFor}
        className="absolute -top-[7px] left-2 z-10 bg-(--surface) px-1 text-[12px] leading-[14px] text-black/65"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const control =
  "h-10 w-full rounded border border-black/40 bg-transparent px-3 text-[16px] text-black outline-offset-0 hover:border-black/70 focus:border-(--m-blue) focus:outline-2 focus:outline-(--m-blue) focus-visible:outline-2 focus-visible:outline-(--m-blue)";

function Select({
  id,
  value,
  onChange,
  options,
  className,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(control, "cursor-pointer appearance-none pr-9")}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-black/60" />
    </div>
  );
}

interface AiState {
  id: string;
  name: string;
  dose: string;
  unit: string;
  frequency: string;
  route: string;
  prn: boolean;
  rationale: string;
}

export function Demo() {
  const uid = useId();
  const initialAi = (): AiState[] => aiSuggestion.map((r) => ({ ...r }));

  const [ai, setAi] = useState<AiState[]>(initialAi);
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [decision, setDecision] = useState(decisionOptions[0]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<null | { lines: string[]; reason: string; decision: string }>(null);
  const [toast, setToast] = useState(false);

  const canSave = reason !== "" && (reason !== OTHER_REASON || otherReason.trim() !== "");

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(false), 4500);
    return () => window.clearTimeout(t);
  }, [toast]);

  function patchAi(i: number, patch: Partial<AiState>) {
    setAi((rows) => rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function save() {
    if (!canSave) return;
    const lines =
      decision === "Use Doctor prescription"
        ? doctorPrescription.map(rxLine)
        : ai.map((r) => rxLine({ ...r, name: r.name.trim() || "(no name)" }));
    setSaved({ lines, reason: reason === OTHER_REASON ? otherReason.trim() : reason, decision });
    setToast(true);
  }

  function reset() {
    setAi(initialAi());
    setReason("");
    setOtherReason("");
    setDecision(decisionOptions[0]);
    setExpanded(new Set());
    setSaved(null);
    setToast(false);
  }

  return (
    <Section id="demo" eyebrow={sections.demo.eyebrow} title={sections.demo.title} intro={sections.demo.intro} tone="white">
      <p className="mb-4 flex items-start gap-2 text-body-md text-gray-600">
        <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-brand-700" />
        {sections.demo.syntheticBanner}
      </p>

      {/* The app window. */}
      <div
        role="group"
        aria-label="Interactive replica of the SmartPharma Prescription Alert screen"
        className="mat @container relative overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg"
      >
        {/* Desktop title bar. */}
        <div aria-hidden="true" className="flex h-8 items-center justify-between bg-[#1c1c1c] px-3 text-white/90">
          <span className="text-[12px]">SmartPharma</span>
          <span className="flex items-center gap-4 text-white/70">
            <Minus size={14} />
            <Square size={11} />
            <X size={14} />
          </span>
        </div>

        {/* App bar. */}
        <div className="grid h-14 grid-cols-[1fr_auto_1fr] items-center bg-(--m-blue) px-3 text-white shadow-md sm:px-4">
          <ArrowLeft size={22} aria-hidden="true" />
          <h3 className="px-2 text-center text-[16px] font-normal tracking-wide sm:text-[20px]">{demoMeta.appTitle}</h3>
          <button
            type="button"
            onClick={reset}
            title="Resets this demo"
            className="ml-auto inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[14px] font-medium hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <House size={18} aria-hidden="true" />
            Home
          </button>
        </div>

        <div className="p-3 sm:p-5 @min-[760px]:p-6">
          <div className="border border-black/55">
            {/* Banner. */}
            <p className="bg-(--m-orange) px-3.5 py-2.5 text-[14px] font-semibold text-black">{demoMeta.banner}</p>

            <div className="@min-[760px]:grid @min-[760px]:grid-cols-[6fr_4fr]">
              {/* Left: patient, prescription, AI. */}
              <div
                tabIndex={0}
                aria-label="Patient, prescription, AI suggestion and alerts (scrollable)"
                className="space-y-2.5 p-3 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--m-blue) @min-[760px]:max-h-[640px] @min-[760px]:overflow-y-auto"
              >
                <p className="text-[14px] font-semibold text-black">
                  Patient: {demoMeta.patientName} &nbsp;|&nbsp; Ward: {demoMeta.ward}
                </p>

                {/* Doctor prescription. */}
                <section aria-labelledby={`${uid}-rx`} className="border border-black/12 bg-(--m-grey-100) p-2.5 text-[14px] text-black">
                  <h4 id={`${uid}-rx`} className="font-bold">
                    Doctor prescription
                  </h4>
                  <ul className="mt-1.5">
                    {doctorPrescription.map((m) => (
                      <li key={m.name}>• {rxLine(m)}</li>
                    ))}
                  </ul>
                </section>

                {/* AI suggestion (editable). */}
                <section
                  aria-labelledby={`${uid}-ai`}
                  style={{ ["--surface" as string]: "#eceff1" }}
                  className="border border-black/12 bg-(--m-blue-grey-50) p-2.5"
                >
                  <h4 id={`${uid}-ai`} className="text-[14px] font-bold text-black">
                    AI suggestion (editable)
                  </h4>
                  <div className="mt-2">
                    {ai.map((row, i) => (
                      <div key={row.id} role="group" aria-label={`AI suggestion ${i + 1}: ${row.name}`}>
                        <p className="rounded bg-(--m-grey-50) px-2 py-1.5 text-[12px] text-black/65 italic">{row.rationale}</p>
                        <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-2">
                          <Field label="Drug" htmlFor={`${uid}-n${i}`}>
                            <input
                              id={`${uid}-n${i}`}
                              value={row.name}
                              onChange={(e) => patchAi(i, { name: e.target.value })}
                              className={control}
                            />
                          </Field>
                          <Field label="Dose" htmlFor={`${uid}-d${i}`}>
                            <input
                              id={`${uid}-d${i}`}
                              value={row.dose}
                              inputMode="decimal"
                              onChange={(e) => patchAi(i, { dose: e.target.value })}
                              className={control}
                            />
                          </Field>
                          <Field label="Unit" htmlFor={`${uid}-u${i}`}>
                            <Select id={`${uid}-u${i}`} value={row.unit} options={doseUnits} onChange={(v) => patchAi(i, { unit: v })} />
                          </Field>
                        </div>
                        <div className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] items-center gap-2">
                          <Field label="Frequency" htmlFor={`${uid}-f${i}`}>
                            <Select
                              id={`${uid}-f${i}`}
                              value={row.frequency}
                              options={frequencyOptions}
                              onChange={(v) => patchAi(i, { frequency: v })}
                            />
                          </Field>
                          <Field label="Route" htmlFor={`${uid}-r${i}`}>
                            <Select id={`${uid}-r${i}`} value={row.route} options={routeOptions} onChange={(v) => patchAi(i, { route: v })} />
                          </Field>
                          <label className="flex min-h-11 items-center gap-2 text-[14px] text-black">
                            PRN
                            <input
                              type="checkbox"
                              checked={row.prn}
                              onChange={(e) => patchAi(i, { prn: e.target.checked })}
                              className="size-[18px] cursor-pointer accent-(--m-blue)"
                            />
                          </label>
                        </div>
                        {i < ai.length - 1 && <hr className="my-3.5 border-black/20" />}
                      </div>
                    ))}
                  </div>
                </section>

                {/* AI explanation. */}
                <section aria-labelledby={`${uid}-ex`} className="border border-black/12 bg-(--m-green-50) p-2.5">
                  <h4 id={`${uid}-ex`} className="text-[14px] font-bold text-black">
                    AI Explanation &amp; Citations
                  </h4>
                  <pre className="mt-1.5 font-sans text-[13px] leading-[1.45] whitespace-pre-wrap text-black">{aiExplanation}</pre>
                </section>

                {/* Alert cards. */}
                <ul className="space-y-2.5">
                  {alerts.map((a) => {
                    const s = severity[a.severity];
                    const open = expanded.has(a.id);
                    const CategoryIcon = a.category === "dosing" ? Pill : Info;
                    return (
                      <li
                        key={a.id}
                        className="flex gap-2.5 p-2.5 text-black"
                        style={{ background: s.fill, border: `1.2px solid ${s.border}` }}
                      >
                        <CategoryIcon size={22} aria-hidden="true" className="mt-0.5 shrink-0" style={{ color: s.border }} />
                        <div className="min-w-0 flex-1 text-[14px]">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-bold">
                              {s.label} — {a.title}
                            </p>
                            <button
                              type="button"
                              aria-expanded={open}
                              aria-controls={`${uid}-a-${a.id}`}
                              onClick={() => toggle(a.id)}
                              className="-mt-1 min-h-11 shrink-0 rounded-full px-3 text-[14px] font-medium text-(--m-blue-text) hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-(--m-blue-text) lg:min-h-9"
                            >
                              {open ? "Less" : "Read more"}
                            </button>
                          </div>
                          <p>{a.summary}</p>
                          <p id={`${uid}-a-${a.id}`} hidden={!open} className="mt-2 text-[13px]">
                            {a.details}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Right: decision. */}
              <div
                style={{ ["--surface" as string]: "#ffffff" }}
                className="flex flex-col gap-2 border-t border-black/55 p-3 @min-[760px]:border-t-0 @min-[760px]:border-l"
              >
                <label htmlFor={`${uid}-reason`} className="text-[14px] font-semibold text-black">
                  Please select:
                </label>
                <div className="relative">
                  <select
                    id={`${uid}-reason`}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className={cn(control, "cursor-pointer appearance-none pr-9")}
                  >
                    <option value="">Choose a reason</option>
                    {reasonOptions.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-black/60" />
                </div>

                {reason === OTHER_REASON && (
                  <Field label="Type reason here" htmlFor={`${uid}-other`} className="mt-1">
                    <input id={`${uid}-other`} value={otherReason} onChange={(e) => setOtherReason(e.target.value)} className={control} />
                  </Field>
                )}

                <label htmlFor={`${uid}-decision`} className="mt-2 text-[14px] font-semibold text-black">
                  Final Decision:
                </label>
                <Select id={`${uid}-decision`} value={decision} options={decisionOptions} onChange={setDecision} />

                <div className="mt-4 flex flex-col gap-2.5 @min-[760px]:mt-auto @min-[760px]:pt-24">
                  <button
                    type="button"
                    onClick={save}
                    disabled={!canSave}
                    className="min-h-12 rounded-full bg-(--m-blue) px-6 text-[14px] font-medium text-white shadow-sm hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-blue) disabled:cursor-not-allowed disabled:bg-black/12 disabled:text-black/38 disabled:shadow-none disabled:hover:brightness-100"
                  >
                    Save &amp; Confirm
                  </button>
                  <button
                    type="button"
                    onClick={reset}
                    title="Resets this demo"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-black/30 px-6 text-[14px] font-medium text-(--m-blue) hover:bg-(--m-blue)/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--m-blue)"
                  >
                    <House size={18} aria-hidden="true" />
                    Home
                  </button>
                  {!canSave && (
                    <p className="text-center text-[12px] text-black/65">Choose a reason to enable Save &amp; Confirm.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Snackbar. */}
        <div role="status" aria-live="polite" className="pointer-events-none absolute inset-x-3 bottom-4 flex justify-center">
          {toast && (
            <p className="rounded bg-[#323232] px-4 py-3 text-[14px] text-white shadow-lg">{demoMeta.savedMessage}</p>
          )}
        </div>
      </div>

      {/* What was recorded. */}
      {saved && (
        <section aria-labelledby={`${uid}-rec`} className="mt-4 rounded-feature border border-brand-200 bg-brand-50 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 id={`${uid}-rec`} className="text-body-lg font-semibold text-gray-950">
                Sent to the pharmacist &ldquo;To be verified&rdquo; list
              </h3>
              <p className="mt-1 text-body-md text-gray-700">
                {saved.decision}. Reason: {saved.reason}
              </p>
            </div>
            <button
              type="button"
              onClick={reset}
              className="t-fast inline-flex min-h-11 items-center gap-2 rounded-ctrl border border-gray-200 bg-white px-4 text-body-md font-medium text-gray-950 hover:bg-gray-50 lg:min-h-9"
            >
              <RotateCcw size={16} aria-hidden="true" />
              Try again
            </button>
          </div>
          <ul className="mt-3 space-y-1 text-body-md text-gray-800">
            {saved.lines.map((l) => (
              <li key={l}>• {l}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Notes. */}
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {demoNotes.map((n) => (
          <li key={n.title} className="border-l-2 border-brand-300 pl-4">
            <p className="text-body-md font-semibold text-gray-950">{n.title}</p>
            <p className="mt-1 text-body-md text-gray-600">{n.text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
