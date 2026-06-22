"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import type { GuestbookNoteInsert } from "../../types";

const formSchema = z.object({
	author: z.string().trim().min(2, "Name is required"),
	message: z.string().trim().min(8, "Message should be at least 8 characters").max(500, "Message should not exceed 500 characters"),
	email: z
		.string()
		.trim()
		.email("Enter a valid email")
		.optional()
		.or(z.literal("")),
	site_url: z
		.string()
		.trim()
		.url("Enter a valid URL")
		.optional()
		.or(z.literal("")),
	github_url: z
		.string()
		.trim()
		.url("Enter a valid URL")
		.optional()
		.or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

type PopupCreateNoteProps = {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (note: GuestbookNoteInsert) => Promise<void> | void;
	isSubmitting: boolean;
	initialName?: string;
	initialEmail?: string;
};

const defaultValues: FormValues = {
	author: "",
	message: "",
	email: "",
	site_url: "",
	github_url: "",
};

export const PopupCreateNote = ({
	isOpen,
	onClose,
	onSubmit,
	isSubmitting,
	initialName,
	initialEmail,
}: PopupCreateNoteProps) => {
	const [values, setValues] = useState<FormValues>(() => ({
		...defaultValues,
		author: initialName ?? "",
		email: initialEmail ?? "",
	}));

	const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
	const [submitError, setSubmitError] = useState<string | null>(null);

	// Reset form when dialog opens
	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (isOpen) {
			timeoutId = setTimeout(() => {
				setValues({
					...defaultValues,
					author: initialName ?? "",
					email: initialEmail ?? "",
				});
				setErrors({});
				setSubmitError(null);
			}, 0);
		}
		return () => clearTimeout(timeoutId);
	}, [isOpen, initialName, initialEmail]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, onClose]);

	const handleChange = (field: keyof FormValues, value: string) => {
		setValues((prev: FormValues) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const parsed = formSchema.safeParse(values);
		if (!parsed.success) {
			const fieldErrors: Partial<Record<keyof FormValues, string>> = {};
			parsed.error.errors.forEach((issue: z.ZodIssue) => {
				const field = issue.path[0] as keyof FormValues;
				fieldErrors[field] = issue.message;
			});
			setErrors(fieldErrors);
			return;
		}

		setErrors({});
		setSubmitError(null);
		try {
			await onSubmit({
				author: parsed.data.author,
				message: parsed.data.message,
				email: parsed.data.email || null,
				site_url: parsed.data.site_url || null,
				github_url: parsed.data.github_url || null,
			});
		} catch (submitIssue) {
			setSubmitError(
				submitIssue instanceof Error
					? submitIssue.message
					: "Submission failed.",
			);
		}
	};

	const inputClassName = useMemo(
		() =>
			"mt-2 w-full rounded-xl border border-aperture-gray/70 bg-black/50 px-4 py-2 text-sm text-white outline-none transition focus:border-aperture-orange focus:ring-1 focus:ring-aperture-orange",
		[],
	);

	return (
		<AnimatePresence>
			{isOpen ? (
				<motion.div
					className="fixed inset-0 z-[60] flex items-center justify-center px-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					role="dialog"
					aria-modal="true"
					aria-labelledby="guestbook-dialog-title"
				>
					<div
						className="absolute inset-0 bg-black/70"
						onClick={onClose}
					/>
					<motion.div
						initial={{ scale: 0.92, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.96, opacity: 0 }}
						transition={{ type: "spring", stiffness: 200, damping: 20 }}
						className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-aperture-orange/40 bg-[#0f0f13] p-6 text-white shadow-[0_0_45px_rgba(242,153,74,0.25)]"
					>
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,153,74,0.18),transparent_60%)]" />
						<div className="relative z-10">
							<div className="flex items-start justify-between">
								<div>
									<p className="text-xs font-mono uppercase tracking-[0.4em] text-aperture-orange">
										Create a Note
									</p>
									<h3
										id="guestbook-dialog-title"
										className="mt-2 text-2xl font-semibold"
									>
										Compliance Log
									</h3>
								</div>
								<button
									type="button"
									onClick={onClose}
									className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-aperture-orange hover:text-aperture-orange"
								>
									<X className="h-4 w-4" />
								</button>
							</div>

							<form className="mt-6 space-y-4" onSubmit={handleSubmit}>
								<div>
									<label className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
										Message
									</label>
									<textarea
										rows={4}
										value={values.message}
										onChange={(event) =>
											handleChange("message", event.target.value)
										}
										placeholder="Tell me what you are thinking"
										className={`${inputClassName} resize-none`}
									/>
									{errors.message ? (
										<p className="mt-2 text-xs text-aperture-orange">
											{errors.message}
										</p>
									) : null}
								</div>

								<div>
									<label className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
										Name
									</label>
									<input
										type="text"
										value={values.author}
										onChange={(event) =>
											handleChange("author", event.target.value)
										}
										placeholder="Subject name"
										className={inputClassName}
									/>
									{errors.author ? (
										<p className="mt-2 text-xs text-aperture-orange">
											{errors.author}
										</p>
									) : null}
								</div>

								<div className="grid gap-3 sm:grid-cols-2">
									<div>
										<label className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
											Email
										</label>
										<input
											type="email"
											value={values.email}
											onChange={(event) =>
												handleChange("email", event.target.value)
											}
											placeholder="contact@email.com"
											className={inputClassName}
										/>
										{errors.email ? (
											<p className="mt-2 text-xs text-aperture-orange">
												{errors.email}
											</p>
										) : null}
									</div>
									<div>
										<label className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
											Site
										</label>
										<input
											type="url"
											value={values.site_url}
											onChange={(event) =>
												handleChange("site_url", event.target.value)
											}
											placeholder="https://your.site"
											className={inputClassName}
										/>
										{errors.site_url ? (
											<p className="mt-2 text-xs text-aperture-orange">
												{errors.site_url}
											</p>
										) : null}
									</div>
								</div>

								<div>
									<label className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">
										GitHub
									</label>
									<input
										type="url"
										value={values.github_url}
										onChange={(event) =>
											handleChange("github_url", event.target.value)
										}
										placeholder="https://github.com/"
										className={inputClassName}
									/>
									{errors.github_url ? (
										<p className="mt-2 text-xs text-aperture-orange">
											{errors.github_url}
										</p>
									) : null}
								</div>

								<div className="flex flex-wrap items-center justify-between gap-3 pt-2">
									<p className="text-xs text-zinc-400">
										All fields are logged under compliance review.
									</p>
									<button
										type="submit"
										disabled={isSubmitting}
										className="inline-flex items-center gap-2 rounded-full border border-aperture-orange/70 bg-black/40 px-4 py-2 text-[11px] font-mono uppercase tracking-[0.35em] text-aperture-orange transition hover:bg-aperture-orange hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
									>
										{isSubmitting ? "Submitting" : "Submit Note"}
									</button>
								</div>
								{submitError ? (
									<p className="text-xs text-aperture-orange">{submitError}</p>
								) : null}
							</form>
						</div>
					</motion.div>
				</motion.div>
			) : null}
		</AnimatePresence>
	);
};
