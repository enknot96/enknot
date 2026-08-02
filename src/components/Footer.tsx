"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Container from "./ui/Container";
import GitHubIcon from "./ui/GitHubIcon";
import ArrowUpIcon from "./ui/ArrowUpIcon";

const SPACING = 36;
const PARTICLE_RADIUS = 1.5;

type Particle = {
  bx: number;
  by: number;
  x: number;
  y: number;
  alpha: number;
  targetAlpha: number;
};
type Ripple = { cx: number; cy: number; strength: number; time: number };

function useParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLElement>(null);

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

    function buildGrid() {
      particles = [];
      const offsetX = (W - (cols - 1) * SPACING) / 2;
      const offsetY = (H - (rows - 1) * SPACING) / 2;
      for (let r = 0; r < rows; r++)
        for (let c = 0; c < cols; c++)
          particles.push({
            bx: offsetX + c * SPACING,
            by: offsetY + r * SPACING,
            x: 0,
            y: 0,
            alpha: 0,
            targetAlpha: 0.06 + Math.random() * 0.05,
          });
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
      ctx.clearRect(0, 0, W, H);
      rippleQueue = rippleQueue.filter((r) => now - r.time < 1200);

      for (const p of particles) {
        p.alpha += (p.targetAlpha - p.alpha) * 0.03;
        let displacement = 0;
        for (const r of rippleQueue) {
          const age = (now - r.time) / 1000;
          const dx = p.bx - r.cx,
            dy = p.by - r.cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const d = Math.abs(dist - age * 280);
          if (d < 60)
            displacement +=
              Math.sin((1 - d / 60) * Math.PI) * 10 * Math.exp(-age * 2.5) * r.strength;
        }
        const mdx = p.bx - mouse.x,
          mdy = p.by - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        const mi = mdist < 90 ? (1 - mdist / 90) * 8 : 0;
        p.x = p.bx + (mdist > 0 ? (mdx / mdist) * mi : 0);
        p.y = p.by + displacement + (mdist > 0 ? (mdy / mdist) * mi : 0);
        const a = Math.min(
          1,
          p.alpha + (displacement > 0 ? (displacement / 12) * 0.35 : 0) + (mi / 8) * 0.4,
        );
        ctx.beginPath();
        ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,10,20,${a})`;
        ctx.fill();
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
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
    setTimeout(() => triggerRipple(W / 2, H / 2, 1.2), 200);
    const interval = setInterval(
      () =>
        triggerRipple(
          W * (0.2 + Math.random() * 0.6),
          H * (0.2 + Math.random() * 0.6),
          0.7 + Math.random() * 0.3,
        ),
      2200,
    );

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return { canvasRef, wrapRef };
}

// 内部ナビ: どのページからでもトップの該当セクションへ飛べるよう絶対パス + ハッシュ
const NAV = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
];

function XIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.291 19.487h2.039L6.486 3.24H4.298l13.312 17.4Z" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line
        x1="16"
        y1="8"
        x2="2"
        y2="22"
      />
      <line
        x1="17.5"
        y1="15"
        x2="9"
        y2="15"
      />
    </svg>
  );
}

const SOCIAL = [
  { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
  { label: "Blog", href: "https://jp-tagr.com/", icon: BlogIcon },
];

const linkClass =
  "inline-flex items-center gap-2 font-body text-subtle text-[14px] hover:text-ink transition-colors";

export default function Footer() {
  const year = new Date().getFullYear();
  const { canvasRef, wrapRef } = useParticleCanvas();

  return (
    <footer
      ref={wrapRef}
      className="relative w-full border-t border-line bg-paper overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <Container className="relative z-10">
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Image
                src="/enknot.png"
                alt="ENKNOT"
                width={64}
                height={64}
                className="rounded-full border border-line"
              />
              <div>
                <p className="font-display font-bold text-ink text-[20px] tracking-[-0.02em]">
                  ENKNOT
                </p>
                <p className="mt-1 font-body font-light text-subtle text-[13px]">
                  AI × Web Developer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-subtle hover:text-ink transition-colors"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav>
            <p className="eyebrow mb-4">Navigation</p>
            <ul className="space-y-2">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={linkClass}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body font-light text-faint text-[12px]">
            © {year} ENKNOT. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase hover:text-ink transition-colors"
          >
            Back to top <ArrowUpIcon />
          </button>
        </div>
      </Container>
    </footer>
  );
}
