"use client";

import { useCallback, useMemo, useState } from "react";
import type { Project, ProjectFilter } from "../types";

const normalize = (value: string) => value.trim().toLowerCase();

type UseProjectFiltersProps = {
	projects: Project[];
	initialFilters?: ProjectFilter[];
};

export const useProjectFilters = ({
	projects,
	initialFilters = [],
}: UseProjectFiltersProps) => {
	const [activeFilters, setActiveFilters] = useState<ProjectFilter[]>(
		initialFilters,
	);

	const normalizedFilters = useMemo(
		() => activeFilters.map(normalize),
		[activeFilters],
	);

	const filteredProjects = useMemo(() => {
		if (normalizedFilters.length === 0) {
			return projects;
		}

		return projects.filter((project) => {
			const stack = project.tech_stack.map(normalize);
			return normalizedFilters.every((filter) => stack.includes(filter));
		});
	}, [normalizedFilters, projects]);

	const toggleFilter = useCallback((filter: ProjectFilter) => {
		setActiveFilters((prev) => {
			if (prev.includes(filter)) {
				return prev.filter((item) => item !== filter);
			}
			return [...prev, filter];
		});
	}, []);

	const clearFilters = useCallback(() => {
		setActiveFilters([]);
	}, []);

	const filterKey = useMemo(() => {
		if (activeFilters.length === 0) {
			return "all";
		}
		return [...activeFilters].sort().join("-");
	}, [activeFilters]);

	return {
		activeFilters,
		filteredProjects,
		toggleFilter,
		clearFilters,
		filterKey,
	};
};
