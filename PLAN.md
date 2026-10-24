# Portfolio Build Plan

Product truth lives in `PRODUCT.md`. This file is the build plan: phases, the skills each phase calls, and the prompts to run them.

## Skills we will use

### Product and planning
| Skill | Used for |
|---|---|
| `/impeccable init` | Product record (done: `PRODUCT.md`) |
| `/impeccable shape` | Brief for each career page before code |
| `design-skills:ux-strategy` | What each career leads with for recruiters vs. clients |
| `vectorlab-ux-skills:page-patterns` | Locking the page pattern per section (hero, gallery, case study) |

### Visual design
| Skill | Used for |
|---|---|
| `/impeccable` (new work) | Choosing the visual world and writing `DESIGN.md` |
| `frontend-design:frontend-design` | Distinctive aesthetic direction, avoids template look |
| `anthropic-skills:apple-design` | Apple-style depth, materials, type, restraint |
| `/impeccable typeset` + `vectorlab-ux-skills:typography` | Type scale, font pairing, tracking |
| `/impeccable colorize` + `vectorlab-ux-skills:colour-palette` | Base palette plus one accent per career |
| `/impeccable layout` + `vectorlab-ux-skills:spacing` | Grid, rhythm, gallery masonry |
| `design-skills:design-systems` + `/impeccable extract` | Tokens and shared components |
| `vectorlab-ux-skills:anti-slop` | Removing generic AI-looking UI |

### Motion (the "Apple fluid" part)
| Skill | Used for |
|---|---|
| `anthropic-skills:apple-design` | Springs, momentum, interruptible gestures, drag-to-dismiss |
| `anthropic-skills:animate` | Building each animation in the right order (purpose → curve → interruption → exit) |
| `/impeccable animate` | Purposeful motion pass over finished pages |
| `design-skills:interaction-design` | Switcher and viewer state machines, microinteractions |
| `vectorlab-ux-skills:motion` + `transitions` | Duration/easing tokens, enter/exit without layout jump |
| `vectorlab-ux-skills:reduced-motion` | Opacity-only fallbacks |
| `anthropic-skills:find-animation-opportunities` | Spots where motion would help |
| `anthropic-skills:improve-animations` | Audit pass over all motion code |
| `anthropic-skills:animation-vocabulary` | Naming effects precisely when you describe one you like |

### Content and copy
| Skill | Used for |
|---|---|
| `design-skills:ux-writing` + `/impeccable clarify` | Headlines, bios, CTAs per career |
| `anthropic-skills:humanizer` | Making copy sound like you, not AI |
| `anthropic-skills:pdf` | Reading your résumé PDFs to pull content |
| `figma:figma-design-to-code` | Pulling UI/UX case studies from Figma (the Figma connector is failing to connect right now; it needs a retry) |

### Engineering
| Skill | Used for |
|---|---|
| `run` | Launching the dev server and taking screenshots |
| `/impeccable adapt` + `vectorlab-ux-skills:viewports` | Mobile 375px → desktop 1440px |
| `/impeccable optimize` | Image pipeline (AVIF/WebP, blur placeholders), bundle and animation performance |
| `vectorlab-ux-skills:keyboard` | Focus rings, focus trap in the viewer |
| `vectorlab-ux-skills:loaders` + `empty-states` | Gallery loading, empty filters |
| `/impeccable harden` | Broken Drive links, missing images, long titles |
| `anthropic-skills:break-ui` | Stress-testing cards with worst-case content |
| `code-review` + `simplify` | Code quality before each push |

### QA and launch
| Skill | Used for |
|---|---|
| `/impeccable audit` + `design-skills:accessibility-audit` | WCAG, performance, responsive checks |
| `/impeccable critique` | Design review with heuristic scores |
| `vectorlab-ux-skills:ux-audit` | Final checklist across all UX skills |
| `/impeccable polish` | Last pass before deploy |
| `/impeccable delight` / `overdrive` | Optional signature moments (hero, switcher) |

