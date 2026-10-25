/**
 * DEMO DATA: an interactive replica of the SmartPharma "Prescription Alert"
 * screen (Flutter app). Layout, labels, dropdown options and colours follow the
 * prototype; the AI text follows the format the AI backend produces.
 *
 * - Nothing here comes from a model at run time. It is pre-written.
 * - EDIT BEFORE PUBLISHING: confirm the patient below is a test record, not a
 *   real person. Change `patientName` / `ward` if needed.
 */

export const demoMeta = {
  appTitle: "PRESCRIPTION ALERT",
  patientName: "See Seng Hong",
  ward: "A101",
  banner: "Prescription alerts detected. Please review.",
  savedMessage: 'Saved! Added to Pharmacist "To be verified" list.',
};

export interface RxLine {
  name: string;
  dose: string;
  unit: string;
  frequency: string;
  route: string;
  prn: boolean;
}

/** The doctor's original order. */
export const doctorPrescription: RxLine[] = [
  { name: "Ceftriaxone", dose: "1", unit: "g", frequency: "Once a day", route: "IV", prn: false },
  { name: "Azithromycin", dose: "500", unit: "mg", frequency: "Once a day", route: "PO", prn: false },
  { name: "Amoxicillin", dose: "1000", unit: "mg", frequency: "Three times a day", route: "PO", prn: false },
  { name: "Paracetamol", dose: "1000", unit: "mg", frequency: "Every 6 hours", route: "PO", prn: true },
];

export interface AiRow extends RxLine {
  id: string;
  /** Shown in italics above the row. */
  rationale: string;
}

/**
 * The AI suggestion. Ceftriaxone is not listed: the system leaves out a drug
 * with no guideline indication, and the doctor's original stays selectable.
 */
export const aiSuggestion: AiRow[] = [
  {
    id: "azithromycin",
    name: "azithromycin",
    dose: "500",
    unit: "mg",
    frequency: "Once a day",
    route: "PO",
    prn: false,
    rationale: "Continue as prescribed - no issues detected.",
  },
  {
    id: "amoxicillin",
    name: "amoxicillin",
    dose: "1000",
    unit: "mg",
    frequency: "Every 8 hours",
    route: "PO",
    prn: false,
    rationale: "Continue as prescribed - no issues detected.",
  },
  {
    id: "paracetamol",
    name: "paracetamol",
    dose: "1000",
    unit: "mg",
    frequency: "Every 6 hours",
    route: "PO",
    prn: true,
    rationale: "Continue as prescribed - no issues detected.",
  },
];

/** Plain text, shown exactly as the app shows it. */
export const aiExplanation = `Assessment: Prescription requires review - dosing or stewardship concerns detected.
Diagnosis: Community acquired pneumonia, suspected bacterial

Clinical Flags:
  - CLASS OVERLAP: WARNING - Therapeutic redundancy: ceftriaxone, amoxicillin are both beta-lactam antibiotics. Prescribing multiple drugs from the same class for the same indication is usually redundant. Verify if both are intended (e.g., step-down therapy, different infection sites).
  - DOSE ALERT: ceftriaxone dose does not match guideline target (2 g).

--- ceftriaxone ---
Assessment: Unsafe
Issues:
- NOT INDICATED - ceftriaxone is not listed in the UMMC structured guideline for 'Community acquired pneumonia, suspected bacterial'.
Recommendation: Discontinuation is required due to the documented lack of indication [1].

--- azithromycin ---
Assessment: Safe
Issues: None
Recommendation: Continue

--- amoxicillin ---
Assessment: Safe
Issues: - THERAPEUTIC REDUNDANCY - ceftriaxone, amoxicillin are both beta-lactam antibiotics. Prescribing multiple drugs from the same class for the same indication is usually redundant.
Recommendation: Consider switching to a non-beta-lactam antibiotic if both agents are not intended [1].

--- paracetamol (supportive care) ---
Assessment: Safe
Issues: None
Recommendation: Continue

Verification: AI-generated analysis based on UMMC Antimicrobial Guidelines 3rd Edition, and clinical knowledge. Clinical judgment required before acting on these recommendations.

References:
[1] 3.8 Respiratory Tract Infections_3rd Ed`;

export type AlertSeverity = "high" | "medium" | "low";

export interface DemoAlert {
  id: string;
  severity: AlertSeverity;
  /** "dosing" shows the pill icon, "other" the info icon (as in the app). */
  category: "dosing" | "other";
  title: string;
  summary: string;
  details: string;
}

/** The alert cards, as the app derives them from the AI text above. */
export const alerts: DemoAlert[] = [
  {
    id: "class-overlap",
    severity: "medium",
    category: "other",
    title: "Class Overlap",
    summary: "Therapeutic redundancy requires review",
    details:
      "CLASS OVERLAP: WARNING - Therapeutic redundancy: ceftriaxone, amoxicillin are both beta-lactam antibiotics. Prescribing multiple drugs from the same class for the same indication is usually redundant. Verify if both are intended (e.g., step-down therapy, different infection sites).",
  },
  {
    id: "dose",
    severity: "medium",
    category: "dosing",
    title: "Incorrect Dosage",
    summary: "Dose or frequency does not match guideline target",
    details: "DOSE ALERT: ceftriaxone dose does not match guideline target (2 g).",
  },
  {
    id: "guideline-warning",
    severity: "medium",
    category: "other",
    title: "Guideline Warning",
    summary: "Drug choice is not first-line or not routinely indicated",
    details:
      "NOT INDICATED - ceftriaxone is not listed in the UMMC structured guideline for 'Community acquired pneumonia, suspected bacterial'.",
  },
];

/** Dropdown options, as in the app. */
export const doseUnits = ["g", "mg", "mcg", "mL", "tsp", "tbsp", "IU", "units", "mg/kg", "mcg/kg"];
export const frequencyOptions = [
  "Once a day",
  "Twice a day",
  "Three times a day",
  "Every 4 hours",
  "Every 6 hours",
  "Every 8 hours",
  "Every 12 hours",
  "Every 24 hours",
  "Every 48 hours",
  "Every 72 hours",
];
export const routeOptions = ["PO", "IV", "IM", "SC", "Topical", "Inhaled", "PR", "SL"];

export const reasonOptions = [
  "Allergy not clinically relevant",
  "Alert is recorded",
  "Others (Please specify)",
];
export const OTHER_REASON = "Others (Please specify)";

export const decisionOptions = ["Use AI suggestion", "Use Doctor prescription", "Edit AI suggestion"];

/** Short notes under the replica. */
export const demoNotes = [
  {
    title: "AI suggestion",
    text: "Ceftriaxone is left out because the guideline lists no indication for it. The doctor's original stays one choice away.",
  },
  {
    title: "Colour-coded alerts",
    text: "Red, orange or yellow by severity. This case has orange warnings only.",
  },
  {
    title: "A person decides",
    text: "Save & Confirm stays disabled until a reason is chosen, then the order goes to the pharmacist.",
  },
];
