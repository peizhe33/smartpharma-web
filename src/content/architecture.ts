/**
 * Architecture structure. Component roles are implementation-neutral.
 * Status and technical detail come from project.ts so there is one place to
 * confirm what was implemented, simulated, evaluated or proposed.
 */

import { architectureDetail, architectureStatus } from "./project";
import type { ArchitectureLayer, ArchitectureNode, ImplementationStatus } from "./types";

export const architectureLayers: ArchitectureLayer[] = [
  {
    id: "interface",
    index: 1,
    name: "User interface",
    summary: "Where an order is entered and where review happens.",
  },
  {
    id: "input",
    index: 2,
    name: "Input validation and preprocessing",
    summary: "Turns the raw order into a structured, checked form.",
  },
  {
    id: "retrieval",
    index: 3,
    name: "Retrieval and knowledge sources",
    summary: "Finds the reference material relevant to this order.",
  },
  {
    id: "inference",
    index: 4,
    name: "Model inference",
    summary: "Drafts analysis grounded in the retrieved material.",
  },
  {
    id: "safety",
    index: 5,
    name: "Safety and rule-checking",
    summary: "Runs deterministic checks independent of the model.",
  },
  {
    id: "evidence",
    index: 6,
    name: "Explanation and evidence",
    summary: "Links each flag to its sources and reasoning.",
  },
  {
    id: "review",
    index: 7,
    name: "Review, decision and audit",
    summary: "A qualified reviewer decides; every step is recorded.",
  },
];

const nodeDefs: Omit<ArchitectureNode, "status" | "technicalDetail">[] = [
  {
    id: "user-interface",
    name: "User interface",
    layerId: "interface",
    icon: "monitor",
    role: "Order entry and the review workspace.",
  },
  {
    id: "input-processing",
    name: "Input processing",
    layerId: "input",
    icon: "inbox",
    role: "Validates and normalises the order before analysis.",
  },
  {
    id: "retrieval-pipeline",
    name: "Retrieval pipeline",
    layerId: "retrieval",
    icon: "search",
    role: "Ranks and returns passages relevant to the order.",
  },
  {
    id: "knowledge-sources",
    name: "Knowledge sources",
    layerId: "retrieval",
    icon: "library",
    role: "The reference material the retrieval pipeline searches.",
  },
  {
    id: "rag-pipeline",
    name: "RAG pipeline",
    layerId: "inference",
    icon: "workflow",
    role: "Supplies retrieved passages to the model as grounding context.",
  },
  {
    id: "qlora-model",
    name: "QLoRA-adapted model",
    layerId: "inference",
    icon: "cpu",
    role: "Language model adapted with QLoRA to draft the analysis.",
  },
  {
    id: "safety-verification",
    name: "Safety and verification layer",
    layerId: "safety",
    icon: "shield-check",
    role: "Applies rule-based checks and verifies output before display.",
  },
  {
    id: "evidence-generation",
    name: "Evidence generation",
    layerId: "evidence",
    icon: "file-search",
    role: "Attaches source passages and reasoning to each flag.",
  },
  {
    id: "human-reviewer",
    name: "Human reviewer",
    layerId: "review",
    icon: "user-check",
    role: "A qualified person confirms, rejects or escalates.",
  },
  {
    id: "audit-trail",
    name: "Audit trail",
    layerId: "review",
    icon: "history",
    role: "Records each step and the final decision.",
  },
];

export const architectureNodes: ArchitectureNode[] = nodeDefs.map((n) => ({
  ...n,
  status: (architectureStatus[n.id] ?? "unconfirmed") as ImplementationStatus,
  technicalDetail: architectureDetail[n.id] ?? "[ADD IMPLEMENTATION DETAIL]",
}));

export const statusMeta: Record<
  ImplementationStatus,
  { label: string; description: string }
> = {
  implemented: { label: "Implemented", description: "Built and working in the project." },
  simulated: { label: "Simulated", description: "Represented with mock or synthetic behaviour." },
  evaluated: { label: "Evaluated", description: "Built and formally evaluated." },
  proposed: { label: "Proposed", description: "Designed or planned, not built." },
  unconfirmed: { label: "[ADD STATUS]", description: "Status not yet confirmed by the project owner." },
};
