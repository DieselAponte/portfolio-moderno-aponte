import IBMPCMonitor from "../IBMPCMonitor";
import PortalPanel from "../PortalPanel";
import type { TechBubble, TrajectorySectionData } from "../../types";

const currentFocus = [
	"Interface orchestration",
	"3D scene optimization",
	"Narrative UI flows",
	"Low-latency deployments",
];

export default function CurrentlyWorkingOn({
	data,
	techBubbles = [],
}: {
	data: TrajectorySectionData;
	techBubbles: TechBubble[];
}) {
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
						<span className="md:hidden">Level 02 // </span>
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

				<div className="relative">
					<IBMPCMonitor screenClassName="h-[280px]">
						<div className="relative h-[280px] w-full overflow-hidden rounded-[8px] bg-[#0b0b10]">
							<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(242,201,76,0.12),transparent_70%)]" />
							<div className="absolute inset-0 border border-white/10" />
							<div className="relative z-10 h-full p-6 text-[#f0f0f0]">
								<p className="font-mono text-[11px] uppercase tracking-[0.35em] text-aperture-yellow">
									Live console
								</p>
								<div className="mt-5 space-y-3 text-xs text-zinc-200">
									{currentFocus.map((line, index) => (
										<div key={`${line}-${index}`} className="flex items-center gap-3">
											<span className="h-[1px] w-5 bg-aperture-yellow/50" />
											<span className="font-mono tracking-[0.2em]">{line}</span>
										</div>
									))}
								</div>
							</div>
						</div>
					</IBMPCMonitor>

					<div className="pointer-events-none absolute inset-0 hidden md:block">
						{techBubbles.map((bubble) => (
							<div
								key={bubble.id}
								className="absolute rounded-full border border-aperture-yellow/70 bg-aperture-yellow/20 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aperture-yellow shadow-[0_0_20px_rgba(242,201,76,0.25)]"
								style={{
									top: bubble.top,
									right: bubble.right,
									animation: `bubbleFloat ${bubble.duration} ease-in-out infinite`,
									animationDelay: bubble.delay,
								}}
							>
								{bubble.label}
							</div>
						))}
					</div>
				</div>
			</div>

		</section>
	);
}
