import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Returns a singleton Supabase client for server-side operations.
 * Uses SERVICE_ROLE_KEY if available, otherwise falls back to ANON_KEY.
 */
export const getSupabaseClient = (): SupabaseClient => {
    if (cachedClient) return cachedClient;

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    cachedClient = createClient(url, key);
    return cachedClient;
};
