# Design Spec — Mark Nolan Portfolio

**Version:** 1.0  
**Date:** 2026-05-08  
**Status:** Source of truth — do not modify after development begins. Changes go in `design-delta.md`.

---

## 1. Concept & Direction

### Aesthetic Direction: Kinetic Minimalism

The design operates on a single idea: **restraint in space, boldness in motion**. Every still frame looks like a considered editorial layout — clean, high-contrast, type-led. But the site is never truly still. Shapes drift, sections reveal themselves with weight, and the cursor leaves a trace. When a recruiter or client screenshots this portfolio, it looks minimal. When they experience it live, they remember it as alive.

This is not a "creative chaos" portfolio. Mark's work is modern, client-facing, and technically confident — the design reflects that. Nothing is decorative without purpose. The geometric shapes are structural composition elements that happen to move.

### Mood References
- The spatial tension of a Muji store (negative space as a design decision)
- The motion language of Linear's website (purposeful, spring-physics-driven)
- The typographic confidence of a Pentagram case study page
- The colour precision of Vercel's dark theme (not copied — referenced as a bar to meet)

### What Makes This Specific
1. Two distinct accent colours — one warm (light theme), one electric (dark theme) — that do NOT share a hue. The themes feel like they were designed for different contexts, not toggled.
2. The abstract shapes are not blobs or noise. They are precise geometric forms: rotated rectangles, partial circles, ruled lines — architectural rather than organic. They move at different parallax rates and cast soft shadows.
3. The display typeface has visible personality but remains legible at 14px — it is not a novelty face.

---

## 2. Colour System

### Design Principle
Light theme: warm off-white ground, deep charcoal text, **amber/gold accent** — feels like a premium printed document come to life.  
Dark theme: near-black ground with a slight warm undertone (not pure cold grey), **electric cyan accent** — feels like a control room. Professional, confident, technical.

Neither theme is an inversion of the other. The shape colours change entirely between themes.

### Light Theme Tokens

```css
:root[data-theme="light"] {
  /* Surfaces */
  --color-bg:           #F5F2ED;   /* warm off-white — not paper white */
  --color-surface:      #FFFFFF;   /* card / elevated surface */
  --color-surface-2:    #EDE9E2;   /* subtle inset / secondary surface */

  /* Text */
  --color-text-primary:   #1A1815; /* near-black, warm undertone */
  --color-text-secondary: #6B6560; /* muted warm grey */
  --color-text-tertiary:  #A09890; /* disabled / placeholder */

  /* Accent — Amber Gold */
  --color-accent:         #D4820A; /* primary amber */
  --color-accent-hover:   #B8700A; /* darker on hover */
  --color-accent-muted:   #F5DBA8; /* tint for backgrounds */
  --color-accent-fg:      #FFFFFF; /* text on accent bg */

  /* Borders & Shadows */
  --color-border:         #DDD8D0; /* subtle warm divide */
  --color-border-strong:  #C4BEB5; /* stronger rule */
  --shadow-sm: 0 1px 3px rgba(26,24,21,0.08), 0 1px 2px rgba(26,24,21,0.04);
  --shadow-md: 0 4px 16px rgba(26,24,21,0.10), 0 2px 6px rgba(26,24,21,0.06);
  --shadow-lg: 0 16px 48px rgba(26,24,21,0.12), 0 6px 18px rgba(26,24,21,0.07);

  /* Semantic */
  --color-success:  #2D7A4F;
  --color-warning:  #B45309;
  --color-error:    #C0392B;
  --color-info:     #1D6FA4;

  /* Shape / Decorative (light theme) */
  --color-shape-a:  #D4820A;   /* accent-coloured shape */
  --color-shape-b:  #C4BEB5;   /* muted warm grey shape */
  --color-shape-c:  #1A1815;   /* dark shape (used sparingly) */
}
```

### Dark Theme Tokens

