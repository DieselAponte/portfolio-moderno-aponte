import type { Project } from "../types";

export type ProjectRecord = {
	id: string;
	title: string;
	description: string;
	date: string;
	tech_stack: string[];
	github_url: string;
	image_url: string;
};

export type ProjectsQuery = {
	limit?: number;
	offset?: number;
	techStack?: string[];
};

export type ProjectsRepository = {
	fetchProjects: (query?: ProjectsQuery) => Promise<ProjectRecord[]>;
};

export type ProjectsService = {
	getProjects: (query?: ProjectsQuery) => Promise<Project[]>;
};

type SupabaseConfig = {
	url?: string;
	anonKey?: string;
	table?: string;
};

const mapRecordToProject = (record: ProjectRecord): Project => ({
	id: record.id,
	title: record.title,
	description: record.description,
	date: record.date,
	tech_stack: record.tech_stack,
	github_url: record.github_url,
	image_url: record.image_url,
});

export const createProjectsService = (
	repository: ProjectsRepository,
): ProjectsService => ({
	async getProjects(query) {
		const records = await repository.fetchProjects(query);
		return records.map(mapRecordToProject);
	},
});

export const createSupabaseProjectsRepository = (
	config?: SupabaseConfig,
): ProjectsRepository => {
	return {
		async fetchProjects(query) {
			const url =
				config?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
			const anonKey =
				config?.anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
			const table = config?.table ?? "projects";

			if (!url || !anonKey) {
				throw new Error(
					"Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
				);
			}

			const limit = query?.limit ?? 4;
			const offset = query?.offset ?? 0;

			const params = new URLSearchParams();
			params.set(
				"select",
				"id,title,description,date,tech_stack,github_url,image_url",
			);
			params.set("order", "date.desc");
			params.set("limit", String(limit));
			params.set("offset", String(offset));

			if (query?.techStack && query.techStack.length > 0) {
				params.set(
					"tech_stack",
					`cs.{${query.techStack.join(",")}}`,
				);
			}

			const response = await fetch(
				`${url}/rest/v1/${table}?${params.toString()}`,
				{
					headers: {
						apikey: anonKey,
						Authorization: `Bearer ${anonKey}`,
					},
				},
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Supabase fetch failed: ${response.status} ${errorText}`,
				);
			}

			return (await response.json()) as ProjectRecord[];
		},
	};
};
