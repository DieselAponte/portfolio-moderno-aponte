"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { GuestbookNote } from "../../types";
import { NoteCard } from "../NoteCard";

type BodyNotesProps = {
	notes: GuestbookNote[];
	isLoading: boolean;
};

const SkeletonCard = ({ index }: { index: number }) => (
	<div
		className="animate-pulse rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 p-4"
		style={{ animationDelay: `${index * 0.15}s` }}
	>
		<div className="flex items-center gap-3">
			<div className="h-10 w-10 rounded-full bg-aperture-gray/60" />
			<div className="space-y-2">
				<div className="h-3 w-28 rounded-full bg-aperture-gray/50" />
				<div className="h-2 w-20 rounded-full bg-aperture-gray/40" />
			</div>
		</div>
		<div className="mt-4 space-y-2">
			<div className="h-3 w-full rounded-full bg-aperture-gray/50" />
			<div className="h-3 w-5/6 rounded-full bg-aperture-gray/40" />
			<div className="h-3 w-2/3 rounded-full bg-aperture-gray/30" />
		</div>
		<div className="mt-5 h-8 rounded-full bg-aperture-gray/40" />
	</div>
);

export const BodyNotes = ({ notes, isLoading }: BodyNotesProps) => {
	if (isLoading) {
		return (
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
				{Array.from({ length: 4 }).map((_, index) => (
					<SkeletonCard key={`skeleton-${index}`} index={index} />
				))}
			</div>
		);
	}

	if (notes.length === 0) {
		return (
			<div className="rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 px-6 py-10 text-center">
				<p className="text-sm text-zinc-400">
					No feedback recorded yet.
				</p>
			</div>
		);
	}

	return (
		<motion.div
			layout
			className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
		>
			<AnimatePresence mode="popLayout">
				{notes.map((note, index) => (
					<NoteCard key={note.id} note={note} index={index} />
				))}
			</AnimatePresence>
		</motion.div>
	);
};
