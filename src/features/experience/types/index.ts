export type TrajectoryStatus = "COMPLETED" | "IN PROGRESS" | "ACTIVE";

export interface TrajectoryPanelData {
	id: string;
	title: string;
	subtitle: string;
	status: TrajectoryStatus;
}

export interface TrajectorySectionData extends TrajectoryPanelData {
	eyebrow: string;
	heading: string;
	summary: string;
	highlights: string[];
}

export interface TechBubble {
	id: string;
	label: string;
	top: string;
	right: string;
	delay: string;
	duration: string;
}

export interface ExperienceSlide {
	id: string;
	role: string;
	organization: string;
	timeframe: string;
	summary: string;
	tags: string[];
}
