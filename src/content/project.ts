/**
 * ============================================================================
 *  SMARTPHARMA: PROJECT FACTS  (edit this file first)
 * ============================================================================
 *
 *  Every verifiable fact on the site lives here: links, creator details,
 *  award details, evaluation metrics, architecture status and technology
 *  labels. Anything still written as "[ADD ...]" is an unfilled placeholder.
 *
 *  Rules
 *  - Replace a placeholder only with a verified fact. Never estimate.
 *  - To hide a link/metric/section item, delete it from the array.
 *  - Search the repo for "[ADD" to list every placeholder still outstanding:
 *        grep -rn "\[ADD" src
 *  - Prose, workflow wording and the synthetic demo data live in copy.ts and
 *    demo.ts. Architecture structure lives in architecture.ts.
 * ============================================================================
 */

import type { Metric, PrototypeComponent, PrototypeImage, ProjectLink, TechGroup } from "./types";

/* -------------------------------------------------------------------------- */
/* Identity                                                                   */
/* -------------------------------------------------------------------------- */

export const identity = {
  name: "SmartPharma",
  descriptor: "AI-assisted medication verification for safer inpatient workflows",
  /** Production URL once known, e.g. "https://smartpharma.vercel.app". Used for canonical URL, OG tags, sitemap. */
  siteUrl: null as string | null,
  siteUrlPlaceholder: "[ADD PRODUCTION URL]",
  creatorName: "Lee PZ",
  /** Shown in the footer copyright line. */
  copyrightYear: 2026,
  /** Short status line shown in the footer. Edit when the project's status changes. */
  status: "Research and demonstration project",
};

/* -------------------------------------------------------------------------- */
/* Links and resources                                                        */
/* -------------------------------------------------------------------------- */

/**
 * Set `href` to a full https:// URL (or "mailto:you@example.com" with isEmail)
 * to enable a resource. While `href` is null the resource renders as an
 * clearly-labelled unavailable card and CTAs fall back to on-page sections.
 */
