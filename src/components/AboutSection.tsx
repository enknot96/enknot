"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE, delay: i * 0.1 },
    }),
  };

  return (
    <section className="w-full py-32" style={{ background: "#FAFAFA" }}>
      <div ref={ref} style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        <motion.p
          className="text-xs tracking-[0.2em] uppercase mb-8"
          style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="mb-8"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                color: "#0A0A0F",
              }}
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Your Name
            </motion.h2>

            <motion.p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "16px",
                color: "#666677",
                lineHeight: 1.85,
                fontWeight: 300,
              }}
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              自己紹介文をここに書きます。どんなことをしているか、何に興味があるか、
              どんなものを作ってきたかを 2〜3 文で。
            </motion.p>
          </div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <p
              className="text-xs tracking-[0.2em] uppercase mb-4"
              style={{ color: "#BBBBCC", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}
            >
              Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "TypeScript", "React", "Node.js", "AWS", "Docker"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: "#888899",
                    border: "1px solid #E8E8EE",
                    borderRadius: "4px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