```css
:root[data-theme="dark"] {
  /* Surfaces */
  --color-bg:           #111010;   /* near-black, very slight warm tint */
  --color-surface:      #1C1B1A;   /* card / elevated surface */
  --color-surface-2:    #252422;   /* secondary surface */

  /* Text */
  --color-text-primary:   #F0EDE8; /* off-white, warm */
  --color-text-secondary: #8A8580; /* muted */
  --color-text-tertiary:  #5A5550; /* disabled */

  /* Accent — Electric Cyan */
  --color-accent:         #00D4CC; /* vivid cyan */
  --color-accent-hover:   #00B8B2; /* darker cyan on hover */
  --color-accent-muted:   #003D3B; /* deep tint for bg highlights */
  --color-accent-fg:      #111010; /* text on accent bg */

  /* Borders & Shadows */
  --color-border:         #2D2C2A; /* subtle dark divide */
  --color-border-strong:  #3D3C39; /* stronger */
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.30), 0 1px 2px rgba(0,0,0,0.20);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.40), 0 2px 6px rgba(0,0,0,0.25);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.50), 0 6px 18px rgba(0,0,0,0.30);

  /* Semantic */
  --color-success:  #34C97A;
  --color-warning:  #F59E0B;
  --color-error:    #F56565;
  --color-info:     #63B3ED;

  /* Shape / Decorative (dark theme) */
  --color-shape-a:  #00D4CC;   /* cyan accent shape */
  --color-shape-b:  #2D2C2A;   /* near-invisible dark shape */
  --color-shape-c:  #F0EDE8;   /* light shape (used sparingly) */
}
```

---

## 3. Typography

### Pairing Decision

**Display:** `Instrument Serif` (Google Fonts)  
**Body:** `DM Sans` (Google Fonts)

#### Rationale
`Instrument Serif` is a contemporary serif with optically delicate hairline contrasts — it reads as editorial and intelligent without tipping into academic. It has genuine character in headlines at 72px+, and it remains usable at 18px in accent contexts. It pairs without competing against a geometric sans.

`DM Sans` is a low-contrast geometric sans designed for digital interfaces. It has none of Inter's ubiquity and retains personality at small sizes through its slightly humanist terminals. The pairing creates clear hierarchy: the serif owns the stage (hero, section titles), the sans operates everything functional (body, nav, labels, buttons).

**Usage rule:** Display font only for hero headline, section headings (h1–h2), and selected large quotes. Body font for everything else — including h3, h4, paragraphs, labels, buttons, and UI chrome.

### Font Weights in Use

| Font | Weight | Token | Use |
|------|--------|-------|-----|
| Instrument Serif | 400 (Regular) | `font-display-regular` | Hero name, section titles |
| Instrument Serif | 400 Italic | `font-display-italic` | Accent words within headlines, tagline |
| DM Sans | 400 (Regular) | `font-body-regular` | Body copy, descriptions |
| DM Sans | 500 (Medium) | `font-body-medium` | UI labels, nav items, captions |
| DM Sans | 600 (SemiBold) | `font-body-semibold` | Buttons, project numbers, strong emphasis |

### Type Scale

All values in rem (base 16px). Tailwind custom scale — maps to `text-{size}` utility classes.

| Token | rem | px | Line Height | Letter Spacing | Font | Use |
|-------|-----|----|-------------|----------------|------|-----|
| `text-xs` | 0.75rem | 12px | 1.5 | 0.02em | DM Sans 500 | Captions, labels, tags |
| `text-sm` | 0.875rem | 14px | 1.5 | 0.01em | DM Sans 400 | Secondary body, meta |
| `text-base` | 1rem | 16px | 1.625 | 0 | DM Sans 400 | Primary body copy |
| `text-lg` | 1.125rem | 18px | 1.6 | 0 | DM Sans 400 | Lead paragraph, intro text |
| `text-xl` | 1.25rem | 20px | 1.5 | −0.01em | DM Sans 600 | Project card title |
| `text-2xl` | 1.5rem | 24px | 1.4 | −0.01em | DM Sans 600 | Sub-headings, about intro |
| `text-3xl` | 1.875rem | 30px | 1.3 | −0.02em | Instrument Serif 400 | Section titles (tablet) |
| `text-4xl` | 2.25rem | 36px | 1.25 | −0.02em | Instrument Serif 400 | Section titles (desktop) |
| `text-5xl` | 3rem | 48px | 1.15 | −0.03em | Instrument Serif 400 | Hero sub-text |
| `text-6xl` | 3.75rem | 60px | 1.1 | −0.03em | Instrument Serif 400 | Hero name (mobile) |
| `text-7xl` | 5rem | 80px | 1.05 | −0.04em | Instrument Serif 400 | Hero name (desktop) |

