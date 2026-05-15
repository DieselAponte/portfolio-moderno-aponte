"use client";

import { useCallback, useEffect, useState } from "react";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { getGuestbookClient } from "../services/guestbook.service";

export type AuthProvider = "github" | "google";

export const useGuestbookAuth = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		let client: ReturnType<typeof getGuestbookClient> | null = null;
		try {
			client = getGuestbookClient();
		} catch {
			setIsLoading(false);
			return;
		}
		let isMounted = true;

		const init = async () => {
			try {
				const { data } = await client.auth.getSession();
				if (!isMounted) {
					return;
				}
				setSession(data.session ?? null);
				setUser(data.session?.user ?? null);
				setIsLoading(false);
			} catch {
				if (!isMounted) {
					return;
				}
				setIsLoading(false);
			}
		};

		void init();

		const { data } = client.auth.onAuthStateChange(
			(_event: AuthChangeEvent, nextSession: Session | null) => {
				if (!isMounted) {
					return;
				}
				setSession(nextSession);
				setUser(nextSession?.user ?? null);
			},
		);

		return () => {
			isMounted = false;
			data.subscription.unsubscribe();
		};
	}, []);

	const signIn = useCallback(async (provider: AuthProvider) => {
		const client = getGuestbookClient();
		const redirectTo =
			typeof window !== "undefined" ? window.location.href : undefined;
		const { error } = await client.auth.signInWithOAuth({
			provider,
			options: redirectTo ? { redirectTo } : undefined,
		});
		if (error) {
			throw new Error(error.message);
		}
	}, []);

	const signOut = useCallback(async () => {
		const client = getGuestbookClient();
		const { error } = await client.auth.signOut();
		if (error) {
			throw new Error(error.message);
		}
	}, []);

	return {
		session,
		user,
		isLoading,
		isAuthenticated: Boolean(session),
		signIn,
		signOut,
	};
};
