"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import { fadeUp } from "@/lib/motion";

const D = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const S = "https://cdn.simpleicons.org";

const SKILLS = [
  { name: "TypeScript", url: `${D}/typescript/typescript-original.svg` },
  { name: "React", url: `${D}/react/react-original.svg` },
  { name: "Next.js", url: `${D}/nextjs/nextjs-original.svg` },
  { name: "GSAP", url: `${S}/gsap` },
  { name: "Three.js", url: `${D}/threejs/threejs-original.svg` },
  { name: "Blender", url: `${D}/blender/blender-original.svg` },
  { name: "Laravel", url: `${D}/laravel/laravel-original.svg` },
  { name: "MySQL", url: `${D}/mysql/mysql-original.svg` },
  { name: "Supabase", url: `${S}/supabase` },
  { name: "Neon", url: `${S}/neon` },
  { name: "AWS", url: `${D}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: "Docker", url: `${D}/docker/docker-original.svg` },
];

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
        <motion.p
          className="eyebrow mb-8"
          {...reveal(0)}
        >
          About
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="mb-8 font-display font-bold text-ink text-[clamp(28px,4vw,44px)] leading-[1.15] tracking-[-0.02em]"
              {...reveal(0.1)}
            >
              TAMAKI Shuto
              <br />
              <span className="font-noto font-normal text-[clamp(20px,4vw,36px)]">玉木 周統</span>
            </motion.h2>

            <motion.p
              className="mb-4 font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.2)}
            >
              新卒で積水ハウス株式会社に入社し、営業として6年間経験を積みました。退職後は約1年半海外で生活し、
              帰国後はフルスタックエンジニアとして転職、キャリアを再スタートしました。現在は基幹システムやWebアプリ開発を中心に、
              サーバー構築・メールDNS設定までITに幅広く携わっています。
            </motion.p>

            <motion.p
              className="font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.25)}
            >
              子供の頃からパズルやレゴなどモノづくりが好きで、エンジニアという仕事にも通じるものを感じ、今も楽しみながら熱中しています。
              プライベートでもコーディングを楽しみつつ、AI(Claudeなど)を活用した効率的な開発を追求し、新しい技術を日々キャッチアップしています。
              趣味は読書とキャンプ、子供の頃はサッカーに打ち込んでいました。推しはちいかわのモモンガです。
            </motion.p>
          </div>

          <motion.div {...reveal(0.3)}>
            <Eyebrow className="mb-6">Favorite Skills</Eyebrow>
            <div className="grid grid-cols-4 gap-x-6 gap-y-8">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.url}
                    alt={skill.name}
                    width={36}
                    height={36}
                    className="w-9 h-9 object-contain"
                  />
                  <span className="font-display text-[10px] font-semibold tracking-[0.15em] uppercase text-subtle text-center leading-tight">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
