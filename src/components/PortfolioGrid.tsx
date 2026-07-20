"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { projects } from "@/data/projects";
import Section from "@/components/ui/Section";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Section id="work">
      <div ref={ref}>
        <motion.p
          className="eyebrow mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6 }}
        >
          Work
        </motion.p>

        <motion.h2
          className="mb-16 font-display font-bold text-ink text-[clamp(24px,3.5vw,38px)] tracking-[-0.02em]"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ポートフォリオ
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
          />
        ))}
      </div>
    </Section>
  );
}
