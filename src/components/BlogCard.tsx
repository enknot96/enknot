"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import Eyebrow from "@/components/ui/Eyebrow";
import ArrowUpRightIcon from "@/components/ui/ArrowUpRightIcon";
import { EASE } from "@/lib/motion";

type Props = {
  post: BlogPost;
  index: number;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default function BlogCard({ post, index }: Props) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 3) * 0.08 }}
    >
      <Link
        href={`/blog/${post.id}`}
        className="block group h-full"
      >
        <motion.div
          className="relative overflow-hidden rounded-base border border-line bg-surface h-full flex flex-col"
          whileHover={{ borderColor: "#cccccc" }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-full aspect-video flex items-center justify-center bg-shade shrink-0">
            {post.eyecatch ? (
              <Image
                src={post.eyecatch.url}
                alt={post.title}
                width={post.eyecatch.width}
                height={post.eyecatch.height}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-display text-hint text-xs tracking-widest uppercase">
                {post.title}
              </span>
            )}
          </div>

          <div className="p-6 flex flex-col flex-1">
            <div className="mb-3 flex items-center gap-3 flex-wrap">
              <Eyebrow className="tracking-[0.15em]">{formatDate(post.publishedAt)}</Eyebrow>
              {post.categories?.map((c) => (
                <span
                  key={c.id}
                  className="chip"
                >
                  {c.name}
                </span>
              ))}
            </div>

            <h3 className="mb-2 font-noto font-semibold text-ink text-[18px] tracking-[-0.01em]">
              {post.title}
            </h3>

            {post.description && (
              <p className="font-body font-light text-subtle text-[14px] leading-[1.65] flex-1">
                {post.description}
              </p>
            )}

            <motion.div
              className="mt-4 flex items-center gap-1 font-display font-medium text-faint text-xs tracking-widest uppercase"
              whileHover={{ color: "#0a0a0f" }}
              transition={{ duration: 0.2 }}
            >
              Read more <ArrowUpRightIcon />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
