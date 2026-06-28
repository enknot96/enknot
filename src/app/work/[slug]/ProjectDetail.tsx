"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Chip from "@/components/ui/Chip";
import { fadeUpProps } from "@/lib/motion";

type Props = { project: Project };

export default function ProjectDetail({ project }: Props) {
  return (
    <main className="min-h-screen bg-paper py-28 md:py-40">
      <Container narrow>
        <motion.div {...fadeUpProps(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase mb-16"
          >
            <span className="text-[9px]">←</span> Back
          </Link>
        </motion.div>

        <motion.p className="eyebrow mb-4" {...fadeUpProps(0.1)}>
          {project.techStack.slice(0, 2).join(" · ")}
        </motion.p>

        <motion.h1
          className="mb-6 font-display font-bold text-ink text-[clamp(32px,5vw,56px)] leading-[1.1] tracking-[-0.02em]"
          {...fadeUpProps(0.15)}
        >
          {project.title}
        </motion.h1>

        <motion.p
          className="mb-16 font-body font-light text-muted text-[16px] leading-[1.85]"
          {...fadeUpProps(0.2)}
        >
          {project.longDescription}
        </motion.p>

        {project.thumbnail && (
          <motion.div className="mb-16 rounded-base overflow-hidden" {...fadeUpProps(0.25)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.thumbnail} alt={project.title} className="w-full" />
          </motion.div>
        )}

        <motion.div className="mb-12" {...fadeUpProps(0.3)}>
          <Eyebrow className="mb-4">Tech Stack</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </motion.div>

        <motion.div className="mb-16" {...fadeUpProps(0.35)}>
          <Eyebrow className="mb-4">Highlights</Eyebrow>
          <ul className="space-y-3">
            {project.highlights.map((h, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-body font-light text-muted text-[15px]"
              >
                <span className="text-hint mt-0.5">—</span>
                {h}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="flex gap-4" {...fadeUpProps(0.4)}>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-medium text-subtle text-xs tracking-widest uppercase px-5 py-3 border border-line rounded-base"
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-medium text-paper bg-ink text-xs tracking-widest uppercase px-5 py-3 rounded-base"
            >
              Live Site →
            </a>
          )}
        </motion.div>
      </Container>
    </main>
  );
}
