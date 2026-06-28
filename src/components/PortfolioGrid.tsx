"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="work" className="w-full py-24" style={{ background: "#FAFAFA" }}>
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <div ref={ref}>
          <motion.p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6 }}
          >
            Work
          </motion.p>

          <motion.h2
            className="mb-16"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(24px, 3.5vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#0A0A0F",
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Selected Projects
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
