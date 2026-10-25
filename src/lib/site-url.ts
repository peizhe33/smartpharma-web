import { identity } from "@/content";

/**
 * Canonical site URL, in priority order:
 *  1. identity.siteUrl from src/content/project.ts (set this once the domain is known)
 *  2. Vercel's built-in production URL variable (set automatically by Vercel, no configuration needed)
 *  3. localhost for local development
 */
export function getSiteUrl(): URL {
  const configured = identity.siteUrl;
  if (configured) return new URL(configured);
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

/** True once a real production URL is known (configured or provided by Vercel). */
export function hasKnownSiteUrl(): boolean {
  return Boolean(identity.siteUrl || process.env.VERCEL_PROJECT_PRODUCTION_URL);
}
