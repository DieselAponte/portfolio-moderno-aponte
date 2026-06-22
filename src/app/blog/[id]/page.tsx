import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleById } from "../../../features/blog/services/blog.service";

const formatDate = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const article = await getArticleById((await params).id);
  if (!article) {
    return { title: "Article not found" };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const articleUrl = new URL(`/blog/${article.id}`, siteUrl).toString();
  const imageUrl = new URL(article.thumbnail, siteUrl).toString();

  return {
    title: `${article.title} | Aperture Archives`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      type: "article",
      images: [{ url: imageUrl, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [imageUrl],
    },
  };
};

export default async function BlogArticlePage({ params }: PageProps) {
  const article = await getArticleById((await params).id);
  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white">
      <section className="mx-auto w-full max-w-4xl px-6 pb-16 pt-20">
        <Link
          href="/blog"
          className="text-xs font-mono uppercase tracking-[0.3em] text-aperture-yellow"
        >
          Back to archive
        </Link>

        <div className="mt-6 space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-400">
            {formatDate(article.date)}
          </p>
          <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
            {article.title}
          </h1>
          <p className="text-lg text-zinc-300">{article.description}</p>
        </div>

        <div className="relative mt-10 h-72 w-full overflow-hidden rounded-3xl border border-aperture-gray/60">
          <Image
            src={article.thumbnail}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

        <div className="mt-10 space-y-6 text-base leading-7 text-zinc-200">
          <p>{article.content}</p>
          <p>
            This article is part of the Aperture Archive series, cataloging the
            experiments, failures, and lessons that shape my work.
          </p>
        </div>
      </section>
    </main>
  );
}
