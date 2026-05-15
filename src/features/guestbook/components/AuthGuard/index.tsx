"use client";

import { useState, type ReactNode } from "react";
import { GitBranch, Globe, LogOut } from "lucide-react";
import { useGuestbookAuth } from "../../hooks/useGuestbookAuth";

type AuthGuardProps = {
	children: ReactNode;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
	const { isAuthenticated, isLoading, signIn, signOut, user } =
		useGuestbookAuth();
	const [authError, setAuthError] = useState<string | null>(null);

	if (isLoading) {
		return (
			<div className="rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 px-4 py-3 text-xs text-zinc-400">
				Authenticating...
			</div>
		);
	}

	if (!isAuthenticated) {
		return (
			<div className="rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 px-5 py-4">
				<p className="text-xs font-mono uppercase tracking-[0.3em] text-aperture-orange">
					Authorization required
				</p>
				<p className="mt-2 text-sm text-zinc-300">
					Sign in to submit a classified note.
				</p>
				<div className="mt-4 flex flex-wrap gap-2">
					<button
						type="button"
						onClick={() =>
							void signIn("github").catch((error) =>
								setAuthError(error instanceof Error ? error.message : "Sign in failed."),
							)
						}
						className="inline-flex items-center gap-2 rounded-full border border-aperture-gray/70 bg-black/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-200 transition hover:border-aperture-orange hover:text-aperture-orange"
					>
						<GitBranch className="h-4 w-4" />
						GitHub
					</button>
					<button
						type="button"
						onClick={() =>
							void signIn("google").catch((error) =>
								setAuthError(error instanceof Error ? error.message : "Sign in failed."),
							)
						}
						className="inline-flex items-center gap-2 rounded-full border border-aperture-gray/70 bg-black/40 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-200 transition hover:border-aperture-orange hover:text-aperture-orange"
					>
						<Globe className="h-4 w-4" />
						Google
					</button>
					</div>
					{authError ? (
						<p className="mt-3 text-xs text-aperture-orange">{authError}</p>
					) : null}
			</div>
		);
	}

	return (
		<div className="flex flex-wrap items-center gap-3">
			{children}
			<div className="flex items-center gap-2 rounded-full border border-aperture-gray/70 bg-black/40 px-3 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">
				<span>{user?.user_metadata?.full_name ?? user?.email ?? "Active"}</span>
				<button
					type="button"
					onClick={() => void signOut()}
					className="flex h-6 w-6 items-center justify-center rounded-full border border-aperture-gray/70 text-zinc-400 transition hover:border-aperture-orange hover:text-aperture-orange"
					aria-label="Sign out"
				>
					<LogOut className="h-3.5 w-3.5" />
				</button>
			</div>
		</div>
	);
};
