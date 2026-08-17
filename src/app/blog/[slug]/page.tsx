import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ArrowLeftIcon from "@/components/ui/ArrowLeftIcon";
import { getBlogDetail, getBlogList } from "@/lib/microcms";

export const revalidate = 300;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { contents } = await getBlogList({ fields: ["id"], limit: 100 });
  return contents.map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogDetail(slug);
  if (!post) return {};
  return {
    title: `${post.title}｜ENKNOT Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.eyecatch ? [post.eyecatch.url] : undefined,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogDetail(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-paper py-10 md:py-20">
      <Container narrow>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase mb-16"
        >
          <ArrowLeftIcon /> Back
        </Link>

        <p className="eyebrow mb-4">{formatDate(post.publishedAt)}</p>

        <h1 className="mb-16 font-display font-bold text-ink text-[clamp(28px,4.5vw,44px)] leading-tight tracking-[-0.02em]">
          {post.title}
        </h1>

        {post.eyecatch && (
          <div className="mb-16 rounded-base overflow-hidden">
            <Image
              src={post.eyecatch.url}
              alt={post.title}
              width={post.eyecatch.width}
              height={post.eyecatch.height}
              className="w-full"
            />
          </div>
        )}

        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </Container>
    </main>
  );
}
