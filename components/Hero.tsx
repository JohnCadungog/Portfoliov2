"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowDown, FileText } from "lucide-react";
import { careers, person, type CareerId } from "@/lib/content";
import CareerSwitch from "./CareerSwitch";
import FanDeck from "./FanDeck";
import ThemeToggle from "./ThemeToggle";
import type { SwitchCareer } from "./Portfolio";

const word: Variants = {
  hidden: { opacity: 0, y: "0.45em", filter: "blur(10px)" },
  show: (i: number) => ({
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 260, damping: 26, delay: 0.12 + i * 0.045 },
  }),
  exit: { opacity: 0, y: "-0.2em", filter: "blur(6px)", transition: { duration: 0.18 } },
};

export default function Hero({
  career,
  switchTo,
  children,
}: {
  career: CareerId;
  switchTo: SwitchCareer;
  children?: React.ReactNode;
}) {
  const c = careers[career];
  return (
    <section id="top" className="hero on-ink">
      {children}
      <header className="hero-bar wrap">
        <a href="#top" className="wordmark display">
          {person.name}
        </a>
        <nav aria-label="Sections" className="hero-nav">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
        <CareerSwitch career={career} switchTo={switchTo} id="hero" tone="ink" />
        <ThemeToggle />
      </header>

      <div className="hero-body wrap">
        <div className="hero-copy">
          <p className="hero-role">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={career}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
              >
                {c.title}
              </motion.span>
            </AnimatePresence>
            <span aria-hidden> · </span>
            <span>Cebu, Philippines</span>
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.h1 key={career} className="hero-title display" aria-label={c.headline}>
              {c.headline.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  className="hero-word"
                  aria-hidden
                  custom={i}
                  variants={word}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                >
                  {w}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={career}
              className="hero-pitch"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.3 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {c.pitch}
            </motion.p>
          </AnimatePresence>

          <div className="hero-actions">
            <a href="#work" className="btn btn-solid">
              See the work <ArrowDown size={18} strokeWidth={2} aria-hidden />
            </a>
            <a href={c.resume} className="btn btn-ghost" download>
              <FileText size={18} strokeWidth={2} aria-hidden /> Résumé (PDF)
            </a>
          </div>
        </div>

        <FanDeck career={career} switchTo={switchTo} />
      </div>
    </section>
  );
}
