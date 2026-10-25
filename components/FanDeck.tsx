"use client";

import { useRef, type CSSProperties } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { careerOrder, careers, type CareerId } from "@/lib/content";
import type { SwitchCareer } from "./Portfolio";
import DeckArt, { deckArtCaption } from "./DeckArt";

// Resting angle for each depth in the deck: front card upright, the rest fanned behind it.
const FAN = [0, -12, -24];
const deckSpring = { type: "spring", stiffness: 210, damping: 22, mass: 0.9 } as const;

export default function FanDeck({ career, switchTo }: { career: CareerId; switchTo: SwitchCareer }) {
  const active = careerOrder.indexOf(career);
  const drag = useMotionValue(0);
  // A pan ends with a click on whichever card was under the finger; ignore that click.
  const panned = useRef(false);

  const step = (dir: 1 | -1) => {
    const n = careerOrder.length;
    switchTo(careerOrder[(active + dir + n) % n]);
  };

  return (
    <motion.div
      role="group"
      aria-label="Career deck. Choose a card, drag the deck, or use the arrow keys."
      className="deck"
      style={{ rotate: drag }}
      onPointerDownCapture={() => (panned.current = false)}
      onPanStart={() => (panned.current = true)}
      onPan={(_, info) => drag.set(Math.max(-16, Math.min(16, info.offset.x * 0.06)))}
      onPanEnd={(_, info) => {
        const flick = info.offset.x + info.velocity.x * 0.2;
        if (flick < -70) step(1);
        else if (flick > 70) step(-1);
        animate(drag, 0, { type: "spring", stiffness: 300, damping: 20, velocity: info.velocity.x * 0.02 });
      }}
    >
      {careerOrder.map((id, i) => {
        const depth = (i - active + careerOrder.length) % careerOrder.length;
        const c = careers[id];
        return (
          <motion.button
            key={id}
            type="button"
            className="deck-card"
            aria-pressed={depth === 0}
            aria-label={`${c.title}${depth === 0 ? ", showing" : ""}`}
            style={{ zIndex: 10 - depth, transformOrigin: "50% 93%" }}
            initial={false}
            animate={{
              rotate: FAN[depth],
              y: depth === 0 ? -10 : 0,
              filter: depth === 0 ? "brightness(1)" : `brightness(${1 - depth * 0.06})`,
            }}
            whileHover={depth === 0 ? { y: -18 } : { rotate: FAN[depth] - 3 }}
            whileTap={{ scale: 0.985 }}
            transition={deckSpring}
            onClick={(e) => {
              if (panned.current) {
                panned.current = false;
                return;
              }
              if (depth !== 0) switchTo(id, { x: e.clientX, y: e.clientY });
              else document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {/* A drawn figure plate of the craft, in the card's own ink, so the art always belongs to
                the card and never runs under the career word. */}
            <span className="deck-field" style={{ "--card-ink": c.ink, background: c.ink, color: c.onInk } as CSSProperties}>
              <span className="deck-no code">JC—0{i + 1}</span>
              <span className="deck-plate">
                <DeckArt career={id} />
              </span>
              <span className="deck-caption code">{deckArtCaption[id]}</span>
              <span className="deck-word display">{c.label}</span>
            </span>
            <span className="deck-strip">
              <span>
                <span className="deck-title">{c.title}</span>
                <span className="code deck-code">{c.inkName}</span>
              </span>
              <span className="deck-rivet" aria-hidden />
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
