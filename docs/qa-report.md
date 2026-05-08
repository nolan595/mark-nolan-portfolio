# QA Report — Mark Nolan Portfolio

**Date:** 2026-05-08
**Reviewer:** QA Engineer (@qa-engineer)
**Build status at time of review:** PASS (zero errors, zero TS violations)
**Build status after fixes:** PASS

---

## Executive Summary

The codebase is well-structured and largely correct. The Next.js App Router layout, component decomposition, animation library separation, and accessibility scaffold are all sound. Nine issues were found and fixed directly. Three items require human action (missing assets that cannot be generated programmatically). One low-severity issue is flagged for awareness.

All Critical and High severity issues have been fixed. The final `pnpm build` passes cleanly with no TypeScript errors.

---

## Issues Found

### FIXED — Critical

#### C-01: `next/image` remote host not whitelisted
- **File:** `/next.config.ts`
- **Severity:** Critical
- **Description:** `ProjectCard` uses `next/image` with an external `placehold.co` URL as the placeholder image source. Next.js 16 blocks remote images from hosts not listed in `images.remotePatterns`. The build compiles without error but images silently fail to load at runtime — the user sees broken image boxes for every project card.
- **Fix applied:** Added `remotePatterns` entry for `placehold.co` to `next.config.ts`.

---

### FIXED — High

#### H-01: `scroll-behavior: smooth` conflicts with Lenis
- **File:** `/app/globals.css` line 95
- **Severity:** High
- **Description:** `html { scroll-behavior: smooth }` was set in global CSS alongside Lenis. Lenis replaces native scroll handling entirely — the CSS `scroll-behavior` conflicts with it, causing double-smoothing on anchor hash navigation and on `scrollIntoView()` calls (used by the hero scroll-cue button). Under reduced motion the `scroll-behavior: auto !important` override was working correctly, but the base state was wrong.
- **Fix applied:** Removed `scroll-behavior: smooth` from the `html` rule. Lenis is the single source of smooth scroll behaviour.

#### H-02: Custom cursor `cursor: none` applied to touch-capable tablets
- **File:** `/src/components/CustomCursor.tsx` line 15
- **Severity:** High
- **Description:** The guard condition was `window.innerWidth < 768`. A touch-screen tablet at 768px+ (iPad landscape, Surface) would have its native cursor hidden but no custom cursor visible, because the custom cursor element is only shown by mouse movement. Users on such devices would lose their cursor entirely.
- **Fix applied:** Changed the guard to `!window.matchMedia('(pointer: fine)').matches`. This correctly identifies devices with a precise pointer (mouse/trackpad) and excludes touch-primary devices regardless of screen width.

#### H-03: `useReducedMotion` initialises to `false` — GSAP runs before preference is read
- **File:** `/src/hooks/useReducedMotion.ts`
- **Severity:** High
- **Description:** The hook used `useState(false)` and set the real value in `useEffect`. GSAP animation setup happens in `useIsomorphicLayoutEffect` (which runs as `useLayoutEffect` on the client — before `useEffect`). This meant reduced-motion users saw at minimum one frame of the entrance animation before the preference was detected and the animated state was skipped.
- **Fix applied:** Changed to `useState(getInitialPreference)` where `getInitialPreference` reads `window.matchMedia` synchronously. This value is correct on first render in the browser, so `useLayoutEffect` GSAP setup branches correctly from the start. The `useEffect` still re-syncs to catch any edge-case between SSR hydration and first client render.

#### H-04: `data-cursor-image` attribute missing from project image links
- **File:** `/src/components/ProjectCard.tsx` line 41
- **Severity:** High
- **Description:** `CustomCursor` checks for `target.closest('[data-cursor-image]')` to switch to the "View →" pill cursor state. This attribute was never applied to the project image link element. The image cursor state was entirely unreachable — the cursor always showed the default dot or link ring over project images.
- **Fix applied:** Added `data-cursor-image=""` to the image `<a>` element in `ProjectCard`.

#### H-05: ThemeToggle overlay DOM leak on unmount
- **File:** `/src/components/ThemeToggle.tsx` line 15
- **Severity:** High
- **Description:** The clip-path circle overlay is appended to `document.body` and removed when `transitionend` fires. If the component unmounts before the transition completes (e.g., rapid navigation, hot reload), the overlay remains in the DOM permanently, blocking pointer events and covering the page with a solid fill. The `overlayRef` held a reference but no cleanup existed.
- **Fix applied:** Added a cleanup function to the mount `useEffect` that removes `overlayRef.current` if it exists when the component unmounts.

