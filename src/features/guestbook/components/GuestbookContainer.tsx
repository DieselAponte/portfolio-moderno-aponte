"use client";

import { useMemo, useState } from "react";
import { Footer } from "../../home/components/Footer";
import { useGuestbook } from "../hooks/useGuestbook";
import { useGuestbookAuth } from "../hooks/useGuestbookAuth";
import type { GuestbookNoteInsert } from "../types";
import { AuthGuard } from "./AuthGuard";
import { BodyNotes } from "./BodyNotes";
import { HeaderTitle } from "./HeaderTitle";
import { PopupCreateNote } from "./PopupCreateNote";

export default function GuestbookContainer() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { user } = useGuestbookAuth();
	const { notes, isLoading, isSubmitting, error, addNote } = useGuestbook({
		limit: 12,
	});

	const statusMessage = useMemo(() => {
		if (!error) {
			return null;
		}
		return (
			<div className="rounded-2xl border border-aperture-orange/40 bg-[#1a120c]/60 px-4 py-3 text-xs text-aperture-orange">
				Live feed offline. Showing cached notes.
			</div>
		);
	}, [error]);

	const handleSubmit = async (note: GuestbookNoteInsert) => {
		await addNote(note);
		setIsDialogOpen(false);
	};

	return (
		<main className="relative w-full overflow-hidden bg-[#0a0a0c] text-white">
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(86,204,242,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(86,204,242,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.18),transparent_60%)]" />
			<section className="relative min-h-screen px-6 pb-20 pt-24">
				<div className="mx-auto w-full max-w-6xl space-y-12">
					<HeaderTitle />

					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="text-xs font-mono uppercase tracking-[0.35em] text-zinc-400">
							Compliance log active
						</div>
						<AuthGuard>
							<button
								type="button"
								onClick={() => setIsDialogOpen(true)}
								className="inline-flex items-center gap-2 rounded-full border border-aperture-orange/70 bg-black/40 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.35em] text-aperture-orange transition hover:bg-aperture-orange hover:text-black"
							>
								Create Note
								<span className="text-xs">-&gt;</span>
							</button>
						</AuthGuard>
					</div>

					{!user && !isLoading && (
						<div className="rounded-2xl border border-white/10 bg-aperture-dark/40 px-4 py-3 text-xs text-zinc-400 text-center flex items-center justify-center gap-2">
							You need to be authenticated to write a guestbook note. Please log in through the prompt above.
						</div>
					)}

					{statusMessage}
					<BodyNotes notes={notes} isLoading={isLoading} />
				</div>
			</section>
			<PopupCreateNote
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				initialName={
					typeof user?.name === "string"
						? user.name
						: user?.email ?? ""
				}
				initialEmail={user?.email ?? ""}
			/>
			<Footer />
		</main>
	);
}
