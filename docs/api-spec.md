# API Spec — Mark Nolan Portfolio

**Version:** 1.0  
**Date:** 2026-05-08  
**Status:** Source of truth — do not modify after development begins. Changes go in `api-delta.md`.

---

## Overview

This is a static/semi-static Next.js portfolio site. There is no database and no authentication. The "backend" surface is deliberately minimal:

1. A typed data layer for projects and tech stack (file-based, no API calls at runtime)
2. A single serverless API route for contact form submission
3. Next.js metadata configuration for SEO and social sharing
4. Environment variable definitions

---

## 1. Project Data Model

### Location

`/src/data/projects.ts`

This is the single file an author edits to add or modify projects. The frontend reads it at build time — no runtime fetch, no external CMS. Adding a project is one object added to the exported array.

### TypeScript Interface

```typescript
export type TechTag =
  | 'Next.js'
  | 'React'
  | 'TypeScript'
  | 'JavaScript'
  | 'Tailwind CSS'
  | 'Node.js'
  | 'PostgreSQL'
  | 'Prisma'
  | 'AWS'
  | 'Netlify'
  | string; // allow future additions without a type change

export interface Project {
  /** Unique slug — used as the HTML id and for aria-label generation. kebab-case. */
  slug: string;

  /** Display index shown in the UI, e.g. "01". String so the format is controlled here, not in JSX. */
  index: string;

  /** Full project title as displayed in the card heading. */
  title: string;

  /** One sentence. Shown in the card subtitle and in OG/meta descriptions if referenced. */
  tagline: string;

  /**
   * Two to four sentences. Shown in the expanded card or project detail area.
   * Plain text — no markdown. The component handles rendering.
   */
  description: string;

  /** Tech tags displayed as pill badges. Order is display order. */
  tech: TechTag[];

  /** Fully-qualified external URL including protocol. */
  liveUrl: string;

  /**
   * Path to the project screenshot relative to /public.
   * Example: "/images/projects/clontarf-proshop.webp"
   * Required. Use next/image. Target dimensions: 1200×675px (16:9).
   */
  image: string;

  /**
   * Alt text for the screenshot. Must be descriptive.
   * Pattern: "[Title] — screenshot"
   */
  imageAlt: string;

  /**
   * Whether to feature this project. Featured projects appear in the main
   * Selected Work section. Non-featured projects are excluded from the
   * initial render but available if a future "Show all" toggle is added.
   * Default: true.
   */
  featured?: boolean;
}
```

### Populated Data (`/src/data/projects.ts`)

