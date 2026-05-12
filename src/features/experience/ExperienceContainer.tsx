import Aspirations from "./components/Aspirations";
import College from "./components/Trayectory/College";
import CurrentlyWorkingOn from "./components/Trayectory/CurrentlyWorkingOn";
import Experience from "./components/Trayectory/Experience";

export default function ExperienceContainer() {
	return (
		<main className="relative w-full overflow-hidden">
			<section id="trayectory" className="relative">
				<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
					<video
						className="absolute inset-0 h-full w-full object-cover blur-md opacity-40"
						src="/videos/experience-loop.mp4"
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						aria-hidden="true"
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-transparent to-[#0a0a0c]" />
					<div className="absolute inset-0 bg-[#0a0a0c]/55" />
				</div>

				<div className="relative mx-auto w-full max-w-6xl space-y-24 px-6 py-24">
					<College />
					<CurrentlyWorkingOn />
					<Experience />
				</div>
			</section>

			<Aspirations />
		</main>
	);
}
