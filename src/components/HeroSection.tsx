"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, wordReveal } from "@/lib/motion";

const SPACING = 36;
const PARTICLE_RADIUS = 1.5;

type Particle = {
  bx: number;
  by: number;
  x: number;
  y: number;
  alpha: number;
  targetAlpha: number;
  phase: number;
};

type Ripple = {
  cx: number;
  cy: number;
  strength: number;
  time: number;
};

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0,
      cols = 0,
      rows = 0;
    let particles: Particle[] = [];
    let rippleQueue: Ripple[] = [];
    const mouse = { x: -999, y: -999 };
    let rafId: number;
    let lastFrame = 0;

    function buildGrid() {
      particles = [];
      const offsetX = (W - (cols - 1) * SPACING) / 2;
      const offsetY = (H - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          particles.push({
            bx: offsetX + c * SPACING,
            by: offsetY + r * SPACING,
            x: offsetX + c * SPACING,
            y: offsetY + r * SPACING,
            alpha: 0,
            targetAlpha: 0.06 + Math.random() * 0.05,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    function resize() {
      W = canvas.width = wrap.offsetWidth;
      H = canvas.height = wrap.offsetHeight;
      cols = Math.floor(W / SPACING);
      rows = Math.floor(H / SPACING);
      buildGrid();
    }

    function triggerRipple(cx: number, cy: number, strength: number) {
      rippleQueue.push({ cx, cy, strength, time: performance.now() });
    }

    function draw(now: number) {
      rafId = requestAnimationFrame(draw);
      lastFrame = lastFrame || now;
      lastFrame = now;

      ctx.clearRect(0, 0, W, H);
      rippleQueue = rippleQueue.filter((r) => now - r.time < 1200);

      for (const p of particles) {
        p.alpha += (p.targetAlpha - p.alpha) * 0.03;

        let displacement = 0;
        for (const r of rippleQueue) {
          const age = (now - r.time) / 1000;
          const wavefront = age * 280;
          const dx = p.bx - r.cx;
          const dy = p.by - r.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const spread = 60;
          const d = Math.abs(dist - wavefront);
          if (d < spread) {
            const envelope = Math.exp(-age * 2.5) * r.strength;
            displacement += Math.sin((1 - d / spread) * Math.PI) * 10 * envelope;
          }
        }

        const mdx = p.bx - mouse.x;
        const mdy = p.by - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mouseInfluence = mdist < 90 ? (1 - mdist / 90) * 8 : 0;
        const mx = mdist > 0 ? (mdx / mdist) * mouseInfluence : 0;
        const my = mdist > 0 ? (mdy / mdist) * mouseInfluence : 0;

        p.x = p.bx + mx;
        p.y = p.by + displacement + my;

        const brightBoost = displacement > 0 ? (displacement / 12) * 0.35 : 0;
        const mouseBoost = (mouseInfluence / 8) * 0.4;
        const a = Math.min(1, p.alpha + brightBoost + mouseBoost);

        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10, 10, 20, ${a})`;
        ctx.fill();
      }
    }

    function autoRipple() {
      const cx = W * (0.2 + Math.random() * 0.6);
      const cy = H * (0.2 + Math.random() * 0.6);
      triggerRipple(cx, cy, 0.7 + Math.random() * 0.3);
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -999;
      mouse.y = -999;
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", resize);

    resize();
    rafId = requestAnimationFrame(draw);

    setTimeout(() => triggerRipple(W / 2, H / 2, 1.2), 300);
    const rippleInterval = setInterval(autoRipple, 2200 + Math.random() * 1000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(rippleInterval);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-paper"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      <div className="relative z-10 text-center px-8">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Portfolio
        </motion.p>

        <motion.h1
          className="mb-6 font-display font-bold text-ink text-[clamp(52px,10vw,100px)] leading-[1.0] tracking-[-0.03em]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {["ENKNOT"].map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={wordReveal}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mb-10 max-w-sm mx-auto font-body font-light text-subtle text-[15px] leading-[1.75]"
          custom={0.7}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          AI &amp; Engineering
          <br />
          Building things that feel right.
        </motion.p>

        <motion.a
          href="#work"
          className="inline-flex items-center gap-2 font-display font-medium text-faint text-sm tracking-widest uppercase"
          custom={0.95}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          whileHover={{ color: "#0a0a0f" }}
          transition={{ duration: 0.2 }}
        >
          View Work
          <span className="text-[10px]">↓</span>
        </motion.a>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div
          className="w-px h-8"
          style={{ background: "linear-gradient(to bottom, var(--color-hint), transparent)" }}
        />
        <span className="font-display text-hint text-[10px] tracking-[0.15em] uppercase">
          scroll
        </span>
      </motion.div>
    </div>
  );
}
