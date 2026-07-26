"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import { EASE } from "@/lib/motion";

type Props = {
  project: Project;
  index: number;
};

export default function ProjectCard({ project, index }: Props) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block group h-full"
      >
        <motion.div
          className="relative overflow-hidden rounded-base border border-line bg-surface h-full flex flex-col"
          whileHover={{ borderColor: "#cccccc" }}
          transition={{ duration: 0.2 }}
        >
          {/* Thumbnail */}
          <div className="w-full aspect-video flex items-center justify-center bg-shade shrink-0">
            {project.thumbnail ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display text-hint text-xs tracking-widest uppercase">
                {project.title}
              </span>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            <Eyebrow className="mb-3 tracking-[0.15em]">
              {project.category}
            </Eyebrow>

            <h3 className="mb-2 font-noto font-semibold text-ink text-[18px] tracking-[-0.01em]">
              {project.title}
            </h3>

            <p className="font-body font-light text-subtle text-[14px] leading-[1.65] flex-1">
              {project.description}
            </p>

            <motion.div
              className="mt-4 flex items-center gap-1 font-display font-medium text-faint text-xs tracking-widest uppercase"
              whileHover={{ color: "#0a0a0f" }}
              transition={{ duration: 0.2 }}
            >
              View project <ArrowUpRightIcon />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