**Italic variant rule:** The hero headline should use Instrument Serif Italic for a single word in the tagline (once that copy is finalized). This creates one typographic moment of deliberate softness against the otherwise upright display treatment.

---

## 4. Spacing & Layout

### Base Unit
**4px base grid.** Every spacing value is a multiple of 4.

### Spacing Scale (Tailwind-compatible tokens)

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Icon gaps, tight label padding |
| `space-2` | 8px | Inline gaps, small component padding |
| `space-3` | 12px | Small internal padding |
| `space-4` | 16px | Standard component padding, list gaps |
| `space-5` | 20px | Card padding (mobile) |
| `space-6` | 24px | Default section element gap |
| `space-8` | 32px | Card padding (desktop), nav height |
| `space-10` | 40px | Section sub-element spacing |
| `space-12` | 48px | Large internal section gap |
| `space-16` | 64px | Section padding (mobile) |
| `space-20` | 80px | Section padding (tablet) |
| `space-24` | 96px | Between-section gap |
| `space-32` | 128px | Section padding (desktop) |
| `space-40` | 160px | Hero top padding |
| `space-48` | 192px | Max hero breathing room |

### Grid System

**Columns:** 12 columns  
**Gutter:** 24px (mobile), 32px (tablet), 40px (desktop)  
**Max-width:** 1280px  
**Container padding:** 20px (mobile), 40px (tablet), 80px (desktop)

Content lives in an 8-column centre column on desktop for text-heavy sections, with project cards breaking to the full 12. The grid is not rigid decoration — it is used to create deliberate asymmetry. Hero text sits in columns 1–7, leaving columns 8–12 as breathing room for a large geometric shape.

### Responsive Breakpoints

| Name | Min-width | Tailwind prefix |
|------|-----------|-----------------|
| `mobile` | 0px (base) | — |
| `sm` | 480px | `sm:` |
| `md` | 768px | `md:` |
| `lg` | 1024px | `lg:` |
| `xl` | 1280px | `xl:` |
| `2xl` | 1536px | `2xl:` |

Mobile is the default build target. All layout shifts at `md:` and above.

---

## 5. Component Inventory

### 5.1 Nav / ThemeToggle Bar

**Purpose:** Persistent top navigation. Minimal — just the name or monogram on left, theme toggle on right. Does not compete with content.  
**Behaviour:** Fixed position, `position: fixed`. Transparent on page load, gains a backdrop-blur + border-bottom when scrolled past 80px.  
**Variants:** Transparent state / Scrolled state (with backdrop)  
**States:** Default, scrolled, theme-transitioning  
**ThemeToggle sub-component:** Sun/moon icon toggle. On click: icons crossfade (opacity + rotate 90deg), full-page theme transition fires (see Motion section). Keyboard accessible — focusable, Space/Enter trigger toggle. ARIA label: "Switch to [light/dark] mode".

### 5.2 NavDot (Scroll Progress Indicator)

**Purpose:** Vertical dot cluster on the right edge of the viewport, indicating which section is active.  
**Behaviour:** Five dots (one per section). Active dot expands to a pill shape and fills with accent colour. IntersectionObserver drives active state.  
**Variants:** Inactive dot (3px circle, border only), Active dot (3px × 20px pill, filled accent). On hover over the cluster, section name labels fade in to the left of the dots.  
**Motion:** Active dot morphs with a CSS transition (`width`, `border-radius`, `background-color`) over 300ms `cubic-bezier(0.34, 1.56, 0.64, 1)` (spring-like). Labels slide in from right with opacity transition 200ms.  
**Responsive:** Hidden on mobile (375px–767px). Visible from `md:` (768px) up.

### 5.3 Hero Section

**Purpose:** First impression. Name, tagline (once finalized), scroll cue. No project content — purely identity.  
**Layout:** Full viewport height (100svh). Name headline dominating the upper half. Tagline below. Scroll indicator at bottom-centre.  
**Elements:**
- `HeroHeadline` — "Mark Nolan" in Instrument Serif 7xl, split into two animated spans for stagger entrance
- `HeroTagline` — DM Sans lg, italic treatment on one word (placeholder until copy finalised)
- `HeroScrollCue` — animated chevron or short vertical line that pulses downward, fades out after first scroll interaction
- `HeroShape` — large geometric background element (see Shapes below)
**States:** Pre-load (invisible), entrance-animating, settled (static after entrance)  
**Parallax:** HeroShape moves at 0.3× scroll speed relative to content. The name itself has a subtle 0.05× parallax for depth.

