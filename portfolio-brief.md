# Portfolio Site Brief — Mark Nolan

## 1. Overview

A single-page personal portfolio for **Mark Nolan**, showcasing freelance/personal web projects. The site itself is a portfolio piece — its execution should demonstrate frontend craft (motion, parallax, typography, polish), not just describe it.

**Project type:** Single-page scroll, animation-forward
**Audience:** Both potential clients (freelance work) and recruiters/employers — equal weight
**Primary outcome:** Viewer reaches the bottom convinced Mark can build something memorable, with at least one CTA action taken (LinkedIn click, project link, or email).

---

## 2. Site Structure (single-page sections, in order)

1. **Hero** — name, tagline, scroll cue, theme toggle (light/dark)
2. **About / Intro** — short bio paragraph
3. **Selected Work** — project showcase (5 projects, scalable to more)
4. **Tech Stack** — what Mark builds with, presented visually
5. **Contact / Footer** — LinkedIn, email

---

## 3. Content

### 3.1 Identity
- **Name to display:** Mark Nolan
- **Tagline / one-liner:** [TBD — placeholder for now, finalize before launch]
- **Bio paragraph:**
> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

### 3.2 Projects

For every project: title, one-line description, longer description, tech, live URL.
*All five projects are built with Next.js + Tailwind (consistent stack across portfolio).*

#### 01 — Clontarf Paradise Golf (Pro Shop)
- **URL:** https://clontarfproshop.com/
- **One-liner:** Modern pro shop site for Clontarf Golf Club — products, vouchers, and lesson bookings.
- **Description:** A clean, premium-feeling site for a Dublin golf club's pro shop. Browse products, buy gift vouchers, and book 1:1 lessons with a PGA professional. Built to feel welcoming to both members and visitors.
- **Tech:** Next.js, React, Tailwind, Netlify

#### 02 — Hunch (Free-to-Play Games for Super)
- **URL:** https://home.playhunch.io/
- **One-liner:** Marketing site for Hunch, an in-house F2P prediction games studio for the Super sportsbook ecosystem.
- **Description:** A polished B2B-leaning site explaining Hunch's offering — pick'em, streak games, and tournament specials — with regional reach across six markets. Showcases product, team, and integrations.
- **Tech:** Next.js, React, Tailwind

#### 03 — O'Connor Cars (Garage)
- **URL:** https://oconnor-cars.netlify.app/
- **One-liner:** Local site for a family-run VW/Audi specialist garage in Finglas, Dublin.
- **Description:** Service listings, NCT pre-check guide, opening hours, and contact details for a North Dublin garage. Built to feel trustworthy and local — clear info architecture, easy to find a phone number.
- **Tech:** Next.js, React, Tailwind, Netlify

#### 04 — Eoin O'Brien Golf (Pro Personal Site)
- **URL:** https://eoinobriengolf.com/
- **One-liner:** Personal coaching site for the PGA Head Professional at Clontarf Golf Club.
- **Description:** Bookings, vouchers, and about content for a private golf coach offering 1:1 lessons, video analysis, and on-course sessions. Integrates with YouCanBookMe for scheduling.
- **Tech:** Next.js, React, Tailwind

#### 05 — Percy French Troubadours (Charity Choir)
- **URL:** https://percyfrenchtroubadours.com/
- **One-liner:** Site for an Irish charity choir performing the songs and poems of Percy French.
- **Description:** Editorial-style site celebrating the work of an Irish heritage choir that has raised significant funds for charity. Includes about, audience reviews, charity impact counter, and booking enquiries.
- **Tech:** Next.js, React, Tailwind

> **Scaling note:** Build the project section to handle 5 today and 12+ later. Consider a simple JSON/MDX-driven project list so adding new entries is one file change.

### 3.3 Tech Stack section

Group visually for clarity:

