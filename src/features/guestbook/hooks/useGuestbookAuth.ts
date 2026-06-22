"use client";

import { useCallback } from "react";
import { authClient } from "../../../lib/auth-client";

export type AuthProvider = "github" | "google";

export const useGuestbookAuth = () => {
	const { data: sessionData, isPending: isLoading } = authClient.useSession();
	const session = sessionData?.session ?? null;
	const user = sessionData?.user ?? null;

	const signIn = useCallback(async (provider: AuthProvider) => {
		const { error } = await authClient.signIn.social({
			provider,
		});
		if (error) {
			throw new Error(error.message || "Failed to sign in");
		}
	}, []);

	const signOut = useCallback(async () => {
		const { error } = await authClient.signOut();
		if (error) {
			throw new Error(error.message || "Failed to sign out");
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
