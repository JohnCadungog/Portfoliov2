"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { careers, type CareerId, type Project } from "@/lib/content";
import ProjectSheet from "./ProjectSheet";
import Media from "./Media";

export default function WorkGrid({ career }: { career: CareerId }) {
  const c = careers[career];
  const [open, setOpen] = useState<Project | null>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  return (
    <section id="work" className="work wrap" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title" className="section-title display">
          Selected work
        </h2>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={career}
            className="section-note"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
          >
            {c.projects.length} projects as a {c.title.toLowerCase()}. Tap one for the details.
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.ul className="chips" layout>
        <AnimatePresence mode="popLayout" initial={false}>
          {c.projects.map((p, i) => (
            <motion.li
              key={`${career}-${p.slug}`}
              layout
              className={`chip-cell${i === 0 ? " chip-lead" : ""}`}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 28, delay: i * 0.05 } }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            >
              <button
                type="button"
                className="chip"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setOpen(p);
                }}
                aria-haspopup="dialog"
              >
                <motion.span layoutId={`media-${career}-${p.slug}`} className="chip-media">
                  <Media project={p} index={i} />
                </motion.span>
                <span className="chip-strip">
                  <span className="chip-name">{p.name}</span>
                  <span className="chip-meta">
                    <span className="code">{p.kind}</span>
                    <span className="code">No. {String(i + 1).padStart(2, "0")}</span>
                  </span>
                  <ArrowUpRight className="chip-arrow" size={20} strokeWidth={1.75} aria-hidden />
                </span>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectSheet
        career={career}
        project={open}
        onClose={() => {
          setOpen(null);
          requestAnimationFrame(() => opener.current?.focus());
        }}
      />
    </section>
  );
}