### 5.4 About Section

**Purpose:** Short bio, human connection. One paragraph.  
**Layout:** 2-column on desktop (text left, a decorative shape/number right), single column on mobile.  
**Elements:**
- Section label: "About" in DM Sans xs uppercase, letter-spacing 0.15em, accent colour — this label pattern repeats for every section
- Body paragraph at `text-lg`
- A large typographic number "01" or similar behind the paragraph text as a watermark (Instrument Serif, very large, `--color-surface-2` coloured — subtle)
**States:** Pre-reveal (translateY 40px, opacity 0), Revealed (default position, opacity 1)  
**Scroll trigger:** Enters when section top crosses 75% of viewport height. 600ms ease-out transition.

### 5.5 ProjectCard

**Purpose:** Showcase one project. Contains screenshot, title, one-liner, tech tags, and external link.  
**Layout:** Full-width stacked list on mobile. On desktop: alternating layout — odd cards have image left, even cards have image right (creates visual rhythm without a boring grid).  
**Variants:** `default` / `hovered` / `focused`  
**Elements:**
- Project number ("01", "02" etc.) — DM Sans xs, accent colour
- Screenshot container — 16:9 aspect ratio, `overflow: hidden`, rounded corners (12px)
- Project title — DM Sans xl semibold
- One-liner — DM Sans base
- Tech tags — DM Sans xs, pill shape, border style (not filled background)
- Arrow link — accent colour, 45deg angle arrow icon

**Hover state (committed choice: Viewport Shift):**  
On hover, the screenshot image scales to `scale(1.04)` over 400ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Simultaneously, a 2px accent-coloured left border line sweeps up from bottom to top (height 0 → 100%, 300ms). The project number increases in size slightly (from `text-xs` to `text-sm`) and shifts to accent colour if not already. The card gains `--shadow-lg`. No abrupt background colour change — everything is incremental.

**Focus state:** 2px accent outline, 4px offset. Same shadow as hover. Keyboard-only users get the full hover treatment via `:focus-visible`.

**Scroll reveal:** Each card translates in from below (translateY 60px → 0) with opacity fade. Cards stagger by 150ms. Trigger at 80% viewport threshold.

### 5.6 TechStack Section

**Purpose:** Show the technical toolkit visually.  
**Layout:** Grouped by category. Each group has a label and a row of pill/badge items.  
**Elements:**
- Section heading: "Stack" or "Built With"
- Category label: DM Sans xs uppercase accent
- Skill badges: DM Sans sm medium, pill shape, `--color-surface-2` background, `--color-border` border
**States:** Default, hover (badge lifts with `--shadow-sm`, border becomes accent colour)  
**Scroll reveal:** All badges in a group stagger-reveal by 50ms each from left to right.  
**Showpiece integration:** This section hosts the **Marquee/Ticker** stretch moment (see Section 7).

### 5.7 ContactFooter

**Purpose:** Close the page. Provide clear CTA actions.  
**Layout:** Full-width section. Large closing statement (Instrument Serif 4xl–5xl) centred, with LinkedIn and email CTAs below.  
**Elements:**
- Closing headline: something like "Let's build something." (Instrument Serif, large, italic on "something")
- LinkedIn button: filled accent, icon + label, 48px height minimum
- Email link: text-style link with underline animation (underline grows from left on hover)
- Copyright: DM Sans xs, text-tertiary, bottom of section
**States:** Buttons — default, hover (scale 1.02 + shadow lift), focus (accent outline), active (scale 0.98)  
**Scroll reveal:** The headline reveals character by character using a text scramble / slide-up stagger.

### 5.8 AbstractShapes (Composition Layer)

**Purpose:** Structural decorative elements that create depth and visual rhythm. Not decoration for its own sake — they anchor composition and provide parallax depth.  
**Specific shapes in use:**

| Shape ID | Form | Size | Section | Parallax Rate |
|----------|------|------|---------|---------------|
| `shape-hero-ring` | Partial circle (arc, 270deg), 2px stroke | 480px diameter | Hero, right side | 0.3× |
| `shape-hero-rect` | Rotated rectangle (15deg), filled | 120×300px | Hero, behind name | 0.2× |
| `shape-about-dot` | Solid circle | 64px diameter | About, top-right | 0.15× |
| `shape-work-line` | Horizontal ruled line (full section width) | 1px × 100% | Work section top | 0.0× (static) |
| `shape-footer-cross` | Plus/cross, 2px stroke | 80×80px | Footer, decorative | 0.1× |

