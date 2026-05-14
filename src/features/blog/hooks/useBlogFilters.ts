"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { BlogArticle, BlogSortOrder } from "../types";

export type BlogFilterState = {
	tag: string;
	order: BlogSortOrder;
	query: string;
};

const ORDER_VALUES: BlogSortOrder[] = ["newest", "oldest", "az"];

const DEFAULT_FILTERS: BlogFilterState = {
	tag: "all",
	order: "newest",
	query: "",
};

const normalize = (value: string) => value.trim().toLowerCase();

const parseOrder = (value: string | null): BlogSortOrder => {
	if (value && ORDER_VALUES.includes(value as BlogSortOrder)) {
		return value as BlogSortOrder;
	}
	return DEFAULT_FILTERS.order;
};

const buildSearchText = (article: BlogArticle) =>
	normalize(
		[article.title, article.description, article.content, ...article.tags].join(
			" ",
		),
	);

export const useBlogFilters = ({ articles }: { articles: BlogArticle[] }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const filters = useMemo<BlogFilterState>(() => {
		const tag = searchParams.get("tag") ?? DEFAULT_FILTERS.tag;
		const order = parseOrder(searchParams.get("order"));
		const query = searchParams.get("q") ?? DEFAULT_FILTERS.query;

		return { tag, order, query };
	}, [searchParams]);

	const availableTags = useMemo(() => {
		const tags = new Set<string>();
		articles.forEach((article) => {
			article.tags.forEach((tag) => tags.add(normalize(tag)));
		});
		return Array.from(tags);
	}, [articles]);

	const filteredArticles = useMemo(() => {
		const activeTag = normalize(filters.tag);
		const query = normalize(filters.query);

		const filtered = articles.filter((article) => {
			const matchesTag =
				activeTag === "all" ||
				article.tags.some((tag) => normalize(tag) === activeTag);

			if (!matchesTag) {
				return false;
			}

			if (!query) {
				return true;
			}

			return buildSearchText(article).includes(query);
		});

		const sorted = [...filtered];
		if (filters.order === "az") {
			sorted.sort((a, b) => a.title.localeCompare(b.title));
			return sorted;
		}

		sorted.sort((a, b) => {
			const aTime = Date.parse(a.date);
			const bTime = Date.parse(b.date);
			return filters.order === "newest" ? bTime - aTime : aTime - bTime;
		});

		return sorted;
	}, [articles, filters]);

	const updateParams = useCallback(
		(next: Partial<BlogFilterState>) => {
			const params = new URLSearchParams(searchParams.toString());

			const nextTag = next.tag ?? params.get("tag") ?? DEFAULT_FILTERS.tag;
			const nextOrder =
				next.order ?? parseOrder(params.get("order")) ?? DEFAULT_FILTERS.order;
			const nextQuery = next.query ?? params.get("q") ?? DEFAULT_FILTERS.query;

			if (nextTag === DEFAULT_FILTERS.tag) {
				params.delete("tag");
			} else {
				params.set("tag", nextTag);
			}

			if (nextOrder === DEFAULT_FILTERS.order) {
				params.delete("order");
			} else {
				params.set("order", nextOrder);
			}

			if (!nextQuery || nextQuery === DEFAULT_FILTERS.query) {
				params.delete("q");
			} else {
				params.set("q", nextQuery);
			}

			const queryString = params.toString();
			router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
				scroll: false,
			});
		},
		[pathname, router, searchParams],
	);

	const setTag = useCallback(
		(tag: string) => updateParams({ tag }),
		[updateParams],
	);

	const setOrder = useCallback(
		(order: BlogSortOrder) => updateParams({ order }),
		[updateParams],
	);

	const setQuery = useCallback(
		(query: string) => updateParams({ query }),
		[updateParams],
	);

	const resetFilters = useCallback(
		() => updateParams(DEFAULT_FILTERS),
		[updateParams],
	);

	return {
		filters,
		availableTags,
		filteredArticles,
		setTag,
		setOrder,
		setQuery,
		resetFilters,
	};
};
