/**
 * SYNTHETIC DEMONSTRATION DATA
 * ----------------------------
 * Everything in this file is invented for interface demonstration. No real
 * patient, hospital, publication or guideline is represented. The "reference"
 * titles and excerpt summaries are placeholder demonstration text, not
 * citations of real documents, and must never be presented as clinical
 * guidance.
 */

export type ProvenanceKind = "evidence" | "model" | "rule" | "reviewer" | "system" | "fact";

export const provenance: Record<
  ProvenanceKind,
  { label: string; description: string }
> = {
  fact: {
    label: "Order record",
    description: "Facts as entered in the synthetic order record.",
  },
  evidence: {
    label: "Retrieved evidence",
    description: "Source passages returned by retrieval. Not interpreted by the model.",
  },
  model: {
    label: "Model-generated analysis",
    description: "Drafted by the model from the order and evidence. Not verified.",
  },
  rule: {
    label: "Rule-based check",
    description: "Deterministic checks run independently of the model.",
  },
  reviewer: {
    label: "Reviewer decision",
    description: "Recorded action by a qualified human reviewer.",
  },
  system: {
    label: "System event",
    description: "Automatic pipeline step.",
  },
};

export const demoMeta = {
  orderId: "DEMO-ORD-0001",
  patientLabel: "Synthetic patient DEMO-0001",
  setting: "Synthetic inpatient ward",
  pendingStatus: "Requires clinical review",
  priority: "High",
  flagTitle: "Possible interaction: anticoagulant and NSAID",
};

export const orderFacts: { label: string; value: string }[] = [
  { label: "Patient", value: "Synthetic patient DEMO-0001" },
  { label: "Age group", value: "Adult (synthetic)" },
  { label: "Active order", value: "Warfarin 5 mg, oral, once daily" },
  { label: "New order under review", value: "Ibuprofen 400 mg, oral, every 8 hours as needed" },
  { label: "Care setting", value: "Synthetic inpatient ward" },
  { label: "Ordered by", value: "Synthetic prescriber" },
];

export const modelAnalysis = {
  summary:
    "The new NSAID order overlaps with an active anticoagulant order. Retrieved passages 01 and 02 describe an increased bleeding risk for this combination, and passage 03 describes routing such flags to a pharmacist.",
  reasoning: [
    "Active anticoagulant order detected in the record.",
    "New NSAID order matches the interaction pattern described in passages 01 and 02.",
    "Whether the combination is appropriate depends on indication and monitoring, which the model cannot assess.",
  ],
  caution:
    "Model-generated and unverified. Professional review is required before any action is taken.",
};

export type Relevance = "high" | "medium" | "low";

export const evidence: {
  id: string;
  ref: string;
  title: string;
  sourceType: string;
  excerptSummary: string;
  relevance: Relevance;
  usedInAnalysis: boolean;
}[] = [
  {
    id: "ev-01",
    ref: "01",
    title: "Synthetic reference 01: Anticoagulant interaction summary",
    sourceType: "Demonstration interaction monograph (synthetic)",
    excerptSummary:
      "Demonstration text stating that combining an NSAID with an anticoagulant may increase bleeding risk and that the combination should be reviewed.",
    relevance: "high",
    usedInAnalysis: true,
  },
  {
    id: "ev-02",
    ref: "02",
    title: "Synthetic reference 02: NSAID use in inpatients",
    sourceType: "Demonstration usage guidance (synthetic)",
    excerptSummary:
      "Demonstration text suggesting NSAID orders for patients on anticoagulants be checked against the indication and monitoring plan.",
    relevance: "high",
    usedInAnalysis: true,
  },
  {
    id: "ev-03",
    ref: "03",
    title: "Synthetic reference 03: Example local review policy",
    sourceType: "Demonstration policy text (synthetic)",
    excerptSummary:
      "Demonstration text describing that flags of this type are routed to a pharmacist before administration.",
    relevance: "medium",
    usedInAnalysis: true,
  },
  {
    id: "ev-04",
    ref: "04",
    title: "Synthetic reference 04: General analgesic overview",
    sourceType: "Demonstration background text (synthetic)",
    excerptSummary:
      "General background text. Retrieved but ranked as less relevant and not used in the analysis.",
    relevance: "low",
    usedInAnalysis: false,
  },
];

export type CheckResult = "flag" | "pass" | "unavailable";

export const safetyChecks: {
  id: string;
  name: string;
  result: CheckResult;
  resultLabel: string;
  note: string;
}[] = [
  {
    id: "interaction",
    name: "Interaction rule: anticoagulant with NSAID",
    result: "flag",
    resultLabel: "Flag raised: review required",
    note: "Matched a rule in the synthetic demonstration rule set.",
  },
  {
    id: "duplicate",
    name: "Duplicate therapy check",
    result: "pass",
    resultLabel: "No flag",
    note: "No duplicate therapeutic class found in the synthetic record.",
  },
  {
    id: "dose",
    name: "Dose range check",
    result: "pass",
    resultLabel: "No flag",
    note: "Within the synthetic demonstration range. A pass does not replace review.",
  },
  {
    id: "allergy",
    name: "Allergy record check",
    result: "unavailable",
    resultLabel: "Not checked: data unavailable",
    note: "No allergy data in the synthetic record. The reviewer must verify.",
  },
];

export type AuditSource = "system" | "evidence" | "model" | "rule" | "reviewer";

export const auditSeed: {
  id: string;
  source: AuditSource;
  title: string;
  detail: string;
}[] = [
  {
    id: "a1",
    source: "system",
    title: "Order received",
    detail: "DEMO-ORD-0001 entered into the synthetic review queue.",
  },
  {
    id: "a2",
    source: "system",
    title: "Order validated and normalised",
    detail: "Medication names, route and frequency parsed into a structured form.",
  },
  {
    id: "a3",
    source: "evidence",
    title: "Evidence retrieved",
    detail: "4 synthetic passages retrieved and ranked by relevance.",
  },
  {
    id: "a4",
    source: "model",
    title: "Analysis generated",
    detail: "Draft analysis produced and marked as model output.",
  },
  {
    id: "a5",
    source: "rule",
    title: "Rule-based checks executed",
    detail: "4 checks run: 1 flag, 2 no flag, 1 not checked.",
  },
  {
    id: "a6",
    source: "system",
    title: "Status set to “Requires clinical review”",
    detail: "Awaiting a decision from a qualified reviewer.",
  },
];

export type DecisionId = "confirm" | "reject" | "escalate";

export const decisions: {
  id: DecisionId;
  label: string;
  help: string;
  finalStatus: string;
  auditTitle: string;
}[] = [
  {
    id: "confirm",
    label: "Confirm flag",
    help: "Reviewer agrees an issue exists.",
    finalStatus: "Reviewed: flag confirmed",
    auditTitle: "Reviewer confirmed the flag",
  },
  {
    id: "reject",
    label: "Reject flag",
    help: "Reviewer judges the flag does not apply.",
    finalStatus: "Reviewed: flag rejected",
    auditTitle: "Reviewer rejected the flag",
  },
  {
    id: "escalate",
    label: "Escalate",
    help: "Reviewer passes it to a senior reviewer.",
    finalStatus: "Escalated for further review",
    auditTitle: "Reviewer escalated the case",
  },
];