```typescript
import type { Project } from '@/types/project';

export const projects: Project[] = [
  {
    slug: 'clontarf-proshop',
    index: '01',
    title: 'Clontarf Paradise Golf',
    tagline: 'Modern pro shop site for Clontarf Golf Club — products, vouchers, and lesson bookings.',
    description:
      'A clean, premium-feeling site for a Dublin golf club\'s pro shop. Browse products, buy gift vouchers, and book 1:1 lessons with a PGA professional. Built to feel welcoming to both members and visitors.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Netlify'],
    liveUrl: 'https://clontarfproshop.com/',
    image: '/images/projects/clontarf-proshop.webp',
    imageAlt: 'Clontarf Paradise Golf — screenshot',
    featured: true,
  },
  {
    slug: 'hunch',
    index: '02',
    title: 'Hunch',
    tagline: 'Marketing site for Hunch, an in-house F2P prediction games studio for the Super sportsbook ecosystem.',
    description:
      'A polished B2B-leaning site explaining Hunch\'s offering — pick\'em, streak games, and tournament specials — with regional reach across six markets. Showcases product, team, and integrations.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://home.playhunch.io/',
    image: '/images/projects/hunch.webp',
    imageAlt: 'Hunch — screenshot',
    featured: true,
  },
  {
    slug: 'oconnor-cars',
    index: '03',
    title: "O'Connor Cars",
    tagline: 'Local site for a family-run VW/Audi specialist garage in Finglas, Dublin.',
    description:
      'Service listings, NCT pre-check guide, opening hours, and contact details for a North Dublin garage. Built to feel trustworthy and local — clear info architecture, easy to find a phone number.',
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Netlify'],
    liveUrl: 'https://oconnor-cars.netlify.app/',
    image: '/images/projects/oconnor-cars.webp',
    imageAlt: "O'Connor Cars — screenshot",
    featured: true,
  },
  {
    slug: 'eoin-obrien-golf',
    index: '04',
    title: 'Eoin O\'Brien Golf',
    tagline: 'Personal coaching site for the PGA Head Professional at Clontarf Golf Club.',
    description:
      'Bookings, vouchers, and about content for a private golf coach offering 1:1 lessons, video analysis, and on-course sessions. Integrates with YouCanBookMe for scheduling.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://eoinobriengolf.com/',
    image: '/images/projects/eoin-obrien-golf.webp',
    imageAlt: "Eoin O'Brien Golf — screenshot",
    featured: true,
  },
  {
    slug: 'percy-french-troubadours',
    index: '05',
    title: 'Percy French Troubadours',
    tagline: 'Site for an Irish charity choir performing the songs and poems of Percy French.',
    description:
      'Editorial-style site celebrating the work of an Irish heritage choir that has raised significant funds for charity. Includes about, audience reviews, charity impact counter, and booking enquiries.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    liveUrl: 'https://percyfrenchtroubadours.com/',
    image: '/images/projects/percy-french-troubadours.webp',
    imageAlt: 'Percy French Troubadours — screenshot',
    featured: true,
  },
];

/** Featured projects in display order. Used by the Selected Work section. */
export const featuredProjects = projects.filter((p) => p.featured !== false);
```

### Scaling to 12+ Projects

When the project count exceeds the visible section limit, the pattern is:

1. Set `featured: false` on older entries to hide them from the initial render.
2. Add a "Show all projects" toggle in the UI that renders the full `projects` array.
3. No data migration, no API change — the toggle is a UI-only concern.
4. The `index` field is a display string, not derived from array position, so reordering does not require updating every entry.

---

## 2. Tech Stack Data Model

### Location

`/src/data/stack.ts`

Same pattern as projects: a typed, file-driven array read at build time. One file to edit to add or remove a technology.

### TypeScript Interface

```typescript
export type StackCategory =
  | 'Frameworks & Languages'
  | 'Styling'
  | 'Database & ORM'
  | 'Cloud & Deploy'
  | 'Design';

export interface StackItem {
  /** Display label shown in the badge. */
  label: string;

  /** Category used to group items in the UI. */
  category: StackCategory;

  /**
   * Optional SVG icon path relative to /public, or a React component name
   * if using a library like simple-icons. Leave undefined if no icon is used.
   * Example: "/icons/nextjs.svg"
   */
  icon?: string;

  /**
   * Whether to show this item in the marquee/ticker showpiece animation.
   * Default: true.
   */
  inMarquee?: boolean;
}
```

### Populated Data (`/src/data/stack.ts`)

```typescript
import type { StackItem } from '@/types/stack';

export const stack: StackItem[] = [
  // Frameworks & Languages
  { label: 'Next.js',     category: 'Frameworks & Languages', inMarquee: true },
  { label: 'React',       category: 'Frameworks & Languages', inMarquee: true },
  { label: 'Node.js',     category: 'Frameworks & Languages', inMarquee: true },
  { label: 'TypeScript',  category: 'Frameworks & Languages', inMarquee: true },
  { label: 'JavaScript',  category: 'Frameworks & Languages', inMarquee: false },

  // Styling
  { label: 'Tailwind CSS', category: 'Styling', inMarquee: true },

  // Database & ORM
  { label: 'PostgreSQL',  category: 'Database & ORM', inMarquee: true },
  { label: 'Prisma',      category: 'Database & ORM', inMarquee: true },

  // Cloud & Deploy
  { label: 'AWS',         category: 'Cloud & Deploy', inMarquee: true },
  { label: 'Netlify',     category: 'Cloud & Deploy', inMarquee: true },

  // Design
  { label: 'Figma',       category: 'Design', inMarquee: true },
];

/** Items grouped by category, in display order. */
export function groupedStack(): Record<StackCategory, StackItem[]> {
  return stack.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<StackCategory, StackItem[]>);
}

/** Items flagged for the marquee ticker. */
export const marqueeItems = stack.filter((s) => s.inMarquee !== false);
```

