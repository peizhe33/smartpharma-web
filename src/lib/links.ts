import { resources } from "@/content";
import type { ProjectLink } from "@/content";

export interface ResolvedLink {
  href: string;
  /** True when the link leaves the site and should open in a new tab. */
  external: boolean;
  /** True when the real URL has not been supplied and we fell back to an on-page section. */
  isFallback: boolean;
}

export function getResource(id: string): ProjectLink | undefined {
  return resources.find((r) => r.id === id);
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/**
 * Resolve a resource to a usable href. If the owner has not supplied a URL,
 * fall back to an on-page anchor so no CTA is ever a dead link.
 */
export function resolveLink(id: string, fallbackHash: string): ResolvedLink {
  const resource = getResource(id);
  if (resource?.href) {
    return { href: resource.href, external: isExternalHref(resource.href), isFallback: false };
  }
  return { href: fallbackHash, external: false, isFallback: true };
}
