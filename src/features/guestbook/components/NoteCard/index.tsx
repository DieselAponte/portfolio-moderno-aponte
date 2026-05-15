"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GitBranch, Link as LinkIcon, Mail } from "lucide-react";
import type { GuestbookNote } from "../../types";

type NoteCardProps = {
	note: GuestbookNote;
	index: number;
};

const formatDate = (value: string) => {
	const parsed = new Date(value);
	if (Number.isNaN(parsed.getTime())) {
		return value;
	}
	return parsed.toLocaleDateString("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});
};

export const NoteCard = ({ note, index }: NoteCardProps) => {
	const contacts = [
		note.email
			? {
				id: "email",
				label: note.email,
				url: `mailto:${note.email}`,
				icon: Mail,
			}
			: null,
		note.site_url
			? {
				id: "site",
				label: note.site_url.replace(/^https?:\/\//, ""),
				url: note.site_url,
				icon: LinkIcon,
			}
			: null,
		note.github_url
			? {
				id: "github",
				label: "Repo",
				url: note.github_url,
				icon: GitBranch,
			}
			: null,
	].filter(
		(item): item is {
			id: string;
			label: string;
			url: string;
			icon: typeof Mail;
		} => Boolean(item),
	);

	return (
		<motion.article
			layout
			initial={{ opacity: 0, y: 12 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.2) }}
			className="group relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 p-4 text-white"
		>
			<motion.div
				className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-aperture-orange to-transparent"
				initial={{ opacity: 0, y: -8 }}
				animate={{ opacity: [0, 1, 0], y: [0, 40, 120] }}
				transition={{ duration: 0.6 }}
			/>
			<div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
				<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-aperture-orange to-transparent" />
			</div>
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className="relative h-10 w-10 overflow-hidden rounded-full border border-aperture-gray/70 bg-black/60">
						{note.avatar_url ? (
							<Image
								src={note.avatar_url}
								alt={note.author}
								fill
								sizes="40px"
								className="object-cover"
							/>
						) : (
							<div className="flex h-full w-full items-center justify-center text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
								{note.author.slice(0, 2)}
							</div>
						)}
					</div>
					<div>
						<p className="text-xs font-mono uppercase tracking-[0.3em] text-aperture-blue">
							{note.author}
						</p>
						<p className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
							{formatDate(note.created_at)}
						</p>
					</div>
				</div>
			</div>

			<div className="mt-4 flex-1 overflow-hidden">
				<div className="h-full max-h-40 overflow-y-auto pr-2 text-sm leading-6 text-zinc-300 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
					{note.message}
				</div>
			</div>

			<div className="mt-4 border-t border-aperture-gray/70 pt-3">
				{contacts.length > 0 ? (
					<div className="flex flex-col gap-2 text-xs text-zinc-400">
						{contacts.map((contact) => (
							<Link
								key={contact.id}
								href={contact.url}
								target="_blank"
								rel="noreferrer"
								className="flex items-center gap-2 font-mono uppercase tracking-[0.3em] transition hover:text-aperture-orange"
							>
								<contact.icon className="h-3.5 w-3.5" />
								<span className="truncate">{contact.label}</span>
							</Link>
						))}
					</div>
				) : (
					<p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
						No contact provided
					</p>
				)}
			</div>
		</motion.article>
	);
};