**Colour usage:** In light theme, shapes use `--color-shape-b` (muted warm grey) or `--color-shape-a` (amber accent) for one hero shape. In dark theme, the ring uses `--color-shape-a` (cyan) and the rect uses `--color-shape-b` (near-invisible, very subtle depth).

**Rendering:** All shapes are inline SVG elements, not CSS pseudo-elements. This allows precise control of stroke, fill, and GSAP animation targets.

**Motion:** Each shape has an independent slow drift animation (see Section 6 — Morphing/Drifting Shapes stretch moment).

### 5.9 CustomCursor (Desktop Only)

**Purpose:** Replace default cursor with a branded dot cursor that reacts to interactive elements.  
**Default state:** 8px filled circle, `--color-text-primary` coloured, 50% opacity.  
**Hover over links/buttons:** Expands to 32px ring (stroke only, `--color-accent`), centres on the element, `opacity: 1`. Transition: 200ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.  
**Hover over project images:** Cursor changes to a text label "View →" in DM Sans xs, with a semi-transparent pill background.  
**Implementation:** CSS `cursor: none` on `body` (desktop breakpoint only). A `<div>` absolutely positioned, driven by `mousemove` event. Hardware-accelerated via `transform: translate()` only — no `top/left` updates.  
**Responsive:** Hidden at `md:` and below. Native cursor restored on touch devices.  
**Reduced motion:** Custom cursor still moves (position tracking is not motion), but expand/contract transitions are instant (0ms).

---

## 6. Motion Principles

### Philosophy
Every animation either: (a) communicates a state change, (b) guides the eye to the next element in the reading order, or (c) rewards the viewer for a deliberate action. Animations that merely fill time are cut.

### Easing Curves

| Token | Value | Use |
|-------|-------|-----|
| `ease-out-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Default scroll reveals, hover state exit |
| `ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | NavDot active morph, button press feedback |
| `ease-in-out-expo` | `cubic-bezier(0.87, 0, 0.13, 1)` | Page section transitions, theme toggle |
| `ease-linear` | `linear` | Marquee ticker, continuous drift animations |

### Durations

| Token | Value | Use |
|-------|-------|-----|
| `duration-instant` | 0ms | Reduced-motion fallback |
| `duration-micro` | 100ms | Cursor expansion, icon swaps |
| `duration-fast` | 200ms | Hover states, tooltip appearance |
| `duration-base` | 300ms | Button interactions, border sweeps |
| `duration-medium` | 500ms | Scroll reveals, card hover |
| `duration-slow` | 700ms | Section entrance animations |
| `duration-page` | 1000ms | Page-load stagger window |
| `duration-drift` | 8000–14000ms | Shape drift loop (per shape, varied) |

### Page-Load Entrance Stagger

Triggered immediately on first paint. No delay — the first frame should already be in motion.

```
t = 0ms:    Nav bar fades in (opacity 0 → 1, translateY -8px → 0, 400ms ease-out-smooth)
t = 150ms:  Hero shape-hero-rect fades in (opacity 0 → 0.6, scale 0.95 → 1, 600ms)
t = 300ms:  "Mark" (first word of name) slides up (translateY 24px → 0, opacity 0 → 1, 700ms ease-out-smooth)
t = 450ms:  "Nolan" slides up (same treatment, 700ms)
t = 600ms:  Tagline line fades in (translateY 12px → 0, opacity 0 → 1, 500ms)
t = 750ms:  shape-hero-ring draws in (stroke-dashoffset animation, 800ms ease-out-smooth)
t = 900ms:  Scroll cue appears (opacity 0 → 1, 400ms) then begins its own pulse loop
```

Total entrance window: ~1700ms. After this, no autoplay animations — everything is scroll or interaction driven.

### Parallax Layer Structure

Managed by GSAP ScrollTrigger. Applied to the `<body>` scroll container (with Lenis as the scroll driver, feeding GSAP).

