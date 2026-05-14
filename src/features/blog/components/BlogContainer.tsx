"use client";

import { useMemo } from "react";
import { Footer } from "../../home/components/Footer";
import { mockBlogArticles, mockFeaturedIds } from "../data/mockArticles";
import { useBlogFilters } from "../hooks/useBlogFilters";
import type { BlogArticle } from "../types";
import { FilterNavigation } from "./FilterNavigation";
import { HeaderTitle } from "./HeaderTitle";
import { ListArticles } from "./ListArticles";
import { TopArticles } from "./TopArticles";

type BlogContainerProps = {
	articles?: BlogArticle[];
	featuredArticles?: BlogArticle[];
};
const fallbackTags = ["all", "tech", "college", "work", "life"];

export default function BlogContainer({
	articles = [],
	featuredArticles = [],
}: BlogContainerProps) {
	const usingMockData = articles.length === 0;
	const baseArticles = usingMockData ? mockBlogArticles : articles;

	const resolvedFeatured = useMemo(() => {
		if (featuredArticles.length > 0) {
			return featuredArticles;
		}

		if (usingMockData) {
			return baseArticles
				.filter((article) => mockFeaturedIds.includes(article.id))
				.slice(0, 3);
		}

		return baseArticles.slice(0, 3);
	}, [baseArticles, featuredArticles, usingMockData]);

	const listSource = useMemo(() => {
		if (resolvedFeatured.length === 0) {
			return baseArticles;
		}

		const featuredIds = new Set(resolvedFeatured.map((item) => item.id));
		return baseArticles.filter((item) => !featuredIds.has(item.id));
	}, [baseArticles, resolvedFeatured]);

	const {
		filters,
		availableTags,
		filteredArticles,
		setOrder,
		setQuery,
		setTag,
		resetFilters,
	} = useBlogFilters({ articles: listSource });

	const tagOptions =
		availableTags.length > 0 ? ["all", ...availableTags] : fallbackTags;

	return (
		<div className="min-h-screen bg-[#0a0a0c] text-white">
			<div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-20">
				<HeaderTitle />

				<div className="mt-10">
					<FilterNavigation
						tags={tagOptions}
						filters={filters}
						onTagChange={setTag}
						onOrderChange={setOrder}
						onQueryChange={setQuery}
						onReset={resetFilters}
					/>
				</div>

				<div className="mt-12">
					<TopArticles articles={resolvedFeatured} />
				</div>

				<div className="mt-12">
					<ListArticles articles={filteredArticles} />
				</div>
			</div>

			<Footer />
		</div>
	);
}
