"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useDragControls } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import type { CareerId, Project } from "@/lib/content";
import Media from "./Media";

/**
 * Detail sheet. The cover grows out of the card it was opened from (shared layoutId),
 * and the sheet follows the finger when dragged down by its grabber or header.
 */
export default function ProjectSheet({
  career,
  project,
  onClose,
}: {
  career: CareerId;
  project: Project | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {project && <Sheet key={project.slug} career={career} project={project} onClose={onClose} />}
    </AnimatePresence>
  );
}

function Sheet({ career, project, onClose }: { career: CareerId; project: Project; onClose: () => void }) {
  const drag = useDragControls();
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [shot, setShot] = useState(0);
  const count = project.images.length;

  useEffect(() => {
    window.__lenis?.stop();
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.style.overflow = prevOverflow;
      window.__lenis?.start();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (count > 1 && e.key === "ArrowRight") setShot((s) => (s + 1) % count);
      if (count > 1 && e.key === "ArrowLeft") setShot((s) => (s - 1 + count) % count);
      if (e.key === "Tab" && panel.current) {
        const focusables = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, onClose]);

  return (
    <div className="sheet-layer">
      <motion.div
        className="sheet-scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="sheet"
        initial={{ y: "18%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "24%", opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
        transition={{ type: "spring", stiffness: 320, damping: 34 }}
        drag="y"
        dragControls={drag}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.05, bottom: 0.8 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 140 || info.velocity.y > 700) onClose();
        }}
      >
        <div className="sheet-grab" onPointerDown={(e) => drag.start(e)} aria-hidden>
          <span />
        </div>

        <div className="sheet-scroll" data-lenis-prevent>
          <div className="sheet-head" onPointerDown={(e) => drag.start(e)}>
            <div>
              <p className="code sheet-kind">{project.kind}</p>
              <h3 id="sheet-title" className="sheet-title display">
                {project.name}
              </h3>
            </div>
            <button ref={closeBtn} type="button" className="icon-btn" onClick={onClose} aria-label="Close project">
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <motion.div layoutId={`media-${career}-${project.slug}`} className="sheet-media">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={shot}
                className="sheet-shot"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                drag={count > 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setShot((s) => (s + 1) % count);
                  else if (info.offset.x > 60) setShot((s) => (s - 1 + count) % count);
                }}
              >
                <Media project={project} src={project.images[shot]} />
              </motion.div>
            </AnimatePresence>
            {count > 1 && (
              <>
                <button
                  type="button"
                  className="icon-btn shot-nav shot-prev"
                  onClick={() => setShot((s) => (s - 1 + count) % count)}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  className="icon-btn shot-nav shot-next"
                  onClick={() => setShot((s) => (s + 1) % count)}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
                <span className="shot-count code">
                  {shot + 1} / {count}
                </span>
              </>
            )}
          </motion.div>

          {count > 1 && (
            <div className="thumbs" role="tablist" aria-label="Images">
              {project.images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === shot}
                  aria-label={`Image ${i + 1}`}
                  className="thumb"
                  onClick={() => setShot(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          <div className="sheet-body">
            <div>
              <p className="sheet-summary">{project.summary}</p>
              {project.details && (
                <ul className="sheet-details">
                  {project.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </div>
            <aside className="sheet-side">
              {project.role && (
                <div>
                  <p className="code side-label">Role</p>
                  <p>{project.role}</p>
                </div>
              )}
              {project.stack.length > 0 && (
                <div>
                  <p className="code side-label">Built with</p>
                  <ul className="tags">
                    {project.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {project.links.length > 0 && (
                <div className="sheet-links">
                  {project.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="btn btn-dark">
                      {l.label} <ArrowUpRight size={16} aria-hidden />
                    </a>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
