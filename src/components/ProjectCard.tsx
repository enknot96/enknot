"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        delay: (index % 3) * 0.08,
      }}
    >
      <Link href={`/work/${project.slug}`} className="block group">
        <motion.div
          className="relative overflow-hidden"
          style={{
            background: "#F3F3F6",
            border: "1px solid #EAEAEE",
            borderRadius: "8px",
          }}
          whileHover={{ borderColor: "#CCCCDD" }}
          transition={{ duration: 0.2 }}
        >
          {/* Thumbnail */}
          <div
            className="w-full aspect-video flex items-center justify-center"
            style={{ background: "#EBEBEF" }}
          >
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-xs tracking-widest uppercase"
                style={{ color: "#CCCCDD", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {project.title}
              </span>
            )}
          </div>

          <div className="p-6">
            <p
              className="text-xs tracking-[0.15em] uppercase mb-3"
              style={{ color: "#AAAABC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              {project.techStack.slice(0, 2).join(" · ")}
            </p>

            <h3
              className="mb-2"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "18px",
                fontWeight: 600,
                color: "#0A0A0F",
                letterSpacing: "-0.01em",
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                color: "#888899",
                lineHeight: 1.65,
                fontWeight: 300,
              }}
            >
              {project.description}
            </p>

            <motion.div
              className="mt-4 flex items-center gap-1 text-xs tracking-widest uppercase"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#BBBBCC",
                fontWeight: 500,
              }}
              whileHover={{ color: "#0A0A0F" }}
              transition={{ duration: 0.2 }}
            >
              View project <span style={{ fontSize: "9px" }}>→</span>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
