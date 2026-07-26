"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Project } from "@/data/projects";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import Chip from "@/components/ui/Chip";
import GitHubIcon from "@/components/ui/GitHubIcon";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import { fadeUpProps } from "@/lib/motion";

type Props = { project: Project };

export default function ProjectDetail({ project }: Props) {
  return (
    <main className="min-h-screen bg-paper py-10 md:py-20">
      <Container narrow>
        <motion.div {...fadeUpProps(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase mb-16"
          >
            <ArrowLeftIcon /> Back
          </Link>
        </motion.div>

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
          <motion.div
            className="mb-16 rounded-base overflow-hidden"
            {...fadeUpProps(0.25)}
          >
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full transition-transform duration-300 hover:scale-[1.02]"
                />
              </a>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full"
              />
            )}
          </motion.div>
        )}

        <motion.div
          className="mb-12"
          {...fadeUpProps(0.3)}
        >
          <Eyebrow className="mb-4">Tech Stack</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>
        </motion.div>

        {project.story && (
          <motion.div
            className="mb-16"
            {...fadeUpProps(0.35)}
          >
            <Eyebrow className="mb-4">Story</Eyebrow>
            <p className="font-body font-light text-muted text-[15px] leading-[1.85]">
              {project.story}
            </p>
            {project.relatedProject && (
              <Link
                href={`/work/${project.relatedProject.slug}`}
                className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase mt-4 hover:text-ink transition-colors"
              >
                {project.relatedProject.label} <span className="text-[9px]">→</span>
              </Link>
            )}
          </motion.div>
        )}

        <motion.div
          className="mb-16"
          {...fadeUpProps(0.4)}
        >
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

        <motion.div
          className="flex flex-col gap-4 min-[531px]:flex-row"
          {...fadeUpProps(0.45)}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display font-medium text-subtle text-xs tracking-widest uppercase px-5 py-3 border border-line rounded-base hover:text-ink hover:border-ink transition-colors duration-200 w-full min-[531px]:w-auto"
            >
              <GitHubIcon />
              GitHub <ArrowUpRightIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display font-medium text-paper bg-ink text-xs tracking-widest uppercase px-5 py-3 rounded-base hover:opacity-85 transition-opacity duration-200 w-full min-[531px]:w-auto"
            >
              {project.liveUrlLabel ?? "サイトを見る"} <ArrowUpRightIcon />
            </a>
          )}
          {project.adminUrl && (
            <a
              href={project.adminUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-display font-medium text-paper bg-ink text-xs tracking-widest uppercase px-5 py-3 rounded-base hover:opacity-85 transition-opacity duration-200 w-full min-[531px]:w-auto"
            >
              管理画面を見る <ArrowUpRightIcon />
            </a>
          )}
        </motion.div>

        {project.hostingNote && (
          <p className="mt-4 bg-red-50 border border-red-300 text-red-700 text-[13px] rounded-base px-4 py-3">
            ⚠️ {project.hostingNote}
          </p>
        )}

        {project.demoAccounts && project.demoAccounts.length > 0 && (
          <motion.div
            className="mt-8 bg-surface rounded-base p-6"
            {...fadeUpProps(0.5)}
          >
            <Eyebrow className="mb-4">デモ用アカウント</Eyebrow>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line">
                    <th className="pb-2 pr-4 font-display font-medium text-faint text-xs tracking-widest uppercase">
                      権限
                    </th>
                    <th className="pb-2 pr-4 font-display font-medium text-faint text-xs tracking-widest uppercase">
                      メールアドレス
                    </th>
                    <th className="pb-2 font-display font-medium text-faint text-xs tracking-widest uppercase">
                      パスワード
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {project.demoAccounts.map((account) => (
                    <tr key={account.email} className="border-b border-line last:border-0">
                      <td className="py-3 pr-4 font-body text-muted text-[14px] whitespace-nowrap">
                        {account.role}
                      </td>
                      <td className="py-3 pr-4 font-mono text-ink text-[13px]">
                        {account.email}
                      </td>
                      <td className="py-3 font-mono text-ink text-[13px]">
                        {account.password}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-body text-faint text-[13px]">
              ポートフォリオ公開用のデモアカウントです。決済はStripeのテストモードのみで動作します。
            </p>
          </motion.div>
        )}
      </Container>
    </main>
  );
}