---

## 3. Contact Handling

### Decision: Mailto Link (no serverless handler)

**Recommendation:** Use a `mailto:` link. Do not build a serverless contact route.

**Rationale:**

| Factor | Mailto | Serverless handler |
|--------|--------|--------------------|
| Infrastructure complexity | None | Requires a third-party email provider (Resend, SendGrid, etc.) and an env secret |
| Spam risk | None (browser opens local mail client) | Rate-limiting and CAPTCHA required to prevent abuse |
| Delivery reliability | User's mail client handles it — no server-side failure mode | Can fail silently if provider is down or secret rotates |
| Maintenance | Zero | Dependency on email provider API; SDK updates; secret rotation |
| Audience fit | Mark's audience is recruiters and clients who will follow up directly. A form offers no material conversion benefit over a visible email address | |
| Netlify Forms | Would require Netlify Forms (free tier: 100 submissions/month) plus spam filtering — adds complexity for uncertain benefit | |

The site already shows a direct email address in the footer CTA. A form adds an extra step without adding trust or reducing friction for this audience.

**If a contact form is added in future,** a serverless handler spec is documented in the Future Endpoints section at the bottom of this file.

### Mailto Link Format

```
mailto:markjnolan00@gmail.com?subject=Portfolio%20enquiry
```

Rendered in the footer as:

```tsx
<a
  href="mailto:markjnolan00@gmail.com?subject=Portfolio%20enquiry"
  aria-label="Send Mark an email"
>
  markjnolan00@gmail.com
</a>
```

The `subject` pre-fill is intentional — it disambiguates portfolio-originated email from other mail in the inbox and removes a step for the sender.

---

## 4. Next.js Metadata Configuration

### Location

`/src/app/layout.tsx` (root layout — applies to all routes)

### Static Metadata Export

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  // --- Core ---
  title: {
    default: 'Mark Nolan — Frontend Developer',
    template: '%s | Mark Nolan',
  },
  description:
    'Mark Nolan is a frontend developer specialising in Next.js, React, and Tailwind CSS. ' +
    'Portfolio of client sites built with craft, performance, and motion design.',

  // --- Canonical ---
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marknolan.dev'),
  alternates: {
    canonical: '/',
  },

  // --- Open Graph ---
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Mark Nolan',
    title: 'Mark Nolan — Frontend Developer',
    description:
      'Portfolio of client sites built with Next.js, React, and Tailwind CSS. ' +
      'Motion design, performance, and craft.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mark Nolan — Frontend Developer',
        type: 'image/png',
      },
    ],
    locale: 'en_IE',
  },

  // --- Twitter / X ---
  twitter: {
    card: 'summary_large_image',
    title: 'Mark Nolan — Frontend Developer',
    description:
      'Portfolio of client sites built with Next.js, React, and Tailwind CSS.',
    images: ['/og-image.png'],
  },

  // --- Robots ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // --- Icons ---
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },

  // --- Manifest ---
  manifest: '/site.webmanifest',

  // --- Verification (add when domains are registered) ---
  // verification: {
  //   google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  // },
};
```

### OG Image Specification

| Property | Value |
|----------|-------|
| File | `/public/og-image.png` |
| Dimensions | 1200 × 630px |
| Format | PNG (not WebP — broader platform support for OG) |
| Content | Name, tagline, and a simplified version of the hero geometric shapes on the dark theme background (`#111010`) |
| Text | "Mark Nolan" in Instrument Serif at ~72px, tagline in DM Sans at ~28px, accent line in cyan (`#00D4CC`) |

