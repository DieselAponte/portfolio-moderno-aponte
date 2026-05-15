"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GuestbookNote, GuestbookNoteInsert } from "../types";
import {
	createGuestbookService,
	type GuestbookService,
} from "../services/guestbook.service";

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

export const useGuestbook = ({
	limit = 12,
	fallbackNotes = [],
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

	const addNote = useCallback(async (note: GuestbookNoteInsert) => {
		setIsSubmitting(true);
		setError(null);
		try {
			const created = await getService().insertNote(note);
			setNotes((prev) => {
				if (prev.some((item) => item.id === created.id)) {
					return prev;
				}
				return [created, ...prev];
			});
			return created;
		} catch (submitError) {
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
			setError(resolveErrorMessage(subscribeError));
		}

		refresh();

		return () => {
			unsubscribe();
		};
	}, [refresh]);

	return {
		notes,
		isLoading,
		isSubmitting,
		error,
		refresh,
		addNote,
	};
};
