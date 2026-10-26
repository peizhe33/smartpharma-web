/**
 * VALIDATION DATA (edit the numbers here).
 *
 * Every evaluation figure shown on the site lives in this file once. The
 * Validation section reads it; nothing is repeated elsewhere.
 *
 * TODO before final publication: the Phase 2 table below has TP = 19 and
 * FP = 2, which gives a precision of 19 / 21 = 90.5%, but the reported alert
 * precision is 93.1%. Check the counts or the figure. Also confirm what one
 * result in the table is (the table totals 42 while Phase 2 used 20 cases).
 */

export interface ValidationStage {
  id: "1a" | "1b" | "2" | "survey";
  /** Small caps label on the tab. */
  tab: string;
  /** Tab title. */
  name: string;
  /** Big number: size of the sample. */
  count: number;
  /** What the sample was. */
  unit: string;
  /** Label for the line under the sample. */
  checkLabel: string;
  check: string;
}

export const validationStages: ValidationStage[] = [
  {
    id: "1a",
    tab: "Phase 1A",
    name: "Simulated testing",
    count: 30,
    unit: "simulated guideline-based cases",
    checkLabel: "Compared with",
    check: "Guideline-based reference answers",
  },
  {
    id: "1b",
    tab: "Phase 1B",
    name: "Refined and retested",
    count: 30,
    unit: "simulated guideline-based cases",
    checkLabel: "Same checks, after refinement",
    check: "Guideline-based reference answers",
  },
  {
    id: "2",
    tab: "Phase 2",
    name: "Pharmacist review",
    count: 20,
    unit: "anonymised UMMC patient test cases",
    checkLabel: "Validated by",
    check: "Two UMMC pharmacists",
  },
  {
    id: "survey",
    tab: "User survey",
    name: "Target-user ratings",
    count: 5,
    unit: "UMMC medical staff",
    checkLabel: "Collected from",
    check: "Target users, by rating survey",
  },
];

/** Phase 1A to Phase 1B, percentages. */
export const refinementMetrics = [
  { id: "safety", label: "Safety issue detection", before: 60, after: 91 },
  { id: "guideline", label: "Guideline agreement", before: 56, after: 85 },
  { id: "citation", label: "Citation support", before: 62, after: 94 },
];

export const reviewTime = {
  label: "Average review time per case",
  beforeSeconds: 60,
  afterSeconds: 15,
};

/** What changed between Phase 1A and Phase 1B. */
export const refinements = [
  "Safety-rule refinement",
  "Guideline-matching improvement",
  "RAG retrieval improvement",
  "Fine-tuned model output",
];

export type ResultKey = "TP" | "FN" | "FP" | "TN";

export const phase2Results: { key: ResultKey; count: number; label: string }[] = [
  { key: "TP", count: 19, label: "Actually unsafe and correctly flagged" },
  { key: "FN", count: 1, label: "Actually unsafe but no safety alert" },
  { key: "FP", count: 2, label: "Actually safe but incorrectly flagged" },
  { key: "TN", count: 20, label: "Actually safe and correctly recognised" },
];

export const phase2Metrics = [
  { label: "Unsafe prescription detection", value: 95.0, decimals: 1, suffix: "%" },
  { label: "Alert precision", value: 93.1, decimals: 1, suffix: "%" },
  { label: "Safe prescription recognition", value: 90.9, decimals: 1, suffix: "%" },
  { label: "Critical misses", value: 0, decimals: 0, suffix: "" },
];

export const survey = {
  scale: 5,
  ratings: [
    { label: "Clinical usefulness", score: 4.8 },
    { label: "Ease of use", score: 4.6 },
    { label: "Workflow efficiency", score: 4.6 },
    { label: "Clinical trust", score: 4.4 },
  ],
  utaut: { label: "UTAUT acceptance score", score: 4.6 },
};

export const validationLimits =
  "Prototype evaluation only. Small samples (20 anonymised cases, 5 staff): the findings show feasibility, not clinical effectiveness or readiness for autonomous clinical use.";

export const validationMethod =
  "Metrics were calculated from recorded system outputs, guideline-based reference answers and pharmacist review outcomes. No personally identifiable patient information is included in this portfolio.";
