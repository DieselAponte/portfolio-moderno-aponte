import {
	createClient,
	type RealtimePostgresInsertPayload,
	type SupabaseClient,
} from "@supabase/supabase-js";
import type {
	GuestbookDatabase,
	GuestbookNote,
} from "../types";

type SupabaseConfig = {
	url?: string;
	anonKey?: string;
	table?: string;
};

const DEFAULT_TABLE = "guestbook_notes";

let cachedClient: SupabaseClient<GuestbookDatabase> | null = null;

export const getGuestbookClient = (
	config?: SupabaseConfig,
): SupabaseClient<GuestbookDatabase> => {
	if (cachedClient) {
		return cachedClient;
	}

	const url = config?.url ?? process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
	const anonKey =
		config?.anonKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

	if (!url || !anonKey) {
		throw new Error(
			"Supabase not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
		);
	}

	cachedClient = createClient<GuestbookDatabase>(url, anonKey, {
		auth: {
			persistSession: true,
		},
	});

	return cachedClient;
};

export type GuestbookService = {
	getNotes: (limit?: number) => Promise<GuestbookNote[]>;
	subscribeToNotes: (onInsert: (note: GuestbookNote) => void) => () => void;
};

const sanitizeValue = (value?: string | null) => {
	const trimmed = value?.trim();
	return trimmed ? trimmed : null;
};

export const createGuestbookService = (
	config?: SupabaseConfig,
): GuestbookService => {
	const client = getGuestbookClient(config);
	const table = config?.table ?? DEFAULT_TABLE;

	return {
		async getNotes(limit = 12) {
			const { data, error } = await client
				.from(table)
				.select(
					"id,author,message,email,site_url,github_url,avatar_url,created_at,user_id",
				)
				.order("created_at", { ascending: false })
				.limit(limit);

			if (error) {
				throw new Error(`Supabase getNotes failed: ${error.message}`);
			}

			return data ?? [];
		},
		subscribeToNotes(onInsert) {
			const channel = client
				.channel("guestbook-notes")
				.on(
					"postgres_changes",
					{
						event: "INSERT",
						schema: "public",
						table,
					},
					(payload: RealtimePostgresInsertPayload<GuestbookNote>) => {
						onInsert(payload.new);
					},
				)
				.subscribe();

			return () => {
				channel.unsubscribe();
			};
		},
	};
};
