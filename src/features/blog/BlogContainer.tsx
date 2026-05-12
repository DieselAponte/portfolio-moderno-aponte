const blogLogs = [
  {
    id: "01",
    title: "Signal integrity report",
    summary:
      "Short field notes on building interfaces that feel mechanical but still human.",
    tags: ["Interface", "Systems"],
  },
  {
    id: "02",
    title: "Motion pipeline tests",
    summary:
      "Documenting animation passes and performance targets for cinematic UI.",
    tags: ["Motion", "Performance"],
  },
  {
    id: "03",
    title: "Aperture craft log",
    summary:
      "What it takes to keep a portfolio precise, measured, and high impact.",
    tags: ["Craft", "Strategy"],
  },
];

export default function BlogContainer() {
  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative min-h-screen px-6 py-24">
        <div className="mx-auto w-full max-w-5xl space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
              Division // Blog
            </p>
            <h1
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
            >
              Transmission logs
            </h1>
            <p className="text-sm leading-7 text-zinc-300">
              Field reports and reflective notes captured during active
              development cycles.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {blogLogs.map((log) => (
              <article
                key={log.id}
                className="glass-panel rounded-2xl px-6 py-6 text-white"
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-aperture-blue">
                  <span>Log {log.id}</span>
                  <span>Active</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold">{log.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {log.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {log.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-aperture-gray/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-yellow"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
