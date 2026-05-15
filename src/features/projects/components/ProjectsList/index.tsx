import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import Github from "../../../../../public/images/GitHub_Invertocat_Black_Clearspace.svg";
import type { Project } from "../../types";

type ProjectsListProps = {
  projects: Project[];
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  filterKey: string;
  onLoadMore: () => void;
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

const ProjectSkeleton = () => {
  return (
    <section className="rounded-3xl border border-aperture-gray/60 bg-aperture-dark/40 p-6">
      <div className="space-y-2">
        <div className="h-4 w-40 rounded-full bg-aperture-gray/70" />
        <div className="h-3 w-52 rounded-full bg-aperture-gray/50" />
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="overflow-hidden rounded-2xl border border-aperture-gray/70 bg-[#101219]/80"
          >
            <div
              className="h-40 w-full animate-pulse"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(86,204,242,0.12), rgba(242,201,76,0.25), rgba(86,204,242,0.12))",
              }}
            />
            <div className="space-y-3 p-4">
              <div className="h-4 w-1/2 rounded-full bg-aperture-gray/60" />
              <div className="h-3 w-2/3 rounded-full bg-aperture-gray/50" />
              <div className="h-3 w-full rounded-full bg-aperture-gray/40" />
              <div className="h-3 w-5/6 rounded-full bg-aperture-gray/40" />
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-full bg-aperture-gray/60" />
                <div className="h-6 w-16 rounded-full bg-aperture-gray/60" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const ProjectsList = ({
  projects,
  isLoading,
  isLoadingMore,
  hasMore,
  filterKey,
  onLoadMore,
}: ProjectsListProps) => {
  if (isLoading) {
    return <ProjectSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <section className="rounded-2xl border border-aperture-gray/60 bg-aperture-dark/40 px-6 py-8 text-center">
        <p className="text-sm text-zinc-400">
          No projects match the active filters.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-aperture-gray/60 bg-aperture-dark/40 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Testing Tracks</h3>
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
            Live project feed
          </p>
        </div>
        <span className="text-xs font-mono uppercase tracking-[0.35em] text-aperture-blue">
          Status: Online
        </span>
      </div>

      <div className="relative mt-8">
        <motion.div
          key={`scan-${filterKey}`}
          className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-aperture-blue to-transparent"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: [0, 1, 0], y: [0, 48, 120] }}
          transition={{ duration: 0.6 }}
        />

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {projects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(12px)" }}
                transition={{ duration: 0.25 }}
                className="group overflow-hidden rounded-2xl border border-aperture-gray/70 bg-[#101219]/80"
              >
                <div className="relative h-44 w-full overflow-hidden border-b border-aperture-gray/60">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-mono uppercase tracking-[0.3em] text-aperture-blue">
                        {formatDate(project.date)}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-white">
                        {project.title}
                      </h4>
                    </div>
                    <Link
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-aperture-gray/60 text-zinc-300 transition hover:border-aperture-yellow hover:text-aperture-yellow"
                      aria-label={`Open ${project.title} on GitHub`}
                    >
                      <Image
                        src={Github}
                        alt="GitHub"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    </Link>
                  </div>
                  <p className="text-sm leading-6 text-zinc-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-aperture-blue/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-blue"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center gap-3 rounded-sm border border-aperture-blue/70 bg-black/40 px-5 py-2 text-[10px] font-mono uppercase tracking-[0.35em] text-aperture-blue transition hover:bg-aperture-blue hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoadingMore ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : null}
            Load More
            <span className="text-xs">-&gt;</span>
          </button>
        </div>
      ) : (
        <p className="mt-8 text-center text-xs font-mono uppercase tracking-[0.3em] text-zinc-500">
          End of feed
        </p>
      )}
    </section>
  );
};
