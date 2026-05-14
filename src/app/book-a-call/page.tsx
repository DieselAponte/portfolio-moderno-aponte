import { ContactMe } from "../../features/home/components/ContactMe";

export default function BookACallPage() {
  return (
    <main className="relative w-full overflow-hidden">
      <section className="relative min-h-screen px-6 py-24">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/setup-dev-portal.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-black/35" />
        </div>
        <div className="mx-auto w-full max-w-5xl space-y-10">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
              Division // Booking
            </p>
            <h1
              className="text-4xl font-black text-white sm:text-5xl"
              style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
            >
              Book a call
            </h1>
            <p className="text-sm leading-7 text-zinc-300">
              Send the mission brief and lock a slot for deeper coordination.
            </p>
          </div>

          <ContactMe />
        </div>
      </section>
    </main>
  );
}
