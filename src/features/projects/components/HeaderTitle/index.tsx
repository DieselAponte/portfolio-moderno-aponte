export const HeaderTitle = () => {
	return (
		<div className="space-y-4">
			<p className="font-mono text-xs uppercase tracking-[0.5em] text-aperture-blue">
				Division // Projects
			</p>
			<h1
				className="text-4xl font-black text-white sm:text-5xl"
				style={{ fontFamily: "DIN, Helvetica, Arial, sans-serif" }}
			>
				I build what I&apos;m{" "}
				<span className="text-aperture-yellow">passionate</span> about
			</h1>
			<p className="max-w-2xl text-sm leading-7 text-zinc-300">
				Enterprise-grade software solutions, bringing technology within reach
				for those bold enough to create no matter the tool, the stack, or the
				challenge ahead.
			</p>
		</div>
	);
};
