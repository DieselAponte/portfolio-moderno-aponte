"use client";

import { useActionState } from "react";
import {
  submitContactForm,
  type ContactFormState,
} from "../services/contact.service";

const initialState: ContactFormState = {
  success: false,
  error: null,
  fieldErrors: {},
};

export const ContactMe = () => {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  );

  if (state.success) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="glass-panel mx-auto w-full max-w-xl rounded-2xl px-8 py-10 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10">
            <span className="text-2xl">✓</span>
          </div>
          <h3 className="text-xl font-semibold text-white">Message sent</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Your request has been received. I&apos;ll get back to you shortly.
          </p>
        </div>
      </div>
    );
  }

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
        <h3 className="text-center text-xl font-semibold text-white">
          Hit me up
        </h3>

        {state.error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-400">
            {state.error}
          </div>
        )}

        <form action={formAction} className="mt-8 space-y-5">
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
              required
            >
              <option value="" disabled>
                Select your service
              </option>
              <option value="full-stack">Full-Stack Build</option>
              <option value="ui-ux">UI/UX Frontend</option>
              <option value="optimization">Optimization</option>
              <option value="consulting">Consulting</option>
            </select>
            {state.fieldErrors.service && (
              <p className="text-xs text-red-400">{state.fieldErrors.service[0]}</p>
            )}
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
              required
            />
            {state.fieldErrors.email && (
              <p className="text-xs text-red-400">{state.fieldErrors.email[0]}</p>
            )}
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
              required
            />
            {state.fieldErrors.project && (
              <p className="text-xs text-red-400">{state.fieldErrors.project[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-lg border border-aperture-orange bg-aperture-orange/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-aperture-orange transition hover:bg-aperture-orange hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Sending..." : "Stay in contact"}
          </button>
        </form>
      </div>
    </div>
  );
};