| Layer | Elements | Scroll Multiplier | Direction |
|-------|----------|------------------|-----------|
| Background | `shape-hero-ring` | 0.3× | Up (slower than content) |
| Midground | `shape-hero-rect`, hero name | 0.05× (name), 0.2× (rect) | Up |
| Content | All section text, cards | 1× (native scroll) | Up |
| Foreground | NavDot cluster | Fixed (no scroll) | — |

On mobile (< 768px): all parallax multipliers are reduced to 0 (static). The shapes remain visible but do not move — this preserves 60fps and avoids janky behaviour on lower-powered devices.

On tablet (768px–1023px): multipliers are halved (0.3× → 0.15×, 0.2× → 0.1×).

### Scroll-Reveal Behaviour

**Technology:** IntersectionObserver (not scroll listeners) for triggering. GSAP `gsap.from()` for the actual animation.

**Default reveal pattern (all sections):**
- Threshold: 0.15 (15% of element visible triggers reveal)
- Animation: `translateY: 40, opacity: 0` → `translateY: 0, opacity: 1`
- Duration: 0.6s, ease: `ease-out-smooth`
- Once: true (no reverse-on-scroll-out — cleaner feel for portfolio)

**Section label reveals:** Letter-by-letter stagger. Each character: 40ms delay between, 300ms duration, translateY 8px → 0. Total label reveal ≈ 300ms + (charCount × 40ms).

### Scroll Behaviour (Lenis)

```js
// Lenis configuration
{
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // expo ease-out
  smoothWheel: true,
  wheelMultiplier: 0.8,  // slightly reduced — "weighty but not sluggish"
  touchMultiplier: 1.5,  // natural touch feel
}
```

### Theme Toggle Animation

On theme toggle click:
1. A circular clip-path reveal expands from the toggle button position across the entire viewport. Duration: 600ms `ease-in-out-expo`. The new theme's `--color-bg` floods in behind this circle.
2. All text and surface colours cross-fade via CSS transitions on custom properties (300ms).
3. The toggle icon (sun ↔ moon) rotates 90deg and crossfades simultaneously (200ms).

Implementation: `clip-path: circle(0% at X Y)` → `clip-path: circle(150% at X Y)`. A duplicate `<div>` overlay with `position: fixed, z-index: 999` handles the circle — it is removed after the transition completes. CSS custom property transitions handle the colour system.

**Reduced motion:** The clip-path circle is skipped. All colour tokens transition over 200ms instead. The icon still swaps but without rotation.

### Project Card Hover (committed: Viewport Shift)

Detailed in Component Inventory 5.5. Recap:
- Image: `scale(1.04)`, 400ms `ease-out-smooth`
- Accent line: height 0→100% sweep, 300ms `ease-out-smooth`, fires simultaneously
- Card shadow: `--shadow-md` → `--shadow-lg`, 300ms
- Project number: slight scale increase + accent colour (if not already)

---

## 7. Showpiece Moments

Two stretch animations are committed and specified. Both must pass 60fps on mid-range mobile (or degrade gracefully).

### Showpiece 1: Drifting Geometric Shapes (Continuous)

**What it is:** Each abstract shape SVG has an independent, infinitely looping drift animation that runs regardless of scroll position. The shapes never stop moving — they make the page feel alive even when the user is reading or idle.

**Implementation:**
Each shape has two GSAP tweens in a timeline that loops with `yoyo: true`:

```
shape-hero-ring:
  - translateX: 0 → 18px, translateY: 0 → −12px
  - duration: 11s, ease: ease-in-out-expo, repeat: -1, yoyo: true

shape-hero-rect:
  - translateX: 0 → −10px, rotate: 15deg → 18deg
  - duration: 8s, ease: ease-in-out-expo, repeat: -1, yoyo: true

shape-about-dot:
  - translateX: 0 → 8px, translateY: 0 → 10px
  - duration: 14s, ease: ease-in-out-expo, repeat: -1, yoyo: true

shape-footer-cross:
  - rotate: 0deg → 45deg
  - duration: 20s, ease: linear, repeat: -1
```

Each shape's drift runs on its own timeline with a unique start delay (0ms, 3s, 7s, 1.5s respectively) so they are never in phase — they drift asynchronously.

**Performance:** All transforms use `transform` only (no layout-triggering properties). GSAP uses `will-change: transform` temporarily during animation. On mobile, all drift animations pause (GSAP `pause()` called at `< 768px` or on `prefers-reduced-motion`).

