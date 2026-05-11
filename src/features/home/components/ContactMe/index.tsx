export const ContactMe = () => {
  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="text-center">
        <h2 className="text-4xl font-black uppercase text-white sm:text-5xl">
          I KNOW WHAT YOU NEED
          <br />
          I&apos;M WHAT YOU NEED
        </h2>
      </div>

      <div className="glass-panel mx-auto mt-10 w-full max-w-xl rounded-2xl px-8 py-10">
        <h3 className="text-center text-xl font-semibold text-white">Hit me up</h3>

        <form className="mt-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="service"
              className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-300"
            >
              Select your service
            </label>
            <select
              id="service"
              name="service"
              className="w-full rounded-lg border border-aperture-gray bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-aperture-orange focus:ring-2 focus:ring-aperture-orange/30"
              defaultValue=""
            >
              <option value="" disabled>
                Select your service
              </option>
              <option value="full-stack">Full-Stack Build</option>
              <option value="ui-ux">UI/UX Frontend</option>
              <option value="optimization">Optimization</option>
              <option value="consulting">Consulting</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-300"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@domain.com"
              className="w-full rounded-lg border border-aperture-gray bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-aperture-orange focus:ring-2 focus:ring-aperture-orange/30"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="project"
              className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-300"
            >
              Tell me about your project
            </label>
            <textarea
              id="project"
              name="project"
              rows={4}
              placeholder="Scope, timeline, and goals"
              className="w-full resize-none rounded-lg border border-aperture-gray bg-transparent px-4 py-3 text-sm text-white outline-none transition focus:border-aperture-orange focus:ring-2 focus:ring-aperture-orange/30"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg border border-aperture-orange bg-aperture-orange/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-aperture-orange transition hover:bg-aperture-orange hover:text-black"
          >
            Stay in contact
          </button>
        </form>
      </div>
    </div>
  );
};
