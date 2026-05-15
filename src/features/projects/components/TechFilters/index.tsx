"use client";

import { useState } from "react";
import type { ProjectFilter } from "../../types";

type FilterOption = {
	id: ProjectFilter;
	label: string;
	description: string;
};

const FILTER_OPTIONS: FilterOption[] = [
	{
		id: "frontend",
		label: "Frontend",
		description: "UI systems, motion, and client orchestration",
	},
	{
		id: "backend",
		label: "Backend",
		description: "APIs, data, and application logic",
	},
	{
		id: "infrastructure",
		label: "Infrastructure",
		description: "Deployments, pipelines, and reliability",
	},
	{
		id: "mobile",
		label: "Mobile",
		description: "Handheld experiences and native delivery",
	},
];

type TechFiltersProps = {
	activeFilters: ProjectFilter[];
	onToggle: (filter: ProjectFilter) => void;
	onClear: () => void;
};

export const TechFilters = ({
	activeFilters,
	onToggle,
	onClear,
}: TechFiltersProps) => {
	const hasActive = activeFilters.length > 0;
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="space-y-4 lg:sticky lg:top-24">
			<div className="flex items-center justify-between lg:hidden">
				<div>
					<p className="text-xs font-mono uppercase tracking-[0.4em] text-aperture-blue">
						Control Panel
					</p>
					<h2 className="text-lg font-semibold text-white">Tech Filters</h2>
				</div>
				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={() => setIsOpen((prev) => !prev)}
						className="rounded-full border border-aperture-gray/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-300 transition hover:border-aperture-yellow hover:text-aperture-yellow"
					>
						{isOpen ? "Hide" : "Show"}
					</button>
					<button
						type="button"
						onClick={onClear}
						className="rounded-full border border-aperture-gray/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-300 transition hover:border-aperture-yellow hover:text-aperture-yellow"
						disabled={!hasActive}
					>
						Clear
					</button>
				</div>
			</div>

		<div
			className={`rounded-2xl border border-aperture-gray/70 bg-aperture-dark/60 p-6 ${
				isOpen ? "block" : "hidden"
			} lg:block`}
		>
			<div className="flex items-start justify-between gap-4">
				<div>
					<p className="text-xs font-mono uppercase tracking-[0.4em] text-aperture-blue">
						Control Panel
					</p>
					<h2 className="text-lg font-semibold text-white">Tech Filters</h2>
					<p className="mt-2 text-xs text-zinc-400">
						Stack filters are cumulative.
					</p>
				</div>
				<button
					type="button"
					onClick={onClear}
					className="hidden rounded-full border border-aperture-gray/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-300 transition hover:border-aperture-yellow hover:text-aperture-yellow lg:inline-flex"
					disabled={!hasActive}
				>
					Clear
				</button>
			</div>

			<div className="mt-6 space-y-4">
				{FILTER_OPTIONS.map((option) => {
					const checked = activeFilters.includes(option.id);
					return (
						<label
							key={option.id}
							className="flex items-start gap-3 rounded-xl border border-transparent p-2 transition hover:border-aperture-blue/50"
						>
							<input
								type="checkbox"
								checked={checked}
								onChange={() => onToggle(option.id)}
								className="mt-1 h-4 w-4 appearance-none rounded-sm border border-aperture-gray/80 bg-black/60 outline-none transition checked:border-aperture-blue checked:bg-aperture-blue"
							/>
							<span className="space-y-1">
								<span className="block text-xs font-mono uppercase tracking-[0.3em] text-zinc-300">
									{option.label}
								</span>
								<span className="block text-xs text-zinc-500">
									{option.description}
								</span>
							</span>
						</label>
					);
				})}
			</div>
		</div>
		{hasActive ? (
			<div className="text-xs font-mono uppercase tracking-[0.35em] text-aperture-blue">
				Active filters: {activeFilters.length}
			</div>
		) : null}
	</div>
	);
};
