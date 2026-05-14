"use client";

import clsx from "clsx";
import { Search } from "lucide-react";
import type { BlogFilterState } from "../../hooks/useBlogFilters";
import type { BlogSortOrder } from "../../types";

type FilterNavigationProps = {
	tags: string[];
	filters: BlogFilterState;
	onTagChange: (tag: string) => void;
	onOrderChange: (order: BlogSortOrder) => void;
	onQueryChange: (query: string) => void;
	onReset?: () => void;
};

const sortOptions: Array<{ value: BlogSortOrder; label: string }> = [
	{ value: "newest", label: "Newest" },
	{ value: "oldest", label: "Oldest" },
	{ value: "az", label: "A-Z" },
];

const formatTagLabel = (tag: string) => {
	if (tag === "all") {
		return "All Posts";
	}

	return tag
		.split("-")
		.map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
		.join(" ");
};

export const FilterNavigation = ({
	tags,
	filters,
	onTagChange,
	onOrderChange,
	onQueryChange,
	onReset,
}: FilterNavigationProps) => {
	const hasActiveFilters =
		filters.tag !== "all" || filters.order !== "newest" || filters.query !== "";

	return (
		<div className="glass-panel flex flex-col gap-3 rounded-2xl px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
			<div className="flex flex-wrap items-center gap-2">
				{tags.map((tag) => {
					const isActive = filters.tag === tag;
					return (
						<button
							key={tag}
							type="button"
							onClick={() => onTagChange(tag)}
							aria-pressed={isActive}
							className={clsx(
								"rounded-full border px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.3em] transition",
								isActive
									? "border-aperture-yellow bg-aperture-yellow/15 text-aperture-yellow"
									: "border-aperture-gray/70 text-zinc-300 hover:border-aperture-yellow/60 hover:text-aperture-yellow",
							)}
						>
							{formatTagLabel(tag)}
						</button>
					);
				})}

				{sortOptions.map((option) => {
					const isActive = filters.order === option.value;
					return (
						<button
							key={option.value}
							type="button"
							onClick={() => onOrderChange(option.value)}
							aria-pressed={isActive}
							className={clsx(
								"rounded-full border px-4 py-1.5 text-[11px] font-mono uppercase tracking-[0.25em] transition",
								isActive
									? "border-white/70 bg-white/10 text-white"
									: "border-aperture-gray/70 text-zinc-300 hover:border-white/60 hover:text-white",
							)}
						>
							{option.label}
						</button>
					);
				})}

				{onReset ? (
					<button
						type="button"
						onClick={onReset}
						disabled={!hasActiveFilters}
						className={clsx(
							"rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-[0.25em] transition",
							hasActiveFilters
								? "border-aperture-blue text-aperture-blue hover:bg-aperture-blue/10"
								: "cursor-not-allowed border-aperture-gray/40 text-zinc-500",
						)}
					>
						Reset
					</button>
				) : null}
			</div>

			<div className="relative w-full">
				<Search
					className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
					aria-hidden="true"
				/>
				<input
					value={filters.query}
					onChange={(event) => onQueryChange(event.target.value)}
					placeholder="Search posts"
					className="w-full rounded-full border border-aperture-gray/70 bg-[#0f1116] py-2 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-aperture-yellow focus:outline-none focus:ring-2 focus:ring-aperture-yellow/30"
				/>
			</div>
		</div>
	);
};
