import type { MetadataRoute } from "next";
import { getSiteUrl, hasKnownSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(hasKnownSiteUrl() ? { sitemap: new URL("/sitemap.xml", getSiteUrl()).toString() } : {}),
  };
}
