"use client";

import { useMemo, useState } from "react";
import { Footer } from "../../home/components/Footer";
import { useGuestbook } from "../hooks/useGuestbook";
import { useGuestbookAuth } from "../hooks/useGuestbookAuth";
import type { GuestbookNote, GuestbookNoteInsert } from "../types";
import { AuthGuard } from "./AuthGuard";
import { BodyNotes } from "./BodyNotes";
import { HeaderTitle } from "./HeaderTitle";
import { PopupCreateNote } from "./PopupCreateNote";

const fallbackNotes: GuestbookNote[] = [
	{
		id: "01",
		author: "Test Subject 212",
		message: "Diagnostics cleared. Interface responsiveness: optimal.",
		email: "subject212@aperture.lab",
		site_url: null,
		github_url: "https://github.com/",
		avatar_url: null,
		created_at: "2025-12-21",
		user_id: null,
	},
	{
		id: "02",
		author: "Lab Observer",
		message: "The system narrative feels stable. Continue iteration.",
		email: null,
		site_url: "https://aperture.lab",
		github_url: null,
		avatar_url: null,
		created_at: "2025-12-20",
		user_id: null,
	},
	{
		id: "03",
		author: "Compliance Lead",
		message:
			"Note cadence acceptable. Deployment readiness remains within limits.",
		email: "compliance@aperture.lab",
		site_url: null,
		github_url: null,
		avatar_url: null,
		created_at: "2025-12-18",
		user_id: null,
	},
	{
		id: "04",
		author: "Field Operator",
		message:
			"Telemetry overlay reads clean. Keep the orange highlights on focus.",
		email: null,
		site_url: "https://operator.notes",
		github_url: "https://github.com/",
		avatar_url: null,
		created_at: "2025-12-16",
		user_id: null,
	},
];

export default function GuestbookContainer() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const { user } = useGuestbookAuth();
	const { notes, isLoading, isSubmitting, error, addNote } = useGuestbook({
		limit: 12,
		fallbackNotes,
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
					typeof user?.user_metadata?.full_name === "string"
						? user.user_metadata.full_name
						: user?.email ?? ""
				}
				initialEmail={user?.email ?? ""}
			/>
			<Footer />
		</main>
	);
}