#### H-06: NavDots active state not communicated to assistive technology
- **File:** `/src/components/NavDots.tsx` line 47
- **Severity:** High
- **Description:** The visually active NavDot (expanded pill, filled accent colour) had no programmatic indication of active state. Screen reader users navigating via the dot links would have no way to know which section is currently in view. `aria-label` alone only provides the section name; it does not communicate selection state.
- **Fix applied:** Added `aria-current={isActive ? 'true' : undefined}` to each NavDot `<a>`. This is the correct ARIA pattern for indicating the active item in a page-section navigation.

---

### FIXED — Medium

#### M-01: Marquee speed not adjusted for mobile
- **File:** `/app/globals.css`, `/src/components/TechStackSection.tsx`
- **Severity:** Medium
- **Description:** The marquee animation duration was hardcoded to `20s` in the component inline style. The design spec requires approximately 30px/s on mobile and 50px/s on desktop. At a fixed `20s`, mobile users see the marquee move noticeably faster relative to their screen width, which can feel dizzying.
- **Fix applied:** Introduced `--marquee-duration` CSS custom property (`30s` base, `20s` at `md:` breakpoint) in `globals.css`. The component now references `var(--marquee-duration)` in the animation value.

#### M-02: Accent sweep border conflicting position declarations
- **File:** `/src/components/ProjectCard.tsx` lines 53–62
- **Severity:** Medium
- **Description:** The accent sweep span had `top-0` in its Tailwind className (sets `top: 0`) and `top: 'auto'` in its inline style. The inline style wins, making the `top-0` class silently inoperative. Additionally, `bottom: 0` and `top: auto` together meant the element was bottom-anchored and grew upward, which is the intended sweep direction — but the contradictory `top-0` class created confusion and risked breakage if class order or specificity changed.
- **Fix applied:** Removed `top-0` from the className and replaced with `bottom-0`. The inline style no longer needs to override position. The sweep-up behaviour is unchanged.

---

### NOT FIXED — Requires Human Action

#### NF-01: Missing public assets
- **Severity:** High (visual; does not break build)
- **Files missing:**
  - `/public/og-image.png` — used by OG meta tag; social previews will show nothing
  - `/public/icon.svg` — referenced in metadata `icons`
  - `/public/apple-touch-icon.png` — referenced in metadata `icons`
  - `/public/icon-192.png` — referenced in `site.webmanifest`
  - `/public/icon-512.png` — referenced in `site.webmanifest`
  - `/public/images/projects/clontarf-proshop.webp`
  - `/public/images/projects/hunch.webp`
  - `/public/images/projects/oconnor-cars.webp`
  - `/public/images/projects/eoin-obrien-golf.webp`
  - `/public/images/projects/percy-french-troubadours.webp`
- **Note on project images:** The `placehold.co` URLs in `ProjectCard` are used as a fallback. Once real `.webp` screenshots are added to `/public/images/projects/`, update `ProjectCard` to use `project.image` (the field from the data file) instead of the placeholder URL. The data model already has the correct paths defined.
- **Action required:** Create all favicon/icon assets in Figma and export. Capture project screenshots at 1440px × 2× DPR, export as WebP at <150KB each. The OG image spec is documented in `docs/api-spec.md` section 4.

#### NF-02: Bio copy is lorem ipsum placeholder
- **Severity:** Medium (content, not code)
- **File:** `/src/components/AboutSection.tsx` line 83
- **Description:** The about section body paragraph contains placeholder lorem ipsum text. The site cannot go live in this state.
- **Action required:** Replace with real bio copy. The field is a single `<p>` tag — a one-line content edit.

#### NF-03: Hero tagline is placeholder
- **Severity:** Medium (content, not code)
- **File:** `/src/components/HeroSection.tsx` line 247
- **Description:** The tagline reads "Frontend developer building *fast, considered* web experiences." — this appears to be a developer-written placeholder pending the final copy listed as an open decision in `portfolio-brief.md`.
- **Action required:** Finalise tagline copy per the brief. The italic word treatment using `<em className="font-display">` is already in place — update the surrounding copy around it.

---

### Low Severity — Flagged, Not Fixed

#### L-01: Vestigial `rafRef` in `CustomCursor`
- **File:** `/src/components/CustomCursor.tsx` line 12
- **Description:** `rafRef` is declared and cleaned up in the effect return, but no `requestAnimationFrame` call is ever made (the transform is applied directly in the `mousemove` handler). The ref is inert but adds noise.
- **Recommendation:** Remove `rafRef` and its cleanup line. Low priority — no functional impact.

---

## Test Coverage

No test files exist in this project. Given it is a static portfolio with no API routes or complex business logic, the primary risk surface is animation behaviour and accessibility — which are best covered by visual regression tests and manual/automated a11y audits rather than unit tests.

**Recommended test additions (priority order):**

