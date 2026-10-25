import type { IconKey } from "./types";

export interface ArchitectureStage {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
}

export const architectureStages: ArchitectureStage[] = [
  {
    id: "prescription-input",
    title: "Prescription Input",
    description: "Patient data, doctor’s prescription and antibiotic guidelines enter the workflow.",
    icon: "inbox",
  },
  {
    id: "data-knowledge-layer",
    title: "Data and Knowledge Layer",
    description: "Supabase stores case data while the drug knowledge database provides validated reference information.",
    icon: "database",
  },
  {
    id: "clinical-analysis-engine",
    title: "Clinical Analysis Engine",
    description: "Prescription parsing, rule-based dosage calculation, RAG retrieval and LLM reasoning analyse the medication order.",
    icon: "cpu",
  },
  {
    id: "ai-assisted-output",
    title: "AI-Assisted Output",
    description: "Produces medication recommendations, cited explanations and safety alerts for review.",
    icon: "file-search",
  },
  {
    id: "pharmacist-verification",
    title: "Pharmacist Verification",
    description: "The pharmacist reviews and confirms the recommendation before dispensing.",
    icon: "user-check",
  },
  {
    id: "qr-based-dispensing",
    title: "QR-Based Dispensing",
    description: "A dispensing QR label is generated and linked to the approved medication order.",
    icon: "package",
  },
  {
    id: "bedside-verification",
    title: "Bedside Verification",
    description: "The Raspberry Pi 5 and camera compare the medication label with the patient wristband QR, then display confirmation or a mismatch alert.",
    icon: "shield-check",
  },
];

export const architectureAudit = {
  title: "Audit and Feedback",
  description: "Records verification results, final decisions and user feedback for traceability and system improvement.",
};
