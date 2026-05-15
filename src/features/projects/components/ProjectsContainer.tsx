"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Footer } from "../../home/components/Footer";
import { useProjectFilters } from "../hooks/useProjectFIlters";
import {
  createProjectsService,
  createSupabaseProjectsRepository,
} from "../services/projects.service";
import type { Project } from "../types";
import { HeaderTitle } from "./HeaderTitle";
import { ProjectsList } from "./ProjectsList";
import { TechFilters } from "./TechFilters";

const PAGE_LIMIT = 4;

const fallbackProjects: Project[] = [
  {
    id: "A01",
    title: "Aperture Command Console",
    description:
      "Operator dashboard designed for low-light environments and high focus.",
    date: "2025-12-20",
    tech_stack: ["Frontend", "Infrastructure", "TypeScript"],
    github_url: "https://github.com/",
    image_url: "/images/setup-dev-portal.png",
  },
  {
    id: "B14",
    title: "Telemetry Relay",
    description:
      "A visual system for monitoring real-time experiments and anomaly logs.",
    date: "2025-11-08",
    tech_stack: ["Backend", "Infrastructure", "Postgres"],
    github_url: "https://github.com/",
    image_url: "/images/portal-ending.jpg",
  },
  {
    id: "C07",
    title: "Guidance Protocol",
    description:
      "An adaptive UI kit for navigation, control rooms, and lab kiosks.",
    date: "2025-10-18",
    tech_stack: ["Frontend", "Backend", "Next.js"],
    github_url: "https://github.com/",
    image_url: "/images/setup-dev-portal.png",
  },
  {
    id: "D22",
    title: "Mobile Diagnostics",
    description:
      "Field-ready tooling for calibration teams operating across facilities.",
    date: "2025-09-30",
    tech_stack: ["Mobile", "Frontend", "React"],
    github_url: "https://github.com/",
    image_url: "/images/portal-ending.jpg",
  },
  {
    id: "E05",
    title: "Containment Map",
    description:
      "Top-down visualization suite for live test chamber monitoring.",
    date: "2025-09-14",
    tech_stack: ["Frontend", "Infrastructure", "Visualization"],
    github_url: "https://github.com/",
    image_url: "/images/setup-dev-portal.png",
  },
  {
    id: "F11",
    title: "Specimen Tracker",
    description:
      "Operational tracking pipeline for assets moving between labs.",
    date: "2025-08-02",
    tech_stack: ["Backend", "Infrastructure", "APIs"],
    github_url: "https://github.com/",
    image_url: "/images/portal-ending.jpg",
  },
  {
    id: "G03",
    title: "Aerial Console",
    description:
      "Cross-platform command deck with offline failsafes and sync queues.",
    date: "2025-07-24",
    tech_stack: ["Mobile", "Backend", "Sync"],
    github_url: "https://github.com/",
    image_url: "/images/setup-dev-portal.png",
  },
  {
    id: "H09",
    title: "Edge Relay",
    description:
      "Low-latency relay service for mission critical telemetry streams.",
    date: "2025-06-18",
    tech_stack: ["Backend", "Infrastructure", "Edge"],
    github_url: "https://github.com/",
    image_url: "/images/portal-ending.jpg",
  },
];

const projectsService = createProjectsService(
  createSupabaseProjectsRepository(),
);

export default function ProjectsContainer() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    activeFilters,
    filteredProjects,
    filterKey,
    toggleFilter,
    clearFilters,
  } = useProjectFilters({ projects });

  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const items = await projectsService.getProjects({
        limit: PAGE_LIMIT,
        offset: 0,
      });
      setProjects(items);
      setHasMore(items.length === PAGE_LIMIT);
    } catch (fetchError) {
      setProjects(fallbackProjects.slice(0, PAGE_LIMIT));
      setHasMore(fallbackProjects.length > PAGE_LIMIT);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Unable to load live projects.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (isLoadingMore || !hasMore) {
      return;
    }

    setIsLoadingMore(true);
    try {
      const nextBatch = await projectsService.getProjects({
        limit: PAGE_LIMIT,
        offset: projects.length,
      });
      setProjects((prev) => [...prev, ...nextBatch]);
      setHasMore(nextBatch.length === PAGE_LIMIT);
    } catch {
      setProjects((prev) => {
        const nextBatch = fallbackProjects.slice(
          prev.length,
          prev.length + PAGE_LIMIT,
        );
        setHasMore(prev.length + nextBatch.length < fallbackProjects.length);
        return [...prev, ...nextBatch];
      });
    } finally {
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, projects.length]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const statusMessage = useMemo(() => {
    if (!error) {
      return null;
    }
    return (
      <div className="rounded-2xl border border-aperture-yellow/40 bg-[#1a1810]/60 px-4 py-3 text-xs text-aperture-yellow">
        Live feed offline. Showing local data cache.
      </div>
    );
  }, [error]);

  return (
    <main className="relative w-full overflow-hidden bg-[#0a0a0c] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(86,204,242,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(86,204,242,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,204,242,0.18),transparent_60%)]" />
      <section className="relative min-h-screen px-6 pb-20 pt-24">
        <div className="mx-auto w-full max-w-6xl space-y-12">
          <HeaderTitle />

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
            <TechFilters
              activeFilters={activeFilters}
              onToggle={toggleFilter}
              onClear={clearFilters}
            />

            <div className="space-y-6">
              {statusMessage}
              <ProjectsList
                projects={filteredProjects}
                isLoading={isLoading}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                filterKey={filterKey}
                onLoadMore={handleLoadMore}
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
