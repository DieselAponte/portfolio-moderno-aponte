"use server";

import { getSupabaseClient } from "../../../lib/supabase";
import { redis } from "../../../lib/redis";
import type { HomeCaseOfStudy, HomeService } from "../types";
import { checkAdminAuth } from "../../../lib/admin-auth";

const CACHE_KEY_CASES = "home_cases_of_study";
const CACHE_KEY_SERVICES = "home_services";
const CACHE_TTL = 3600;

export const fetchCasesOfStudy = async (): Promise<HomeCaseOfStudy[]> => {
    const cached = await redis.get(CACHE_KEY_CASES);
    if (cached) return JSON.parse(cached);

    const client = getSupabaseClient();
    const { data, error } = await client.from("home_cases_of_study").select("*").order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching home cases of study:", error);
        return [];
    }

    await redis.setex(CACHE_KEY_CASES, CACHE_TTL, JSON.stringify(data));
    return data as HomeCaseOfStudy[];
};

export const fetchHomeServices = async (): Promise<HomeService[]> => {
    const cached = await redis.get(CACHE_KEY_SERVICES);
    if (cached) return JSON.parse(cached);

    const client = getSupabaseClient();
    const { data, error } = await client.from("home_services").select("*").order("order_index", { ascending: true });

    if (error) {
        console.error("Error fetching home services:", error);
        return [];
    }

    await redis.setex(CACHE_KEY_SERVICES, CACHE_TTL, JSON.stringify(data));
    return data as HomeService[];
};

const invalidateHomeCache = async () => {
    const keys = await redis.keys("home_*");
    if (keys.length > 0) {
        await redis.del(...keys);
    }
};

export const addCaseOfStudy = async (item: HomeCaseOfStudy) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("home_cases_of_study").insert(item);
    if (error) throw new Error(error.message);
    await invalidateHomeCache();
};

export const updateCaseOfStudy = async (id: string, updates: Partial<HomeCaseOfStudy>) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("home_cases_of_study").update(updates).eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateHomeCache();
};

export const deleteCaseOfStudy = async (id: string) => {
    await checkAdminAuth();
    const client = getSupabaseClient();
    const { error } = await client.from("home_cases_of_study").delete().eq("id", id);
    if (error) throw new Error(error.message);
    await invalidateHomeCache();
};
