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
  { name: "Astro", url: `${D}/astro/astro-original.svg` },
  { name: "Node.js", url: `${D}/nodejs/nodejs-original.svg` },
  { name: "Laravel", url: `${D}/laravel/laravel-original.svg` },
  { name: "Linux", url: `${D}/linux/linux-original.svg` },
  { name: "AWS", url: `${D}/amazonwebservices/amazonwebservices-plain-wordmark.svg` },
  { name: "Vercel", url: `${D}/vercel/vercel-original.svg` },
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
          About Me
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <motion.h2
              className="mb-2 font-display font-bold text-ink text-[clamp(23px,3.25vw,36px)] leading-[1.15] tracking-[-0.02em]"
              {...reveal(0.1)}
            >
              Shuto｜<span className="text-[0.75em] font-noto font-normal">しゅーと</span>
            </motion.h2>

            <motion.p
              className="mb-8 font-body font-light text-subtle text-[14px]"
              {...reveal(0.15)}
            >
              屋号：ENKNOT（エンノット）
            </motion.p>

            <motion.p
              className="mb-4 font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.2)}
            >
              新卒でハウスメーカーに入社し、営業として6年間経験を積みました（宅地建物取引士）。退職後は約1年半の海外生活を経て、
              Webエンジニアとしてキャリアを再スタート。現在は基幹システムやWebアプリ開発を中心に、AIを活用した開発、サーバー構築まで幅広く携わっています。
            </motion.p>

            <motion.p
              className="mb-4 font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.25)}
            >
              営業時代に培った顧客対応や業務プロセスの知見は、エンジニアとしての仕事、そして、AIエージェントの判断ロジックにも活かしています。
              趣味は読書とキャンプ、子供の頃はサッカーに打ち込んでいました。
            </motion.p>

            <motion.p
              className="font-body font-light text-muted text-[16px] leading-[1.85]"
              {...reveal(0.3)}
            >
              業務委託でのお仕事を受け付けています。日中は本業のためチャットベースでの対応、実装は朝・夜間・週末を中心に進めるスタイルです。
              稼働時間・定例MTへの参加はご相談に応じて調整します。
            </motion.p>
          </div>

          <motion.div {...reveal(0.3)}>
            <Eyebrow className="mb-6">Favorite Skills</Eyebrow>
            <div className="grid grid-cols-3 gap-x-6 gap-y-8">
              {SKILLS.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center gap-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={skill.url}
                    alt={skill.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
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
