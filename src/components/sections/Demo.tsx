"use client";

import { ArrowUpRight, CircleAlert, CircleCheck, CircleHelp, Hourglass, RotateCcw, TriangleAlert } from "lucide-react";
import { useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { LogoMark } from "@/components/Logo";
import { Badge, type Tone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { RelevanceBars, relevanceLabel } from "@/components/ui/RelevanceBars";
import { Section } from "@/components/ui/Section";
import {
  auditSeed,
  decisions,
  demoMeta,
  evidence,
  modelAnalysis,
  orderFacts,
  provenance,
  safetyChecks,
  sections,
  type AuditSource,
  type CheckResult,
  type DecisionId,
} from "@/content";
import type { IconKey } from "@/content";
import { cn } from "@/lib/cn";

type TabId = "order" | "evidence" | "safety" | "audit";

const tabs: { id: TabId; label: string }[] = [
  { id: "order", label: "Order review" },
  { id: "evidence", label: "Evidence" },
  { id: "safety", label: "Safety flags" },
  { id: "audit", label: "Audit trail" },
];

const sourceMeta: Record<AuditSource, { label: string; icon: IconKey; tone: Tone }> = {
  system: { label: "System event", icon: "server", tone: "gray" },
  evidence: { label: "Retrieved evidence", icon: "book-open", tone: "primary" },
  model: { label: "Model-generated", icon: "cpu", tone: "purple" },
  rule: { label: "Rule-based check", icon: "shield-check", tone: "gray" },
  reviewer: { label: "Reviewer decision", icon: "user-check", tone: "green" },
};

interface ReviewerRecord {
  decision: DecisionId;
  time: string;
}

export function Demo() {
  const [tab, setTab] = useState<TabId>("order");
  const [record, setRecord] = useState<ReviewerRecord | null>(null);
  const uid = useId();
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({
    order: null,
    evidence: null,
    safety: null,
    audit: null,
  });

  const decided = record ? decisions.find((d) => d.id === record.decision) : null;

  const decide = (id: DecisionId) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
    setRecord({ decision: id, time });
  };

  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    const target = tabs[next];
    setTab(target.id);
    tabRefs.current[target.id]?.focus();
  };

  return (
    <Section id="demo" eyebrow={sections.demo.eyebrow} title={sections.demo.title} intro={sections.demo.intro} tone="white">
      <div className="mb-4 flex items-start gap-2 rounded-ctrl border border-yellow-200 bg-yellow-50 px-3 py-2.5 text-body-md font-medium text-yellow-800">
        <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        <p>{sections.demo.syntheticBanner}</p>
      </div>

      <div className="overflow-hidden rounded-feature border border-gray-200 bg-white shadow-xl">
        {/* App chrome */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-150 bg-gray-50 px-4 py-3 sm:px-5">
          <div className="flex items-center gap-2 text-body-md font-semibold text-gray-950">
            <LogoMark size={20} className="text-brand-600" />
            SmartPharma review workspace
          </div>
          <Badge tone="gray" icon={<Icon name="flask" size={14} />}>
            Synthetic demonstration
          </Badge>
        </div>

        {/* Case summary + status */}
        <div className="flex flex-col gap-3 border-b border-gray-150 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="min-w-0">
            <p className="font-mono text-body-md text-gray-600">
              {demoMeta.orderId} · {demoMeta.patientLabel}
            </p>
            <h3 className="mt-1 text-hsm font-semibold text-gray-950">{demoMeta.flagTitle}</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="amber" icon={<CircleAlert size={14} aria-hidden="true" />}>
              Review priority: {demoMeta.priority}
            </Badge>
            <ReviewStatus decided={decided?.id ?? null} />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-150 px-2 sm:px-4">
          <div
            role="tablist"
            aria-label="Review workspace views"
            className="no-scrollbar scroll-x -mb-px flex gap-1"
          >
            {tabs.map((t, i) => {
              const selected = tab === t.id;
              return (
                <button
                  key={t.id}
                  ref={(el) => {
                    tabRefs.current[t.id] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`${uid}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${uid}-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setTab(t.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "t-fast min-h-11 shrink-0 border-b-2 px-3 text-body-md font-medium whitespace-nowrap sm:px-4",
                    selected
                      ? "border-brand-600 text-brand-700 font-semibold"
                      : "border-transparent text-gray-600 hover:text-gray-950",
                  )}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panels */}
        <div className="p-4 sm:p-5">
          {tabs.map((t) => (
            <div
              key={t.id}
              role="tabpanel"
              id={`${uid}-panel-${t.id}`}
              aria-labelledby={`${uid}-tab-${t.id}`}
              hidden={tab !== t.id}
              tabIndex={0}
              className="rounded-ctrl"
            >
              {tab === t.id && t.id === "order" && <OrderPanel />}
              {tab === t.id && t.id === "evidence" && <EvidencePanel />}
              {tab === t.id && t.id === "safety" && <SafetyPanel />}
              {tab === t.id && t.id === "audit" && <AuditPanel record={record} />}
            </div>
          ))}
        </div>

        {/* Human approval gate: always visible, whichever tab is open */}
        <div className="border-t-2 border-brand-600 bg-brand-50 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <h3 className="flex items-center gap-2 text-hsm font-semibold text-brand-950">
                <Icon name="user-check" size={20} />
                Human approval gate
              </h3>
              <p className="mt-1 text-body-md text-gray-700">
                {decided
                  ? "Decision recorded in the audit trail. This is a demonstration; nothing is sent anywhere."
                  : "SmartPharma never finalises a result on its own. A qualified reviewer must confirm, reject or escalate. Professional review is required."}
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap" role="group" aria-label="Reviewer decision">
              {decisions.map((d) => (
                <Button
                  key={d.id}
                  variant={d.id === "confirm" ? "primary" : "secondary"}
                  size="lg"
                  disabled={decided !== null}
                  aria-pressed={decided?.id === d.id}
                  onClick={() => decide(d.id)}
                  title={d.help}
                  className="w-full sm:w-auto"
                >
                  {d.label}
                </Button>
              ))}
              {decided && (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setRecord(null)}
                  className="w-full sm:w-auto"
                >
                  <RotateCcw size={16} aria-hidden="true" />
                  Reset demo
                </Button>
              )}
            </div>
          </div>
          <p className="mt-3 text-body-md text-gray-800" role="status" aria-live="polite">
            <span className="font-semibold">Final review status: </span>
            {decided ? decided.finalStatus : `${demoMeta.pendingStatus} (no reviewer decision yet)`}
          </p>
        </div>
      </div>

    </Section>
  );
}

/* ----------------------------- status + legend ---------------------------- */

function ReviewStatus({ decided }: { decided: DecisionId | null }) {
  if (decided === null) {
    return (
      <Badge tone="amber" icon={<Hourglass size={14} aria-hidden="true" />}>
        {demoMeta.pendingStatus}
      </Badge>
    );
  }
  if (decided === "escalate") {
    return (
      <Badge tone="amber" icon={<ArrowUpRight size={14} aria-hidden="true" />}>
        Escalated for further review
      </Badge>
    );
  }
  return (
    <Badge tone="green" icon={<CircleCheck size={14} aria-hidden="true" />}>
      {decided === "confirm" ? "Reviewed: flag confirmed" : "Reviewed: flag rejected"}
    </Badge>
  );
}

function ProvenanceTag({ kind }: { kind: "fact" | "evidence" | "model" | "rule" | "reviewer" }) {
  const meta: Record<typeof kind, { icon: IconKey; tone: Tone }> = {
    fact: { icon: "clipboard-list", tone: "gray" },
    evidence: { icon: "book-open", tone: "primary" },
    model: { icon: "cpu", tone: "purple" },
    rule: { icon: "shield-check", tone: "gray" },
    reviewer: { icon: "user-check", tone: "green" },
  };
  return (
    <Badge tone={meta[kind].tone} icon={<Icon name={meta[kind].icon} size={14} />}>
      {provenance[kind].label}
    </Badge>
  );
}

/* --------------------------------- panels --------------------------------- */

function OrderPanel() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <section aria-labelledby="order-summary-h" className="rounded-card border border-gray-200 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 id="order-summary-h" className="text-body-lg font-semibold text-gray-950">
            Order summary
          </h4>
          <ProvenanceTag kind="fact" />
        </div>
        <dl className="mt-3 divide-y divide-gray-150 text-body-md">
          {orderFacts.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
              <dt className="shrink-0 text-gray-600 sm:w-44">{f.label}</dt>
              <dd className="font-medium text-gray-950">{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="analysis-h" className="rounded-card border border-purple-200 bg-purple-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 id="analysis-h" className="text-body-lg font-semibold text-gray-950">
            Draft analysis
          </h4>
          <ProvenanceTag kind="model" />
        </div>
        <p className="mt-3 text-body-md text-gray-800">{modelAnalysis.summary}</p>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-body-md text-gray-800">
          {modelAnalysis.reasoning.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-2 rounded-ctrl border border-yellow-200 bg-yellow-50 px-3 py-2 text-body-md font-medium text-yellow-800">
          <TriangleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {modelAnalysis.caution}
        </p>
      </section>
    </div>
  );
}

function EvidencePanel() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-body-lg font-semibold text-gray-950">{evidence.length} passages retrieved</h4>
        <ProvenanceTag kind="evidence" />
      </div>
      <p className="mt-1 text-body-md text-gray-600">Shown as retrieved, before any model interpretation.</p>
      <ul className="mt-4 grid gap-3 lg:grid-cols-2">
        {evidence.map((e) => (
          <li key={e.id} className="flex flex-col rounded-card border border-gray-200 p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-ctrl bg-primary-50 font-mono text-body-md font-semibold text-primary-700 ring-1 ring-primary-200">
                {e.ref}
              </span>
              <div className="min-w-0">
                <h5 className="text-body-md font-semibold text-gray-950">{e.title}</h5>
                <p className="text-body-md text-gray-600">{e.sourceType}</p>
              </div>
            </div>
            <p className="mt-3 text-body-md text-gray-800">{e.excerptSummary}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-gray-150 pt-3">
              <span className="flex items-center gap-2 text-body-md font-medium text-gray-800">
                <RelevanceBars level={e.relevance} />
                {relevanceLabel[e.relevance]}
              </span>
              <Badge tone={e.usedInAnalysis ? "primary" : "gray"}>
                {e.usedInAnalysis ? "Used in analysis" : "Not used in analysis"}
              </Badge>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const checkMeta: Record<CheckResult, { tone: Tone; icon: React.ReactNode }> = {
  flag: { tone: "amber", icon: <TriangleAlert size={14} aria-hidden="true" /> },
  pass: { tone: "green", icon: <CircleCheck size={14} aria-hidden="true" /> },
  unavailable: { tone: "gray", icon: <CircleHelp size={14} aria-hidden="true" /> },
};

function SafetyPanel() {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="text-body-lg font-semibold text-gray-950">Rule-based safety checks</h4>
        <ProvenanceTag kind="rule" />
      </div>
      <p className="mt-1 text-body-md text-gray-600">Run separately from the model. “No flag” never replaces review.</p>
      <ul className="mt-4 divide-y divide-gray-150 overflow-hidden rounded-card border border-gray-200">
        {safetyChecks.map((c) => (
          <li
            key={c.id}
            className={cn("flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between", c.result === "flag" && "bg-yellow-50")}
          >
            <div className="min-w-0">
              <p className="text-body-md font-semibold text-gray-950">{c.name}</p>
              <p className="mt-0.5 text-body-md text-gray-700">{c.note}</p>
              {c.result === "flag" && (
                <p className="mt-2 text-body-md font-semibold text-yellow-800">Professional review is required.</p>
              )}
            </div>
            <Badge tone={checkMeta[c.result].tone} icon={checkMeta[c.result].icon} className="shrink-0 self-start">
              {c.resultLabel}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AuditPanel({ record }: { record: ReviewerRecord | null }) {
  const decision = record ? decisions.find((d) => d.id === record.decision) : null;
  return (
    <div>
      <h4 className="text-body-lg font-semibold text-gray-950">Audit trail</h4>
      <p className="mt-1 text-body-md text-gray-600">Every step and the reviewer’s action, in order.</p>
      <ol className="mt-4 space-y-0">
        {auditSeed.map((a, i) => (
          <AuditRow key={a.id} index={i + 1} source={a.source} title={a.title} detail={a.detail} />
        ))}
        {decision && record ? (
          <AuditRow
            index={auditSeed.length + 1}
            source="reviewer"
            title={decision.auditTitle}
            detail={`Recorded at ${record.time} (local time of your device). Final status: ${decision.finalStatus}.`}
            last
            highlight
          />
        ) : (
          <li className="relative flex gap-3 pb-0">
            <span
              className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-400 bg-white text-gray-600"
              aria-hidden="true"
            >
              <Hourglass size={14} />
            </span>
            <div className="pb-1">
              <p className="text-body-md font-semibold text-gray-950">Awaiting reviewer decision</p>
              <p className="text-body-md text-gray-600">
                Use the Human approval gate below to confirm, reject or escalate.
              </p>
            </div>
          </li>
        )}
      </ol>
    </div>
  );
}

function AuditRow({
  index,
  source,
  title,
  detail,
  last,
  highlight,
}: {
  index: number;
  source: AuditSource;
  title: string;
  detail: string;
  last?: boolean;
  highlight?: boolean;
}) {
  const meta = sourceMeta[source];
  return (
    <li className="relative flex gap-3 pb-5">
      {!last && <span className="absolute top-8 bottom-0 left-3.5 w-px bg-gray-200" aria-hidden="true" />}
      <span
        className={cn(
          "relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border text-body-md font-semibold",
          highlight ? "border-green-200 bg-green-50 text-green-800" : "border-gray-200 bg-white text-gray-700",
        )}
        aria-hidden="true"
      >
        {index}
      </span>
      <div className={cn("min-w-0 flex-1 rounded-card", highlight && "border border-green-200 bg-green-50 p-3 -mt-1")}>
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-body-md font-semibold text-gray-950">{title}</p>
          <Badge tone={meta.tone} icon={<Icon name={meta.icon} size={14} />}>
            {meta.label}
          </Badge>
        </div>
        <p className="mt-0.5 text-body-md text-gray-700">{detail}</p>
      </div>
    </li>
  );
}
