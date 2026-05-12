import IBMPCMonitor from "../IBMPCMonitor";
import PortalPanel from "../PortalPanel";
import type { TrajectorySectionData } from "../../types";

const collegeData: TrajectorySectionData = {
	id: "01",
	title: "Academic Path",
	subtitle: "Aperture Education Initiative",
	status: "COMPLETED",
	eyebrow: "Division // College",
	heading: "Systems Engineering Core",
	summary:
		"A structured foundation in algorithms, data structures, and human-centered systems. The focus stayed on building reliable, scalable architecture with a bias toward real-world implementation.",
	highlights: [
		"Algorithmic Thinking",
		"Software Architecture",
		"Human Factors",
		"Systems Research",
	],
};

const transcriptLines = [
	"Boot sequence: completed",
	"Core systems calibrated",
	"Research track: cognitive computing",
	"Lab work: prototyping + UX systems",
	"Status: archived",
];

export default function College() {
	return (
		<section className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
			<div className="self-start lg:sticky lg:top-24">
				<PortalPanel
					id={collegeData.id}
					title={collegeData.title}
					subtitle={collegeData.subtitle}
					status={collegeData.status}
				/>
			</div>

			<div className="space-y-8">
				<div className="space-y-4">
					<p className="font-mono text-xs uppercase tracking-[0.45em] text-aperture-blue">
						{collegeData.eyebrow}
					</p>
					<h3
						className="text-3xl font-black text-white sm:text-4xl"
						style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
					>
						{collegeData.heading}
					</h3>
					<p className="text-sm leading-7 text-zinc-300">
						{collegeData.summary}
					</p>
					<div className="flex flex-wrap gap-2">
						{collegeData.highlights.map((highlight) => (
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
