"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CareerId } from "@/lib/content";
import CareerSwitch from "./CareerSwitch";
import type { SwitchCareer } from "./Portfolio";

/** Floating switcher that rises once the hero deck has scrolled away. */
export default function Dock({ career, switchTo }: { career: CareerId; switchTo: SwitchCareer }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), {
      rootMargin: "0px 0px -60% 0px",
    });
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="dock"
          initial={{ y: 96, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 96, opacity: 0, filter: "blur(6px)" }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <CareerSwitch career={career} switchTo={switchTo} id="dock" tone="dark" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
