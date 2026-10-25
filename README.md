# SmartPharma

Portfolio and product-demonstration site for **SmartPharma**, an AI-assisted inpatient medication verification project.

> **Research and demonstration project.** Not intended for clinical diagnosis, prescribing, or unsupervised patient-care decisions. All patient data on the site is synthetic. The interactive demo is pre-written content and calls no model or external service.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and `lucide-react`. The only other runtime dependencies are two self-hosted fonts: Inter for the interface (`@fontsource-variable/inter`) and Fraunces for the SmartPharma wordmark (`@fontsource-variable/fraunces`). No database, authentication, analytics, third-party scripts or environment variables are needed.

---

## Local setup

Requires Node.js 20.9 or newer (22 recommended; see `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality checks:

```bash
npm run typecheck  # tsc --noEmit
npm run lint       # eslint
npm run build      # production build
npm run check      # all three, in order
npm run start      # serve the production build
```

---

## Replacing placeholder content

Everything unverified is shown as a visible, dashed-outline `[ADD ...]` placeholder. To list what is left:

```bash
grep -rn "\[ADD" src
```

| What you want to change | File |
| --- | --- |
| Links (GitHub, demo video, report, poster, slides, LinkedIn, contact email) | `src/content/project.ts` → `resources` |
| Creator name, copyright year, project status, production URL | `src/content/project.ts` → `identity` |
| Hero proof points (detection, latency, award) | `src/content/project.ts` → `heroProofPoints` |
| Metric cards and methodology block | `src/content/project.ts` → `metrics`, `methodology` |
| Project-specific limitations | `src/content/project.ts` → `projectSpecificLimitations` |
| Award details, header award badge, certificate image | `src/content/project.ts` → `recognition` |
| Your contribution and team | `src/content/project.ts` → `contribution` |
| Architecture status and technical detail per component | `src/content/project.ts` → `architectureStatus`, `architectureDetail` |
| Technology stack | `src/content/project.ts` → `techStack` |
| Headlines, workflow text, general limitations, footer disclaimer | `src/content/copy.ts` |
| Synthetic demo order, evidence, checks, audit events | `src/content/demo.ts` |
| Architecture layers and component roles | `src/content/architecture.ts` |
| Colours, type scale, radii, shadows | `src/app/globals.css` (`@theme`) |

### Rules of thumb

- Replace a placeholder only with a verified fact. Never estimate a number.
- **Links:** set `href` to a full URL. While `href` is `null`, the resource card is shown as "Not yet available", and CTAs fall back to on-page sections (the interactive demo, or the Resources section), so nothing is a dead link. External links open with `rel="noopener noreferrer"`.
- **Architecture status:** set each component to `implemented`, `simulated`, `evaluated` or `proposed`. Until you do, it shows `[ADD STATUS]`. **Confirm RAG and QLoRA are genuinely used before publishing**; if not, set them to `proposed` or delete them from `architecture.ts` and `techStack`.
- **Header award badge:** set `recognition.headerBadge` to the exact verified wording. `null` hides it.
- **Certificate or event image:** put the file in `public/images/`, then set `recognition.image` to `{ src: "/images/your-file.jpg", alt: "…describes what it shows…", width, height }`.
- **Metrics:** remove slots that do not apply and copy an entry to add more. Do not add charts without the underlying data.
- **Production URL:** set `identity.siteUrl` (for example `"https://smartpharma.vercel.app"`) once known. This enables the canonical URL, sitemap reference and structured-data URL. On Vercel, the built-in `VERCEL_PROJECT_PRODUCTION_URL` is used automatically if `siteUrl` is left `null`; you do not need to configure anything.
- If you embed a demo video from YouTube or Vimeo, update `frame-src` in `next.config.ts`; it is currently `'none'`.

---

## Project structure

```
src/
  app/
    layout.tsx            Root layout, metadata, skip link, JSON-LD
    page.tsx              Home page (section order)
    globals.css           Design tokens (@theme), base styles, utilities
    not-found.tsx         Custom 404
    error.tsx             Runtime error boundary
    icon.svg              Favicon
    apple-icon.tsx        Apple touch icon (generated)
    opengraph-image.tsx   Social preview image (generated)
    robots.ts, sitemap.ts
  components/
    SiteHeader.tsx        Sticky nav, section highlighting, mobile drawer (client)
    SiteFooter.tsx        Footer, disclaimer, copy-link
    CopyLinkButton.tsx    Copies the page URL, announces result (client)
    Logo.tsx, icons.tsx
    FlowVisual.tsx        Animated order > evidence > analysis > reviewer flow (CSS only)
    HeroBackdrop.tsx      Drifting green orbs + cursor-following orbs behind the hero (client)
    AnimatedWordmark.tsx  Letter-by-letter "SmartPharma" with a green wave and cursor lift (client)
    ui/                   Button, Badge, Card, Section, Ph (placeholder), RelevanceBars,
                          Reveal (scroll-in animation, client)
    sections/             Hero, TrustStrip, Problem, Workflow, Demo (client),
                          Architecture, Validation (+ Limitations), Stack,
                          Impact (recognition + contribution), Resources, FinalCta
  content/                All content as typed data (see table above)
  lib/                    links.ts, site-url.ts, cn.ts
public/images/            Place certificate/event images here
```

Client components (the only ones shipping interactive JavaScript): `SiteHeader`, `Demo`, `CopyLinkButton`, `Reveal`, `HeroBackdrop`, `AnimatedWordmark`, `error.tsx`. The architecture "Technical details" panel is a native `<details>` element and needs no JavaScript.

---

## Deploying to Vercel (free Hobby plan)

1. Push this folder to a GitHub repository (not done for you).
2. In Vercel choose **Add New → Project**, import the repository.
3. Framework preset is detected as **Next.js**; keep the defaults (`vercel.json` is already included). No environment variables are required.
4. Click **Deploy**.
5. Once you have the final domain, set `identity.siteUrl` in `src/content/project.ts` and redeploy.

CLI alternative: `npx vercel` (preview) and `npx vercel --prod`.

---

## Security headers

`next.config.ts` sets a Content-Security-Policy, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy` and HSTS. The CSP allows inline scripts and styles because Next.js injects small inline bootstrap scripts; a nonce-based policy would force dynamic rendering. No analytics are included. If you add any, document what they collect and never send health or sensitive form data.

---

## Hero motion

- **Background:** three large green/teal orbs drift continuously (CSS). Three more orbs chase the mouse, each with a different lag, and glide back to the centre when the mouse leaves. Tweak colours, sizes and lag (`k`) in `src/components/HeroBackdrop.tsx`; the animation curves are in `globals.css` (`orb-a/b/c`, `breathe`).
- **Wordmark:** `src/components/AnimatedWordmark.tsx` and the `.wm-*` rules in `globals.css`. Change the font in `--font-display` (and the import in `src/app/layout.tsx`).
- **Switched off automatically** on touch screens (cursor effects only), and entirely under `prefers-reduced-motion`. Cursor tracking also pauses while the hero is off screen.
- **Legibility:** the backdrop is pale by design. With all three followers stacked on the title (the worst case), sampled pixel contrast was: wordmark 4.2 to 7.5, "Meet" 5.5, tagline 5.5, eyebrow 6.4 (all pass WCAG AA). If you make the orbs stronger, re-check this.

## Accessibility and design notes

- Light, white design with a healthcare-green `brand` accent (tokens in `globals.css`). The hero ("Meet SmartPharma"), drifting background colour, flow line and scroll-in reveals are CSS/IntersectionObserver only and switch off under `prefers-reduced-motion`. Content is fully visible without JavaScript.
- To keep text short, long explanations live behind native expanders (workflow details, architecture technical details, methodology).

- Targets WCAG 2.2 AA: semantic landmarks, skip link, keyboard-operable tabs (arrow keys, Home, End), native `<dialog>` mobile menu (focus trap, Esc), visible focus outlines, reduced-motion support, 44px minimum touch targets on small screens.
- State is never colour-only: status badges pair colour with an icon and text.
- Deliberate deviations from the supplied Blend token spec, for contrast (details in `globals.css`): filled buttons use brand green 700 (white text passes AA); secondary text uses Gray 600 instead of 500; status text uses darker green/amber/red steps; the focus ring is a 2px blue outline instead of the near-invisible 3px pale ring.

---

## Known limitations

- The demo is a scripted simulation with one synthetic order. It does not run a model.
- Component status, metrics, award, contribution and links are placeholders until you supply verified information.
- The social preview image is generated from static text and shows no metrics or awards.
- Automated accessibility tooling (axe, Lighthouse) was not run in the build environment; run Lighthouse and axe against the deployed site before relying on a score.
