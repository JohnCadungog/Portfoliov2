"use client";

import { AnimatePresence, motion } from "motion/react";
import { careers, person, type CareerId } from "@/lib/content";

export default function Experience({ career }: { career: CareerId }) {
  const c = careers[career];
  return (
    <section id="experience" className="experience" aria-labelledby="exp-title">
      <div className="wrap exp-grid">
        <div className="exp-aside">
          <h2 id="exp-title" className="section-title display">
            Experience
          </h2>
          <div className="edu">
            <p className="code side-label">Education</p>
            <p className="edu-school">{person.education.school}</p>
            <p>
              {person.education.degree}, {person.education.dates}
            </p>
            <p className="edu-honor">{person.education.honors}</p>
          </div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={career}
            className="exp-main"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
          >
            <ol className="jobs">
              {c.jobs.map((j) => (
                <li key={j.company + j.role} className="job">
                  <p className="code job-dates">{j.dates}</p>
                  <div>
                    <h3 className="job-company display">{j.company}</h3>
                    <p className="job-role">{j.role}</p>
                    <ul className="job-points">
                      {j.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <div className="skills">
              <h3 className="skills-title display">Toolkit</h3>
              <dl className="skill-groups">
                {c.skills.map((g) => (
                  <div key={g.group} className="skill-group">
                    <dt className="code side-label">{g.group}</dt>
                    <dd>
                      <ul className="tags">
                        {g.items.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
