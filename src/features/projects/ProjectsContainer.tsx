const projectSignals = [
  {
    id: "A01",
    title: "Aperture Command Console",
    summary:
      "Operator dashboard designed for low-light environments and high focus.",
  },
  {
    id: "B14",
    title: "Telemetry Relay",
    summary:
      "A visual system for monitoring real-time experiments and anomaly logs.",
  },
  {
    id: "C07",
    title: "Guidance Protocol",
    summary:
      "An adaptive UI kit for navigation, control rooms, and lab kiosks.",
  },
];

export default function ProjectsContainer() {
  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative min-h-screen px-6 py-24">
        <div className="mx-auto w-full max-w-5xl space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
              Division // Projects
            </p>
            <h1
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
            >
              Active deployments
            </h1>
            <p className="text-sm leading-7 text-zinc-300">
              Selected builds that demonstrate cinematic interfaces and rigorous
              systems thinking.
            </p>
          </div>

          <div className="grid gap-6">
            {projectSignals.map((project) => (
              <div
                key={project.id}
                className="glass-panel rounded-2xl px-6 py-6 text-white"
              >
                <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.3em] text-aperture-blue">
                  <span>Signal {project.id}</span>
                  <span>Live</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">{project.title}</h2>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {project.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
