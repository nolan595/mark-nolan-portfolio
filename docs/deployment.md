# Deployment — Mark Nolan Portfolio

**Stack:** Next.js 16 App Router · pnpm · Netlify  
**Repo:** github.com/nolan595/portfolio (public)  
**Live URL:** configured in Netlify after first deploy

---

## Prerequisites

- Node.js 22 LTS (`node --version` should print `v22.x.x`)
- pnpm 10 (`npm i -g pnpm` or via `corepack enable && corepack prepare pnpm@latest --activate`)
- Git

---

## Local setup from scratch

```bash
git clone https://github.com/nolan595/portfolio.git
cd portfolio
pnpm install
cp .env.example .env.local   # then fill in real values — see env var section below
pnpm dev
```

The dev server starts at `http://localhost:3000` with Turbopack. Hot reload is enabled.

---

## Environment variables

Defined in `.env.local` for local dev. Set in Netlify UI (Site settings > Environment variables) for production.

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical domain — used for OG image absolute URLs and the `<link rel="canonical">` tag. Must include protocol, no trailing slash. | `https://marknolan.dev` |
| `NEXT_PUBLIC_LINKEDIN_URL` | No | Full LinkedIn profile URL. If omitted, defaults to the value hardcoded in `src/config/site.ts`. | `https://linkedin.com/in/yourhandle` |
| `NEXT_PUBLIC_EMAIL` | No | Contact email address shown in the footer. If omitted, falls back to `src/config/site.ts`. | `hello@yourdomain.com` |

All three variables are `NEXT_PUBLIC_` — they are inlined at build time. There are no server-side secrets.

`.env.local` is gitignored. Never commit real values.

---

## Running tests

No automated tests are currently written. The build itself is the primary verification step:

```bash
pnpm build      # zero TypeScript errors = green
pnpm type-check # standalone TS check without a full build
pnpm lint       # ESLint via next lint
```

Recommended future additions (see `docs/qa-report.md` §Test Coverage):
1. `axe-core` accessibility scan in CI
2. Playwright visual regression at 375px and 1440px (light + dark)
3. Unit tests for `useTextScramble` and `useReducedMotion`

---

## How to build

```bash
pnpm build
```

Output goes to `.next/`. The `@netlify/plugin-nextjs` plugin handles the runtime adapter — there is no `output: 'export'` static export, so `.next/` is the correct publish directory.

To preview the production build locally:

```bash
pnpm build && pnpm start
# → http://localhost:3000
```

---

## How to deploy

Deployment is fully automatic via Netlify's Git integration:

1. Push or merge to `main`
2. Netlify detects the push, runs `pnpm build`, and deploys
3. The deploy URL is visible in the Netlify dashboard

No manual deploy steps are needed after initial setup.

### Initial Netlify setup (one-time)

1. In the Netlify dashboard: **Add new site > Import an existing project > GitHub**
2. Select the `nolan595/portfolio` repo
3. Build settings are read from `netlify.toml` — nothing to configure manually
4. Under **Site settings > Environment variables**, add:
   - `NEXT_PUBLIC_SITE_URL` = your production domain
   - `NEXT_PUBLIC_LINKEDIN_URL` (optional)
   - `NEXT_PUBLIC_EMAIL` (optional)
5. Trigger a manual deploy to verify the first build passes

### CI pipeline (GitHub Actions)

`.github/workflows/ci.yml` runs on every push and pull request to `main`:

- Install dependencies (frozen lockfile)
- `pnpm lint`
- `pnpm type-check`
- `pnpm build`

The CI build uses placeholder env var values so the build succeeds without real secrets. To provide real values in CI, add them as GitHub Actions variables (Settings > Secrets and variables > Actions > Variables — use `vars.NEXT_PUBLIC_SITE_URL` not secrets, since these are public values).

---

## Manual steps before first production deploy

These are the open items from `docs/qa-report.md` that must be completed before the site goes live. The build passes without them, but the site will be visually incomplete.

| Item | File(s) | Action |
|---|---|---|
| Favicon assets | `/public/favicon.ico`, `/public/icon.svg`, `/public/apple-touch-icon.png`, `/public/icon-192.png`, `/public/icon-512.png` | Export from Figma at the correct sizes |
| OG image | `/public/og-image.png` | Create 1200×630px PNG — spec in `docs/api-spec.md` §4 |
| Project screenshots | `/public/images/projects/*.webp` | Capture at 1440px / 2× DPR, export as WebP <150KB each |
| Real tagline copy | `/src/components/HeroSection.tsx` line 247 | Replace placeholder text |
| Real bio copy | `/src/components/AboutSection.tsx` line 83 | Replace lorem ipsum |
| Wire up `project.image` | `/src/components/ProjectCard.tsx` | Swap hardcoded `placehold.co` URL for `project.image` once screenshots are in place |
| Set `NEXT_PUBLIC_SITE_URL` in Netlify | Netlify UI | Required for canonical URL and absolute OG path |

---

## How to add a new project

Edit one file: `/src/data/projects.ts`

Add an object to the `projects` array following the `Project` interface:

```typescript
{
  slug: 'my-project',          // kebab-case, unique
  index: '06',                 // display index string
  title: 'My Project',
  tagline: 'One sentence.',
  description: 'Two to four sentences.',
  tech: ['Next.js', 'TypeScript'],
  liveUrl: 'https://myproject.com',
  image: '/images/projects/my-project.webp',
  imageAlt: 'My Project — screenshot',
  featured: true,
}
```

Then add the screenshot to `/public/images/projects/my-project.webp` (1200×675px, <150KB).

Commit and push to `main`. Netlify rebuilds automatically. No other files need to change.

---

## How to swap in real project screenshots

1. Export each screenshot at 1440px viewport width, 2× DPR, 1200×675px output, WebP format, <150KB each
2. Place them in `/public/images/projects/` using the filenames already defined in `/src/data/projects.ts`
3. In `/src/components/ProjectCard.tsx`, replace the hardcoded `placehold.co` URL with `project.image`
4. Run `pnpm build` locally to confirm `next/image` resolves the local files without error
5. Commit and push

---

## How to create and deploy an OG image

The OG image is a static PNG (not dynamically generated). Spec from `docs/api-spec.md` §4:

- Dimensions: 1200×630px
- Format: PNG
- Content: your name, title, and a brief descriptor — keep it legible at small sizes (Twitter card preview is ~506×265px)
- Export from Figma or any design tool
- Save to `/public/og-image.png`
- The metadata in `src/config/site.ts` (or `app/layout.tsx`) references this path as `${NEXT_PUBLIC_SITE_URL}/og-image.png`

After adding the file, set `NEXT_PUBLIC_SITE_URL` in Netlify, then push. Use the [Twitter Card Validator](https://cards-dev.twitter.com/validator) and [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) to confirm the image renders correctly after deploy.

---

## How to roll back

Netlify retains all previous deploys permanently.

1. Open the Netlify dashboard > Deploys
2. Find the last known-good deploy (identified by commit SHA and timestamp)
3. Click **Publish deploy**

The rollback is instant — no rebuild required. The previous `.next/` artifact is re-served immediately.

If the issue is a bad commit on `main`, also revert on GitHub to prevent the next push from re-triggering a broken build:

```bash
git revert HEAD --no-edit
git push origin main
```

This creates a new revert commit (safer than `git reset --hard` on a shared branch) and triggers a fresh Netlify build from the reverted state.
