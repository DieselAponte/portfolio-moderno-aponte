"use server";

import { getSupabaseClient } from "../../../lib/supabase";
import { redis } from "../../../lib/redis";
import type { TechBubble, ExperienceSlide, TrajectorySectionData } from "../types";
import { checkAdminAuth } from "../../../lib/admin-auth";

const CACHE_KEY_MODULES = "experience_modules";
const CACHE_KEY_SLIDES = "experience_slides";
const CACHE_KEY_BUBBLES = "tech_bubbles";
const CACHE_TTL = 3600;

export const fetchModules = async (): Promise<TrajectorySectionData[]> => {
    const cached = await redis.get(CACHE_KEY_MODULES);
    if (cached) return JSON.parse(cached);

    const client = getSupabaseClient();
    const { data, error } = await client.from("experience_modules").select("*").order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching experience modules:", error);
        return [];
    }

    await redis.setex(CACHE_KEY_MODULES, CACHE_TTL, JSON.stringify(data));
    return data as TrajectorySectionData[];
};

export const fetchSlides = async (moduleId?: string): Promise<ExperienceSlide[]> => {
    const cacheKey = `${CACHE_KEY_SLIDES}${moduleId ? `_${moduleId}` : ''}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const client = getSupabaseClient();
    let query = client.from("experience_slides").select("*").order("order_index", { ascending: true });
    if (moduleId) {
        query = query.eq("module_id", moduleId);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching experience slides:", error);
        return [];
    }

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(data));
    return data as ExperienceSlide[];
};

export const fetchTechBubbles = async (moduleId?: string): Promise<TechBubble[]> => {
    const cacheKey = `${CACHE_KEY_BUBBLES}${moduleId ? `_${moduleId}` : ''}`;
    const cached = await redis.get(cacheKey);
    if (cached) return JSON.parse(cached);

    const client = getSupabaseClient();
    let query = client.from("tech_bubbles").select("*");
    if (moduleId) {
        query = query.eq("module_id", moduleId);
    }

    const { data, error } = await query;
    if (error) {
        console.error("Error fetching tech bubbles:", error);
        return [];
    }

    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(data));
    return data as TechBubble[];
};

const invalidateExperienceCache = async () => {
    const keys = await redis.keys("experience_*");
    const techKeys = await redis.keys("tech_bubbles*");
    const allKeys = [...keys, ...techKeys];
    if (allKeys.length > 0) {
        await redis.del(...allKeys);
    }
};

// Simplified admin actions for Experience
export const addModule = async (module: TrajectorySectionData) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("experience_modules").insert(module);
    if (error) throw new Error(error.message);
    await invalidateExperienceCache();
};

export const updateModule = async (id: string, updates: Partial<TrajectorySectionData>) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("experience_modules").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateExperienceCache();
};

export const deleteModule = async (id: string) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("experience_modules").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateExperienceCache();
};
