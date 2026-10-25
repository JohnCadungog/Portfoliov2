import type { CSSProperties } from "react";
import type { CareerId } from "@/lib/content";

/** Animation timings as CSS variables, so an element can draw in and flash on separate delays. */
const t = (draw: number, flash?: number) =>
  ({ "--d": `${draw}s`, ...(flash !== undefined && { "--flash": `${flash}s` }) }) as CSSProperties;

/**
 * One-ink figure plates for the deck cards: a drawing of each craft, printed in the card's own ink.
 * Strokes use pathLength="1" so CSS can draw them in; motion lives in globals.css and only runs on
 * the front card. Every element's resting state is the finished drawing.
 */
export const deckArtCaption: Record<CareerId, string> = {
  engineer: "Fig. 1 Request path",
  design: "Fig. 2 Construction",
  automation: "Fig. 3 Workflow run",
};

export default function DeckArt({ career }: { career: CareerId }) {
  return (
    <svg className={`deck-art art-${career}`} viewBox="0 0 240 180" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <pattern id={`dots-${career}`} width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" className="art-dim-fill" />
        </pattern>
      </defs>
      <rect width="240" height="180" fill={`url(#dots-${career})`} />
      {career === "engineer" && <RequestPath />}
      {career === "design" && <Construction />}
      {career === "automation" && <WorkflowRun />}
    </svg>
  );
}

function RequestPath() {
  return (
    <g>
      {/* client → api → db */}
      <path className="art-line art-draw" pathLength={1} d="M80 46 H180" style={t(0.1)} />
      <circle className="art-dot art-dot-request" r="3.5" />

      <rect className="art-node art-draw" pathLength={1} x="20" y="30" width="60" height="32" rx="4" />
      <text className="art-label" x="50" y="50">client</text>

      <rect className="art-node art-node-api art-draw" pathLength={1} x="100" y="30" width="60" height="32" rx="4" style={t(0.12)} />
      <text className="art-label" x="130" y="50">api</text>

      <g>
        <path className="art-node art-draw" pathLength={1} d="M184 34 V60 C184 66 216 66 216 60 V34" style={t(0.24)} />
        <ellipse className="art-node art-draw" pathLength={1} cx="200" cy="34" rx="16" ry="5" style={t(0.24)} />
      </g>
      <text className="art-label" x="200" y="51">db</text>

      {/* response console */}
      <rect className="art-line art-draw" pathLength={1} x="20" y="88" width="196" height="66" rx="4" style={t(0.36)} />
      <path className="art-dim" d="M20 102 H216" />
      <circle className="art-dim-fill" cx="29" cy="95" r="2" />
      <circle className="art-dim-fill" cx="37" cy="95" r="2" />
      <circle className="art-dim-fill" cx="45" cy="95" r="2" />
      <text className="art-code" x="30" y="120">GET /api/projects</text>
      <text className="art-code" x="30" y="140">
        <tspan className="art-strong">200</tspan> OK
      </text>
      {/* Typing: a cover in the console's color steps aside one character at a time. */}
      <rect className="art-type-cover" x="28" y="129" width="40" height="15" />
      <rect className="art-cursor" x="70" y="132" width="6" height="10" />
    </g>
  );
}

function Construction() {
  const letter =
    "M150 50 C128 30 72 36 82 72 C90 100 160 92 158 124 C156 154 104 160 82 140";
  return (
    <g>
      {/* guides */}
      <path className="art-dim art-dash" d="M24 38 H216 M24 150 H216" />
      <circle className="art-dim art-dash" cx="120" cy="94" r="58" />
      <path className="art-dim" d="M120 26 V162" />
      <text className="art-tag" x="26" y="33">cap</text>
      <text className="art-tag" x="26" y="146">base</text>

      {/* the letterform and its outline */}
      <path className="art-letter art-draw" pathLength={1} d={letter} style={t(0.1)} />
      <path className="art-line art-thin" d={letter} />

      {/* handles: anchor ▪, control ● */}
      <g className="art-handles">
        <g className="art-handle" style={t(0.55)}>
          <path className="art-line art-thin" d="M70 40 L92 102" />
          <circle className="art-ctrl" cx="70" cy="40" r="3" />
          <circle className="art-ctrl" cx="92" cy="102" r="3" />
          <rect className="art-anchor" x="78" y="68" width="8" height="8" />
        </g>
        <g className="art-handle" style={t(0.62)}>
          <path className="art-line art-thin" d="M160 92 L156 156" />
          <circle className="art-ctrl" cx="160" cy="92" r="3" />
          <circle className="art-ctrl" cx="156" cy="156" r="3" />
          <rect className="art-anchor" x="154" y="120" width="8" height="8" />
        </g>
        <g className="art-handle" style={t(0.69)}>
          <rect className="art-anchor" x="146" y="46" width="8" height="8" />
          <rect className="art-anchor" x="78" y="136" width="8" height="8" />
        </g>
      </g>
    </g>
  );
}

function WorkflowRun() {
  return (
    <g>
      {/* trigger → map → if → notify → done */}
      <path
        className="art-line art-draw"
        pathLength={1}
        d="M64 46 H178 M196 64 V110 M174 124 H80"
        style={t(0.1)}
      />
      <circle className="art-dot art-dot-flow" r="3.5" />

      <rect className="art-node art-flash art-draw" pathLength={1} x="20" y="32" width="44" height="28" rx="4" style={t(0, 0.6)} />
      <text className="art-label" x="42" y="49">trigger</text>

      <rect className="art-node art-flash art-draw" pathLength={1} x="100" y="32" width="44" height="28" rx="4" style={t(0.1, 0.95)} />
      <text className="art-label" x="122" y="49">map</text>

      <path className="art-node art-flash art-draw" pathLength={1} d="M196 28 L214 46 L196 64 L178 46 Z" style={t(0.2, 1.25)} />
      <text className="art-label" x="196" y="49">if</text>

      <rect className="art-node art-flash art-draw" pathLength={1} x="174" y="110" width="44" height="28" rx="4" style={t(0.3, 1.7)} />
      <text className="art-label" x="196" y="127">notify</text>

      <circle className="art-node art-flash art-draw" pathLength={1} cx="64" cy="124" r="16" style={t(0.4, 2.35)} />
      <path className="art-check art-draw" pathLength={1} d="M56 124 L62 130 L73 117" style={t(2.45)} />

      <text className="art-tag" x="20" y="164">run complete</text>
    </g>
  );
}
