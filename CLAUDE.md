# CLAUDE.md — John Cadungog Portfolio

Context for any Claude session working in this repo. Read `PRODUCT.md` (who/why, rules on facts) and `DESIGN.md` (visual system) before UI work.

## What this is
A one-person portfolio with three career lenses: **Software Engineer**, **Graphic & UI/UX Designer**, **Automation**. The visitor switches careers and the whole site re-forms around that lens. Audience: recruiters and freelance clients, often on mobile.

- Live: https://portfoliov2-alpha-taupe.vercel.app (Vercel project `portfoliov2`)
- Repo: https://github.com/JohnCadungog/Portfoliov2
- Routes: `/` (opens Engineer), `/engineer`, `/design`, `/automation`

## Stack
Next.js 16 (App Router, `output: "export"` static site) · React 19 · TypeScript · Tailwind v4 (mostly custom CSS in `app/globals.css`) · Motion (`motion/react`) for springs and shared layout · Lenis smooth scroll · lucide-react icons · fonts: Bricolage Grotesque Variable (display), Geist + Geist Mono.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
npx tsc --noEmit # typecheck
```

## Where things live
| Path | What |
|---|---|
| `lib/content.ts` | **All site content**: careers, projects, jobs, skills, links. Edit here, not in components. |
| `lib/asset.ts` | `asset()` prefixes `/public` paths (for sub-path / preview builds). Wrap every public file path in it. |
| `public/work/<project>/` | Project images. `public/documents/` holds the résumé PDF. |
| `components/Portfolio.tsx` | Career state, URL update, ink-flood transition, keyboard ← → |
| `components/Hero.tsx` | Hero: tint bar, headline, actions, theme toggle, fan deck |
| `components/FanDeck.tsx` | The swatch fan deck (drag/tap to switch careers) |
| `components/WorkGrid.tsx`, `ProjectSheet.tsx`, `Media.tsx` | Project chips, detail sheet (drag to dismiss, image gallery), placeholders |
| `components/Experience.tsx`, `Contact.tsx`, `Dock.tsx`, `CareerSwitch.tsx`, `ThemeToggle.tsx`, `SmoothScroll.tsx` | Remaining sections and chrome |
| `content/` (not in repo) | Original intake JSON lived outside the repo; `lib/content.ts` is the source of truth now. |

## Adding work (the main open task)
0. Raw files may sit in `inbox/` (gitignored). Sort and optimize them from there; never commit the originals.
1. Put images in `public/work/<project-slug>/` (prefer `.webp`/`.jpg`, ~2000px long edge, under ~500 KB each; convert large PNG/JPG to WebP).
2. In `lib/content.ts`, list them in that project's `images: [asset("/work/<slug>/file.webp"), ...]`. First image = cover.
3. A project with `images: []` shows a "Screenshot coming" swatch automatically.
4. New design projects go in `careers.design.projects` with `kind` (e.g. "Brand identity", "Social", "Interface"), a factual `summary`, optional `details`, `stack`, `links`.

Still waiting on real material for: **Peak Status OS, QR-FBS Simulation Kit, LeaveDesk, TheNotesAI, Bird Bone Classifier, Expense Tracker** screenshots, and the design **UI/UX case study** (placeholder). Source files live in `D:\Portfolio Collection` on John's machine.

Client context: Black Global, Winpact and Haks are separate clients, each shown in their own right. Their work came through a middleman, and he is not named on the site. The Social creatives post template was made for a client (Ian). The "Websites" project (real estate, MetroEvent, Escafe) appears under both Engineer and Designer.

## Rules
- **Never invent facts**: no made-up projects, clients, metrics, employers, testimonials or links. Facts come from John's résumé, GitHub, or John directly. If something is missing, leave a placeholder and ask.
- Keep the design world (see `DESIGN.md`): printer's swatch book. Career inks: Engineer `#2B3BE5`, Designer `#D4006E`, Automation `#C6E400` (dark text `#11140A`). No new colors, fonts or radii without asking.
- Motion: springs, interruptible; honor `prefers-reduced-motion` (MotionConfig `reducedMotion="user"` is already set).
- No eyebrow/kicker labels above headings, no gradient text, no glassmorphism decoration, no emoji as icons.
- Dark mode: follows system + toggle (`data-theme` on `<html>`, saved in `localStorage`). Dark stock is tinted from the active ink via `color-mix`; check both themes after UI changes.
- Check desktop (1440) and mobile (390) after visual changes.

## Deploying
- The Vercel project was created by API upload and is **not yet linked to Git**. Recommended: Vercel → portfoliov2 → Settings → Git → connect `JohnCadungog/Portfoliov2`, so every push to `main` deploys.
- Until then, deploy locally with `npx vercel link` (pick project `portfoliov2`) then `npx vercel --prod`.
- If visitors see a Vercel login page: Settings → Deployment Protection → Vercel Authentication → Disabled.

## Static preview builds (optional)
For hosting under a sub-path or as relative files:
`NEXT_PUBLIC_PREVIEW=1 NEXT_PUBLIC_ASSET_BASE=. ASSET_PREFIX=. npm run build` (career switches then keep the URL). For GitHub Pages: `NEXT_PUBLIC_BASE_PATH=/Portfoliov2 npm run build`.

## History
Built in a Claude Code cloud session (Oct 2026): product interview → swatch fan deck direction → build → dark mode (tinted) → hero tint bar and printer's marks. Design decisions and tokens are in `DESIGN.md`; product facts in `PRODUCT.md`; original phase plan in `PLAN.md` (phases 0–6 done, gallery content and polish remain).
