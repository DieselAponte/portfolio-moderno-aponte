import IBMPCMonitor from "../IBMPCMonitor";
import PortalPanel from "../PortalPanel";
import type { TrajectorySectionData } from "../../types";

const transcriptLines = [
	"Boot sequence: completed",
	"Core systems calibrated",
	"Research track: cognitive computing",
	"Lab work: prototyping + UX systems",
	"Status: archived",
];

export default function College({ data }: { data: TrajectorySectionData }) {
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
						<span className="md:hidden">Level 01 // </span>
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

				<IBMPCMonitor screenClassName="h-[260px]">
					<div className="relative h-[260px] w-full overflow-hidden rounded-[8px] bg-[#0a0a0c]">
						<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,204,242,0.12),transparent_65%)]" />
						<div className="absolute inset-0 border border-white/10" />
						<div className="relative z-10 h-full p-6 text-[#f0f0f0]">
							<p className="font-mono text-[11px] uppercase tracking-[0.35em] text-aperture-blue">
								Transcript // Core Systems
							</p>
							<div className="mt-5 space-y-3 text-xs text-zinc-200">
								{transcriptLines.map((line, index) => (
									<div key={`${line}-${index}`} className="flex items-center gap-3">
										<span className="h-[1px] w-6 bg-aperture-blue/50" />
										<span className="font-mono tracking-[0.2em]">{line}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</IBMPCMonitor>
			</div>
		</section>
	);
}
