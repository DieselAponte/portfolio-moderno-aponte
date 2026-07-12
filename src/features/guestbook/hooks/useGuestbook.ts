"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GuestbookNote, GuestbookNoteInsert } from "../types";
import {
	createGuestbookService,
	type GuestbookService,
} from "../services/guestbook.service";
import { createGuestbookNoteAction } from "../../../app/actions/guestbook";
import { useAuth } from "../../../components/providers/AuthProvider";

type UseGuestbookOptions = {
	limit?: number;
	fallbackNotes?: GuestbookNote[];
};

const resolveErrorMessage = (error: unknown) => {
	if (error instanceof Error) {
		return error.message;
	}
	return "Unexpected guestbook error.";
};

const DEFAULT_FALLBACK_NOTES: GuestbookNote[] = [];

export const useGuestbook = ({
	limit = 12,
	fallbackNotes = DEFAULT_FALLBACK_NOTES,
}: UseGuestbookOptions = {}) => {
	const serviceRef = useRef<GuestbookService | null>(null);
	const [notes, setNotes] = useState<GuestbookNote[]>(fallbackNotes);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getService = () => {
		if (!serviceRef.current) {
			serviceRef.current = createGuestbookService();
		}
		return serviceRef.current;
	};

	const refresh = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const data = await getService().getNotes(limit);
			setNotes(data);
		} catch (fetchError) {
			setError(resolveErrorMessage(fetchError));
			if (fallbackNotes.length > 0) {
				setNotes(fallbackNotes);
			}
		} finally {
			setIsLoading(false);
		}
	}, [fallbackNotes, limit]);

	const { user } = useAuth();

	const addNote = useCallback(async (note: GuestbookNoteInsert) => {
		setIsSubmitting(true);
		setError(null);

		const optimisticNote: GuestbookNote = {
			id: `optimistic-${Date.now()}`,
			...note,
			author: user?.name || note.author,
			email: user?.email || note.email || null,
			avatar_url: user?.image || note.avatar_url || null,
			site_url: note.site_url || null,
			github_url: note.github_url || null,
			user_id: user?.id || note.user_id || null,
			created_at: new Date().toISOString(),
		};

		setNotes((prev) => [optimisticNote, ...prev]);

		try {
			// We can omit user_id from client payload as it's handled on the server
			const created = await createGuestbookNoteAction({
				message: note.message,
				site_url: note.site_url ?? null,
				github_url: note.github_url ?? null,
			});
			setNotes((prev) =>
				prev.map((item) => (item.id === optimisticNote.id ? created : item))
			);
			return created;
		} catch (submitError) {
			setNotes((prev) => prev.filter((item) => item.id !== optimisticNote.id));
			setError(resolveErrorMessage(submitError));
			throw submitError;
		} finally {
			setIsSubmitting(false);
		}
	}, []);

	useEffect(() => {
		let unsubscribe: () => void = () => {};

		try {
			unsubscribe = getService().subscribeToNotes((note) => {
				setNotes((prev) => {
					if (prev.some((item) => item.id === note.id)) {
						return prev;
					}
					return [note, ...prev];
				});
			});
		} catch (subscribeError) {
			console.error("Failed to subscribe to guestbook notes", subscribeError);
		}

		// Use a local async function instead of calling refresh which updates state synchronously
		const loadInitialData = async () => {
			try {
				const data = await getService().getNotes(limit);
				setNotes(data);
			} catch (fetchError) {
				setError(resolveErrorMessage(fetchError));
				if (fallbackNotes.length > 0) {
					setNotes(fallbackNotes);
				}
			} finally {
				setIsLoading(false);
			}
		};

		void loadInitialData();

		return () => {
			unsubscribe();
		};
	}, [fallbackNotes, limit]);

	return {
		notes,
		isLoading,
		isSubmitting,
		error,
		refresh,
		addNote,
	};
};
