"use server";

import { createClient } from "@supabase/supabase-js";
import { redis } from "../../../lib/redis";
import type { Project } from "../types";
import { auth } from "../../../lib/auth";
import { headers } from "next/headers";

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

const CACHE_KEY_PREFIX = "projects:";
const CACHE_TTL = 3600;

const getSupabaseClient = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
	return createClient(url, key);
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

export const fetchProjects = async (query?: ProjectsQuery): Promise<Project[]> => {
	const cacheKey = `${CACHE_KEY_PREFIX}${JSON.stringify(query || {})}`;
	const cached = await redis.get(cacheKey);

	if (cached) {
		return JSON.parse(cached);
	}

	const client = getSupabaseClient();
	let supabaseQuery = client.from("projects").select("*").order("date", { ascending: false });

	if (query?.limit) {
		supabaseQuery = supabaseQuery.limit(query.limit);
	}
	if (query?.offset) {
        // approximate offset with range for simpler pagination
		supabaseQuery = supabaseQuery.range(query.offset, query.offset + (query.limit || 4) - 1);
	}
	if (query?.techStack && query.techStack.length > 0) {
		supabaseQuery = supabaseQuery.contains("tech_stack", query.techStack);
	}

	const { data, error } = await supabaseQuery;

	if (error) {
		console.error("Error fetching projects:", error);
		return [];
	}

	const projects = (data as ProjectRecord[]).map(mapRecordToProject);

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(projects));

	return projects;
};

const invalidateProjectsCache = async () => {
    const keys = await redis.keys(`${CACHE_KEY_PREFIX}*`);
    if (keys.length > 0) {
        await redis.del(...keys);
    }
};

const checkAdminAuth = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }
};

export const addProject = async (project: ProjectRecord) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("projects").insert(project);
    if (error) throw new Error(error.message);
    await invalidateProjectsCache();
};

export const updateProject = async (id: string, updates: Partial<ProjectRecord>) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("projects").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateProjectsCache();
};

export const deleteProject = async (id: string) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("projects").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateProjectsCache();
};
