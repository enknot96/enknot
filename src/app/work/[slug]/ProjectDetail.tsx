"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";

type Props = { project: Project };

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

export default function ProjectDetail({ project }: Props) {
  return (
    <main className="min-h-screen py-24" style={{ background: "#FAFAFA" }}>
      <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.div {...fadeUp(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs tracking-widest uppercase mb-16"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#BBBBCC",
              fontWeight: 500,
              display: "inline-flex",
            }}
          >
            <span style={{ fontSize: "9px" }}>←</span> Back
          </Link>
        </motion.div>

        <motion.p
          className="text-xs tracking-[0.2em] uppercase mb-4"
          style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          {...fadeUp(0.1)}
        >
          {project.techStack.slice(0, 2).join(" · ")}
        </motion.p>

        <motion.h1
          className="mb-6"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#0A0A0F",
          }}
          {...fadeUp(0.15)}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="mb-16"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            color: "#666677",
            lineHeight: 1.85,
            fontWeight: 300,
          }}
          {...fadeUp(0.2)}
        >
          {project.longDescription}
        </motion.p>

        {project.thumbnail && (
          <motion.div className="mb-16 rounded-lg overflow-hidden" {...fadeUp(0.25)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.thumbnail} alt={project.title} className="w-full" />
          </motion.div>
        )}

        <motion.div className="mb-12" {...fadeUp(0.3)}>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs tracking-widest uppercase"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#888899",
                  border: "1px solid #E8E8EE",
                  borderRadius: "4px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-16" {...fadeUp(0.35)}>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-4"
            style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          >
            Highlights
          </p>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  color: "#666677",
                  fontWeight: 300,
                }}
              >
                <span style={{ color: "#CCCCDD", marginTop: "2px" }}>—</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="flex gap-4" {...fadeUp(0.4)}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#888899",
                border: "1px solid #E8E8EE",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase px-5 py-3"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FAFAFA",
                background: "#0A0A0F",
                borderRadius: "6px",
                fontWeight: 500,
              }}
            >
              Live Site →
            </a>
          )}
        </motion.div>
      </div>
    </main>
  );
}
