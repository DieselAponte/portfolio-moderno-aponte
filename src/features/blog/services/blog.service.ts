import type { BlogArticle, BlogSortOrder } from "../types";

export type BlogArticleRecord = {
	id: string;
	date: string;
	title: string;
	description: string;
	thumbnail: string;
	tags: string[];
	content: string;
	is_featured: boolean;
};

export type BlogQuery = {
	tag?: string;
	order?: BlogSortOrder;
	query?: string;
	limit?: number;
	featuredOnly?: boolean;
};

export type BlogRepository = {
	fetchArticles: (query?: BlogQuery) => Promise<BlogArticleRecord[]>;
};

export type BlogService = {
	listArticles: (query?: BlogQuery) => Promise<BlogArticle[]>;
	listFeatured: (limit?: number) => Promise<BlogArticle[]>;
};

const mapRecordToArticle = (record: BlogArticleRecord): BlogArticle => ({
	id: record.id,
	date: record.date,
	title: record.title,
	description: record.description,
	thumbnail: record.thumbnail,
	tags: record.tags,
	content: record.content,
});

export const createBlogService = (repository: BlogRepository): BlogService => ({
	async listArticles(query) {
		const records = await repository.fetchArticles(query);
		return records.map(mapRecordToArticle);
	},
	async listFeatured(limit = 3) {
		const records = await repository.fetchArticles({
			featuredOnly: true,
			limit,
		});
		return records.map(mapRecordToArticle);
	},
});

export const createSupabaseBlogRepository = (_client: unknown): BlogRepository => {
	return {
		async fetchArticles() {
			throw new Error(
				"Supabase repository not configured. Provide a client and implementation.",
			);
		},
	};
};