The OG image uses the dark theme intentionally — it photographs well as a link preview across both light and dark social feed contexts, and the cyan-on-near-black contrast is strong (`~9.1:1`).

**Generation approach:** Create manually in Figma and export to `/public/og-image.png`. Do not use `next/og` (ImageResponse) — the site has no dynamic routes that need dynamic OG images, and a static image has zero cold-start latency.

### Favicon Assets Required in `/public`

| File | Size | Notes |
|------|------|-------|
| `favicon.ico` | 32×32, multi-size | Browser tab fallback |
| `icon.svg` | Scalable | Modern browsers prefer this |
| `apple-touch-icon.png` | 180×180 | iOS home screen |
| `og-image.png` | 1200×630 | Social sharing |
| `site.webmanifest` | — | PWA/bookmark metadata |

### `site.webmanifest`

```json
{
  "name": "Mark Nolan",
  "short_name": "Mark Nolan",
  "description": "Frontend Developer Portfolio",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#111010",
  "theme_color": "#111010",
  "icons": [
    { "src": "/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

---

## 5. Environment Variables

### Table

| Variable | Scope | Required | Example Value | Purpose |
|----------|-------|----------|---------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Public | Yes | `https://marknolan.dev` | Used in `metadataBase` for canonical URL generation and absolute OG image URLs. Must be the production domain once known. During local dev, set to `http://localhost:3000`. |
| `NEXT_PUBLIC_LINKEDIN_URL` | Public | No | `https://www.linkedin.com/in/mark-nolan-6158001ba/` | Centralises the LinkedIn URL. Avoids hardcoding in multiple components. Optional — can be hardcoded in `siteConfig.ts` since it never changes. |
| `NEXT_PUBLIC_EMAIL` | Public | No | `markjnolan00@gmail.com` | Centralises the contact email for the `mailto:` link and any displayed email copy. Optional — can be hardcoded in `siteConfig.ts`. |

No server-only secrets are required for the current feature set. If a contact form serverless handler is added later, `CONTACT_EMAIL_API_KEY` (server-only, no `NEXT_PUBLIC_` prefix) would be added at that point.

### `.env.local` (local development)

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/mark-nolan-6158001ba/
NEXT_PUBLIC_EMAIL=markjnolan00@gmail.com
```

### Netlify Environment (production)

Set in Netlify UI under **Site configuration → Environment variables**:

```
NEXT_PUBLIC_SITE_URL=https://marknolan.dev
NEXT_PUBLIC_LINKEDIN_URL=https://www.linkedin.com/in/mark-nolan-6158001ba/
NEXT_PUBLIC_EMAIL=markjnolan00@gmail.com
```

`NEXT_PUBLIC_*` variables must be set in Netlify before the build runs — they are inlined at build time by Next.js and are not available at runtime on static output.

---

## 6. Site Config Singleton

To avoid importing env vars directly in every component, centralise identity data in one file:

### Location

`/src/config/site.ts`

```typescript
export const siteConfig = {
  name: 'Mark Nolan',
  title: 'Mark Nolan — Frontend Developer',
  description:
    'Frontend developer specialising in Next.js, React, and Tailwind CSS. ' +
    'Portfolio of client sites built with craft, performance, and motion design.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://marknolan.dev',
  email: process.env.NEXT_PUBLIC_EMAIL ?? 'markjnolan00@gmail.com',
  linkedIn: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? 'https://www.linkedin.com/in/mark-nolan-6158001ba/',
  ogImage: '/og-image.png',
} as const;

