# John Cadungog — Portfolio

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Motion · Lenis. Static export.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

Routes: `/engineer`, `/design`, `/automation` (and `/`, which opens on Engineer).

## Adding your work
All content lives in `lib/content.ts`.
- Put images in `public/work/<project>/` and list them in that project's `images` array. The first image is the cover.
- A project with an empty `images` array shows a "Screenshot coming" swatch.
- Add live or GitHub links to `links`.

Design system: `DESIGN.md`.
