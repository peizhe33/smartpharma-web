/**
 * SmartPharma: written content that is NOT fact-dependent.
 *
 * Wording here is deliberately qualitative. Do not add numbers, outcomes or
 * claims here; verified facts and metrics belong in project.ts.
 */

import type { IconKey } from "./types";

export const nav = [
  { id: "overview", label: "Overview", href: "#overview" },
  { id: "prototype", label: "Prototype", href: "#prototype" },
  { id: "workflow", label: "Workflow", href: "#workflow" },
  { id: "architecture", label: "Architecture", href: "#architecture" },
  { id: "validation", label: "Validation", href: "#validation" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "resources", label: "Resources", href: "#resources" },
] as const;

export const hero = {
  eyebrow: "AI-assisted inpatient medication safety",
  tagline: "Medication orders, checked against evidence. Decided by people.",
  primaryCta: "Watch demo",
  secondaryCta: "How it works",
  notice: "Research and demonstration project. Not for clinical use.",
};

export const responsibleNotice =
  "Research and demonstration project. Not intended for clinical diagnosis, prescribing, or unsupervised patient-care decisions.";

export const trustPrinciples: { id: string; icon: IconKey; title: string }[] = [
  { id: "human", icon: "user-check", title: "Human-in-the-loop review" },
  { id: "evidence", icon: "book-open", title: "Evidence-linked results" },
  { id: "privacy", icon: "lock", title: "Synthetic demo data only" },
];

export const problem = {
  eyebrow: "The problem",
  title: "Order checks live in too many places.",
  intro: "SmartPharma brings the evidence together. The reviewer still decides.",
  note: "Design goals, not measured results. See Validation for evidence.",
  outcomes: [
    {
      id: "faster",
      icon: "search" as IconKey,
      title: "Faster evidence review",
      body: "Sources sit beside the order.",
    },
    {
      id: "traceable",
      icon: "file-search" as IconKey,
      title: "Traceable rationale",
      body: "Every flag links to its sources.",
    },
    {
      id: "consistent",
      icon: "list-checks" as IconKey,
      title: "Consistent safety checks",
      body: "The same rules run on every order.",
    },
  ],
};

export const workflow = {
  eyebrow: "How it works",
  title: "Four steps. One human decision.",
  intro: "",
  steps: [
    {
      id: "capture",
      icon: "clipboard-list" as IconKey,
      title: "Capture",
      summary: "The prescription is entered and structured.",
      input: "A medication order, entered or captured.",
      action: "The order is validated and normalised into a structured form.",
      output: "A structured order ready for review.",
    },
    {
      id: "retrieve",
      icon: "database" as IconKey,
      title: "Retrieve",
      summary: "Relevant evidence is found.",
      input: "The structured order and patient-safe context.",
      action: "Relevant reference passages are retrieved from the knowledge sources.",
      output: "A ranked set of source passages.",
    },
    {
      id: "analyse",
      icon: "cpu" as IconKey,
      title: "Analyse",
      summary: "The model drafts linked reasoning.",
      input: "The order, context and retrieved passages.",
      action:
        "The model analyses possible issues and drafts reasoning linked to its sources. Rule-based checks run separately.",
      output: "Evidence-linked analysis and safety flags, marked as model output.",
    },
    {
      id: "review",
      icon: "user-check" as IconKey,
      title: "Review",
      summary: "A qualified reviewer decides.",
      input: "The analysis, flags and evidence.",
      action: "A qualified reviewer confirms, rejects or escalates the result.",
      output: "A recorded decision and a complete audit trail.",
      isHumanGate: true,
    },
  ],
  detailsLabel: "Inputs, actions and outputs",
  gateLabel: "Human approval gate",
  gateBody: "Nothing is final until a person decides.",
};

/** General limitations that are true of any research prototype of this kind. */
export const generalLimitations: { id: string; title: string; body: string }[] = [
  {
    id: "research",
    title: "Research and demonstration only",
    body: "Not approved for clinical use. Not for diagnosis, prescribing or unsupervised decisions.",
  },
  {
    id: "model-errors",
    title: "Model output can be wrong",
    body: "It can be incomplete or inaccurate, and always needs professional review.",
  },
  {
    id: "synthetic-demo",
    title: "The demo is synthetic",
    body: "Invented data and pre-written content. No live model is called.",
  },
  {
    id: "no-substitute",
    title: "Supports, never replaces",
    body: "Built to assist pharmacists and clinicians, not replace their judgment.",
  },
];

export const sections = {
  demo: {
    eyebrow: "Product demo",
    title: "See a review in action.",
    intro: "One synthetic order. Switch tabs, then make the reviewer's call.",
    syntheticBanner: "Synthetic data. No real patient or reference. Not clinical guidance.",
  },
  architecture: {
    eyebrow: "Architecture",
    title: "How SmartPharma works from prescription to bedside",
    intro:
      "An implemented end-to-end medication verification workflow combining AI-assisted review, pharmacist approval, QR dispensing, and bedside verification.",
  },
  validation: {
    eyebrow: "Validation",
    title: "Validated through staged testing",
    intro:
      "SmartPharma was evaluated through simulated guideline-based cases, pharmacist-reviewed anonymised patient cases and a target-user survey.",
  },
  limitations: {
    eyebrow: "Limitations",
    title: "What this does not show.",
    intro: "",
  },
  stack: {
    eyebrow: "Stack",
    title: "Technology behind SmartPharma.",
    intro:
      "The application, clinical AI pipeline, data services and local deployment technologies powering the completed prototype.",
  },
  recognition: {
    eyebrow: "Recognition",
    title: "Award and context.",
  },
  contribution: {
    eyebrow: "My contribution",
    title: "What I built.",
  },
  resources: {
    eyebrow: "Resources",
    title: "Explore more.",
    intro: "",
  },
  finalCta: {
    title: "Explore the engineering behind SmartPharma.",
    body: "",
  },
};

export const footer = {
  disclaimer:
    "Research and demonstration project. Not a medical device, not clinically approved, and not for diagnosis, prescribing or unsupervised patient-care decisions. All patient data shown is synthetic.",
};
