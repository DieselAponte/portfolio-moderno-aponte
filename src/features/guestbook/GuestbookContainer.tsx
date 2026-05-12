const guestbookEntries = [
  {
    id: "01",
    author: "Test Subject 212",
    message: "Diagnostics cleared. Interface responsiveness: optimal.",
  },
  {
    id: "02",
    author: "Lab Observer",
    message: "The system narrative feels stable. Continue iteration.",
  },
];

export default function GuestbookContainer() {
  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative min-h-screen px-6 py-24">
        <div className="mx-auto w-full max-w-5xl space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
              Division // Guestbook
            </p>
            <h1
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
            >
              Transmission queue
            </h1>
            <p className="text-sm leading-7 text-zinc-300">
              Operator notes left for future calibration cycles.
            </p>
          </div>

          <div className="grid gap-4">
            {guestbookEntries.map((entry) => (
              <div
                key={entry.id}
                className="glass-panel rounded-2xl px-6 py-5 text-white"
              >
                <p className="text-xs font-mono uppercase tracking-[0.3em] text-aperture-blue">
                  Entry {entry.id}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-300">
                  {entry.message}
                </p>
                <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-aperture-yellow">
                  {entry.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
