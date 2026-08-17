import type { Metadata } from "next";
import Section from "@/components/ui/Section";
import BlogCard from "@/components/BlogCard";
import { getBlogList } from "@/lib/microcms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Blog｜ENKNOT",
  description: "AI・Web開発に関する記事",
};

export default async function BlogPage() {
  const { contents } = await getBlogList({ orders: "-publishedAt" });

  return (
    <main className="min-h-screen bg-paper">
      <Section>
        <p className="eyebrow mb-4">Blog</p>
        <h1 className="mb-16 font-display font-bold text-ink text-[clamp(28px,4vw,44px)] tracking-[-0.02em]">
          記事一覧
        </h1>

        {contents.length === 0 ? (
          <p className="font-body font-light text-subtle text-[15px]">まだ記事がありません。</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contents.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
              />
            ))}
          </div>
        )}
      </Section>
    </main>
  );
}
