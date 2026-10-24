"use client";

import { motion } from "motion/react";
import { careerOrder, careers, type CareerId } from "@/lib/content";
import type { SwitchCareer } from "./Portfolio";

/** Segmented control of swatch chips. The pill rides between options on a spring. */
export default function CareerSwitch({
  career,
  switchTo,
  id,
  tone,
}: {
  career: CareerId;
  switchTo: SwitchCareer;
  id: string;
  tone: "ink" | "dark";
}) {
  return (
    <div role="radiogroup" aria-label="Career" className={`switch switch-${tone}`}>
      {careerOrder.map((cid) => {
        const active = cid === career;
        return (
          <button
            key={cid}
            role="radio"
            aria-checked={active}
            className="switch-option"
            data-active={active || undefined}
            onClick={(e) => switchTo(cid, { x: e.clientX, y: e.clientY })}
          >
            {active && (
              <motion.span
                layoutId={`pill-${id}`}
                className="switch-pill"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="switch-dot" style={{ background: careers[cid].ink }} aria-hidden />
            <span className="switch-label">{careers[cid].label}</span>
          </button>
        );
      })}
    </div>
  );
}
