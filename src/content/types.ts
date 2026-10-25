/**
 * Shared types for SmartPharma content.
 *
 * Icons are referenced by string key (see src/components/icons.tsx) so content
 * stays plain, serialisable data that can cross the server/client boundary.
 */

export type IconKey =
  | "shield-check"
  | "book-open"
  | "cpu"
  | "user-check"
  | "clipboard-list"
  | "git-branch"
  | "mail"
  | "user"
  | "file-text"
  | "presentation"
  | "image"
  | "play"
  | "database"
  | "search"
  | "layers"
  | "server"
  | "code"
  | "flask"
  | "workflow"
  | "lock"
  | "eye"
  | "gauge"
  | "scale"
  | "award"
  | "users"
  | "list-checks"
  | "terminal"
  | "package"
  | "wrench"
  | "rocket"
  | "network"
  | "file-search"
  | "history"
  | "monitor"
  | "inbox"
  | "library"
  | "bar-chart"
  | "globe"
  | "clock"
  | "info";

/** A link the owner may or may not have supplied yet. `href: null` = not yet available. */
export interface ProjectLink {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  href: string | null;
  /** Shown (and searchable) while `href` is null. */
  placeholder: string;
  /** If true, href is a mailto: link and should not open in a new tab. */
  isEmail?: boolean;
}

export type ImplementationStatus =
  | "implemented"
  | "simulated"
  | "evaluated"
  | "proposed"
  /** Owner has not yet confirmed the status. Renders as a visible placeholder. */
  | "unconfirmed";

export interface Metric {
  id: string;
  name: string;
  /** Replace with the verified value, e.g. "93.4%". */
  value: string;
  /** What was tested, under which conditions. */
  context: string;
  /** Sample size / evaluation scope note. */
  sampleNote: string;
}

export interface ArchitectureNode {
  id: string;
  name: string;
  layerId: string;
  icon: IconKey;
  /** One-line, implementation-neutral description of the component's role. */
  role: string;
  status: ImplementationStatus;
  /** Shown in the "Technical details" panel. */
  technicalDetail: string;
}

export interface ArchitectureLayer {
  id: string;
  index: number;
  name: string;
  summary: string;
}

export interface TechItem {
  name: string;
  purpose: string;
  icon: IconKey;
  /** Lead technology of its layer: shown in the highlighted chip style. */
  primary?: boolean;
}

export interface TechGroup {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  items: TechItem[];
}

/** A labelled hardware part shown on the "Inside" photo and in the list beneath it. */
export interface PrototypeComponent {
  id: string;
  name: string;
  /** Short role description. */
  purpose: string;
  /** Spec or detail. Keep as an "[ADD ...]" placeholder until verified. */
  detail: string;
  /** Pin position on the Inside photo, as a percentage of its width and height. */
  pin: { x: number; y: number };
  /** Optional own photo for the details panel. If omitted, the Inside photo is zoomed in on the pin. */
  image?: PrototypeImage;
}

export interface PrototypeImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