## Phases

Each phase lists the skills it calls, then the prompt to run it.

### Phase 0: Product record ✅
`/impeccable init` → `PRODUCT.md` written.

### Phase 1: Content intake (one career at a time)
Skills: `anthropic-skills:pdf`, `design-skills:ux-writing`, `anthropic-skills:humanizer`
1. Software Engineer: bio, projects (repo, live link, stack, screenshots), skills, experience, résumé
2. Graphic & UI/UX Design: image files, Drive links, Figma/Behance links, categories, résumé
3. Automation: workflows/tools (n8n, Zapier, Python, etc.), before/after results, demos, résumé

> **Prompt:** "Here are my [career] files. Read them, organize them into `content/[career].json`, and draft the copy. Don't invent any facts."

### Phase 2: Shape the pages
Skills: `/impeccable shape`, `design-skills:ux-strategy`, `vectorlab-ux-skills:page-patterns`
> **Prompt:** "/impeccable shape the career switcher, the three career home pages, the design gallery and viewer, and the project case study page."

### Phase 3: Visual world and design system
Skills: `/impeccable` (new work), `frontend-design`, `apple-design`, `typeset`, `colorize`, `layout`, `design-systems`, `anti-slop`
> **Prompt:** "/impeccable create the visual world for the portfolio: one shared base with an accent per career. Write `DESIGN.md` with tokens for type, color, spacing and motion."

### Phase 4: Scaffold and motion system
Skills: `anthropic-skills:apple-design`, `anthropic-skills:animate`, `vectorlab-ux-skills:motion`, `reduced-motion`, `run`
- Next.js + TypeScript + Tailwind + Motion + GSAP + Lenis
- Spring tokens (snappy / smooth / bouncy), shared `layoutId` system, Lenis provider, reduced-motion provider
> **Prompt:** "Scaffold the Next.js project and build the motion system from DESIGN.md: spring tokens, page transitions, and reduced-motion fallbacks."

### Phase 5: Career switcher
Skills: `apple-design`, `interaction-design`, `transitions`, `keyboard`
- Segmented control with a spring pill, theme accent cross-fade, and content re-forming through shared elements; interruptible mid-switch; URL updates
> **Prompt:** "Build the career switcher so switching re-forms the page with interruptible spring motion and updates the URL."

### Phase 6: Career pages
Skills: `/impeccable` build, `ux-writing`, `adapt`, `viewports`
- Hero → featured work → skills → experience → contact, for each career
> **Prompt:** "Build the [career] page from `content/[career].json`, following the shaped brief and DESIGN.md."

### Phase 7: Design gallery and Drive integration
Skills: `apple-design` (drag-to-dismiss, pinch-zoom), `optimize`, `loaders`, `empty-states`, `harden`
- Masonry gallery, category filters with layout animation, expand-from-thumbnail viewer, swipe between pieces
- Drive share link → preview/thumbnail embed, with a link-out fallback
- Image pipeline: AVIF/WebP, sizes, blur-up placeholders
> **Prompt:** "Build the design gallery and viewer with Drive embeds and the optimized image pipeline."

### Phase 8: Case study pages
Skills: `layout`, `typeset`, `animate`, `find-animation-opportunities`
> **Prompt:** "Build the case study template for engineering and automation projects with scroll-driven reveals."

### Phase 9: QA
Skills: `audit`, `accessibility-audit`, `break-ui`, `improve-animations`, `critique`, `ux-audit`, `code-review`
> **Prompt:** "/impeccable audit and critique the full site, then fix everything in one pass."

### Phase 10: Polish and launch
Skills: `/impeccable polish`, `delight`, `run`
- Push to GitHub, deploy on Vercel, connect a domain, set SEO/OG images per career
> **Prompt:** "/impeccable polish, then push and deploy to Vercel."

## Open decisions
- Your name, title and contact channels
- Domain name
- GitHub repo for the project (needed before Phase 4, since this cloud container is temporary)
- Whether each career gets its own résumé
