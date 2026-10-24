# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (React + TypeScript), Tailwind CSS, Motion (Framer Motion) for spring physics and shared-element transitions, GSAP ScrollTrigger + Lenis for scroll-driven motion. Deploy on Vercel. Confirmed by the owner.

## Users

- **Recruiters and hiring managers** evaluating the owner for full-time roles. They skim quickly, want proof of skill, experience, and a résumé.
- **Freelance clients** evaluating the owner for paid projects. They want to see work samples, what the owner can do for them, and a fast way to make contact.
- Both audiences matter equally; each career mode must serve both.

## Product Purpose

A personal portfolio for one person with three careers: **Software Engineer**, **Graphic & UI/UX Designer**, and **Automation**. The visitor switches between careers, and the whole site (copy, work, skills, résumé) re-forms around the selected one. Success: a visitor lands on the relevant career (often via a direct link), sees convincing work within seconds, and contacts the owner or downloads the résumé.

## Positioning

One person who can design it, build it, and automate it. The career switch is the product's mechanism: the same person seen through three lenses, without three separate sites.

## Operating Context

- Visitors arrive from a résumé, LinkedIn, job applications, or a client referral, often on mobile.
- Each career has its own shareable URL (`/engineer`, `/design`, `/automation`) so the owner can send the right lens.
- Design work lives as image files, Google Drive share links, and Figma/Behance projects; the site must show these inside the portfolio and link out to the originals.

## Capabilities and Constraints

- Career switcher that changes the full site context with fluid, interruptible motion (owner requirement: "Apple fluid animation").
- Graphic design gallery with filters and a full-screen viewer; Drive links embedded as previews (files must be shared as "Anyone with the link") or shown as link-out cards.
- Software and automation projects with case-study detail pages.
- Content stored in data files so the owner can add work without editing components.
- Open: owner name, title copy, bios, project list, résumés per career, contact channels, domain.

## Brand Commitments

None confirmed yet. No existing logo or palette provided.

## Evidence on Hand

- Owner: **John Cadungog**, Cebu, Philippines. Software Engineer at Accenture (May 2025–present), co-founder of Peak Status studio (peak-status.com), freelance designer since 2019, BS Computer Science (CIT-U, 2025).
- Résumé: `assets/resumes/john-cadungog-software-engineer.pdf`. Structured content: `content/engineer.json`.
- Design work: ATP Construction LLC brand identity in `assets/design/atp-construction/` and `content/design.json`. More image files, Drive links and Figma/Behance (behance.net/johncadungog1) still to come.
- Automation evidence from the résumé and GitHub: LeaveDesk (n8n → Microsoft Teams), Peak Status OS MCP task automation, agentic coding workflows.
- Previous portfolio: github.com/JohnCadungog/Portfolio (Next.js 16, Tailwind v4, Framer Motion), live at johncadungog.github.io/Portfolio.
- Missing: project screenshots and live links. Do not invent projects, clients, metrics, testimonials, or employers.

## Product Principles

1. The work leads. Every career page shows real work in the first viewport or immediately after.
2. One person, three lenses. Switching careers should feel like the same site re-forming, not jumping to a different site.
3. Motion explains the change. Animation shows where things came from and where they go, and never delays reading.
4. Fast to evaluate. A recruiter or client can decide in under a minute, on a phone.
5. Easy to grow. Adding a new design or project is a data edit.

## Accessibility & Inclusion

Honor `prefers-reduced-motion` with opacity-only fallbacks. Keyboard-operable switcher and gallery viewer. WCAG 2.1 AA contrast.
