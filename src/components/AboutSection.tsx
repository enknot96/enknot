"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Chip from "@/components/ui/Chip";
import { fadeUp } from "@/lib/motion";

const SKILLS = ["Next.js", "TypeScript", "React", "Node.js", "AWS", "Docker"];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const reveal = (delay: number) => ({
    variants: fadeUp,
    custom: delay,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
  });

  return (
    <Section id="about">
      <div ref={ref}>
        <motion.p className="eyebrow mb-8" {...reveal(0)}>
          About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="mb-8 font-display font-bold text-ink text-[clamp(28px,4vw,44px)] leading-[1.15] tracking-[-0.02em]"
              {...reveal(0.1)}
            >
              Your Name
            </motion.h2>

            <motion.p
              className="font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.2)}
            >
              自己紹介文をここに書きます。どんなことをしているか、何に興味があるか、
              どんなものを作ってきたかを 2〜3 文で。
            </motion.p>
          </div>

          <motion.div {...reveal(0.3)}>
            <Eyebrow className="mb-4">Skills</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <Chip key={skill}>{skill}</Chip>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
