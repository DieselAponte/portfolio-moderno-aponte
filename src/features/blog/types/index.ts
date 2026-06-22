export type BlogArticle = {
	id: string;
	date: string;
	title: string;
	description: string;
	thumbnail: string;
	tags: string[];
	content: string;
	is_featured?: boolean;
};

export type BlogSortOrder = "newest" | "oldest" | "az";