export const resources: ProjectLink[] = [
  {
    id: "demo",
    title: "Recorded demo",
    description: "Walkthrough video of SmartPharma reviewing a medication order.",
    icon: "play",
    href: null,
    placeholder: "[ADD DEMO VIDEO URL]",
  },
  {
    id: "github",
    title: "Source code",
    description: "GitHub repository with the implementation and evaluation code.",
    icon: "git-branch",
    href: null,
    placeholder: "https://github.com/peizhe33/uipharma.git",
  },
  {
    id: "report",
    title: "Technical report",
    description: "Full methodology, dataset description and results.",
    icon: "file-text",
    href: null,
    placeholder: "[ADD TECHNICAL REPORT]",
  },
  {
    id: "poster",
    title: "Project poster",
    description: "One-page visual summary prepared for the project.",
    icon: "image",
    href: null,
    placeholder: "[ADD PROJECT POSTER]",
  },
  {
    id: "slides",
    title: "Presentation slides",
    description: "Slide deck used to present the project.",
    icon: "presentation",
    href: null,
    placeholder: "[ADD PRESENTATION SLIDES]",
  },
  {
    id: "linkedin",
    title: "Creator profile",
    description: "Professional profile of the project creator.",
    icon: "user",
    href: null,
    placeholder: "[ADD LINKEDIN URL]",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Email the creator about the project or collaboration.",
    icon: "mail",
    href: null,
    placeholder: "[ADD CONTACT EMAIL]",
    isEmail: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Hero proof points                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Compact proof points under the hero. Only fill these with verified results.
 * Delete an entry to remove it from the hero.
 */
export const heroProofPoints = [
  {
    id: "detection",
    label: "Issue detection",
    value: "[ADD VERIFIED DETECTION RESULT]",
    context: "[ADD TEST CONTEXT]",
  },
  {
    id: "latency",
    label: "Review latency",
    value: "[ADD VERIFIED LATENCY RESULT]",
    context: "[ADD TEST CONTEXT]",
  },
  {
    id: "award",
    label: "Recognition",
    value: "[ADD VERIFIED AWARD]",
    context: "[ADD ORGANIZER AND YEAR]",
  },
];

/* -------------------------------------------------------------------------- */
/* Validation                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * One card per verified metric. Each needs a value, the test context, and the
 * sample/evaluation note. Remove slots that do not apply to your project and
 * add more by copying an entry. Do not add bars or charts unless you have
 * the underlying numbers.
 */
export const metrics: Metric[] = [
  {
    id: "detection-rate",
    name: "Detection rate",
    value: "[ADD VERIFIED DETECTION RATE]",
    context: "[ADD TEST CONTEXT: which issue types, which scenario set]",
    sampleNote: "[ADD EVALUATION SAMPLE SIZE]",
  },
  {
    id: "false-positive-rate",
    name: "False positive rate",
    value: "[ADD VERIFIED FALSE POSITIVE RATE]",
    context: "[ADD TEST CONTEXT]",
    sampleNote: "[ADD EVALUATION SAMPLE SIZE]",
  },
  {
    id: "latency",
    name: "Response latency",
    value: "[ADD VERIFIED LATENCY RESULT]",
    context: "[ADD HARDWARE AND TEST CONDITIONS]",
    sampleNote: "[ADD NUMBER OF TIMED RUNS]",
  },
  {
    id: "baseline-comparison",
    name: "Baseline comparison",
    value: "[ADD VERIFIED COMPARISON RESULT]",
    context: "[ADD BASELINE DESCRIPTION]",
    sampleNote: "[ADD EVALUATION SAMPLE SIZE]",
  },
];

/** The methodology block beneath the metric cards. */
export const methodology = [
  { id: "dataset", label: "Dataset / source", value: "[ADD DATASET OR SOURCE DESCRIPTION]" },
  { id: "split", label: "Test split / scenario set", value: "[ADD TEST SPLIT OR SCENARIO SET]" },
  { id: "baseline", label: "Baseline", value: "[ADD BASELINE, OR STATE NONE USED]" },
  { id: "limitations", label: "Evaluation limitations", value: "[ADD EVALUATION LIMITATIONS]" },
  { id: "reproducibility", label: "Reproducibility", value: "[ADD HOW TO REPRODUCE RESULTS]" },
];

/** Project-specific limitations shown in addition to the general ones in copy.ts. */
export const projectSpecificLimitations: { id: string; title: string; body: string }[] = [
  {
    id: "evaluation-scope",
    title: "Evaluation scope",
    body: "[ADD EVALUATION SCOPE: what was and was not tested]",
  },
  {
    id: "failure-modes",
    title: "Known failure modes",
    body: "[ADD KNOWN FAILURE MODES]",
  },
];

/* -------------------------------------------------------------------------- */
/* Recognition and contribution                                               */
/* -------------------------------------------------------------------------- */

export const recognition = {
  /**
   * Short badge text for the header, e.g. exact award wording. Leave null to
   * hide the header badge. Only set this to verified wording.
   */
  headerBadge: null as string | null,
  items: [
    { id: "name", label: "Award / competition", value: "[ADD VERIFIED AWARD NAME]" },
    { id: "placement", label: "Placement", value: "[ADD VERIFIED PLACEMENT]" },
    { id: "organizer", label: "Organizer", value: "[ADD ORGANIZER]" },
    { id: "date", label: "Date", value: "[ADD EVENT DATE]" },
    { id: "team", label: "Team", value: "[ADD TEAM MEMBERS]" },
  ],
  /**
   * Optional certificate or event photo. Put the file in /public/images and
   * set the fields below. Alt text must describe what the image shows.
   */
  image: null as null | { src: string; alt: string; width: number; height: number },
  imagePlaceholder: "[ADD CERTIFICATE OR EVENT IMAGE]",
};

export const contribution = {
  role: "[ADD MY ROLE]",
  summary: "[ADD MY CONTRIBUTION]",
  /** Precise, accurate, first-person-neutral bullets, e.g. "Led the retrieval and evaluation pipeline". */
  responsibilities: [
    "[ADD MY CONTRIBUTION: RESPONSIBILITY 1]",
    "[ADD MY CONTRIBUTION: RESPONSIBILITY 2]",
    "[ADD MY CONTRIBUTION: RESPONSIBILITY 3]",
  ],
  collaborators: "[ADD TEAM MEMBERS OR STATE INDIVIDUAL PROJECT]",
};

/* -------------------------------------------------------------------------- */
/* Technology stack                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Technologies used by the SmartPharma SYSTEM (not this website). RAG and
 * QLoRA come from the project brief; confirm they are accurate. Everything
 * else is a placeholder.
 */
export const techStack: TechGroup[] = [
  {
    id: "interface",
    title: "Interface and application",
    description: "How reviewers interact with the system.",
    icon: "monitor",
    items: [
      { name: "[ADD FRONTEND TECHNOLOGY]", purpose: "[ADD PURPOSE]", icon: "monitor" },
      { name: "[ADD BACKEND TECHNOLOGY]", purpose: "[ADD PURPOSE]", icon: "server" },
    ],
  },
  {
    id: "ai",
    title: "AI and retrieval",
    description: "Retrieval, language model and adaptation.",
    icon: "network",
    items: [
      {
        name: "Retrieval-augmented generation (RAG)",
        purpose: "Grounds model analysis in retrieved reference passages.",
        icon: "search",
      },
      {
        name: "QLoRA fine-tuning",
        purpose: "Parameter-efficient adaptation of the base language model.",
        icon: "cpu",
      },
      { name: "[ADD BASE MODEL]", purpose: "[ADD PURPOSE]", icon: "cpu" },
      { name: "[ADD VECTOR STORE / RETRIEVAL TOOLING]", purpose: "[ADD PURPOSE]", icon: "database" },
    ],
  },
  {
    id: "data",
    title: "Data and evaluation",
    description: "Knowledge sources, test sets and measurement.",
    icon: "flask",
    items: [
      { name: "[ADD DATA SOURCE]", purpose: "[ADD PURPOSE]", icon: "library" },
      { name: "[ADD EVALUATION TOOLING]", purpose: "[ADD PURPOSE]", icon: "bar-chart" },
    ],
  },
  {
    id: "tooling",
    title: "Deployment and tooling",
    description: "How the project is built, run and shared.",
    icon: "wrench",
    items: [
      { name: "[ADD DEPLOYMENT / RUNTIME]", purpose: "[ADD PURPOSE]", icon: "rocket" },
      { name: "[ADD DEVELOPMENT TOOLING]", purpose: "[ADD PURPOSE]", icon: "terminal" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Physical prototype                                                         */
/* -------------------------------------------------------------------------- */

/**
 * The "Meet the prototype" section. Photos live in public/images/prototype/.
 * To swap a photo, use a new filename, update its dimensions, and change
 * `src` so optimized image caches cannot serve the previous file.
 * Replace each "[ADD ...]" only with a verified fact.
 */
export const prototype = {
  eyebrow: "The prototype",
  /** One line under the heading. */
  description:
    "An AI-powered medication verification and clinical decision-support system",
  front: {
    image: {
      src: "/images/prototype/front.webp",
      alt: "Two hands holding the SmartPharma prototype: a touchscreen in a purple frame showing the SmartPharma Portal, with Patient Database and Patient View options.",
      width: 1536,
      height: 1024,
    } satisfies PrototypeImage,
    caption: "Front",
    detail: "Touchscreen review portal",
  },
  back: {
    image: {
      src: "/images/prototype/back-v4.webp",
      alt: "Back of the purple prototype casing, with a camera opening and two ventilation grilles.",
      width: 1024,
      height: 900,
    } satisfies PrototypeImage,
    caption: "Back",
    detail: "Camera opening and ventilation",
  },
  inside: {
    image: {
      src: "/images/prototype/inside.webp",
      alt: "The prototype opened up, showing a Raspberry Pi with a heatsink and fan, a camera module on a ribbon cable, and the display panel resting on the purple casing.",
      width: 700,
      height: 555,
    } satisfies PrototypeImage,
    caption: "Inside",
    detail: "Main parts of the prototype",
  },
  /** Pins are placed on the Inside photo. Order = number shown. */
  components: [
    {
      id: "pi",
      name: "Raspberry Pi 5",
      purpose: "Runs the kiosk software and coordinates the prototype hardware.",
      detail: "8GB RAM, quad-core 2.4GHz CPU.",
      pin: { x: 53, y: 24 },
    },
    {
      id: "cooler",
      name: "Cooling",
      purpose: "Helps manage heat while the prototype is operating.",
      detail: "Heatsink with active cooling fan.",
      pin: { x: 37.1, y: 45.5 },
    },
    {
      id: "camera",
      name: "Pi Camera",
      purpose: "Captures patient wristband QR codes for patient identification during bedside medication administration.",
      detail: "Interfaces with the Raspberry Pi for image processing.",
      pin: { x: 73.6, y: 44.6 },
    },
    {
      id: "display",
      name: "Touchscreen display",
      purpose: "Presents the interactive interface to the user.",
      detail: "7-inch touch display.",
      pin: { x: 25.7, y: 73.2 },
    },
    {
      id: "casing",
      name: "Casing",
      purpose: "Houses and protects the prototype hardware.",
      detail: "Custom 3D-printed enclosure.",
      pin: { x: 84.3, y: 76.8 },
    },
  ] satisfies PrototypeComponent[],
  notice: "Research prototype. Synthetic data only. Not a medical device.",
};
