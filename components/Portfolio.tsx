"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from "motion/react";
import { careerOrder, careers, type CareerId } from "@/lib/content";
import { updatesUrl } from "@/lib/asset";
import SmoothScroll from "./SmoothScroll";
import Hero from "./Hero";
import WorkGrid from "./WorkGrid";
import Experience from "./Experience";
import Contact from "./Contact";
import Dock from "./Dock";

type Flood = { key: number; to: CareerId; x: number; y: number };

export type SwitchCareer = (id: CareerId, origin?: { x: number; y: number }) => void;

export default function Portfolio({ initial }: { initial: CareerId }) {
  const [career, setCareer] = useState<CareerId>(initial);
  // The hero ground lags behind `career` until the flood finishes covering it.
  const [ground, setGround] = useState<CareerId>(initial);
  const [flood, setFlood] = useState<Flood | null>(null);
  const reduce = useReducedMotion();

  const switchTo: SwitchCareer = useCallback(
    (id, origin) => {
      if (id === career) return;
      setCareer(id);
      if (updatesUrl) {
        try {
          window.history.replaceState(null, "", `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/${id}/`);
        } catch {}
      }
      const hero = document.getElementById("top")?.getBoundingClientRect();
      if (reduce || !hero || hero.bottom < 0) {
        setGround(id);
        setFlood(null);
        return;
      }
      // Flood grows from where the visitor touched, in hero coordinates.
      const x = (origin?.x ?? hero.width * 0.8) - hero.left;
      const y = (origin?.y ?? window.innerHeight * 0.9) - hero.top;
      // Interrupting a flood: settle the ground on the ink it was revealing.
      if (flood) setGround(flood.to);
      setFlood({ key: Date.now(), to: id, x, y });
    },
    [career, reduce, flood],
  );

  // Arrow keys move through the deck when focus is not in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [role=dialog]")) return;
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      const i = careerOrder.indexOf(career);
      const next = careerOrder[(i + (e.key === "ArrowRight" ? 1 : careerOrder.length - 1)) % careerOrder.length];
      switchTo(next);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [career, switchTo]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", careers[career].ink);
  }, [career]);

  const c = careers[career];
  const g = careers[ground];

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", stiffness: 300, damping: 32 }}>
      <SmoothScroll />
      <div
        data-career={career}
        style={
          {
            "--ink": c.ink,
            "--on-ink": c.onInk,
            "--ground": g.ink,
          } as React.CSSProperties
        }
      >
        <Hero career={career} switchTo={switchTo}>
          <AnimatePresence>
            {flood && (
              <motion.div
                key={flood.key}
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{ background: careers[flood.to].ink }}
                initial={{ clipPath: `circle(0px at ${flood.x}px ${flood.y}px)` }}
                animate={{ clipPath: `circle(${Math.hypot(window.innerWidth, window.innerHeight) * 1.25}px at ${flood.x}px ${flood.y}px)` }}
                exit={{ opacity: 0, transition: { duration: 0.01 } }}
                transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
                onAnimationComplete={() => {
                  setGround(flood.to);
                  setFlood(null);
                }}
              />
            )}
          </AnimatePresence>
        </Hero>
        <main>
          <WorkGrid career={career} />
          <Experience career={career} />
        </main>
        <Contact career={career} />
        <Dock career={career} switchTo={switchTo} />
      </div>
    </MotionConfig>
  );
}