**Reduced motion fallback:** `@media (prefers-reduced-motion: reduce)` — all drift animations are `duration: 0ms` (instant), effectively static. The shapes remain visible in their default positions.

### Showpiece 2: Text Scramble on Hero Name

**What it is:** On page load, before the hero name settles into its final state, each letter of "Mark Nolan" passes through a rapid character scramble (2–4 random characters per letter) before resolving to the correct character. The scramble is fast enough to feel technical/digital but slow enough that the viewer registers what is happening.

**Character set for scramble:** `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`

**Timing per letter:**
- Each letter runs its own scramble sequence
- Letters start sequentially — letter N+1 begins scrambling when letter N is 30% through its sequence
- Per-letter duration: 400ms
- Random character swaps: 6 swaps per letter, evenly spaced at ~60ms intervals
- Final correct character snaps in at the end of the 400ms window

**Implementation:** A custom React hook `useTextScramble(text, onComplete)` that:
1. Splits text into individual character spans
2. Uses `requestAnimationFrame` to update random characters
3. Resolves each span in sequence with the stagger offset
4. Fires `onComplete` when the last character resolves (this triggers the tagline fade-in)

**Total duration:** "Mark Nolan" = 10 characters × 400ms with 30% overlap stagger ≈ 1600ms total  

**Positioning in page-load sequence:** The scramble is the `t = 300ms` step in the load stagger (when "Mark" slides up, it immediately begins scrambling; "Nolan" begins at `t = 450ms`).

**Reduced motion fallback:** Characters appear immediately without scramble. The slideUp translate still fires (translate is considered non-vestibular motion and is kept under reduced-motion, but the scramble — which causes rapid visual change — is removed entirely). If `prefers-reduced-motion: reduce` is detected, skip to resolved state instantly.

---

## 8. Responsive Breakpoints

### Mobile (375px default)

- Single column layout throughout
- Hero: full-width headline, name at `text-6xl` (60px), no horizontal split
- Hero shapes: visible but static (no parallax, no drift)
- ProjectCards: stacked vertically, full-width image on top, content below. No alternating layout
- NavDots: hidden
- TechStack: badges wrap naturally
- CustomCursor: disabled, native cursor active
- Marquee: enabled (lower velocity — 30px/s vs 50px/s desktop)
- Font sizes: use `text-6xl` for hero, `text-3xl` for section titles
- Section padding: 64px vertical

### Tablet (768px — `md:` breakpoint)

- Hero name scales to `text-7xl`? No — stays `text-6xl` at tablet, hero gains more breathing room through padding increase
- ProjectCards: still stacked, but image is capped at 560px width centred
- NavDots: appear
- Parallax: enabled at 50% intensity (multipliers halved)
- CustomCursor: enabled
- Section padding: 80px vertical
- About: switches to 2-column layout

### Desktop (1280px — `xl:` breakpoint)

- Full layout. Hero name at `text-7xl` (80px)
- ProjectCards: alternating left/right image layout
- Parallax: full intensity
- Section padding: 128px vertical
- Max content width: 1280px, centred

### 1536px+ (`2xl:`)

- Container stays at 1280px max-width. Extra space becomes increased outer padding only. No layout changes.

---

## 9. Accessibility

### Contrast Ratios (WCAG AA minimum — target AAA where possible)

| Pair | Theme | Ratio | Passes |
|------|-------|-------|--------|
| `--color-text-primary` on `--color-bg` | Light | #1A1815 on #F5F2ED | ~17:1 — AAA |
| `--color-text-primary` on `--color-bg` | Dark | #F0EDE8 on #111010 | ~16:1 — AAA |
| `--color-text-secondary` on `--color-bg` | Light | #6B6560 on #F5F2ED | ~6.8:1 — AA |
| `--color-text-secondary` on `--color-bg` | Dark | #8A8580 on #111010 | ~5.2:1 — AA |
| `--color-accent` on `--color-bg` | Light | #D4820A on #F5F2ED | ~4.8:1 — AA |
| `--color-accent` on `--color-bg` | Dark | #00D4CC on #111010 | ~9.1:1 — AAA |
| `--color-accent-fg` on `--color-accent` | Light | #FFFFFF on #D4820A | ~3.8:1 — AA (large text only) |
| `--color-accent-fg` on `--color-accent` | Dark | #111010 on #00D4CC | ~11.2:1 — AAA |

