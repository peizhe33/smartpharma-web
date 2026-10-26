import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter/opsz.css";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { identity, nav, recognition } from "@/content";
import { resolveLink } from "@/lib/links";
import { getSiteUrl, hasKnownSiteUrl } from "@/lib/site-url";

const visibleNav = nav.filter((item) => item.id !== "impact");

const title = `${identity.name}: ${identity.descriptor}`;
const description =
  "SmartPharma is a research and demonstration project that assists inpatient medication-order review with retrieval, model reasoning and transparent evidence, always under human oversight. Not for clinical use.";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: title,
    template: `%s | ${identity.name}`,
  },
  description,
  applicationName: identity.name,
  keywords: [
    "SmartPharma",
    "medication verification",
    "inpatient medication safety",
    "retrieval-augmented generation",
    "QLoRA",
    "human-in-the-loop",
    "healthcare AI research",
  ],
  // Canonical is only emitted once a real production URL is known.
  alternates: hasKnownSiteUrl() ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    siteName: identity.name,
    title,
    description,
    url: "/",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const demo = resolveLink("demo", "#demo");
  const github = resolveLink("github", "#resources");

  // Truthful structured data only: no ratings, pricing, organisation or author claims.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: identity.name,
    description,
    genre: "Research and demonstration project",
    ...(hasKnownSiteUrl() ? { url: getSiteUrl().toString() } : {}),
  };

  return (
    <html lang="en">
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-ctrl bg-gray-950 px-4 py-3 text-body-md font-medium text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <SiteHeader nav={visibleNav} demo={demo} github={github} badge={recognition.headerBadge} />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Escape "<" so the JSON cannot terminate the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