- **Frameworks & Languages:** Next.js, React, Node.js, TypeScript/JavaScript
- **Styling:** Tailwind CSS
- **Database & ORM:** PostgreSQL, Prisma
- **Cloud & Deploy:** AWS (AWS Certified Cloud Practitioner), Netlify
- **Design:** Figma

### 3.4 Links
- **LinkedIn:** https://www.linkedin.com/in/mark-nolan-6158001ba/
- **Email:** markjnolan00@gmail.com

---

## 4. Design Direction

**Vibe:** Modern, animation-rich, with abstract shape elements (geometric forms, blobs, or organic shapes) layered into the design. Should feel alive and considered without being chaotic.

**Theme:** **Light and dark mode toggle required.** Both themes need to be fully designed — neither should feel like an afterthought. Toggle should be persistent (localStorage) and respect `prefers-color-scheme` on first load.

**Hard requirements:**
- Cohesive aesthetic across both themes
- Distinctive typography pairing — one display font with character, one clean body font (no Inter, Roboto, or Arial as primary)
- Strong single accent color in each theme (does not need to be the same color in both themes)
- Abstract decorative shapes used as composition elements, not just background noise

---

## 5. Animation & Interaction Spec

This is the centerpiece. The site should demonstrate motion craft.

**Required motion behaviors:**
- **Parallax scroll** — at minimum the hero, ideally layered across multiple sections (foreground/midground/background moving at different rates). Abstract shapes are a natural fit for parallax layers.
- **Scroll-triggered reveals** — sections fade/slide/scale into view as they enter the viewport (use IntersectionObserver, not scroll listeners)
- **Project card interactions** — should feel tactile on hover (lift, accent line, image shift, color reveal — pick one and commit)
- **Smooth scroll** — Lenis tuned to feel weighty but not sluggish
- **Page-load entrance** — staggered reveal on first paint
- **Theme toggle transition** — should animate, not snap (color crossfade or similar)

**Stretch / showpiece moments** (pick at least one — recommend two):
- Sticky/pinned scroll section that progresses through stages as you scroll
- Animated abstract SVG shapes that morph or drift independently of scroll
- Custom cursor on desktop
- Marquee/ticker element (project names or tech names)
- Text scramble/reveal effect on a key headline
- Horizontal scroll moment within the vertical scroll page

**Performance constraint:** All animations must run at 60fps on mid-range mobile. If a stretch effect can't hit that, drop it.

---

## 6. Technical Requirements

- **Stack:** Next.js + React + Tailwind (matches Mark's working stack and the projects shown)
- **Animation libraries:** GSAP + ScrollTrigger for parallax/scroll work; Lenis for smooth scroll; Framer Motion for component-level interactions
- **Theme:** `next-themes` or equivalent for the light/dark toggle
- **Responsive:** Mobile, tablet, desktop. Parallax intensity scales down on mobile.
- **Accessibility:** Respect `prefers-reduced-motion` — provide static fallback for major animations. Semantic HTML, alt text on every project image, keyboard-navigable, theme toggle keyboard-accessible.
- **Performance:** Lighthouse 90+ on mobile. Optimized images (WebP/AVIF), lazy-load project screenshots below the fold, `next/image` for everything.
- **SEO:** Proper meta tags, OG image, descriptive titles.
- **Hosting:** Netlify (matches existing project deployments)

---

## 7. Open Decisions

Items still to resolve:

- [ ] Tagline / one-liner
- [ ] Final bio copy (currently lorem ipsum)
- [ ] Project screenshots — capture from each live URL or use live thumbnails
- [ ] Specific color palettes for light and dark themes
- [ ] Specific typography choices
- [ ] Which stretch animation moments to commit to (recommend 2)
- [ ] OG image / favicon

---

## 8. Success Criteria

Site is done when:
1. A recruiter understands who Mark is and what he builds within 10 seconds of landing
2. A potential client can browse all 5 projects with enough context to want to reach out
3. Motion design is the thing visitors remember and would describe to someone else
4. Light and dark themes are both polished — neither feels secondary
5. Runs cleanly on mobile and respects reduced-motion preferences
