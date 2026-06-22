"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import IBMPCMonitor from "../IBMPCMonitor";
import PortalPanel from "../PortalPanel";
import type { ExperienceSlide, TrajectorySectionData } from "../../types";

export default function Experience({
	data,
	slides = [],
}: {
	data: TrajectorySectionData;
	slides: ExperienceSlide[];
}) {
	const [activeIndex, setActiveIndex] = useState(0);

	useEffect(() => {
		if (slides.length === 0) return;
		const interval = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % slides.length);
		}, 4200);

		return () => clearInterval(interval);
	}, [slides.length]);

	const activeSlide = slides[activeIndex];

	return (
		<section className="grid gap-10 md:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
			<div className="self-start hidden md:block md:sticky md:top-24">
				<PortalPanel
					id={data.id}
					title={data.title}
					subtitle={data.subtitle}
					status={data.status}
				/>
			</div>

			<div className="space-y-8">
				<div className="space-y-4">
					<p className="font-mono text-xs uppercase tracking-[0.45em] text-aperture-blue">
						<span className="md:hidden">Level 03 // </span>
						{data.eyebrow}
					</p>
					<h3
						className="text-3xl font-black text-white sm:text-4xl"
						style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
					>
						{data.heading}
					</h3>
					<p className="text-sm leading-7 text-zinc-300">
						{data.summary}
					</p>
					<div className="flex flex-wrap gap-2">
						{data.highlights.map((highlight) => (
							<span
								key={highlight}
								className="rounded-full border border-aperture-gray/70 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-yellow"
							>
								{highlight}
							</span>
						))}
					</div>
				</div>

				<IBMPCMonitor screenClassName="h-[300px]">
					<div className="relative h-[300px] w-full overflow-hidden rounded-[8px] bg-[#0a0a0c]">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,204,242,0.12),transparent_65%)]" />
						<div className="absolute inset-0 border border-white/10" />

						<AnimatePresence mode="wait">
							{activeSlide && (
								<motion.div
									key={activeSlide.id}
									className="relative z-10 h-full p-6 text-[#f0f0f0]"
									initial={{ opacity: 0, y: 12 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -12 }}
									transition={{ duration: 0.5 }}
								>
									<div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.35em] text-aperture-blue">
										<span>Log {activeSlide.id}</span>
										<span>{activeSlide.timeframe}</span>
									</div>
									<div className="mt-4 space-y-2">
										<h4 className="text-lg font-semibold text-white">
											{activeSlide.role}
										</h4>
										<p className="text-xs uppercase tracking-[0.3em] text-aperture-yellow">
											{activeSlide.organization}
										</p>
										<p className="text-sm leading-6 text-zinc-200">
											{activeSlide.summary}
										</p>
									</div>
									<div className="mt-6 flex flex-wrap gap-2">
										{activeSlide.tags.map((tag) => (
											<span
												key={tag}
												className="rounded-full border border-aperture-blue/60 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-blue"
											>
												{tag}
											</span>
										))}
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</IBMPCMonitor>

				<button
					type="button"
					className="inline-flex items-center gap-3 rounded-sm border border-aperture-blue/70 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.3em] text-aperture-blue transition hover:bg-aperture-blue hover:text-black"
				>
					LinkedIn Profile
					<span className="text-xs">-&gt;</span>
				</button>
			</div>
		</section>
	);
}
