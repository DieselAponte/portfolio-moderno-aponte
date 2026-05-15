export const HeaderTitle = () => {
	return (
		<header className="space-y-6">
			<p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
				Division // Guestbook
			</p>
			<div className="space-y-4">
				<h1
					className="text-4xl font-black text-aperture-yellow sm:text-5xl lg:text-6xl"
					style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
				>
					Leave a message
				</h1>
				<h2 className="max-w-3xl text-2xl font-semibold text-white sm:text-3xl">
					If any of this resonates with you, leave a note
				</h2>
				<p className="max-w-3xl text-base leading-7 text-zinc-300">
					We track every transmission as part of the ongoing compliance log.
					Your feedback helps calibrate future iterations.
				</p>
			</div>
		</header>
	);
};