export type SiteConfig = typeof siteConfig;
```

Components import from `siteConfig` rather than `process.env` directly. This is the single place to update if any identity detail changes.

---

## 7. File & Directory Structure

The data layer files fit into the following structure. Frontend scaffolding is for the `@fe-developer` agent — listed here only to show where data files land.

```
/
├── public/
│   ├── favicon.ico
│   ├── icon.svg
│   ├── apple-touch-icon.png
│   ├── og-image.png
│   ├── site.webmanifest
│   ├── icon-192.png
│   ├── icon-512.png
│   └── images/
│       └── projects/
│           ├── clontarf-proshop.webp
│           ├── hunch.webp
│           ├── oconnor-cars.webp
│           ├── eoin-obrien-golf.webp
│           └── percy-french-troubadours.webp
├── src/
│   ├── app/
│   │   └── layout.tsx          ← metadata export lives here
│   ├── config/
│   │   └── site.ts             ← siteConfig singleton
│   ├── data/
│   │   ├── projects.ts         ← project entries + featuredProjects export
│   │   └── stack.ts            ← stack items + groupedStack() + marqueeItems
│   └── types/
│       ├── project.ts          ← Project interface
│       └── stack.ts            ← StackItem, StackCategory interfaces
├── .env.local                  ← local dev env (gitignored)
└── .env.example                ← committed, shows required var names with placeholder values
```

### `.env.example` (committed to repo)

```
# Required — set to production domain before go-live
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional — can be hardcoded in src/config/site.ts instead
NEXT_PUBLIC_LINKEDIN_URL=
NEXT_PUBLIC_EMAIL=
```

---

## 8. Project Image Guidelines

Images live in `/public/images/projects/`. All are served via `next/image` for automatic format negotiation, resizing, and lazy loading.

| Property | Value |
|----------|-------|
| Format | WebP (source). `next/image` will serve AVIF where the browser supports it. |
| Dimensions | 1200 × 675px (16:9 aspect ratio, as required by `ProjectCard` component) |
| File size target | < 150KB each after compression |
| Naming convention | `[slug].webp` matching the `slug` field in `projects.ts` |
| Alt text | Defined in the `imageAlt` field of each `Project` object — never hardcoded in JSX |

Screenshots should be captured at 1440px viewport width with a 2× device pixel ratio (retina), then downscaled to 1200px wide. This gives clean edges and readable text in the card thumbnails.

---

## 9. Future Endpoints (Not Built Now)

### POST `/api/contact`

If a contact form replaces the mailto link in a future iteration, the handler would be:

**Method:** `POST /api/contact`  
**Auth:** None (public)  
**Rate limit:** 5 requests per IP per hour (via Netlify Edge or `@upstash/ratelimit`)

**Request body:**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | string | Yes | 1–100 chars, trimmed |
| `email` | string | Yes | Valid email format (Zod `z.string().email()`) |
| `message` | string | Yes | 10–2000 chars, trimmed |

**Success response — 200:**

```json
{
  "success": true,
  "data": null,
  "meta": { "message": "Message sent. Mark will be in touch." }
}
```

**Error responses:**

| Status | `code` | When |
|--------|--------|------|
| 422 | `VALIDATION_ERROR` | Any field fails validation. `details` contains Zod error map. |
| 429 | `RATE_LIMITED` | More than 5 submissions from this IP in the past hour |
| 500 | `SEND_FAILED` | Email provider call failed |

```json
{
  "success": false,
  "error": "Validation failed",
  "code": "VALIDATION_ERROR",
  "details": { "email": ["Invalid email address"] }
}
```

**Implementation would require:**
- An email provider account (Resend recommended — generous free tier, excellent DX)
- `RESEND_API_KEY` environment variable (server-only, no `NEXT_PUBLIC_` prefix)
- Zod schema validation before touching any provider call
- Honeypot field in the form to catch basic bots without CAPTCHA friction
