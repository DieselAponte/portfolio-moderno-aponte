import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogArticle } from "../../types";

type ArticleCardProps = {
	article: BlogArticle;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
	return (
		<article className="group flex h-full flex-col rounded-2xl border border-aperture-gray/60 bg-[#111218]/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
			<div className="relative h-44 w-full overflow-hidden rounded-2xl border border-aperture-gray/60">
				<Image
					src={article.thumbnail}
					alt={article.title}
					fill
					sizes="(max-width: 768px) 100vw, 33vw"
					className="object-cover transition duration-500 group-hover:scale-105"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
			</div>

			<div className="mt-4 flex flex-1 flex-col gap-3">
				<h4 className="text-lg font-semibold text-white">{article.title}</h4>
				<p className="text-sm leading-6 text-zinc-300">
					{article.description}
				</p>
			</div>

			<Link
				href={`/blog/${article.id}`}
				className="mt-5 inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-white"
			>
				<span>Read article</span>
				<span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-aperture-gray/70 bg-black/40 text-white transition group-hover:border-aperture-yellow group-hover:text-aperture-yellow">
					<ArrowRight className="h-4 w-4" />
				</span>
			</Link>
		</article>
	);
};
