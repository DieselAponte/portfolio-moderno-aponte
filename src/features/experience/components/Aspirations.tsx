"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useCustomTypewriter } from "../hooks/useCustomTypewriter";

const primaryText =
	"The next phase is about building interfaces that feel honest, resilient, and human. I am focused on systems that scale without losing craft, and visuals that carry clear intent.";

const secondaryText = "I'll update you about it";

interface AspirationsProps {
	backgroundImage?: string;
}

export default function Aspirations({
	backgroundImage = "/images/portal-ending.jpg",
}: AspirationsProps) {
	const [cycle, setCycle] = useState(0);
	const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleSecondaryComplete = useCallback(() => {
		if (loopTimeoutRef.current) {
			clearTimeout(loopTimeoutRef.current);
		}
		loopTimeoutRef.current = setTimeout(() => {
			setCycle((prev) => prev + 1);
		}, 1400);
	}, []);

	useEffect(() => {
		return () => {
			if (loopTimeoutRef.current) {
				clearTimeout(loopTimeoutRef.current);
			}
		};
	}, []);

	const primary = useCustomTypewriter({
		text: primaryText,
		speed: 28,
		resetSignal: cycle,
	});
	const secondary = useCustomTypewriter({
		text: secondaryText,
		speed: 56,
		startDelay: 1000,
		enabled: primary.isComplete,
		resetSignal: cycle,
		onComplete: handleSecondaryComplete,
	});

	const showPrimaryCursor = !primary.isComplete;
	const showSecondaryCursor = primary.isComplete && secondary.hasStarted;

	return (
		<section
			id="aspirations"
			className="relative min-h-screen w-full overflow-hidden"
		>
			<div className="absolute inset-0 -z-10">
				<div
					className="absolute inset-0 bg-cover bg-center"
					style={{ backgroundImage: `url('${backgroundImage}')` }}
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
				<div className="absolute inset-0 bg-black/35" />
				<div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,black_51%,transparent_52%)] bg-[length:100%_4px]" />
				<div className="absolute inset-0 opacity-[0.05] mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
			</div>

			<div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center px-6 py-24">
				<div className="space-y-6">
					<p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
						Final // Aspirations
					</p>
					<h2
						className="text-3xl font-black text-[#f0f0f0] sm:text-5xl"
						style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
					>
						The ending is just a checkpoint
					</h2>
					<div className="max-w-2xl space-y-4 rounded-2xl border border-white/10 bg-black/45 p-6 backdrop-blur">
						<p className="font-mono text-sm leading-7 text-[#f0f0f0] sm:text-base">
							{primary.typedText}
							{showPrimaryCursor && (
								<span className="cursor text-aperture-blue">|</span>
							)}
						</p>
						<p className="font-mono text-sm leading-7 text-[#f0f0f0]/80 sm:text-base">
							{secondary.typedText}
							{showSecondaryCursor && (
								<span className="cursor text-aperture-yellow">|</span>
							)}
						</p>
					</div>
				</div>
			</div>

			<style jsx>{`
				.cursor {
					display: inline-block;
					margin-left: 4px;
					animation: cursorBlink 1s steps(2, start) infinite;
				}

				@keyframes cursorBlink {
					0%,
					50% {
						opacity: 1;
					}
					50.01%,
					100% {
						opacity: 0;
					}
				}
			`}</style>
		</section>
	);
}