**Note on light theme accent (#D4820A):** This amber does not reach AA (4.5:1) for small body text on the warm white background at 3.8:1. It must only be used for: large text (18px+), icons, borders, and decorative elements — never for small-type labels on white backgrounds. The section label treatment (DM Sans xs uppercase on `--color-bg`) must use `--color-text-primary` or `--color-text-secondary` instead, with accent used only for the indicator dot or underline beside it.

**Correction for section labels (light theme):** Section labels use `--color-text-secondary` (#6B6560) for the text and a 2px `--color-accent` underline or dot as the accent indicator. This achieves 6.8:1 on body text while retaining the amber accent presence.

### Focus Styles

All interactive elements use `:focus-visible` (not `:focus` — avoids rings on mouse click).

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 4px;  /* matches element where applicable */
}
```

For the theme toggle button specifically, the focus ring must be visible on both themes — the amber (light) and cyan (dark) both pass against their respective backgrounds.

The custom cursor does NOT replace keyboard focus indicators. Even when the cursor is active, `:focus-visible` rings remain visible.

### Reduced Motion

**All animated properties that are governed by `prefers-reduced-motion: reduce`:**

| Animation | Reduced motion behaviour |
|-----------|------------------------|
| Page-load stagger | All elements appear at full opacity immediately (no translate/opacity animation) |
| Text scramble (hero) | Text appears resolved, no character cycling |
| Shape drift (continuous) | All shapes static |
| Scroll reveals | Elements visible from load (no translateY, no opacity fade-in) |
| Parallax | All multipliers set to 0 (shapes static, name static) |
| ProjectCard hover | Image stays at scale 1.0; only shadow and accent line animate (these are non-vestibular) |
| Theme toggle circle reveal | Skipped entirely; colours transition in 200ms |
| Marquee | Paused (static row of items) |
| NavDot morph | Instant state change (0ms transition) |

Implementation: A global `const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches` check gates all GSAP and Framer Motion instances. Pass this as a context value from the root layout.

### Semantic HTML Requirements

- `<header>` for nav, `<main>` for all sections, `<footer>` for contact
- Each section has an `id` matching the NavDot href (e.g., `#about`, `#work`, `#stack`, `#contact`)
- All project screenshots: `alt="[Project name] — screenshot"` (descriptive, not generic)
- `<h1>` used only once: hero name. All section titles are `<h2>`. Project titles are `<h3>`.
- Theme toggle: `<button>` element (not `<div>`), `aria-label` dynamically set
- NavDots: `<nav aria-label="Page sections">` containing `<a>` elements pointing to section anchors
- Marquee (if implemented): `aria-hidden="true"` and `role="presentation"` — it is decorative, not content

### Keyboard Navigation Order

Tab order follows visual reading order (left → right, top → bottom):
1. Skip-to-content link (visually hidden until focused — appears at top-left on focus)
2. Theme toggle (in nav)
3. NavDot anchors (right side — comes after toggle in DOM order)
4. Hero scroll cue (focusable button)
5. Project cards in order (the external link arrow is the primary focusable element per card)
6. Tech stack badges (not focusable — purely decorative)
7. LinkedIn button
8. Email link

---

## Appendix: Google Fonts Load Snippet

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
  rel="stylesheet"
/>
```

Load strategy: `display=swap` to prevent invisible text during load. Both fonts are subset to Latin characters only (Google Fonts handles this automatically for the Latin subset). Preconnect to gstatic.com prevents a DNS lookup delay on the font file fetch.

---

## Appendix: Animation Library Responsibilities

| Library | Owns |
|---------|------|
| GSAP + ScrollTrigger | Parallax layer movement, shape drift loops, scroll-reveal sequencing, page-load entrance stagger, text scramble |
| Lenis | Smooth scroll driver — feeds scroll position to GSAP ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)` |
| Framer Motion | Component-level interactions: ProjectCard hover states, NavDot morph, ContactFooter button states, theme toggle icon swap |
| CSS Transitions | Theme colour crossfade (custom properties), NavBar scroll state, focus rings |

Do not mix GSAP and Framer Motion on the same element. Pick one per element and be consistent. GSAP owns anything scroll-driven or time-sequenced. Framer Motion owns anything interaction-driven at the component level.