1. **Accessibility audit**: Run `axe-core` against the rendered page (via `@axe-core/react` in development or a Playwright accessibility scan in CI). Key checks: landmark structure, heading hierarchy (single `<h1>`, `<h2>` per section, `<h3>` per project card), focus order, colour contrast.
2. **Visual regression baseline**: Capture screenshots at 375px and 1440px in both light and dark themes once real content is in place (Playwright or Percy).
3. **Unit test for `useTextScramble`**: The scramble timing logic has meaningful branching (letter stagger, completion detection, space handling). Test that: (a) all characters resolve to the correct final value, (b) the hook resolves immediately when `enabled = false`, (c) the `onComplete` callback fires exactly once.
4. **Unit test for `useReducedMotion`**: Confirm `getInitialPreference` returns correct values and the `change` event handler updates state.

---

## Accessibility Audit

| Check | Status | Notes |
|-------|--------|-------|
| `<header>` landmark | Pass | Present in `NavBar`, wraps nav content |
| `<main>` landmark | Pass | `id="main-content"` in `page.tsx` |
| `<footer>` landmark | Pass | `ContactFooter` renders `<footer>` |
| `aria-label` on sections | Pass | All five sections have descriptive `aria-label` |
| Single `<h1>` | Pass | Hero name only |
| `<h2>` for section headings | Pass | About, Work, Stack, Contact all use `<h2>` |
| `<h3>` for project titles | Pass | `ProjectCard` uses `<h3>` |
| Skip link | Pass | Present, visually hidden until focused, targets `#main-content` |
| ThemeToggle accessible label | Pass | Dynamic: "Switch to light/dark mode" |
| NavDot aria-current | Fixed (H-06) | Added `aria-current="true"` on active item |
| NavDots hidden on mobile | Pass | `hidden md:flex` — correctly hidden at 375px |
| Project image alt text | Pass | All five use `"[Title] — screenshot"` pattern per spec |
| Custom cursor cursor:none | Fixed (H-02) | Now uses `pointer: fine` media query |
| Marquee aria-hidden | Pass | `aria-hidden="true" role="presentation"` |
| External links rel | Pass | All `target="_blank"` links have `rel="noopener noreferrer"` |
| Focus visible styles | Pass | Global `:focus-visible` rule present; button-level overrides present |
| Reduced motion — GSAP | Pass | All GSAP blocks guarded by `prefersReducedMotion` |
| Reduced motion — marquee | Pass | `animation: none` applied when `prefersReducedMotion` |
| Reduced motion — theme toggle | Pass | Skips clip-path animation |
| Reduced motion — initial read | Fixed (H-03) | Now reads synchronously before first render |
| `<html lang>` | Pass | `lang="en"` present |
| `suppressHydrationWarning` | Pass | Present on `<html>` (required for `next-themes`) |

---

## Animation Library Separation

| Element | Library | Correct? |
|---------|---------|---------|
| Page-load entrance stagger | GSAP | Yes |
| Hero shape parallax | GSAP + ScrollTrigger | Yes |
| Shape drift loops | GSAP | Yes |
| Scroll-reveal (About, Work, Stack, Footer) | GSAP + ScrollTrigger | Yes |
| Hero text scramble | Custom RAF hook | Yes |
| Marquee | CSS animation | Yes |
| ProjectCard hover (image scale, shadow) | Framer Motion | Yes |
| NavDot morph (width/border-radius) | CSS transition | Yes |
| ContactFooter button states | Framer Motion | Yes |
| Theme toggle icon swap | CSS transition | Yes |
| Theme toggle clip-path reveal | CSS transition (on DOM element) | Yes |

No element is animated by both GSAP and Framer Motion simultaneously.

---

## Build Integrity

- `pnpm build` passes with zero errors before and after all fixes
- TypeScript strict mode: zero violations
- No `console.log` statements in production code
- No hardcoded localhost URLs
- No raw `<img>` tags — all images use `next/image`
- All `target="_blank"` links have `rel="noopener noreferrer"`

---

## Open Items for Human Review

| Item | Priority | Notes |
|------|----------|-------|
| Create favicon and icon assets | Before launch | `favicon.ico`, `icon.svg`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` |
| Create OG image | Before launch | 1200×630px PNG, spec in `docs/api-spec.md` §4 |
| Capture project screenshots | Before launch | WebP, 1200×675px (16:9), <150KB each |
| Finalise tagline copy | Before launch | Currently a developer placeholder |
| Replace lorem ipsum bio | Before launch | Single paragraph in `AboutSection` |
| Update `ProjectCard` to use `project.image` | After screenshots are added | Currently uses `placehold.co` URL hardcoded in JSX; `project.image` field already has correct paths |
| Set `NEXT_PUBLIC_SITE_URL` in Netlify | Before go-live | Required for canonical URL and absolute OG image path |
